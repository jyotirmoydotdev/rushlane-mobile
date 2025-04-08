import axios from "axios"

export async function GET(_request: Request) {
    if (!process.env.EXPO_PUBLIC_CONSUMERSECRET || !process.env.EXPO_PUBLIC_CONSUMERKEY) {
        throw new Error('Environment variables CONSUMER_SECRET and CONSUMER_KEY must be set');
    }

    const res = await axios.get(`https://www.rushlane.net/wp-json/wc/v3/products/categories`, {
        params: {
            consumer_secret: process.env.EXPO_PUBLIC_CONSUMERSECRET,
            consumer_key: process.env.EXPO_PUBLIC_CONSUMERKEY,
            orderby: 'include',
            include: [
                124, // Pizza
                111, // Noodles
                126, // Fried Rice
                129, // Momos
                125, // Burger
                134, // Biryani
                364, // Sandwich
                611, // French Fries
                121, // Beverages
                580, // Boba
            ],
        }
    });

    if (res.status !== 200) {
        Response.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }

    return Response.json(res.data);
}