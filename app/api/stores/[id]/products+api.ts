import axios from "axios"

export async function GET(_request: Request, {id}: Record<string, string>) {
    const res = await axios.get(`https://rushlane.net/wp-json/wcfmmp/v1/store-vendors/${id}/products`);

    if (res.status !== 200) {
        return Response.json({ error: 'Failed to fetch stores' }, { status: 500 });
    }

    return Response.json(res.data);
}