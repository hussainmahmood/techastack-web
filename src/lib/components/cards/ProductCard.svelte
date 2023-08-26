<script>
	import productPlaceholder from '$lib/assets/product_placeholder.jpg';
	export let product;
	let images = product.images ?? [];
	let selected = 0;
	let dist = 400;
	let dir = 1;
</script>

<div class="w-full h-full rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md">
	<div class="group relative overflow-hidden h-[60%]">
		{#if images.length > 1}
			<div class="h-full">
				{#key selected}
					<img
						class="rounded-t-lg object-cover h-full w-full"
						transition
						src={images[selected].src}
						alt={images[selected].alt}
					/>
				{/key}
			</div>
			<div class="absolute top-[45%] rounded-lg w-full text-gray-700 hidden group-hover:block">
				<div class="flex justify-between">
					<button
						class="bg-white pl-2 pr-3 py-1 rounded-r-full"
						on:click={() => {
							selected = (selected - 1 + images.length) % images.length;
							dir = -1;
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-8 h-8"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
							/>
						</svg>
					</button>
					<button
						class="bg-white pr-2 pl-3 py-1 rounded-l-full"
						on:click={() => {
							selected = (selected + 1) % images.length;
							dir = 1;
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-8 h-8"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
							/>
						</svg>
					</button>
				</div>
			</div>
		{:else if images.length == 1}
			<div class="h-full">
				<img
					class="rounded-t-lg object-cover h-full w-full"
					src={images[0].src}
					alt={images[0].alt}
				/>
			</div>
		{:else}
			<img
				class="rounded-t-lg object-cover h-full w-full"
				src={productPlaceholder}
				alt="Product placeholder"
			/>
		{/if}
	</div>
	<!-- <span
		class="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white"
		>Sale</span
	> -->
	<div class="mt-3 px-5">
		<div class="">
			<a href="/{product.short_company}" class="text-sm hover:underline">
				{product.company}
			</a>
		</div>
		<div class="">
			<a
				class="hover:text-emerald-500 dark:hover:text-emerald-400"
				href="/{product.username}/{product.short_name}"
			>
				<h5 class="text-xl font-semibold tracking-tight">
					{product.brand}
					{product.name}
					{product.size}
				</h5>
			</a>
		</div>

		<!-- <div class="flex items-center justify-between">
			<p>
				<span class="text-3xl font-bold">$249</span>
				<span class="text-sm line-through">$299</span>
			</p>
		</div> -->
	</div>
</div>
