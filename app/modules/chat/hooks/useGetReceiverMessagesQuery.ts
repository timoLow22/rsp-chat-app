import { useQuery } from "@tanstack/react-query";
import ChatApi from "../src/chatApi";
import { useMemo } from "react";
import { mapPostToChatMessage } from "../src/chatUtils";

const useGetReceiverMessagesQuery = (receiverId: string) => {
    const { data, isLoading, isFetching, isError, refetch } = useQuery({
        queryKey: [ChatApi.ROUTES.POSTS, receiverId],
        queryFn: () => ChatApi.getPosts(receiverId),
    });

    const receiverMessages: chat.Message[] = useMemo(() => {
        if (!data?.results) {
            return []
        }

        return data.results.map(mapPostToChatMessage);
    }, [data]);

    return {
        receiverMessages,
        isLoading,
        isFetching,
        isError,
        refetch,
    }
}

export default useGetReceiverMessagesQuery;