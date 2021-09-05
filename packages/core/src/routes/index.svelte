<script>
	import Fa from 'svelte-fa';
	import {
		faAngleDown,
		faFeather,
		faUserSecret,
		faTachometerAlt,
		faPaintRoller,
		faServer
	} from '@fortawesome/free-solid-svg-icons';
	import { faOsi } from '@fortawesome/free-brands-svg-icons';
	import Feature from '$lib/components/feature.svelte';
	import Wave from '$lib/assets/waves.svg';
</script>

<svelte:head>
	<title>OpenTalk - Lightweight, open source, privacy friendly Disqus alternative</title>
</svelte:head>
<div class="bg-[#5330c1] min-h-[75vh] hero">
	<div class="text-center text-white hero-content">
		<div class="max-w-md">
			<h1 class="font-bold mb-5 text-5xl">OpenTalk</h1>
			<p class="mb-5">Lightweight, open source, privacy friendly Disqus alternative</p>
			<a class="btn btn-primary" href="/dashboard">Get Started</a>
			<br />
			<p class="italic">Scroll down for more info</p>
			<a href="#info"><Fa icon={faAngleDown} size="5x" class="mt-6 motion-safe:animate-bounce" /></a
			>
		</div>
	</div>
</div>
<Wave />
<h1 id="info" class="font-bold text-center mb-6 text-3xl">Why OpenTalk?</h1>
<div class="m-auto w-full px-6 gap-3 grid-cols-3 md:grid md:w-4/5 lg:w-2/3 xl:w-1/2">
	<Feature
		title="Lightweight"
		description="OpenTalk is designed to load fast, being only X kb and only loading things when needed"
		icon={faFeather}
	/>
	<Feature
		title="Privacy Friendly"
		description="OpenTalk does not track users or have any ads"
		icon={faUserSecret}
	/>
	<Feature
		title="Self hostable"
		description="You can host OpenTalk yourself on Cloudflare Workers, or let Opentalk Cloud manage everything for you"
		icon={faServer}
	/>
	<Feature
		title="Open Source"
		description="OpenTalk is fully open sourced on GitHub, free for everyone to use and contribute to"
		icon={faOsi}
	/>
	<Feature
		title="Ultra Fast"
		description="With Opentalk, everything is optimized to run quickly, ensuring your users get fast comment loading and posting"
		icon={faTachometerAlt}
	/>
	<Feature
		title="Themeable"
		description="You can completely customize how the comment widget looks, or use a default theme for light and dark mode"
		icon={faPaintRoller}
	/>
</div>
<h1 class="font-bold text-center mb-6 text-3xl">Ready to try it out?</h1>
<div class="flex justify-center">
	<a class="my-6 text-center btn btn-primary" href="/dashboard">Get Started</a>
</div>
