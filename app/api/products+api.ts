import { ProductType, ProductTypeResponse } from '@/lib/type/productType';
import axios from 'axios'

export interface ProductsQueryParams {
    page?: string;
    per_page?: number;
    search?: string;
    category?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
}


export async function GET(request: Request) {
    const url = new URL(request.url);

    const queryParams: ProductsQueryParams = {
        page: url.searchParams.get('page') || '1',
        per_page: parseInt(url.searchParams.get('per_page') || '10', 10),
        search: url.searchParams.get('search') || undefined,
        category: url.searchParams.get('category') || undefined,
        orderby: url.searchParams.get('orderby') || 'popularity',
        order: (url.searchParams.get('order') as 'asc' | 'desc') || undefined,
    }

    const currentPage = parseInt(queryParams.page!, 10);
    const perPage = queryParams.per_page!;

    try {
        const apiUrl = new URL(
            `https://www.rushlane.net/wp-json/wc/v3/products`
        )
        apiUrl.searchParams.append('page', String(currentPage));
        apiUrl.searchParams.append('per_page', String(perPage));
        apiUrl.searchParams.append('status', 'publish');
        apiUrl.searchParams.append('type', 'simple');
        apiUrl.searchParams.append('consumer_secret', String(process.env.EXPO_PUBLIC_CONSUMERSECRET));
        apiUrl.searchParams.append('consumer_key', String(process.env.EXPO_PUBLIC_CONSUMERKEY));

        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined && key !== 'page' && key !== 'per_page') {
                apiUrl.searchParams.append(key, String(value));
            }
        }

        const res = await axios.get(apiUrl.toString(), {
            headers: { 'Content-Type': 'application/json' },
        })

        if (res.status !== 200) {
            return Response.json(
                { error: 'Failed to fetch products', message: res.statusText },
                { status: res.status }
            );
        }

        const products: any[] = res.data;

        const productDataConverted: ProductType[] = convertToProductTypeAll(products)

        const hasNextPage = products.length === perPage;
        const nextPage = hasNextPage ? currentPage + 1 : null;
        const prevPage = currentPage > 1 ? currentPage - 1 : null;

        return Response.json({
            productDataConverted,
            pagination: {
                currentPage,
                perPage,
                nextPage,
                prevPage,
                hasNextPage,
            },
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        return Response.json(
            {
                error: 'Failed to fetch products',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

function convertToProductTypeAll(productData: ProductTypeResponse[]): ProductType[] {
    const productList: ProductType[] = []
    productData.forEach((product) => {
        const convertedProduct = convertToProductType(product);
        productList.push(convertedProduct);
    });
    return productList
}


function convertToProductType(productData: ProductTypeResponse):ProductType {
    return {
        id: productData.id,
        name: productData.name,
        slug: productData.slug,
        type: productData.type,
        status: productData.status,
        description: productData.description,
        price: productData.price,
        regular_price: productData.regular_price,
        sale_price: productData.sale_price,
        on_sale: productData.on_sale,
        categories: productData.categories,
        images: productData.images,
        attributes: productData.attributes ? productData.attributes.filter(attribute => attribute.visible): [],
        variations: productData.variations,
        related_ids: productData.related_ids,
        stock_status: productData.stock_status,
        has_options: productData.has_options,
        store: productData.store.disable_vendor === "yes" ? null : {
            vendor_id: productData.store.vendor_id,
            vendor_shop_name: productData.store.vendor_shop_name,
            store_hide_email: productData.store.store_hide_email === "yes" ? true : false,
            store_hide_address: productData.store.store_hide_address === "yes"? true: false,
            store_hide_description: productData.store.store_hide_description === "yes"? true: false,
            store_hide_policy: productData.store.store_hide_policy === "yes" ? true : false,
            vendor_email: productData.store.store_hide_email === "yes" ? null : productData.store.vendor_email,
            vendor_address: productData.store.store_hide_address === "yes" ? null: productData.store.vendor_address,
            disable_vendor: productData.store.disable_vendor  === "yes" ? true : false,
            is_store_offline: productData.store.is_store_offline === "yes" ? true : false,
            vendor_shop_logo: productData.store.vendor_shop_logo,
            vendor_banner: productData.store.vendor_banner,
            store_rating: productData.store.store_rating === "" ? 0 : productData.store.store_rating,
            email_verified: productData.store.email_verified
        }
    }
}