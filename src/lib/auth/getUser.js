import { SECRET_API_URI } from '$env/static/private';
export const getUser = async ({cookies}) => {
    const response = await fetch(`${SECRET_API_URI}/user/currently_logged_in/`, 
                                { headers: {
                                    Cookie: `sessionid=${cookies.get('sessionid')};csrftoken=${cookies.get('csrftoken')}`, 
                                    'X-CSRFToken' :`${cookies.get('xsrftoken')}`, 
                                    'Content-Type': 'application/json; charset=UTF-8'
                                    }
                                });
    const data = await response.json()
    if (response.status === 200) {
        return data
    }
    return null
}