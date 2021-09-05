import createAuth0Client from '@auth0/auth0-spa-js';
import type { Auth0Client, User } from '@auth0/auth0-spa-js';
import { user, auth0Client } from '$lib/modules/authStore';
let userVal: User | null;
let auth0: Auth0Client | null;
user.subscribe((val) => {
	userVal = val;
});
auth0Client.subscribe((val) => {
	auth0 = val;
});
export async function init(): Promise<Auth0Client> {
	auth0Client.set(
		await createAuth0Client({
			domain: import.meta.env.VITE_AUTH0_DOMAIN,
			client_id: import.meta.env.VITE_AUTH0_SPA_ID,
			redirect_uri: `${location.protocol}//${location.host}/dashboard`,
			cacheLocation: 'localstorage',
			audience: `${import.meta.env.VITE_DOMAIN}/api`
		})
	);
	if (location.href.split('?').slice(1).length > 0) {
		await auth0.handleRedirectCallback();
		user.set(await auth0.getUser());
		window.history.replaceState({}, document.title, window.location.toString().split('?')[0]);
	}

	return auth0;
}
export async function login(): Promise<void> {
	if (!auth0) {
		await init();
	}
	if (userVal) {
		return;
	}
	auth0.loginWithRedirect();
}
export async function logout(): Promise<void> {
	await auth0.logout();
	user.set(null);
}

export function authorizedFetch(url: string, settings: RequestInit = {}): Promise<Response> {
	return new Promise((resolve) => {
		let promise = null;
		if (!userVal) {
			promise = Promise.all([auth0.getTokenSilently(), login()]);
		} else {
			promise = Promise.all([auth0.getTokenSilently()]);
		}
		promise.then(([token]) => {
			fetch(url, {
				...settings,
				headers: {
					...settings.headers,
					Authorization: `Bearer ${token}`
				}
			}).then((value) => resolve(value));
		});
	});
}
