<script>
    import {FloatingLabelInput, DottedSpinner} from '$lib/components';
    import {request} from "$lib/js";

    let markedProducts = [];
    let products = [];
    let productsLoading, markedProductsLoading = true;
    const getMarkedProducts = async() => {
        const response = await request('/product/marked_products/');
        markedProducts = await response.json();
        markedProductsLoading = false;
    }

    const searchProducts = async() => {
        if (search != '') {
            const response = await request(`/product/search/?search=${search}`);
            products = await response.json();
        } else {
            products = [];
        }
    }
    const markProduct = async(product) => {
        const response = await request('/product/mark_product/', {
            body: JSON.stringify({product: product.product_id}),
            method: 'POST'
        });
        await getMarkedProducts();
    }

    getMarkedProducts();

    let sortBy = {col: "product_id", ascending: true};
    $: toggle_ordering = (column) => {
        if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending
		} else {
			sortBy.col = column
			sortBy.ascending = true
		}
    }
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
    let search = '';
    let timer;
</script>
<div class="space-y-8 py-8">
    <div class="flex justify-end">
        <FloatingLabelInput
            id="search"
            name="search"
            type="text"
            autocomplete="off"
            placeholder="Search"
            bind:value="{search}"
            on:input={async() => {clearTimeout(timer); timer = setTimeout(async() => {await searchProducts()}, 1000);}}
        />
    </div>
            
    <div class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full divide-y divide-gray-200 text-sm overflow-hidden">
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
                            <input
                                name="marker"
                                class="w-5 h-5 text-emerald-600 bg-gray-50 border-gray-300 rounded focus:ring-offset-0 focus:ring-0"
                                type="checkbox"
                                bind:checked={product.is_marked}
                                on:click|preventDefault = {async(e) => {await markProduct(product);product.is_marked = !product.is_marked;}}
                                on:keydown|preventDefault = {async(e) =>{await markProduct(product);product.is_marked = !product.is_marked;}}
                            />
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
    
    <h1 class="text-3xl font-semibold">Marked Products</h1>
    <div class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full divide-y divide-gray-200 text-sm overflow-hidden">
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
                {#if markedProductsLoading}
                    <tr>
                        <td class="whitespace-nowrap px-4 py-2 font-medium py-16" colspan="5" align='center'>
                            <DottedSpinner bgColor="#10b981">
                            </DottedSpinner>
                        </td>
                    </tr>
                {:else}
                {#each markedProducts as product}
                    <tr>
                        <td class="whitespace-nowrap px-4 py-2 font-medium">{product.product_id}</td>
                        <td class="whitespace-nowrap px-4 py-2 font-medium">{product.name}</td>
                        <td class="whitespace-nowrap px-4 py-2">{product.description}</td>
                        <td class="whitespace-nowrap px-4 py-2">{product.price}</td>
                        <td class="whitespace-nowrap px-4 py-2">{product.available_stock}</td>
                    </tr>
                {/each}
                {/if}
            </tbody>
        </table>
    </div>

</div>

