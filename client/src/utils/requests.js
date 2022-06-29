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
		body,
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
		body,
	});
}

export class Requests {
	constructor() {
		this.baseURL = 'http://localhost:5002';
	}

	async GetRequest(url) {
		return await fetch(`${this.baseURL}${url}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'x-auth-token': localStorage.token,
			},
		});
	}

	async PostRequest(url, body) {
		return await fetch(`${this.baseURL}${url}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'x-auth-token': localStorage.token,
			},
			body,
		});
	}

	async DeleteRequest(url) {
		return await fetch(`${this.baseURL}${url}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				'x-auth-token': localStorage.token,
			},
		});
	}

	async PutRequest(url, body) {
		return await fetch(`${this.baseURL}${url}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
				'x-auth-token': localStorage.token,
			},
			body,
		});
	}
}
