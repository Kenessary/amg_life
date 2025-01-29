import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Text, View, ScrollView, StyleSheet } from "react-native";
import { WaveIndicator } from "react-native-indicators";
import { ImageSlider } from "./ImageSlider";
import i18n from "i18n-js";

import axios, * as others from "axios";

import TopBarNavigation from "../../../../components/TopBarNavigation";
import { backButton } from "../../../../components/GoBackButton";
import { Colors } from "../../../../styles/colors";
import { Video, AVPlaybackStatus } from "expo-av";
const cheerio = require("cheerio");

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const subTitle = [];
const contentTitle = [];
const date = [];
const pictures_links = [];
const paragraph = [];
const videos = [];

// console.log(videos)

export default function SingleNewsScreen({ route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [newtitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newPictures, setNewPictures] = useState("");
  const [vd, setVd] = useState("");

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  async function getGenre() {
    try {
      setIsLoading(true);
      subTitle.splice(0, subTitle.length);
      contentTitle.splice(0, contentTitle.length);
      date.splice(0, date.length);
      pictures_links.splice(0, pictures_links.length);
      paragraph.splice(0, paragraph.length);
      videos.splice(0, videos.length);
      const response = await axios.get(
        `http://www.cnpc-amg.kz/${route.params}`
      );

      const $ = cheerio.load(response.data);

      const stitle = $(
        "#content > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > div > b > span"
      );
      stitle.each(function () {
        srt = $(this).text();
        subTitle.push(srt);
        setSubtitle(subTitle);
      });

      const title = $(
        "#content > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > div > p.content_title"
      );
      title.each(function () {
        titw = $(this).text();
        contentTitle.push(titw);
        setNewTitle(contentTitle);
      });

      const dates = $(
        "#content > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > div > p.right"
      );
      dates.each(function () {
        day = $(this).text();
        date.push(day);
        setNewDate(date);
      });

      const pictr = $(
        "#content > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > div > img"
      );
      pictr.each(function () {
        src = $(this).attr("src");
        pictures_links.push({ src });
      });
      const pictures = $("center > img");
      pictures.each(function () {
        src = $(this).attr("src");
        pictures_links.push({ src });
        setNewPictures(pictures_links);
      });

      const par = $("p");
      par.each(function () {
        prt = $(this).text();
        paragraph.push({ prt });
      });

      const mp4 = $("source");
      mp4.each(function () {
        mp = $(this).attr("src");
        videos.push({ mp });
        // setVd(videos)
      });

      paragraph.splice(0, 1);
      paragraph.splice(0, 1);
      paragraph.splice(0, 1);
      paragraph.splice(0, 1);
      paragraph.splice(paragraph.length - 1, 1);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getGenre();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.white,
        }}
      >
        <WaveIndicator key={Math.random()} color={Colors.primary} />
      </View>
    );
  }

  const isVideo = [];

  for (let i = 0; i < videos.length; i++) {
    isVideo.push(
      <Video
        key={i}
        ref={video}
        style={styles.video}
        source={{
          uri: `http://www.cnpc-amg.kz/${videos[i].mp}`,
        }}
        useNativeControls
        resizeMode="contain"
        isMuted={false}
        volume={1.0}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    );
  }

  const newParagraph = [];

  for (let i = 0; i < paragraph.length; i++) {
    newParagraph.push(
      <View key={i} style={{ width: windowWidth - 40, marginTop: 10 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "400",
            textAlign: "justify",
            letterSpacing: -0.2,
            color: Colors.smoothBlack,
          }}
        >
          {" "}
          {paragraph[i].prt}
        </Text>
      </View>
    );
  }
  // console.log(pictures_links);

  return (
    <View style={styles.container}>
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("news")}
        backButton={backButton()}
        height={"15%"}
      />
      <ScrollView style={{ marginTop: 10, height: "85%" }}>
        <View style={{ width: windowWidth }}>
          <View style={{ width: "100%", alignItems: "center" }}>
            {videos.length === 0
              ? pictures_links.length !== 0 && (
                  <ImageSlider
                    images={pictures_links.map(
                      (links) => "http://www.cnpc-amg.kz/" + links.src
                    )}
                  />
                )
              : isVideo}
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitleText}>{subtitle}</Text>
            </View>

            <Text style={styles.titleText}>{newtitle}</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{newDate}</Text>
            </View>
          </View>

          <View
            style={{
              ...styles.paragraphContainer,
              backgroundColor:
                videos.length === 0 ? Colors.white : Colors.background,
            }}
          >
            {newParagraph}
            <View
              style={{
                width: windowWidth - 30,
                marginTop: 10,
                backgroundColor: Colors.background,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  titleContainer: {
    width: "95%",
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 20,
  },
  subtitleContainer: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.04)",
    borderRadius: 8,
    alignSelf: "flex-start",
    flexDirection: "row",
    maxWidth: "90%",
  },
  video: {
    alignSelf: "stretch",
    width: "100%",
    height: 250,
  },
  subtitleText: {
    fontSize: 14,
    color: Colors.smoothBlack,
  },
  titleText: {
    fontSize: 16,
    color: Colors.smoothBlack,
    paddingLeft: 5,
    fontWeight: "500",
    marginTop: 15,
  },
  dateContainer: {
    marginTop: 5,
    alignSelf: "flex-end",
  },
  dateText: {
    fontSize: 12,
    color: Colors.smoothBlack,
  },
  paragraphContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: 15,
    padding: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
