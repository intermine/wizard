var alertboxClasses = ["show", "error", "success", "info", "warning"];
var handler = undefined;

/*
* Valid variants are: error, success, info, and warning
*/
function renderAlertMessage(msg, variant, time) {

  if(handler !== undefined) clearAlertMessage(handler);
  if(msg === undefined) msg = "Something went wrong";
  if(variant === undefined) variant = "error";
  if(time === undefined) time = 4000;

  const element = document.getElementById("alertbox");
  
  element.classList.add(alertboxClasses[0], variant);
  handler = setTimeout(clearAlertMessage, time);
  
  element.innerHTML = `
  <svg class="icon icon-lg ${variant}"><use xlink:href="#icon-${variant}"></use></svg>
  <div class="alert-msg">
  ${msg}
  </div>
  <div class="alert-close" onclick="wizard.clearAlertMessage(${handler})">
  <svg class="icon"><use xlink:href="#icon-cross"></use></svg>
  </div>
  `
  
}

function clearAlertMessage(handler) {
  if(handler !== undefined) clearTimeout(handler);
  const element = document.getElementById("alertbox");

  alertboxClasses.forEach(function(c){
    element.classList.remove(c)
  })
  
  handler = undefined;
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


export {
  clearAlertMessage,
  renderAlertMessage,
  removeChildren,
  replaceText
}
