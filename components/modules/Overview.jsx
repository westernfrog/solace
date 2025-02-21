"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudRainIcon,
  CoffeeIcon,
  MoonStarIcon,
  TreesIcon,
  WavesIcon,
  WindIcon,
} from "lucide-react";
import { useAudio } from "@/context/AudioContext";

const scenes = [
  {
    name: "Rain",
    icon: CloudRainIcon,
    videoUrl:
      "https://videos.pexels.com/video-files/5487781/5487781-uhd_2560_1440_30fps.mp4",
    audioUrl: "/audio/rain.webm",
  },
  {
    name: "Wind",
    icon: WindIcon,
    videoUrl:
      "https://videos.pexels.com/video-files/3754639/3754639-uhd_2560_1440_25fps.mp4",
    audioUrl: "/audio/wind.webm",
  },
  {
    name: "Ocean",
    icon: WavesIcon,
    videoUrl:
      "https://videos.pexels.com/video-files/30732889/13147625_2560_1440_25fps.mp4",
    audioUrl: "/audio/ocean.webm",
  },
  {
    name: "Forest",
    icon: TreesIcon,
    videoUrl:
      "https://videos.pexels.com/video-files/17832785/17832785-uhd_2560_1440_24fps.mp4",
    audioUrl: "/audio/forest.webm",
  },
  {
    name: "Cafe",
    icon: CoffeeIcon,
    videoUrl:
      "https://videos.pexels.com/video-files/5032277/5032277-hd_1920_1080_25fps.mp4",
    audioUrl: "/audio/cafe.webm",
  },
  {
    name: "Night",
    icon: MoonStarIcon,
    videoUrl:
      "https://videos.pexels.com/video-files/5555466/5555466-uhd_2560_1440_24fps.mp4",
    audioUrl: "/audio/night.webm",
  },
];

export default function Overview() {
  const { currentScene, setCurrentScene } = useAudio();
  const videoRef = useRef(null);

  return (
    <main className="fixed inset-0 z-0">
      <section className="relative h-full w-full">
        <AnimatePresence mode="wait">
          {currentScene && (
            <motion.video
              key={currentScene.videoUrl}
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover ring-1 ring-light/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <source src={currentScene.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </motion.video>
          )}
        </AnimatePresence>

        <div className="fixed top-0 bottom-0 right-0">
          <div className="flex flex-col items-center lg:justify-center justify-end gap-4 h-full lg:px-10 px-6 py-6">
            {scenes.map((scene) => {
              const Icon = scene.icon;
              return (
                <button
                  key={scene.name}
                  onClick={() => setCurrentScene(scene)}
                  className={`${
                    currentScene?.name === scene.name
                      ? "bg-light text-black"
                      : "bg-light/20 text-white hover:bg-light hover:text-black"
                  } transition-all duration-500 ease-in-out rounded-full w-10 h-10 flex flex-col items-center justify-center backdrop-blur-xl`}
                >
                  <Icon size={18} />
                  <span className="sr-only text-xs">{scene.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
