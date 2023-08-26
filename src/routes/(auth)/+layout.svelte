<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	export let data;
	$: if (data.loggedIn === true && browser) {
		goto($page.url.searchParams.get('redirectTo') || '/', { replaceState: true });
	}
	import { Logo, ThemeIcon } from '$lib/components';
</script>

<nav class="px-4 py-2 border-gray-400">
	<div class="container mx-auto">
		<div class="flex items-center justify-between">
			<ul class="flex items-center space-x-4">
				<li>
					<Logo />
				</li>
			</ul>
			<ThemeIcon />
		</div>
	</div>
</nav>

<slot />
