import { demoCategory } from "@/lib/demo/data";
import axios from "axios"

export interface ProductsQueryParams {
    page?: string;
    per_page?: number;
    search?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
}

export async function GET(request: Request) {
    return Response.json({
        categories: demoCategory,
        pagination: {
            currentPage: 1,
            perPage: 10,
            nextPage: null,
            prevPage: null,
            hasNextPage: false,
        },
    });
}

export async function GETs(request: Request) {
    const url = new URL(request.url)
    const queryParams: ProductsQueryParams = {
        page: url.searchParams.get('page') || '1',
        per_page: parseInt(url.searchParams.get('per_page') || '24', 24),
        search: url.searchParams.get('search') || undefined,
        orderby: url.searchParams.get('orderby') || 'include',
        order: (url.searchParams.get('order') as 'asc' | 'desc') || undefined,
    }
    const currentPage = parseInt(queryParams.page!, 10);
    const perPage = queryParams.per_page!;

    try {
        const apiUrl = new URL(
            `https://www.rushlane.net/wp-json/wc/v3/products/categories`
        )
        apiUrl.searchParams.append('page', String(currentPage));
        apiUrl.searchParams.append('per_page', String(perPage));
        apiUrl.searchParams.append('consumer_secret', String(process.env.EXPO_PUBLIC_CONSUMERSECRET));
        apiUrl.searchParams.append('consumer_key', String(process.env.EXPO_PUBLIC_CONSUMERKEY));
        apiUrl.searchParams.append('include', String([
            422, // Appetizers
            575, // Asian
            490, // Beef
            121, // Beverages
            134, // Biryani
            580, // Boba
            599, // Bread
            125, // Burger
            548, // Bowls
            491, // Chicken
            366, // Chinese
            530, // Chopsuey
            459, // Chowmein
            372, // Chutney
            601, // Coffee
            499, // Cold Beverage
            391, // Combo
            116, // Curry
            457, // Cutlets
            597, // Dessert
            583, // Dinner
            572, // Dosa
            611, // French Fries
            390, // Fried Chicken
            126, // Fries Rice
            531, // Gravy
            367, // Indo-Chinese Cuisine
            370, // Italian Cuisine
            413, // Kebabs
            498, // Kimbap
            579, // Koren
            582, // Lunch
            552, // Main Course
            458, // Meat Ball
            498, // Mocktails
            589, // Mojito
            129, // Momos
            487, // Non-Veg Main course
            111, // Noodles
            365, // North Indian Cuisine
            363, // Omelette
            148, // Pakodas
            376, // Paratha
            127, // Pasta
            124, // Pizza
            492, // Pork
            141, // Rolls
            145, // Roti
            480, // Salads
            364, // Sandwich
            373, // Sandwich Grilled
            474, // Sea Food
            369, // Shake
            368, // Shawarma
            561, // Smoothies
            371, // Snacks
            143, // Soup
            388, // South Indian
            551, // Sushi
            602, // Tea
            555, // Thukpa
        ]))

        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined && key !== 'page' && key !== 'per_page') {
                apiUrl.searchParams.append(key, String(value))
            }
        }
        const res = await axios.get(apiUrl.toString(), {
            headers: { 'Content-Type': 'application/json' },
        })

        if (res.status !== 200) {
            return Response.json(
                {
                    error: 'Failed to fetch categories',
                    message: res.statusText
                },
                {
                    status: res.status,
                }
            )
        }

        const categories: any[] = res.data;

        const hasNextPage = categories.length === perPage;
        const nextPage = hasNextPage ? currentPage + 1 : null;
        const prevPage = currentPage > 1 ? currentPage - 1 : null;

        return Response.json({
            categories,
            pagination: {
                currentPage,
                perPage,
                nextPage,
                prevPage,
                hasNextPage,
            },
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return Response.json(
            {
                error: 'Failed to fetch categories',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}