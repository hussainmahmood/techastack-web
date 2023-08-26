<script>
	import { onMount } from 'svelte';

	// indicate if we're in dark mode or not
	let dark;

	// hide the control until we've decided what the intial mode is
	let hidden = true;

	onMount(() => {
		// use the existence of the dark class on the html element for the initial value
		dark = document.documentElement.classList.contains('dark');

		// show UI controls
		hidden = false;

		// listen for changes so we auto-adjust based on system settings
		const matcher = window.matchMedia('(prefers-color-scheme: dark)');
		matcher.addEventListener('change', handleChange);
		return () => matcher.removeEventListener('change', handleChange);
	});

	function handleChange({ matches: dark }) {
		// only set if we haven't overridden the theme
		if (!localStorage.theme) {
			setMode(dark);
		}
	}

	function toggle() {
		setMode(!dark);
	}

	function setMode(value) {
		dark = value;

		// update page styling
		if (dark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		// store the theme as a local override
		localStorage.theme = dark ? 'dark' : 'light';

		// if the toggled-to theme matches the system defined theme, clear the local override
		// this effectively provides a way to override or revert to "automatic" setting mode
		if (window.matchMedia(`(prefers-color-scheme: ${localStorage.theme})`).matches) {
			localStorage.removeItem('theme');
		}
	}
</script>

<svelte:head>
	<script>
		if (
			localStorage.theme === 'dark' ||
			(!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>
	{#if dark}
		<style>
			input:-webkit-autofill,
			input:-webkit-autofill:hover,
			input:-webkit-autofill:focus,
			input:-webkit-autofill:active {
				-webkit-box-shadow: 0 0 0 20px black inset !important;
				-webkit-text-fill-color: rgb(229 231 235) !important;
			}
		</style>
	{:else}
		<style>
			input:-webkit-autofill,
			input:-webkit-autofill:hover,
			input:-webkit-autofill:focus,
			input:-webkit-autofill:active {
				-webkit-box-shadow: 0 0 0 20px white inset !important;
			}
		</style>
	{/if}
</svelte:head>

<button
	on:click={toggle}
	class="block w-full rounded-lg px-4 py-2 text-sm [text-align:_inherit] hover:bg-gray-100 hover"
>
	Theme : <span class:hidden={!dark}>Dark</span> <span class:hidden={dark}>Light</span>
</button>
