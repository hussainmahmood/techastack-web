<script>
	export let text;
	export let action;
	export let method = 'POST';
	export let enhance;
</script>

<li>
	<form {action} use:enhance {method}>
		<button
			type="submit"
			on:click
			class="block w-full rounded-lg px-4 py-2 text-sm [text-align:_inherit] hover:bg-gray-100 hover"
		>
			{text}
		</button>
	</form>
</li>
