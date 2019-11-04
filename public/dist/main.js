var wizard =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/client.js":
/*!*****************************!*\
  !*** ./public/js/client.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _comms_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comms.js */ "./public/js/comms.js");
/* harmony import */ var _user_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.js */ "./public/js/user.js");
/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.js */ "./public/js/home.js");
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui.js */ "./public/js/ui.js");
/* harmony import */ var _mineIDs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mineIDs.js */ "./public/js/mineIDs.js");





/* Possible polyfills we'll want:
 * - Fetch
 * - Promise.
 * - URL searchParams.
 */

/* harmony default export */ __webpack_exports__["default"] = ((function () {
  function removeChildren(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }
  /*
   * Page: dashboard
   */


  function openInProgressMine(mine) {// eslint-disable-line no-unused-vars
    // TODO
  }

  function renderInProgressMine(mine) {
    var containerLi = document.createElement('li');
    var statusDiv = document.createElement('div');
    statusDiv.className = "status construction";
    var statusSvg = document.createElement('svg');
    statusSvg.className = "icon icon-building";
    var statusUse = document.createElement('use');
    statusUse['xlink:href'] = "#icon-building";
    var statusP = document.createElement('p');
    statusP.appendChild(document.createTextNode("Incomplete"));
    statusSvg.appendChild(statusUse);
    statusDiv.appendChild(statusSvg);
    statusDiv.appendChild(statusP);
    containerLi.appendChild(statusDiv);
    var nameDiv = document.createElement('div');
    var nameA = document.createElement('a');
    nameA.href = mine.minelocation;
    nameA.appendChild(document.createTextNode(mine.mineName.concat(" work in progress")));
    nameDiv.appendChild(nameA);
    containerLi.appendChild(nameDiv);
    var actionsDiv = document.createElement('div');
    actionsDiv.className = "continue-wizard";
    var actionsUpperDiv = document.createElement('div');
    var actionsUpperA = document.createElement('a');
    actionsUpperA.onclick = openInProgressMine(mine);
    actionsUpperA.className = "resume";
    var actionsUpperSvg = document.createElement('svg');
    actionsUpperSvg.className = "icon icon-resume";
    var actionsUpperUse = document.createElement('use');
    actionsUpperUse['xlink:href'] = "#icon-resume";
    actionsUpperSvg.appendChild(actionsUpperUse);
    actionsUpperA.appendChild(actionsUpperSvg);
    actionsUpperA.appendChild(document.createTextNode("Continue setup"));
    actionsUpperDiv.appendChild(actionsUpperA);
    actionsDiv.appendChild(actionsUpperDiv);
    var actionsLowerDiv = document.createElement('div');
    var actionsLowerA = document.createElement('a');
    actionsLowerA.href = "#";
    actionsLowerA.className = "discard";
    var actionsLowerSvg = document.createElement('svg');
    actionsLowerSvg.className = "icon icon-cancel";
    var actionsLowerUse = document.createElement('use');
    actionsLowerUse['xlink:href'] = "#icon-cancel";
    actionsLowerSvg.appendChild(actionsLowerUse);
    actionsLowerA.appendChild(actionsLowerSvg);
    actionsLowerA.appendChild(document.createTextNode("Discard"));
    actionsLowerDiv.appendChild(actionsLowerA);
    actionsDiv.appendChild(actionsLowerDiv);
    containerLi.appendChild(actionsDiv);
    var completeByDiv = document.createElement('div');
    completeByDiv.appendChild(document.createTextNode(mine.etaDate));
    containerLi.appendChild(completeByDiv);
    var node = document.getElementById("in-progress-mines");
    node.appendChild(containerLi);
  } // Why is the above written with appendChild and the below with innerHTML?
  // For the joy of comparison of course!


  function renderRunningMine(mine) {
    var container = document.createElement('li');
    container.innerHTML = '<div class="status active">' + '<svg class="icon icon-checkmark">' + '<use xlink:href="#icon-checkmark"></use>' + '</svg>' + '<p>Active</p>' + '</div>' + '<div><a href="' + mine.minelocation + '">' + mine.mineName + '</a></div>' + '<div class="mine-config">' + '<a href="config">' + '<svg class="icon icon-view">' + '<use xlink:href="#icon-view"></use>' + '</svg>' + 'View' + '</a>' + '<a href="#">' + '<svg class="icon icon-download">' + '<use xlink:href="#icon-download"></use>' + '</svg>' + 'Export' + '</a>' + '</div>' + '<div class="mine-troubleshooting">' + '<a href="#"> Delete</a>' + '</div>';
    var node = document.getElementById("running-mines");
    node.appendChild(container);
  }

  function renderDashboardMines() {
    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])("/mine/all").then(function (listOfMines) {
      listOfMines.forEach(function (mine) {
        if (mine.mineStatus === "in progress") {
          renderInProgressMine(mine);
        } else if (mine.mineStatus === "running") {
          renderRunningMine(mine);
        }
      });
    });
  }
  /*
   * Page: wizard/supplementaryData
   */


  function renderSupplementaryData() {
    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])("/configurator/supplementaryDataSources").then(function (dataSources) {
      var node = document.getElementById("supplementaryDataSources");
      removeChildren(node);
      dataSources.forEach(function (source) {
        var li = document.createElement("li");
        var label = document.createElement("label");
        var input = document.createElement("input");
        input.type = "checkbox";
        input.value = source.id;
        input.name = "supplementary";
        input.checked = "checked";
        label.appendChild(input);
        label.appendChild(document.createTextNode(source.label));
        li.appendChild(label);
        node.appendChild(li);
      });
    });
  }

  function renderDataTools() {
    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])("/configurator/dataTools").then(function (tools) {
      var node = document.getElementById("dataTools");
      removeChildren(node);
      tools.forEach(function (tool) {
        var li = document.createElement("li");
        var h3 = document.createElement("h3");
        h3.className = "subHeader";
        h3.appendChild(document.createTextNode(tool.toolName));
        var p = document.createElement("p");
        p.appendChild(document.createTextNode(tool.toolDescription));
        var label = document.createElement("label");
        var input = document.createElement("input");
        input.type = "checkbox";
        input.value = tool.toolId;
        input.name = "tool";
        input.checked = "checked";
        label.appendChild(input);
        label.appendChild(document.createTextNode("Enabled"));
        var div = document.createElement("div");
        div.className = "imagePreview";
        var img = document.createElement("img");
        img.src = tool.toolPreview;
        div.appendChild(img);
        li.appendChild(h3);
        li.appendChild(p);
        li.appendChild(label);
        li.appendChild(div);
        node.appendChild(li);
      });
    });
  }

  function initSupplementaries() {
    renderSupplementaryData();
    renderDataTools();
  }

  function getCheckedNames(name) {
    var checked = [];
    var checkboxes = document.getElementsByName(name);

    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checked.push(checkboxes[i].value);
      }
    }

    return checked;
  }

  function saveSupplementaryDataSources() {
    var checked = getCheckedNames("supplementary");
    return Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])({
      path: "/configurator/mine/supplementaryDataSources",
      params: {
        mineId: Object(_mineIDs_js__WEBPACK_IMPORTED_MODULE_4__["readMineId"])()
      }
    }, {
      sources: checked
    });
  }

  function saveDataTools() {
    var checked = getCheckedNames("tool");
    return Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])({
      path: "/configurator/mine/dataTools",
      params: {
        mineId: Object(_mineIDs_js__WEBPACK_IMPORTED_MODULE_4__["readMineId"])()
      }
    }, {
      tools: checked
    });
  }

  function saveSupplementaries() {
    Promise.all([saveSupplementaryDataSources(), saveDataTools()]).then(function () {
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["openPage"])("/wizard/config");
    });
  }
  /*
   * Page: wizard/config
   */


  var mineAvailabilityTimer;

  function renderCheckAvailability(event) {
    window.clearTimeout(mineAvailabilityTimer);
    mineAvailabilityTimer = window.setTimeout(function () {
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])("/mine/nameAvailability", {
        mineName: event.target.value
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        var iconName = data.isAvailable ? "checkmark" : "cross";
        var text = document.createTextNode(data.isAvailable ? "This project name is free!" : "This project name is taken.");
        var node = document.getElementById("validation");
        var svg = document.createElement("svg");
        svg.className = "icon icon-".concat(iconName);
        var use = document.createElement("use");
        use['xlink:href'] = "#icon-".concat(iconName);
        svg.appendChild(use);
        removeChildren(node);
        node.appendChild(svg);
        node.appendChild(text);
      });
    }, 500);
  }

  function saveDescriptors() {
    var mineName = document.getElementById("mineNameInput").value;
    var privacy = document.querySelector('input[name="publicPrivate"]:checked').value;
    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])({
      path: "/configurator/mine/descriptors",
      params: {
        mineId: Object(_mineIDs_js__WEBPACK_IMPORTED_MODULE_4__["readMineId"])()
      }
    }, {
      mineName: mineName,
      privacy: privacy
    }).then(function () {
      // TODO handle case where `mineName` is already taken
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["openPage"])("/wizard/finalise");
    });
  }
  /*
   * Page: wizard/finalise
   */


  function renderFinaliseUploadedFiles(files) {
    var node = document.getElementById("uploadedFiles");
    removeChildren(node);
    files.forEach(function (file) {
      var div = document.createElement("div");
      div.className = "subStepContent";
      var h4 = document.createElement("h4");
      h4.appendChild(document.createTextNode(file.dataFile.name));
      var ul = document.createElement("ul");
      var li = document.createElement("li");
      var span = document.createElement("span");
      span.className = "title";
      span.appendChild(document.createTextNode("Organism:"));
      li.appendChild(span);
      li.appendChild(document.createTextNode(file.dataFile.organism.name));
      ul.appendChild(li);
      div.appendChild(h4);
      div.appendChild(ul);
      node.appendChild(div);
    });
  }

  function renderList(elemId, items) {
    var node = document.getElementById(elemId);
    removeChildren(node);
    items.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.url;
      var text = document.createTextNode(item.text);
      a.appendChild(text);
      li.appendChild(a);
      node.appendChild(li);
    });
  }

  function renderFinaliseSupplementaries(sources, tools) {
    renderList("supplementaryData", sources.map(function (source) {
      return {
        text: source.label,
        url: source.url
      };
    }));
    renderList("dataTools", tools.map(function (tool) {
      return {
        text: tool.toolName,
        url: tool.toolPreview
      };
    }));
  }

  function renderFinaliseDescriptor(descriptor) {
    var urlElem = document.getElementById("mineName");
    removeChildren(urlElem);
    urlElem.appendChild(document.createTextNode(descriptor.mineName));
    var privacyElem = document.getElementById("privacy");
    removeChildren(privacyElem);
    privacyElem.appendChild(document.createTextNode(descriptor.privacy));
  }

  function initFinalise() {
    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])({
      path: "/configurator/mine/user-config",
      params: {
        mineId: Object(_mineIDs_js__WEBPACK_IMPORTED_MODULE_4__["readMineId"])()
      }
    }).then(function (data) {
      renderFinaliseUploadedFiles(data.dataFiles);
      renderFinaliseSupplementaries(data.supplementaryDataSources, data.dataTools);
      renderFinaliseDescriptor(data.mineDescriptor);
    });
  }
  /*
   * Exports
   */


  return {
    openInitialPage: _home_js__WEBPACK_IMPORTED_MODULE_2__["openInitialPage"],
    registerUser: _user_js__WEBPACK_IMPORTED_MODULE_1__["registerUser"],
    loginUser: _user_js__WEBPACK_IMPORTED_MODULE_1__["loginUser"],
    logoutUser: _user_js__WEBPACK_IMPORTED_MODULE_1__["logoutUser"],
    renderDashboardMines: renderDashboardMines,
    initSupplementaries: initSupplementaries,
    saveSupplementaries: saveSupplementaries,
    renderCheckAvailability: renderCheckAvailability,
    saveDescriptors: saveDescriptors,
    initFinalise: initFinalise,
    renderAlertMessage: _ui_js__WEBPACK_IMPORTED_MODULE_3__["renderAlertMessage"],
    clearAlertMessage: _ui_js__WEBPACK_IMPORTED_MODULE_3__["clearAlertMessage"]
  };
})());

/***/ }),

/***/ "./public/js/comms.js":
/*!****************************!*\
  !*** ./public/js/comms.js ***!
  \****************************/
/*! exports provided: postData, fetchJson, service, openPage, saveStorage, loadStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchJson", function() { return fetchJson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "service", function() { return service; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openPage", function() { return openPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveStorage", function() { return saveStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadStorage", function() { return loadStorage; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// var endpoint = "https://wizard.intermine.org/v1";
var endpoint = "http://127.0.0.1:9991/api/v1"; // Since our server (not the API) doesn't know whether the user is
// authenticated, checking for this and sending them to the `/register` page
// is a common pattern. We codify this here, so that we can use it in our
// generic request functions below.

function handleErrorResponse(res) {
  if (res.status === 401) {
    // The user isn't authorized, so make them sign in.
    openPage("/register");
    return new Error("You are not authorized.");
  } else {
    return res;
  }
} // Argument can be either a string representing the path or an object with
// `path` and `params` keys, where params is an object of string entries.


function service(arg) {
  if (_typeof(arg) === 'object') {
    // When we add query params, our backend will complain if we don't have a
    // trailing slash.
    var path = arg.path.slice(-1) === '/' ? arg.path : arg.path.concat('/');
    var url = new URL(endpoint.concat(path));

    if ('params' in arg) {
      for (var key in arg.params) {
        if (arg.params.hasOwnProperty(key)) {
          var val = arg.params[key];
          url.searchParams.append(key, val);
        }
      }
    }

    return url;
  } else {
    return endpoint.concat(arg);
  }
}

function fetchJson(path) {
  return new Promise(function (resolve, reject) {
    fetch(service(path), {
      credentials: 'include'
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      } else {
        reject(handleErrorResponse(res));
      }
    }).then(function (data) {
      resolve(data);
    });
  });
}

function postData(path, data) {
  return new Promise(function (resolve, reject) {
    fetch(service(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }).then(function (res) {
      if (res.ok) {
        resolve(res);
      } else {
        reject(handleErrorResponse(res));
      }
    });
  });
}

function openPage(path) {
  window.location.href = path;
} // Wrapping our calls to `sessionStorage` can be useful in case we ever
// decide to use a different form of storage, or add side-effects.


function saveStorage(key, val) {
  return sessionStorage.setItem(key, val);
}

function loadStorage(key) {
  return sessionStorage.getItem(key);
}



/***/ }),

/***/ "./public/js/home.js":
/*!***************************!*\
  !*** ./public/js/home.js ***!
  \***************************/
/*! exports provided: openInitialPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openInitialPage", function() { return openInitialPage; });
/* harmony import */ var _comms_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comms.js */ "./public/js/comms.js");
/* harmony import */ var _mineIDs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mineIDs.js */ "./public/js/mineIDs.js");


/*
 * Page: home
 */

function openInitialPage(event) {
  if (event) event.preventDefault();
  Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])("/mine/all").then(function (listOfMines) {
    if (listOfMines.length) {
      // We have mines; display them in the dashboard page!
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["openPage"])("/dashboard");
    } else {
      // We don't have mines; get started with the wizard!
      Object(_mineIDs_js__WEBPACK_IMPORTED_MODULE_1__["createMineId"])().then(function () {
        Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["openPage"])("/wizard/upload");
      });
    }
  });
}



/***/ }),

/***/ "./public/js/mineIDs.js":
/*!******************************!*\
  !*** ./public/js/mineIDs.js ***!
  \******************************/
/*! exports provided: createMineId, readMineId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMineId", function() { return createMineId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readMineId", function() { return readMineId; });
/* harmony import */ var _comms_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comms.js */ "./public/js/comms.js");


function createMineId() {
  return new Promise(function (resolve) {
    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])("/configurator/mine/user-config/new/").then(function (mineId) {
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["saveStorage"])("mineId", mineId);
      resolve(mineId);
    });
  });
}

function readMineId() {
  return Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["loadStorage"])("mineId");
}



/***/ }),

/***/ "./public/js/ui.js":
/*!*************************!*\
  !*** ./public/js/ui.js ***!
  \*************************/
/*! exports provided: clearAlertMessage, renderAlertMessage, removeChildren, replaceText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearAlertMessage", function() { return clearAlertMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderAlertMessage", function() { return renderAlertMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeChildren", function() { return removeChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceText", function() { return replaceText; });
var alertboxClasses = ["show", "error", "success", "info", "warning"];
/* 
* handler: It is used to point the timer function setTimeout
* Use: It is used to clear any active previous timer function.
* Importance: The alert boxes are cancellable and it is possible 
* that it is cancelled before the time interval of the timer function.
* So to clear the timer handler is passed to clearTimeout to clear 
* timer. It helps to handle the unexpected behaviour which may arise 
* when new alert box is rendering.
*/

var handler = undefined;
/*
* Valid variants are: error, success, info, and warning
*/

function renderAlertMessage(msg, variant, time) {
  if (handler !== undefined) clearAlertMessage(handler);
  if (msg === undefined) msg = "Something went wrong";
  if (variant === undefined) variant = "error";
  if (time === undefined) time = 4000;
  var element = document.getElementById("alertbox");
  element.classList.add(alertboxClasses[0], variant);
  handler = setTimeout(clearAlertMessage, time);
  element.innerHTML = "\n  <svg class=\"icon icon-lg ".concat(variant, "\"><use xlink:href=\"#icon-").concat(variant, "\"></use></svg>\n  <div class=\"alert-msg\">\n  ").concat(msg, "\n  </div>\n  <div class=\"alert-close\" onclick=\"wizard.clearAlertMessage(").concat(handler, ")\">\n  <svg class=\"icon\"><use xlink:href=\"#icon-cross\"></use></svg>\n  </div>\n  ");
}

function clearAlertMessage(h) {
  if (h !== undefined) clearTimeout(h);
  var element = document.getElementById("alertbox");
  alertboxClasses.forEach(function (c) {
    element.classList.remove(c);
  });
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



/***/ }),

/***/ "./public/js/user.js":
/*!***************************!*\
  !*** ./public/js/user.js ***!
  \***************************/
/*! exports provided: loginUser, logoutUser, registerUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginUser", function() { return loginUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logoutUser", function() { return logoutUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerUser", function() { return registerUser; });
/* harmony import */ var _comms_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comms.js */ "./public/js/comms.js");
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui.js */ "./public/js/ui.js");
/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.js */ "./public/js/home.js");



/*
 * Page: register
 */

function readForm(obj) {
  var inputs = {};
  Object.entries(obj.inputs).forEach(function (entry) {
    var key = entry[0];
    var val = entry[1];
    inputs[key] = document.getElementById(val).value;
  });
  Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__["clearAlertMessage"])();
  var error = obj.validations.some(function (testFun) {
    var res = testFun(inputs);
    if (res) Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__["renderAlertMessage"])(res, "warning", 5000);
    return res;
  });
  if (error) return;else return inputs;
}

var validate = {
  passwordsMatch: function passwordsMatch(inputs) {
    if (inputs.password !== inputs.passwordConfirm) {
      return "Passwords do not match.";
    }
  },
  notEmpty: function notEmpty(inputs) {
    if (Object.values(inputs).some(function (inp) {
      return !inp;
    })) {
      return "Please fill in all the fields.";
    }
  }
};

function registerUser(event) {
  event.preventDefault();
  var inputData = readForm({
    inputs: {
      email: "register-email",
      firstName: "register-first-name",
      lastName: "register-last-name",
      organisation: "register-organisation",
      password: "register-password",
      passwordConfirm: "register-password-confirm"
    },
    validations: [validate.passwordsMatch, validate.notEmpty]
  });

  if (inputData) {
    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])("/user/register", inputData).then(function (registerRes) {
      // Render alert message for 10seconds.
      Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__["renderAlertMessage"])("Account created successfully", "success", 10000);
    })["catch"](function (errRes) {
      if (errRes instanceof Error) {
        console.error(errRes);
      } else {
        // Handle any error messages from backend.
        errRes.json().then(function (res) {
          // Render alert message for 10seconds.
          Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__["renderAlertMessage"])(res.message, "error", 10000);
        });
      }
    });
  }

  return false;
}

function loginUser(event) {
  event.preventDefault();
  var inputData = readForm({
    inputs: {
      email: "signin-email",
      password: "signin-password"
    },
    alertId: "signinFormAlert",
    validations: [validate.notEmpty]
  });

  if (inputData) {
    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])("/user/login", inputData).then(function () {
      Object(_home_js__WEBPACK_IMPORTED_MODULE_2__["openInitialPage"])();
    })["catch"](function (err) {
      // Wrong credentials
      if (err.status == 400) {
        Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__["renderAlertMessage"])("Wrong credentials", "error", 5000);
      } else Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__["renderAlertMessage"])(); // Render default alertbox

    });
  }

  return false;
}

function logoutUser() {
  var path = "/user/logout";
  Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])(path).then(function (response) {
    console.log(response);

    if (response.message) {
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["openPage"])("/register"); // todo - also post statuse message saying there has been a successful
      // logout. Add soemthing to the openpage method to print to the header
      // alertbox
    } else {
      // Rendering message for 5seconds.
      Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__["renderAlertMessage"])("Uhoh, problem logging out!", "warning", 5000);
    }
  });
}



/***/ })

/******/ })["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aXphcmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL2NsaWVudC5qcyIsIndlYnBhY2s6Ly93aXphcmQvLi9wdWJsaWMvanMvY29tbXMuanMiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL2hvbWUuanMiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL21pbmVJRHMuanMiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL3VpLmpzIiwid2VicGFjazovL3dpemFyZC8uL3B1YmxpYy9qcy91c2VyLmpzIl0sIm5hbWVzIjpbInJlbW92ZUNoaWxkcmVuIiwibm9kZSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsIm9wZW5JblByb2dyZXNzTWluZSIsIm1pbmUiLCJyZW5kZXJJblByb2dyZXNzTWluZSIsImNvbnRhaW5lckxpIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3RhdHVzRGl2IiwiY2xhc3NOYW1lIiwic3RhdHVzU3ZnIiwic3RhdHVzVXNlIiwic3RhdHVzUCIsImFwcGVuZENoaWxkIiwiY3JlYXRlVGV4dE5vZGUiLCJuYW1lRGl2IiwibmFtZUEiLCJocmVmIiwibWluZWxvY2F0aW9uIiwibWluZU5hbWUiLCJjb25jYXQiLCJhY3Rpb25zRGl2IiwiYWN0aW9uc1VwcGVyRGl2IiwiYWN0aW9uc1VwcGVyQSIsIm9uY2xpY2siLCJhY3Rpb25zVXBwZXJTdmciLCJhY3Rpb25zVXBwZXJVc2UiLCJhY3Rpb25zTG93ZXJEaXYiLCJhY3Rpb25zTG93ZXJBIiwiYWN0aW9uc0xvd2VyU3ZnIiwiYWN0aW9uc0xvd2VyVXNlIiwiY29tcGxldGVCeURpdiIsImV0YURhdGUiLCJnZXRFbGVtZW50QnlJZCIsInJlbmRlclJ1bm5pbmdNaW5lIiwiY29udGFpbmVyIiwiaW5uZXJIVE1MIiwicmVuZGVyRGFzaGJvYXJkTWluZXMiLCJmZXRjaEpzb24iLCJ0aGVuIiwibGlzdE9mTWluZXMiLCJmb3JFYWNoIiwibWluZVN0YXR1cyIsInJlbmRlclN1cHBsZW1lbnRhcnlEYXRhIiwiZGF0YVNvdXJjZXMiLCJzb3VyY2UiLCJsaSIsImxhYmVsIiwiaW5wdXQiLCJ0eXBlIiwidmFsdWUiLCJpZCIsIm5hbWUiLCJjaGVja2VkIiwicmVuZGVyRGF0YVRvb2xzIiwidG9vbHMiLCJ0b29sIiwiaDMiLCJ0b29sTmFtZSIsInAiLCJ0b29sRGVzY3JpcHRpb24iLCJ0b29sSWQiLCJkaXYiLCJpbWciLCJzcmMiLCJ0b29sUHJldmlldyIsImluaXRTdXBwbGVtZW50YXJpZXMiLCJnZXRDaGVja2VkTmFtZXMiLCJjaGVja2JveGVzIiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJpIiwibGVuZ3RoIiwicHVzaCIsInNhdmVTdXBwbGVtZW50YXJ5RGF0YVNvdXJjZXMiLCJwb3N0RGF0YSIsInBhdGgiLCJwYXJhbXMiLCJtaW5lSWQiLCJyZWFkTWluZUlkIiwic291cmNlcyIsInNhdmVEYXRhVG9vbHMiLCJzYXZlU3VwcGxlbWVudGFyaWVzIiwiUHJvbWlzZSIsImFsbCIsIm9wZW5QYWdlIiwibWluZUF2YWlsYWJpbGl0eVRpbWVyIiwicmVuZGVyQ2hlY2tBdmFpbGFiaWxpdHkiLCJldmVudCIsIndpbmRvdyIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJ0YXJnZXQiLCJyZXMiLCJqc29uIiwiZGF0YSIsImljb25OYW1lIiwiaXNBdmFpbGFibGUiLCJ0ZXh0Iiwic3ZnIiwidXNlIiwic2F2ZURlc2NyaXB0b3JzIiwicHJpdmFjeSIsInF1ZXJ5U2VsZWN0b3IiLCJyZW5kZXJGaW5hbGlzZVVwbG9hZGVkRmlsZXMiLCJmaWxlcyIsImZpbGUiLCJoNCIsImRhdGFGaWxlIiwidWwiLCJzcGFuIiwib3JnYW5pc20iLCJyZW5kZXJMaXN0IiwiZWxlbUlkIiwiaXRlbXMiLCJpdGVtIiwiYSIsInVybCIsInJlbmRlckZpbmFsaXNlU3VwcGxlbWVudGFyaWVzIiwibWFwIiwicmVuZGVyRmluYWxpc2VEZXNjcmlwdG9yIiwiZGVzY3JpcHRvciIsInVybEVsZW0iLCJwcml2YWN5RWxlbSIsImluaXRGaW5hbGlzZSIsImRhdGFGaWxlcyIsInN1cHBsZW1lbnRhcnlEYXRhU291cmNlcyIsImRhdGFUb29scyIsIm1pbmVEZXNjcmlwdG9yIiwib3BlbkluaXRpYWxQYWdlIiwicmVnaXN0ZXJVc2VyIiwibG9naW5Vc2VyIiwibG9nb3V0VXNlciIsInJlbmRlckFsZXJ0TWVzc2FnZSIsImNsZWFyQWxlcnRNZXNzYWdlIiwiZW5kcG9pbnQiLCJoYW5kbGVFcnJvclJlc3BvbnNlIiwic3RhdHVzIiwiRXJyb3IiLCJzZXJ2aWNlIiwiYXJnIiwic2xpY2UiLCJVUkwiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsInZhbCIsInNlYXJjaFBhcmFtcyIsImFwcGVuZCIsInJlc29sdmUiLCJyZWplY3QiLCJmZXRjaCIsImNyZWRlbnRpYWxzIiwib2siLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJsb2NhdGlvbiIsInNhdmVTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwibG9hZFN0b3JhZ2UiLCJnZXRJdGVtIiwicHJldmVudERlZmF1bHQiLCJjcmVhdGVNaW5lSWQiLCJhbGVydGJveENsYXNzZXMiLCJoYW5kbGVyIiwidW5kZWZpbmVkIiwibXNnIiwidmFyaWFudCIsInRpbWUiLCJlbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaCIsImMiLCJyZW1vdmUiLCJyZXBsYWNlVGV4dCIsImVsZW0iLCJ0ZXh0Tm9kZSIsInJlYWRGb3JtIiwib2JqIiwiaW5wdXRzIiwiT2JqZWN0IiwiZW50cmllcyIsImVudHJ5IiwiZXJyb3IiLCJ2YWxpZGF0aW9ucyIsInNvbWUiLCJ0ZXN0RnVuIiwidmFsaWRhdGUiLCJwYXNzd29yZHNNYXRjaCIsInBhc3N3b3JkIiwicGFzc3dvcmRDb25maXJtIiwibm90RW1wdHkiLCJ2YWx1ZXMiLCJpbnAiLCJpbnB1dERhdGEiLCJlbWFpbCIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwib3JnYW5pc2F0aW9uIiwicmVnaXN0ZXJSZXMiLCJlcnJSZXMiLCJjb25zb2xlIiwibWVzc2FnZSIsImFsZXJ0SWQiLCJlcnIiLCJyZXNwb25zZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7QUFNZSxnRUFBQyxZQUFXO0FBRXpCLFdBQVNBLGNBQVQsQ0FBd0JDLElBQXhCLEVBQThCO0FBQzVCLFdBQU9BLElBQUksQ0FBQ0MsVUFBWixFQUF3QjtBQUN0QkQsVUFBSSxDQUFDRSxXQUFMLENBQWlCRixJQUFJLENBQUNDLFVBQXRCO0FBQ0Q7QUFDRjtBQUVEOzs7OztBQUlBLFdBQVNFLGtCQUFULENBQTRCQyxJQUE1QixFQUFrQyxDQUFFO0FBQ2xDO0FBQ0Q7O0FBRUQsV0FBU0Msb0JBQVQsQ0FB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WEQ7QUFZRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wdWJsaWMvanMvY2xpZW50LmpzXCIpO1xuIiwiaW1wb3J0IHtwb3N0RGF0YSwgZmV0Y2hKc29uLCBvcGVuUGFnZX0gZnJvbSBcIi4vY29tbXMuanNcIjtcbmltcG9ydCB7bG9naW5Vc2VyLCBsb2dvdXRVc2VyLHJlZ2lzdGVyVXNlciB9IGZyb20gXCIuL3VzZXIuanNcIjtcbmltcG9ydCB7b3BlbkluaXRpYWxQYWdlfSBmcm9tIFwiLi9ob21lLmpzXCI7XG5pbXBvcnQge3JlbmRlckFsZXJ0TWVzc2FnZSwgY2xlYXJBbGVydE1lc3NhZ2V9IGZyb20gXCIuL3VpLmpzXCJcbmltcG9ydCB7cmVhZE1pbmVJZH0gZnJvbSAnLi9taW5lSURzLmpzJ1xuXG4vKiBQb3NzaWJsZSBwb2x5ZmlsbHMgd2UnbGwgd2FudDpcbiAqIC0gRmV0Y2hcbiAqIC0gUHJvbWlzZS5cbiAqIC0gVVJMIHNlYXJjaFBhcmFtcy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24oKSB7XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4obm9kZSkge1xuICAgIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5maXJzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBQYWdlOiBkYXNoYm9hcmRcbiAgICovXG5cbiAgZnVuY3Rpb24gb3BlbkluUHJvZ3Jlc3NNaW5lKG1pbmUpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIC8vIFRPRE9cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckluUHJvZ3Jlc3NNaW5lKG1pbmUpIHtcbiAgICB2YXIgY29udGFpbmVyTGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXG4gICAgdmFyIHN0YXR1c0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHN0YXR1c0Rpdi5jbGFzc05hbWUgPSBcInN0YXR1cyBjb25zdHJ1Y3Rpb25cIjtcbiAgICB2YXIgc3RhdHVzU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgc3RhdHVzU3ZnLmNsYXNzTmFtZSA9IFwiaWNvbiBpY29uLWJ1aWxkaW5nXCI7XG4gICAgdmFyIHN0YXR1c1VzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VzZScpO1xuICAgIHN0YXR1c1VzZVsneGxpbms6aHJlZiddID0gXCIjaWNvbi1idWlsZGluZ1wiO1xuICAgIHZhciBzdGF0dXNQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXG4gICAgc3RhdHVzUC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkluY29tcGxldGVcIikpO1xuICAgIHN0YXR1c1N2Zy5hcHBlbmRDaGlsZChzdGF0dXNVc2UpO1xuICAgIHN0YXR1c0Rpdi5hcHBlbmRDaGlsZChzdGF0dXNTdmcpO1xuICAgIHN0YXR1c0Rpdi5hcHBlbmRDaGlsZChzdGF0dXNQKTtcbiAgICBjb250YWluZXJMaS5hcHBlbmRDaGlsZChzdGF0dXNEaXYpO1xuXG4gICAgdmFyIG5hbWVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgbmFtZUEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbmFtZUEuaHJlZiA9IG1pbmUubWluZWxvY2F0aW9uO1xuXG4gICAgbmFtZUEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobWluZS5taW5lTmFtZS5jb25jYXQoXCIgd29yayBpbiBwcm9ncmVzc1wiKSkpO1xuICAgIG5hbWVEaXYuYXBwZW5kQ2hpbGQobmFtZUEpO1xuICAgIGNvbnRhaW5lckxpLmFwcGVuZENoaWxkKG5hbWVEaXYpO1xuXG4gICAgdmFyIGFjdGlvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhY3Rpb25zRGl2LmNsYXNzTmFtZSA9IFwiY29udGludWUtd2l6YXJkXCI7XG5cbiAgICB2YXIgYWN0aW9uc1VwcGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGFjdGlvbnNVcHBlckEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYWN0aW9uc1VwcGVyQS5vbmNsaWNrID0gb3BlbkluUHJvZ3Jlc3NNaW5lKG1pbmUpO1xuICAgIGFjdGlvbnNVcHBlckEuY2xhc3NOYW1lID0gXCJyZXN1bWVcIjtcbiAgICB2YXIgYWN0aW9uc1VwcGVyU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgYWN0aW9uc1VwcGVyU3ZnLmNsYXNzTmFtZSA9IFwiaWNvbiBpY29uLXJlc3VtZVwiO1xuICAgIHZhciBhY3Rpb25zVXBwZXJVc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1c2UnKTtcbiAgICBhY3Rpb25zVXBwZXJVc2VbJ3hsaW5rOmhyZWYnXSA9IFwiI2ljb24tcmVzdW1lXCI7XG5cbiAgICBhY3Rpb25zVXBwZXJTdmcuYXBwZW5kQ2hpbGQoYWN0aW9uc1VwcGVyVXNlKTtcbiAgICBhY3Rpb25zVXBwZXJBLmFwcGVuZENoaWxkKGFjdGlvbnNVcHBlclN2Zyk7XG4gICAgYWN0aW9uc1VwcGVyQS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkNvbnRpbnVlIHNldHVwXCIpKTtcbiAgICBhY3Rpb25zVXBwZXJEaXYuYXBwZW5kQ2hpbGQoYWN0aW9uc1VwcGVyQSk7XG4gICAgYWN0aW9uc0Rpdi5hcHBlbmRDaGlsZChhY3Rpb25zVXBwZXJEaXYpO1xuXG4gICAgdmFyIGFjdGlvbnNMb3dlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBhY3Rpb25zTG93ZXJBID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGFjdGlvbnNMb3dlckEuaHJlZiA9IFwiI1wiO1xuICAgIGFjdGlvbnNMb3dlckEuY2xhc3NOYW1lID0gXCJkaXNjYXJkXCI7XG4gICAgdmFyIGFjdGlvbnNMb3dlclN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgIGFjdGlvbnNMb3dlclN2Zy5jbGFzc05hbWUgPSBcImljb24gaWNvbi1jYW5jZWxcIjtcbiAgICB2YXIgYWN0aW9uc0xvd2VyVXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndXNlJyk7XG4gICAgYWN0aW9uc0xvd2VyVXNlWyd4bGluazpocmVmJ10gPSBcIiNpY29uLWNhbmNlbFwiO1xuXG4gICAgYWN0aW9uc0xvd2VyU3ZnLmFwcGVuZENoaWxkKGFjdGlvbnNMb3dlclVzZSk7XG4gICAgYWN0aW9uc0xvd2VyQS5hcHBlbmRDaGlsZChhY3Rpb25zTG93ZXJTdmcpO1xuICAgIGFjdGlvbnNMb3dlckEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJEaXNjYXJkXCIpKTtcbiAgICBhY3Rpb25zTG93ZXJEaXYuYXBwZW5kQ2hpbGQoYWN0aW9uc0xvd2VyQSk7XG4gICAgYWN0aW9uc0Rpdi5hcHBlbmRDaGlsZChhY3Rpb25zTG93ZXJEaXYpO1xuXG4gICAgY29udGFpbmVyTGkuYXBwZW5kQ2hpbGQoYWN0aW9uc0Rpdik7XG5cbiAgICB2YXIgY29tcGxldGVCeURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbXBsZXRlQnlEaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobWluZS5ldGFEYXRlKSk7XG5cbiAgICBjb250YWluZXJMaS5hcHBlbmRDaGlsZChjb21wbGV0ZUJ5RGl2KTtcblxuICAgIHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbi1wcm9ncmVzcy1taW5lc1wiKTtcbiAgICBub2RlLmFwcGVuZENoaWxkKGNvbnRhaW5lckxpKTtcbiAgfVxuICAvLyBXaHkgaXMgdGhlIGFib3ZlIHdyaXR0ZW4gd2l0aCBhcHBlbmRDaGlsZCBhbmQgdGhlIGJlbG93IHdpdGggaW5uZXJIVE1MP1xuICAvLyBGb3IgdGhlIGpveSBvZiBjb21wYXJpc29uIG9mIGNvdXJzZSFcbiAgZnVuY3Rpb24gcmVuZGVyUnVubmluZ01pbmUobWluZSkge1xuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9XG4gICAgICAnPGRpdiBjbGFzcz1cInN0YXR1cyBhY3RpdmVcIj4nICtcbiAgICAgICAgJzxzdmcgY2xhc3M9XCJpY29uIGljb24tY2hlY2ttYXJrXCI+JyArXG4gICAgICAgICAgJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWNoZWNrbWFya1wiPjwvdXNlPicgK1xuICAgICAgICAnPC9zdmc+JyArXG4gICAgICAgICc8cD5BY3RpdmU8L3A+JyArXG4gICAgICAnPC9kaXY+JyArXG4gICAgICAnPGRpdj48YSBocmVmPVwiJyArIG1pbmUubWluZWxvY2F0aW9uICsgJ1wiPicgKyBtaW5lLm1pbmVOYW1lICsgJzwvYT48L2Rpdj4nICtcbiAgICAgICc8ZGl2IGNsYXNzPVwibWluZS1jb25maWdcIj4nICtcbiAgICAgICAgJzxhIGhyZWY9XCJjb25maWdcIj4nICtcbiAgICAgICAgICAnPHN2ZyBjbGFzcz1cImljb24gaWNvbi12aWV3XCI+JyArXG4gICAgICAgICAgICAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tdmlld1wiPjwvdXNlPicgK1xuICAgICAgICAgICc8L3N2Zz4nICtcbiAgICAgICAgICAnVmlldycgK1xuICAgICAgICAnPC9hPicgK1xuICAgICAgICAnPGEgaHJlZj1cIiNcIj4nICtcbiAgICAgICAgICAnPHN2ZyBjbGFzcz1cImljb24gaWNvbi1kb3dubG9hZFwiPicgK1xuICAgICAgICAgICAgJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWRvd25sb2FkXCI+PC91c2U+JyArXG4gICAgICAgICAgJzwvc3ZnPicgK1xuICAgICAgICAgICdFeHBvcnQnICtcbiAgICAgICAgJzwvYT4nICtcbiAgICAgICc8L2Rpdj4nICtcbiAgICAgICc8ZGl2IGNsYXNzPVwibWluZS10cm91Ymxlc2hvb3RpbmdcIj4nICtcbiAgICAgICAgJzxhIGhyZWY9XCIjXCI+IERlbGV0ZTwvYT4nICtcbiAgICAgICc8L2Rpdj4nO1xuXG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJ1bm5pbmctbWluZXNcIik7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyRGFzaGJvYXJkTWluZXMoKSB7XG4gICAgZmV0Y2hKc29uKFwiL21pbmUvYWxsXCIpXG4gICAgICAudGhlbihmdW5jdGlvbihsaXN0T2ZNaW5lcykge1xuICAgICAgICBsaXN0T2ZNaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKG1pbmUpIHtcbiAgICAgICAgICBpZiAobWluZS5taW5lU3RhdHVzID09PSBcImluIHByb2dyZXNzXCIpIHtcbiAgICAgICAgICAgIHJlbmRlckluUHJvZ3Jlc3NNaW5lKG1pbmUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAobWluZS5taW5lU3RhdHVzID09PSBcInJ1bm5pbmdcIikge1xuICAgICAgICAgICAgcmVuZGVyUnVubmluZ01pbmUobWluZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogUGFnZTogd2l6YXJkL3N1cHBsZW1lbnRhcnlEYXRhXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbmRlclN1cHBsZW1lbnRhcnlEYXRhKCkge1xuICAgIGZldGNoSnNvbihcIi9jb25maWd1cmF0b3Ivc3VwcGxlbWVudGFyeURhdGFTb3VyY2VzXCIpXG4gICAgICAudGhlbihmdW5jdGlvbihkYXRhU291cmNlcykge1xuICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VwcGxlbWVudGFyeURhdGFTb3VyY2VzXCIpO1xuXG4gICAgICAgIHJlbW92ZUNoaWxkcmVuKG5vZGUpO1xuXG4gICAgICAgIGRhdGFTb3VyY2VzLmZvckVhY2goZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cbiAgICAgICAgICBpbnB1dC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICAgIGlucHV0LnZhbHVlID0gc291cmNlLmlkO1xuICAgICAgICAgIGlucHV0Lm5hbWUgPSBcInN1cHBsZW1lbnRhcnlcIjtcbiAgICAgICAgICBpbnB1dC5jaGVja2VkID0gXCJjaGVja2VkXCJcblxuICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzb3VyY2UubGFiZWwpKTtcbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChsYWJlbCk7XG5cbiAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckRhdGFUb29scygpIHtcbiAgICBmZXRjaEpzb24oXCIvY29uZmlndXJhdG9yL2RhdGFUb29sc1wiKVxuICAgICAgLnRoZW4oZnVuY3Rpb24odG9vbHMpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGFUb29sc1wiKTtcblxuICAgICAgICByZW1vdmVDaGlsZHJlbihub2RlKTtcblxuICAgICAgICB0b29scy5mb3JFYWNoKGZ1bmN0aW9uKHRvb2wpIHtcbiAgICAgICAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cbiAgICAgICAgICB2YXIgaDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgICAgaDMuY2xhc3NOYW1lID0gXCJzdWJIZWFkZXJcIjtcbiAgICAgICAgICBoMy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0b29sLnRvb2xOYW1lKSk7XG5cbiAgICAgICAgICB2YXIgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgIHAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodG9vbC50b29sRGVzY3JpcHRpb24pKTtcblxuICAgICAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcblxuICAgICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICBpbnB1dC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICAgIGlucHV0LnZhbHVlID0gdG9vbC50b29sSWQ7XG4gICAgICAgICAgaW5wdXQubmFtZSA9IFwidG9vbFwiO1xuICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSBcImNoZWNrZWRcIjtcblxuICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkVuYWJsZWRcIikpO1xuXG4gICAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFwiaW1hZ2VQcmV2aWV3XCI7XG5cbiAgICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICBpbWcuc3JjID0gdG9vbC50b29sUHJldmlldztcblxuICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChpbWcpO1xuXG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaDMpO1xuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKHApO1xuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChkaXYpO1xuXG4gICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChsaSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0U3VwcGxlbWVudGFyaWVzKCkge1xuICAgIHJlbmRlclN1cHBsZW1lbnRhcnlEYXRhKCk7XG4gICAgcmVuZGVyRGF0YVRvb2xzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDaGVja2VkTmFtZXMobmFtZSkge1xuICAgIHZhciBjaGVja2VkID0gW107XG5cbiAgICB2YXIgY2hlY2tib3hlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKG5hbWUpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGVja2JveGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY2hlY2tib3hlc1tpXS5jaGVja2VkKSB7XG4gICAgICAgIGNoZWNrZWQucHVzaChjaGVja2JveGVzW2ldLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2hlY2tlZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhdmVTdXBwbGVtZW50YXJ5RGF0YVNvdXJjZXMoKSB7XG4gICAgdmFyIGNoZWNrZWQgPSBnZXRDaGVja2VkTmFtZXMoXCJzdXBwbGVtZW50YXJ5XCIpO1xuXG4gICAgcmV0dXJuIHBvc3REYXRhKHtcbiAgICAgIHBhdGg6IFwiL2NvbmZpZ3VyYXRvci9taW5lL3N1cHBsZW1lbnRhcnlEYXRhU291cmNlc1wiLFxuICAgICAgcGFyYW1zOiB7IG1pbmVJZDogcmVhZE1pbmVJZCgpIH1cbiAgICB9LCB7IHNvdXJjZXM6IGNoZWNrZWQgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzYXZlRGF0YVRvb2xzKCkge1xuICAgIHZhciBjaGVja2VkID0gZ2V0Q2hlY2tlZE5hbWVzKFwidG9vbFwiKTtcblxuICAgIHJldHVybiBwb3N0RGF0YSh7XG4gICAgICBwYXRoOiBcIi9jb25maWd1cmF0b3IvbWluZS9kYXRhVG9vbHNcIixcbiAgICAgIHBhcmFtczogeyBtaW5lSWQ6IHJlYWRNaW5lSWQoKSB9XG4gICAgfSwgeyB0b29sczogY2hlY2tlZCB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhdmVTdXBwbGVtZW50YXJpZXMoKSB7XG4gICAgUHJvbWlzZS5hbGwoW1xuICAgICAgc2F2ZVN1cHBsZW1lbnRhcnlEYXRhU291cmNlcygpLFxuICAgICAgc2F2ZURhdGFUb29scygpXG4gICAgXSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIG9wZW5QYWdlKFwiL3dpemFyZC9jb25maWdcIik7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBQYWdlOiB3aXphcmQvY29uZmlnXG4gICAqL1xuXG4gIHZhciBtaW5lQXZhaWxhYmlsaXR5VGltZXI7XG5cbiAgZnVuY3Rpb24gcmVuZGVyQ2hlY2tBdmFpbGFiaWxpdHkoZXZlbnQpIHtcbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KG1pbmVBdmFpbGFiaWxpdHlUaW1lcik7XG5cbiAgICBtaW5lQXZhaWxhYmlsaXR5VGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHBvc3REYXRhKFwiL21pbmUvbmFtZUF2YWlsYWJpbGl0eVwiLCB7IG1pbmVOYW1lOiBldmVudC50YXJnZXQudmFsdWUgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICB2YXIgaWNvbk5hbWUgPSBkYXRhLmlzQXZhaWxhYmxlID8gXCJjaGVja21hcmtcIiA6IFwiY3Jvc3NcIjtcbiAgICAgICAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFxuICAgICAgICAgICAgZGF0YS5pc0F2YWlsYWJsZVxuICAgICAgICAgICAgICA/IFwiVGhpcyBwcm9qZWN0IG5hbWUgaXMgZnJlZSFcIlxuICAgICAgICAgICAgICA6IFwiVGhpcyBwcm9qZWN0IG5hbWUgaXMgdGFrZW4uXCJcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZhbGlkYXRpb25cIik7XG5cbiAgICAgICAgICB2YXIgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN2Z1wiKTtcbiAgICAgICAgICBzdmcuY2xhc3NOYW1lID0gXCJpY29uIGljb24tXCIuY29uY2F0KGljb25OYW1lKTtcblxuICAgICAgICAgIHZhciB1c2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidXNlXCIpO1xuICAgICAgICAgIHVzZVsneGxpbms6aHJlZiddID0gXCIjaWNvbi1cIi5jb25jYXQoaWNvbk5hbWUpO1xuXG4gICAgICAgICAgc3ZnLmFwcGVuZENoaWxkKHVzZSk7XG5cbiAgICAgICAgICByZW1vdmVDaGlsZHJlbihub2RlKTtcblxuICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoc3ZnKTtcbiAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgICB9KTtcbiAgICB9LCA1MDApO1xuICB9XG5cbiAgZnVuY3Rpb24gc2F2ZURlc2NyaXB0b3JzKCkge1xuICAgIHZhciBtaW5lTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluZU5hbWVJbnB1dFwiKS52YWx1ZTtcblxuICAgIHZhciBwcml2YWN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICdpbnB1dFtuYW1lPVwicHVibGljUHJpdmF0ZVwiXTpjaGVja2VkJ1xuICAgICkudmFsdWU7XG5cbiAgICBwb3N0RGF0YSh7XG4gICAgICBwYXRoOiBcIi9jb25maWd1cmF0b3IvbWluZS9kZXNjcmlwdG9yc1wiLFxuICAgICAgcGFyYW1zOiB7IG1pbmVJZDogcmVhZE1pbmVJZCgpIH1cbiAgICB9LCB7IG1pbmVOYW1lOiBtaW5lTmFtZSwgcHJpdmFjeTogcHJpdmFjeSB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFRPRE8gaGFuZGxlIGNhc2Ugd2hlcmUgYG1pbmVOYW1lYCBpcyBhbHJlYWR5IHRha2VuXG4gICAgICAgIG9wZW5QYWdlKFwiL3dpemFyZC9maW5hbGlzZVwiKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogUGFnZTogd2l6YXJkL2ZpbmFsaXNlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbmRlckZpbmFsaXNlVXBsb2FkZWRGaWxlcyhmaWxlcykge1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGxvYWRlZEZpbGVzXCIpO1xuXG4gICAgcmVtb3ZlQ2hpbGRyZW4obm9kZSk7XG5cbiAgICBmaWxlcy5mb3JFYWNoKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZGl2LmNsYXNzTmFtZSA9IFwic3ViU3RlcENvbnRlbnRcIjtcbiAgICAgIHZhciBoNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcbiAgICAgIGg0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGZpbGUuZGF0YUZpbGUubmFtZSkpO1xuICAgICAgdmFyIHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgdmFyIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgIHNwYW4uY2xhc3NOYW1lID0gXCJ0aXRsZVwiO1xuICAgICAgc3Bhbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIk9yZ2FuaXNtOlwiKSk7XG5cbiAgICAgIGxpLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZmlsZS5kYXRhRmlsZS5vcmdhbmlzbS5uYW1lKSk7XG4gICAgICB1bC5hcHBlbmRDaGlsZChsaSk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoaDQpO1xuICAgICAgZGl2LmFwcGVuZENoaWxkKHVsKTtcblxuICAgICAgbm9kZS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyTGlzdChlbGVtSWQsIGl0ZW1zKSB7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSWQpO1xuXG4gICAgcmVtb3ZlQ2hpbGRyZW4obm9kZSk7XG5cbiAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICBhLmhyZWYgPSBpdGVtLnVybDtcbiAgICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbS50ZXh0KTtcblxuICAgICAgYS5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgIGxpLmFwcGVuZENoaWxkKGEpO1xuICAgICAgbm9kZS5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJGaW5hbGlzZVN1cHBsZW1lbnRhcmllcyhzb3VyY2VzLCB0b29scykge1xuICAgIHJlbmRlckxpc3QoXCJzdXBwbGVtZW50YXJ5RGF0YVwiLCBzb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgIHJldHVybiB7IHRleHQ6IHNvdXJjZS5sYWJlbCwgdXJsOiBzb3VyY2UudXJsIH07XG4gICAgfSkpO1xuXG4gICAgcmVuZGVyTGlzdChcImRhdGFUb29sc1wiLCB0b29scy5tYXAoZnVuY3Rpb24odG9vbCkge1xuICAgICAgcmV0dXJuIHsgdGV4dDogdG9vbC50b29sTmFtZSwgdXJsOiB0b29sLnRvb2xQcmV2aWV3IH07XG4gICAgfSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyRmluYWxpc2VEZXNjcmlwdG9yKGRlc2NyaXB0b3IpIHtcbiAgICB2YXIgdXJsRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluZU5hbWVcIik7XG4gICAgcmVtb3ZlQ2hpbGRyZW4odXJsRWxlbSk7XG4gICAgdXJsRWxlbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkZXNjcmlwdG9yLm1pbmVOYW1lKSk7XG5cbiAgICB2YXIgcHJpdmFjeUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaXZhY3lcIik7XG4gICAgcmVtb3ZlQ2hpbGRyZW4ocHJpdmFjeUVsZW0pO1xuICAgIHByaXZhY3lFbGVtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRlc2NyaXB0b3IucHJpdmFjeSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdEZpbmFsaXNlKCkge1xuICAgIGZldGNoSnNvbih7XG4gICAgICBwYXRoOiBcIi9jb25maWd1cmF0b3IvbWluZS91c2VyLWNvbmZpZ1wiLFxuICAgICAgcGFyYW1zOiB7IG1pbmVJZDogcmVhZE1pbmVJZCgpIH1cbiAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICByZW5kZXJGaW5hbGlzZVVwbG9hZGVkRmlsZXMoZGF0YS5kYXRhRmlsZXMpO1xuICAgICAgICByZW5kZXJGaW5hbGlzZVN1cHBsZW1lbnRhcmllcyhkYXRhLnN1cHBsZW1lbnRhcnlEYXRhU291cmNlcywgZGF0YS5kYXRhVG9vbHMpO1xuICAgICAgICByZW5kZXJGaW5hbGlzZURlc2NyaXB0b3IoZGF0YS5taW5lRGVzY3JpcHRvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIEV4cG9ydHNcbiAgICovXG5cbiAgcmV0dXJuIHtcbiAgICBvcGVuSW5pdGlhbFBhZ2U6IG9wZW5Jbml0aWFsUGFnZSxcbiAgICByZWdpc3RlclVzZXI6IHJlZ2lzdGVyVXNlcixcbiAgICBsb2dpblVzZXI6IGxvZ2luVXNlcixcbiAgICBsb2dvdXRVc2VyOiBsb2dvdXRVc2VyLFxuICAgIHJlbmRlckRhc2hib2FyZE1pbmVzOiByZW5kZXJEYXNoYm9hcmRNaW5lcyxcbiAgICBpbml0U3VwcGxlbWVudGFyaWVzOiBpbml0U3VwcGxlbWVudGFyaWVzLFxuICAgIHNhdmVTdXBwbGVtZW50YXJpZXM6IHNhdmVTdXBwbGVtZW50YXJpZXMsXG4gICAgcmVuZGVyQ2hlY2tBdmFpbGFiaWxpdHk6IHJlbmRlckNoZWNrQXZhaWxhYmlsaXR5LFxuICAgIHNhdmVEZXNjcmlwdG9yczogc2F2ZURlc2NyaXB0b3JzLFxuICAgIGluaXRGaW5hbGlzZTogaW5pdEZpbmFsaXNlLFxuICAgIHJlbmRlckFsZXJ0TWVzc2FnZTogcmVuZGVyQWxlcnRNZXNzYWdlLFxuICAgIGNsZWFyQWxlcnRNZXNzYWdlOiBjbGVhckFsZXJ0TWVzc2FnZSxcbiAgfTtcbn0pKCk7XG4iLCIvLyB2YXIgZW5kcG9pbnQgPSBcImh0dHBzOi8vd2l6YXJkLmludGVybWluZS5vcmcvdjFcIjtcbnZhciBlbmRwb2ludCA9IFwiaHR0cDovLzEyNy4wLjAuMTo5OTkxL2FwaS92MVwiO1xuXG4vLyBTaW5jZSBvdXIgc2VydmVyIChub3QgdGhlIEFQSSkgZG9lc24ndCBrbm93IHdoZXRoZXIgdGhlIHVzZXIgaXNcbi8vIGF1dGhlbnRpY2F0ZWQsIGNoZWNraW5nIGZvciB0aGlzIGFuZCBzZW5kaW5nIHRoZW0gdG8gdGhlIGAvcmVnaXN0ZXJgIHBhZ2Vcbi8vIGlzIGEgY29tbW9uIHBhdHRlcm4uIFdlIGNvZGlmeSB0aGlzIGhlcmUsIHNvIHRoYXQgd2UgY2FuIHVzZSBpdCBpbiBvdXJcbi8vIGdlbmVyaWMgcmVxdWVzdCBmdW5jdGlvbnMgYmVsb3cuXG5mdW5jdGlvbiBoYW5kbGVFcnJvclJlc3BvbnNlKHJlcykge1xuICBpZiAocmVzLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgLy8gVGhlIHVzZXIgaXNuJ3QgYXV0aG9yaXplZCwgc28gbWFrZSB0aGVtIHNpZ24gaW4uXG4gICAgb3BlblBhZ2UoXCIvcmVnaXN0ZXJcIik7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihcIllvdSBhcmUgbm90IGF1dGhvcml6ZWQuXCIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXM7XG4gIH1cbn1cblxuLy8gQXJndW1lbnQgY2FuIGJlIGVpdGhlciBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHBhdGggb3IgYW4gb2JqZWN0IHdpdGhcbi8vIGBwYXRoYCBhbmQgYHBhcmFtc2Aga2V5cywgd2hlcmUgcGFyYW1zIGlzIGFuIG9iamVjdCBvZiBzdHJpbmcgZW50cmllcy5cbmZ1bmN0aW9uIHNlcnZpY2UoYXJnKSB7XG4gIGlmICh0eXBlb2YgYXJnID09PSAnb2JqZWN0Jykge1xuICAgIC8vIFdoZW4gd2UgYWRkIHF1ZXJ5IHBhcmFtcywgb3VyIGJhY2tlbmQgd2lsbCBjb21wbGFpbiBpZiB3ZSBkb24ndCBoYXZlIGFcbiAgICAvLyB0cmFpbGluZyBzbGFzaC5cbiAgICB2YXIgcGF0aCA9IGFyZy5wYXRoLnNsaWNlKC0xKSA9PT0gJy8nID8gYXJnLnBhdGggOiBhcmcucGF0aC5jb25jYXQoJy8nKTtcblxuICAgIHZhciB1cmwgPSBuZXcgVVJMKGVuZHBvaW50LmNvbmNhdChwYXRoKSk7XG5cbiAgICBpZiAoJ3BhcmFtcycgaW4gYXJnKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYXJnLnBhcmFtcykge1xuICAgICAgICBpZiAoYXJnLnBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIHZhbCA9IGFyZy5wYXJhbXNba2V5XTtcbiAgICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdXJsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbmRwb2ludC5jb25jYXQoYXJnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmZXRjaEpzb24ocGF0aCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZmV0Y2goc2VydmljZShwYXRoKSwge1xuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChoYW5kbGVFcnJvclJlc3BvbnNlKHJlcykpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwb3N0RGF0YShwYXRoLCBkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmZXRjaChzZXJ2aWNlKHBhdGgpLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KGhhbmRsZUVycm9yUmVzcG9uc2UocmVzKSk7XG4gICAgICB9XG4gICAgfSlcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9wZW5QYWdlKHBhdGgpIHtcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBwYXRoO1xufVxuXG5cbiAgLy8gV3JhcHBpbmcgb3VyIGNhbGxzIHRvIGBzZXNzaW9uU3RvcmFnZWAgY2FuIGJlIHVzZWZ1bCBpbiBjYXNlIHdlIGV2ZXJcbiAgLy8gZGVjaWRlIHRvIHVzZSBhIGRpZmZlcmVudCBmb3JtIG9mIHN0b3JhZ2UsIG9yIGFkZCBzaWRlLWVmZmVjdHMuXG4gIGZ1bmN0aW9uIHNhdmVTdG9yYWdlKGtleSwgdmFsKSB7XG4gICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9hZFN0b3JhZ2Uoa2V5KSB7XG4gICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxuXG5cbmV4cG9ydCB7XG4gIHBvc3REYXRhLCBmZXRjaEpzb24sIHNlcnZpY2UsIG9wZW5QYWdlLCBzYXZlU3RvcmFnZSwgbG9hZFN0b3JhZ2Vcbn1cbiIsImltcG9ydCB7ZmV0Y2hKc29uLCBvcGVuUGFnZX0gZnJvbSBcIi4vY29tbXMuanNcIjtcbmltcG9ydCB7Y3JlYXRlTWluZUlkfSBmcm9tIFwiLi9taW5lSURzLmpzXCI7XG5cbi8qXG4gKiBQYWdlOiBob21lXG4gKi9cblxuZnVuY3Rpb24gb3BlbkluaXRpYWxQYWdlKGV2ZW50KSB7XG4gIGlmIChldmVudCkgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICBmZXRjaEpzb24oXCIvbWluZS9hbGxcIilcbiAgICAudGhlbihmdW5jdGlvbihsaXN0T2ZNaW5lcykge1xuICAgICAgaWYgKGxpc3RPZk1pbmVzLmxlbmd0aCkge1xuICAgICAgICAvLyBXZSBoYXZlIG1pbmVzOyBkaXNwbGF5IHRoZW0gaW4gdGhlIGRhc2hib2FyZCBwYWdlIVxuICAgICAgICBvcGVuUGFnZShcIi9kYXNoYm9hcmRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBkb24ndCBoYXZlIG1pbmVzOyBnZXQgc3RhcnRlZCB3aXRoIHRoZSB3aXphcmQhXG4gICAgICAgIGNyZWF0ZU1pbmVJZCgpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBvcGVuUGFnZShcIi93aXphcmQvdXBsb2FkXCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQge29wZW5Jbml0aWFsUGFnZX07XG4iLCJpbXBvcnQgeyBmZXRjaEpzb24sIHNhdmVTdG9yYWdlLCBsb2FkU3RvcmFnZX0gZnJvbSBcIi4vY29tbXMuanNcIjtcblxuICBmdW5jdGlvbiBjcmVhdGVNaW5lSWQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgIGZldGNoSnNvbihcIi9jb25maWd1cmF0b3IvbWluZS91c2VyLWNvbmZpZy9uZXcvXCIpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKG1pbmVJZCkge1xuICAgICAgICAgIHNhdmVTdG9yYWdlKFwibWluZUlkXCIsIG1pbmVJZCk7XG4gICAgICAgICAgcmVzb2x2ZShtaW5lSWQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRNaW5lSWQoKSB7XG4gICAgcmV0dXJuIGxvYWRTdG9yYWdlKFwibWluZUlkXCIpO1xuICB9XG5cbiAgZXhwb3J0IHtjcmVhdGVNaW5lSWQscmVhZE1pbmVJZH1cbiIsImNvbnN0IGFsZXJ0Ym94Q2xhc3NlcyA9IFtcInNob3dcIiwgXCJlcnJvclwiLCBcInN1Y2Nlc3NcIiwgXCJpbmZvXCIsIFwid2FybmluZ1wiXTtcblxuLyogXG4qIGhhbmRsZXI6IEl0IGlzIHVzZWQgdG8gcG9pbnQgdGhlIHRpbWVyIGZ1bmN0aW9uIHNldFRpbWVvdXRcbiogVXNlOiBJdCBpcyB1c2VkIHRvIGNsZWFyIGFueSBhY3RpdmUgcHJldmlvdXMgdGltZXIgZnVuY3Rpb24uXG4qIEltcG9ydGFuY2U6IFRoZSBhbGVydCBib3hlcyBhcmUgY2FuY2VsbGFibGUgYW5kIGl0IGlzIHBvc3NpYmxlIFxuKiB0aGF0IGl0IGlzIGNhbmNlbGxlZCBiZWZvcmUgdGhlIHRpbWUgaW50ZXJ2YWwgb2YgdGhlIHRpbWVyIGZ1bmN0aW9uLlxuKiBTbyB0byBjbGVhciB0aGUgdGltZXIgaGFuZGxlciBpcyBwYXNzZWQgdG8gY2xlYXJUaW1lb3V0IHRvIGNsZWFyIFxuKiB0aW1lci4gSXQgaGVscHMgdG8gaGFuZGxlIHRoZSB1bmV4cGVjdGVkIGJlaGF2aW91ciB3aGljaCBtYXkgYXJpc2UgXG4qIHdoZW4gbmV3IGFsZXJ0IGJveCBpcyByZW5kZXJpbmcuXG4qL1xubGV0IGhhbmRsZXIgPSB1bmRlZmluZWQ7XG5cbi8qXG4qIFZhbGlkIHZhcmlhbnRzIGFyZTogZXJyb3IsIHN1Y2Nlc3MsIGluZm8sIGFuZCB3YXJuaW5nXG4qL1xuZnVuY3Rpb24gcmVuZGVyQWxlcnRNZXNzYWdlKG1zZywgdmFyaWFudCwgdGltZSkge1xuXG4gIGlmKGhhbmRsZXIgIT09IHVuZGVmaW5lZCkgY2xlYXJBbGVydE1lc3NhZ2UoaGFuZGxlcik7XG4gIGlmKG1zZyA9PT0gdW5kZWZpbmVkKSBtc2cgPSBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCI7XG4gIGlmKHZhcmlhbnQgPT09IHVuZGVmaW5lZCkgdmFyaWFudCA9IFwiZXJyb3JcIjtcbiAgaWYodGltZSA9PT0gdW5kZWZpbmVkKSB0aW1lID0gNDAwMDtcblxuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbGVydGJveFwiKTtcbiAgXG4gIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChhbGVydGJveENsYXNzZXNbMF0sIHZhcmlhbnQpO1xuICBoYW5kbGVyID0gc2V0VGltZW91dChjbGVhckFsZXJ0TWVzc2FnZSwgdGltZSk7XG4gIFxuICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgPHN2ZyBjbGFzcz1cImljb24gaWNvbi1sZyAke3ZhcmlhbnR9XCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tJHt2YXJpYW50fVwiPjwvdXNlPjwvc3ZnPlxuICA8ZGl2IGNsYXNzPVwiYWxlcnQtbXNnXCI+XG4gICR7bXNnfVxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImFsZXJ0LWNsb3NlXCIgb25jbGljaz1cIndpemFyZC5jbGVhckFsZXJ0TWVzc2FnZSgke2hhbmRsZXJ9KVwiPlxuICA8c3ZnIGNsYXNzPVwiaWNvblwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWNyb3NzXCI+PC91c2U+PC9zdmc+XG4gIDwvZGl2PlxuICBgXG4gIFxufVxuXG5mdW5jdGlvbiBjbGVhckFsZXJ0TWVzc2FnZShoKSB7XG4gIGlmKGggIT09IHVuZGVmaW5lZCkgY2xlYXJUaW1lb3V0KGgpO1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbGVydGJveFwiKTtcblxuICBhbGVydGJveENsYXNzZXMuZm9yRWFjaChmdW5jdGlvbihjKXtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYylcbiAgfSlcbiAgXG4gIC8qXG4gICogUmVzZXR0aW5nIGhhbmRsZXIuIEFmdGVyIHRoaXMgaGFuZGxlciBpcyBub3QgcG9pbnRpbmcgdG8gYW55XG4gICogdGltZXIgZnVuY3Rpb24uIFRoaXMgbWVhbnMgbm8gYWxlcnRib3ggaXMgYWN0aXZlLlxuICAqL1xuICBoYW5kbGVyID0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDaGlsZHJlbihub2RlKSB7XG4gIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVwbGFjZVRleHQoZWxlbUlkLCB0ZXh0KSB7XG4gIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKTtcbiAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gIHJlbW92ZUNoaWxkcmVuKGVsZW0pO1xuICBlbGVtLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbn1cblxuXG5leHBvcnQge1xuICBjbGVhckFsZXJ0TWVzc2FnZSxcbiAgcmVuZGVyQWxlcnRNZXNzYWdlLFxuICByZW1vdmVDaGlsZHJlbixcbiAgcmVwbGFjZVRleHRcbn1cbiIsImltcG9ydCB7ZmV0Y2hKc29uLHBvc3REYXRhLCBvcGVuUGFnZX0gZnJvbSBcIi4vY29tbXMuanNcIjtcbmltcG9ydCB7Y2xlYXJBbGVydE1lc3NhZ2UsIHJlbmRlckFsZXJ0TWVzc2FnZX0gZnJvbSBcIi4vdWkuanNcIjtcbmltcG9ydCB7b3BlbkluaXRpYWxQYWdlfSBmcm9tIFwiLi9ob21lLmpzXCI7XG5cblxuICAvKlxuICAgKiBQYWdlOiByZWdpc3RlclxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIHJlYWRGb3JtKG9iaikge1xuICAgIHZhciBpbnB1dHMgPSB7fTtcblxuICAgIE9iamVjdC5lbnRyaWVzKG9iai5pbnB1dHMpLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBrZXkgPSBlbnRyeVswXTtcbiAgICAgIHZhciB2YWwgPSBlbnRyeVsxXTtcbiAgICAgIGlucHV0c1trZXldID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmFsKS52YWx1ZTtcbiAgICB9KTtcblxuICAgIGNsZWFyQWxlcnRNZXNzYWdlKCk7XG5cbiAgICB2YXIgZXJyb3IgPSBvYmoudmFsaWRhdGlvbnMuc29tZShmdW5jdGlvbih0ZXN0RnVuKSB7XG4gICAgICB2YXIgcmVzID0gdGVzdEZ1bihpbnB1dHMpO1xuICAgICAgaWYgKHJlcykgcmVuZGVyQWxlcnRNZXNzYWdlKHJlcywgXCJ3YXJuaW5nXCIsIDUwMDApO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KTtcblxuICAgIGlmIChlcnJvcikgcmV0dXJuO1xuICAgIGVsc2UgcmV0dXJuIGlucHV0cztcbiAgfVxuXG4gIHZhciB2YWxpZGF0ZSA9IHtcbiAgICBwYXNzd29yZHNNYXRjaDogZnVuY3Rpb24oaW5wdXRzKSB7XG4gICAgICBpZiAoaW5wdXRzLnBhc3N3b3JkICE9PSBpbnB1dHMucGFzc3dvcmRDb25maXJtKSB7XG4gICAgICAgIHJldHVybiBcIlBhc3N3b3JkcyBkbyBub3QgbWF0Y2guXCI7XG4gICAgICB9XG4gICAgfSxcbiAgICBub3RFbXB0eTogZnVuY3Rpb24oaW5wdXRzKSB7XG4gICAgICBpZiAoT2JqZWN0LnZhbHVlcyhpbnB1dHMpLnNvbWUoZnVuY3Rpb24oaW5wKSB7IHJldHVybiAhaW5wOyB9KSkge1xuICAgICAgICByZXR1cm4gXCJQbGVhc2UgZmlsbCBpbiBhbGwgdGhlIGZpZWxkcy5cIjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJVc2VyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBpbnB1dERhdGEgPSByZWFkRm9ybSh7XG4gICAgICBpbnB1dHM6IHtcbiAgICAgICAgZW1haWw6IFwicmVnaXN0ZXItZW1haWxcIixcbiAgICAgICAgZmlyc3ROYW1lOiBcInJlZ2lzdGVyLWZpcnN0LW5hbWVcIixcbiAgICAgICAgbGFzdE5hbWU6IFwicmVnaXN0ZXItbGFzdC1uYW1lXCIsXG4gICAgICAgIG9yZ2FuaXNhdGlvbjogXCJyZWdpc3Rlci1vcmdhbmlzYXRpb25cIixcbiAgICAgICAgcGFzc3dvcmQ6IFwicmVnaXN0ZXItcGFzc3dvcmRcIixcbiAgICAgICAgcGFzc3dvcmRDb25maXJtOiBcInJlZ2lzdGVyLXBhc3N3b3JkLWNvbmZpcm1cIlxuICAgICAgfSxcbiAgICAgIHZhbGlkYXRpb25zOiBbXG4gICAgICAgIHZhbGlkYXRlLnBhc3N3b3Jkc01hdGNoLFxuICAgICAgICB2YWxpZGF0ZS5ub3RFbXB0eSxcbiAgICAgIF1cbiAgICB9KTtcblxuICAgIGlmIChpbnB1dERhdGEpIHtcbiAgICAgIHBvc3REYXRhKFwiL3VzZXIvcmVnaXN0ZXJcIiwgaW5wdXREYXRhKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZWdpc3RlclJlcykge1xuICAgICAgICAgIC8vIFJlbmRlciBhbGVydCBtZXNzYWdlIGZvciAxMHNlY29uZHMuXG4gICAgICAgICAgcmVuZGVyQWxlcnRNZXNzYWdlKFwiQWNjb3VudCBjcmVhdGVkIHN1Y2Nlc3NmdWxseVwiLCBcInN1Y2Nlc3NcIiwgMTAwMDApO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyUmVzKSB7XG4gICAgICAgICAgaWYgKGVyclJlcyBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVyclJlcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBhbnkgZXJyb3IgbWVzc2FnZXMgZnJvbSBiYWNrZW5kLlxuICAgICAgICAgICAgZXJyUmVzLmpzb24oKVxuICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW5kZXIgYWxlcnQgbWVzc2FnZSBmb3IgMTBzZWNvbmRzLlxuICAgICAgICAgICAgICAgIHJlbmRlckFsZXJ0TWVzc2FnZShyZXMubWVzc2FnZSwgXCJlcnJvclwiLCAxMDAwMCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9naW5Vc2VyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBpbnB1dERhdGEgPSByZWFkRm9ybSh7XG4gICAgICBpbnB1dHM6IHtcbiAgICAgICAgZW1haWw6IFwic2lnbmluLWVtYWlsXCIsXG4gICAgICAgIHBhc3N3b3JkOiBcInNpZ25pbi1wYXNzd29yZFwiXG4gICAgICB9LFxuICAgICAgYWxlcnRJZDogXCJzaWduaW5Gb3JtQWxlcnRcIixcbiAgICAgIHZhbGlkYXRpb25zOiBbXG4gICAgICAgIHZhbGlkYXRlLm5vdEVtcHR5LFxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgaWYgKGlucHV0RGF0YSkge1xuICAgICAgcG9zdERhdGEoXCIvdXNlci9sb2dpblwiLCBpbnB1dERhdGEpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG9wZW5Jbml0aWFsUGFnZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAvLyBXcm9uZyBjcmVkZW50aWFsc1xuICAgICAgICAgIGlmKGVyci5zdGF0dXMgPT0gNDAwKXtcbiAgICAgICAgICAgIHJlbmRlckFsZXJ0TWVzc2FnZShcIldyb25nIGNyZWRlbnRpYWxzXCIsIFwiZXJyb3JcIiwgNTAwMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgcmVuZGVyQWxlcnRNZXNzYWdlKCk7IC8vIFJlbmRlciBkZWZhdWx0IGFsZXJ0Ym94XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG5cbmZ1bmN0aW9uIGxvZ291dFVzZXIoKSB7XG4gIHZhciBwYXRoID0gXCIvdXNlci9sb2dvdXRcIjtcbiAgZmV0Y2hKc29uKHBhdGgpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgaWYocmVzcG9uc2UubWVzc2FnZSkge1xuICAgICAgb3BlblBhZ2UoXCIvcmVnaXN0ZXJcIik7XG4gICAgICAvLyB0b2RvIC0gYWxzbyBwb3N0IHN0YXR1c2UgbWVzc2FnZSBzYXlpbmcgdGhlcmUgaGFzIGJlZW4gYSBzdWNjZXNzZnVsXG4gICAgICAvLyBsb2dvdXQuIEFkZCBzb2VtdGhpbmcgdG8gdGhlIG9wZW5wYWdlIG1ldGhvZCB0byBwcmludCB0byB0aGUgaGVhZGVyXG4gICAgICAvLyBhbGVydGJveFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZW5kZXJpbmcgbWVzc2FnZSBmb3IgNXNlY29uZHMuXG4gICAgICByZW5kZXJBbGVydE1lc3NhZ2UoXCJVaG9oLCBwcm9ibGVtIGxvZ2dpbmcgb3V0IVwiLCBcIndhcm5pbmdcIiwgNTAwMCk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5leHBvcnQge2xvZ2luVXNlciwgbG9nb3V0VXNlciwgcmVnaXN0ZXJVc2VyfVxuIl0sInNvdXJjZVJvb3QiOiIifQ==