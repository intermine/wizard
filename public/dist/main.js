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
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ "./public/js/ui.js");





/* Possible polyfills we'll want:
 * - Fetch
 * - Promise.
 * - URL searchParams.
 */

/* harmony default export */ __webpack_exports__["default"] = ((function() {

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

  // Since our server (not the API) doesn't know whether the user is
  // authenticated, checking for this and sending them to the `/register` page
  // is a common pattern. We codify this here, so that we can use it in our
  // generic request functions below.
  function handleErrorResponse(res) {
    if (res.status === 401) {
      // The user isn't authorized, so make them sign in.
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["openPage"])("/register");
      return new Error("You are not authorized.");
    } else {
      return res;
    }
  }

  function fetchJson(path) {
    return new Promise(function(resolve, reject) {
      fetch(Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["service"])(path), {
        credentials: 'include'
      })
        .then(function(res) {
          if (res.ok) {
            return res.json();
          } else {
            reject(handleErrorResponse(res));
          }
        })
        .then(function(data) {
          resolve(data);
        });
    });
  }

  function postData(path, data) {
    return new Promise(function(resolve, reject) {
      fetch(Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["service"])(path), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: 'include'
      }).then(function(res) {
        if (res.ok) {
          resolve(res);
        } else {
          reject(handleErrorResponse(res));
        }
      })
    });
  }


  /*
   * Page: dashboard
   */

  function openInProgressMine(mine) {
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
  }
  // Why is the above written with appendChild and the below with innerHTML?
  // For the joy of comparison of course!
  function renderRunningMine(mine) {
    var container = document.createElement('li');

    container.innerHTML =
      '<div class="status active">' +
        '<svg class="icon icon-checkmark">' +
          '<use xlink:href="#icon-checkmark"></use>' +
        '</svg>' +
        '<p>Active</p>' +
      '</div>' +
      '<div><a href="' + mine.minelocation + '">' + mine.mineName + '</a></div>' +
      '<div class="mine-config">' +
        '<a href="config">' +
          '<svg class="icon icon-view">' +
            '<use xlink:href="#icon-view"></use>' +
          '</svg>' +
          'View' +
        '</a>' +
        '<a href="#">' +
          '<svg class="icon icon-download">' +
            '<use xlink:href="#icon-download"></use>' +
          '</svg>' +
          'Export' +
        '</a>' +
      '</div>' +
      '<div class="mine-troubleshooting">' +
        '<a href="#"> Delete</a>' +
      '</div>';

    var node = document.getElementById("running-mines");
    node.appendChild(container);
  }

  function renderDashboardMines() {
    fetchJson("/mine/all")
      .then(function(listOfMines) {
        listOfMines.forEach(function(mine) {
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
    fetchJson("/configurator/supplementaryDataSources")
      .then(function(dataSources) {
        var node = document.getElementById("supplementaryDataSources");

        removeChildren(node);

        dataSources.forEach(function(source) {
          var li = document.createElement("li");
          var label = document.createElement("label");
          var input = document.createElement("input");

          input.type = "checkbox";
          input.value = source.id;
          input.name = "supplementary";
          input.checked = "checked"

          label.appendChild(input);
          label.appendChild(document.createTextNode(source.label));
          li.appendChild(label);

          node.appendChild(li);
        });
      });
  }

  function renderDataTools() {
    fetchJson("/configurator/dataTools")
      .then(function(tools) {
        var node = document.getElementById("dataTools");

        removeChildren(node);

        tools.forEach(function(tool) {
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

    return postData({
      path: "/configurator/mine/supplementaryDataSources",
      params: { mineId: readMineId() }
    }, { sources: checked });
  }

  function saveDataTools() {
    var checked = getCheckedNames("tool");

    return postData({
      path: "/configurator/mine/dataTools",
      params: { mineId: readMineId() }
    }, { tools: checked });
  }

  function saveSupplementaries() {
    Promise.all([
      saveSupplementaryDataSources(),
      saveDataTools()
    ]).then(function() {
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["openPage"])("/wizard/config");
    });
  }

  /*
   * Page: wizard/config
   */

  var mineAvailabilityTimer;

  function renderCheckAvailability(event) {
    window.clearTimeout(mineAvailabilityTimer);

    mineAvailabilityTimer = window.setTimeout(function() {
      postData("/mine/nameAvailability", { mineName: event.target.value })
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {
          var iconName = data.isAvailable ? "checkmark" : "cross";
          var text = document.createTextNode(
            data.isAvailable
              ? "This project name is free!"
              : "This project name is taken."
          );

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

    var privacy = document.querySelector(
      'input[name="publicPrivate"]:checked'
    ).value;

    postData({
      path: "/configurator/mine/descriptors",
      params: { mineId: readMineId() }
    }, { mineName: mineName, privacy: privacy })
      .then(function(res) {
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

    files.forEach(function(file) {
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

    items.forEach(function(item) {
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
    renderList("supplementaryData", sources.map(function(source) {
      return { text: source.label, url: source.url };
    }));

    renderList("dataTools", tools.map(function(tool) {
      return { text: tool.toolName, url: tool.toolPreview };
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
    fetchJson({
      path: "/configurator/mine/user-config",
      params: { mineId: readMineId() }
    })
      .then(function(data) {
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
    renderAlertMessage: _ui__WEBPACK_IMPORTED_MODULE_3__["renderAlertMessage"],
    clearAlertMessage: _ui__WEBPACK_IMPORTED_MODULE_3__["clearAlertMessage"],
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
// var endpoint = "https://wizard.intermine.org/v1";
var endpoint = "http://127.0.0.1:9991/api/v1";

// Since our server (not the API) doesn't know whether the user is
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
}

// Argument can be either a string representing the path or an object with
// `path` and `params` keys, where params is an object of string entries.
function service(arg) {
  if (typeof arg === 'object') {
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
  return new Promise(function(resolve, reject) {
    fetch(service(path), {
      credentials: 'include'
    })
      .then(function(res) {
        if (res.ok) {
          return res.json();
        } else {
          reject(handleErrorResponse(res));
        }
      })
      .then(function(data) {
        resolve(data);
      });
  });
}

function postData(path, data) {
  return new Promise(function(resolve, reject) {
    fetch(service(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: 'include'
    }).then(function(res) {
      if (res.ok) {
        resolve(res);
      } else {
        reject(handleErrorResponse(res));
      }
    })
  });
}

function openPage(path) {
  window.location.href = path;
}


  // Wrapping our calls to `sessionStorage` can be useful in case we ever
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

  Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])("/mine/all")
    .then(function(listOfMines) {
      if (listOfMines.length) {
        // We have mines; display them in the dashboard page!
        Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["openPage"])("/dashboard");
      } else {
        // We don't have mines; get started with the wizard!
        Object(_mineIDs_js__WEBPACK_IMPORTED_MODULE_1__["createMineId"])()
          .then(function() {
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
    return new Promise(function(resolve, reject) {
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])("/configurator/mine/user-config/new/")
        .then(function(mineId) {
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
var handler = undefined;
function renderAlertMessage(msg, variant, time) {

  if(handler !== undefined) clearAlertMessage(handler);
  if(msg === undefined) msg = "Something went wrong";
  if(variant === undefined) variant = "error";
  if(time === undefined) time = 4000;

  const element = document.getElementById("alertbox");
  
  element.classList.add("show", variant);
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
  element.classList.remove("show", "error", "success", "info", "warning");
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

    Object.entries(obj.inputs).forEach(function(entry) {
      var key = entry[0];
      var val = entry[1];
      inputs[key] = document.getElementById(val).value;
    });

    Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__["clearAlertMessage"])(obj.alertId);

    var error = obj.validations.some(function(testFun) {
      var res = testFun(inputs);
      if (res) Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__["renderAlertMessage"])(obj.alertId, res);
      return res;
    });

    if (error) return;
    else return inputs;
  }

  var validate = {
    passwordsMatch: function(inputs) {
      if (inputs.password !== inputs.passwordConfirm) {
        return "Passwords do not match.";
      }
    },
    notEmpty: function(inputs) {
      if (Object.values(inputs).some(function(inp) { return !inp; })) {
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
      alertId: "registerFormAlert",
      validations: [
        validate.passwordsMatch,
        validate.notEmpty,
      ]
    });

    if (inputData) {
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])("/user/register", inputData)
        .then(function(registerRes) {
          Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__["renderAlertMessage"])("alertbox", "Account created successfully.");
        })
        .catch(function(errRes) {
          if (errRes instanceof Error) {
            console.error(errRes);
          } else {
            // Handle any error messages from backend.
            errRes.json()
              .then(function(res) {
                Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__["renderAlertMessage"])("registerFormAlert", res.message);
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
      validations: [
        validate.notEmpty,
      ]
    });

    if (inputData) {
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])("/user/login", inputData)
        .then(function(loginRes) {
          Object(_home_js__WEBPACK_IMPORTED_MODULE_2__["openInitialPage"])();
        });
      // TODO handle invalid login (I don't think the backend currently gives
      // us a legibile response when this happens, just 400 Bad Request)
    }

    return false;
  }


function logoutUser() {
  var path = "/user/logout";
  Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])(path).then(function(response) {
    console.log(response);
    if(response.message) {
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["openPage"])("/register");
      // todo - also post statuse message saying there has been a successful
      // logout. Add soemthing to the openpage method to print to the header
      // alertbox
    } else {
      Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__["renderAlertMessage"])("alertbox", "Uhoh, problem logging out!");
    }
  });
}





/***/ })

/******/ })["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aXphcmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL2NsaWVudC5qcyIsIndlYnBhY2s6Ly93aXphcmQvLi9wdWJsaWMvanMvY29tbXMuanMiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL2hvbWUuanMiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL21pbmVJRHMuanMiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL3VpLmpzIiwid2VicGFjazovL3dpemFyZC8uL3B1YmxpYy9qcy91c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBa0U7QUFDSjtBQUNwQjtBQUNnQjs7QUFFMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sMERBQVE7QUFDZDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVkseURBQU87QUFDbkI7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLFlBQVkseURBQU87QUFDbkI7QUFDQSxrQkFBa0IscUNBQXFDO0FBQ3ZEO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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UUM7Ozs7Ozs7Ozs7Ozs7QUNsREQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBaUU7QUFDSDtBQUNwQjs7O0FBRzFDO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsSUFBSSxnRUFBaUI7O0FBRXJCO0FBQ0E7QUFDQSxlQUFlLGlFQUFrQjtBQUNqQztBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxvREFBb0QsYUFBYSxFQUFFO0FBQ25FO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLE1BQU0sMERBQVE7QUFDZDtBQUNBLFVBQVUsaUVBQWtCO0FBQzVCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlFQUFrQjtBQUNsQyxlQUFlO0FBQ2Y7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLE1BQU0sMERBQVE7QUFDZDtBQUNBLFVBQVUsZ0VBQWU7QUFDekIsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsRUFBRSwyREFBUztBQUNYO0FBQ0E7QUFDQSxNQUFNLDBEQUFRO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLE1BQU0saUVBQWtCO0FBQ3hCO0FBQ0EsR0FBRztBQUNIOzs7QUFHNEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcHVibGljL2pzL2NsaWVudC5qc1wiKTtcbiIsImltcG9ydCB7cG9zdERhdGEsIGZldGNoSnNvbiwgc2VydmljZSwgb3BlblBhZ2V9IGZyb20gXCIuL2NvbW1zLmpzXCI7XG5pbXBvcnQge2xvZ2luVXNlciwgbG9nb3V0VXNlcixyZWdpc3RlclVzZXIgfSBmcm9tIFwiLi91c2VyLmpzXCI7XG5pbXBvcnQge29wZW5Jbml0aWFsUGFnZX0gZnJvbSBcIi4vaG9tZS5qc1wiO1xuaW1wb3J0IHtyZW5kZXJBbGVydE1lc3NhZ2UsIGNsZWFyQWxlcnRNZXNzYWdlfSBmcm9tIFwiLi91aVwiXG5cbi8qIFBvc3NpYmxlIHBvbHlmaWxscyB3ZSdsbCB3YW50OlxuICogLSBGZXRjaFxuICogLSBQcm9taXNlLlxuICogLSBVUkwgc2VhcmNoUGFyYW1zLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbigpIHtcblxuICBmdW5jdGlvbiByZW1vdmVDaGlsZHJlbihub2RlKSB7XG4gICAgd2hpbGUgKG5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2VUZXh0KGVsZW1JZCwgdGV4dCkge1xuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKTtcbiAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgIHJlbW92ZUNoaWxkcmVuKGVsZW0pO1xuICAgIGVsZW0uYXBwZW5kQ2hpbGQodGV4dCk7XG4gIH1cblxuICAvLyBTaW5jZSBvdXIgc2VydmVyIChub3QgdGhlIEFQSSkgZG9lc24ndCBrbm93IHdoZXRoZXIgdGhlIHVzZXIgaXNcbiAgLy8gYXV0aGVudGljYXRlZCwgY2hlY2tpbmcgZm9yIHRoaXMgYW5kIHNlbmRpbmcgdGhlbSB0byB0aGUgYC9yZWdpc3RlcmAgcGFnZVxuICAvLyBpcyBhIGNvbW1vbiBwYXR0ZXJuLiBXZSBjb2RpZnkgdGhpcyBoZXJlLCBzbyB0aGF0IHdlIGNhbiB1c2UgaXQgaW4gb3VyXG4gIC8vIGdlbmVyaWMgcmVxdWVzdCBmdW5jdGlvbnMgYmVsb3cuXG4gIGZ1bmN0aW9uIGhhbmRsZUVycm9yUmVzcG9uc2UocmVzKSB7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgLy8gVGhlIHVzZXIgaXNuJ3QgYXV0aG9yaXplZCwgc28gbWFrZSB0aGVtIHNpZ24gaW4uXG4gICAgICBvcGVuUGFnZShcIi9yZWdpc3RlclwiKTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJZb3UgYXJlIG5vdCBhdXRob3JpemVkLlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaEpzb24ocGF0aCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZldGNoKHNlcnZpY2UocGF0aCksIHtcbiAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChoYW5kbGVFcnJvclJlc3BvbnNlKHJlcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9zdERhdGEocGF0aCwgZGF0YSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZldGNoKHNlcnZpY2UocGF0aCksIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QoaGFuZGxlRXJyb3JSZXNwb25zZShyZXMpKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG5cbiAgLypcbiAgICogUGFnZTogZGFzaGJvYXJkXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9wZW5JblByb2dyZXNzTWluZShtaW5lKSB7XG4gICAgLy8gVE9ET1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVySW5Qcm9ncmVzc01pbmUobWluZSkge1xuICAgIHZhciBjb250YWluZXJMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICB2YXIgc3RhdHVzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc3RhdHVzRGl2LmNsYXNzTmFtZSA9IFwic3RhdHVzIGNvbnN0cnVjdGlvblwiO1xuICAgIHZhciBzdGF0dXNTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICBzdGF0dXNTdmcuY2xhc3NOYW1lID0gXCJpY29uIGljb24tYnVpbGRpbmdcIjtcbiAgICB2YXIgc3RhdHVzVXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndXNlJyk7XG4gICAgc3RhdHVzVXNlWyd4bGluazpocmVmJ10gPSBcIiNpY29uLWJ1aWxkaW5nXCI7XG4gICAgdmFyIHN0YXR1c1AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cbiAgICBzdGF0dXNQLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiSW5jb21wbGV0ZVwiKSk7XG4gICAgc3RhdHVzU3ZnLmFwcGVuZENoaWxkKHN0YXR1c1VzZSk7XG4gICAgc3RhdHVzRGl2LmFwcGVuZENoaWxkKHN0YXR1c1N2Zyk7XG4gICAgc3RhdHVzRGl2LmFwcGVuZENoaWxkKHN0YXR1c1ApO1xuICAgIGNvbnRhaW5lckxpLmFwcGVuZENoaWxkKHN0YXR1c0Rpdik7XG5cbiAgICB2YXIgbmFtZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBuYW1lQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBuYW1lQS5ocmVmID0gbWluZS5taW5lbG9jYXRpb247XG5cbiAgICBuYW1lQS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtaW5lLm1pbmVOYW1lLmNvbmNhdChcIiB3b3JrIGluIHByb2dyZXNzXCIpKSk7XG4gICAgbmFtZURpdi5hcHBlbmRDaGlsZChuYW1lQSk7XG4gICAgY29udGFpbmVyTGkuYXBwZW5kQ2hpbGQobmFtZURpdik7XG5cbiAgICB2YXIgYWN0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGFjdGlvbnNEaXYuY2xhc3NOYW1lID0gXCJjb250aW51ZS13aXphcmRcIjtcblxuICAgIHZhciBhY3Rpb25zVXBwZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgYWN0aW9uc1VwcGVyQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhY3Rpb25zVXBwZXJBLm9uY2xpY2sgPSBvcGVuSW5Qcm9ncmVzc01pbmUobWluZSk7XG4gICAgYWN0aW9uc1VwcGVyQS5jbGFzc05hbWUgPSBcInJlc3VtZVwiO1xuICAgIHZhciBhY3Rpb25zVXBwZXJTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICBhY3Rpb25zVXBwZXJTdmcuY2xhc3NOYW1lID0gXCJpY29uIGljb24tcmVzdW1lXCI7XG4gICAgdmFyIGFjdGlvbnNVcHBlclVzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VzZScpO1xuICAgIGFjdGlvbnNVcHBlclVzZVsneGxpbms6aHJlZiddID0gXCIjaWNvbi1yZXN1bWVcIjtcblxuICAgIGFjdGlvbnNVcHBlclN2Zy5hcHBlbmRDaGlsZChhY3Rpb25zVXBwZXJVc2UpO1xuICAgIGFjdGlvbnNVcHBlckEuYXBwZW5kQ2hpbGQoYWN0aW9uc1VwcGVyU3ZnKTtcbiAgICBhY3Rpb25zVXBwZXJBLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiQ29udGludWUgc2V0dXBcIikpO1xuICAgIGFjdGlvbnNVcHBlckRpdi5hcHBlbmRDaGlsZChhY3Rpb25zVXBwZXJBKTtcbiAgICBhY3Rpb25zRGl2LmFwcGVuZENoaWxkKGFjdGlvbnNVcHBlckRpdik7XG5cbiAgICB2YXIgYWN0aW9uc0xvd2VyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGFjdGlvbnNMb3dlckEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYWN0aW9uc0xvd2VyQS5ocmVmID0gXCIjXCI7XG4gICAgYWN0aW9uc0xvd2VyQS5jbGFzc05hbWUgPSBcImRpc2NhcmRcIjtcbiAgICB2YXIgYWN0aW9uc0xvd2VyU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgYWN0aW9uc0xvd2VyU3ZnLmNsYXNzTmFtZSA9IFwiaWNvbiBpY29uLWNhbmNlbFwiO1xuICAgIHZhciBhY3Rpb25zTG93ZXJVc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1c2UnKTtcbiAgICBhY3Rpb25zTG93ZXJVc2VbJ3hsaW5rOmhyZWYnXSA9IFwiI2ljb24tY2FuY2VsXCI7XG5cbiAgICBhY3Rpb25zTG93ZXJTdmcuYXBwZW5kQ2hpbGQoYWN0aW9uc0xvd2VyVXNlKTtcbiAgICBhY3Rpb25zTG93ZXJBLmFwcGVuZENoaWxkKGFjdGlvbnNMb3dlclN2Zyk7XG4gICAgYWN0aW9uc0xvd2VyQS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkRpc2NhcmRcIikpO1xuICAgIGFjdGlvbnNMb3dlckRpdi5hcHBlbmRDaGlsZChhY3Rpb25zTG93ZXJBKTtcbiAgICBhY3Rpb25zRGl2LmFwcGVuZENoaWxkKGFjdGlvbnNMb3dlckRpdik7XG5cbiAgICBjb250YWluZXJMaS5hcHBlbmRDaGlsZChhY3Rpb25zRGl2KTtcblxuICAgIHZhciBjb21wbGV0ZUJ5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tcGxldGVCeURpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtaW5lLmV0YURhdGUpKTtcblxuICAgIGNvbnRhaW5lckxpLmFwcGVuZENoaWxkKGNvbXBsZXRlQnlEaXYpO1xuXG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluLXByb2dyZXNzLW1pbmVzXCIpO1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY29udGFpbmVyTGkpO1xuICB9XG4gIC8vIFdoeSBpcyB0aGUgYWJvdmUgd3JpdHRlbiB3aXRoIGFwcGVuZENoaWxkIGFuZCB0aGUgYmVsb3cgd2l0aCBpbm5lckhUTUw/XG4gIC8vIEZvciB0aGUgam95IG9mIGNvbXBhcmlzb24gb2YgY291cnNlIVxuICBmdW5jdGlvbiByZW5kZXJSdW5uaW5nTWluZShtaW5lKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICBjb250YWluZXIuaW5uZXJIVE1MID1cbiAgICAgICc8ZGl2IGNsYXNzPVwic3RhdHVzIGFjdGl2ZVwiPicgK1xuICAgICAgICAnPHN2ZyBjbGFzcz1cImljb24gaWNvbi1jaGVja21hcmtcIj4nICtcbiAgICAgICAgICAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tY2hlY2ttYXJrXCI+PC91c2U+JyArXG4gICAgICAgICc8L3N2Zz4nICtcbiAgICAgICAgJzxwPkFjdGl2ZTwvcD4nICtcbiAgICAgICc8L2Rpdj4nICtcbiAgICAgICc8ZGl2PjxhIGhyZWY9XCInICsgbWluZS5taW5lbG9jYXRpb24gKyAnXCI+JyArIG1pbmUubWluZU5hbWUgKyAnPC9hPjwvZGl2PicgK1xuICAgICAgJzxkaXYgY2xhc3M9XCJtaW5lLWNvbmZpZ1wiPicgK1xuICAgICAgICAnPGEgaHJlZj1cImNvbmZpZ1wiPicgK1xuICAgICAgICAgICc8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLXZpZXdcIj4nICtcbiAgICAgICAgICAgICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi12aWV3XCI+PC91c2U+JyArXG4gICAgICAgICAgJzwvc3ZnPicgK1xuICAgICAgICAgICdWaWV3JyArXG4gICAgICAgICc8L2E+JyArXG4gICAgICAgICc8YSBocmVmPVwiI1wiPicgK1xuICAgICAgICAgICc8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWRvd25sb2FkXCI+JyArXG4gICAgICAgICAgICAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tZG93bmxvYWRcIj48L3VzZT4nICtcbiAgICAgICAgICAnPC9zdmc+JyArXG4gICAgICAgICAgJ0V4cG9ydCcgK1xuICAgICAgICAnPC9hPicgK1xuICAgICAgJzwvZGl2PicgK1xuICAgICAgJzxkaXYgY2xhc3M9XCJtaW5lLXRyb3VibGVzaG9vdGluZ1wiPicgK1xuICAgICAgICAnPGEgaHJlZj1cIiNcIj4gRGVsZXRlPC9hPicgK1xuICAgICAgJzwvZGl2Pic7XG5cbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicnVubmluZy1taW5lc1wiKTtcbiAgICBub2RlLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJEYXNoYm9hcmRNaW5lcygpIHtcbiAgICBmZXRjaEpzb24oXCIvbWluZS9hbGxcIilcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGxpc3RPZk1pbmVzKSB7XG4gICAgICAgIGxpc3RPZk1pbmVzLmZvckVhY2goZnVuY3Rpb24obWluZSkge1xuICAgICAgICAgIGlmIChtaW5lLm1pbmVTdGF0dXMgPT09IFwiaW4gcHJvZ3Jlc3NcIikge1xuICAgICAgICAgICAgcmVuZGVySW5Qcm9ncmVzc01pbmUobWluZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChtaW5lLm1pbmVTdGF0dXMgPT09IFwicnVubmluZ1wiKSB7XG4gICAgICAgICAgICByZW5kZXJSdW5uaW5nTWluZShtaW5lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBQYWdlOiB3aXphcmQvc3VwcGxlbWVudGFyeURhdGFcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVuZGVyU3VwcGxlbWVudGFyeURhdGEoKSB7XG4gICAgZmV0Y2hKc29uKFwiL2NvbmZpZ3VyYXRvci9zdXBwbGVtZW50YXJ5RGF0YVNvdXJjZXNcIilcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGFTb3VyY2VzKSB7XG4gICAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdXBwbGVtZW50YXJ5RGF0YVNvdXJjZXNcIik7XG5cbiAgICAgICAgcmVtb3ZlQ2hpbGRyZW4obm9kZSk7XG5cbiAgICAgICAgZGF0YVNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgICAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblxuICAgICAgICAgIGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgICAgaW5wdXQudmFsdWUgPSBzb3VyY2UuaWQ7XG4gICAgICAgICAgaW5wdXQubmFtZSA9IFwic3VwcGxlbWVudGFyeVwiO1xuICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSBcImNoZWNrZWRcIlxuXG4gICAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHNvdXJjZS5sYWJlbCkpO1xuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGxhYmVsKTtcblxuICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyRGF0YVRvb2xzKCkge1xuICAgIGZldGNoSnNvbihcIi9jb25maWd1cmF0b3IvZGF0YVRvb2xzXCIpXG4gICAgICAudGhlbihmdW5jdGlvbih0b29scykge1xuICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0YVRvb2xzXCIpO1xuXG4gICAgICAgIHJlbW92ZUNoaWxkcmVuKG5vZGUpO1xuXG4gICAgICAgIHRvb2xzLmZvckVhY2goZnVuY3Rpb24odG9vbCkge1xuICAgICAgICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgICAgICAgIHZhciBoMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgICBoMy5jbGFzc05hbWUgPSBcInN1YkhlYWRlclwiO1xuICAgICAgICAgIGgzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRvb2wudG9vbE5hbWUpKTtcblxuICAgICAgICAgIHZhciBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgcC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0b29sLnRvb2xEZXNjcmlwdGlvbikpO1xuXG4gICAgICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuXG4gICAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgIGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgICAgaW5wdXQudmFsdWUgPSB0b29sLnRvb2xJZDtcbiAgICAgICAgICBpbnB1dC5uYW1lID0gXCJ0b29sXCI7XG4gICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IFwiY2hlY2tlZFwiO1xuXG4gICAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiRW5hYmxlZFwiKSk7XG5cbiAgICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJpbWFnZVByZXZpZXdcIjtcblxuICAgICAgICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgIGltZy5zcmMgPSB0b29sLnRvb2xQcmV2aWV3O1xuXG4gICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGltZyk7XG5cbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChoMyk7XG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQocCk7XG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGRpdik7XG5cbiAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRTdXBwbGVtZW50YXJpZXMoKSB7XG4gICAgcmVuZGVyU3VwcGxlbWVudGFyeURhdGEoKTtcbiAgICByZW5kZXJEYXRhVG9vbHMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENoZWNrZWROYW1lcyhuYW1lKSB7XG4gICAgdmFyIGNoZWNrZWQgPSBbXTtcblxuICAgIHZhciBjaGVja2JveGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUobmFtZSk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoZWNrYm94ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjaGVja2JveGVzW2ldLmNoZWNrZWQpIHtcbiAgICAgICAgY2hlY2tlZC5wdXNoKGNoZWNrYm94ZXNbaV0udmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjaGVja2VkO1xuICB9XG5cbiAgZnVuY3Rpb24gc2F2ZVN1cHBsZW1lbnRhcnlEYXRhU291cmNlcygpIHtcbiAgICB2YXIgY2hlY2tlZCA9IGdldENoZWNrZWROYW1lcyhcInN1cHBsZW1lbnRhcnlcIik7XG5cbiAgICByZXR1cm4gcG9zdERhdGEoe1xuICAgICAgcGF0aDogXCIvY29uZmlndXJhdG9yL21pbmUvc3VwcGxlbWVudGFyeURhdGFTb3VyY2VzXCIsXG4gICAgICBwYXJhbXM6IHsgbWluZUlkOiByZWFkTWluZUlkKCkgfVxuICAgIH0sIHsgc291cmNlczogY2hlY2tlZCB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhdmVEYXRhVG9vbHMoKSB7XG4gICAgdmFyIGNoZWNrZWQgPSBnZXRDaGVja2VkTmFtZXMoXCJ0b29sXCIpO1xuXG4gICAgcmV0dXJuIHBvc3REYXRhKHtcbiAgICAgIHBhdGg6IFwiL2NvbmZpZ3VyYXRvci9taW5lL2RhdGFUb29sc1wiLFxuICAgICAgcGFyYW1zOiB7IG1pbmVJZDogcmVhZE1pbmVJZCgpIH1cbiAgICB9LCB7IHRvb2xzOiBjaGVja2VkIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2F2ZVN1cHBsZW1lbnRhcmllcygpIHtcbiAgICBQcm9taXNlLmFsbChbXG4gICAgICBzYXZlU3VwcGxlbWVudGFyeURhdGFTb3VyY2VzKCksXG4gICAgICBzYXZlRGF0YVRvb2xzKClcbiAgICBdKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgb3BlblBhZ2UoXCIvd2l6YXJkL2NvbmZpZ1wiKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIFBhZ2U6IHdpemFyZC9jb25maWdcbiAgICovXG5cbiAgdmFyIG1pbmVBdmFpbGFiaWxpdHlUaW1lcjtcblxuICBmdW5jdGlvbiByZW5kZXJDaGVja0F2YWlsYWJpbGl0eShldmVudCkge1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQobWluZUF2YWlsYWJpbGl0eVRpbWVyKTtcblxuICAgIG1pbmVBdmFpbGFiaWxpdHlUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcG9zdERhdGEoXCIvbWluZS9uYW1lQXZhaWxhYmlsaXR5XCIsIHsgbWluZU5hbWU6IGV2ZW50LnRhcmdldC52YWx1ZSB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIHZhciBpY29uTmFtZSA9IGRhdGEuaXNBdmFpbGFibGUgPyBcImNoZWNrbWFya1wiIDogXCJjcm9zc1wiO1xuICAgICAgICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXG4gICAgICAgICAgICBkYXRhLmlzQXZhaWxhYmxlXG4gICAgICAgICAgICAgID8gXCJUaGlzIHByb2plY3QgbmFtZSBpcyBmcmVlIVwiXG4gICAgICAgICAgICAgIDogXCJUaGlzIHByb2plY3QgbmFtZSBpcyB0YWtlbi5cIlxuICAgICAgICAgICk7XG5cbiAgICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmFsaWRhdGlvblwiKTtcblxuICAgICAgICAgIHZhciBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3ZnXCIpO1xuICAgICAgICAgIHN2Zy5jbGFzc05hbWUgPSBcImljb24gaWNvbi1cIi5jb25jYXQoaWNvbk5hbWUpO1xuXG4gICAgICAgICAgdmFyIHVzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1c2VcIik7XG4gICAgICAgICAgdXNlWyd4bGluazpocmVmJ10gPSBcIiNpY29uLVwiLmNvbmNhdChpY29uTmFtZSk7XG5cbiAgICAgICAgICBzdmcuYXBwZW5kQ2hpbGQodXNlKTtcblxuICAgICAgICAgIHJlbW92ZUNoaWxkcmVuKG5vZGUpO1xuXG4gICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChzdmcpO1xuICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgICAgIH0pO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBmdW5jdGlvbiBzYXZlRGVzY3JpcHRvcnMoKSB7XG4gICAgdmFyIG1pbmVOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5lTmFtZUlucHV0XCIpLnZhbHVlO1xuXG4gICAgdmFyIHByaXZhY3kgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJ2lucHV0W25hbWU9XCJwdWJsaWNQcml2YXRlXCJdOmNoZWNrZWQnXG4gICAgKS52YWx1ZTtcblxuICAgIHBvc3REYXRhKHtcbiAgICAgIHBhdGg6IFwiL2NvbmZpZ3VyYXRvci9taW5lL2Rlc2NyaXB0b3JzXCIsXG4gICAgICBwYXJhbXM6IHsgbWluZUlkOiByZWFkTWluZUlkKCkgfVxuICAgIH0sIHsgbWluZU5hbWU6IG1pbmVOYW1lLCBwcml2YWN5OiBwcml2YWN5IH0pXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgLy8gVE9ETyBoYW5kbGUgY2FzZSB3aGVyZSBgbWluZU5hbWVgIGlzIGFscmVhZHkgdGFrZW5cbiAgICAgICAgb3BlblBhZ2UoXCIvd2l6YXJkL2ZpbmFsaXNlXCIpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBQYWdlOiB3aXphcmQvZmluYWxpc2VcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVuZGVyRmluYWxpc2VVcGxvYWRlZEZpbGVzKGZpbGVzKSB7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZGVkRmlsZXNcIik7XG5cbiAgICByZW1vdmVDaGlsZHJlbihub2RlKTtcblxuICAgIGZpbGVzLmZvckVhY2goZnVuY3Rpb24oZmlsZSkge1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBkaXYuY2xhc3NOYW1lID0gXCJzdWJTdGVwQ29udGVudFwiO1xuICAgICAgdmFyIGg0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpO1xuICAgICAgaDQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZmlsZS5kYXRhRmlsZS5uYW1lKSk7XG4gICAgICB2YXIgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICB2YXIgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgc3Bhbi5jbGFzc05hbWUgPSBcInRpdGxlXCI7XG4gICAgICBzcGFuLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiT3JnYW5pc206XCIpKTtcblxuICAgICAgbGkuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICBsaS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShmaWxlLmRhdGFGaWxlLm9yZ2FuaXNtLm5hbWUpKTtcbiAgICAgIHVsLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZChoNCk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQodWwpO1xuXG4gICAgICBub2RlLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJMaXN0KGVsZW1JZCwgaXRlbXMpIHtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JZCk7XG5cbiAgICByZW1vdmVDaGlsZHJlbihub2RlKTtcblxuICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgIGEuaHJlZiA9IGl0ZW0udXJsO1xuICAgICAgdmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtLnRleHQpO1xuXG4gICAgICBhLmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgICBub2RlLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckZpbmFsaXNlU3VwcGxlbWVudGFyaWVzKHNvdXJjZXMsIHRvb2xzKSB7XG4gICAgcmVuZGVyTGlzdChcInN1cHBsZW1lbnRhcnlEYXRhXCIsIHNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIHsgdGV4dDogc291cmNlLmxhYmVsLCB1cmw6IHNvdXJjZS51cmwgfTtcbiAgICB9KSk7XG5cbiAgICByZW5kZXJMaXN0KFwiZGF0YVRvb2xzXCIsIHRvb2xzLm1hcChmdW5jdGlvbih0b29sKSB7XG4gICAgICByZXR1cm4geyB0ZXh0OiB0b29sLnRvb2xOYW1lLCB1cmw6IHRvb2wudG9vbFByZXZpZXcgfTtcbiAgICB9KSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJGaW5hbGlzZURlc2NyaXB0b3IoZGVzY3JpcHRvcikge1xuICAgIHZhciB1cmxFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5lTmFtZVwiKTtcbiAgICByZW1vdmVDaGlsZHJlbih1cmxFbGVtKTtcbiAgICB1cmxFbGVtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRlc2NyaXB0b3IubWluZU5hbWUpKTtcblxuICAgIHZhciBwcml2YWN5RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpdmFjeVwiKTtcbiAgICByZW1vdmVDaGlsZHJlbihwcml2YWN5RWxlbSk7XG4gICAgcHJpdmFjeUVsZW0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZGVzY3JpcHRvci5wcml2YWN5KSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0RmluYWxpc2UoKSB7XG4gICAgZmV0Y2hKc29uKHtcbiAgICAgIHBhdGg6IFwiL2NvbmZpZ3VyYXRvci9taW5lL3VzZXItY29uZmlnXCIsXG4gICAgICBwYXJhbXM6IHsgbWluZUlkOiByZWFkTWluZUlkKCkgfVxuICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHJlbmRlckZpbmFsaXNlVXBsb2FkZWRGaWxlcyhkYXRhLmRhdGFGaWxlcyk7XG4gICAgICAgIHJlbmRlckZpbmFsaXNlU3VwcGxlbWVudGFyaWVzKGRhdGEuc3VwcGxlbWVudGFyeURhdGFTb3VyY2VzLCBkYXRhLmRhdGFUb29scyk7XG4gICAgICAgIHJlbmRlckZpbmFsaXNlRGVzY3JpcHRvcihkYXRhLm1pbmVEZXNjcmlwdG9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogRXhwb3J0c1xuICAgKi9cblxuICByZXR1cm4ge1xuICAgIG9wZW5Jbml0aWFsUGFnZTogb3BlbkluaXRpYWxQYWdlLFxuICAgIHJlZ2lzdGVyVXNlcjogcmVnaXN0ZXJVc2VyLFxuICAgIGxvZ2luVXNlcjogbG9naW5Vc2VyLFxuICAgIGxvZ291dFVzZXI6IGxvZ291dFVzZXIsXG4gICAgcmVuZGVyRGFzaGJvYXJkTWluZXM6IHJlbmRlckRhc2hib2FyZE1pbmVzLFxuICAgIGluaXRTdXBwbGVtZW50YXJpZXM6IGluaXRTdXBwbGVtZW50YXJpZXMsXG4gICAgc2F2ZVN1cHBsZW1lbnRhcmllczogc2F2ZVN1cHBsZW1lbnRhcmllcyxcbiAgICByZW5kZXJDaGVja0F2YWlsYWJpbGl0eTogcmVuZGVyQ2hlY2tBdmFpbGFiaWxpdHksXG4gICAgc2F2ZURlc2NyaXB0b3JzOiBzYXZlRGVzY3JpcHRvcnMsXG4gICAgaW5pdEZpbmFsaXNlOiBpbml0RmluYWxpc2UsXG4gICAgcmVuZGVyQWxlcnRNZXNzYWdlOiByZW5kZXJBbGVydE1lc3NhZ2UsXG4gICAgY2xlYXJBbGVydE1lc3NhZ2U6IGNsZWFyQWxlcnRNZXNzYWdlLFxuICB9O1xufSkoKTtcbiIsIi8vIHZhciBlbmRwb2ludCA9IFwiaHR0cHM6Ly93aXphcmQuaW50ZXJtaW5lLm9yZy92MVwiO1xudmFyIGVuZHBvaW50ID0gXCJodHRwOi8vMTI3LjAuMC4xOjk5OTEvYXBpL3YxXCI7XG5cbi8vIFNpbmNlIG91ciBzZXJ2ZXIgKG5vdCB0aGUgQVBJKSBkb2Vzbid0IGtub3cgd2hldGhlciB0aGUgdXNlciBpc1xuLy8gYXV0aGVudGljYXRlZCwgY2hlY2tpbmcgZm9yIHRoaXMgYW5kIHNlbmRpbmcgdGhlbSB0byB0aGUgYC9yZWdpc3RlcmAgcGFnZVxuLy8gaXMgYSBjb21tb24gcGF0dGVybi4gV2UgY29kaWZ5IHRoaXMgaGVyZSwgc28gdGhhdCB3ZSBjYW4gdXNlIGl0IGluIG91clxuLy8gZ2VuZXJpYyByZXF1ZXN0IGZ1bmN0aW9ucyBiZWxvdy5cbmZ1bmN0aW9uIGhhbmRsZUVycm9yUmVzcG9uc2UocmVzKSB7XG4gIGlmIChyZXMuc3RhdHVzID09PSA0MDEpIHtcbiAgICAvLyBUaGUgdXNlciBpc24ndCBhdXRob3JpemVkLCBzbyBtYWtlIHRoZW0gc2lnbiBpbi5cbiAgICBvcGVuUGFnZShcIi9yZWdpc3RlclwiKTtcbiAgICByZXR1cm4gbmV3IEVycm9yKFwiWW91IGFyZSBub3QgYXV0aG9yaXplZC5cIik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuXG4vLyBBcmd1bWVudCBjYW4gYmUgZWl0aGVyIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcGF0aCBvciBhbiBvYmplY3Qgd2l0aFxuLy8gYHBhdGhgIGFuZCBgcGFyYW1zYCBrZXlzLCB3aGVyZSBwYXJhbXMgaXMgYW4gb2JqZWN0IG9mIHN0cmluZyBlbnRyaWVzLlxuZnVuY3Rpb24gc2VydmljZShhcmcpIHtcbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gV2hlbiB3ZSBhZGQgcXVlcnkgcGFyYW1zLCBvdXIgYmFja2VuZCB3aWxsIGNvbXBsYWluIGlmIHdlIGRvbid0IGhhdmUgYVxuICAgIC8vIHRyYWlsaW5nIHNsYXNoLlxuICAgIHZhciBwYXRoID0gYXJnLnBhdGguc2xpY2UoLTEpID09PSAnLycgPyBhcmcucGF0aCA6IGFyZy5wYXRoLmNvbmNhdCgnLycpO1xuXG4gICAgdmFyIHVybCA9IG5ldyBVUkwoZW5kcG9pbnQuY29uY2F0KHBhdGgpKTtcblxuICAgIGlmICgncGFyYW1zJyBpbiBhcmcpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhcmcucGFyYW1zKSB7XG4gICAgICAgIGlmIChhcmcucGFyYW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgdmFsID0gYXJnLnBhcmFtc1trZXldO1xuICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1cmw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVuZHBvaW50LmNvbmNhdChhcmcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZldGNoSnNvbihwYXRoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmZXRjaChzZXJ2aWNlKHBhdGgpLCB7XG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KGhhbmRsZUVycm9yUmVzcG9uc2UocmVzKSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvc3REYXRhKHBhdGgsIGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZldGNoKHNlcnZpY2UocGF0aCksIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QoaGFuZGxlRXJyb3JSZXNwb25zZShyZXMpKTtcbiAgICAgIH1cbiAgICB9KVxuICB9KTtcbn1cblxuZnVuY3Rpb24gb3BlblBhZ2UocGF0aCkge1xuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHBhdGg7XG59XG5cblxuICAvLyBXcmFwcGluZyBvdXIgY2FsbHMgdG8gYHNlc3Npb25TdG9yYWdlYCBjYW4gYmUgdXNlZnVsIGluIGNhc2Ugd2UgZXZlclxuICAvLyBkZWNpZGUgdG8gdXNlIGEgZGlmZmVyZW50IGZvcm0gb2Ygc3RvcmFnZSwgb3IgYWRkIHNpZGUtZWZmZWN0cy5cbiAgZnVuY3Rpb24gc2F2ZVN0b3JhZ2Uoa2V5LCB2YWwpIHtcbiAgICByZXR1cm4gc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbCk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkU3RvcmFnZShrZXkpIHtcbiAgICByZXR1cm4gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICB9XG5cblxuZXhwb3J0IHtcbiAgcG9zdERhdGEsIGZldGNoSnNvbiwgc2VydmljZSwgb3BlblBhZ2UsIHNhdmVTdG9yYWdlLCBsb2FkU3RvcmFnZVxufVxuIiwiaW1wb3J0IHtmZXRjaEpzb24sIG9wZW5QYWdlfSBmcm9tIFwiLi9jb21tcy5qc1wiO1xuaW1wb3J0IHtjcmVhdGVNaW5lSWR9IGZyb20gXCIuL21pbmVJRHMuanNcIjtcblxuLypcbiAqIFBhZ2U6IGhvbWVcbiAqL1xuXG5mdW5jdGlvbiBvcGVuSW5pdGlhbFBhZ2UoZXZlbnQpIHtcbiAgaWYgKGV2ZW50KSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGZldGNoSnNvbihcIi9taW5lL2FsbFwiKVxuICAgIC50aGVuKGZ1bmN0aW9uKGxpc3RPZk1pbmVzKSB7XG4gICAgICBpZiAobGlzdE9mTWluZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIFdlIGhhdmUgbWluZXM7IGRpc3BsYXkgdGhlbSBpbiB0aGUgZGFzaGJvYXJkIHBhZ2UhXG4gICAgICAgIG9wZW5QYWdlKFwiL2Rhc2hib2FyZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFdlIGRvbid0IGhhdmUgbWluZXM7IGdldCBzdGFydGVkIHdpdGggdGhlIHdpemFyZCFcbiAgICAgICAgY3JlYXRlTWluZUlkKClcbiAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG9wZW5QYWdlKFwiL3dpemFyZC91cGxvYWRcIik7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7b3BlbkluaXRpYWxQYWdlfTtcbiIsImltcG9ydCB7IGZldGNoSnNvbiwgc2F2ZVN0b3JhZ2UsIGxvYWRTdG9yYWdlfSBmcm9tIFwiLi9jb21tcy5qc1wiO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZU1pbmVJZCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBmZXRjaEpzb24oXCIvY29uZmlndXJhdG9yL21pbmUvdXNlci1jb25maWcvbmV3L1wiKVxuICAgICAgICAudGhlbihmdW5jdGlvbihtaW5lSWQpIHtcbiAgICAgICAgICBzYXZlU3RvcmFnZShcIm1pbmVJZFwiLCBtaW5lSWQpO1xuICAgICAgICAgIHJlc29sdmUobWluZUlkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkTWluZUlkKCkge1xuICAgIHJldHVybiBsb2FkU3RvcmFnZShcIm1pbmVJZFwiKTtcbiAgfVxuXG4gIGV4cG9ydCB7Y3JlYXRlTWluZUlkLHJlYWRNaW5lSWR9XG4iLCJ2YXIgaGFuZGxlciA9IHVuZGVmaW5lZDtcbmZ1bmN0aW9uIHJlbmRlckFsZXJ0TWVzc2FnZShtc2csIHZhcmlhbnQsIHRpbWUpIHtcblxuICBpZihoYW5kbGVyICE9PSB1bmRlZmluZWQpIGNsZWFyQWxlcnRNZXNzYWdlKGhhbmRsZXIpO1xuICBpZihtc2cgPT09IHVuZGVmaW5lZCkgbXNnID0gXCJTb21ldGhpbmcgd2VudCB3cm9uZ1wiO1xuICBpZih2YXJpYW50ID09PSB1bmRlZmluZWQpIHZhcmlhbnQgPSBcImVycm9yXCI7XG4gIGlmKHRpbWUgPT09IHVuZGVmaW5lZCkgdGltZSA9IDQwMDA7XG5cbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWxlcnRib3hcIik7XG4gIFxuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaG93XCIsIHZhcmlhbnQpO1xuICBoYW5kbGVyID0gc2V0VGltZW91dChjbGVhckFsZXJ0TWVzc2FnZSwgdGltZSk7XG4gIFxuICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgPHN2ZyBjbGFzcz1cImljb24gaWNvbi1sZyAke3ZhcmlhbnR9XCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tJHt2YXJpYW50fVwiPjwvdXNlPjwvc3ZnPlxuICA8ZGl2IGNsYXNzPVwiYWxlcnQtbXNnXCI+XG4gICR7bXNnfVxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImFsZXJ0LWNsb3NlXCIgb25jbGljaz1cIndpemFyZC5jbGVhckFsZXJ0TWVzc2FnZSgke2hhbmRsZXJ9KVwiPlxuICA8c3ZnIGNsYXNzPVwiaWNvblwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWNyb3NzXCI+PC91c2U+PC9zdmc+XG4gIDwvZGl2PlxuICBgXG4gIFxufVxuXG5mdW5jdGlvbiBjbGVhckFsZXJ0TWVzc2FnZShoYW5kbGVyKSB7XG4gIGlmKGhhbmRsZXIgIT09IHVuZGVmaW5lZCkgY2xlYXJUaW1lb3V0KGhhbmRsZXIpO1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbGVydGJveFwiKTtcbiAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiLCBcImVycm9yXCIsIFwic3VjY2Vzc1wiLCBcImluZm9cIiwgXCJ3YXJuaW5nXCIpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDaGlsZHJlbihub2RlKSB7XG4gIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVwbGFjZVRleHQoZWxlbUlkLCB0ZXh0KSB7XG4gIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKTtcbiAgdmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgcmVtb3ZlQ2hpbGRyZW4oZWxlbSk7XG4gIGVsZW0uYXBwZW5kQ2hpbGQodGV4dCk7XG59XG5cblxuZXhwb3J0IHtcbiAgY2xlYXJBbGVydE1lc3NhZ2UsXG4gIHJlbmRlckFsZXJ0TWVzc2FnZSxcbiAgcmVtb3ZlQ2hpbGRyZW4sXG4gIHJlcGxhY2VUZXh0XG59XG4iLCJpbXBvcnQge2ZldGNoSnNvbixwb3N0RGF0YSwgb3BlblBhZ2UsIHNlcnZpY2V9IGZyb20gXCIuL2NvbW1zLmpzXCI7XG5pbXBvcnQge2NsZWFyQWxlcnRNZXNzYWdlLCByZW5kZXJBbGVydE1lc3NhZ2V9IGZyb20gXCIuL3VpLmpzXCI7XG5pbXBvcnQge29wZW5Jbml0aWFsUGFnZX0gZnJvbSBcIi4vaG9tZS5qc1wiO1xuXG5cbiAgLypcbiAgICogUGFnZTogcmVnaXN0ZXJcbiAgICovXG5cblxuICBmdW5jdGlvbiByZWFkRm9ybShvYmopIHtcbiAgICB2YXIgaW5wdXRzID0ge307XG5cbiAgICBPYmplY3QuZW50cmllcyhvYmouaW5wdXRzKS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIga2V5ID0gZW50cnlbMF07XG4gICAgICB2YXIgdmFsID0gZW50cnlbMV07XG4gICAgICBpbnB1dHNba2V5XSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZhbCkudmFsdWU7XG4gICAgfSk7XG5cbiAgICBjbGVhckFsZXJ0TWVzc2FnZShvYmouYWxlcnRJZCk7XG5cbiAgICB2YXIgZXJyb3IgPSBvYmoudmFsaWRhdGlvbnMuc29tZShmdW5jdGlvbih0ZXN0RnVuKSB7XG4gICAgICB2YXIgcmVzID0gdGVzdEZ1bihpbnB1dHMpO1xuICAgICAgaWYgKHJlcykgcmVuZGVyQWxlcnRNZXNzYWdlKG9iai5hbGVydElkLCByZXMpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KTtcblxuICAgIGlmIChlcnJvcikgcmV0dXJuO1xuICAgIGVsc2UgcmV0dXJuIGlucHV0cztcbiAgfVxuXG4gIHZhciB2YWxpZGF0ZSA9IHtcbiAgICBwYXNzd29yZHNNYXRjaDogZnVuY3Rpb24oaW5wdXRzKSB7XG4gICAgICBpZiAoaW5wdXRzLnBhc3N3b3JkICE9PSBpbnB1dHMucGFzc3dvcmRDb25maXJtKSB7XG4gICAgICAgIHJldHVybiBcIlBhc3N3b3JkcyBkbyBub3QgbWF0Y2guXCI7XG4gICAgICB9XG4gICAgfSxcbiAgICBub3RFbXB0eTogZnVuY3Rpb24oaW5wdXRzKSB7XG4gICAgICBpZiAoT2JqZWN0LnZhbHVlcyhpbnB1dHMpLnNvbWUoZnVuY3Rpb24oaW5wKSB7IHJldHVybiAhaW5wOyB9KSkge1xuICAgICAgICByZXR1cm4gXCJQbGVhc2UgZmlsbCBpbiBhbGwgdGhlIGZpZWxkcy5cIjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJVc2VyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBpbnB1dERhdGEgPSByZWFkRm9ybSh7XG4gICAgICBpbnB1dHM6IHtcbiAgICAgICAgZW1haWw6IFwicmVnaXN0ZXItZW1haWxcIixcbiAgICAgICAgZmlyc3ROYW1lOiBcInJlZ2lzdGVyLWZpcnN0LW5hbWVcIixcbiAgICAgICAgbGFzdE5hbWU6IFwicmVnaXN0ZXItbGFzdC1uYW1lXCIsXG4gICAgICAgIG9yZ2FuaXNhdGlvbjogXCJyZWdpc3Rlci1vcmdhbmlzYXRpb25cIixcbiAgICAgICAgcGFzc3dvcmQ6IFwicmVnaXN0ZXItcGFzc3dvcmRcIixcbiAgICAgICAgcGFzc3dvcmRDb25maXJtOiBcInJlZ2lzdGVyLXBhc3N3b3JkLWNvbmZpcm1cIlxuICAgICAgfSxcbiAgICAgIGFsZXJ0SWQ6IFwicmVnaXN0ZXJGb3JtQWxlcnRcIixcbiAgICAgIHZhbGlkYXRpb25zOiBbXG4gICAgICAgIHZhbGlkYXRlLnBhc3N3b3Jkc01hdGNoLFxuICAgICAgICB2YWxpZGF0ZS5ub3RFbXB0eSxcbiAgICAgIF1cbiAgICB9KTtcblxuICAgIGlmIChpbnB1dERhdGEpIHtcbiAgICAgIHBvc3REYXRhKFwiL3VzZXIvcmVnaXN0ZXJcIiwgaW5wdXREYXRhKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZWdpc3RlclJlcykge1xuICAgICAgICAgIHJlbmRlckFsZXJ0TWVzc2FnZShcImFsZXJ0Ym94XCIsIFwiQWNjb3VudCBjcmVhdGVkIHN1Y2Nlc3NmdWxseS5cIik7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJSZXMpIHtcbiAgICAgICAgICBpZiAoZXJyUmVzIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyUmVzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciBtZXNzYWdlcyBmcm9tIGJhY2tlbmQuXG4gICAgICAgICAgICBlcnJSZXMuanNvbigpXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIHJlbmRlckFsZXJ0TWVzc2FnZShcInJlZ2lzdGVyRm9ybUFsZXJ0XCIsIHJlcy5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBsb2dpblVzZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIGlucHV0RGF0YSA9IHJlYWRGb3JtKHtcbiAgICAgIGlucHV0czoge1xuICAgICAgICBlbWFpbDogXCJzaWduaW4tZW1haWxcIixcbiAgICAgICAgcGFzc3dvcmQ6IFwic2lnbmluLXBhc3N3b3JkXCJcbiAgICAgIH0sXG4gICAgICBhbGVydElkOiBcInNpZ25pbkZvcm1BbGVydFwiLFxuICAgICAgdmFsaWRhdGlvbnM6IFtcbiAgICAgICAgdmFsaWRhdGUubm90RW1wdHksXG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBpZiAoaW5wdXREYXRhKSB7XG4gICAgICBwb3N0RGF0YShcIi91c2VyL2xvZ2luXCIsIGlucHV0RGF0YSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24obG9naW5SZXMpIHtcbiAgICAgICAgICBvcGVuSW5pdGlhbFBhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAvLyBUT0RPIGhhbmRsZSBpbnZhbGlkIGxvZ2luIChJIGRvbid0IHRoaW5rIHRoZSBiYWNrZW5kIGN1cnJlbnRseSBnaXZlc1xuICAgICAgLy8gdXMgYSBsZWdpYmlsZSByZXNwb25zZSB3aGVuIHRoaXMgaGFwcGVucywganVzdCA0MDAgQmFkIFJlcXVlc3QpXG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cblxuZnVuY3Rpb24gbG9nb3V0VXNlcigpIHtcbiAgdmFyIHBhdGggPSBcIi91c2VyL2xvZ291dFwiO1xuICBmZXRjaEpzb24ocGF0aCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICBpZihyZXNwb25zZS5tZXNzYWdlKSB7XG4gICAgICBvcGVuUGFnZShcIi9yZWdpc3RlclwiKTtcbiAgICAgIC8vIHRvZG8gLSBhbHNvIHBvc3Qgc3RhdHVzZSBtZXNzYWdlIHNheWluZyB0aGVyZSBoYXMgYmVlbiBhIHN1Y2Nlc3NmdWxcbiAgICAgIC8vIGxvZ291dC4gQWRkIHNvZW10aGluZyB0byB0aGUgb3BlbnBhZ2UgbWV0aG9kIHRvIHByaW50IHRvIHRoZSBoZWFkZXJcbiAgICAgIC8vIGFsZXJ0Ym94XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbmRlckFsZXJ0TWVzc2FnZShcImFsZXJ0Ym94XCIsIFwiVWhvaCwgcHJvYmxlbSBsb2dnaW5nIG91dCFcIik7XG4gICAgfVxuICB9KTtcbn1cblxuXG5leHBvcnQge2xvZ2luVXNlciwgbG9nb3V0VXNlciwgcmVnaXN0ZXJVc2VyfVxuIl0sInNvdXJjZVJvb3QiOiIifQ==