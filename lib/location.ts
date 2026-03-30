import * as Location from 'expo-location';

export interface UserLocation {
  latitude: number;
  longitude: number;
  city: string | null;
  region: string | null;
  country: string | null;
  formattedAddress: string;
}

export async function getCurrentLocation(): Promise<UserLocation | null> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      console.warn('Location permission denied');
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const { latitude, longitude } = location.coords;

    // Reverse geocoding
    const [address] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (address) {
      const city = address.city || address.district || address.subregion || 'Unknown City';
      const country = address.country || '';
      const region = address.region || '';

      return {
        latitude,
        longitude,
        city,
        region,
        country,
        formattedAddress: `${city}, ${country}`.replace(/^, /, '').trim() || 'Current Location',
      };
    }

    return {
      latitude,
      longitude,
      city: null,
      region: null,
      country: null,
      formattedAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
}

export async function geocodeCityNominatim(city: string): Promise<{latitude: number, longitude: number} | null> {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`, {
      headers: {
        'User-Agent': 'WayoraApp/1.0'
      }
    });
    
    if (!response.ok) return null;
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
      };
    }
    return null;
  } catch (error) {
    console.error('Nominatim geocode error:', error);
    return null;
  }
}
