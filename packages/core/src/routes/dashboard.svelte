<script lang="ts">
	import { browser } from '$app/env';
	import { init, login, authorizedFetch } from '$lib/modules/auth0';
	import { auth0Client, user } from '$lib/modules/authStore';
	interface App {
		data: {
			Name: string;
		};
		id: string;
	}
	let apps: App[];
	(async () => {
		if (browser) {
			if (!$auth0Client) {
				await init();
			}
			if (!$user) {
				await login();
			}
			const res = await authorizedFetch('/api/apps');
			console.log(res);
			if (res.status === 200) {
				apps = await res.json();
			}
		}
	})();
</script>

<h1 class="font-bold text-center text-3xl">OpenTalk Dashboard</h1>
<div class="grid gap-6 grid-cols-3">
	{#if apps}
		{#each apps as app}
			<div class="rounded-lg bg-base-200 shadow shadowp-6">
				<h2>{app.data.Name}</h2>
				<a href={`/dashboard/${app.id}`} class="btn">Go to project</a>
			</div>
		{/each}
	{/if}
</div>
