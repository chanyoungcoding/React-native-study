import axios from "axios";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjQyM2Y0MWNmNTY4YTY1NDJhMjAzYzA0M2JlMzI0MyIsInN1YiI6IjY0M2ZlOWJiN2U0MDNkMDJmYzI1OTk2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jry2V7IwAMEedIiBYhEXioFY3OokzRHqyKcDzdCdWdE";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string ;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_coint: number;
}

export interface TV {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  vote_average: number;
  popularity: number;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[]
}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}` // token 넣어주기
  }
};

const trending = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/week`, options)
  return response.data.results
}

const upcoming = async () => {
  const response = await axios.get(`${BASE_URL}/movie/upcoming?language=en-US&page=1`, options)
  return response.data.results
}

const nowPlaying = async () => {
  const response = await axios.get(`${BASE_URL}/movie/now_playing?language=en-US&page=1`, options)
  return response.data.results
}

const search = async ({queryKey}) => {
  const [, query] = queryKey;
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie?include_adult=true&page=1&query=${query}`, options)
  return response.data.results
}

const detail = async ({queryKey}) => {
  const [, id] = queryKey;
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,images`, options);
  return response.data
}

export const moviesApi = { trending, upcoming, nowPlaying, search, detail }

const tvTrending = async () => {
  const response = await axios.get('https://api.themoviedb.org/3/trending/tv/week', options)
  return response.data.results
}

const tvAiringToday = async () => {
  const response = await axios.get('https://api.themoviedb.org/3/tv/airing_today?page=1', options)
  return response.data.results
}

const tvTopRated = async () => {
  const response = await axios.get('https://api.themoviedb.org/3/tv/top_rated?page=1', options)
  return response.data.results
}

const tvSearch = async ({queryKey}) => {
  const [, query] = queryKey;
  const response = await axios.get(`https://api.themoviedb.org/3/search/tv?include_adult=true&page=1&query=${query}`, options)
  return response.data.results
}

const tvDetail = async ({queryKey}) => {
  const [, id] = queryKey;
  const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?append_to_response=videos,images`, options);
  return response.data
}

export const tvApi = {tvTrending, tvAiringToday, tvTopRated, tvSearch, tvDetail}