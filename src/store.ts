import { configureStore } from "@reduxjs/toolkit";
import { hackerNewsApi } from "./services/hackerNews";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hackerNewsApi.middleware),
  reducer: {
    [hackerNewsApi.reducerPath]: hackerNewsApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
