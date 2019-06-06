class ConfluenceHTMLCreator {
  static createTitle(value) {
    if (!value || !String(value).trim().length) return null;

    return `<h2>${value}</h2>`;
  }

  static createDescription(value) {
    if (!value || !String(value).trim().length) return null;

    return `<pre>${value}</pre>`;
  }

  /**
   *
   * @param {string} endpoint endpoint
   * @param {string} method
   * @param {string} host
   */
  static createEndpointTable(endpoint, method, host) {
    if (!endpoint || !String(endpoint).trim().length) return null;

    if (!method || !String(method).trim().length) method = "GET";
    if (!host || !String(host).trim().length) host = "backoffice.playzido.com";

    const output = [
      `<table class="wrapped">
  <colgroup>
    <col/>
    <col/>
  </colgroup>
  <tbody>
    <tr>
      <th colspan="1">Method</th>
      <th>URL</th>
    </tr>
    <tr>
      <td colspan="1">
        <strong>${method}</strong>
      </td>
      <td>
        <span style="color: rgb(122,134,154);">https://<em>${host}</em></span>
        ${endpoint}
      </td>
    </tr>
  </tbody>
</table>`
    ];

    return output.join("");
  }

  static createParamsTable(params) {
    if (!params || !params.length) return null;

    return `
<h4>Request parameters:</h4>
<table class="wrapped">
  <thead>
    <tr>
      <th style="text-align: left;">Parameter</th>
      <th style="text-align: left;">Description</th>
      <th style="text-align: left;">Example</th>
    </tr>
  </thead>
  <tbody>${params
    .map(
      param => `
    <tr>
      <td style="text-align: left;">${param.name}</td>
      <td style="text-align: left;">${param.description}</td>
      <td style="text-align: left;">${param.example}</td>
    </tr>
  `
    )
    .join("")}
  </tbody>
</table>`;
  }
}

export default ConfluenceHTMLCreator;
