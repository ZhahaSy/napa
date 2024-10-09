import { useVideoPlayer, VideoView } from "expo-video";
import React, { useState } from "react";
import { Image, Modal, Pressable, View } from "react-native";

const VideoViewer = ({ url }: { url: string }) => {
  const player = useVideoPlayer({ uri: url });

  const [isPlaying, setIsPlaying] = useState(false)

  player.addListener('playingChange', (newIsPlaying) => {
    setIsPlaying(newIsPlaying)
  })
  return (
    <>
      <VideoView
        style={isPlaying ? {
          minWidth: 250,
          maxWidth: 300,
          minHeight: 250,
          maxHeight: 300,
        } :{
          minWidth: 150,
          maxWidth: 200,
          minHeight: 150,
          maxHeight: 200,
        }}
        startsPictureInPictureAutomatically
        player={player}
        allowsFullscreen
      />
    </>
  );
};
export default VideoViewer;
