/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ event, request, fetch }) {
	request.headers.set('Cookie', `sessionid=${event.cookies.get('sessionid')}`);
	request.headers.set('Cookie', `csrftoken=${event.cookies.get('csrftoken')}`);
	request.headers.set('X-CSRFToken', `${event.cookies.get('xsrftoken')}`);
    request.headers.set('Content-Type', 'application/json; charset=UTF-8');
	return fetch(request);
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, request, fetch }) {
	request.headers.set('Cookie', `sessionid=${event.cookies.get('sessionid')}`);
	request.headers.set('Cookie', `csrftoken=${event.cookies.get('csrftoken')}`);
	request.headers.set('X-CSRFToken', `${event.cookies.get('xsrftoken')}`);
    request.headers.set('Content-Type', 'application/json; charset=UTF-8');
	return fetch(request);
}