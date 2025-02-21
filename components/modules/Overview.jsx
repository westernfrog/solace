"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudRainIcon,
  CoffeeIcon,
  MoonStarIcon,
  TreesIcon,
  Volume2Icon,
  WavesIcon,
  WindIcon,
  VolumeXIcon,
} from "lucide-react";

const scenes = [
  {
    name: "Rain",
    icon: CloudRainIcon,
    videoUrl:
      "https://videos.pexels.com/video-files/4323285/4323285-hd_1920_1080_30fps.mp4",
    audioUrl: "/audio/rain.webm",
  },
  {
    name: "Wind",
    icon: WindIcon,
    videoUrl:
      "https://videos.pexels.com/video-files/6527468/6527468-uhd_2560_1440_25fps.mp4",
    audioUrl: "/audio/wind.webm",
  },
  {
    name: "Ocean",
    icon: WavesIcon,
    videoUrl:
      "https://videos.pexels.com/video-files/3320966/3320966-hd_1920_1080_30fps.mp4",
    audioUrl: "/audio/ocean.webm",
  },
  {
    name: "Forest",
    icon: TreesIcon,
    videoUrl:
      "https://videos.pexels.com/video-files/3111529/3111529-hd_1920_1080_25fps.mp4",
    audioUrl: "/audio/forest.webm",
  },
  {
    name: "Cafe",
    icon: CoffeeIcon,
    videoUrl:
      "https://videos.pexels.com/video-files/2909914/2909914-uhd_2732_1440_24fps.mp4",
    audioUrl: "/audio/cafe.webm",
  },
  {
    name: "Night",
    icon: MoonStarIcon,
    videoUrl:
      "https://videos.pexels.com/video-files/6316944/6316944-uhd_1440_2560_25fps.mp4",
    audioUrl: "/audio/night.webm",
  },
];

export default function Overview() {
  const [currentScene, setCurrentScene] = useState(scenes[0]);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const handleSceneChange = (scene) => {
    setCurrentScene(scene);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    if (audioRef.current) {
      audioRef.current.src = currentScene.audioUrl;
      audioRef.current.load();

      const fadeInAudio = () => {
        let volume = 0;
        audioRef.current.volume = volume;
        audioRef.current.play();

        const fadeInterval = setInterval(() => {
          if (volume < 1) {
            volume += 0.05;
            audioRef.current.volume = Math.min(volume, 1);
          } else {
            clearInterval(fadeInterval);
          }
        }, 100);
      };

      if (!isMuted) {
        fadeInAudio();
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentScene, isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMutedState = !prev;
      if (audioRef.current) {
        audioRef.current.muted = newMutedState;
        if (newMutedState) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
      }
      return newMutedState;
    });
  };

  return (
    <main className="fixed inset-0 z-0">
      <section className="relative h-full w-full">
        <AnimatePresence mode="wait">
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
        </AnimatePresence>

        <audio ref={audioRef} loop autoPlay hidden>
          <source src={currentScene.audioUrl} type="audio/webm" />
        </audio>

        <div className="fixed top-0 bottom-0 right-0">
          <div className="flex flex-col items-center lg:justify-center justify-end gap-4 h-full lg:px-10 px-6 py-6">
            {scenes.map((scene) => {
              const Icon = scene.icon;
              return (
                <button
                  key={scene.name}
                  onClick={() => handleSceneChange(scene)}
                  className={`${
                    currentScene.name === scene.name
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

        <div className="fixed top-0 bottom-0 left-0">
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
      </section>
    </main>
  );
}
