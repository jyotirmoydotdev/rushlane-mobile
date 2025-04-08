export async function GET(_request: Request, {id}: Record<string, string>) {  
    return Response.json({ id });
  }