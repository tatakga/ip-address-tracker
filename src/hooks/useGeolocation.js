import { useEffect, useState } from "react";
import getData from "../helpers/api";
import { regexDomain, regexIp } from "../helpers/regex";

const API_KEY = import.meta.env.VITE_IPIFY_API_KEY;
const BASE_URL = "https://geo.ipify.org/api/v1";

const useGeolocation = () => {
  const [ipDomain, setIpDomain] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const checkUrl = (ipDomain) => {
    let url;
    if (regexDomain.test(ipDomain)) {
      url = `${BASE_URL}?apiKey=${API_KEY}&domain=`;
    } else if (regexIp.test(ipDomain)) {
      url = `${BASE_URL}?apiKey=${API_KEY}&ipAddress=`;
    }

    return url;
  };

  useEffect(() => {
    let isMounted = true;
    if (ipDomain === "" || !ipDomain) return;
    const url = checkUrl(ipDomain);

    const getLocation = async (url) => {
      if (!isMounted) return;
      setLoading(true);
      setError(false);
      setData(null);
      try {
        const response = await getData(url + ipDomain);
        if (response.ok) {
          const result = await response.json();
          const formattedData = {
            ip: result.ip,
            location: `${result.location.city}, ${result.location.region} ${result.location.postalCode}`,
            timezone: `UTC${result.location.timezone}`,
            isp: result.isp,
            lat: result.location.lat,
            lng: result.location.lng,
          };
          setData(formattedData);
          setLoading(false);
          setError(false);
        } else {
          throw new Error("failed fetching data");
        }
      } catch (error) {
        setData(null);
        setLoading(false);
        setError(true);
      }
    };

    getLocation(url);

    return () => {
      isMounted = false;
    };
  }, [ipDomain]);

  return { data, loading, error, setIpDomain };
};

export default useGeolocation;
