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
    initFinalise: initFinalise
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aXphcmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL2NsaWVudC5qcyIsIndlYnBhY2s6Ly93aXphcmQvLi9wdWJsaWMvanMvY29tbXMuanMiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL2hvbWUuanMiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL21pbmVJRHMuanMiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL3VpLmpzIiwid2VicGFjazovL3dpemFyZC8uL3B1YmxpYy9qcy91c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQWtFO0FBQ0o7QUFDcEI7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDBEQUFRO0FBQ2Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLHlEQUFPO0FBQ25CO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxZQUFZLHlEQUFPO0FBQ25CO0FBQ0Esa0JBQWtCLHFDQUFxQztBQUN2RDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7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TDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLG9EQUFvRCxhQUFhLEVBQUU7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsTUFBTSwwREFBUTtBQUNkO0FBQ0EsVUFBVSxpRUFBa0I7QUFDNUIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUVBQWtCO0FBQ2xDLGVBQWU7QUFDZjtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsTUFBTSwwREFBUTtBQUNkO0FBQ0EsVUFBVSxnRUFBZTtBQUN6QixTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxFQUFFLDJEQUFTO0FBQ1g7QUFDQTtBQUNBLE1BQU0sMERBQVE7QUFDZDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsTUFBTSxpRUFBa0I7QUFDeEI7QUFDQSxHQUFHO0FBQ0g7OztBQUc0QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wdWJsaWMvanMvY2xpZW50LmpzXCIpO1xuIiwiaW1wb3J0IHtwb3N0RGF0YSwgZmV0Y2hKc29uLCBzZXJ2aWNlLCBvcGVuUGFnZX0gZnJvbSBcIi4vY29tbXMuanNcIjtcbmltcG9ydCB7bG9naW5Vc2VyLCBsb2dvdXRVc2VyLHJlZ2lzdGVyVXNlciB9IGZyb20gXCIuL3VzZXIuanNcIjtcbmltcG9ydCB7b3BlbkluaXRpYWxQYWdlfSBmcm9tIFwiLi9ob21lLmpzXCI7XG5cbi8qIFBvc3NpYmxlIHBvbHlmaWxscyB3ZSdsbCB3YW50OlxuICogLSBGZXRjaFxuICogLSBQcm9taXNlLlxuICogLSBVUkwgc2VhcmNoUGFyYW1zLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbigpIHtcblxuICBmdW5jdGlvbiByZW1vdmVDaGlsZHJlbihub2RlKSB7XG4gICAgd2hpbGUgKG5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2VUZXh0KGVsZW1JZCwgdGV4dCkge1xuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKTtcbiAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgIHJlbW92ZUNoaWxkcmVuKGVsZW0pO1xuICAgIGVsZW0uYXBwZW5kQ2hpbGQodGV4dCk7XG4gIH1cblxuICAvLyBTaW5jZSBvdXIgc2VydmVyIChub3QgdGhlIEFQSSkgZG9lc24ndCBrbm93IHdoZXRoZXIgdGhlIHVzZXIgaXNcbiAgLy8gYXV0aGVudGljYXRlZCwgY2hlY2tpbmcgZm9yIHRoaXMgYW5kIHNlbmRpbmcgdGhlbSB0byB0aGUgYC9yZWdpc3RlcmAgcGFnZVxuICAvLyBpcyBhIGNvbW1vbiBwYXR0ZXJuLiBXZSBjb2RpZnkgdGhpcyBoZXJlLCBzbyB0aGF0IHdlIGNhbiB1c2UgaXQgaW4gb3VyXG4gIC8vIGdlbmVyaWMgcmVxdWVzdCBmdW5jdGlvbnMgYmVsb3cuXG4gIGZ1bmN0aW9uIGhhbmRsZUVycm9yUmVzcG9uc2UocmVzKSB7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgLy8gVGhlIHVzZXIgaXNuJ3QgYXV0aG9yaXplZCwgc28gbWFrZSB0aGVtIHNpZ24gaW4uXG4gICAgICBvcGVuUGFnZShcIi9yZWdpc3RlclwiKTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJZb3UgYXJlIG5vdCBhdXRob3JpemVkLlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaEpzb24ocGF0aCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZldGNoKHNlcnZpY2UocGF0aCksIHtcbiAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChoYW5kbGVFcnJvclJlc3BvbnNlKHJlcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9zdERhdGEocGF0aCwgZGF0YSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZldGNoKHNlcnZpY2UocGF0aCksIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QoaGFuZGxlRXJyb3JSZXNwb25zZShyZXMpKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG5cbiAgLypcbiAgICogUGFnZTogZGFzaGJvYXJkXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9wZW5JblByb2dyZXNzTWluZShtaW5lKSB7XG4gICAgLy8gVE9ET1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVySW5Qcm9ncmVzc01pbmUobWluZSkge1xuICAgIHZhciBjb250YWluZXJMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICB2YXIgc3RhdHVzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc3RhdHVzRGl2LmNsYXNzTmFtZSA9IFwic3RhdHVzIGNvbnN0cnVjdGlvblwiO1xuICAgIHZhciBzdGF0dXNTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICBzdGF0dXNTdmcuY2xhc3NOYW1lID0gXCJpY29uIGljb24tYnVpbGRpbmdcIjtcbiAgICB2YXIgc3RhdHVzVXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndXNlJyk7XG4gICAgc3RhdHVzVXNlWyd4bGluazpocmVmJ10gPSBcIiNpY29uLWJ1aWxkaW5nXCI7XG4gICAgdmFyIHN0YXR1c1AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cbiAgICBzdGF0dXNQLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiSW5jb21wbGV0ZVwiKSk7XG4gICAgc3RhdHVzU3ZnLmFwcGVuZENoaWxkKHN0YXR1c1VzZSk7XG4gICAgc3RhdHVzRGl2LmFwcGVuZENoaWxkKHN0YXR1c1N2Zyk7XG4gICAgc3RhdHVzRGl2LmFwcGVuZENoaWxkKHN0YXR1c1ApO1xuICAgIGNvbnRhaW5lckxpLmFwcGVuZENoaWxkKHN0YXR1c0Rpdik7XG5cbiAgICB2YXIgbmFtZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBuYW1lQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBuYW1lQS5ocmVmID0gbWluZS5taW5lbG9jYXRpb247XG5cbiAgICBuYW1lQS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtaW5lLm1pbmVOYW1lLmNvbmNhdChcIiB3b3JrIGluIHByb2dyZXNzXCIpKSk7XG4gICAgbmFtZURpdi5hcHBlbmRDaGlsZChuYW1lQSk7XG4gICAgY29udGFpbmVyTGkuYXBwZW5kQ2hpbGQobmFtZURpdik7XG5cbiAgICB2YXIgYWN0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGFjdGlvbnNEaXYuY2xhc3NOYW1lID0gXCJjb250aW51ZS13aXphcmRcIjtcblxuICAgIHZhciBhY3Rpb25zVXBwZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgYWN0aW9uc1VwcGVyQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhY3Rpb25zVXBwZXJBLm9uY2xpY2sgPSBvcGVuSW5Qcm9ncmVzc01pbmUobWluZSk7XG4gICAgYWN0aW9uc1VwcGVyQS5jbGFzc05hbWUgPSBcInJlc3VtZVwiO1xuICAgIHZhciBhY3Rpb25zVXBwZXJTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICBhY3Rpb25zVXBwZXJTdmcuY2xhc3NOYW1lID0gXCJpY29uIGljb24tcmVzdW1lXCI7XG4gICAgdmFyIGFjdGlvbnNVcHBlclVzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VzZScpO1xuICAgIGFjdGlvbnNVcHBlclVzZVsneGxpbms6aHJlZiddID0gXCIjaWNvbi1yZXN1bWVcIjtcblxuICAgIGFjdGlvbnNVcHBlclN2Zy5hcHBlbmRDaGlsZChhY3Rpb25zVXBwZXJVc2UpO1xuICAgIGFjdGlvbnNVcHBlckEuYXBwZW5kQ2hpbGQoYWN0aW9uc1VwcGVyU3ZnKTtcbiAgICBhY3Rpb25zVXBwZXJBLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiQ29udGludWUgc2V0dXBcIikpO1xuICAgIGFjdGlvbnNVcHBlckRpdi5hcHBlbmRDaGlsZChhY3Rpb25zVXBwZXJBKTtcbiAgICBhY3Rpb25zRGl2LmFwcGVuZENoaWxkKGFjdGlvbnNVcHBlckRpdik7XG5cbiAgICB2YXIgYWN0aW9uc0xvd2VyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGFjdGlvbnNMb3dlckEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYWN0aW9uc0xvd2VyQS5ocmVmID0gXCIjXCI7XG4gICAgYWN0aW9uc0xvd2VyQS5jbGFzc05hbWUgPSBcImRpc2NhcmRcIjtcbiAgICB2YXIgYWN0aW9uc0xvd2VyU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgYWN0aW9uc0xvd2VyU3ZnLmNsYXNzTmFtZSA9IFwiaWNvbiBpY29uLWNhbmNlbFwiO1xuICAgIHZhciBhY3Rpb25zTG93ZXJVc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1c2UnKTtcbiAgICBhY3Rpb25zTG93ZXJVc2VbJ3hsaW5rOmhyZWYnXSA9IFwiI2ljb24tY2FuY2VsXCI7XG5cbiAgICBhY3Rpb25zTG93ZXJTdmcuYXBwZW5kQ2hpbGQoYWN0aW9uc0xvd2VyVXNlKTtcbiAgICBhY3Rpb25zTG93ZXJBLmFwcGVuZENoaWxkKGFjdGlvbnNMb3dlclN2Zyk7XG4gICAgYWN0aW9uc0xvd2VyQS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkRpc2NhcmRcIikpO1xuICAgIGFjdGlvbnNMb3dlckRpdi5hcHBlbmRDaGlsZChhY3Rpb25zTG93ZXJBKTtcbiAgICBhY3Rpb25zRGl2LmFwcGVuZENoaWxkKGFjdGlvbnNMb3dlckRpdik7XG5cbiAgICBjb250YWluZXJMaS5hcHBlbmRDaGlsZChhY3Rpb25zRGl2KTtcblxuICAgIHZhciBjb21wbGV0ZUJ5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tcGxldGVCeURpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtaW5lLmV0YURhdGUpKTtcblxuICAgIGNvbnRhaW5lckxpLmFwcGVuZENoaWxkKGNvbXBsZXRlQnlEaXYpO1xuXG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluLXByb2dyZXNzLW1pbmVzXCIpO1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY29udGFpbmVyTGkpO1xuICB9XG4gIC8vIFdoeSBpcyB0aGUgYWJvdmUgd3JpdHRlbiB3aXRoIGFwcGVuZENoaWxkIGFuZCB0aGUgYmVsb3cgd2l0aCBpbm5lckhUTUw/XG4gIC8vIEZvciB0aGUgam95IG9mIGNvbXBhcmlzb24gb2YgY291cnNlIVxuICBmdW5jdGlvbiByZW5kZXJSdW5uaW5nTWluZShtaW5lKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICBjb250YWluZXIuaW5uZXJIVE1MID1cbiAgICAgICc8ZGl2IGNsYXNzPVwic3RhdHVzIGFjdGl2ZVwiPicgK1xuICAgICAgICAnPHN2ZyBjbGFzcz1cImljb24gaWNvbi1jaGVja21hcmtcIj4nICtcbiAgICAgICAgICAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tY2hlY2ttYXJrXCI+PC91c2U+JyArXG4gICAgICAgICc8L3N2Zz4nICtcbiAgICAgICAgJzxwPkFjdGl2ZTwvcD4nICtcbiAgICAgICc8L2Rpdj4nICtcbiAgICAgICc8ZGl2PjxhIGhyZWY9XCInICsgbWluZS5taW5lbG9jYXRpb24gKyAnXCI+JyArIG1pbmUubWluZU5hbWUgKyAnPC9hPjwvZGl2PicgK1xuICAgICAgJzxkaXYgY2xhc3M9XCJtaW5lLWNvbmZpZ1wiPicgK1xuICAgICAgICAnPGEgaHJlZj1cImNvbmZpZ1wiPicgK1xuICAgICAgICAgICc8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLXZpZXdcIj4nICtcbiAgICAgICAgICAgICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi12aWV3XCI+PC91c2U+JyArXG4gICAgICAgICAgJzwvc3ZnPicgK1xuICAgICAgICAgICdWaWV3JyArXG4gICAgICAgICc8L2E+JyArXG4gICAgICAgICc8YSBocmVmPVwiI1wiPicgK1xuICAgICAgICAgICc8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWRvd25sb2FkXCI+JyArXG4gICAgICAgICAgICAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tZG93bmxvYWRcIj48L3VzZT4nICtcbiAgICAgICAgICAnPC9zdmc+JyArXG4gICAgICAgICAgJ0V4cG9ydCcgK1xuICAgICAgICAnPC9hPicgK1xuICAgICAgJzwvZGl2PicgK1xuICAgICAgJzxkaXYgY2xhc3M9XCJtaW5lLXRyb3VibGVzaG9vdGluZ1wiPicgK1xuICAgICAgICAnPGEgaHJlZj1cIiNcIj4gRGVsZXRlPC9hPicgK1xuICAgICAgJzwvZGl2Pic7XG5cbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicnVubmluZy1taW5lc1wiKTtcbiAgICBub2RlLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJEYXNoYm9hcmRNaW5lcygpIHtcbiAgICBmZXRjaEpzb24oXCIvbWluZS9hbGxcIilcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGxpc3RPZk1pbmVzKSB7XG4gICAgICAgIGxpc3RPZk1pbmVzLmZvckVhY2goZnVuY3Rpb24obWluZSkge1xuICAgICAgICAgIGlmIChtaW5lLm1pbmVTdGF0dXMgPT09IFwiaW4gcHJvZ3Jlc3NcIikge1xuICAgICAgICAgICAgcmVuZGVySW5Qcm9ncmVzc01pbmUobWluZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChtaW5lLm1pbmVTdGF0dXMgPT09IFwicnVubmluZ1wiKSB7XG4gICAgICAgICAgICByZW5kZXJSdW5uaW5nTWluZShtaW5lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBQYWdlOiB3aXphcmQvc3VwcGxlbWVudGFyeURhdGFcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVuZGVyU3VwcGxlbWVudGFyeURhdGEoKSB7XG4gICAgZmV0Y2hKc29uKFwiL2NvbmZpZ3VyYXRvci9zdXBwbGVtZW50YXJ5RGF0YVNvdXJjZXNcIilcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGFTb3VyY2VzKSB7XG4gICAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdXBwbGVtZW50YXJ5RGF0YVNvdXJjZXNcIik7XG5cbiAgICAgICAgcmVtb3ZlQ2hpbGRyZW4obm9kZSk7XG5cbiAgICAgICAgZGF0YVNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgICAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblxuICAgICAgICAgIGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgICAgaW5wdXQudmFsdWUgPSBzb3VyY2UuaWQ7XG4gICAgICAgICAgaW5wdXQubmFtZSA9IFwic3VwcGxlbWVudGFyeVwiO1xuICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSBcImNoZWNrZWRcIlxuXG4gICAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHNvdXJjZS5sYWJlbCkpO1xuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGxhYmVsKTtcblxuICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyRGF0YVRvb2xzKCkge1xuICAgIGZldGNoSnNvbihcIi9jb25maWd1cmF0b3IvZGF0YVRvb2xzXCIpXG4gICAgICAudGhlbihmdW5jdGlvbih0b29scykge1xuICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0YVRvb2xzXCIpO1xuXG4gICAgICAgIHJlbW92ZUNoaWxkcmVuKG5vZGUpO1xuXG4gICAgICAgIHRvb2xzLmZvckVhY2goZnVuY3Rpb24odG9vbCkge1xuICAgICAgICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgICAgICAgIHZhciBoMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgICBoMy5jbGFzc05hbWUgPSBcInN1YkhlYWRlclwiO1xuICAgICAgICAgIGgzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRvb2wudG9vbE5hbWUpKTtcblxuICAgICAgICAgIHZhciBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgcC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0b29sLnRvb2xEZXNjcmlwdGlvbikpO1xuXG4gICAgICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuXG4gICAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgIGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgICAgaW5wdXQudmFsdWUgPSB0b29sLnRvb2xJZDtcbiAgICAgICAgICBpbnB1dC5uYW1lID0gXCJ0b29sXCI7XG4gICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IFwiY2hlY2tlZFwiO1xuXG4gICAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiRW5hYmxlZFwiKSk7XG5cbiAgICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJpbWFnZVByZXZpZXdcIjtcblxuICAgICAgICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgIGltZy5zcmMgPSB0b29sLnRvb2xQcmV2aWV3O1xuXG4gICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGltZyk7XG5cbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChoMyk7XG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQocCk7XG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGRpdik7XG5cbiAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRTdXBwbGVtZW50YXJpZXMoKSB7XG4gICAgcmVuZGVyU3VwcGxlbWVudGFyeURhdGEoKTtcbiAgICByZW5kZXJEYXRhVG9vbHMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENoZWNrZWROYW1lcyhuYW1lKSB7XG4gICAgdmFyIGNoZWNrZWQgPSBbXTtcblxuICAgIHZhciBjaGVja2JveGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUobmFtZSk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoZWNrYm94ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjaGVja2JveGVzW2ldLmNoZWNrZWQpIHtcbiAgICAgICAgY2hlY2tlZC5wdXNoKGNoZWNrYm94ZXNbaV0udmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjaGVja2VkO1xuICB9XG5cbiAgZnVuY3Rpb24gc2F2ZVN1cHBsZW1lbnRhcnlEYXRhU291cmNlcygpIHtcbiAgICB2YXIgY2hlY2tlZCA9IGdldENoZWNrZWROYW1lcyhcInN1cHBsZW1lbnRhcnlcIik7XG5cbiAgICByZXR1cm4gcG9zdERhdGEoe1xuICAgICAgcGF0aDogXCIvY29uZmlndXJhdG9yL21pbmUvc3VwcGxlbWVudGFyeURhdGFTb3VyY2VzXCIsXG4gICAgICBwYXJhbXM6IHsgbWluZUlkOiByZWFkTWluZUlkKCkgfVxuICAgIH0sIHsgc291cmNlczogY2hlY2tlZCB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhdmVEYXRhVG9vbHMoKSB7XG4gICAgdmFyIGNoZWNrZWQgPSBnZXRDaGVja2VkTmFtZXMoXCJ0b29sXCIpO1xuXG4gICAgcmV0dXJuIHBvc3REYXRhKHtcbiAgICAgIHBhdGg6IFwiL2NvbmZpZ3VyYXRvci9taW5lL2RhdGFUb29sc1wiLFxuICAgICAgcGFyYW1zOiB7IG1pbmVJZDogcmVhZE1pbmVJZCgpIH1cbiAgICB9LCB7IHRvb2xzOiBjaGVja2VkIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2F2ZVN1cHBsZW1lbnRhcmllcygpIHtcbiAgICBQcm9taXNlLmFsbChbXG4gICAgICBzYXZlU3VwcGxlbWVudGFyeURhdGFTb3VyY2VzKCksXG4gICAgICBzYXZlRGF0YVRvb2xzKClcbiAgICBdKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgb3BlblBhZ2UoXCIvd2l6YXJkL2NvbmZpZ1wiKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIFBhZ2U6IHdpemFyZC9jb25maWdcbiAgICovXG5cbiAgdmFyIG1pbmVBdmFpbGFiaWxpdHlUaW1lcjtcblxuICBmdW5jdGlvbiByZW5kZXJDaGVja0F2YWlsYWJpbGl0eShldmVudCkge1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQobWluZUF2YWlsYWJpbGl0eVRpbWVyKTtcblxuICAgIG1pbmVBdmFpbGFiaWxpdHlUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcG9zdERhdGEoXCIvbWluZS9uYW1lQXZhaWxhYmlsaXR5XCIsIHsgbWluZU5hbWU6IGV2ZW50LnRhcmdldC52YWx1ZSB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIHZhciBpY29uTmFtZSA9IGRhdGEuaXNBdmFpbGFibGUgPyBcImNoZWNrbWFya1wiIDogXCJjcm9zc1wiO1xuICAgICAgICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXG4gICAgICAgICAgICBkYXRhLmlzQXZhaWxhYmxlXG4gICAgICAgICAgICAgID8gXCJUaGlzIHByb2plY3QgbmFtZSBpcyBmcmVlIVwiXG4gICAgICAgICAgICAgIDogXCJUaGlzIHByb2plY3QgbmFtZSBpcyB0YWtlbi5cIlxuICAgICAgICAgICk7XG5cbiAgICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmFsaWRhdGlvblwiKTtcblxuICAgICAgICAgIHZhciBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3ZnXCIpO1xuICAgICAgICAgIHN2Zy5jbGFzc05hbWUgPSBcImljb24gaWNvbi1cIi5jb25jYXQoaWNvbk5hbWUpO1xuXG4gICAgICAgICAgdmFyIHVzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1c2VcIik7XG4gICAgICAgICAgdXNlWyd4bGluazpocmVmJ10gPSBcIiNpY29uLVwiLmNvbmNhdChpY29uTmFtZSk7XG5cbiAgICAgICAgICBzdmcuYXBwZW5kQ2hpbGQodXNlKTtcblxuICAgICAgICAgIHJlbW92ZUNoaWxkcmVuKG5vZGUpO1xuXG4gICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChzdmcpO1xuICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgICAgIH0pO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBmdW5jdGlvbiBzYXZlRGVzY3JpcHRvcnMoKSB7XG4gICAgdmFyIG1pbmVOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5lTmFtZUlucHV0XCIpLnZhbHVlO1xuXG4gICAgdmFyIHByaXZhY3kgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJ2lucHV0W25hbWU9XCJwdWJsaWNQcml2YXRlXCJdOmNoZWNrZWQnXG4gICAgKS52YWx1ZTtcblxuICAgIHBvc3REYXRhKHtcbiAgICAgIHBhdGg6IFwiL2NvbmZpZ3VyYXRvci9taW5lL2Rlc2NyaXB0b3JzXCIsXG4gICAgICBwYXJhbXM6IHsgbWluZUlkOiByZWFkTWluZUlkKCkgfVxuICAgIH0sIHsgbWluZU5hbWU6IG1pbmVOYW1lLCBwcml2YWN5OiBwcml2YWN5IH0pXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgLy8gVE9ETyBoYW5kbGUgY2FzZSB3aGVyZSBgbWluZU5hbWVgIGlzIGFscmVhZHkgdGFrZW5cbiAgICAgICAgb3BlblBhZ2UoXCIvd2l6YXJkL2ZpbmFsaXNlXCIpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBQYWdlOiB3aXphcmQvZmluYWxpc2VcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVuZGVyRmluYWxpc2VVcGxvYWRlZEZpbGVzKGZpbGVzKSB7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZGVkRmlsZXNcIik7XG5cbiAgICByZW1vdmVDaGlsZHJlbihub2RlKTtcblxuICAgIGZpbGVzLmZvckVhY2goZnVuY3Rpb24oZmlsZSkge1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBkaXYuY2xhc3NOYW1lID0gXCJzdWJTdGVwQ29udGVudFwiO1xuICAgICAgdmFyIGg0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpO1xuICAgICAgaDQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZmlsZS5kYXRhRmlsZS5uYW1lKSk7XG4gICAgICB2YXIgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICB2YXIgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgc3Bhbi5jbGFzc05hbWUgPSBcInRpdGxlXCI7XG4gICAgICBzcGFuLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiT3JnYW5pc206XCIpKTtcblxuICAgICAgbGkuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICBsaS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShmaWxlLmRhdGFGaWxlLm9yZ2FuaXNtLm5hbWUpKTtcbiAgICAgIHVsLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZChoNCk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQodWwpO1xuXG4gICAgICBub2RlLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJMaXN0KGVsZW1JZCwgaXRlbXMpIHtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JZCk7XG5cbiAgICByZW1vdmVDaGlsZHJlbihub2RlKTtcblxuICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgIGEuaHJlZiA9IGl0ZW0udXJsO1xuICAgICAgdmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtLnRleHQpO1xuXG4gICAgICBhLmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgICBub2RlLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckZpbmFsaXNlU3VwcGxlbWVudGFyaWVzKHNvdXJjZXMsIHRvb2xzKSB7XG4gICAgcmVuZGVyTGlzdChcInN1cHBsZW1lbnRhcnlEYXRhXCIsIHNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIHsgdGV4dDogc291cmNlLmxhYmVsLCB1cmw6IHNvdXJjZS51cmwgfTtcbiAgICB9KSk7XG5cbiAgICByZW5kZXJMaXN0KFwiZGF0YVRvb2xzXCIsIHRvb2xzLm1hcChmdW5jdGlvbih0b29sKSB7XG4gICAgICByZXR1cm4geyB0ZXh0OiB0b29sLnRvb2xOYW1lLCB1cmw6IHRvb2wudG9vbFByZXZpZXcgfTtcbiAgICB9KSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJGaW5hbGlzZURlc2NyaXB0b3IoZGVzY3JpcHRvcikge1xuICAgIHZhciB1cmxFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5lTmFtZVwiKTtcbiAgICByZW1vdmVDaGlsZHJlbih1cmxFbGVtKTtcbiAgICB1cmxFbGVtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRlc2NyaXB0b3IubWluZU5hbWUpKTtcblxuICAgIHZhciBwcml2YWN5RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpdmFjeVwiKTtcbiAgICByZW1vdmVDaGlsZHJlbihwcml2YWN5RWxlbSk7XG4gICAgcHJpdmFjeUVsZW0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZGVzY3JpcHRvci5wcml2YWN5KSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0RmluYWxpc2UoKSB7XG4gICAgZmV0Y2hKc29uKHtcbiAgICAgIHBhdGg6IFwiL2NvbmZpZ3VyYXRvci9taW5lL3VzZXItY29uZmlnXCIsXG4gICAgICBwYXJhbXM6IHsgbWluZUlkOiByZWFkTWluZUlkKCkgfVxuICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHJlbmRlckZpbmFsaXNlVXBsb2FkZWRGaWxlcyhkYXRhLmRhdGFGaWxlcyk7XG4gICAgICAgIHJlbmRlckZpbmFsaXNlU3VwcGxlbWVudGFyaWVzKGRhdGEuc3VwcGxlbWVudGFyeURhdGFTb3VyY2VzLCBkYXRhLmRhdGFUb29scyk7XG4gICAgICAgIHJlbmRlckZpbmFsaXNlRGVzY3JpcHRvcihkYXRhLm1pbmVEZXNjcmlwdG9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogRXhwb3J0c1xuICAgKi9cblxuICByZXR1cm4ge1xuICAgIG9wZW5Jbml0aWFsUGFnZTogb3BlbkluaXRpYWxQYWdlLFxuICAgIHJlZ2lzdGVyVXNlcjogcmVnaXN0ZXJVc2VyLFxuICAgIGxvZ2luVXNlcjogbG9naW5Vc2VyLFxuICAgIGxvZ291dFVzZXI6IGxvZ291dFVzZXIsXG4gICAgcmVuZGVyRGFzaGJvYXJkTWluZXM6IHJlbmRlckRhc2hib2FyZE1pbmVzLFxuICAgIGluaXRTdXBwbGVtZW50YXJpZXM6IGluaXRTdXBwbGVtZW50YXJpZXMsXG4gICAgc2F2ZVN1cHBsZW1lbnRhcmllczogc2F2ZVN1cHBsZW1lbnRhcmllcyxcbiAgICByZW5kZXJDaGVja0F2YWlsYWJpbGl0eTogcmVuZGVyQ2hlY2tBdmFpbGFiaWxpdHksXG4gICAgc2F2ZURlc2NyaXB0b3JzOiBzYXZlRGVzY3JpcHRvcnMsXG4gICAgaW5pdEZpbmFsaXNlOiBpbml0RmluYWxpc2VcbiAgfTtcbn0pKCk7XG4iLCIvLyB2YXIgZW5kcG9pbnQgPSBcImh0dHBzOi8vd2l6YXJkLmludGVybWluZS5vcmcvdjFcIjtcbnZhciBlbmRwb2ludCA9IFwiaHR0cDovLzEyNy4wLjAuMTo5OTkxL2FwaS92MVwiO1xuXG4vLyBTaW5jZSBvdXIgc2VydmVyIChub3QgdGhlIEFQSSkgZG9lc24ndCBrbm93IHdoZXRoZXIgdGhlIHVzZXIgaXNcbi8vIGF1dGhlbnRpY2F0ZWQsIGNoZWNraW5nIGZvciB0aGlzIGFuZCBzZW5kaW5nIHRoZW0gdG8gdGhlIGAvcmVnaXN0ZXJgIHBhZ2Vcbi8vIGlzIGEgY29tbW9uIHBhdHRlcm4uIFdlIGNvZGlmeSB0aGlzIGhlcmUsIHNvIHRoYXQgd2UgY2FuIHVzZSBpdCBpbiBvdXJcbi8vIGdlbmVyaWMgcmVxdWVzdCBmdW5jdGlvbnMgYmVsb3cuXG5mdW5jdGlvbiBoYW5kbGVFcnJvclJlc3BvbnNlKHJlcykge1xuICBpZiAocmVzLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgLy8gVGhlIHVzZXIgaXNuJ3QgYXV0aG9yaXplZCwgc28gbWFrZSB0aGVtIHNpZ24gaW4uXG4gICAgb3BlblBhZ2UoXCIvcmVnaXN0ZXJcIik7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihcIllvdSBhcmUgbm90IGF1dGhvcml6ZWQuXCIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXM7XG4gIH1cbn1cblxuLy8gQXJndW1lbnQgY2FuIGJlIGVpdGhlciBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHBhdGggb3IgYW4gb2JqZWN0IHdpdGhcbi8vIGBwYXRoYCBhbmQgYHBhcmFtc2Aga2V5cywgd2hlcmUgcGFyYW1zIGlzIGFuIG9iamVjdCBvZiBzdHJpbmcgZW50cmllcy5cbmZ1bmN0aW9uIHNlcnZpY2UoYXJnKSB7XG4gIGlmICh0eXBlb2YgYXJnID09PSAnb2JqZWN0Jykge1xuICAgIC8vIFdoZW4gd2UgYWRkIHF1ZXJ5IHBhcmFtcywgb3VyIGJhY2tlbmQgd2lsbCBjb21wbGFpbiBpZiB3ZSBkb24ndCBoYXZlIGFcbiAgICAvLyB0cmFpbGluZyBzbGFzaC5cbiAgICB2YXIgcGF0aCA9IGFyZy5wYXRoLnNsaWNlKC0xKSA9PT0gJy8nID8gYXJnLnBhdGggOiBhcmcucGF0aC5jb25jYXQoJy8nKTtcblxuICAgIHZhciB1cmwgPSBuZXcgVVJMKGVuZHBvaW50LmNvbmNhdChwYXRoKSk7XG5cbiAgICBpZiAoJ3BhcmFtcycgaW4gYXJnKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYXJnLnBhcmFtcykge1xuICAgICAgICBpZiAoYXJnLnBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIHZhbCA9IGFyZy5wYXJhbXNba2V5XTtcbiAgICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdXJsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbmRwb2ludC5jb25jYXQoYXJnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmZXRjaEpzb24ocGF0aCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZmV0Y2goc2VydmljZShwYXRoKSwge1xuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChoYW5kbGVFcnJvclJlc3BvbnNlKHJlcykpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwb3N0RGF0YShwYXRoLCBkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmZXRjaChzZXJ2aWNlKHBhdGgpLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KGhhbmRsZUVycm9yUmVzcG9uc2UocmVzKSk7XG4gICAgICB9XG4gICAgfSlcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9wZW5QYWdlKHBhdGgpIHtcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBwYXRoO1xufVxuXG5cbiAgLy8gV3JhcHBpbmcgb3VyIGNhbGxzIHRvIGBzZXNzaW9uU3RvcmFnZWAgY2FuIGJlIHVzZWZ1bCBpbiBjYXNlIHdlIGV2ZXJcbiAgLy8gZGVjaWRlIHRvIHVzZSBhIGRpZmZlcmVudCBmb3JtIG9mIHN0b3JhZ2UsIG9yIGFkZCBzaWRlLWVmZmVjdHMuXG4gIGZ1bmN0aW9uIHNhdmVTdG9yYWdlKGtleSwgdmFsKSB7XG4gICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9hZFN0b3JhZ2Uoa2V5KSB7XG4gICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxuXG5cbmV4cG9ydCB7XG4gIHBvc3REYXRhLCBmZXRjaEpzb24sIHNlcnZpY2UsIG9wZW5QYWdlLCBzYXZlU3RvcmFnZSwgbG9hZFN0b3JhZ2Vcbn1cbiIsImltcG9ydCB7ZmV0Y2hKc29uLCBvcGVuUGFnZX0gZnJvbSBcIi4vY29tbXMuanNcIjtcbmltcG9ydCB7Y3JlYXRlTWluZUlkfSBmcm9tIFwiLi9taW5lSURzLmpzXCI7XG5cbi8qXG4gKiBQYWdlOiBob21lXG4gKi9cblxuZnVuY3Rpb24gb3BlbkluaXRpYWxQYWdlKGV2ZW50KSB7XG4gIGlmIChldmVudCkgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICBmZXRjaEpzb24oXCIvbWluZS9hbGxcIilcbiAgICAudGhlbihmdW5jdGlvbihsaXN0T2ZNaW5lcykge1xuICAgICAgaWYgKGxpc3RPZk1pbmVzLmxlbmd0aCkge1xuICAgICAgICAvLyBXZSBoYXZlIG1pbmVzOyBkaXNwbGF5IHRoZW0gaW4gdGhlIGRhc2hib2FyZCBwYWdlIVxuICAgICAgICBvcGVuUGFnZShcIi9kYXNoYm9hcmRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBkb24ndCBoYXZlIG1pbmVzOyBnZXQgc3RhcnRlZCB3aXRoIHRoZSB3aXphcmQhXG4gICAgICAgIGNyZWF0ZU1pbmVJZCgpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBvcGVuUGFnZShcIi93aXphcmQvdXBsb2FkXCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQge29wZW5Jbml0aWFsUGFnZX07XG4iLCJpbXBvcnQgeyBmZXRjaEpzb24sIHNhdmVTdG9yYWdlLCBsb2FkU3RvcmFnZX0gZnJvbSBcIi4vY29tbXMuanNcIjtcblxuICBmdW5jdGlvbiBjcmVhdGVNaW5lSWQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZmV0Y2hKc29uKFwiL2NvbmZpZ3VyYXRvci9taW5lL3VzZXItY29uZmlnL25ldy9cIilcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24obWluZUlkKSB7XG4gICAgICAgICAgc2F2ZVN0b3JhZ2UoXCJtaW5lSWRcIiwgbWluZUlkKTtcbiAgICAgICAgICByZXNvbHZlKG1pbmVJZCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZE1pbmVJZCgpIHtcbiAgICByZXR1cm4gbG9hZFN0b3JhZ2UoXCJtaW5lSWRcIik7XG4gIH1cblxuICBleHBvcnQge2NyZWF0ZU1pbmVJZCxyZWFkTWluZUlkfVxuIiwiXG5cbmZ1bmN0aW9uIHJlbmRlckFsZXJ0TWVzc2FnZShlbGVtSWQsIHRleHQpIHtcbiAgdmFyIHNwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSWQpO1xuXG4gIHNwYW4uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpO1xufVxuXG5mdW5jdGlvbiBjbGVhckFsZXJ0TWVzc2FnZShlbGVtSWQpIHtcbiAgdmFyIHNwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSWQpO1xuXG4gIHJlbW92ZUNoaWxkcmVuKHNwYW4pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDaGlsZHJlbihub2RlKSB7XG4gIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVwbGFjZVRleHQoZWxlbUlkLCB0ZXh0KSB7XG4gIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKTtcbiAgdmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgcmVtb3ZlQ2hpbGRyZW4oZWxlbSk7XG4gIGVsZW0uYXBwZW5kQ2hpbGQodGV4dCk7XG59XG5cblxuZXhwb3J0IHtcbiAgY2xlYXJBbGVydE1lc3NhZ2UsXG4gIHJlbmRlckFsZXJ0TWVzc2FnZSxcbiAgcmVtb3ZlQ2hpbGRyZW4sXG4gIHJlcGxhY2VUZXh0XG59XG4iLCJpbXBvcnQge2ZldGNoSnNvbixwb3N0RGF0YSwgb3BlblBhZ2UsIHNlcnZpY2V9IGZyb20gXCIuL2NvbW1zLmpzXCI7XG5pbXBvcnQge2NsZWFyQWxlcnRNZXNzYWdlLCByZW5kZXJBbGVydE1lc3NhZ2V9IGZyb20gXCIuL3VpLmpzXCI7XG5pbXBvcnQge29wZW5Jbml0aWFsUGFnZX0gZnJvbSBcIi4vaG9tZS5qc1wiO1xuXG5cbiAgLypcbiAgICogUGFnZTogcmVnaXN0ZXJcbiAgICovXG5cblxuICBmdW5jdGlvbiByZWFkRm9ybShvYmopIHtcbiAgICB2YXIgaW5wdXRzID0ge307XG5cbiAgICBPYmplY3QuZW50cmllcyhvYmouaW5wdXRzKS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIga2V5ID0gZW50cnlbMF07XG4gICAgICB2YXIgdmFsID0gZW50cnlbMV07XG4gICAgICBpbnB1dHNba2V5XSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZhbCkudmFsdWU7XG4gICAgfSk7XG5cbiAgICBjbGVhckFsZXJ0TWVzc2FnZShvYmouYWxlcnRJZCk7XG5cbiAgICB2YXIgZXJyb3IgPSBvYmoudmFsaWRhdGlvbnMuc29tZShmdW5jdGlvbih0ZXN0RnVuKSB7XG4gICAgICB2YXIgcmVzID0gdGVzdEZ1bihpbnB1dHMpO1xuICAgICAgaWYgKHJlcykgcmVuZGVyQWxlcnRNZXNzYWdlKG9iai5hbGVydElkLCByZXMpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KTtcblxuICAgIGlmIChlcnJvcikgcmV0dXJuO1xuICAgIGVsc2UgcmV0dXJuIGlucHV0cztcbiAgfVxuXG4gIHZhciB2YWxpZGF0ZSA9IHtcbiAgICBwYXNzd29yZHNNYXRjaDogZnVuY3Rpb24oaW5wdXRzKSB7XG4gICAgICBpZiAoaW5wdXRzLnBhc3N3b3JkICE9PSBpbnB1dHMucGFzc3dvcmRDb25maXJtKSB7XG4gICAgICAgIHJldHVybiBcIlBhc3N3b3JkcyBkbyBub3QgbWF0Y2guXCI7XG4gICAgICB9XG4gICAgfSxcbiAgICBub3RFbXB0eTogZnVuY3Rpb24oaW5wdXRzKSB7XG4gICAgICBpZiAoT2JqZWN0LnZhbHVlcyhpbnB1dHMpLnNvbWUoZnVuY3Rpb24oaW5wKSB7IHJldHVybiAhaW5wOyB9KSkge1xuICAgICAgICByZXR1cm4gXCJQbGVhc2UgZmlsbCBpbiBhbGwgdGhlIGZpZWxkcy5cIjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJVc2VyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBpbnB1dERhdGEgPSByZWFkRm9ybSh7XG4gICAgICBpbnB1dHM6IHtcbiAgICAgICAgZW1haWw6IFwicmVnaXN0ZXItZW1haWxcIixcbiAgICAgICAgZmlyc3ROYW1lOiBcInJlZ2lzdGVyLWZpcnN0LW5hbWVcIixcbiAgICAgICAgbGFzdE5hbWU6IFwicmVnaXN0ZXItbGFzdC1uYW1lXCIsXG4gICAgICAgIG9yZ2FuaXNhdGlvbjogXCJyZWdpc3Rlci1vcmdhbmlzYXRpb25cIixcbiAgICAgICAgcGFzc3dvcmQ6IFwicmVnaXN0ZXItcGFzc3dvcmRcIixcbiAgICAgICAgcGFzc3dvcmRDb25maXJtOiBcInJlZ2lzdGVyLXBhc3N3b3JkLWNvbmZpcm1cIlxuICAgICAgfSxcbiAgICAgIGFsZXJ0SWQ6IFwicmVnaXN0ZXJGb3JtQWxlcnRcIixcbiAgICAgIHZhbGlkYXRpb25zOiBbXG4gICAgICAgIHZhbGlkYXRlLnBhc3N3b3Jkc01hdGNoLFxuICAgICAgICB2YWxpZGF0ZS5ub3RFbXB0eSxcbiAgICAgIF1cbiAgICB9KTtcblxuICAgIGlmIChpbnB1dERhdGEpIHtcbiAgICAgIHBvc3REYXRhKFwiL3VzZXIvcmVnaXN0ZXJcIiwgaW5wdXREYXRhKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZWdpc3RlclJlcykge1xuICAgICAgICAgIHJlbmRlckFsZXJ0TWVzc2FnZShcImFsZXJ0Ym94XCIsIFwiQWNjb3VudCBjcmVhdGVkIHN1Y2Nlc3NmdWxseS5cIik7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJSZXMpIHtcbiAgICAgICAgICBpZiAoZXJyUmVzIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyUmVzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciBtZXNzYWdlcyBmcm9tIGJhY2tlbmQuXG4gICAgICAgICAgICBlcnJSZXMuanNvbigpXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIHJlbmRlckFsZXJ0TWVzc2FnZShcInJlZ2lzdGVyRm9ybUFsZXJ0XCIsIHJlcy5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBsb2dpblVzZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIGlucHV0RGF0YSA9IHJlYWRGb3JtKHtcbiAgICAgIGlucHV0czoge1xuICAgICAgICBlbWFpbDogXCJzaWduaW4tZW1haWxcIixcbiAgICAgICAgcGFzc3dvcmQ6IFwic2lnbmluLXBhc3N3b3JkXCJcbiAgICAgIH0sXG4gICAgICBhbGVydElkOiBcInNpZ25pbkZvcm1BbGVydFwiLFxuICAgICAgdmFsaWRhdGlvbnM6IFtcbiAgICAgICAgdmFsaWRhdGUubm90RW1wdHksXG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBpZiAoaW5wdXREYXRhKSB7XG4gICAgICBwb3N0RGF0YShcIi91c2VyL2xvZ2luXCIsIGlucHV0RGF0YSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24obG9naW5SZXMpIHtcbiAgICAgICAgICBvcGVuSW5pdGlhbFBhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAvLyBUT0RPIGhhbmRsZSBpbnZhbGlkIGxvZ2luIChJIGRvbid0IHRoaW5rIHRoZSBiYWNrZW5kIGN1cnJlbnRseSBnaXZlc1xuICAgICAgLy8gdXMgYSBsZWdpYmlsZSByZXNwb25zZSB3aGVuIHRoaXMgaGFwcGVucywganVzdCA0MDAgQmFkIFJlcXVlc3QpXG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cblxuZnVuY3Rpb24gbG9nb3V0VXNlcigpIHtcbiAgdmFyIHBhdGggPSBcIi91c2VyL2xvZ291dFwiO1xuICBmZXRjaEpzb24ocGF0aCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICBpZihyZXNwb25zZS5tZXNzYWdlKSB7XG4gICAgICBvcGVuUGFnZShcIi9yZWdpc3RlclwiKTtcbiAgICAgIC8vIHRvZG8gLSBhbHNvIHBvc3Qgc3RhdHVzZSBtZXNzYWdlIHNheWluZyB0aGVyZSBoYXMgYmVlbiBhIHN1Y2Nlc3NmdWxcbiAgICAgIC8vIGxvZ291dC4gQWRkIHNvZW10aGluZyB0byB0aGUgb3BlbnBhZ2UgbWV0aG9kIHRvIHByaW50IHRvIHRoZSBoZWFkZXJcbiAgICAgIC8vIGFsZXJ0Ym94XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbmRlckFsZXJ0TWVzc2FnZShcImFsZXJ0Ym94XCIsIFwiVWhvaCwgcHJvYmxlbSBsb2dnaW5nIG91dCFcIik7XG4gICAgfVxuICB9KTtcbn1cblxuXG5leHBvcnQge2xvZ2luVXNlciwgbG9nb3V0VXNlciwgcmVnaXN0ZXJVc2VyfVxuIl0sInNvdXJjZVJvb3QiOiIifQ==