import * as React from "react";
import { Text, View, StyleSheet, Dimensions, Button } from "react-native";
import {
  Actions,
  ActionsProps,
  GiftedChat,
  GiftedChatProps,
  IMessage,
  RenderMessageVideoProps,
} from "react-native-gifted-chat";
import { useEffect, useRef, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useVideoPlayer, VideoPlayer, VideoView } from "expo-video";
import ImageViewer from "@/components/ImageViewer";
import VideoViewer from "@/components/VideoViewer";

const { width } = Dimensions.get("window");

export default function App() {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: Date.now(),
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 0,
        name: "GiftedChat",
        avatar: "https://s2.loli.net/2024/09/29/cO5fkNjbCiDLHnA.jpg",
      },
    },
  ]);
  const onSend = (newMessages: IMessage[] = []) =>
    setMessages(GiftedChat.append(messages, newMessages));

  async function handlePickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.canceled) {
      const imgMsgs: IMessage[] = result.assets.map((item) => {
        if (item.type === "video" || item.uri.includes("data:video")) {
          return {
            _id: messages.length + 1,
            text: "",
            createdAt: new Date(),
            user: {
              _id: 1,
            },
            video: item.uri,
          };
        }
        return {
          _id: Date.now(),
          text: "",
          createdAt: new Date(),
          user: {
            _id: 1,
          },
          image: item.uri,
          width: item.width,
          height: item.height,
        };
      });
      onSend(imgMsgs);
    }
  }

  function renderActions(props: Readonly<ActionsProps>) {
    return (
      <Actions
        {...props}
        options={{
          ["图片或视频"]: handlePickImage,
          ["取消"]: () => {},
        }}
        icon={() => <EvilIcons name={"plus"} size={28} />}
      />
    );
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        {...{ messages, onSend }}
        renderActions={renderActions}
        renderMessageVideo={(message) => {
          const url = message.currentMessage.video;
          return url ? <VideoViewer url={url || ""} /> : null;
        }}
        renderMessageImage={(message) => {
          const url = message.currentMessage.image;
          return url ? (
            <ImageViewer url={message.currentMessage.image || ""} />
          ) : null;
        }}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
