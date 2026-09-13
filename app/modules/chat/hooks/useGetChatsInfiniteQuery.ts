import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

import ChatApi from "../src/chatApi";
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
        getNextPageParam: (lastPage) => {
            if (!lastPage?.results || lastPage.results.length < 10) {
                return undefined;
            }
            return (lastPage.offset ?? 0) + 10
        }
    });

    const chatUsers = useMemo(() =>
        data?.pages.flatMap(page => page?.results ?? []) ?? [],
        [data],
    );

    const loadMoreUsers = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    return {
        chatUsers,
        isLoading,
        isFetching,
        isError,
        isFetchingNextPage,
        loadMoreUsers,
    }
}

export default useGetChatsInfiniteQuery;