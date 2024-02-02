export function onRequest() {
  // Return empty page to signal list deletion
    return new Response('', {
      headers: { 'Content-Type': 'text/html' },
    })
  }