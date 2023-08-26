<script>
	export let id;
	export let name;
	export let type = 'text';
	export let value = '';
	export let autocomplete;
	export let placeholder;
	// you need to this to avoid 2-way binding
	const setType = (node, _type) => {
		node.type = _type;
		return {
			update(_type) {
				node.type = _type;
			}
		};
	};
</script>

<div>
	<div
		class="relative block overflow-hidden rounded-md border border-gray-500 dark:border-gray-200 px-3 pt-4 shadow-sm text-gray-700 dark:text-gray-200 focus-within:border-emerald-600 dark:focus-within:border-emerald-600 focus-within:text-emerald-600 dark:focus-within:text-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600"
	>
		<input
			{id}
			bind:value
			on:blur
			on:change
			on:click
			on:contextmenu
			on:focus
			on:keydown
			on:keypress
			on:keyup
			on:mouseover
			on:mouseenter
			on:mouseleave
			on:paste
			on:input
			{name}
			use:setType={type}
			{autocomplete}
			placeholder=" "
			class="peer h-8 w-full text-gray-700 dark:text-gray-200 border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
			{...$$restProps}
		/>
		<slot />

		<span
			class="prevent-select absolute start-3 top-3 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
		>
			{placeholder}
		</span>
	</div>
</div>
