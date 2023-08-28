<script>
    import {FloatingLabelInput} from '$lib/components';
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    export let data;
    export let form;
    let products = [];
    let sortBy = {col: "product_id", ascending: true};
    $: toggle_ordering = (column) => {
        if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending
		} else {
			sortBy.col = column
			sortBy.ascending = true
		}
    }
    $: products = form?.products || products;
	$: products, sortBy, sortProducts();
    const sortProducts = () => {
        let sortModifier = (sortBy.ascending) ? 1 : -1;
        let column = sortBy.col;
		let sort = (a, b) => 
			(a[column] < b[column]) 
			? -1 * sortModifier 
			: (a[column] > b[column]) 
			? 1 * sortModifier 
			: 0;
        products = products.sort(sort);
	};
    let searchForm, timer;
</script>
<div class="space-y-8 py-8">
    <div class="flex justify-end">
        <form bind:this={searchForm} class="w-80 flex-col" action="?/search" method="POST" use:enhance={() => {return async ({ update }) => {update({ reset: false })};}}>
            <FloatingLabelInput
                id="search"
                name="search"
                type="text"
                autocomplete="off"
                placeholder="Search"
                autofocus={$page.form?.focusSearch ? true:  null}
                on:input={() => {clearTimeout(timer); timer = setTimeout(() => {searchForm.requestSubmit();}, 400);}}
            />
        </form>
    </div>
            
    <div class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full divide-y divide-gray-200 text-sm">
            <thead class="text-left">
                <tr>
                    <th class="px-4 py-2"></th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium" on:click={toggle_ordering("product_id")}>Product ID</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium" on:click={toggle_ordering("name")}>Name</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium" on:click={toggle_ordering("description")}>Description</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium" on:click={toggle_ordering("price")}>Price</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium" on:click={toggle_ordering("available_stock")}>Available Stock</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">            
                {#each products as product}
                    <tr>
                        <td class="px-4 py-2">
                            <form class="" action="?/mark&product={product.product_id}" method="POST" use:enhance>
                                <input
                                    name="marker"
                                    class="w-5 h-5 text-emerald-600 bg-gray-50 border-gray-300 rounded focus:ring-offset-0 focus:ring-0"
                                    type="checkbox"
                                    id="Row1"
                                    bind:checked={product.is_marked}
                                    on:change={(e) => {e.target.form.requestSubmit();}}
                                />
                            </form>
                        </td>
                        <td class="whitespace-nowrap px-4 py-2 font-medium">{product.product_id}</td>
                        <td class="whitespace-nowrap px-4 py-2 font-medium">{product.name}</td>
                        <td class="whitespace-nowrap px-4 py-2">{product.description}</td>
                        <td class="whitespace-nowrap px-4 py-2">{product.price}</td>
                        <td class="whitespace-nowrap px-4 py-2">{product.available_stock}</td>
                    </tr>
                {/each}
            </tbody>
            
        </table>    
    </div>
    
    <h1 class="text-3xl font-semibold text-black">Marked Products</h1>
    <div class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full divide-y divide-gray-200 text-sm">
            <thead class="text-left">
                <tr>
                    <th class="whitespace-nowrap px-4 py-2 font-medium">Product ID</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium">Name</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium">Description</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium">Price</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium">Available Stock</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">            
                {#each data.markedProducts as product}
                    <tr>
                        <td class="whitespace-nowrap px-4 py-2 font-medium">{product.product_id}</td>
                        <td class="whitespace-nowrap px-4 py-2 font-medium">{product.name}</td>
                        <td class="whitespace-nowrap px-4 py-2">{product.description}</td>
                        <td class="whitespace-nowrap px-4 py-2">{product.price}</td>
                        <td class="whitespace-nowrap px-4 py-2">{product.available_stock}</td>
                    </tr>
                {/each}
            </tbody>
            
        </table>    
    </div>

</div>