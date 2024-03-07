import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_MANGADEX } from "../../API/mangadexAPI";

interface fetchDataType {
  slice: string;
  url: string;
  params?: any;
}

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async ({ slice, url, params }: fetchDataType) => {
    try {
      const response = await axios.get(API_MANGADEX + url, { params });
      return { data: response.data, slice };
    } catch (e) {
      console.log(e);
    }
  },
);
