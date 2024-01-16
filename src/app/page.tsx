"use server";

import {getStations, Station} from "@/lib/stations";
import { StationUrl } from "@/components/stationUrl";
import UserAlert from "@/components/userAlert";
export default async function Page() {
  try {
    const stations:Station[] = await getStations();
    return (
      <>
        Select a station:
        <StationUrl stations={stations} />
      </>
    );
  } catch (e: any) {
    return (
      <>
        <UserAlert message={e.message}></UserAlert>
      </>
    );
  }
}
