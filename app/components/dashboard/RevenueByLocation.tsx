"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function RevenueByLocation() {
  const locations = [
    { city: "New York", revenue: "72K", coordinates: [-74.006, 40.7128] },
    {
      city: "San Francisco",
      revenue: "39K",
      coordinates: [-122.4194, 37.7749],
    },
    { city: "Sydney", revenue: "25K", coordinates: [151.2093, -33.8688] },
    { city: "Singapore", revenue: "61K", coordinates: [103.8198, 1.3521] },
  ];

  return (
    <div className="bg-[#F7F9FB] dark:bg-[#282828] rounded-2xl p-5 h-full card-hover">
      <h3 className="text-sm font-semibold text-[#1C1C1C] dark:text-white mb-4">
        Revenue by Location
      </h3>

      {/* World Map */}
      <div className="relative h-32 mb-4 overflow-hidden">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 120,
            center: [0, 20],
          }}
          width={800}
          height={320}
        >
          <Geographies geography={geoUrl}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {({ geographies }: any) =>
              /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#C6D7E3"
                  stroke="#B8C9D6"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {locations.map((location) => (
            <Marker
              key={location.city}
              coordinates={location.coordinates as [number, number]}
            >
              <circle
                r={12}
                className="border-1 border-[#F7F9FB]"
                fill="#1C1C1C"
              />
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Location list */}
      <div className="space-y-2.5">
        {locations.map((location, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-xs text-[#1C1C1C] dark:text-white">
              {location.city}
            </span>
            <div className="flex items-center gap-3 flex-1 mx-4">
              <div className="flex-1 h-px bg-[#A8C5DA] "></div>
            </div>
            <span className="text-xs font-medium text-[#1C1C1C] dark:text-white">
              {location.revenue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
