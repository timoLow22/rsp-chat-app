import { BASE_URL } from "../modules/main/constants"

export const fetchApi = async <T>(route = '/',requestConfig?: RequestInit, baseUrl = BASE_URL) => {
    const requestUrl = `${baseUrl}${route}`;

    const response = await fetch(requestUrl, requestConfig);

    if (!response.ok) {
        throw response;
    }

    const data = await response.json();

    return data as T;
}