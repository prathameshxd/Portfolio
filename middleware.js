export const config = {
  matcher: '/',
};

export default function middleware(request) {
  const accept = request.headers.get('accept') || '';
  if (accept.toLowerCase().includes('text/markdown')) {
    const url = new URL('/llms.txt', request.url);
    return new Response(null, {
      headers: {
        'x-middleware-rewrite': url.toString()
      }
    });
  }
}
