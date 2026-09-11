import { useQuery } from "@tanstack/react-query";
import ChatApi from "../src/chatApi";
import { useMemo } from "react";

const useGetUsersInfiniteQuery = (userId: string) => {
    const { data, isLoading, isFetching, isError } = useQuery({
        queryKey: [ChatApi.ROUTES.USERS, userId],
        queryFn: ChatApi.getUsers
    });

    const chatHistoryList = data?.results ?? [];

    return {
        chatHistoryList,
        isLoading,
        isFetching,
        isError,
    }
}

export default useGetUsersInfiniteQuery;