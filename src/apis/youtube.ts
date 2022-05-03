import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3/";

export const youtubeSearch = axios.create({
  baseURL: BASE_URL,
  params: {
    part: "snippet",
    maxResults: 48,
    key: process.env.REACT_APP_API_KEY,
  },
});

const youtubeGetStatistics = axios.create({
  baseURL: BASE_URL,
  params: {
    part: "statistics",
    key: process.env.REACT_APP_API_KEY,
  },
});

export const showStatistics = (id: string) => {
  return youtubeGetStatistics.get("/videos", {
    params: {
      id: id,
    },
  });
};
