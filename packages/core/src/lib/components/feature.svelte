<script>
	import Fa from 'svelte-fa';
	export let title;
	export let description;
	export let icon;
</script>

<div class="rounded-lg bg-base-200 shadow mb-6 p-6 md:mb-0">
	<div class="m-auto w-min">
		<Fa {icon} size="4x" class="w-min" />
	</div>
	<h2 class="font-bold text-center text-xl mb-3">{title}</h2>
	<p>{description}</p>
</div>
