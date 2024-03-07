import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, ScrollView, View, ActivityIndicator } from "react-native";
import { Header } from "../components/Header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DIMENSIONS, THEME } from "../theme";
import { BlockPopular } from "../components/BlockPopular/BlockPopular";
import { Sector } from "../components/Sector/Sector";
import { Menu } from "../components/Menu/Menu";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchData } from "../store/actions/actions";
import { RefreshControl } from "react-native-gesture-handler";
import { RootStackParamList } from "../types/types";
import { BlockMangas } from "../components/BlockMangas/BlockMangas";
import { BlockWithRandomsMangas } from "../components/BlockWithRandomsMangas/BlockWithRandomsMangas";

export interface BlockPopularProps {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
}

export const HomeScreen = ({ navigation }: BlockPopularProps) => {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();
  const { data: mangaList, loading } = useAppSelector(
    (state) => state.topMangaSlice,
  );
  const { data: relevanceMangas } = useAppSelector(
    (state) => state.relevanceMangaSlice,
  );
  const { data: updatedAt } = useAppSelector((state) => state.updatedAtSlice);
  const { data: createdAt } = useAppSelector((state) => state.createdAtSlice);
  const { data: statisticMangas } = useAppSelector(
    (state) => state.getStatisticsMangaSlice,
  );
  const [randomNumber, serRandomNumber] = useState();

  const inticator = (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );

  const fetchDataAndUpdate = async () => {
    try {
      setRefreshing(true);
      await Promise.all([
        dispatch(
          fetchData({
            url: "/manga",
            slice: "topManga",
            params: {
              includes: ["cover_art"],
              order: { rating: "desc" },
            },
          }),
        ),
        dispatch(
          fetchData({
            url: "/manga",
            slice: "relevanceManga",
            params: {
              includes: ["cover_art"],
              order: { relevance: "asc" },
            },
          }),
        ),
        dispatch(
          fetchData({
            url: "/manga",
            slice: "updatedAt",
            params: {
              includes: ["cover_art"],
              order: { updatedAt: "desc" },
            },
          }),
        ),
        dispatch(
          fetchData({
            url: "/manga",
            slice: "createdAt",
            params: {
              includes: ["cover_art"],
              order: { createdAt: "desc" },
            },
          }),
        ),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDataAndUpdate();
  }, []);

  useEffect(() => {
    if (mangaList) {
      const arrId = mangaList.data.map((item) => item.id);
      dispatch(
        fetchData({
          url: "/statistics/manga",
          slice: "getStatisticsManga",
          params: {
            manga: arrId,
          },
        }),
      );
    }
  }, [dispatch, mangaList]);

  const isLoading =
    !mangaList ||
    !statisticMangas ||
    !loading ||
    !relevanceMangas ||
    !updatedAt ||
    refreshing;

  return (
    <View
      style={{
        ...styles.default,
        paddingTop: insets.top + DIMENSIONS.padding,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Header />
      {isLoading ? (
        inticator
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              tintColor={THEME.MAIN_COLOR}
              onRefresh={() => fetchDataAndUpdate()}
            />
          }
          nestedScrollEnabled={true}
          contentContainerStyle={{ gap: 15 }}
        >
          <Sector title="Most Popular">
            <BlockPopular />
          </Sector>
          <Sector title="Relevance" seeMore>
            <BlockMangas data={relevanceMangas} />
          </Sector>
          <Sector title="Last updates" seeMore>
            <BlockMangas data={updatedAt} />
          </Sector>
          <Sector title="New Manga" seeMore>
            <BlockMangas data={createdAt} />
          </Sector>

          <Sector
            title="Random Manga"
            update
            updateFunc={() => null}
            style={{ marginBottom: 20 }}
          >
            <BlockWithRandomsMangas />
          </Sector>
        </ScrollView>
      )}
      <Menu />
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: THEME.BACKGROUND_COLOR,
    gap: 15,
  },
});

export default HomeScreen;
