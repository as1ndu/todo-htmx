export async function onRequest(context) {

  var csrng_api = 'https://csprng.xyz/v1/api';

  var rn = await fetch(csrng_api, {})
    .then(response => response.json())
    .then(data => data['Data'])
    .catch(error => error);

  var list_rn = rn.substring(0, 8);

  var url_string = context.request.url
  var url = new URL(url_string);

  var list_item = url.searchParams.get('list_item');

  var list_item_html = `
  <span id="abx">
  <li><p><span><small class="finished-btn" hx-delete="/add-items/delete" hx-target="#abx" hx-swap="outerHTML">👍 Finish.</small></p></span> ${list_item}. </li>
  <hr/>
  </span>
    `;

  return new Response(list_item_html, {
    headers: { 'Content-Type': 'text/html' },
  })
}