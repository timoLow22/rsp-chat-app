import { fetchApi } from "../../../utils/network"

class ChatApi {
    public static readonly ROUTES = {
        USERS: '/api/users',
        POSTS: '/api/posts',
        PROFILE: '/api/profiles',
    }

    public static getUsers = async ({ pageParam = 0 }) => {
        // TODO refine the url construction
        const url = `${ChatApi.ROUTES.USERS}?limit=10&offset=${pageParam}`;
        try {
            return await fetchApi<chat.Api.GetUsersResponse>(url);
        } catch (error) {
            console.error(error);
        }
    }

    public static getPosts = async (userId: string, limit?: number) => {
        const url = limit
            ? `${ChatApi.ROUTES.POSTS}?userId=${userId}&limit=${limit}`
            : `${ChatApi.ROUTES.POSTS}?userId=${userId}`;

        try {
            return await fetchApi<chat.Api.GetPostsResponse>(url);
        } catch (error) {
            console.error(error);
        }
    }

    public static sendPost = async (requestBody: chat.Api.SendPostBody) => {
        try {
            return await fetchApi<chat.Api.GetPostsResponse>(ChatApi.ROUTES.POSTS, {
                method: 'post',
                body: JSON.stringify(requestBody),
            });
        } catch (error) {
            console.error(error);
        }
    }

    public static getProfiles = async (userId: string) => {
        const url = `${ChatApi.ROUTES.PROFILE}?userId=${userId}`;

        try {
            return await fetchApi<chat.Api.GetProfilesResponse>(url);
        } catch (error) {
            console.error(error);
        }
    }
}

export default ChatApi