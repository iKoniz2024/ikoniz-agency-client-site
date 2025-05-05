import Image from "next/image";
import React from "react";

interface Feature {
  icon: string;
  backgroundColor: string;
  liteBg: string;
  title: string;
  subtitle: string;
}

interface OverviewProps {
  data: {
    description?: string;
    shortDescription?: string;
    overviewcards?: Feature[];
  };
}

function Overview({ data }: OverviewProps) {
  return (
    <div>
      <h2 className="text-xl font-extrabold">About</h2>
      <p className="mt-3 pr-8 text-base text-[#010A15B2]">
        {data?.shortDescription || ""}
      </p>
      <h2 className="text-xl font-extrabold mt-3">Overview</h2>
      <div className="flex flex-wrap lg:w-4/5 sm:mb-2 -mx-2">
        {data?.overviewcards?.map((feature, index) => (
          <div key={index} className="sm:w-1/2 w-full">
            <div className="flex gap-4 p-4 h-full items-center">
              <div
                dangerouslySetInnerHTML={{ __html: feature.icon }}
                className="w-6 h-6"
              />
              <div>
                <h3 className="title-font font-bold text-[15px] text-[#010A15]">
                  {feature.title}
                </h3>
                <p className="text-[15px] text-[#010A15B2]">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Overview;