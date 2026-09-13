declare namespace chat {
    interface ChatViewRouteParams {
        userId: string;
        username: string;
        name: string;
        avatar: string;
    }

    interface ChatProfileRouteParams {
        userId: string;
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
        id: string;
        userId: number;
        title: string;
        body: string;
        createdAt: string;
    }

    interface Profile {
        userId: string;
        displayName: string;
        username: string;
        avatar: string;
        headline: string;
        bio: string;
    }

    interface Message {
        messageId: string;
        message: string;
        createdAt: string;
        status?: 'sending' | 'sent' | 'failed';
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

        interface SendPostBody {
            userId: string;
            title: string;
            body: string;
        }

        interface GetPostsResponse {
            total: number;
            limit: number;
            offset: number;
            results: Post[];
        }

        interface GetProfilesResponse {
            total: number;
            limit: number;
            offset: number;
            results: Profile[];
        }

        interface SendPostResponse {
            id: string;
            userId: string;
            title: string;
            body: string;
            createdAt: string;
        }
    }
}