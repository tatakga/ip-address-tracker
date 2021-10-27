import { MapContainer, TileLayer } from "react-leaflet"
const position = [51.505, -0.09]
const Map = ({ setMap }) => {
  return (
    <MapContainer center={position} zoom={14} whenCreated={setMap} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default Map
