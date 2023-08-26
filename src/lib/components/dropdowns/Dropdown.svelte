<script>
	export let hideOn = false;
	function clickOutside(node) {
		const handleClick = (event) => {
			if (node && !node.contains(event.target) && !event.defaultPrevented) {
				node.dispatchEvent(new CustomEvent('click_outside', node));
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<div
	class="absolute right-0 py-2 w-48 bg-gray-100 text-gray-900 rounded-lg shadow-lg z-10"
	use:clickOutside
	on:click_outside
	class:hidden={hideOn}
>
	<div class="px-6 py-2 font-medium">
		<ul class="flex flex-col space-y-2">
			<slot />
		</ul>
	</div>
</div>
