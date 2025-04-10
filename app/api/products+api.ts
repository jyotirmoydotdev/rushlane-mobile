import axios from 'axios'

export interface ProductsQueryParams {
    page?: string;
    per_page?: number;
    search?: string;
    category?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
}


export async function GET(request: Request, { id }: Record<string, string>) {
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

        const hasNextPage = products.length === perPage;
        const nextPage = hasNextPage ? currentPage + 1 : null;
        const prevPage = currentPage > 1 ? currentPage - 1 : null;

        return Response.json({
            products,
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
