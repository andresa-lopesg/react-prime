import axios from "axios";

export const key = process.env.EXPO_PUBLIC_TMDB_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default api;
