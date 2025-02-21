"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const AudioContext = createContext();

const defaultScene = {
  name: "Rain",
  audioUrl: "/audio/rain.webm",
  videoUrl:
    "https://videos.pexels.com/video-files/5487781/5487781-uhd_2560_1440_30fps.mp4",
};

export function AudioProvider({ children }) {
  const [currentScene, setCurrentScene] = useState(defaultScene);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }

    if (currentScene) {
      audioRef.current.src = currentScene.audioUrl;
      audioRef.current.load();

      if (!isMuted) {
        audioRef.current.play();
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

  console.log(currentScene);

  return (
    <AudioContext.Provider
      value={{ currentScene, setCurrentScene, isMuted, toggleMute }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
