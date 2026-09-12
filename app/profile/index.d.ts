declare namespace profile {
    interface Info {
        name: string;
        username: string;
        avatar: string;
        userId: string;
    }

    namespace Api {
        interface GetProfileResponse {
            // Github's response for username
            login: string;
            id: string;
            name: string;
            avatar_url: string;
        }
    }
}