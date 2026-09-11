import { BASE_URL } from "../modules/main/constants"

export const fetchApi = async <T>(route = '/', requestConfig?: RequestInit) => {
    const requestUrl = `${BASE_URL}${route}`;

    const response = await fetch(requestUrl, requestConfig);

    if (!response.ok) {
        throw response;
    }

    const data = await response.json();

    return data as T;
}