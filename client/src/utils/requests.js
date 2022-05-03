const baserUrl = 'http://localhost:5002';

export async function GetRequest(url) {
	return await fetch(`${baserUrl}${url}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'x-auth-token': localStorage.token,
		},
	});
}

export async function PostRequest(url, body) {
	return await fetch(`${baserUrl}${url}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'x-auth-token': localStorage.token,
		},
		body: body,
	});
}

export async function DeleteRequest(url) {
	return await fetch(`${baserUrl}${url}`, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json',
			'x-auth-token': localStorage.token,
		},
	});
}

export async function PutRequest(url, body) {
	return await fetch(`${baserUrl}${url}`, {
		method: 'PUT',
		headers: {
			'content-type': 'application/json',
			'x-auth-token': localStorage.token,
		},
		body: body,
	});
}
