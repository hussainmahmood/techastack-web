import { PUBLIC_API_URI } from '$env/static/public';
export const getUser = async () => {
    const response = await fetch(`${PUBLIC_API_URI}/user/currently_logged_in/`,
                                {
                                    headers: {'Content-Type': 'application/json; charset=UTF-8',},
                                    credentials:"include",
                                });
    const data = await response.json()
    if (response.status === 200) {
        return data
    }
    return null
}