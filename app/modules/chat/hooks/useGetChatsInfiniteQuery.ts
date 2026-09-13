import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import ChatApi from "../src/chatApi";
import { useMemo } from "react";
import { mapPostToChatMessage } from "../src/chatUtils";

const useGetChatsInfiniteQuery = (userId: string) => {
    const {
            data,
            isLoading,
            isFetching,
            isError,
            hasNextPage,
            isFetchingNextPage,
            fetchNextPage,
        } = useInfiniteQuery({
        queryKey: [ChatApi.ROUTES.USERS, userId],
        queryFn: ChatApi.getUsers,
        getNextPageParam: (lastPage) => lastPage?.offset
    });

    const chatUsers = useMemo(() =>
        data?.pages.flatMap(page => page?.results ?? []) ?? [],
        [data],
    );

    const receiverPostResults = useQueries({
        queries: chatUsers.map((user) => ({
            queryKey: [ChatApi.ROUTES.POSTS, user.id],
            queryFn: () => ChatApi.getPosts(user.id.toString()),
        })),
    });

    const chatList: chat.ChatItem[] = useMemo(() => {
        return chatUsers.map((user, index): chat.ChatItem => {
            const { id, avatar, name, username } = user;
            const postQueryResult = receiverPostResults[index];

            const { isLoading, isFetching } = receiverPostResults[index];
            const isPostLoading = isLoading || isFetching;

            const posts = postQueryResult?.data?.results ?? [];

            // TODO: what happens when no results are coming in?
            const lastPost = posts.length > 0
                ? posts[posts.length - 1]
                : null;

            return {
                id,
                avatar,
                name,
                username,
                latestMessage: (!isPostLoading) && lastPost
                    ? mapPostToChatMessage(lastPost)
                    : {
                        messageId: 'loading-msg',
                        message: isPostLoading ? 'Loading messages' : 'No messages yet',
                        createdAt: ''
                    }
            }
        });
    }, [chatUsers, receiverPostResults]);

    const loadMoreUsers = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    return {
        chatList,
        isLoading,
        isFetching,
        isError,
        isFetchingNextPage,
        loadMoreUsers,
    }
}

export default useGetChatsInfiniteQuery;