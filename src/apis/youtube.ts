import axios from "axios";
import env from "react-dotenv";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 50,
    key: env.API_KEY,
  },
});
