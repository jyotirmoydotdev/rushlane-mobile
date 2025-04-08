export async function GET(_request: Request, {id}: Record<string, string>) {  
    return Response.json({ msg: `GET /api/category/${id}/products`,id });
  }