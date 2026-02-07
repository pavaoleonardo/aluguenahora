'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon not showing
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

type PropertyMapProps = {
    latitude: number
    longitude: number
    titulo: string
}

export default function PropertyMap({ latitude, longitude, titulo }: PropertyMapProps) {
  if (!latitude || !longitude) return null

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 z-0 relative">
      <MapContainer 
        center={[latitude, longitude]} 
        zoom={15} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={icon}>
          <Popup>
            {titulo}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
