import { GITHUB_BASE_URL } from "../../modules/main/constants";
import { fetchApi } from "../../utils/network";

class ProfileApi {
    public static readonly ROUTES = {
        USER: '/users',
    }

    public static getProfile = async (username: string) => {
        const requestRoute = `${ProfileApi.ROUTES.USER}/${username}`;
        
        try {
            return await fetchApi<profile.Api.GetProfileResponse>(
                requestRoute,
                {
                    headers: {
                        /**
                         * For Github endpoint header contract,
                         * @see {https://docs.github.com/en/rest/users/users?apiVersion=2026-03-10#get-a-user-using-their-id}
                         */
                        'X-GitHub-Api-Version': '2026-03-10'
                    },
                },
                GITHUB_BASE_URL,
            )
        } catch (error) {
            console.warn(error);
        }
    }
}

export default ProfileApi;