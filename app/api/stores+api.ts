export function GET(request: Request) {
    console.log('Hello from the server');
    return Response.json({ hello: 'world' });
}  