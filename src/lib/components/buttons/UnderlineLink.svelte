<script>
	export let href;
</script>

<a
	class="relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:transition hover:before:scale-100"
	{href}
>
	<slot />
</a>
