import { fetchApi } from "../../../utils/network"

class ChatApi {
    public static readonly ROUTES = {
        USERS: '/api/users',
        POSTS: '/api/posts'
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

    public static getPosts = async () => {
        try {
            return await fetchApi(ChatApi.ROUTES.POSTS);
        } catch (error) {
            console.error(error);
        }
    }
}

export default ChatApi