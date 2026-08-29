export const config = {
  matcher: '/',
};

export default async function middleware(request) {
  const accept = request.headers.get('accept') || '';
  if (accept.toLowerCase().includes('text/markdown')) {
    const url = new URL('/llms.txt', request.url);
    const response = await fetch(url);
    if (response.ok) {
      const text = await response.text();
      return new Response(text, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept, Accept-Encoding'
        }
      });
    }
  }
}
