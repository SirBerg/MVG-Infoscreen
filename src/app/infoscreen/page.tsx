"use server";

import { RenderStation } from "@/components/renderStation";
import { Station, getStations } from "@/lib/stations";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page(props: Props) {
  const searchParams = props.searchParams;
  const stationsParam = searchParams.stations as string;

  if (!stationsParam) {
    return <div>No station provided.</div>;
  }

  let stations: string[] = stationsParam.split(",");

  if (stations.length == 0) {
    return <div>No station provided.</div>;
  }

  let availableStations: Array<Station> = [];
  try {
    availableStations = await getStations();
  } catch (e: any) {
    return (
      <>
        <div>Could not load stations.</div>
        <div>{e.message}</div>
      </>
    );
  }

  if (
    stations.some(
      (station) =>
        !availableStations.find(
          (availableStation) => availableStation.id === station,
        ),
    )
  ) {
    return (
      <>
        <div>Invalid station provided.</div>
      </>
    );
  }

  const stationInfos = availableStations.filter((station) =>
    stations.includes(station.id),
  )!;

  return (
    <div className="w-full h-screen bg-blue-900 text-white p-5">
      {stationInfos.map((station, index) => (
        <div key={index} className="mb-8">
          <h1 className="text-6xl pb-4">{station.name}</h1>
          <div className="w-full bg-blue-700">
            <RenderStation stationId={station.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
