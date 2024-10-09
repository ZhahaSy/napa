import { useVideoPlayer, VideoView } from "expo-video";
import React, { useState } from "react";
import { Image, Modal, Pressable, View } from "react-native";

const VideoViewer = ({ url }: { url: string }) => {
  const player = useVideoPlayer({ uri: url });

  return (
    <>
      <VideoView
        style={{
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
