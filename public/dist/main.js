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
   * Page: wizard/upload
   */

  function renderUploadAlert(text) {
    var alert = document.getElementById("alert");
    removeChildren(alert);
    alert.appendChild(document.createTextNode(text));
  }

  function readUploadData() {
    var fileFormat = document.getElementById("filetype-select").value;

    var organismSelect = document.getElementById("organism-select");
    var taxonID = organismSelect.value;
    var organismName = organismSelect.options[organismSelect.selectedIndex].text;

    if (!fileFormat || !taxonID) {
      throw new Error("Please fill in all the fields.");
    }

    return {
      fileFormat: fileFormat,
      organism: {
        name: organismName,
        taxonID: taxonID
      }
    };
  }

  function uploadFile() {
    var remoteUrl = document.getElementById("remoteFile").value;
    var files = document.getElementById("fileUpload").files;

    if (remoteUrl) {
      // TODO test uploading of remote URLs
      // (I don't think this is handled by our backend yet.)
      postData("/data/file/upload/remote", { remoteUrl: remoteUrl })
        .then(function(res) {
          Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["openPage"])("/wizard/mapColumns");
        });
    } else if (files.length) {
      var file = files[0];

      var formData = new FormData();
      formData.append("dataFile", file);

      var url = Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["service"])({
        path: "/data/file/upload/",
        params: { mineId: readMineId() }
      });

      fetch(url, {
        method: "POST",
        body: formData,
        credentials: 'include'
      }).then(function(res) {
        return res.text();
      }).then(function(fileId) {
        var fileName = files[0].name;

        try {
          var fileObj = readUploadData();
          fileObj.name = fileName;
          fileObj.fileId = fileId;

          saveStorage("currentFile", JSON.stringify(fileObj));
          Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["openPage"])("/wizard/mapColumns");
        } catch(err) {
          renderUploadAlert(err.message);
        }
      }).catch(function(err) {
        renderUploadAlert("Failed to upload file.");
      });
    } else {
      renderUploadAlert("Please specify a file to upload.");
    }
  }

  /*
   * Page: wizard/mapColumns
   */

  function renderDataPreview(dataFile, filePreview) {
    replaceText("uploadTitle", "Upload: ".concat(dataFile.name));

    replaceText("previewHeaderLabel", filePreview.headerLabel);
    replaceText("previewHeaderRow", filePreview.headerRow[0].join(' | '));
    replaceText("previewSnippetLabel", filePreview.snippetLabel);
    replaceText("previewFileSnippet", filePreview.fileSnippet);
  }

  function renderDataDescriptors(descriptors) {
    var node = document.getElementById("descriptors");

    descriptors.forEach(function(item) {
      var li = document.createElement("li");
      var span = document.createElement("span");
      span.className = "title";
      var name = document.createTextNode(item.attributeName);
      var value = document.createTextNode(item.attributeValue);
      span.appendChild(name);
      li.appendChild(span);
      li.appendChild(value);
      node.appendChild(li);
    });
  }

  var questionsStore = [];

  function renderDataQuestions(questions) {
    var node = document.getElementById("questions");

    questionsStore = [];

    questions.forEach(function(item) {
      var li = document.createElement("li");

      var h5 = document.createElement("h5");
      h5.appendChild(document.createTextNode(item.questionHeader));

      var p = document.createElement("p");
      p.appendChild(document.createTextNode(item.questionWording));

      var form = document.createElement("form");

      item.possibleAnswers.forEach(function(answer) {
        var label = document.createElement("label");

        var input = document.createElement("input");
        input.type = "radio";
        input.checked = answer.isDefault;
        input.value = answer.answerId;
        input.name = item.questionId;

        label.appendChild(input);
        label.appendChild(document.createTextNode(answer.answerLabel))

        form.appendChild(label);
      });

      questionsStore.push(item.questionId);

      li.appendChild(h5);
      li.appendChild(p);
      li.appendChild(form);

      node.appendChild(li);
    });
  }

  function initMapColumns() {
    postData({
      path: "/configurator/file/properties/detect",
      params: {
        mineId: readMineId(),
        userId: ''
      }
    }, { fileId: "TODO" })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        renderDataPreview(data.dataFile, data.filePreview);
        renderDataDescriptors(data.descriptors);
        renderDataQuestions(data.questions);
      });
  }

  function saveMapColumns() {
    var answers = questionsStore.map(function(questionId) {
      var answerId = document.querySelector(
        'input[name="' + questionId + '"]:checked'
      ).value;

      return {
        questionId: questionId,
        answerId: answerId
      }
    });

    postData({
      path: "/configurator/file/properties/save",
      params: { mineId: readMineId() }
    }, { fileID: "TODO", answers: answers })
      .then(function(res) {
        Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["openPage"])("/wizard/supplementaryData");
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
    uploadFile: uploadFile,
    initMapColumns: initMapColumns,
    saveMapColumns: saveMapColumns,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aXphcmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL2NsaWVudC5qcyIsIndlYnBhY2s6Ly93aXphcmQvLi9wdWJsaWMvanMvY29tbXMuanMiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL2hvbWUuanMiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL21pbmVJRHMuanMiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL3VpLmpzIiwid2VicGFjazovL3dpemFyZC8uL3B1YmxpYy9qcy91c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQWtFO0FBQ0o7QUFDcEI7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDBEQUFRO0FBQ2Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLHlEQUFPO0FBQ25CO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxZQUFZLHlEQUFPO0FBQ25CO0FBQ0Esa0JBQWtCLHFDQUFxQztBQUN2RDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7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O0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLElBQUksZ0VBQWlCOztBQUVyQjtBQUNBO0FBQ0EsZUFBZSxpRUFBa0I7QUFDakM7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esb0RBQW9ELGFBQWEsRUFBRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxNQUFNLDBEQUFRO0FBQ2Q7QUFDQSxVQUFVLGlFQUFrQjtBQUM1QixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixpRUFBa0I7QUFDbEMsZUFBZTtBQUNmO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxNQUFNLDBEQUFRO0FBQ2Q7QUFDQSxVQUFVLGdFQUFlO0FBQ3pCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLEVBQUUsMkRBQVM7QUFDWDtBQUNBO0FBQ0EsTUFBTSwwREFBUTtBQUNkO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxNQUFNLGlFQUFrQjtBQUN4QjtBQUNBLEdBQUc7QUFDSDs7O0FBRzRDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3B1YmxpYy9qcy9jbGllbnQuanNcIik7XG4iLCJpbXBvcnQge3Bvc3REYXRhLCBmZXRjaEpzb24sIHNlcnZpY2UsIG9wZW5QYWdlfSBmcm9tIFwiLi9jb21tcy5qc1wiO1xuaW1wb3J0IHtsb2dpblVzZXIsIGxvZ291dFVzZXIscmVnaXN0ZXJVc2VyIH0gZnJvbSBcIi4vdXNlci5qc1wiO1xuaW1wb3J0IHtvcGVuSW5pdGlhbFBhZ2V9IGZyb20gXCIuL2hvbWUuanNcIjtcblxuLyogUG9zc2libGUgcG9seWZpbGxzIHdlJ2xsIHdhbnQ6XG4gKiAtIEZldGNoXG4gKiAtIFByb21pc2UuXG4gKiAtIFVSTCBzZWFyY2hQYXJhbXMuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uKCkge1xuXG4gIGZ1bmN0aW9uIHJlbW92ZUNoaWxkcmVuKG5vZGUpIHtcbiAgICB3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XG4gICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZVRleHQoZWxlbUlkLCB0ZXh0KSB7XG4gICAgdmFyIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSWQpO1xuICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gICAgcmVtb3ZlQ2hpbGRyZW4oZWxlbSk7XG4gICAgZWxlbS5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgfVxuXG4gIC8vIFNpbmNlIG91ciBzZXJ2ZXIgKG5vdCB0aGUgQVBJKSBkb2Vzbid0IGtub3cgd2hldGhlciB0aGUgdXNlciBpc1xuICAvLyBhdXRoZW50aWNhdGVkLCBjaGVja2luZyBmb3IgdGhpcyBhbmQgc2VuZGluZyB0aGVtIHRvIHRoZSBgL3JlZ2lzdGVyYCBwYWdlXG4gIC8vIGlzIGEgY29tbW9uIHBhdHRlcm4uIFdlIGNvZGlmeSB0aGlzIGhlcmUsIHNvIHRoYXQgd2UgY2FuIHVzZSBpdCBpbiBvdXJcbiAgLy8gZ2VuZXJpYyByZXF1ZXN0IGZ1bmN0aW9ucyBiZWxvdy5cbiAgZnVuY3Rpb24gaGFuZGxlRXJyb3JSZXNwb25zZShyZXMpIHtcbiAgICBpZiAocmVzLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAvLyBUaGUgdXNlciBpc24ndCBhdXRob3JpemVkLCBzbyBtYWtlIHRoZW0gc2lnbiBpbi5cbiAgICAgIG9wZW5QYWdlKFwiL3JlZ2lzdGVyXCIpO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIllvdSBhcmUgbm90IGF1dGhvcml6ZWQuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZldGNoSnNvbihwYXRoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZmV0Y2goc2VydmljZShwYXRoKSwge1xuICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGhhbmRsZUVycm9yUmVzcG9uc2UocmVzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwb3N0RGF0YShwYXRoLCBkYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZmV0Y2goc2VydmljZShwYXRoKSwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChoYW5kbGVFcnJvclJlc3BvbnNlKHJlcykpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pO1xuICB9XG5cblxuICAvKlxuICAgKiBQYWdlOiBkYXNoYm9hcmRcbiAgICovXG5cbiAgZnVuY3Rpb24gb3BlbkluUHJvZ3Jlc3NNaW5lKG1pbmUpIHtcbiAgICAvLyBUT0RPXG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJJblByb2dyZXNzTWluZShtaW5lKSB7XG4gICAgdmFyIGNvbnRhaW5lckxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICAgIHZhciBzdGF0dXNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzdGF0dXNEaXYuY2xhc3NOYW1lID0gXCJzdGF0dXMgY29uc3RydWN0aW9uXCI7XG4gICAgdmFyIHN0YXR1c1N2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgIHN0YXR1c1N2Zy5jbGFzc05hbWUgPSBcImljb24gaWNvbi1idWlsZGluZ1wiO1xuICAgIHZhciBzdGF0dXNVc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1c2UnKTtcbiAgICBzdGF0dXNVc2VbJ3hsaW5rOmhyZWYnXSA9IFwiI2ljb24tYnVpbGRpbmdcIjtcbiAgICB2YXIgc3RhdHVzUCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblxuICAgIHN0YXR1c1AuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJJbmNvbXBsZXRlXCIpKTtcbiAgICBzdGF0dXNTdmcuYXBwZW5kQ2hpbGQoc3RhdHVzVXNlKTtcbiAgICBzdGF0dXNEaXYuYXBwZW5kQ2hpbGQoc3RhdHVzU3ZnKTtcbiAgICBzdGF0dXNEaXYuYXBwZW5kQ2hpbGQoc3RhdHVzUCk7XG4gICAgY29udGFpbmVyTGkuYXBwZW5kQ2hpbGQoc3RhdHVzRGl2KTtcblxuICAgIHZhciBuYW1lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIG5hbWVBID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIG5hbWVBLmhyZWYgPSBtaW5lLm1pbmVsb2NhdGlvbjtcblxuICAgIG5hbWVBLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1pbmUubWluZU5hbWUuY29uY2F0KFwiIHdvcmsgaW4gcHJvZ3Jlc3NcIikpKTtcbiAgICBuYW1lRGl2LmFwcGVuZENoaWxkKG5hbWVBKTtcbiAgICBjb250YWluZXJMaS5hcHBlbmRDaGlsZChuYW1lRGl2KTtcblxuICAgIHZhciBhY3Rpb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYWN0aW9uc0Rpdi5jbGFzc05hbWUgPSBcImNvbnRpbnVlLXdpemFyZFwiO1xuXG4gICAgdmFyIGFjdGlvbnNVcHBlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBhY3Rpb25zVXBwZXJBID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGFjdGlvbnNVcHBlckEub25jbGljayA9IG9wZW5JblByb2dyZXNzTWluZShtaW5lKTtcbiAgICBhY3Rpb25zVXBwZXJBLmNsYXNzTmFtZSA9IFwicmVzdW1lXCI7XG4gICAgdmFyIGFjdGlvbnNVcHBlclN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgIGFjdGlvbnNVcHBlclN2Zy5jbGFzc05hbWUgPSBcImljb24gaWNvbi1yZXN1bWVcIjtcbiAgICB2YXIgYWN0aW9uc1VwcGVyVXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndXNlJyk7XG4gICAgYWN0aW9uc1VwcGVyVXNlWyd4bGluazpocmVmJ10gPSBcIiNpY29uLXJlc3VtZVwiO1xuXG4gICAgYWN0aW9uc1VwcGVyU3ZnLmFwcGVuZENoaWxkKGFjdGlvbnNVcHBlclVzZSk7XG4gICAgYWN0aW9uc1VwcGVyQS5hcHBlbmRDaGlsZChhY3Rpb25zVXBwZXJTdmcpO1xuICAgIGFjdGlvbnNVcHBlckEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJDb250aW51ZSBzZXR1cFwiKSk7XG4gICAgYWN0aW9uc1VwcGVyRGl2LmFwcGVuZENoaWxkKGFjdGlvbnNVcHBlckEpO1xuICAgIGFjdGlvbnNEaXYuYXBwZW5kQ2hpbGQoYWN0aW9uc1VwcGVyRGl2KTtcblxuICAgIHZhciBhY3Rpb25zTG93ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgYWN0aW9uc0xvd2VyQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhY3Rpb25zTG93ZXJBLmhyZWYgPSBcIiNcIjtcbiAgICBhY3Rpb25zTG93ZXJBLmNsYXNzTmFtZSA9IFwiZGlzY2FyZFwiO1xuICAgIHZhciBhY3Rpb25zTG93ZXJTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICBhY3Rpb25zTG93ZXJTdmcuY2xhc3NOYW1lID0gXCJpY29uIGljb24tY2FuY2VsXCI7XG4gICAgdmFyIGFjdGlvbnNMb3dlclVzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VzZScpO1xuICAgIGFjdGlvbnNMb3dlclVzZVsneGxpbms6aHJlZiddID0gXCIjaWNvbi1jYW5jZWxcIjtcblxuICAgIGFjdGlvbnNMb3dlclN2Zy5hcHBlbmRDaGlsZChhY3Rpb25zTG93ZXJVc2UpO1xuICAgIGFjdGlvbnNMb3dlckEuYXBwZW5kQ2hpbGQoYWN0aW9uc0xvd2VyU3ZnKTtcbiAgICBhY3Rpb25zTG93ZXJBLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiRGlzY2FyZFwiKSk7XG4gICAgYWN0aW9uc0xvd2VyRGl2LmFwcGVuZENoaWxkKGFjdGlvbnNMb3dlckEpO1xuICAgIGFjdGlvbnNEaXYuYXBwZW5kQ2hpbGQoYWN0aW9uc0xvd2VyRGl2KTtcblxuICAgIGNvbnRhaW5lckxpLmFwcGVuZENoaWxkKGFjdGlvbnNEaXYpO1xuXG4gICAgdmFyIGNvbXBsZXRlQnlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21wbGV0ZUJ5RGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1pbmUuZXRhRGF0ZSkpO1xuXG4gICAgY29udGFpbmVyTGkuYXBwZW5kQ2hpbGQoY29tcGxldGVCeURpdik7XG5cbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW4tcHJvZ3Jlc3MtbWluZXNcIik7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChjb250YWluZXJMaSk7XG4gIH1cbiAgLy8gV2h5IGlzIHRoZSBhYm92ZSB3cml0dGVuIHdpdGggYXBwZW5kQ2hpbGQgYW5kIHRoZSBiZWxvdyB3aXRoIGlubmVySFRNTD9cbiAgLy8gRm9yIHRoZSBqb3kgb2YgY29tcGFyaXNvbiBvZiBjb3Vyc2UhXG4gIGZ1bmN0aW9uIHJlbmRlclJ1bm5pbmdNaW5lKG1pbmUpIHtcbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPVxuICAgICAgJzxkaXYgY2xhc3M9XCJzdGF0dXMgYWN0aXZlXCI+JyArXG4gICAgICAgICc8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWNoZWNrbWFya1wiPicgK1xuICAgICAgICAgICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jaGVja21hcmtcIj48L3VzZT4nICtcbiAgICAgICAgJzwvc3ZnPicgK1xuICAgICAgICAnPHA+QWN0aXZlPC9wPicgK1xuICAgICAgJzwvZGl2PicgK1xuICAgICAgJzxkaXY+PGEgaHJlZj1cIicgKyBtaW5lLm1pbmVsb2NhdGlvbiArICdcIj4nICsgbWluZS5taW5lTmFtZSArICc8L2E+PC9kaXY+JyArXG4gICAgICAnPGRpdiBjbGFzcz1cIm1pbmUtY29uZmlnXCI+JyArXG4gICAgICAgICc8YSBocmVmPVwiY29uZmlnXCI+JyArXG4gICAgICAgICAgJzxzdmcgY2xhc3M9XCJpY29uIGljb24tdmlld1wiPicgK1xuICAgICAgICAgICAgJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXZpZXdcIj48L3VzZT4nICtcbiAgICAgICAgICAnPC9zdmc+JyArXG4gICAgICAgICAgJ1ZpZXcnICtcbiAgICAgICAgJzwvYT4nICtcbiAgICAgICAgJzxhIGhyZWY9XCIjXCI+JyArXG4gICAgICAgICAgJzxzdmcgY2xhc3M9XCJpY29uIGljb24tZG93bmxvYWRcIj4nICtcbiAgICAgICAgICAgICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kb3dubG9hZFwiPjwvdXNlPicgK1xuICAgICAgICAgICc8L3N2Zz4nICtcbiAgICAgICAgICAnRXhwb3J0JyArXG4gICAgICAgICc8L2E+JyArXG4gICAgICAnPC9kaXY+JyArXG4gICAgICAnPGRpdiBjbGFzcz1cIm1pbmUtdHJvdWJsZXNob290aW5nXCI+JyArXG4gICAgICAgICc8YSBocmVmPVwiI1wiPiBEZWxldGU8L2E+JyArXG4gICAgICAnPC9kaXY+JztcblxuICAgIHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJydW5uaW5nLW1pbmVzXCIpO1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckRhc2hib2FyZE1pbmVzKCkge1xuICAgIGZldGNoSnNvbihcIi9taW5lL2FsbFwiKVxuICAgICAgLnRoZW4oZnVuY3Rpb24obGlzdE9mTWluZXMpIHtcbiAgICAgICAgbGlzdE9mTWluZXMuZm9yRWFjaChmdW5jdGlvbihtaW5lKSB7XG4gICAgICAgICAgaWYgKG1pbmUubWluZVN0YXR1cyA9PT0gXCJpbiBwcm9ncmVzc1wiKSB7XG4gICAgICAgICAgICByZW5kZXJJblByb2dyZXNzTWluZShtaW5lKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1pbmUubWluZVN0YXR1cyA9PT0gXCJydW5uaW5nXCIpIHtcbiAgICAgICAgICAgIHJlbmRlclJ1bm5pbmdNaW5lKG1pbmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIFBhZ2U6IHdpemFyZC91cGxvYWRcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVuZGVyVXBsb2FkQWxlcnQodGV4dCkge1xuICAgIHZhciBhbGVydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWxlcnRcIik7XG4gICAgcmVtb3ZlQ2hpbGRyZW4oYWxlcnQpO1xuICAgIGFsZXJ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRVcGxvYWREYXRhKCkge1xuICAgIHZhciBmaWxlRm9ybWF0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWxldHlwZS1zZWxlY3RcIikudmFsdWU7XG5cbiAgICB2YXIgb3JnYW5pc21TZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9yZ2FuaXNtLXNlbGVjdFwiKTtcbiAgICB2YXIgdGF4b25JRCA9IG9yZ2FuaXNtU2VsZWN0LnZhbHVlO1xuICAgIHZhciBvcmdhbmlzbU5hbWUgPSBvcmdhbmlzbVNlbGVjdC5vcHRpb25zW29yZ2FuaXNtU2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHQ7XG5cbiAgICBpZiAoIWZpbGVGb3JtYXQgfHwgIXRheG9uSUQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBmaWxsIGluIGFsbCB0aGUgZmllbGRzLlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZmlsZUZvcm1hdDogZmlsZUZvcm1hdCxcbiAgICAgIG9yZ2FuaXNtOiB7XG4gICAgICAgIG5hbWU6IG9yZ2FuaXNtTmFtZSxcbiAgICAgICAgdGF4b25JRDogdGF4b25JRFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB1cGxvYWRGaWxlKCkge1xuICAgIHZhciByZW1vdGVVcmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlbW90ZUZpbGVcIikudmFsdWU7XG4gICAgdmFyIGZpbGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWxlVXBsb2FkXCIpLmZpbGVzO1xuXG4gICAgaWYgKHJlbW90ZVVybCkge1xuICAgICAgLy8gVE9ETyB0ZXN0IHVwbG9hZGluZyBvZiByZW1vdGUgVVJMc1xuICAgICAgLy8gKEkgZG9uJ3QgdGhpbmsgdGhpcyBpcyBoYW5kbGVkIGJ5IG91ciBiYWNrZW5kIHlldC4pXG4gICAgICBwb3N0RGF0YShcIi9kYXRhL2ZpbGUvdXBsb2FkL3JlbW90ZVwiLCB7IHJlbW90ZVVybDogcmVtb3RlVXJsIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIG9wZW5QYWdlKFwiL3dpemFyZC9tYXBDb2x1bW5zXCIpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGZpbGVzLmxlbmd0aCkge1xuICAgICAgdmFyIGZpbGUgPSBmaWxlc1swXTtcblxuICAgICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoXCJkYXRhRmlsZVwiLCBmaWxlKTtcblxuICAgICAgdmFyIHVybCA9IHNlcnZpY2Uoe1xuICAgICAgICBwYXRoOiBcIi9kYXRhL2ZpbGUvdXBsb2FkL1wiLFxuICAgICAgICBwYXJhbXM6IHsgbWluZUlkOiByZWFkTWluZUlkKCkgfVxuICAgICAgfSk7XG5cbiAgICAgIGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBib2R5OiBmb3JtRGF0YSxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy50ZXh0KCk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKGZpbGVJZCkge1xuICAgICAgICB2YXIgZmlsZU5hbWUgPSBmaWxlc1swXS5uYW1lO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIGZpbGVPYmogPSByZWFkVXBsb2FkRGF0YSgpO1xuICAgICAgICAgIGZpbGVPYmoubmFtZSA9IGZpbGVOYW1lO1xuICAgICAgICAgIGZpbGVPYmouZmlsZUlkID0gZmlsZUlkO1xuXG4gICAgICAgICAgc2F2ZVN0b3JhZ2UoXCJjdXJyZW50RmlsZVwiLCBKU09OLnN0cmluZ2lmeShmaWxlT2JqKSk7XG4gICAgICAgICAgb3BlblBhZ2UoXCIvd2l6YXJkL21hcENvbHVtbnNcIik7XG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgcmVuZGVyVXBsb2FkQWxlcnQoZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgcmVuZGVyVXBsb2FkQWxlcnQoXCJGYWlsZWQgdG8gdXBsb2FkIGZpbGUuXCIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbmRlclVwbG9hZEFsZXJ0KFwiUGxlYXNlIHNwZWNpZnkgYSBmaWxlIHRvIHVwbG9hZC5cIik7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogUGFnZTogd2l6YXJkL21hcENvbHVtbnNcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVuZGVyRGF0YVByZXZpZXcoZGF0YUZpbGUsIGZpbGVQcmV2aWV3KSB7XG4gICAgcmVwbGFjZVRleHQoXCJ1cGxvYWRUaXRsZVwiLCBcIlVwbG9hZDogXCIuY29uY2F0KGRhdGFGaWxlLm5hbWUpKTtcblxuICAgIHJlcGxhY2VUZXh0KFwicHJldmlld0hlYWRlckxhYmVsXCIsIGZpbGVQcmV2aWV3LmhlYWRlckxhYmVsKTtcbiAgICByZXBsYWNlVGV4dChcInByZXZpZXdIZWFkZXJSb3dcIiwgZmlsZVByZXZpZXcuaGVhZGVyUm93WzBdLmpvaW4oJyB8ICcpKTtcbiAgICByZXBsYWNlVGV4dChcInByZXZpZXdTbmlwcGV0TGFiZWxcIiwgZmlsZVByZXZpZXcuc25pcHBldExhYmVsKTtcbiAgICByZXBsYWNlVGV4dChcInByZXZpZXdGaWxlU25pcHBldFwiLCBmaWxlUHJldmlldy5maWxlU25pcHBldCk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJEYXRhRGVzY3JpcHRvcnMoZGVzY3JpcHRvcnMpIHtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRvcnNcIik7XG5cbiAgICBkZXNjcmlwdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIHZhciBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICBzcGFuLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcbiAgICAgIHZhciBuYW1lID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbS5hdHRyaWJ1dGVOYW1lKTtcbiAgICAgIHZhciB2YWx1ZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGl0ZW0uYXR0cmlidXRlVmFsdWUpO1xuICAgICAgc3Bhbi5hcHBlbmRDaGlsZChuYW1lKTtcbiAgICAgIGxpLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQodmFsdWUpO1xuICAgICAgbm9kZS5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgcXVlc3Rpb25zU3RvcmUgPSBbXTtcblxuICBmdW5jdGlvbiByZW5kZXJEYXRhUXVlc3Rpb25zKHF1ZXN0aW9ucykge1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxdWVzdGlvbnNcIik7XG5cbiAgICBxdWVzdGlvbnNTdG9yZSA9IFtdO1xuXG4gICAgcXVlc3Rpb25zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXG4gICAgICB2YXIgaDUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDVcIik7XG4gICAgICBoNS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtLnF1ZXN0aW9uSGVhZGVyKSk7XG5cbiAgICAgIHZhciBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBwLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGl0ZW0ucXVlc3Rpb25Xb3JkaW5nKSk7XG5cbiAgICAgIHZhciBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG5cbiAgICAgIGl0ZW0ucG9zc2libGVBbnN3ZXJzLmZvckVhY2goZnVuY3Rpb24oYW5zd2VyKSB7XG4gICAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcblxuICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGlucHV0LnR5cGUgPSBcInJhZGlvXCI7XG4gICAgICAgIGlucHV0LmNoZWNrZWQgPSBhbnN3ZXIuaXNEZWZhdWx0O1xuICAgICAgICBpbnB1dC52YWx1ZSA9IGFuc3dlci5hbnN3ZXJJZDtcbiAgICAgICAgaW5wdXQubmFtZSA9IGl0ZW0ucXVlc3Rpb25JZDtcblxuICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGFuc3dlci5hbnN3ZXJMYWJlbCkpXG5cbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICB9KTtcblxuICAgICAgcXVlc3Rpb25zU3RvcmUucHVzaChpdGVtLnF1ZXN0aW9uSWQpO1xuXG4gICAgICBsaS5hcHBlbmRDaGlsZChoNSk7XG4gICAgICBsaS5hcHBlbmRDaGlsZChwKTtcbiAgICAgIGxpLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgICBub2RlLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRNYXBDb2x1bW5zKCkge1xuICAgIHBvc3REYXRhKHtcbiAgICAgIHBhdGg6IFwiL2NvbmZpZ3VyYXRvci9maWxlL3Byb3BlcnRpZXMvZGV0ZWN0XCIsXG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgbWluZUlkOiByZWFkTWluZUlkKCksXG4gICAgICAgIHVzZXJJZDogJydcbiAgICAgIH1cbiAgICB9LCB7IGZpbGVJZDogXCJUT0RPXCIgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHJlbmRlckRhdGFQcmV2aWV3KGRhdGEuZGF0YUZpbGUsIGRhdGEuZmlsZVByZXZpZXcpO1xuICAgICAgICByZW5kZXJEYXRhRGVzY3JpcHRvcnMoZGF0YS5kZXNjcmlwdG9ycyk7XG4gICAgICAgIHJlbmRlckRhdGFRdWVzdGlvbnMoZGF0YS5xdWVzdGlvbnMpO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzYXZlTWFwQ29sdW1ucygpIHtcbiAgICB2YXIgYW5zd2VycyA9IHF1ZXN0aW9uc1N0b3JlLm1hcChmdW5jdGlvbihxdWVzdGlvbklkKSB7XG4gICAgICB2YXIgYW5zd2VySWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnaW5wdXRbbmFtZT1cIicgKyBxdWVzdGlvbklkICsgJ1wiXTpjaGVja2VkJ1xuICAgICAgKS52YWx1ZTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcXVlc3Rpb25JZDogcXVlc3Rpb25JZCxcbiAgICAgICAgYW5zd2VySWQ6IGFuc3dlcklkXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBwb3N0RGF0YSh7XG4gICAgICBwYXRoOiBcIi9jb25maWd1cmF0b3IvZmlsZS9wcm9wZXJ0aWVzL3NhdmVcIixcbiAgICAgIHBhcmFtczogeyBtaW5lSWQ6IHJlYWRNaW5lSWQoKSB9XG4gICAgfSwgeyBmaWxlSUQ6IFwiVE9ET1wiLCBhbnN3ZXJzOiBhbnN3ZXJzIH0pXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgb3BlblBhZ2UoXCIvd2l6YXJkL3N1cHBsZW1lbnRhcnlEYXRhXCIpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBQYWdlOiB3aXphcmQvc3VwcGxlbWVudGFyeURhdGFcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVuZGVyU3VwcGxlbWVudGFyeURhdGEoKSB7XG4gICAgZmV0Y2hKc29uKFwiL2NvbmZpZ3VyYXRvci9zdXBwbGVtZW50YXJ5RGF0YVNvdXJjZXNcIilcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGFTb3VyY2VzKSB7XG4gICAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdXBwbGVtZW50YXJ5RGF0YVNvdXJjZXNcIik7XG5cbiAgICAgICAgcmVtb3ZlQ2hpbGRyZW4obm9kZSk7XG5cbiAgICAgICAgZGF0YVNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgICAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblxuICAgICAgICAgIGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgICAgaW5wdXQudmFsdWUgPSBzb3VyY2UuaWQ7XG4gICAgICAgICAgaW5wdXQubmFtZSA9IFwic3VwcGxlbWVudGFyeVwiO1xuICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSBcImNoZWNrZWRcIlxuXG4gICAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHNvdXJjZS5sYWJlbCkpO1xuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGxhYmVsKTtcblxuICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyRGF0YVRvb2xzKCkge1xuICAgIGZldGNoSnNvbihcIi9jb25maWd1cmF0b3IvZGF0YVRvb2xzXCIpXG4gICAgICAudGhlbihmdW5jdGlvbih0b29scykge1xuICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0YVRvb2xzXCIpO1xuXG4gICAgICAgIHJlbW92ZUNoaWxkcmVuKG5vZGUpO1xuXG4gICAgICAgIHRvb2xzLmZvckVhY2goZnVuY3Rpb24odG9vbCkge1xuICAgICAgICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgICAgICAgIHZhciBoMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgICBoMy5jbGFzc05hbWUgPSBcInN1YkhlYWRlclwiO1xuICAgICAgICAgIGgzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRvb2wudG9vbE5hbWUpKTtcblxuICAgICAgICAgIHZhciBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgcC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0b29sLnRvb2xEZXNjcmlwdGlvbikpO1xuXG4gICAgICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuXG4gICAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgIGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgICAgaW5wdXQudmFsdWUgPSB0b29sLnRvb2xJZDtcbiAgICAgICAgICBpbnB1dC5uYW1lID0gXCJ0b29sXCI7XG4gICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IFwiY2hlY2tlZFwiO1xuXG4gICAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiRW5hYmxlZFwiKSk7XG5cbiAgICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJpbWFnZVByZXZpZXdcIjtcblxuICAgICAgICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgIGltZy5zcmMgPSB0b29sLnRvb2xQcmV2aWV3O1xuXG4gICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGltZyk7XG5cbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChoMyk7XG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQocCk7XG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGRpdik7XG5cbiAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRTdXBwbGVtZW50YXJpZXMoKSB7XG4gICAgcmVuZGVyU3VwcGxlbWVudGFyeURhdGEoKTtcbiAgICByZW5kZXJEYXRhVG9vbHMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENoZWNrZWROYW1lcyhuYW1lKSB7XG4gICAgdmFyIGNoZWNrZWQgPSBbXTtcblxuICAgIHZhciBjaGVja2JveGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUobmFtZSk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoZWNrYm94ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjaGVja2JveGVzW2ldLmNoZWNrZWQpIHtcbiAgICAgICAgY2hlY2tlZC5wdXNoKGNoZWNrYm94ZXNbaV0udmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjaGVja2VkO1xuICB9XG5cbiAgZnVuY3Rpb24gc2F2ZVN1cHBsZW1lbnRhcnlEYXRhU291cmNlcygpIHtcbiAgICB2YXIgY2hlY2tlZCA9IGdldENoZWNrZWROYW1lcyhcInN1cHBsZW1lbnRhcnlcIik7XG5cbiAgICByZXR1cm4gcG9zdERhdGEoe1xuICAgICAgcGF0aDogXCIvY29uZmlndXJhdG9yL21pbmUvc3VwcGxlbWVudGFyeURhdGFTb3VyY2VzXCIsXG4gICAgICBwYXJhbXM6IHsgbWluZUlkOiByZWFkTWluZUlkKCkgfVxuICAgIH0sIHsgc291cmNlczogY2hlY2tlZCB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhdmVEYXRhVG9vbHMoKSB7XG4gICAgdmFyIGNoZWNrZWQgPSBnZXRDaGVja2VkTmFtZXMoXCJ0b29sXCIpO1xuXG4gICAgcmV0dXJuIHBvc3REYXRhKHtcbiAgICAgIHBhdGg6IFwiL2NvbmZpZ3VyYXRvci9taW5lL2RhdGFUb29sc1wiLFxuICAgICAgcGFyYW1zOiB7IG1pbmVJZDogcmVhZE1pbmVJZCgpIH1cbiAgICB9LCB7IHRvb2xzOiBjaGVja2VkIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2F2ZVN1cHBsZW1lbnRhcmllcygpIHtcbiAgICBQcm9taXNlLmFsbChbXG4gICAgICBzYXZlU3VwcGxlbWVudGFyeURhdGFTb3VyY2VzKCksXG4gICAgICBzYXZlRGF0YVRvb2xzKClcbiAgICBdKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgb3BlblBhZ2UoXCIvd2l6YXJkL2NvbmZpZ1wiKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIFBhZ2U6IHdpemFyZC9jb25maWdcbiAgICovXG5cbiAgdmFyIG1pbmVBdmFpbGFiaWxpdHlUaW1lcjtcblxuICBmdW5jdGlvbiByZW5kZXJDaGVja0F2YWlsYWJpbGl0eShldmVudCkge1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQobWluZUF2YWlsYWJpbGl0eVRpbWVyKTtcblxuICAgIG1pbmVBdmFpbGFiaWxpdHlUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcG9zdERhdGEoXCIvbWluZS9uYW1lQXZhaWxhYmlsaXR5XCIsIHsgbWluZU5hbWU6IGV2ZW50LnRhcmdldC52YWx1ZSB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIHZhciBpY29uTmFtZSA9IGRhdGEuaXNBdmFpbGFibGUgPyBcImNoZWNrbWFya1wiIDogXCJjcm9zc1wiO1xuICAgICAgICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXG4gICAgICAgICAgICBkYXRhLmlzQXZhaWxhYmxlXG4gICAgICAgICAgICAgID8gXCJUaGlzIHByb2plY3QgbmFtZSBpcyBmcmVlIVwiXG4gICAgICAgICAgICAgIDogXCJUaGlzIHByb2plY3QgbmFtZSBpcyB0YWtlbi5cIlxuICAgICAgICAgICk7XG5cbiAgICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmFsaWRhdGlvblwiKTtcblxuICAgICAgICAgIHZhciBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3ZnXCIpO1xuICAgICAgICAgIHN2Zy5jbGFzc05hbWUgPSBcImljb24gaWNvbi1cIi5jb25jYXQoaWNvbk5hbWUpO1xuXG4gICAgICAgICAgdmFyIHVzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1c2VcIik7XG4gICAgICAgICAgdXNlWyd4bGluazpocmVmJ10gPSBcIiNpY29uLVwiLmNvbmNhdChpY29uTmFtZSk7XG5cbiAgICAgICAgICBzdmcuYXBwZW5kQ2hpbGQodXNlKTtcblxuICAgICAgICAgIHJlbW92ZUNoaWxkcmVuKG5vZGUpO1xuXG4gICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChzdmcpO1xuICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgICAgIH0pO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBmdW5jdGlvbiBzYXZlRGVzY3JpcHRvcnMoKSB7XG4gICAgdmFyIG1pbmVOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5lTmFtZUlucHV0XCIpLnZhbHVlO1xuXG4gICAgdmFyIHByaXZhY3kgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJ2lucHV0W25hbWU9XCJwdWJsaWNQcml2YXRlXCJdOmNoZWNrZWQnXG4gICAgKS52YWx1ZTtcblxuICAgIHBvc3REYXRhKHtcbiAgICAgIHBhdGg6IFwiL2NvbmZpZ3VyYXRvci9taW5lL2Rlc2NyaXB0b3JzXCIsXG4gICAgICBwYXJhbXM6IHsgbWluZUlkOiByZWFkTWluZUlkKCkgfVxuICAgIH0sIHsgbWluZU5hbWU6IG1pbmVOYW1lLCBwcml2YWN5OiBwcml2YWN5IH0pXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgLy8gVE9ETyBoYW5kbGUgY2FzZSB3aGVyZSBgbWluZU5hbWVgIGlzIGFscmVhZHkgdGFrZW5cbiAgICAgICAgb3BlblBhZ2UoXCIvd2l6YXJkL2ZpbmFsaXNlXCIpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBQYWdlOiB3aXphcmQvZmluYWxpc2VcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVuZGVyRmluYWxpc2VVcGxvYWRlZEZpbGVzKGZpbGVzKSB7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZGVkRmlsZXNcIik7XG5cbiAgICByZW1vdmVDaGlsZHJlbihub2RlKTtcblxuICAgIGZpbGVzLmZvckVhY2goZnVuY3Rpb24oZmlsZSkge1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBkaXYuY2xhc3NOYW1lID0gXCJzdWJTdGVwQ29udGVudFwiO1xuICAgICAgdmFyIGg0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpO1xuICAgICAgaDQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZmlsZS5kYXRhRmlsZS5uYW1lKSk7XG4gICAgICB2YXIgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICB2YXIgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgc3Bhbi5jbGFzc05hbWUgPSBcInRpdGxlXCI7XG4gICAgICBzcGFuLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiT3JnYW5pc206XCIpKTtcblxuICAgICAgbGkuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICBsaS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShmaWxlLmRhdGFGaWxlLm9yZ2FuaXNtLm5hbWUpKTtcbiAgICAgIHVsLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZChoNCk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQodWwpO1xuXG4gICAgICBub2RlLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJMaXN0KGVsZW1JZCwgaXRlbXMpIHtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JZCk7XG5cbiAgICByZW1vdmVDaGlsZHJlbihub2RlKTtcblxuICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgIGEuaHJlZiA9IGl0ZW0udXJsO1xuICAgICAgdmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtLnRleHQpO1xuXG4gICAgICBhLmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgICBub2RlLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckZpbmFsaXNlU3VwcGxlbWVudGFyaWVzKHNvdXJjZXMsIHRvb2xzKSB7XG4gICAgcmVuZGVyTGlzdChcInN1cHBsZW1lbnRhcnlEYXRhXCIsIHNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIHsgdGV4dDogc291cmNlLmxhYmVsLCB1cmw6IHNvdXJjZS51cmwgfTtcbiAgICB9KSk7XG5cbiAgICByZW5kZXJMaXN0KFwiZGF0YVRvb2xzXCIsIHRvb2xzLm1hcChmdW5jdGlvbih0b29sKSB7XG4gICAgICByZXR1cm4geyB0ZXh0OiB0b29sLnRvb2xOYW1lLCB1cmw6IHRvb2wudG9vbFByZXZpZXcgfTtcbiAgICB9KSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJGaW5hbGlzZURlc2NyaXB0b3IoZGVzY3JpcHRvcikge1xuICAgIHZhciB1cmxFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5lTmFtZVwiKTtcbiAgICByZW1vdmVDaGlsZHJlbih1cmxFbGVtKTtcbiAgICB1cmxFbGVtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRlc2NyaXB0b3IubWluZU5hbWUpKTtcblxuICAgIHZhciBwcml2YWN5RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpdmFjeVwiKTtcbiAgICByZW1vdmVDaGlsZHJlbihwcml2YWN5RWxlbSk7XG4gICAgcHJpdmFjeUVsZW0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZGVzY3JpcHRvci5wcml2YWN5KSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0RmluYWxpc2UoKSB7XG4gICAgZmV0Y2hKc29uKHtcbiAgICAgIHBhdGg6IFwiL2NvbmZpZ3VyYXRvci9taW5lL3VzZXItY29uZmlnXCIsXG4gICAgICBwYXJhbXM6IHsgbWluZUlkOiByZWFkTWluZUlkKCkgfVxuICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHJlbmRlckZpbmFsaXNlVXBsb2FkZWRGaWxlcyhkYXRhLmRhdGFGaWxlcyk7XG4gICAgICAgIHJlbmRlckZpbmFsaXNlU3VwcGxlbWVudGFyaWVzKGRhdGEuc3VwcGxlbWVudGFyeURhdGFTb3VyY2VzLCBkYXRhLmRhdGFUb29scyk7XG4gICAgICAgIHJlbmRlckZpbmFsaXNlRGVzY3JpcHRvcihkYXRhLm1pbmVEZXNjcmlwdG9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogRXhwb3J0c1xuICAgKi9cblxuICByZXR1cm4ge1xuICAgIG9wZW5Jbml0aWFsUGFnZTogb3BlbkluaXRpYWxQYWdlLFxuICAgIHJlZ2lzdGVyVXNlcjogcmVnaXN0ZXJVc2VyLFxuICAgIGxvZ2luVXNlcjogbG9naW5Vc2VyLFxuICAgIGxvZ291dFVzZXI6IGxvZ291dFVzZXIsXG4gICAgcmVuZGVyRGFzaGJvYXJkTWluZXM6IHJlbmRlckRhc2hib2FyZE1pbmVzLFxuICAgIHVwbG9hZEZpbGU6IHVwbG9hZEZpbGUsXG4gICAgaW5pdE1hcENvbHVtbnM6IGluaXRNYXBDb2x1bW5zLFxuICAgIHNhdmVNYXBDb2x1bW5zOiBzYXZlTWFwQ29sdW1ucyxcbiAgICBpbml0U3VwcGxlbWVudGFyaWVzOiBpbml0U3VwcGxlbWVudGFyaWVzLFxuICAgIHNhdmVTdXBwbGVtZW50YXJpZXM6IHNhdmVTdXBwbGVtZW50YXJpZXMsXG4gICAgcmVuZGVyQ2hlY2tBdmFpbGFiaWxpdHk6IHJlbmRlckNoZWNrQXZhaWxhYmlsaXR5LFxuICAgIHNhdmVEZXNjcmlwdG9yczogc2F2ZURlc2NyaXB0b3JzLFxuICAgIGluaXRGaW5hbGlzZTogaW5pdEZpbmFsaXNlXG4gIH07XG59KSgpO1xuIiwiLy8gdmFyIGVuZHBvaW50ID0gXCJodHRwczovL3dpemFyZC5pbnRlcm1pbmUub3JnL3YxXCI7XG52YXIgZW5kcG9pbnQgPSBcImh0dHA6Ly8xMjcuMC4wLjE6OTk5MS9hcGkvdjFcIjtcblxuLy8gU2luY2Ugb3VyIHNlcnZlciAobm90IHRoZSBBUEkpIGRvZXNuJ3Qga25vdyB3aGV0aGVyIHRoZSB1c2VyIGlzXG4vLyBhdXRoZW50aWNhdGVkLCBjaGVja2luZyBmb3IgdGhpcyBhbmQgc2VuZGluZyB0aGVtIHRvIHRoZSBgL3JlZ2lzdGVyYCBwYWdlXG4vLyBpcyBhIGNvbW1vbiBwYXR0ZXJuLiBXZSBjb2RpZnkgdGhpcyBoZXJlLCBzbyB0aGF0IHdlIGNhbiB1c2UgaXQgaW4gb3VyXG4vLyBnZW5lcmljIHJlcXVlc3QgZnVuY3Rpb25zIGJlbG93LlxuZnVuY3Rpb24gaGFuZGxlRXJyb3JSZXNwb25zZShyZXMpIHtcbiAgaWYgKHJlcy5zdGF0dXMgPT09IDQwMSkge1xuICAgIC8vIFRoZSB1c2VyIGlzbid0IGF1dGhvcml6ZWQsIHNvIG1ha2UgdGhlbSBzaWduIGluLlxuICAgIG9wZW5QYWdlKFwiL3JlZ2lzdGVyXCIpO1xuICAgIHJldHVybiBuZXcgRXJyb3IoXCJZb3UgYXJlIG5vdCBhdXRob3JpemVkLlwiKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG5cbi8vIEFyZ3VtZW50IGNhbiBiZSBlaXRoZXIgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBwYXRoIG9yIGFuIG9iamVjdCB3aXRoXG4vLyBgcGF0aGAgYW5kIGBwYXJhbXNgIGtleXMsIHdoZXJlIHBhcmFtcyBpcyBhbiBvYmplY3Qgb2Ygc3RyaW5nIGVudHJpZXMuXG5mdW5jdGlvbiBzZXJ2aWNlKGFyZykge1xuICBpZiAodHlwZW9mIGFyZyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBXaGVuIHdlIGFkZCBxdWVyeSBwYXJhbXMsIG91ciBiYWNrZW5kIHdpbGwgY29tcGxhaW4gaWYgd2UgZG9uJ3QgaGF2ZSBhXG4gICAgLy8gdHJhaWxpbmcgc2xhc2guXG4gICAgdmFyIHBhdGggPSBhcmcucGF0aC5zbGljZSgtMSkgPT09ICcvJyA/IGFyZy5wYXRoIDogYXJnLnBhdGguY29uY2F0KCcvJyk7XG5cbiAgICB2YXIgdXJsID0gbmV3IFVSTChlbmRwb2ludC5jb25jYXQocGF0aCkpO1xuXG4gICAgaWYgKCdwYXJhbXMnIGluIGFyZykge1xuICAgICAgZm9yICh2YXIga2V5IGluIGFyZy5wYXJhbXMpIHtcbiAgICAgICAgaWYgKGFyZy5wYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHZhciB2YWwgPSBhcmcucGFyYW1zW2tleV07XG4gICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHVybDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZW5kcG9pbnQuY29uY2F0KGFyZyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmV0Y2hKc29uKHBhdGgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZldGNoKHNlcnZpY2UocGF0aCksIHtcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QoaGFuZGxlRXJyb3JSZXNwb25zZShyZXMpKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcG9zdERhdGEocGF0aCwgZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZmV0Y2goc2VydmljZShwYXRoKSwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChoYW5kbGVFcnJvclJlc3BvbnNlKHJlcykpO1xuICAgICAgfVxuICAgIH0pXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvcGVuUGFnZShwYXRoKSB7XG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcGF0aDtcbn1cblxuXG4gIC8vIFdyYXBwaW5nIG91ciBjYWxscyB0byBgc2Vzc2lvblN0b3JhZ2VgIGNhbiBiZSB1c2VmdWwgaW4gY2FzZSB3ZSBldmVyXG4gIC8vIGRlY2lkZSB0byB1c2UgYSBkaWZmZXJlbnQgZm9ybSBvZiBzdG9yYWdlLCBvciBhZGQgc2lkZS1lZmZlY3RzLlxuICBmdW5jdGlvbiBzYXZlU3RvcmFnZShrZXksIHZhbCkge1xuICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRTdG9yYWdlKGtleSkge1xuICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gIH1cblxuXG5leHBvcnQge1xuICBwb3N0RGF0YSwgZmV0Y2hKc29uLCBzZXJ2aWNlLCBvcGVuUGFnZSwgc2F2ZVN0b3JhZ2UsIGxvYWRTdG9yYWdlXG59XG4iLCJpbXBvcnQge2ZldGNoSnNvbiwgb3BlblBhZ2V9IGZyb20gXCIuL2NvbW1zLmpzXCI7XG5pbXBvcnQge2NyZWF0ZU1pbmVJZH0gZnJvbSBcIi4vbWluZUlEcy5qc1wiO1xuXG4vKlxuICogUGFnZTogaG9tZVxuICovXG5cbmZ1bmN0aW9uIG9wZW5Jbml0aWFsUGFnZShldmVudCkge1xuICBpZiAoZXZlbnQpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgZmV0Y2hKc29uKFwiL21pbmUvYWxsXCIpXG4gICAgLnRoZW4oZnVuY3Rpb24obGlzdE9mTWluZXMpIHtcbiAgICAgIGlmIChsaXN0T2ZNaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgLy8gV2UgaGF2ZSBtaW5lczsgZGlzcGxheSB0aGVtIGluIHRoZSBkYXNoYm9hcmQgcGFnZSFcbiAgICAgICAgb3BlblBhZ2UoXCIvZGFzaGJvYXJkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV2UgZG9uJ3QgaGF2ZSBtaW5lczsgZ2V0IHN0YXJ0ZWQgd2l0aCB0aGUgd2l6YXJkIVxuICAgICAgICBjcmVhdGVNaW5lSWQoKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgb3BlblBhZ2UoXCIvd2l6YXJkL3VwbG9hZFwiKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IHtvcGVuSW5pdGlhbFBhZ2V9O1xuIiwiaW1wb3J0IHsgZmV0Y2hKc29uLCBzYXZlU3RvcmFnZSwgbG9hZFN0b3JhZ2V9IGZyb20gXCIuL2NvbW1zLmpzXCI7XG5cbiAgZnVuY3Rpb24gY3JlYXRlTWluZUlkKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZldGNoSnNvbihcIi9jb25maWd1cmF0b3IvbWluZS91c2VyLWNvbmZpZy9uZXcvXCIpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKG1pbmVJZCkge1xuICAgICAgICAgIHNhdmVTdG9yYWdlKFwibWluZUlkXCIsIG1pbmVJZCk7XG4gICAgICAgICAgcmVzb2x2ZShtaW5lSWQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRNaW5lSWQoKSB7XG4gICAgcmV0dXJuIGxvYWRTdG9yYWdlKFwibWluZUlkXCIpO1xuICB9XG5cbiAgZXhwb3J0IHtjcmVhdGVNaW5lSWQscmVhZE1pbmVJZH1cbiIsIlxuXG5mdW5jdGlvbiByZW5kZXJBbGVydE1lc3NhZ2UoZWxlbUlkLCB0ZXh0KSB7XG4gIHZhciBzcGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKTtcblxuICBzcGFuLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJBbGVydE1lc3NhZ2UoZWxlbUlkKSB7XG4gIHZhciBzcGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKTtcblxuICByZW1vdmVDaGlsZHJlbihzcGFuKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4obm9kZSkge1xuICB3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Q2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VUZXh0KGVsZW1JZCwgdGV4dCkge1xuICB2YXIgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JZCk7XG4gIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gIHJlbW92ZUNoaWxkcmVuKGVsZW0pO1xuICBlbGVtLmFwcGVuZENoaWxkKHRleHQpO1xufVxuXG5cbmV4cG9ydCB7XG4gIGNsZWFyQWxlcnRNZXNzYWdlLFxuICByZW5kZXJBbGVydE1lc3NhZ2UsXG4gIHJlbW92ZUNoaWxkcmVuLFxuICByZXBsYWNlVGV4dFxufVxuIiwiaW1wb3J0IHtmZXRjaEpzb24scG9zdERhdGEsIG9wZW5QYWdlLCBzZXJ2aWNlfSBmcm9tIFwiLi9jb21tcy5qc1wiO1xuaW1wb3J0IHtjbGVhckFsZXJ0TWVzc2FnZSwgcmVuZGVyQWxlcnRNZXNzYWdlfSBmcm9tIFwiLi91aS5qc1wiO1xuaW1wb3J0IHtvcGVuSW5pdGlhbFBhZ2V9IGZyb20gXCIuL2hvbWUuanNcIjtcblxuXG4gIC8qXG4gICAqIFBhZ2U6IHJlZ2lzdGVyXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gcmVhZEZvcm0ob2JqKSB7XG4gICAgdmFyIGlucHV0cyA9IHt9O1xuXG4gICAgT2JqZWN0LmVudHJpZXMob2JqLmlucHV0cykuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGtleSA9IGVudHJ5WzBdO1xuICAgICAgdmFyIHZhbCA9IGVudHJ5WzFdO1xuICAgICAgaW5wdXRzW2tleV0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2YWwpLnZhbHVlO1xuICAgIH0pO1xuXG4gICAgY2xlYXJBbGVydE1lc3NhZ2Uob2JqLmFsZXJ0SWQpO1xuXG4gICAgdmFyIGVycm9yID0gb2JqLnZhbGlkYXRpb25zLnNvbWUoZnVuY3Rpb24odGVzdEZ1bikge1xuICAgICAgdmFyIHJlcyA9IHRlc3RGdW4oaW5wdXRzKTtcbiAgICAgIGlmIChyZXMpIHJlbmRlckFsZXJ0TWVzc2FnZShvYmouYWxlcnRJZCwgcmVzKTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfSk7XG5cbiAgICBpZiAoZXJyb3IpIHJldHVybjtcbiAgICBlbHNlIHJldHVybiBpbnB1dHM7XG4gIH1cblxuICB2YXIgdmFsaWRhdGUgPSB7XG4gICAgcGFzc3dvcmRzTWF0Y2g6IGZ1bmN0aW9uKGlucHV0cykge1xuICAgICAgaWYgKGlucHV0cy5wYXNzd29yZCAhPT0gaW5wdXRzLnBhc3N3b3JkQ29uZmlybSkge1xuICAgICAgICByZXR1cm4gXCJQYXNzd29yZHMgZG8gbm90IG1hdGNoLlwiO1xuICAgICAgfVxuICAgIH0sXG4gICAgbm90RW1wdHk6IGZ1bmN0aW9uKGlucHV0cykge1xuICAgICAgaWYgKE9iamVjdC52YWx1ZXMoaW5wdXRzKS5zb21lKGZ1bmN0aW9uKGlucCkgeyByZXR1cm4gIWlucDsgfSkpIHtcbiAgICAgICAgcmV0dXJuIFwiUGxlYXNlIGZpbGwgaW4gYWxsIHRoZSBmaWVsZHMuXCI7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyVXNlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB2YXIgaW5wdXREYXRhID0gcmVhZEZvcm0oe1xuICAgICAgaW5wdXRzOiB7XG4gICAgICAgIGVtYWlsOiBcInJlZ2lzdGVyLWVtYWlsXCIsXG4gICAgICAgIGZpcnN0TmFtZTogXCJyZWdpc3Rlci1maXJzdC1uYW1lXCIsXG4gICAgICAgIGxhc3ROYW1lOiBcInJlZ2lzdGVyLWxhc3QtbmFtZVwiLFxuICAgICAgICBvcmdhbmlzYXRpb246IFwicmVnaXN0ZXItb3JnYW5pc2F0aW9uXCIsXG4gICAgICAgIHBhc3N3b3JkOiBcInJlZ2lzdGVyLXBhc3N3b3JkXCIsXG4gICAgICAgIHBhc3N3b3JkQ29uZmlybTogXCJyZWdpc3Rlci1wYXNzd29yZC1jb25maXJtXCJcbiAgICAgIH0sXG4gICAgICBhbGVydElkOiBcInJlZ2lzdGVyRm9ybUFsZXJ0XCIsXG4gICAgICB2YWxpZGF0aW9uczogW1xuICAgICAgICB2YWxpZGF0ZS5wYXNzd29yZHNNYXRjaCxcbiAgICAgICAgdmFsaWRhdGUubm90RW1wdHksXG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBpZiAoaW5wdXREYXRhKSB7XG4gICAgICBwb3N0RGF0YShcIi91c2VyL3JlZ2lzdGVyXCIsIGlucHV0RGF0YSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVnaXN0ZXJSZXMpIHtcbiAgICAgICAgICByZW5kZXJBbGVydE1lc3NhZ2UoXCJhbGVydGJveFwiLCBcIkFjY291bnQgY3JlYXRlZCBzdWNjZXNzZnVsbHkuXCIpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyUmVzKSB7XG4gICAgICAgICAgaWYgKGVyclJlcyBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVyclJlcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBhbnkgZXJyb3IgbWVzc2FnZXMgZnJvbSBiYWNrZW5kLlxuICAgICAgICAgICAgZXJyUmVzLmpzb24oKVxuICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJBbGVydE1lc3NhZ2UoXCJyZWdpc3RlckZvcm1BbGVydFwiLCByZXMubWVzc2FnZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9naW5Vc2VyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBpbnB1dERhdGEgPSByZWFkRm9ybSh7XG4gICAgICBpbnB1dHM6IHtcbiAgICAgICAgZW1haWw6IFwic2lnbmluLWVtYWlsXCIsXG4gICAgICAgIHBhc3N3b3JkOiBcInNpZ25pbi1wYXNzd29yZFwiXG4gICAgICB9LFxuICAgICAgYWxlcnRJZDogXCJzaWduaW5Gb3JtQWxlcnRcIixcbiAgICAgIHZhbGlkYXRpb25zOiBbXG4gICAgICAgIHZhbGlkYXRlLm5vdEVtcHR5LFxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgaWYgKGlucHV0RGF0YSkge1xuICAgICAgcG9zdERhdGEoXCIvdXNlci9sb2dpblwiLCBpbnB1dERhdGEpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGxvZ2luUmVzKSB7XG4gICAgICAgICAgb3BlbkluaXRpYWxQYWdlKCk7XG4gICAgICAgIH0pO1xuICAgICAgLy8gVE9ETyBoYW5kbGUgaW52YWxpZCBsb2dpbiAoSSBkb24ndCB0aGluayB0aGUgYmFja2VuZCBjdXJyZW50bHkgZ2l2ZXNcbiAgICAgIC8vIHVzIGEgbGVnaWJpbGUgcmVzcG9uc2Ugd2hlbiB0aGlzIGhhcHBlbnMsIGp1c3QgNDAwIEJhZCBSZXF1ZXN0KVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG5cbmZ1bmN0aW9uIGxvZ291dFVzZXIoKSB7XG4gIHZhciBwYXRoID0gXCIvdXNlci9sb2dvdXRcIjtcbiAgZmV0Y2hKc29uKHBhdGgpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgaWYocmVzcG9uc2UubWVzc2FnZSkge1xuICAgICAgb3BlblBhZ2UoXCIvcmVnaXN0ZXJcIik7XG4gICAgICAvLyB0b2RvIC0gYWxzbyBwb3N0IHN0YXR1c2UgbWVzc2FnZSBzYXlpbmcgdGhlcmUgaGFzIGJlZW4gYSBzdWNjZXNzZnVsXG4gICAgICAvLyBsb2dvdXQuIEFkZCBzb2VtdGhpbmcgdG8gdGhlIG9wZW5wYWdlIG1ldGhvZCB0byBwcmludCB0byB0aGUgaGVhZGVyXG4gICAgICAvLyBhbGVydGJveFxuICAgIH0gZWxzZSB7XG4gICAgICByZW5kZXJBbGVydE1lc3NhZ2UoXCJhbGVydGJveFwiLCBcIlVob2gsIHByb2JsZW0gbG9nZ2luZyBvdXQhXCIpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuZXhwb3J0IHtsb2dpblVzZXIsIGxvZ291dFVzZXIsIHJlZ2lzdGVyVXNlcn1cbiJdLCJzb3VyY2VSb290IjoiIn0=