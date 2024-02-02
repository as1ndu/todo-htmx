export async function onRequest(context) {

  var url_string = context.request.url
  var url = new URL(url_string);

  var list_item = url.searchParams.get('list_item');

  var list_item_html = `
  <span id="abx">
  <li><p><span><small class="finished-btn" hx-indicator="#remove-indicator" hx-delete="/add-items/delete" hx-target="#abx" hx-swap="outerHTML">👍 Finish.</small></p></span> ${list_item}. </li>
  <hr/>
  </span>
    `;

  return new Response(list_item_html, {
    headers: { 'Content-Type': 'text/html' },
  })
}