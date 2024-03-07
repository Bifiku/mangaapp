import { createMangaSlice } from "./dataSlice";
import {
  AnimeStatistic,
  StatisticMangas,
} from "../../types/getStatisticsManga.type";
import { initState } from "../../types/types";

const initialState: initState<StatisticMangas> = {
  data: null,
  sliceName: "getStatisticsManga",
  error: null,
  loading: false,
};

const getStatisticsMangaSlice = createMangaSlice<StatisticMangas>(
  "getStatisticsManga",
  initialState,
);
export default getStatisticsMangaSlice.reducer;
