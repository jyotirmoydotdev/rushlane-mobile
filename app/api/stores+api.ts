import axios from "axios"

export async function GET(_request: Request) {
    const res = await axios.get(`https://www.rushlane.net/wp-json/wcfmmp/v1/store-vendors`, {
        params: {
            per_page: 40,
            exclude: 311,
        }
    });

    if (res.status !== 200) {
        return Response.json({ error: 'Failed to fetch stores' }, { status: 500 });
    }

    return Response.json(res.data);
}