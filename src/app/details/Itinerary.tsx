// components/ItineraryWithGoogleMaps.tsx
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
  FaMap,
  FaDirections,
} from "react-icons/fa";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
  Libraries,
  useJsApiLoader,
} from "@react-google-maps/api";

interface Stop {
  id: number;
  title: string;
  description: string;
  order: number;
  is_main_stop: boolean;
  latitude: number;
  longitude: number;
}

interface ItineraryProps {
  data: {
    itineraries: Stop[];
  };
  googleMapsApiKey: string;
}

const libraries: Libraries = ["places", "geometry"];

export default function ItineraryWithGoogleMaps({
  data,
  googleMapsApiKey,
}: ItineraryProps) {
  const [expandedStop, setExpandedStop] = useState<number | null>(null);
  const [showFullMap, setShowFullMap] = useState(false);
  const [activeMapStop, setActiveMapStop] = useState<number | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
    libraries,
  });

  const parseDuration = (description: string) => {
    const durationMatch = description.match(
      /\((\d+.?\d*\s*hours?|\d+\s*minutes?)\)/i
    );
    return durationMatch ? durationMatch[1] : null;
  };

  const parseActivity = (description: string) => {
    const lines = description.split("\n");
    return {
      location: lines[0],
      activity: lines.length > 1 ? lines[1] : "",
    };
  };

  // Calculate bounds only when data and google are available
  const bounds = useMemo(() => {
    if (!isLoaded || !window.google) return null;
    const bounds = new window.google.maps.LatLngBounds();
    data.itineraries.forEach((stop) => {
      bounds.extend(
        new window.google.maps.LatLng(stop.latitude, stop.longitude)
      );
    });
    return bounds;
  }, [data.itineraries, isLoaded]);

  // Fit bounds when map loads or when showFullMap changes
  useEffect(() => {
    if (map && bounds && showFullMap) {
      map.fitBounds(bounds);
      map.panToBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
    }
  }, [map, showFullMap, bounds]);

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);

      if (data.itineraries.length >= 2 && window.google) {
        const directionsService = new window.google.maps.DirectionsService();
        const waypoints = data.itineraries.slice(1, -1).map((stop) => ({
          location: { lat: stop.latitude, lng: stop.longitude },
          stopover: true,
        }));

        directionsService.route(
          {
            origin: {
              lat: data.itineraries[0].latitude,
              lng: data.itineraries[0].longitude,
            },
            destination: {
              lat: data.itineraries[data.itineraries.length - 1].latitude,
              lng: data.itineraries[data.itineraries.length - 1].longitude,
            },
            waypoints,
            travelMode: window.google.maps.TravelMode.DRIVING,
            optimizeWaypoints: true,
          },
          (result, status) => {
            if (status === "OK") {
              setDirections(result);
            }
          }
        );
      }
    },
    [data.itineraries]
  );

  const handleViewOnMap = (stop: Stop) => {
    setActiveMapStop(stop.id);
    setShowFullMap(true);
    if (map && window.google) {
      map.panTo(new window.google.maps.LatLng(stop.latitude, stop.longitude));
      map.setZoom(15);
    }
  };

  const toggleStop = (id: number) => {
    setExpandedStop(expandedStop === id ? null : id);
  };

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
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

  if (!isLoaded) return <div className="text-center py-8">Loading map...</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6 mb-12">
      {/* Header */}
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Tour Itinerary</h2>
            <p className="mt-1 opacity-90">
              Detailed breakdown of your experience
            </p>
          </div>
          <button
            onClick={() => setShowFullMap(!showFullMap)}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <FaMap />
            {showFullMap ? "Hide Map" : "Show Map"}
          </button>
        </div>
      </div>

      {/* Map Section */}
      {showFullMap && isLoaded && (
        <div className="h-96 w-full relative">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={mapOptions}
            onLoad={onMapLoad}
          >
            {data.itineraries.map((stop) => (
              <Marker
                key={stop.id}
                position={{ lat: stop.latitude, lng: stop.longitude }}
                onClick={() => setActiveMapStop(stop.id)}
                icon={{
                  url: stop.is_main_stop
                    ? "https://maps.google.com/mapfiles/ms/icons/orange-dot.png"
                    : "https://maps.google.com/mapfiles/ms/icons/purple-dot.png",
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
              />
            ))}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: "#3b82f6",
                    strokeWeight: 4,
                    strokeOpacity: 0.8,
                  },
                  suppressMarkers: true,
                }}
              />
            )}
          </GoogleMap>
        </div>
      )}
      {/* Itinerary Stops */}
      <div className="divide-y divide-gray-200/50">
        {data.itineraries.map((stop, index) => {
          const { location, activity } = parseActivity(stop.description);
          const duration = parseDuration(stop.description);
          const isExpanded = expandedStop === stop.id;
          const isMapActive = activeMapStop === stop.id;

          return (
            <div
              key={stop.id}
              className={`p-6 transition-all duration-200 ${
                isExpanded ? "bg-orange-50" : "hover:bg-gray-50"
              } ${isMapActive ? " " : ""}`}
            >
              <div className="flex gap-4">
                {/* Order number and timeline */}
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors 
                      ${
                        stop.is_main_stop
                          ? "bg-orange-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }
                      ${isExpanded ? "ring-2 ring-orange-400" : ""}`}
                  >
                    <span className="font-medium">{stop.order}</span>
                  </div>
                  {index !== data.itineraries.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-gray-300 to-transparent"></div>
                  )}
                </div>

                {/* Stop details */}
                <div className="flex-1">
                  <button
                    className="w-full text-left"
                    onClick={() => toggleStop(stop.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {stop.title}
                        </h3>
                        {location && (
                          <div className="flex items-center mt-1 text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-orange-500" />
                            <span>{location}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {stop.is_main_stop && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                            Main Stop
                          </span>
                        )}
                        {isExpanded ? (
                          <FaChevronUp className="text-gray-500" />
                        ) : (
                          <FaChevronDown className="text-gray-500" />
                        )}
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 pl-2">
                      {activity && (
                        <div className="mt-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex items-start">
                            <FaInfoCircle className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                            <div>
                              <p className="text-gray-700">
                                {activity.replace(/\(.*?\)/g, "").trim()}
                              </p>
                              {duration && (
                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                  <FaClock className="mr-1.5" />
                                  <span>{duration}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => handleViewOnMap(stop)}
                          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <FaMapMarkerAlt />
                          View on Map
                        </button>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${stop.latitude},${stop.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <FaDirections />
                          Get Directions
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
