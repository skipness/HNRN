import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SearchRequest, SearchResponse } from "../types/search";
import type { Item } from "../types/item";

export const hackerNewsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://hn.algolia.com/api/v1",
  }),
  endpoints: (build) => ({
    getList: build.query<SearchResponse, SearchRequest>({
      query: ({ page, tags, type }) => ({
        url: `/${type}`,
        params: { tags, page },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCacheData, responseData, { arg: { page } }) => {
        if (page > 0) {
          return {
            ...responseData,
            hits: currentCacheData.hits.concat(responseData.hits),
          };
        }
        return responseData;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
    }),
    getItem: build.query<Item, string>({
      query: (id) => `/items/${id}`,
    }),
  }),
});

export const { useGetItemQuery, useGetListQuery } = hackerNewsApi;
