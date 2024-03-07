import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { THEME } from "../../theme";
import { randomMangaFull } from "../../types/randomManga.type";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchData } from "../../store/actions/actions";

export const BlockWithRandomsMangas = () => {
  const { data: randomManga } = useAppSelector(
    (state) => state.randomMangaSlice,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchData({
        url: "/manga/random",
        slice: "randomManga",
        params: {
          includes: ["cover_art"],
        },
      }),
    );
  }, []);

  if (!randomManga) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: `https://uploads.mangadex.org/covers/${randomManga.data.id}/${
            randomManga.data.relationships.find((i) => i.type === "cover_art")
              ?.attributes.fileName ?? ""
          }`,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 600,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 16,
    backgroundColor: THEME.SECOND_COLOR,
  },
});
