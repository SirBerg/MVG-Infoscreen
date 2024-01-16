"use server";

import { RenderStation } from "@/components/renderStation";
import UserAlert from "@/components/userAlert";
import { Station, getStations } from "@/lib/stations";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};


export default async function Page(props: Props) {
  const searchParams = props.searchParams;
  const stationsParam = searchParams.stations as string;
  function showErrorMessage(error:string){
    return (
      <>
        <UserAlert message={error}></UserAlert>
      </>
    );
  }
  if (!stationsParam) {
    return showErrorMessage("No station provided.")
  }

  let stations: string[] = stationsParam.split(",");

  if (stations.length == 0) {
    return showErrorMessage("No station provided.");
  }

  let availableStations: Array<Station> = [];
  try {
    availableStations = await getStations();
  } catch (e: any) {
    return showErrorMessage(e.message);
  }

  if (
    stations.some(
      (station) =>
        !availableStations.find(
          (availableStation) => availableStation.id === station,
        ),
    )
  ) {
    return showErrorMessage("Invalid station provided.");
  }

  const stationInfos = availableStations.filter((station) =>
    stations.includes(station.id),
  )!;

  return (
    <div className="w-full h-screen bg-blue-900 text-white p-5">
      {stationInfos.map((station, index) => (
        <div key={index} className="mb-8">
          <h1 className="text-7xl pb-4">{station.name}</h1>
          <div className="w-full rounded-lg bg-blue-700 text-5xl">
            <RenderStation stationId={station.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
