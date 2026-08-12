import type { LocationInformation } from '../types/property'

export const locationInformation: LocationInformation = {
  marketingArea: 'Kota Kemuning',
  address: 'Lot 182958, Jalan Anggerik Disa 31/187, Seksyen 31, Kota Kemuning, 40450 Shah Alam, Selangor',
  latitude: null,
  longitude: null,
  nearbyPlaces: [
    { id: 'kesas', name: 'KESAS', distanceLabel: '4.6 km' },
    { id: 'lksa', name: 'LKSA', distanceLabel: '4.6 km' },
    { id: 'federal', name: 'Federal Highway', distanceLabel: '16 km' },
    { id: 'elite', name: 'ELITE', distanceLabel: '16 km' },
    { id: 'skve', name: 'SKVE', distanceLabel: '24 km' },
  ],
  classification: 'confirmed',
}
