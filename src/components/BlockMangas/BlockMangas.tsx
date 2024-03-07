import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AppText } from "../ui/AppTexts/AppText";
import { THEME } from "../../theme";
import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import { Datum } from "../../types/MangaList.type";
import { truncateText } from "../../utils/utils";

export const BlockMangas = ({ data }: { data: any }) => {
  if (!data)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );

  const renderItem = ({ item }: { item: Datum }) => {
    return (
      <TouchableOpacity style={{ gap: 7 }}>
        <View style={styles.container}>
          <Image
            source={{
              uri: `https://uploads.mangadex.org/covers/${item.id}/${
                item.relationships.find((i) => i.type === "cover_art")
                  ?.attributes.fileName ?? ""
              }`,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.blockTitle}>
          <AppText style={styles.title} fontFamily="Poppins-Medium">
            {truncateText(item.attributes.title.en, 20)}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      style={styles.flatList}
      showsHorizontalScrollIndicator={false}
      data={data.data}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 200,
    borderRadius: 16,
    marginRight: 16,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    overflow: "hidden",
    position: "relative",
    backgroundColor: THEME.SECOND_COLOR,
  },
  flatList: {
    overflow: "visible",
  },
  title: {
    fontSize: 12,
  },
  blockTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
