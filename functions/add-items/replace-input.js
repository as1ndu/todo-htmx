export function onRequest() {
   var html = `<input id="input-form" name="list_item" type="text" placeholder="What do you want to do ?" size="25">`
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
      })
    }