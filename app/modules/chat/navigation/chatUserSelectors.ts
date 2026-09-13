import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../main/globalStore";

class ChatUserSelectors {
    private static readonly chatUserState = (state: RootState) => state.chatUser;

    public static readonly blockedUserIds = createSelector(
        ChatUserSelectors.chatUserState,
        (state) => state.blockedUsers,
    );

    public static readonly isUserBlocked = (userId: string) => createSelector(
        ChatUserSelectors.blockedUserIds,
        (blockedUsers) => blockedUsers.includes(userId), 
    );
}

export default ChatUserSelectors;