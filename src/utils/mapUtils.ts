/**
 * Map utility functions for coordinate calculations and map operations
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLng = toRadians(coord2.lng - coord1.lng);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.lat)) * Math.cos(toRadians(coord2.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

// Convert degrees to radians
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Calculate center point of multiple coordinates
export const calculateCenter = (coordinates: Coordinates[]): Coordinates => {
  if (coordinates.length === 0) {
    return { lat: 0, lng: 0 };
  }
  
  if (coordinates.length === 1) {
    return coordinates[0];
  }
  
  const sum = coordinates.reduce(
    (acc, coord) => ({
      lat: acc.lat + coord.lat,
      lng: acc.lng + coord.lng
    }),
    { lat: 0, lng: 0 }
  );
  
  return {
    lat: sum.lat / coordinates.length,
    lng: sum.lng / coordinates.length
  };
};

// Calculate bounds that contain all coordinates
export const calculateBounds = (coordinates: Coordinates[]): MapBounds => {
  if (coordinates.length === 0) {
    return { north: 0, south: 0, east: 0, west: 0 };
  }
  
  const lats = coordinates.map(coord => coord.lat);
  const lngs = coordinates.map(coord => coord.lng);
  
  return {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs)
  };
};

// Calculate appropriate zoom level for given bounds
export const calculateZoomLevel = (bounds: MapBounds, mapWidth: number, mapHeight: number): number => {
  const WORLD_DIM = { height: 256, width: 256 };
  const ZOOM_MAX = 21;
  
  function latRad(lat: number) {
    const sin = Math.sin(lat * Math.PI / 180);
    const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }
  
  function zoom(mapPx: number, worldPx: number, fraction: number) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  }
  
  const latFraction = (latRad(bounds.north) - latRad(bounds.south)) / Math.PI;
  const lngDiff = bounds.east - bounds.west;
  const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;
  
  const latZoom = zoom(mapHeight, WORLD_DIM.height, latFraction);
  const lngZoom = zoom(mapWidth, WORLD_DIM.width, lngFraction);
  
  return Math.min(latZoom, lngZoom, ZOOM_MAX);
};

// Check if a coordinate is within bounds
export const isWithinBounds = (coordinate: Coordinates, bounds: MapBounds): boolean => {
  return (
    coordinate.lat >= bounds.south &&
    coordinate.lat <= bounds.north &&
    coordinate.lng >= bounds.west &&
    coordinate.lng <= bounds.east
  );
};

// Generate random coordinates within bounds (for testing)
export const generateRandomCoordinate = (bounds: MapBounds): Coordinates => {
  return {
    lat: bounds.south + Math.random() * (bounds.north - bounds.south),
    lng: bounds.west + Math.random() * (bounds.east - bounds.west)
  };
};

// Convert coordinates to pixel position (simplified)
export const coordinateToPixel = (
  coordinate: Coordinates,
  bounds: MapBounds,
  mapWidth: number,
  mapHeight: number
): { x: number; y: number } => {
  const x = ((coordinate.lng - bounds.west) / (bounds.east - bounds.west)) * mapWidth;
  const y = ((bounds.north - coordinate.lat) / (bounds.north - bounds.south)) * mapHeight;
  
  return { x, y };
};

// Convert pixel position to coordinates (simplified)
export const pixelToCoordinate = (
  pixel: { x: number; y: number },
  bounds: MapBounds,
  mapWidth: number,
  mapHeight: number
): Coordinates => {
  const lng = bounds.west + (pixel.x / mapWidth) * (bounds.east - bounds.west);
  const lat = bounds.north - (pixel.y / mapHeight) * (bounds.north - bounds.south);
  
  return { lat, lng };
};

// Format coordinates for display
export const formatCoordinates = (coordinate: Coordinates, precision: number = 4): string => {
  return `${coordinate.lat.toFixed(precision)}, ${coordinate.lng.toFixed(precision)}`;
};

// Validate coordinate values
export const isValidCoordinate = (coordinate: Coordinates): boolean => {
  return (
    coordinate.lat >= -90 &&
    coordinate.lat <= 90 &&
    coordinate.lng >= -180 &&
    coordinate.lng <= 180 &&
    !isNaN(coordinate.lat) &&
    !isNaN(coordinate.lng)
  );
};

// Get bearing between two coordinates
export const getBearing = (start: Coordinates, end: Coordinates): number => {
  const startLat = toRadians(start.lat);
  const startLng = toRadians(start.lng);
  const endLat = toRadians(end.lat);
  const endLng = toRadians(end.lng);
  
  const dLng = endLng - startLng;
  
  const y = Math.sin(dLng) * Math.cos(endLat);
  const x = Math.cos(startLat) * Math.sin(endLat) - Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);
  
  const bearing = Math.atan2(y, x);
  return (bearing * 180 / Math.PI + 360) % 360; // Convert to degrees and normalize
};

// Get destination coordinate given start point, bearing, and distance
export const getDestination = (start: Coordinates, bearing: number, distance: number): Coordinates => {
  const R = 6371; // Earth's radius in kilometers
  const bearingRad = toRadians(bearing);
  const startLatRad = toRadians(start.lat);
  const startLngRad = toRadians(start.lng);
  
  const endLatRad = Math.asin(
    Math.sin(startLatRad) * Math.cos(distance / R) +
    Math.cos(startLatRad) * Math.sin(distance / R) * Math.cos(bearingRad)
  );
  
  const endLngRad = startLngRad + Math.atan2(
    Math.sin(bearingRad) * Math.sin(distance / R) * Math.cos(startLatRad),
    Math.cos(distance / R) - Math.sin(startLatRad) * Math.sin(endLatRad)
  );
  
  return {
    lat: endLatRad * 180 / Math.PI,
    lng: endLngRad * 180 / Math.PI
  };
};

// Default map configurations for different regions
export const MAP_CONFIGS = {
  newYork: {
    center: { lat: 40.7128, lng: -74.0060 },
    zoom: 11,
    bounds: {
      north: 40.9176,
      south: 40.4774,
      east: -73.7004,
      west: -74.2591
    }
  },
  losAngeles: {
    center: { lat: 34.0522, lng: -118.2437 },
    zoom: 10,
    bounds: {
      north: 34.8233,
      south: 33.7037,
      east: -117.6462,
      west: -118.9448
    }
  },
  chicago: {
    center: { lat: 41.8781, lng: -87.6298 },
    zoom: 11,
    bounds: {
      north: 42.0230,
      south: 41.6445,
      east: -87.5240,
      west: -87.9401
    }
  }
};