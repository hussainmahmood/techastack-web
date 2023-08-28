export async function handleFetch({ event, request, fetch }) {
	request.headers.set('Cookie', `sessionid=${event.cookies.get('sessionid')};csrftoken=${event.cookies.get('csrftoken')}`);
	request.headers.set('X-CSRFToken', `${event.cookies.get('xsrftoken')}`);
    request.headers.set('Content-Type', 'application/json; charset=UTF-8');
	return fetch(request);
}

import {getUser} from '$lib/auth'
import {redirect} from '@sveltejs/kit'

export async function handle({ event, resolve }) {
    event.locals.user = await getUser(event)
    if (['/login', '/register', '/'].includes(event.url.pathname)) {
        if (event.locals.user) {
            throw redirect(303, '/dashboard')
        }
    } else {
        if (!event.locals.user) {
            throw redirect(303, '/')
        }
    }
    const response = await resolve(event);
    return response;
}