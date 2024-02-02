export function onRequest() {
    return new Response('', {
      headers: { 'Content-Type': 'text/html' },
    })
  }