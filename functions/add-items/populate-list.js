export async function onRequest(context) {

  // Generate unique IDs for each list element
  var csrng_api = 'https://csprng.xyz/v1/api';

  var rn = await fetch(csrng_api, {})
    .then(response => response.json())
    .then(data => data['Data'])
    .catch(error => error);

  const encoded_rn = new TextEncoder().encode(`${rn}`);

  const encoded_rn_digest = await crypto.subtle.digest(
    {
      name: 'MD5',
    },
    encoded_rn
  );
  var list_rn = 'ID'.concat(`${new Uint8Array(encoded_rn_digest)[0]}`, `${new Uint8Array(encoded_rn_digest)[1]}`, `${new Uint8Array(encoded_rn_digest)[2]}`, `${new Uint8Array(encoded_rn_digest)[3]}`);

  //Get list item from form
  var url_string = context.request.url
  var url = new URL(url_string);
  var list_item = url.searchParams.get('list_item');

  // Render list item with unique ID
  var svg_icon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path fill="currentColor" d="m9 19.414l-6.707-6.707l1.414-1.414L9 16.586L20.293 5.293l1.414 1.414z" />
  </svg>
`
  var list_item_html = `
  <span id="${list_rn}">
  <li><p><span><small class="finished-btn" hx-indicator="#remove-indicator" hx-delete="/add-items/delete" hx-target="#${list_rn}" hx-swap="outerHTML">${svg_icon} Finish.</small></p></span> ${list_item}. </li>
  <hr/>
  </span>
    `;

  return new Response(list_item_html, {
    headers: { 'Content-Type': 'text/html' },
  })
}