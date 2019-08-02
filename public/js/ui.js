function renderAlertMessage(elemId, text) {
  var span = document.getElementById(elemId);

  span.appendChild(document.createTextNode(text));
}

function clearAlertMessage(elemId) {
  var span = document.getElementById(elemId);

  removeChildren(span);
}

function removeChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function replaceText(elemId, text) {
  var elem = document.getElementById(elemId);
  var text = document.createTextNode(text);
  removeChildren(elem);
  elem.appendChild(text);
}

export {clearAlertMessage, renderAlertMessage, removeChildren, replaceText}
