import { createAction } from "@reduxjs/toolkit";

const ChatUserActions = {
    block: createAction<string>('chat/user/block'),
    unblock: createAction<string>('chat/user/unblock'),
}

export default ChatUserActions;