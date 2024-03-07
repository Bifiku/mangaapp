import { View, StyleSheet, ActivityIndicator } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import { fetchData } from "../../store/actions/actions";
import { THEME } from "../../theme";
import { AppText } from "../ui/AppTexts/AppText";
import { DataState } from "../../types/types";

export const MangaGenres = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((store) => store.genresSlice);

  useEffect(() => {
    dispatch(
      fetchData({
        sliceName: "genresSlice",
        url: "/genres/manga",
      }),
    );
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      horizontal
      style={{
        overflow: "visible",
      }}
      showsHorizontalScrollIndicator={false}
      data={data}
      removeClippedSubviews={false}
      renderItem={({ item }) => (
        <TouchableOpacity delayPressIn={0}>
          <View style={styles.container}>
            <AppText style={{ fontSize: 18 }}>{item.name}</AppText>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.SECOND_COLOR,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
