import { useQuery } from "@tanstack/react-query";

import ChatApi from "../src/chatApi";
import { mapPostToChatMessage } from "../src/chatUtils";

const useGetReceiverMessagesQuery = (receiverId: string) => {
    const {
        data: receiverMessages = [],
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useQuery({
        queryKey: [ChatApi.ROUTES.POSTS, receiverId],
        queryFn: async () => {
            const response = await ChatApi.getPosts(receiverId);
            return (response?.results || []).map(mapPostToChatMessage);
        },
    });

    return {
        receiverMessages,
        isLoading,
        isFetching,
        isError,
        refetch,
    }
}

export default useGetReceiverMessagesQuery;