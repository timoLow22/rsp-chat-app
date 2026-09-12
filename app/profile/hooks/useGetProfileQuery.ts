import { useQuery } from "@tanstack/react-query";
import ProfileApi from "../src/profileApi";
import { useMemo } from "react";

const PROFILE_INITIAL_STATE: profile.Info = {
    userId: '',
    name: 'John Smith',
    username: 'johnSmith',
    avatar: 'https://picsum.photos/50',
}

const MY_PROFILE_USERNAME = 'timoLow22';

const useGetProfileQuery = () => {
    const { data, isLoading, isFetching, isError } = useQuery({
        queryKey: [ProfileApi.ROUTES.USER, MY_PROFILE_USERNAME],
        queryFn: () => ProfileApi.getProfile(MY_PROFILE_USERNAME),
        staleTime: Infinity,
        cacheTime: Infinity, 
    });

    const profileData: profile.Info = useMemo(() => {
        if (!data) {
            return PROFILE_INITIAL_STATE;
        }

        const { id, login, name, avatar_url } = data;

        return {
            userId: id,
            name,
            username: login,
            avatar: avatar_url,
        }
    }, [data]);

    return {
        profileData,
        isLoading,
        isFetching,
        isError
    }
}

export default useGetProfileQuery;