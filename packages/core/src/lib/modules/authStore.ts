import { writable } from 'svelte/store';
import type { Auth0Client, User } from '@auth0/auth0-spa-js';
import type { Writable } from 'svelte/store';
export const user: Writable<User | null> = writable(null);
export const auth0Client: Writable<Auth0Client | null> = writable(null);
