import React, { useState, useRef } from "react";

interface Reel {
  id: number;
  title: string;
  video: string;
  caption: string;
}

function ReelsCard({ data }: { data: Reel[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
      {data.map((reel) => (
        <ReelItem key={reel.id} reel={reel} />
      ))}
    </div>
  );
}

function ReelItem({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.muted = false;
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true;
    }
  };

  return (
    <div
      className="relative rounded-[10px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer w-[338px] h-[578px] mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        src={reel.video}
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 hover:bg-opacity-10"></div>

      {/* Content */}
      <div className="absolute bottom-4 left-4 p-4 text-white">
        <h3 className="text-lg font-bold">{reel.title}</h3>
        <p className="text-sm opacity-80">{reel.caption}</p>
      </div>

      {/* Mute/Unmute Button */}
      <button
        className="absolute top-4 right-4 bg-gray-800 bg-opacity-70 p-2 rounded-full text-white"
        onClick={(e) => {
          e.stopPropagation();
          setIsMuted(!isMuted);
          if (videoRef.current) videoRef.current.muted = !isMuted;
        }}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}

export default ReelsCard;
