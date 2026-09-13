import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { CHAT_USER_INITIAL_STATE } from "./chatConstants";
import ChatUserActions from "./chatUserActions";

const blockedUsersReducer = createReducer(
    CHAT_USER_INITIAL_STATE.blockedUsers,
    (builder) => {
        builder
            .addCase(ChatUserActions.block, (state, action) => {
                state.push(action.payload)
            })
            .addCase(ChatUserActions.unblock, (state, action) => {
                const { payload } = action;
                return state.filter((blockedUserId) => blockedUserId !== payload);
            });
    },
);

export const chatUserReducer = combineReducers({
    blockedUsers: blockedUsersReducer,
})