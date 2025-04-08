import axios from "axios"

export async function GET(_request: Request, { id }: Record<string, string>) {
  const res = await axios.get(`https://www.rushlane.net/wp-json/wcfmmp/v1/store-vendors/${id}`)
  if (res.status !== 200) {
    return Response.json({ error: 'Failed to fetch store' }, { status: 500 });
  }

  return Response.json(res.data);
}