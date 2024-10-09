import React, { useState } from "react";
import { Dimensions, Image, Modal, Pressable, View } from "react-native";

const { width, height } = Dimensions.get("window");


const ImageViewer = ({
  url,
}: {
  url: string;
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <Modal visible={fullscreen} animationType="slide">
        <Pressable
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#868686",
          }}
          onPress={() => {
            setFullscreen((preState) => !preState);
          }}
        >
          <Image
            style={{
              height: width,
              width: height,
            }}
            resizeMode="center"
            source={{ uri: url }}
          />
        </Pressable>
      </Modal>
      <Pressable
        onPress={() => {
          setFullscreen((preState) => !preState);
        }}
      >
        <Image
          style={{
            minWidth: 150,
            maxWidth: 200,
            minHeight: 150,
            maxHeight: 200,
          }}
          resizeMode="center"
          source={{ uri: url }}
        />
      </Pressable>
    </>
  );
};
export default ImageViewer;
