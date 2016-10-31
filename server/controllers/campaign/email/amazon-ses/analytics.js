const clickThroughBaseUrl = 'localhost:8080';  // placeholder

function wrapLink(body, trackingId, type) {
  if (type === 'Plaintext') {  // skip link tracking for plaintext for now
    return body;
  }

  body = body.replace(/\{(.+?)\/(.+?)\}/g, function(m, label, url) {
    return '<a href="http://' + clickThroughBaseUrl + '/clickthrough?url=' + url + '&trackingId=' + trackingId + '">' + label + '</a>';
  });
  return body;
}

function insertUnsubscribeLink(body, unsubscribeId, type) {
  if (type === 'Plaintext') {
    return body + `\nhttp://${clickThroughBaseUrl}/unsubscribe/${unsubscribeId}`
  }

  return body + "\n<a href=http://" + clickThroughBaseUrl + "/unsubscribe/" + unsubscribeId + "/>unsubscribe</a>";
}

function insertTrackingPixel(body, trackingId, type) {
  if (type === 'Plaintext') {
    return body;
  }

  return body +
    `\n<img src="http://${clickThroughBaseUrl}/trackopen?trackingId=${trackingId}" style="position:absolute; visibility:hidden">`
}

module.exports = {
  wrapLink,
  insertUnsubscribeLink,
  insertTrackingPixel
}