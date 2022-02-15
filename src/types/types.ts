export interface YouTubeApi {
  data: Data;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: Request;
}

export interface Config {
  transitional: Transitional;
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  headers: ConfigHeaders;
  baseURL: string;
  params: Params;
  method: string;
  url: string;
}

export interface ConfigHeaders {
  Accept: string;
}

export interface Params {
  part: string;
  maxResults: number;
  key: string;
  type: string;
  q: string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Data {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Video[];
}

export interface Video {
  kind: ItemKind;
  etag: string;
  id: ID;
  snippet: Snippet;
  statistics: Statistics;
}

export interface ID {
  kind: IDKind;
  videoId: string;
}

export enum IDKind {
  YoutubeVideo = "youtube#video",
}

export enum ItemKind {
  YoutubeSearchResult = "youtube#searchResult",
}

export interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: LiveBroadcastContent;
  publishTime: Date;
}

export interface Statistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export enum LiveBroadcastContent {
  None = "none",
  Upcoming = "upcoming",
}

export interface Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
}

export interface Default {
  url: string;
  width: number;
  height: number;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Headers {
  "cache-control": string;
  "content-encoding": string;
  "content-length": string;
  "content-type": string;
  date: string;
  server: string;
  vary: string;
}

export interface Request {}
