<script>
	import Fa from 'svelte-fa';
	import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
	import Wave from '$lib/assets/waves.svg';
</script>

<svelte:head>
	<title>OpenTalk - Lightweight, open source, privacy friendly Disqus alternative</title>
</svelte:head>
<div class="bg-[#5330c1] min-h-[75vh] hero">
	<div class="text-center hero-content">
		<div class="max-w-md">
			<h1 class="font-bold mb-5 text-5xl">OpenTalk</h1>
			<p class="mb-5">Lightweight, open source, privacy friendly Disqus alternative</p>
			<button class="btn btn-primary">Get Started</button>
			<br />
			<p class="italic">Scroll down for more info</p>
			<a href="#info"><Fa icon={faAngleDown} size="5x" class="mt-6 motion-safe:animate-bounce" /></a
			>
		</div>
	</div>
</div>
<Wave />
<h1 id="info">What is Opentalk?</h1>
