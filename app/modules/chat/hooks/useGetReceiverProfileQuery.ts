import { useQuery } from "@tanstack/react-query";
import ChatApi from "../src/chatApi";
import { useMemo } from "react";

const useGetReceiverProfileQuery = (userId: string) => {
    const { data, isLoading, isFetching, isError } = useQuery({
        queryKey: [ChatApi.ROUTES.PROFILE, userId],
        queryFn: () => ChatApi.getProfiles(userId),
    });

    const isProfileLoading = useMemo(() => isLoading || isFetching, [isLoading, isFetching]);
    const userProfiles = data
        ? data.results
        : [];

    return {
        userProfiles,
        isError,
        isProfileLoading,
    }
}

export default useGetReceiverProfileQuery;
