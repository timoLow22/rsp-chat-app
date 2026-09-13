import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import useGetReceiverMessagesQuery from "./useGetReceiverMessagesQuery";
import ChatApi from "../src/chatApi";

const useChatView = (receiverId: string) => {
    const [messageText, setMessageText] = useState('');
    const queryClient = useQueryClient();

    const { receiverMessages = [] } = useGetReceiverMessagesQuery(receiverId);

    /**
     * The following mutation methods were built in reference to TanStack's Optimistic Updates guide
     * @see {https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates#updating-a-list-of-todos-when-adding-a-new-todo}
     */
    const { mutate, isPending } = useMutation({
        mutationFn: ChatApi.sendPost,
        onMutate: async (newPayload: chat.Api.SendPostBody) => {
            // cancel any outgoing fetches to get new messages if any
            await queryClient.cancelQueries({ queryKey: [ChatApi.ROUTES.POSTS, receiverId] });

            // snapshot previous cache data
            const previousMessages = queryClient.getQueryData<chat.Message[]>(
                [ChatApi.ROUTES.POSTS, receiverId],
            );

            // assigning a temporary and easy to identify string so that we can update the status when the post is successful
            const tempId = 'temp-msg';

            const temporaryMessage: chat.Message = {
                message: newPayload.body,
                messageId: tempId,
                createdAt: Date.now().toString(),
                status: 'sending',
            };

            // optimistically update posts cache directly
            queryClient.setQueryData<chat.Message[]>(
                [ChatApi.ROUTES.POSTS, receiverId],
                (oldMessages) => {
                    const safeArray = Array.isArray(oldMessages) ? oldMessages : [];
                    return [...safeArray, temporaryMessage];
                },
            );

            return { previousMessages, tempId }
        },
        onError: (_error, _variables, context) => {
            if (context?.previousMessages) {
                queryClient.setQueryData([ChatApi.ROUTES.POSTS, receiverId], context.previousMessages);
            }
        },
        onSuccess: (_data, _variables, context) => {
            queryClient.setQueryData<chat.Message[]>(
                [ChatApi.ROUTES.POSTS, receiverId],
                (oldData) => {
                    if (!Array.isArray(oldData)) {
                        return [];
                    }

                    return oldData.map((message) => {
                        if (message.messageId === context?.tempId) {
                            return {
                                ...message,
                                messageId: Math.random().toString(),
                                status: 'sent',
                            };
                        }
                        return message;
                    });
                }
            )
        }
        /**
         * Deliberately not adding the onSettled method here since I'm not exactly uploading the texts to a chat server.
         * Invalidating the cache with onSettled at this state will basically reset the chat room
         */
    });

    const sendMessage = () => {
        if (!messageText.trim()) {
            // if the text only contains spaces don't allow users to post
            return;
        }

        mutate({
            userId: receiverId,
            title: 'Text message',
            body: messageText,
        });

        setMessageText('');
    };

    const chatMessages: chat.Message[] = useMemo(() => {
        /**
         * inverting the message array since the FlatList component on the screen is inverted and the latest message
         * should be shown at the bottom
         */
        return [...receiverMessages].reverse();
    }, [receiverMessages]);

    console.log('receiverMessages', receiverMessages);

    return {
        chatMessages,
        messageText,
        isPending,
        setMessageText,
        sendMessage,
    }
}

export default useChatView