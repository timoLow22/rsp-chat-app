declare namespace chat {
    interface ChatRouteParams {
        userId: string;
        username: string;
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

    namespace Api {
        interface GetUsersResponse {
            total: number;
            limit: number;
            offset: number;
            results: User[];
        }
    }
}