declare namespace chat {
    interface ChatViewRouteParams {
        userId: string;
        username: string;
        name: string;
        avatar: string;
    }

    interface User {
        id: number;
        name: string;
        username: string;
        email: string;
        avatar: string;
        phone: string;
        website: string;
        address: {
            street: string;
            city: string;
            zipcode: string;
        }
    }

    interface Post {
        id: number;
        userId: number;
        title: string;
        body: string;
        createdAt: string;
    }

    interface Message {
        messageId: number;
        message: string;
        createdAt: string;
    }

    interface ChatItem extends Omit<User, 'address' | 'website' | 'phone' | 'email'> {
        latestMessage: Message;
    }

    namespace Api {
        interface GetUsersResponse {
            total: number;
            limit: number;
            offset: number;
            results: User[];
        }

        interface GetPostsResponse {
            total: number;
            limit: number;
            offset: number;
            results: Post[];
        }
    }
}