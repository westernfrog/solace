"use client";

import { Volume2Icon, VolumeXIcon } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export default function Volume() {
  const { isMuted, toggleMute } = useAudio();

  return (
    <div className="fixed top-0 bottom-0 left-0 z-50">
      <div className="flex flex-col items-center justify-end gap-4 h-full lg:px-10 px-6 py-6">
        <button
          onClick={toggleMute}
          className="bg-light text-black rounded-full w-10 h-10 flex flex-col items-center justify-center backdrop-blur-xl"
        >
          {isMuted ? <VolumeXIcon size={18} /> : <Volume2Icon size={18} />}
          <span className="sr-only text-xs">Mute/Unmute</span>
        </button>
      </div>
    </div>
  );
}
