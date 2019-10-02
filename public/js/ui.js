const alertboxClasses = ["show", "error", "success", "info", "warning"];

/* 
* handler: It is used to point the timer function setTimeout
* Use: It is used to clear any active previous timer function.
* Importance: The alert boxes are cancellable and it is possible 
* that it is cancelled before the time interval of the timer function.
* So to clear the timer handler is passed to clearTimeout to clear 
* timer. It helps to handle the unexpected behaviour which may arise 
* when new alert box is rendering.
*/
let handler = undefined;

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

function clearAlertMessage(h) {
  if(h !== undefined) clearTimeout(h);
  const element = document.getElementById("alertbox");

  alertboxClasses.forEach(function(c){
    element.classList.remove(c)
  })
  
  /*
  * Resetting handler. After this handler is not pointing to any
  * timer function. This means no alertbox is active.
  */
  handler = undefined;
}

function removeChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function replaceText(elemId, text) {
  var elem = document.getElementById(elemId);
  var textNode = document.createTextNode(text);
  removeChildren(elem);
  elem.appendChild(textNode);
}


export {
  clearAlertMessage,
  renderAlertMessage,
  removeChildren,
  replaceText
}
