import Image from "next/image";
import React, { useState, useMemo } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Libraries,
} from "@react-google-maps/api";

interface LocationData {
  address?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
}

interface OptionData {
  meet?: LocationData;
  drop?: LocationData;
}

interface MeetingPointProps {
  data?: {
    description?: string;
    option?: OptionData;
  };
  googleMapsApiKey: string;
}

// Moved outside component to prevent recreation
const LIBRARIES: Libraries = ["places", "geometry"];

function MeetingPoint({ data, googleMapsApiKey }: MeetingPointProps) {
  const [activeMap, setActiveMap] = useState<"meet" | "drop" | null>(null);

  // Memoize loader options to prevent recreation
  const loaderOptions = useMemo(
    () => ({
      id: "google-map-script",
      googleMapsApiKey,
      libraries: LIBRARIES,
    }),
    [googleMapsApiKey]
  );

  const { isLoaded } = useJsApiLoader(loaderOptions);

  const hasMeetingPoint = Boolean(data?.option?.meet?.address);
  const hasDropoffPoint = Boolean(data?.option?.drop?.address);

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "0.5rem",
    marginTop: "1rem",
  };

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    }),
    []
  );

  return (
    <div className="">
      {/* Full Description */}
      {data?.description && (
        <>
          <h2 className="text-xl font-extrabold mt-6 mb-4">Full description</h2>
          <p className="mb-6 max-w-4xl text-justify">{data.description}</p>
        </>
      )}

      {/* Meeting Point Section */}
      {hasMeetingPoint && (
        <div className="mb-8">
          <h2 className="text-xl font-extrabold">Meeting Point</h2>
          <div className="flex mt-4 ml-2 gap-4 items-center">
            <Image
              src="/location-favourite-02.png"
              height={20}
              width={20}
              alt="Meeting point icon"
            />
            <p className="text-[#DD2509] text-[15px] font-bold">
              {data?.option?.meet?.address}
            </p>
          </div>
          {data?.option?.meet?.description && (
            <p className="bg-[#F4F4F4] mt-3 p-6 mr-2 rounded-lg text-[#010A15B2] text-[15px]">
              {data.option.meet.description}
            </p>
          )}

          {isLoaded &&
            data?.option?.meet?.latitude &&
            data?.option?.meet?.longitude && (
              <>
                <button
                  onClick={() =>
                    setActiveMap(activeMap === "meet" ? null : "meet")
                  }
                  className="mt-4 text-green-600 hover:text-green-800 font-medium flex items-center gap-2"
                >
                  {activeMap === "meet" ? "Hide Map" : "Show on Map"}
                </button>

                {activeMap === "meet" && (
                  <div className="mt-4 border rounded-lg overflow-hidden">
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={{
                        lat: data.option.meet.latitude,
                        lng: data.option.meet.longitude,
                      }}
                      zoom={15}
                      options={mapOptions}
                    >
                      <Marker
                        position={{
                          lat: data.option.meet.latitude,
                          lng: data.option.meet.longitude,
                        }}
                        icon={{
                          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                          scaledSize: new window.google.maps.Size(32, 32),
                        }}
                      />
                    </GoogleMap>
                  </div>
                )}
              </>
            )}
        </div>
      )}

      {/* Drop-off Point Section */}
      {hasDropoffPoint && (
        <div className="mb-8">
          <h2 className="text-xl font-extrabold">Drop-off Point</h2>
          <div className="flex mt-4 ml-2 gap-4 items-center">
            <Image
              src="/location-favourite-02.png"
              height={20}
              width={20}
              alt="Drop-off point icon"
            />
            <p className="text-[#DD2509] text-[15px] font-bold">
              {data?.option?.drop?.address}
            </p>
          </div>
          {data?.option?.drop?.description && (
            <p className="bg-[#F4F4F4] mt-3 p-6 mr-2 rounded-lg text-[#010A15B2] text-[15px]">
              {data.option.drop.description}
            </p>
          )}

          {isLoaded &&
            data?.option?.drop?.latitude &&
            data?.option?.drop?.longitude && (
              <>
                <button
                  onClick={() =>
                    setActiveMap(activeMap === "drop" ? null : "drop")
                  }
                  className="mt-4 text-green-600 hover:text-green-800 font-medium flex items-center gap-2"
                >
                  {activeMap === "drop" ? "Hide Map" : "Show on Map"}
                </button>

                {activeMap === "drop" && (
                  <div className="mt-4 border rounded-lg overflow-hidden">
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={{
                        lat: data.option.drop.latitude,
                        lng: data.option.drop.longitude,
                      }}
                      zoom={15}
                      options={mapOptions}
                    >
                      <Marker
                        position={{
                          lat: data.option.drop.latitude,
                          lng: data.option.drop.longitude,
                        }}
                        icon={{
                          url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                          scaledSize: new window.google.maps.Size(32, 32),
                        }}
                      />
                    </GoogleMap>
                  </div>
                )}
              </>
            )}
        </div>
      )}
    </div>
  );
}

export default MeetingPoint;
