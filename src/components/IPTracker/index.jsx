import { useEffect, useState } from "react"
import L from "leaflet"
import IconRetina from "../../images/icon-location.svg"
import IconUrl from "../../images/icon-location.svg"

const regexDomain = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
const regexIp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g

import "./IPTracker.styles.css"
import Header from "./Header"
import Result from "./Result"
import Map from "./Map"
import useGeolocation from "../../hooks/useGeolocation";



const Icon = new L.Icon({
  iconRetinaUrl: IconRetina,
  iconUrl: IconUrl,
  shadowSize: [0, 0],
})

const IPTracker = () => {
  const [map, setMap] = useState(null)
  const { data, loading, error, setIpDomain } = useGeolocation();

  useEffect(() => {
    if (!map) return;
    map.locate({
      setView: true
    });
  }, [map])

  useEffect(() => {
    if (!data) return;
    const leafletMarkerPane = document.querySelector('.leaflet-marker-pane')
    const imageMarker = document.querySelector('.leaflet-marker-pane img')
    if (imageMarker) {
      leafletMarkerPane.removeChild(imageMarker)
    }
    L.marker([data.lat, data.lng], { icon: Icon }).addTo(map)
    map.flyTo([data.lat, data.lng], 14);
  }, [data])

  // const reqData = async (domainip) => {
  //   let url;
  //   if (regexDomain.test(domainIp)) {
  //     url = 'https://geo.ipify.org/api/v1?apiKey=at_ap3siwcATpaH9vij9QGOkSXYdcZTd&domain='
  //   } else if (regexIp.test(domainIp)) {
  //     url = 'https://geo.ipify.org/api/v1?apiKey=at_ap3siwcATpaH9vij9QGOkSXYdcZTd&ipAddress='
  //   }
  //   const response = await fetch(`${url}${domainip}`)
  //   const data = await response.json();
  //   return data
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (input === "") return;
  //   setIpDomain(input)
  // }

  return (
    <div className="ip-tracker">

      {loading && <div style={{ position: "fixed", backgroundColor: "#FFF", width: "100px", height: "40px", top: "50%", bottom: "50%", left: "50%", right: "50%", zIndex: "999" }}>Loading</div>}

      {error && alert('Error. Refresh and Try  Again')}

      <Header setIpDomain={setIpDomain} />

      <Result {...data} />

      <Map setMap={setMap} />
    </div>
  )
}

export default IPTracker
