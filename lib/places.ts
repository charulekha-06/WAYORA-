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
