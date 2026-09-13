import { configureStore } from "@reduxjs/toolkit";
import { chatUserReducer } from "../chat/navigation/chatUserReducer";

export const globalStore = configureStore({
  reducer: {
    chatUser: chatUserReducer,
  },
});

export type RootState = ReturnType<typeof globalStore.getState>;