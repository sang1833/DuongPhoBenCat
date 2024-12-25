import axios from "axios";
import { trackUserAccess } from "./function";

interface IpInfor {
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

export const getIpInfor = async () => {
  try {
    // Get the user's IP address
    const ipResponse = await axios.get("https://api.ipify.org?format=json");
    const userIp = ipResponse.data.ip;

    // Get IP information using the obtained IP address
    const response = await axios.get(`https://ipinfo.io/${userIp}`, {
      params: {
        token: import.meta.env.VITE_IPINFO_API_KEY
      }
    });
    const ipInfor: IpInfor = response.data;

    const response2 = await trackUserAccess(
      ipInfor.ip,
      ipInfor.hostname,
      ipInfor.city,
      ipInfor.region,
      ipInfor.country,
      ipInfor.loc,
      ipInfor.org,
      ipInfor.postal,
      ipInfor.timezone
    );

    return response2;
  } catch (error) {
    console.error("Get ip error", error);
  }
};
