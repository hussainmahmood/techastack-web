import {PUBLIC_API_URI} from "$env/static/public";
import { getCookie, setCookie } from "svelte-cookie"
import {getUser} from "$lib/auth";
import {goto} from "$app/navigation";

export async function userStatus() {
    const user = await getUser();
    let status = {user:user, propagate:true}
    if (['/login/', '/register/', '/'].includes(location.pathname)) {
        if (user) {
            await goto("/dashboard");
            status.propagate = false;
        }
    } else {
        if (!user) {
            await goto("/");
            status.propagate = false;
        }
    }
    return status
}

export async function request(url, config) {
    const requestStatus = await userStatus();
    if (requestStatus.propagate) {
        config = config || {};
        config.credentials = 'include';
        let headers = config.headers || {};
        headers = {...headers, 'Content-Type': 'application/json; charset=UTF-8'};
        config.headers = headers;
        const response = await fetch(`${PUBLIC_API_URI}${url}`, config);
        return response;
    }
    return {status: 400, data:{detail: "application error"}}
}
