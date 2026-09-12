import { useInfiniteQuery } from "@tanstack/react-query";
import ChatApi from "../src/chatApi";
import { useMemo } from "react";

const useGetUsersInfiniteQuery = (userId: string) => {
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

    const chatHistoryList = useMemo(() => {
        // TODO: clean up the handling here
        return data ? data.pages.flatMap(page => page?.results ?? []) : [];
    }, [data]);

    const loadMoreUsers = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    return {
        chatHistoryList,
        isLoading,
        isFetching,
        isError,
        isFetchingNextPage,
        loadMoreUsers,
    }
}

export default useGetUsersInfiniteQuery;