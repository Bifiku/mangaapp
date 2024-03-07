import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { DataStateObject, RootStackParamList } from "../types/types";
import axios from "axios";
import { API_JIKAN } from "../API/jikan";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { AppText } from "../components/ui/AppTexts/AppText";
import { THEME } from "../theme";
import { AppButton } from "../components/ui/AppButton/AppButton";
import { ImageBackground } from "expo-image";
import { Menu } from "../components/Menu/Menu";
import { API_MANGADEX } from "../API/mangadexAPI";

type MangaDetailScreenRouteProp = RouteProp<RootStackParamList, "MangaDetail">;

interface MangaDetailProps {
  route?: MangaDetailScreenRouteProp;
}

export const MangaDetailScreen = ({ route }: MangaDetailProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios({
        method: "GET",
        url: `${API_MANGADEX}/manga`,
        // params: {
        //   title: title,
        // },
      });

      const mangaList = resp.data.data;

      // Для каждой манги в списке
      for (const manga of mangaList) {
        // Получаем идентификатор обложки из свойства cover_art
        const coverId = manga.relationships.find(
          (relationship) => relationship.type === "cover_art",
        ).id;

        // Делаем запрос к API, чтобы получить информацию об обложке по его идентификатору
        const coverResp = await axios({
          method: "GET",
          url: `${API_MANGADEX}/cover/${coverId}`,
        });

        // Получаем имя файла обложки
        const coverFileName = coverResp.data.data.attributes.fileName;

        // Строим URL для загрузки обложки
        const coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}`;

        // Добавляем URL обложки к манге
        manga.coverUrl = coverUrl;
      }

      console.log(mangaList[1].coverUrl);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        if (route) {
          setIsLoading(true);
          const mangaID = route.params.mangaId;
          const response = await axios.get(
            `${API_JIKAN}/manga/${mangaID}/full`,
          );
          const mangaData = response.data;
          dispatch(infoReducer(mangaData));
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching manga data:", error);
      }
    };

    fetchMangaData();
  }, []);

  if (isLoading || !data || !data.data) {
    return (
      <View style={styles.default}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.default}>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.image}
          source={{ uri: data.data.images.jpg.image_url }}
        >
          {data && (
            <Image
              style={styles.vignette}
              source={require("../../assets/images/vignette.png")}
            />
          )}
        </ImageBackground>
      </View>
      <View>
        <View>
          <AppText>{data.data.title}</AppText>
          <AppText>{data.data.score}</AppText>
        </View>
      </View>
      <AppButton onPress={() => navigation.goBack()}>Back</AppButton>
      <Menu />
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    alignItems: "center",
    backgroundColor: THEME.BACKGROUND_COLOR,
  },
  imageContainer: {
    width: "100%",
    height: "40%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    overflow: "hidden",
  },
  vignette: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
