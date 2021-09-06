<script lang="ts">
	import { browser } from '$app/env';
	import { init, login, authorizedFetch } from '$lib/modules/auth0';
	import { auth0Client, user } from '$lib/modules/authStore';
	let appModalActive = false;
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
			if (res.status === 200) {
				apps = (await res.json()).data;
			}
		}
	})();
</script>

<div id="create-app" class="modal" class:modal-open={appModalActive}>
	<div class="modal-box">
		<p />
		<div class="modal-action">
			<button
				href="#create-app"
				class="btn"
				on:click={() => {
					appModalActive = false;
				}}>Close</button
			>
		</div>
	</div>
</div>
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
<button
	href="#create-app"
	class="btn"
	on:click={() => {
		appModalActive = true;
	}}>Create new app</button
>

<style global>
	.modal-open {
		--tw-scale-x: 1;
		--tw-scale-y: 1;
		--tw-translate-y: 0px;
		opacity: 1;
		pointer-events: auto;
		visibility: visible;
	}
	@media (min-width: 640px) {
		.modal-box {
			max-width: 32rem;
			--tw-scale-x: 0.9;
			--tw-scale-y: 0.9;
			--tw-translate-y: 0px;
			border-bottom-left-radius: var(--rounded-box, 1rem);
			border-bottom-right-radius: var(--rounded-box, 1rem);
		}
		.modal {
			align-items: center;
		}
	}
</style>
