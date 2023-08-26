<script>
	import '../app.postcss';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>
		{$page.data.title}
	</title>
</svelte:head>

<div class="mx-auto max-w-[1600px]">
	<slot />
</div>
