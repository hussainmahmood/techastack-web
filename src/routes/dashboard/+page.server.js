import { SECRET_API_URI } from '$env/static/private';
export async function load({ fetch, cookies }) {
    const response = await fetch(`${SECRET_API_URI}/product/marked_products/`);
    return {
        markedProducts: await response.json()
    }
}

export const actions = {
	search: async ({ request, fetch }) => {
		const formData = Object.fromEntries(await request.formData());
        if (formData['search'] === '') {
            return {
                data: formData,
                focusSearch: true,
                products: []
            };
        }

        const response = await fetch(`${SECRET_API_URI}/product/search/?search=${formData['search']}`);
        
        const data = await response.json()
        if (response.status === 200) {
            return {
                data: formData,
                focusSearch: true,
                products: data
            };
        }
        if (response.status === 400) {
            return {
                data: formData,
                focusSearch: true,
                products: [],
                error: data.detail
            };
        } 
    },
    mark: async ({ request, url, fetch }) => {
		const formData = Object.fromEntries(await request.formData());
        if (url.searchParams.get('product') == undefined) {
            return {
                data: formData
            };
        }
        formData.product = url.searchParams.get('product')
        const response = await fetch(`${SECRET_API_URI}/product/mark_product/`, {body: JSON.stringify(formData),method: 'POST'});
        return {
            data: formData
        };
         
    }
};