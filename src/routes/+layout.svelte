<script>
	import '../app.postcss';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { Logo, ThemeIcon, ThemeButton } from '$lib/components';
	import {clickOutside} from '$lib/js';
	export let data;
	let menuHidden = true;

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<title>
		{$page.data.title}
	</title>
</svelte:head>

<div class="mx-2 sm:mx-6 md:mx-12 lg:mx-24 max-w-[1600px]">
	<nav class="border-gray-400">
		<div class="flex items-center justify-between">
			<ul class="flex items-center space-x-4">
				<li>
					<Logo />
				</li>
			</ul>
			<ul class="flex items-center space-x-4">
				
				{#if data.user}
					<li>
						<div class="relative">
							<button on:click={() => {menuHidden = !menuHidden}} class="rounded-md px-4 py-2 text-xs md:text-sm text-black bg-gray-100 hover:bg-gray-200 dark:bg-gray-300 dark:hover:bg-gray-200">
								{data.user.email}
							</button>
							
							<div 
								class:hidden={menuHidden} 
								class="absolute end-0 z-10 mt-2 w-full rounded-md bg-white shadow-lg"
								use:clickOutside
								on:click_outside={() => {
									menuHidden === false && (menuHidden = !menuHidden);
								}}
							>
								<div class="p-2">
									<div>
										<ThemeButton/>
									</div>
									<form method="POST" action="/logout" use:enhance>
										<button on:click={() => {menuHidden = true}} type="submit" class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-100" >
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
											<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
										</svg>
											Logout
										</button>
									</form>
								</div>
							</div>
						</div>
					</li>
				{:else}
					<li>
						<ThemeIcon />
					</li>
				{/if}
			</ul>
			
		</div>
	</nav>
	
	<slot />
</div>
