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

/**
 * Fetch nearby services using Overpass API
 * @param lat Latitude
 * @param lon Longitude
 * @param category Service category (Hospitals, Pharmacies, etc.)
 * @param radius Search radius in meters (default 5000)
 */
export async function fetchNearbyServices(
  lat: number,
  lon: number,
  category: string,
  radius: number = 5000
): Promise<Place[]> {
  const overpassCategory = CATEGORY_MAP[category] || `amenity=${category.toLowerCase()}`;
  const query = `
    [out:json][timeout:25];
    (
      node[${overpassCategory}](around:${radius},${lat},${lon});
      way[${overpassCategory}](around:${radius},${lat},${lon});
      relation[${overpassCategory}](around:${radius},${lat},${lon});
    );
    out body;
    >;
    out skel qt;
  `;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
    });

    if (!response.ok) throw new Error('Failed to fetch from Overpass API');

    const data = await response.json();
    return (data.elements || [])
      .filter((el: any) => el.tags && (el.tags.name || el.tags['name:en']))
      .map((el: any) => ({
        id: el.id.toString(),
        name: el.tags.name || el.tags['name:en'] || category,
        category: category,
        lat: el.lat || (el.center && el.center.lat),
        lon: el.lon || (el.center && el.center.lon),
        address: el.tags['addr:street'] ? `${el.tags['addr:street']} ${el.tags['addr:housenumber'] || ''}` : undefined,
        tags: el.tags,
      }));
  } catch (error) {
    console.error('Error fetching nearby services:', error);
    return [];
  }
}

/**
 * Fetch nearby attractions for the Explore screen
 */
export async function fetchNearbyAttractions(
  lat: number,
  lon: number,
  radius: number = 10000
): Promise<Place[]> {
  const query = `
    [out:json][timeout:25];
    (
      node["tourism"~"attraction|viewpoint|museum"](around:${radius},${lat},${lon});
      way["tourism"~"attraction|viewpoint|museum"](around:${radius},${lat},${lon});
    );
    out body;
    >;
    out skel qt;
  `;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
    });

    if (!response.ok) throw new Error('Failed to fetch attractions');

    const data = await response.json();
    return (data.elements || [])
      .filter((el: any) => el.tags && (el.tags.name || el.tags['name:en']))
      .map((el: any) => ({
        id: el.id.toString(),
        name: el.tags.name || el.tags['name:en'],
        category: el.tags.tourism || 'Attraction',
        lat: el.lat || (el.center && el.center.lat),
        lon: el.lon || (el.center && el.center.lon),
        tags: el.tags,
      }));
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return [];
  }
}
