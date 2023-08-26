<script>
	export let text;
</script>

<li>
	<strong class="block text-xs uppercase">{text}</strong>
	<ul class="mt-2 space-y-1">
		<slot />
	</ul>
</li>
