import { fetchApi } from "../../../utils/network"

class ChatApi {
    public static readonly ROUTES = {
        USERS: '/api/users',
        POSTS: '/api/posts'
    }

    public static getUsers = async () => {
        try {
            return await fetchApi<chat.Api.GetUsersResponse>(ChatApi.ROUTES.USERS);
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