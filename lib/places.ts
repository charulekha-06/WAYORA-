import { UserLocation } from './location';

export interface Place {
  id: string;
  name: string;
  category: string;
  lat: number;
  lon: number;
  address?: string;
  tags?: Record<string, string>;
}

/**
 * Service mapping for Overpass API
 */
const CATEGORY_MAP: Record<string, string> = {
  'Hospitals': 'amenity=hospital',
  'Pharmacies': 'amenity=pharmacy',
  'ATMs': 'amenity=atm',
  'Restrooms': 'amenity=toilets',
};

const OVERPASS_MIRRORS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://lz4.overpass-api.de/api/interpreter',
];

/**
 * Fetch nearby services using Overpass API with mirror fallback
 */
export async function fetchNearbyServices(
  lat: number,
  lon: number,
  category: string,
  radius: number = 5000
): Promise<Place[]> {
  const overpassCategory = CATEGORY_MAP[category] || `amenity=${category.toLowerCase()}`;
  const query = `
    [out:json][timeout:15];
    (
      node[${overpassCategory}](around:${radius},${lat},${lon});
      way[${overpassCategory}](around:${radius},${lat},${lon});
      relation[${overpassCategory}](around:${radius},${lat},${lon});
    );
    out center 50;
  `;

  for (const mirror of OVERPASS_MIRRORS) {
    try {
      const response = await fetch(mirror, {
        method: 'POST',
        body: query,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) continue;

      const data = await response.json();
      return (data.elements || [])
        .map((el: any) => ({
          id: el.id.toString(),
          name: el.tags?.name || el.tags?.['name:en'] || category,
          category: category,
          lat: el.lat || (el.center && el.center.lat),
          lon: el.lon || (el.center && el.center.lon),
          address: el.tags?.['addr:street'] ? `${el.tags['addr:street']} ${el.tags['addr:housenumber'] || ''}` : undefined,
          tags: el.tags || {},
        }));
    } catch (error) {
      console.warn(`Mirror ${mirror} failed:`, error);
    }
  }

  console.error('All Overpass mirrors failed');
  return [];
}

/**
 * Fetch nearby attractions for the Explore screen
 */
export async function fetchNearbyAttractions(
  lat: number,
  lon: number,
  radius: number = 25000
): Promise<Place[]> {
  const query = `
    [out:json][timeout:15];
    (
      node["tourism"~"attraction|viewpoint|museum"](around:${radius},${lat},${lon});
      way["tourism"~"attraction|viewpoint|museum"](around:${radius},${lat},${lon});
    );
    out center 50;
  `;

  for (const mirror of OVERPASS_MIRRORS) {
    try {
      const response = await fetch(mirror, {
        method: 'POST',
        body: query,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) continue;

      const data = await response.json();
      return (data.elements || [])
        .map((el: any) => ({
          id: el.id.toString(),
          name: el.tags?.name || el.tags?.['name:en'] || 'Attraction',
          category: el.tags?.tourism || 'Attraction',
          lat: el.lat || (el.center && el.center.lat),
          lon: el.lon || (el.center && el.center.lon),
          tags: el.tags || {},
        }));
    } catch (error) {
      console.warn(`Mirror ${mirror} failed:`, error);
    }
  }

  console.error('All attraction mirrors failed');
  return [];
}

/**
 * Fetch specific booking categories for the Booking UI, mapping categories directly to robust 
 * OpenStreetMap types (e.g. tourism=hotel, aeroway=aerodrome).
 */
export async function fetchBookingItems(lat: number, lon: number, category: string): Promise<any[]> {
  let overpassTag = '';
  let radius = 15000; 

  switch (category) {
    case 'hotel':
      overpassTag = '"tourism"="hotel"';
      break;
    case 'flight':
      overpassTag = '"aeroway"~"aerodrome|terminal"';
      radius = 50000; 
      break;
    case 'transport':
      overpassTag = '"public_transport"="station"';
      break;
    case 'car':
      overpassTag = '"amenity"="car_rental"';
      break;
    case 'activities':
      overpassTag = '"tourism"~"attraction|museum"';
      break;
    case 'food':
      overpassTag = '"amenity"~"restaurant|cafe"';
      radius = 5000;
      break;
    default:
      overpassTag = '"tourism"="hotel"';
  }

  const query = `
    [out:json][timeout:15];
    (
      node[${overpassTag}](around:${radius},${lat},${lon});
      way[${overpassTag}](around:${radius},${lat},${lon});
    );
    out center 15;
  `;

  for (const mirror of OVERPASS_MIRRORS) {
    try {
      const response = await fetch(mirror, {
        method: 'POST',
        body: query,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) continue;

      const data = await response.json();
      
      let elements = (data.elements || [])
        // Filter out items without names
        .filter((el: any) => el.tags?.name || el.tags?.['name:en']);
        
      if (elements.length > 0) {
        return elements
          // Map to exact required shape for Booking UI
          .map((el: any, i: number) => {
            const name = el.tags?.name || el.tags?.['name:en'];
            const city = el.tags?.['addr:city'] || '';
            const locStr = city ? city : Math.round(lat*100)/100 + ',' + Math.round(lon*100)/100;
            
            return {
              id: el.id.toString(),
              name: name,
              price: Math.floor(Math.random() * 150) + 50, // Mocked price for display
              rating: (Math.random() * 1.5 + 3.5).toFixed(1), // Random 3.5-5.0
              reviews: Math.floor(Math.random() * 2000) + 50,
              location: locStr,
              tag: category === 'flight' ? 'Airport' : (category === 'hotel' ? 'Top Rated' : 'Popular'),
            };
          })
          .slice(0, 6); // Limit to 6
      }
    } catch (error) {
      console.warn(`Mirror ${mirror} failed:`, error);
    }
  }

  // Fallback realistic-looking mock data if OSM returns 0 items for a generic country coordinate
  const fallbackNames = {
    hotel: ['Grand Plaza Resort', 'The Royal Suites', 'Boutique Inn', 'Coastal Breeze Hotel', 'Apex Seasons'],
    flight: ['Global Airways', 'Rapid Sky airlines', 'AeroExpress', 'Sunset Flights', 'Horizon Air'],
    transport: ['Express Rail Network', 'City Connect Bus', 'Intercity Coach', 'Metro Rapid', 'Central Train Services'],
    car: ['Sprint Auto Rentals', 'Voyage Car Hire', 'Elite Motors', 'Thrifty Drive', 'Cruise Vehicles'],
    activities: ['Historic Walking Tour', 'Sunset Cruise', 'Museum Fast-Pass', 'City Top Viewpoint', 'Local Hidden Gems Tour'],
    food: ['Café De La Ville', 'The Rustic Kitchen', 'Seafood Grill', 'Spice Market Dining', 'Bistro Excellence']
  };

  const selectedNames = fallbackNames[category as keyof typeof fallbackNames] || fallbackNames.hotel;
  
  return selectedNames.map((name, i) => ({
    id: `mock-${category}-${i}`,
    name,
    price: Math.floor(Math.random() * 150) + 50,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 2000) + 50,
    location: `${Math.round(lat*100)/100}, ${Math.round(lon*100)/100}`,
    tag: 'Trending Nearby'
  }));
}

