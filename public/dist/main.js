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
/* harmony import */ var _register_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register.js */ "./public/js/register.js");



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

  // Wrapping our calls to `sessionStorage` can be useful in case we ever
  // decide to use a different form of storage, or add side-effects.
  function saveStorage(key, val) {
    return sessionStorage.setItem(key, val);
  }

  function loadStorage(key) {
    return sessionStorage.getItem(key);
  }

  function createMineId() {
    return new Promise(function(resolve, reject) {
      fetchJson("/configurator/mine/user-config/new/")
        .then(function(mineId) {
          saveStorage("mineId", mineId);
          resolve(mineId);
        });
    });
  }

  function readMineId() {
    return loadStorage("mineId");
  }

  /*
   * Page: home
   */

  function openInitialPage(event) {
    if (event) event.preventDefault();

    fetchJson("/mine/all")
      .then(function(listOfMines) {
        if (listOfMines.length) {
          // We have mines; display them in the dashboard page!
          Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["openPage"])("/dashboard");
        } else {
          // We don't have mines; get started with the wizard!
          createMineId()
            .then(function() {
              Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["openPage"])("/wizard/upload");
            });
        }
      });
  }

  /*
   * Page: register
   */

  function renderAlertMessage(elemId, text) {
    var span = document.getElementById(elemId);

    span.appendChild(document.createTextNode(text));
  }

  function clearAlertMessage(elemId) {
    var span = document.getElementById(elemId);

    removeChildren(span);
  }

  function readForm(obj) {
    var inputs = {};

    Object.entries(obj.inputs).forEach(function(entry) {
      var key = entry[0];
      var val = entry[1];
      inputs[key] = document.getElementById(val).value;
    });

    clearAlertMessage(obj.alertId);

    var error = obj.validations.some(function(testFun) {
      var res = testFun(inputs);
      if (res) renderAlertMessage(obj.alertId, res);
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
      postData("/user/register", inputData)
        .then(function(registerRes) {
          renderAlertMessage("registerFormAlert", "Account created successfully.");
        })
        .catch(function(errRes) {
          if (errRes instanceof Error) {
            console.error(errRes);
          } else {
            // Handle any error messages from backend.
            errRes.json()
              .then(function(res) {
                renderAlertMessage("registerFormAlert", res.message);
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
      postData("/user/login", inputData)
        .then(function(loginRes) {
          openInitialPage();
        });
      // TODO handle invalid login (I don't think the backend currently gives
      // us a legibile response when this happens, just 400 Bad Request)
    }

    return false;
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
   * Page: users/profile
   */

  function createUserProfileEntry(entry) {
    var tr = document.createElement('tr');

    var title = entry[0];
    var value = entry[1];

    tr.innerHTML =
      '<td class="title">' + title + '</td>' +
      '<td>' + value + '</td>' +
      '<td class="edit">' +
        '<svg class="icon icon-edit">' +
          '<use xlink:href="#icon-edit"></use>' +
        '</svg>' +
      '</td>';

    return tr;
  }

  function createUserProfilePassword() {
    var tr = document.createElement('tr');

    tr.innerHTML =
      '<td class="title">Password:</td>' +
      '<td class="topsecret">[Top secret] <a href="change-password.html">Change</a></td>' +
      '<td class="edit">' +
        '<svg class="icon icon-edit">' +
          '<use xlink:href="#icon-edit"></use>' +
        '</svg>' +
      '</td>';

    return tr;
  }

  function createUserProfilePairs(userData) {
    return [
      ["Email:", userData.email],
      ["First Name(s):", userData.firstName],
      ["Last Name(s):", userData.lastName],
      ["Organisation:", userData.organisation]
    ];
  }

  function renderUserProfile(targetId) {
    fetchJson("/user/profile")
      .then(function(user) {
        var node = document.getElementById(targetId);
        var container = document.createElement('tbody');

        var profilePairs = createUserProfilePairs(user);

        profilePairs.forEach(function(entry) {
          var elem = createUserProfileEntry(entry);
          container.appendChild(elem);
        });

        var passwordElem = createUserProfilePassword();
        container.appendChild(passwordElem);

        removeChildren(node);
        node.appendChild(container);
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
      params: { mineId: readMineId() }
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
    openInitialPage: openInitialPage,
    registerUser: registerUser,
    loginUser: loginUser,
    renderDashboardMines: renderDashboardMines,
    renderUserProfile: renderUserProfile,
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
/*! exports provided: postData, fetchJson, service, openPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchJson", function() { return fetchJson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "service", function() { return service; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openPage", function() { return openPage; });
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





/***/ }),

/***/ "./public/js/register.js":
/*!*******************************!*\
  !*** ./public/js/register.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _comms_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comms.js */ "./public/js/comms.js");
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui.js */ "./public/js/ui.js");



/* harmony default export */ __webpack_exports__["default"] = (function() {

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
          Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__["renderAlertMessage"])("registerFormAlert", "Account created successfully.");
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
          openInitialPage();
        });
      // TODO handle invalid login (I don't think the backend currently gives
      // us a legibile response when this happens, just 400 Bad Request)
    }

    return false;
  }


});


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




/***/ })

/******/ })["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aXphcmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL2NsaWVudC5qcyIsIndlYnBhY2s6Ly93aXphcmQvLi9wdWJsaWMvanMvY29tbXMuanMiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL3JlZ2lzdGVyLmpzIiwid2VicGFjazovL3dpemFyZC8uL3B1YmxpYy9qcy91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBa0U7QUFDeEI7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDBEQUFRO0FBQ2Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLHlEQUFPO0FBQ25CO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxZQUFZLHlEQUFPO0FBQ25CO0FBQ0Esa0JBQWtCLHFDQUFxQztBQUN2RDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLFVBQVUsMERBQVE7QUFDbEIsU0FBUztBQUNULGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsY0FBYywwREFBUTtBQUN0QixhQUFhO0FBQ2I7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esb0RBQW9ELGFBQWEsRUFBRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLHVCQUF1QjtBQUNuRTtBQUNBLFVBQVUsMERBQVE7QUFDbEIsU0FBUztBQUNULEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBLGdCQUFnQix5REFBTztBQUN2QjtBQUNBLGlCQUFpQjtBQUNqQixPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSwwREFBUTtBQUNsQixTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLEtBQUssR0FBRyxpQkFBaUI7QUFDekI7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsZUFBZTtBQUNmLEtBQUssR0FBRyxtQ0FBbUM7QUFDM0M7QUFDQSxRQUFRLDBEQUFRO0FBQ2hCLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLHVCQUF1QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWU7QUFDZixLQUFLLEdBQUcsbUJBQW1CO0FBQzNCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWU7QUFDZixLQUFLLEdBQUcsaUJBQWlCO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDBEQUFRO0FBQ2QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLCtCQUErQjtBQUN6RTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLEtBQUssR0FBRyx1Q0FBdUM7QUFDL0M7QUFDQTtBQUNBLFFBQVEsMERBQVE7QUFDaEIsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkLEtBQUs7O0FBRUw7QUFDQSxjQUFjO0FBQ2QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsR0FBRyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDMTNCTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHFDQUFxQztBQUNyRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOzs7QUFLQzs7Ozs7Ozs7Ozs7OztBQ3BGRDtBQUFBO0FBQUE7QUFBOEM7QUFDZ0I7O0FBRTlDOztBQUVoQjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLElBQUksZ0VBQWlCOztBQUVyQjtBQUNBO0FBQ0EsZUFBZSxpRUFBa0I7QUFDakM7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esb0RBQW9ELGFBQWEsRUFBRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxNQUFNLDBEQUFRO0FBQ2Q7QUFDQSxVQUFVLGlFQUFrQjtBQUM1QixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixpRUFBa0I7QUFDbEMsZUFBZTtBQUNmO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxNQUFNLDBEQUFRO0FBQ2Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0EsQ0FBQyxFQUFFOzs7Ozs7Ozs7Ozs7O0FDL0dIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUUyRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wdWJsaWMvanMvY2xpZW50LmpzXCIpO1xuIiwiaW1wb3J0IHtwb3N0RGF0YSwgZmV0Y2hKc29uLCBzZXJ2aWNlLCBvcGVuUGFnZX0gZnJvbSBcIi4vY29tbXMuanNcIjtcbmltcG9ydCBkZWZhdWx0RXhwb3J0IGZyb20gXCIuL3JlZ2lzdGVyLmpzXCI7XG5cbi8qIFBvc3NpYmxlIHBvbHlmaWxscyB3ZSdsbCB3YW50OlxuICogLSBGZXRjaFxuICogLSBQcm9taXNlLlxuICogLSBVUkwgc2VhcmNoUGFyYW1zLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbigpIHtcblxuICBmdW5jdGlvbiByZW1vdmVDaGlsZHJlbihub2RlKSB7XG4gICAgd2hpbGUgKG5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2VUZXh0KGVsZW1JZCwgdGV4dCkge1xuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKTtcbiAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgIHJlbW92ZUNoaWxkcmVuKGVsZW0pO1xuICAgIGVsZW0uYXBwZW5kQ2hpbGQodGV4dCk7XG4gIH1cblxuICAvLyBTaW5jZSBvdXIgc2VydmVyIChub3QgdGhlIEFQSSkgZG9lc24ndCBrbm93IHdoZXRoZXIgdGhlIHVzZXIgaXNcbiAgLy8gYXV0aGVudGljYXRlZCwgY2hlY2tpbmcgZm9yIHRoaXMgYW5kIHNlbmRpbmcgdGhlbSB0byB0aGUgYC9yZWdpc3RlcmAgcGFnZVxuICAvLyBpcyBhIGNvbW1vbiBwYXR0ZXJuLiBXZSBjb2RpZnkgdGhpcyBoZXJlLCBzbyB0aGF0IHdlIGNhbiB1c2UgaXQgaW4gb3VyXG4gIC8vIGdlbmVyaWMgcmVxdWVzdCBmdW5jdGlvbnMgYmVsb3cuXG4gIGZ1bmN0aW9uIGhhbmRsZUVycm9yUmVzcG9uc2UocmVzKSB7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgLy8gVGhlIHVzZXIgaXNuJ3QgYXV0aG9yaXplZCwgc28gbWFrZSB0aGVtIHNpZ24gaW4uXG4gICAgICBvcGVuUGFnZShcIi9yZWdpc3RlclwiKTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJZb3UgYXJlIG5vdCBhdXRob3JpemVkLlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaEpzb24ocGF0aCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZldGNoKHNlcnZpY2UocGF0aCksIHtcbiAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChoYW5kbGVFcnJvclJlc3BvbnNlKHJlcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9zdERhdGEocGF0aCwgZGF0YSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZldGNoKHNlcnZpY2UocGF0aCksIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QoaGFuZGxlRXJyb3JSZXNwb25zZShyZXMpKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFdyYXBwaW5nIG91ciBjYWxscyB0byBgc2Vzc2lvblN0b3JhZ2VgIGNhbiBiZSB1c2VmdWwgaW4gY2FzZSB3ZSBldmVyXG4gIC8vIGRlY2lkZSB0byB1c2UgYSBkaWZmZXJlbnQgZm9ybSBvZiBzdG9yYWdlLCBvciBhZGQgc2lkZS1lZmZlY3RzLlxuICBmdW5jdGlvbiBzYXZlU3RvcmFnZShrZXksIHZhbCkge1xuICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRTdG9yYWdlKGtleSkge1xuICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVNaW5lSWQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZmV0Y2hKc29uKFwiL2NvbmZpZ3VyYXRvci9taW5lL3VzZXItY29uZmlnL25ldy9cIilcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24obWluZUlkKSB7XG4gICAgICAgICAgc2F2ZVN0b3JhZ2UoXCJtaW5lSWRcIiwgbWluZUlkKTtcbiAgICAgICAgICByZXNvbHZlKG1pbmVJZCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZE1pbmVJZCgpIHtcbiAgICByZXR1cm4gbG9hZFN0b3JhZ2UoXCJtaW5lSWRcIik7XG4gIH1cblxuICAvKlxuICAgKiBQYWdlOiBob21lXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9wZW5Jbml0aWFsUGFnZShldmVudCkge1xuICAgIGlmIChldmVudCkgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGZldGNoSnNvbihcIi9taW5lL2FsbFwiKVxuICAgICAgLnRoZW4oZnVuY3Rpb24obGlzdE9mTWluZXMpIHtcbiAgICAgICAgaWYgKGxpc3RPZk1pbmVzLmxlbmd0aCkge1xuICAgICAgICAgIC8vIFdlIGhhdmUgbWluZXM7IGRpc3BsYXkgdGhlbSBpbiB0aGUgZGFzaGJvYXJkIHBhZ2UhXG4gICAgICAgICAgb3BlblBhZ2UoXCIvZGFzaGJvYXJkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFdlIGRvbid0IGhhdmUgbWluZXM7IGdldCBzdGFydGVkIHdpdGggdGhlIHdpemFyZCFcbiAgICAgICAgICBjcmVhdGVNaW5lSWQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIG9wZW5QYWdlKFwiL3dpemFyZC91cGxvYWRcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBQYWdlOiByZWdpc3RlclxuICAgKi9cblxuICBmdW5jdGlvbiByZW5kZXJBbGVydE1lc3NhZ2UoZWxlbUlkLCB0ZXh0KSB7XG4gICAgdmFyIHNwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSWQpO1xuXG4gICAgc3Bhbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KSk7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhckFsZXJ0TWVzc2FnZShlbGVtSWQpIHtcbiAgICB2YXIgc3BhbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JZCk7XG5cbiAgICByZW1vdmVDaGlsZHJlbihzcGFuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRGb3JtKG9iaikge1xuICAgIHZhciBpbnB1dHMgPSB7fTtcblxuICAgIE9iamVjdC5lbnRyaWVzKG9iai5pbnB1dHMpLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBrZXkgPSBlbnRyeVswXTtcbiAgICAgIHZhciB2YWwgPSBlbnRyeVsxXTtcbiAgICAgIGlucHV0c1trZXldID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmFsKS52YWx1ZTtcbiAgICB9KTtcblxuICAgIGNsZWFyQWxlcnRNZXNzYWdlKG9iai5hbGVydElkKTtcblxuICAgIHZhciBlcnJvciA9IG9iai52YWxpZGF0aW9ucy5zb21lKGZ1bmN0aW9uKHRlc3RGdW4pIHtcbiAgICAgIHZhciByZXMgPSB0ZXN0RnVuKGlucHV0cyk7XG4gICAgICBpZiAocmVzKSByZW5kZXJBbGVydE1lc3NhZ2Uob2JqLmFsZXJ0SWQsIHJlcyk7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0pO1xuXG4gICAgaWYgKGVycm9yKSByZXR1cm47XG4gICAgZWxzZSByZXR1cm4gaW5wdXRzO1xuICB9XG5cbiAgdmFyIHZhbGlkYXRlID0ge1xuICAgIHBhc3N3b3Jkc01hdGNoOiBmdW5jdGlvbihpbnB1dHMpIHtcbiAgICAgIGlmIChpbnB1dHMucGFzc3dvcmQgIT09IGlucHV0cy5wYXNzd29yZENvbmZpcm0pIHtcbiAgICAgICAgcmV0dXJuIFwiUGFzc3dvcmRzIGRvIG5vdCBtYXRjaC5cIjtcbiAgICAgIH1cbiAgICB9LFxuICAgIG5vdEVtcHR5OiBmdW5jdGlvbihpbnB1dHMpIHtcbiAgICAgIGlmIChPYmplY3QudmFsdWVzKGlucHV0cykuc29tZShmdW5jdGlvbihpbnApIHsgcmV0dXJuICFpbnA7IH0pKSB7XG4gICAgICAgIHJldHVybiBcIlBsZWFzZSBmaWxsIGluIGFsbCB0aGUgZmllbGRzLlwiO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiByZWdpc3RlclVzZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIGlucHV0RGF0YSA9IHJlYWRGb3JtKHtcbiAgICAgIGlucHV0czoge1xuICAgICAgICBlbWFpbDogXCJyZWdpc3Rlci1lbWFpbFwiLFxuICAgICAgICBmaXJzdE5hbWU6IFwicmVnaXN0ZXItZmlyc3QtbmFtZVwiLFxuICAgICAgICBsYXN0TmFtZTogXCJyZWdpc3Rlci1sYXN0LW5hbWVcIixcbiAgICAgICAgb3JnYW5pc2F0aW9uOiBcInJlZ2lzdGVyLW9yZ2FuaXNhdGlvblwiLFxuICAgICAgICBwYXNzd29yZDogXCJyZWdpc3Rlci1wYXNzd29yZFwiLFxuICAgICAgICBwYXNzd29yZENvbmZpcm06IFwicmVnaXN0ZXItcGFzc3dvcmQtY29uZmlybVwiXG4gICAgICB9LFxuICAgICAgYWxlcnRJZDogXCJyZWdpc3RlckZvcm1BbGVydFwiLFxuICAgICAgdmFsaWRhdGlvbnM6IFtcbiAgICAgICAgdmFsaWRhdGUucGFzc3dvcmRzTWF0Y2gsXG4gICAgICAgIHZhbGlkYXRlLm5vdEVtcHR5LFxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgaWYgKGlucHV0RGF0YSkge1xuICAgICAgcG9zdERhdGEoXCIvdXNlci9yZWdpc3RlclwiLCBpbnB1dERhdGEpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlZ2lzdGVyUmVzKSB7XG4gICAgICAgICAgcmVuZGVyQWxlcnRNZXNzYWdlKFwicmVnaXN0ZXJGb3JtQWxlcnRcIiwgXCJBY2NvdW50IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LlwiKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVyclJlcykge1xuICAgICAgICAgIGlmIChlcnJSZXMgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJSZXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgYW55IGVycm9yIG1lc3NhZ2VzIGZyb20gYmFja2VuZC5cbiAgICAgICAgICAgIGVyclJlcy5qc29uKClcbiAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyQWxlcnRNZXNzYWdlKFwicmVnaXN0ZXJGb3JtQWxlcnRcIiwgcmVzLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ2luVXNlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB2YXIgaW5wdXREYXRhID0gcmVhZEZvcm0oe1xuICAgICAgaW5wdXRzOiB7XG4gICAgICAgIGVtYWlsOiBcInNpZ25pbi1lbWFpbFwiLFxuICAgICAgICBwYXNzd29yZDogXCJzaWduaW4tcGFzc3dvcmRcIlxuICAgICAgfSxcbiAgICAgIGFsZXJ0SWQ6IFwic2lnbmluRm9ybUFsZXJ0XCIsXG4gICAgICB2YWxpZGF0aW9uczogW1xuICAgICAgICB2YWxpZGF0ZS5ub3RFbXB0eSxcbiAgICAgIF1cbiAgICB9KTtcblxuICAgIGlmIChpbnB1dERhdGEpIHtcbiAgICAgIHBvc3REYXRhKFwiL3VzZXIvbG9naW5cIiwgaW5wdXREYXRhKVxuICAgICAgICAudGhlbihmdW5jdGlvbihsb2dpblJlcykge1xuICAgICAgICAgIG9wZW5Jbml0aWFsUGFnZSgpO1xuICAgICAgICB9KTtcbiAgICAgIC8vIFRPRE8gaGFuZGxlIGludmFsaWQgbG9naW4gKEkgZG9uJ3QgdGhpbmsgdGhlIGJhY2tlbmQgY3VycmVudGx5IGdpdmVzXG4gICAgICAvLyB1cyBhIGxlZ2liaWxlIHJlc3BvbnNlIHdoZW4gdGhpcyBoYXBwZW5zLCBqdXN0IDQwMCBCYWQgUmVxdWVzdClcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKlxuICAgKiBQYWdlOiBkYXNoYm9hcmRcbiAgICovXG5cbiAgZnVuY3Rpb24gb3BlbkluUHJvZ3Jlc3NNaW5lKG1pbmUpIHtcbiAgICAvLyBUT0RPXG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJJblByb2dyZXNzTWluZShtaW5lKSB7XG4gICAgdmFyIGNvbnRhaW5lckxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICAgIHZhciBzdGF0dXNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzdGF0dXNEaXYuY2xhc3NOYW1lID0gXCJzdGF0dXMgY29uc3RydWN0aW9uXCI7XG4gICAgdmFyIHN0YXR1c1N2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgIHN0YXR1c1N2Zy5jbGFzc05hbWUgPSBcImljb24gaWNvbi1idWlsZGluZ1wiO1xuICAgIHZhciBzdGF0dXNVc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1c2UnKTtcbiAgICBzdGF0dXNVc2VbJ3hsaW5rOmhyZWYnXSA9IFwiI2ljb24tYnVpbGRpbmdcIjtcbiAgICB2YXIgc3RhdHVzUCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblxuICAgIHN0YXR1c1AuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJJbmNvbXBsZXRlXCIpKTtcbiAgICBzdGF0dXNTdmcuYXBwZW5kQ2hpbGQoc3RhdHVzVXNlKTtcbiAgICBzdGF0dXNEaXYuYXBwZW5kQ2hpbGQoc3RhdHVzU3ZnKTtcbiAgICBzdGF0dXNEaXYuYXBwZW5kQ2hpbGQoc3RhdHVzUCk7XG4gICAgY29udGFpbmVyTGkuYXBwZW5kQ2hpbGQoc3RhdHVzRGl2KTtcblxuICAgIHZhciBuYW1lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIG5hbWVBID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIG5hbWVBLmhyZWYgPSBtaW5lLm1pbmVsb2NhdGlvbjtcblxuICAgIG5hbWVBLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1pbmUubWluZU5hbWUuY29uY2F0KFwiIHdvcmsgaW4gcHJvZ3Jlc3NcIikpKTtcbiAgICBuYW1lRGl2LmFwcGVuZENoaWxkKG5hbWVBKTtcbiAgICBjb250YWluZXJMaS5hcHBlbmRDaGlsZChuYW1lRGl2KTtcblxuICAgIHZhciBhY3Rpb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYWN0aW9uc0Rpdi5jbGFzc05hbWUgPSBcImNvbnRpbnVlLXdpemFyZFwiO1xuXG4gICAgdmFyIGFjdGlvbnNVcHBlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBhY3Rpb25zVXBwZXJBID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGFjdGlvbnNVcHBlckEub25jbGljayA9IG9wZW5JblByb2dyZXNzTWluZShtaW5lKTtcbiAgICBhY3Rpb25zVXBwZXJBLmNsYXNzTmFtZSA9IFwicmVzdW1lXCI7XG4gICAgdmFyIGFjdGlvbnNVcHBlclN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgIGFjdGlvbnNVcHBlclN2Zy5jbGFzc05hbWUgPSBcImljb24gaWNvbi1yZXN1bWVcIjtcbiAgICB2YXIgYWN0aW9uc1VwcGVyVXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndXNlJyk7XG4gICAgYWN0aW9uc1VwcGVyVXNlWyd4bGluazpocmVmJ10gPSBcIiNpY29uLXJlc3VtZVwiO1xuXG4gICAgYWN0aW9uc1VwcGVyU3ZnLmFwcGVuZENoaWxkKGFjdGlvbnNVcHBlclVzZSk7XG4gICAgYWN0aW9uc1VwcGVyQS5hcHBlbmRDaGlsZChhY3Rpb25zVXBwZXJTdmcpO1xuICAgIGFjdGlvbnNVcHBlckEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJDb250aW51ZSBzZXR1cFwiKSk7XG4gICAgYWN0aW9uc1VwcGVyRGl2LmFwcGVuZENoaWxkKGFjdGlvbnNVcHBlckEpO1xuICAgIGFjdGlvbnNEaXYuYXBwZW5kQ2hpbGQoYWN0aW9uc1VwcGVyRGl2KTtcblxuICAgIHZhciBhY3Rpb25zTG93ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgYWN0aW9uc0xvd2VyQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhY3Rpb25zTG93ZXJBLmhyZWYgPSBcIiNcIjtcbiAgICBhY3Rpb25zTG93ZXJBLmNsYXNzTmFtZSA9IFwiZGlzY2FyZFwiO1xuICAgIHZhciBhY3Rpb25zTG93ZXJTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICBhY3Rpb25zTG93ZXJTdmcuY2xhc3NOYW1lID0gXCJpY29uIGljb24tY2FuY2VsXCI7XG4gICAgdmFyIGFjdGlvbnNMb3dlclVzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VzZScpO1xuICAgIGFjdGlvbnNMb3dlclVzZVsneGxpbms6aHJlZiddID0gXCIjaWNvbi1jYW5jZWxcIjtcblxuICAgIGFjdGlvbnNMb3dlclN2Zy5hcHBlbmRDaGlsZChhY3Rpb25zTG93ZXJVc2UpO1xuICAgIGFjdGlvbnNMb3dlckEuYXBwZW5kQ2hpbGQoYWN0aW9uc0xvd2VyU3ZnKTtcbiAgICBhY3Rpb25zTG93ZXJBLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiRGlzY2FyZFwiKSk7XG4gICAgYWN0aW9uc0xvd2VyRGl2LmFwcGVuZENoaWxkKGFjdGlvbnNMb3dlckEpO1xuICAgIGFjdGlvbnNEaXYuYXBwZW5kQ2hpbGQoYWN0aW9uc0xvd2VyRGl2KTtcblxuICAgIGNvbnRhaW5lckxpLmFwcGVuZENoaWxkKGFjdGlvbnNEaXYpO1xuXG4gICAgdmFyIGNvbXBsZXRlQnlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21wbGV0ZUJ5RGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1pbmUuZXRhRGF0ZSkpO1xuXG4gICAgY29udGFpbmVyTGkuYXBwZW5kQ2hpbGQoY29tcGxldGVCeURpdik7XG5cbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW4tcHJvZ3Jlc3MtbWluZXNcIik7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChjb250YWluZXJMaSk7XG4gIH1cbiAgLy8gV2h5IGlzIHRoZSBhYm92ZSB3cml0dGVuIHdpdGggYXBwZW5kQ2hpbGQgYW5kIHRoZSBiZWxvdyB3aXRoIGlubmVySFRNTD9cbiAgLy8gRm9yIHRoZSBqb3kgb2YgY29tcGFyaXNvbiBvZiBjb3Vyc2UhXG4gIGZ1bmN0aW9uIHJlbmRlclJ1bm5pbmdNaW5lKG1pbmUpIHtcbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPVxuICAgICAgJzxkaXYgY2xhc3M9XCJzdGF0dXMgYWN0aXZlXCI+JyArXG4gICAgICAgICc8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWNoZWNrbWFya1wiPicgK1xuICAgICAgICAgICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jaGVja21hcmtcIj48L3VzZT4nICtcbiAgICAgICAgJzwvc3ZnPicgK1xuICAgICAgICAnPHA+QWN0aXZlPC9wPicgK1xuICAgICAgJzwvZGl2PicgK1xuICAgICAgJzxkaXY+PGEgaHJlZj1cIicgKyBtaW5lLm1pbmVsb2NhdGlvbiArICdcIj4nICsgbWluZS5taW5lTmFtZSArICc8L2E+PC9kaXY+JyArXG4gICAgICAnPGRpdiBjbGFzcz1cIm1pbmUtY29uZmlnXCI+JyArXG4gICAgICAgICc8YSBocmVmPVwiY29uZmlnXCI+JyArXG4gICAgICAgICAgJzxzdmcgY2xhc3M9XCJpY29uIGljb24tdmlld1wiPicgK1xuICAgICAgICAgICAgJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXZpZXdcIj48L3VzZT4nICtcbiAgICAgICAgICAnPC9zdmc+JyArXG4gICAgICAgICAgJ1ZpZXcnICtcbiAgICAgICAgJzwvYT4nICtcbiAgICAgICAgJzxhIGhyZWY9XCIjXCI+JyArXG4gICAgICAgICAgJzxzdmcgY2xhc3M9XCJpY29uIGljb24tZG93bmxvYWRcIj4nICtcbiAgICAgICAgICAgICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kb3dubG9hZFwiPjwvdXNlPicgK1xuICAgICAgICAgICc8L3N2Zz4nICtcbiAgICAgICAgICAnRXhwb3J0JyArXG4gICAgICAgICc8L2E+JyArXG4gICAgICAnPC9kaXY+JyArXG4gICAgICAnPGRpdiBjbGFzcz1cIm1pbmUtdHJvdWJsZXNob290aW5nXCI+JyArXG4gICAgICAgICc8YSBocmVmPVwiI1wiPiBEZWxldGU8L2E+JyArXG4gICAgICAnPC9kaXY+JztcblxuICAgIHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJydW5uaW5nLW1pbmVzXCIpO1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckRhc2hib2FyZE1pbmVzKCkge1xuICAgIGZldGNoSnNvbihcIi9taW5lL2FsbFwiKVxuICAgICAgLnRoZW4oZnVuY3Rpb24obGlzdE9mTWluZXMpIHtcbiAgICAgICAgbGlzdE9mTWluZXMuZm9yRWFjaChmdW5jdGlvbihtaW5lKSB7XG4gICAgICAgICAgaWYgKG1pbmUubWluZVN0YXR1cyA9PT0gXCJpbiBwcm9ncmVzc1wiKSB7XG4gICAgICAgICAgICByZW5kZXJJblByb2dyZXNzTWluZShtaW5lKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1pbmUubWluZVN0YXR1cyA9PT0gXCJydW5uaW5nXCIpIHtcbiAgICAgICAgICAgIHJlbmRlclJ1bm5pbmdNaW5lKG1pbmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIFBhZ2U6IHVzZXJzL3Byb2ZpbGVcbiAgICovXG5cbiAgZnVuY3Rpb24gY3JlYXRlVXNlclByb2ZpbGVFbnRyeShlbnRyeSkge1xuICAgIHZhciB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG5cbiAgICB2YXIgdGl0bGUgPSBlbnRyeVswXTtcbiAgICB2YXIgdmFsdWUgPSBlbnRyeVsxXTtcblxuICAgIHRyLmlubmVySFRNTCA9XG4gICAgICAnPHRkIGNsYXNzPVwidGl0bGVcIj4nICsgdGl0bGUgKyAnPC90ZD4nICtcbiAgICAgICc8dGQ+JyArIHZhbHVlICsgJzwvdGQ+JyArXG4gICAgICAnPHRkIGNsYXNzPVwiZWRpdFwiPicgK1xuICAgICAgICAnPHN2ZyBjbGFzcz1cImljb24gaWNvbi1lZGl0XCI+JyArXG4gICAgICAgICAgJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWVkaXRcIj48L3VzZT4nICtcbiAgICAgICAgJzwvc3ZnPicgK1xuICAgICAgJzwvdGQ+JztcblxuICAgIHJldHVybiB0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVzZXJQcm9maWxlUGFzc3dvcmQoKSB7XG4gICAgdmFyIHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcblxuICAgIHRyLmlubmVySFRNTCA9XG4gICAgICAnPHRkIGNsYXNzPVwidGl0bGVcIj5QYXNzd29yZDo8L3RkPicgK1xuICAgICAgJzx0ZCBjbGFzcz1cInRvcHNlY3JldFwiPltUb3Agc2VjcmV0XSA8YSBocmVmPVwiY2hhbmdlLXBhc3N3b3JkLmh0bWxcIj5DaGFuZ2U8L2E+PC90ZD4nICtcbiAgICAgICc8dGQgY2xhc3M9XCJlZGl0XCI+JyArXG4gICAgICAgICc8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWVkaXRcIj4nICtcbiAgICAgICAgICAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tZWRpdFwiPjwvdXNlPicgK1xuICAgICAgICAnPC9zdmc+JyArXG4gICAgICAnPC90ZD4nO1xuXG4gICAgcmV0dXJuIHRyO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVXNlclByb2ZpbGVQYWlycyh1c2VyRGF0YSkge1xuICAgIHJldHVybiBbXG4gICAgICBbXCJFbWFpbDpcIiwgdXNlckRhdGEuZW1haWxdLFxuICAgICAgW1wiRmlyc3QgTmFtZShzKTpcIiwgdXNlckRhdGEuZmlyc3ROYW1lXSxcbiAgICAgIFtcIkxhc3QgTmFtZShzKTpcIiwgdXNlckRhdGEubGFzdE5hbWVdLFxuICAgICAgW1wiT3JnYW5pc2F0aW9uOlwiLCB1c2VyRGF0YS5vcmdhbmlzYXRpb25dXG4gICAgXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclVzZXJQcm9maWxlKHRhcmdldElkKSB7XG4gICAgZmV0Y2hKc29uKFwiL3VzZXIvcHJvZmlsZVwiKVxuICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcikge1xuICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKTtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5Jyk7XG5cbiAgICAgICAgdmFyIHByb2ZpbGVQYWlycyA9IGNyZWF0ZVVzZXJQcm9maWxlUGFpcnModXNlcik7XG5cbiAgICAgICAgcHJvZmlsZVBhaXJzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICB2YXIgZWxlbSA9IGNyZWF0ZVVzZXJQcm9maWxlRW50cnkoZW50cnkpO1xuICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHBhc3N3b3JkRWxlbSA9IGNyZWF0ZVVzZXJQcm9maWxlUGFzc3dvcmQoKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBhc3N3b3JkRWxlbSk7XG5cbiAgICAgICAgcmVtb3ZlQ2hpbGRyZW4obm9kZSk7XG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogUGFnZTogd2l6YXJkL3VwbG9hZFxuICAgKi9cblxuICBmdW5jdGlvbiByZW5kZXJVcGxvYWRBbGVydCh0ZXh0KSB7XG4gICAgdmFyIGFsZXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbGVydFwiKTtcbiAgICByZW1vdmVDaGlsZHJlbihhbGVydCk7XG4gICAgYWxlcnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFVwbG9hZERhdGEoKSB7XG4gICAgdmFyIGZpbGVGb3JtYXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbGV0eXBlLXNlbGVjdFwiKS52YWx1ZTtcblxuICAgIHZhciBvcmdhbmlzbVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3JnYW5pc20tc2VsZWN0XCIpO1xuICAgIHZhciB0YXhvbklEID0gb3JnYW5pc21TZWxlY3QudmFsdWU7XG4gICAgdmFyIG9yZ2FuaXNtTmFtZSA9IG9yZ2FuaXNtU2VsZWN0Lm9wdGlvbnNbb3JnYW5pc21TZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dDtcblxuICAgIGlmICghZmlsZUZvcm1hdCB8fCAhdGF4b25JRCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGZpbGwgaW4gYWxsIHRoZSBmaWVsZHMuXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBmaWxlRm9ybWF0OiBmaWxlRm9ybWF0LFxuICAgICAgb3JnYW5pc206IHtcbiAgICAgICAgbmFtZTogb3JnYW5pc21OYW1lLFxuICAgICAgICB0YXhvbklEOiB0YXhvbklEXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwbG9hZEZpbGUoKSB7XG4gICAgdmFyIHJlbW90ZVVybCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVtb3RlRmlsZVwiKS52YWx1ZTtcbiAgICB2YXIgZmlsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbGVVcGxvYWRcIikuZmlsZXM7XG5cbiAgICBpZiAocmVtb3RlVXJsKSB7XG4gICAgICAvLyBUT0RPIHRlc3QgdXBsb2FkaW5nIG9mIHJlbW90ZSBVUkxzXG4gICAgICAvLyAoSSBkb24ndCB0aGluayB0aGlzIGlzIGhhbmRsZWQgYnkgb3VyIGJhY2tlbmQgeWV0LilcbiAgICAgIHBvc3REYXRhKFwiL2RhdGEvZmlsZS91cGxvYWQvcmVtb3RlXCIsIHsgcmVtb3RlVXJsOiByZW1vdGVVcmwgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgb3BlblBhZ2UoXCIvd2l6YXJkL21hcENvbHVtbnNcIik7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoZmlsZXMubGVuZ3RoKSB7XG4gICAgICB2YXIgZmlsZSA9IGZpbGVzWzBdO1xuXG4gICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChcImRhdGFGaWxlXCIsIGZpbGUpO1xuXG4gICAgICB2YXIgdXJsID0gc2VydmljZSh7XG4gICAgICAgIHBhdGg6IFwiL2RhdGEvZmlsZS91cGxvYWQvXCIsXG4gICAgICAgIHBhcmFtczogeyBtaW5lSWQ6IHJlYWRNaW5lSWQoKSB9XG4gICAgICB9KTtcblxuICAgICAgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLnRleHQoKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24oZmlsZUlkKSB7XG4gICAgICAgIHZhciBmaWxlTmFtZSA9IGZpbGVzWzBdLm5hbWU7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgZmlsZU9iaiA9IHJlYWRVcGxvYWREYXRhKCk7XG4gICAgICAgICAgZmlsZU9iai5uYW1lID0gZmlsZU5hbWU7XG4gICAgICAgICAgZmlsZU9iai5maWxlSWQgPSBmaWxlSWQ7XG5cbiAgICAgICAgICBzYXZlU3RvcmFnZShcImN1cnJlbnRGaWxlXCIsIEpTT04uc3RyaW5naWZ5KGZpbGVPYmopKTtcbiAgICAgICAgICBvcGVuUGFnZShcIi93aXphcmQvbWFwQ29sdW1uc1wiKTtcbiAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICByZW5kZXJVcGxvYWRBbGVydChlcnIubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICByZW5kZXJVcGxvYWRBbGVydChcIkZhaWxlZCB0byB1cGxvYWQgZmlsZS5cIik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVuZGVyVXBsb2FkQWxlcnQoXCJQbGVhc2Ugc3BlY2lmeSBhIGZpbGUgdG8gdXBsb2FkLlwiKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBQYWdlOiB3aXphcmQvbWFwQ29sdW1uc1xuICAgKi9cblxuICBmdW5jdGlvbiByZW5kZXJEYXRhUHJldmlldyhkYXRhRmlsZSwgZmlsZVByZXZpZXcpIHtcbiAgICByZXBsYWNlVGV4dChcInVwbG9hZFRpdGxlXCIsIFwiVXBsb2FkOiBcIi5jb25jYXQoZGF0YUZpbGUubmFtZSkpO1xuXG4gICAgcmVwbGFjZVRleHQoXCJwcmV2aWV3SGVhZGVyTGFiZWxcIiwgZmlsZVByZXZpZXcuaGVhZGVyTGFiZWwpO1xuICAgIHJlcGxhY2VUZXh0KFwicHJldmlld0hlYWRlclJvd1wiLCBmaWxlUHJldmlldy5oZWFkZXJSb3dbMF0uam9pbignIHwgJykpO1xuICAgIHJlcGxhY2VUZXh0KFwicHJldmlld1NuaXBwZXRMYWJlbFwiLCBmaWxlUHJldmlldy5zbmlwcGV0TGFiZWwpO1xuICAgIHJlcGxhY2VUZXh0KFwicHJldmlld0ZpbGVTbmlwcGV0XCIsIGZpbGVQcmV2aWV3LmZpbGVTbmlwcGV0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckRhdGFEZXNjcmlwdG9ycyhkZXNjcmlwdG9ycykge1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdG9yc1wiKTtcblxuICAgIGRlc2NyaXB0b3JzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgdmFyIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgIHNwYW4uY2xhc3NOYW1lID0gXCJ0aXRsZVwiO1xuICAgICAgdmFyIG5hbWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtLmF0dHJpYnV0ZU5hbWUpO1xuICAgICAgdmFyIHZhbHVlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbS5hdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICBzcGFuLmFwcGVuZENoaWxkKG5hbWUpO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICBsaS5hcHBlbmRDaGlsZCh2YWx1ZSk7XG4gICAgICBub2RlLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBxdWVzdGlvbnNTdG9yZSA9IFtdO1xuXG4gIGZ1bmN0aW9uIHJlbmRlckRhdGFRdWVzdGlvbnMocXVlc3Rpb25zKSB7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF1ZXN0aW9uc1wiKTtcblxuICAgIHF1ZXN0aW9uc1N0b3JlID0gW107XG5cbiAgICBxdWVzdGlvbnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cbiAgICAgIHZhciBoNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNVwiKTtcbiAgICAgIGg1LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGl0ZW0ucXVlc3Rpb25IZWFkZXIpKTtcblxuICAgICAgdmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIHAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbS5xdWVzdGlvbldvcmRpbmcpKTtcblxuICAgICAgdmFyIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcblxuICAgICAgaXRlbS5wb3NzaWJsZUFuc3dlcnMuZm9yRWFjaChmdW5jdGlvbihhbnN3ZXIpIHtcbiAgICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuXG4gICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgaW5wdXQudHlwZSA9IFwicmFkaW9cIjtcbiAgICAgICAgaW5wdXQuY2hlY2tlZCA9IGFuc3dlci5pc0RlZmF1bHQ7XG4gICAgICAgIGlucHV0LnZhbHVlID0gYW5zd2VyLmFuc3dlcklkO1xuICAgICAgICBpbnB1dC5uYW1lID0gaXRlbS5xdWVzdGlvbklkO1xuXG4gICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYW5zd2VyLmFuc3dlckxhYmVsKSlcblxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgIH0pO1xuXG4gICAgICBxdWVzdGlvbnNTdG9yZS5wdXNoKGl0ZW0ucXVlc3Rpb25JZCk7XG5cbiAgICAgIGxpLmFwcGVuZENoaWxkKGg1KTtcbiAgICAgIGxpLmFwcGVuZENoaWxkKHApO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICAgIG5vZGUuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdE1hcENvbHVtbnMoKSB7XG4gICAgcG9zdERhdGEoe1xuICAgICAgcGF0aDogXCIvY29uZmlndXJhdG9yL2ZpbGUvcHJvcGVydGllcy9kZXRlY3RcIixcbiAgICAgIHBhcmFtczogeyBtaW5lSWQ6IHJlYWRNaW5lSWQoKSB9XG4gICAgfSwgeyBmaWxlSWQ6IFwiVE9ET1wiIH0pXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICByZW5kZXJEYXRhUHJldmlldyhkYXRhLmRhdGFGaWxlLCBkYXRhLmZpbGVQcmV2aWV3KTtcbiAgICAgICAgcmVuZGVyRGF0YURlc2NyaXB0b3JzKGRhdGEuZGVzY3JpcHRvcnMpO1xuICAgICAgICByZW5kZXJEYXRhUXVlc3Rpb25zKGRhdGEucXVlc3Rpb25zKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2F2ZU1hcENvbHVtbnMoKSB7XG4gICAgdmFyIGFuc3dlcnMgPSBxdWVzdGlvbnNTdG9yZS5tYXAoZnVuY3Rpb24ocXVlc3Rpb25JZCkge1xuICAgICAgdmFyIGFuc3dlcklkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJ2lucHV0W25hbWU9XCInICsgcXVlc3Rpb25JZCArICdcIl06Y2hlY2tlZCdcbiAgICAgICkudmFsdWU7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHF1ZXN0aW9uSWQ6IHF1ZXN0aW9uSWQsXG4gICAgICAgIGFuc3dlcklkOiBhbnN3ZXJJZFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcG9zdERhdGEoe1xuICAgICAgcGF0aDogXCIvY29uZmlndXJhdG9yL2ZpbGUvcHJvcGVydGllcy9zYXZlXCIsXG4gICAgICBwYXJhbXM6IHsgbWluZUlkOiByZWFkTWluZUlkKCkgfVxuICAgIH0sIHsgZmlsZUlEOiBcIlRPRE9cIiwgYW5zd2VyczogYW5zd2VycyB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIG9wZW5QYWdlKFwiL3dpemFyZC9zdXBwbGVtZW50YXJ5RGF0YVwiKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogUGFnZTogd2l6YXJkL3N1cHBsZW1lbnRhcnlEYXRhXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbmRlclN1cHBsZW1lbnRhcnlEYXRhKCkge1xuICAgIGZldGNoSnNvbihcIi9jb25maWd1cmF0b3Ivc3VwcGxlbWVudGFyeURhdGFTb3VyY2VzXCIpXG4gICAgICAudGhlbihmdW5jdGlvbihkYXRhU291cmNlcykge1xuICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VwcGxlbWVudGFyeURhdGFTb3VyY2VzXCIpO1xuXG4gICAgICAgIHJlbW92ZUNoaWxkcmVuKG5vZGUpO1xuXG4gICAgICAgIGRhdGFTb3VyY2VzLmZvckVhY2goZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cbiAgICAgICAgICBpbnB1dC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICAgIGlucHV0LnZhbHVlID0gc291cmNlLmlkO1xuICAgICAgICAgIGlucHV0Lm5hbWUgPSBcInN1cHBsZW1lbnRhcnlcIjtcbiAgICAgICAgICBpbnB1dC5jaGVja2VkID0gXCJjaGVja2VkXCJcblxuICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzb3VyY2UubGFiZWwpKTtcbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChsYWJlbCk7XG5cbiAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckRhdGFUb29scygpIHtcbiAgICBmZXRjaEpzb24oXCIvY29uZmlndXJhdG9yL2RhdGFUb29sc1wiKVxuICAgICAgLnRoZW4oZnVuY3Rpb24odG9vbHMpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGFUb29sc1wiKTtcblxuICAgICAgICByZW1vdmVDaGlsZHJlbihub2RlKTtcblxuICAgICAgICB0b29scy5mb3JFYWNoKGZ1bmN0aW9uKHRvb2wpIHtcbiAgICAgICAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cbiAgICAgICAgICB2YXIgaDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgICAgaDMuY2xhc3NOYW1lID0gXCJzdWJIZWFkZXJcIjtcbiAgICAgICAgICBoMy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0b29sLnRvb2xOYW1lKSk7XG5cbiAgICAgICAgICB2YXIgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgIHAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodG9vbC50b29sRGVzY3JpcHRpb24pKTtcblxuICAgICAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcblxuICAgICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICBpbnB1dC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICAgIGlucHV0LnZhbHVlID0gdG9vbC50b29sSWQ7XG4gICAgICAgICAgaW5wdXQubmFtZSA9IFwidG9vbFwiO1xuICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSBcImNoZWNrZWRcIjtcblxuICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkVuYWJsZWRcIikpO1xuXG4gICAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFwiaW1hZ2VQcmV2aWV3XCI7XG5cbiAgICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICBpbWcuc3JjID0gdG9vbC50b29sUHJldmlldztcblxuICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChpbWcpO1xuXG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaDMpO1xuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKHApO1xuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChkaXYpO1xuXG4gICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChsaSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0U3VwcGxlbWVudGFyaWVzKCkge1xuICAgIHJlbmRlclN1cHBsZW1lbnRhcnlEYXRhKCk7XG4gICAgcmVuZGVyRGF0YVRvb2xzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDaGVja2VkTmFtZXMobmFtZSkge1xuICAgIHZhciBjaGVja2VkID0gW107XG5cbiAgICB2YXIgY2hlY2tib3hlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKG5hbWUpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGVja2JveGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY2hlY2tib3hlc1tpXS5jaGVja2VkKSB7XG4gICAgICAgIGNoZWNrZWQucHVzaChjaGVja2JveGVzW2ldLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2hlY2tlZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhdmVTdXBwbGVtZW50YXJ5RGF0YVNvdXJjZXMoKSB7XG4gICAgdmFyIGNoZWNrZWQgPSBnZXRDaGVja2VkTmFtZXMoXCJzdXBwbGVtZW50YXJ5XCIpO1xuXG4gICAgcmV0dXJuIHBvc3REYXRhKHtcbiAgICAgIHBhdGg6IFwiL2NvbmZpZ3VyYXRvci9taW5lL3N1cHBsZW1lbnRhcnlEYXRhU291cmNlc1wiLFxuICAgICAgcGFyYW1zOiB7IG1pbmVJZDogcmVhZE1pbmVJZCgpIH1cbiAgICB9LCB7IHNvdXJjZXM6IGNoZWNrZWQgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzYXZlRGF0YVRvb2xzKCkge1xuICAgIHZhciBjaGVja2VkID0gZ2V0Q2hlY2tlZE5hbWVzKFwidG9vbFwiKTtcblxuICAgIHJldHVybiBwb3N0RGF0YSh7XG4gICAgICBwYXRoOiBcIi9jb25maWd1cmF0b3IvbWluZS9kYXRhVG9vbHNcIixcbiAgICAgIHBhcmFtczogeyBtaW5lSWQ6IHJlYWRNaW5lSWQoKSB9XG4gICAgfSwgeyB0b29sczogY2hlY2tlZCB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhdmVTdXBwbGVtZW50YXJpZXMoKSB7XG4gICAgUHJvbWlzZS5hbGwoW1xuICAgICAgc2F2ZVN1cHBsZW1lbnRhcnlEYXRhU291cmNlcygpLFxuICAgICAgc2F2ZURhdGFUb29scygpXG4gICAgXSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIG9wZW5QYWdlKFwiL3dpemFyZC9jb25maWdcIik7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBQYWdlOiB3aXphcmQvY29uZmlnXG4gICAqL1xuXG4gIHZhciBtaW5lQXZhaWxhYmlsaXR5VGltZXI7XG5cbiAgZnVuY3Rpb24gcmVuZGVyQ2hlY2tBdmFpbGFiaWxpdHkoZXZlbnQpIHtcbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KG1pbmVBdmFpbGFiaWxpdHlUaW1lcik7XG5cbiAgICBtaW5lQXZhaWxhYmlsaXR5VGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHBvc3REYXRhKFwiL21pbmUvbmFtZUF2YWlsYWJpbGl0eVwiLCB7IG1pbmVOYW1lOiBldmVudC50YXJnZXQudmFsdWUgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICB2YXIgaWNvbk5hbWUgPSBkYXRhLmlzQXZhaWxhYmxlID8gXCJjaGVja21hcmtcIiA6IFwiY3Jvc3NcIjtcbiAgICAgICAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFxuICAgICAgICAgICAgZGF0YS5pc0F2YWlsYWJsZVxuICAgICAgICAgICAgICA/IFwiVGhpcyBwcm9qZWN0IG5hbWUgaXMgZnJlZSFcIlxuICAgICAgICAgICAgICA6IFwiVGhpcyBwcm9qZWN0IG5hbWUgaXMgdGFrZW4uXCJcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZhbGlkYXRpb25cIik7XG5cbiAgICAgICAgICB2YXIgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN2Z1wiKTtcbiAgICAgICAgICBzdmcuY2xhc3NOYW1lID0gXCJpY29uIGljb24tXCIuY29uY2F0KGljb25OYW1lKTtcblxuICAgICAgICAgIHZhciB1c2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidXNlXCIpO1xuICAgICAgICAgIHVzZVsneGxpbms6aHJlZiddID0gXCIjaWNvbi1cIi5jb25jYXQoaWNvbk5hbWUpO1xuXG4gICAgICAgICAgc3ZnLmFwcGVuZENoaWxkKHVzZSk7XG5cbiAgICAgICAgICByZW1vdmVDaGlsZHJlbihub2RlKTtcblxuICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoc3ZnKTtcbiAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgICB9KTtcbiAgICB9LCA1MDApO1xuICB9XG5cbiAgZnVuY3Rpb24gc2F2ZURlc2NyaXB0b3JzKCkge1xuICAgIHZhciBtaW5lTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluZU5hbWVJbnB1dFwiKS52YWx1ZTtcblxuICAgIHZhciBwcml2YWN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICdpbnB1dFtuYW1lPVwicHVibGljUHJpdmF0ZVwiXTpjaGVja2VkJ1xuICAgICkudmFsdWU7XG5cbiAgICBwb3N0RGF0YSh7XG4gICAgICBwYXRoOiBcIi9jb25maWd1cmF0b3IvbWluZS9kZXNjcmlwdG9yc1wiLFxuICAgICAgcGFyYW1zOiB7IG1pbmVJZDogcmVhZE1pbmVJZCgpIH1cbiAgICB9LCB7IG1pbmVOYW1lOiBtaW5lTmFtZSwgcHJpdmFjeTogcHJpdmFjeSB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIC8vIFRPRE8gaGFuZGxlIGNhc2Ugd2hlcmUgYG1pbmVOYW1lYCBpcyBhbHJlYWR5IHRha2VuXG4gICAgICAgIG9wZW5QYWdlKFwiL3dpemFyZC9maW5hbGlzZVwiKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogUGFnZTogd2l6YXJkL2ZpbmFsaXNlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbmRlckZpbmFsaXNlVXBsb2FkZWRGaWxlcyhmaWxlcykge1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGxvYWRlZEZpbGVzXCIpO1xuXG4gICAgcmVtb3ZlQ2hpbGRyZW4obm9kZSk7XG5cbiAgICBmaWxlcy5mb3JFYWNoKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZGl2LmNsYXNzTmFtZSA9IFwic3ViU3RlcENvbnRlbnRcIjtcbiAgICAgIHZhciBoNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcbiAgICAgIGg0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGZpbGUuZGF0YUZpbGUubmFtZSkpO1xuICAgICAgdmFyIHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgdmFyIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgIHNwYW4uY2xhc3NOYW1lID0gXCJ0aXRsZVwiO1xuICAgICAgc3Bhbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIk9yZ2FuaXNtOlwiKSk7XG5cbiAgICAgIGxpLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZmlsZS5kYXRhRmlsZS5vcmdhbmlzbS5uYW1lKSk7XG4gICAgICB1bC5hcHBlbmRDaGlsZChsaSk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoaDQpO1xuICAgICAgZGl2LmFwcGVuZENoaWxkKHVsKTtcblxuICAgICAgbm9kZS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyTGlzdChlbGVtSWQsIGl0ZW1zKSB7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSWQpO1xuXG4gICAgcmVtb3ZlQ2hpbGRyZW4obm9kZSk7XG5cbiAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICBhLmhyZWYgPSBpdGVtLnVybDtcbiAgICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbS50ZXh0KTtcblxuICAgICAgYS5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgIGxpLmFwcGVuZENoaWxkKGEpO1xuICAgICAgbm9kZS5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJGaW5hbGlzZVN1cHBsZW1lbnRhcmllcyhzb3VyY2VzLCB0b29scykge1xuICAgIHJlbmRlckxpc3QoXCJzdXBwbGVtZW50YXJ5RGF0YVwiLCBzb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgIHJldHVybiB7IHRleHQ6IHNvdXJjZS5sYWJlbCwgdXJsOiBzb3VyY2UudXJsIH07XG4gICAgfSkpO1xuXG4gICAgcmVuZGVyTGlzdChcImRhdGFUb29sc1wiLCB0b29scy5tYXAoZnVuY3Rpb24odG9vbCkge1xuICAgICAgcmV0dXJuIHsgdGV4dDogdG9vbC50b29sTmFtZSwgdXJsOiB0b29sLnRvb2xQcmV2aWV3IH07XG4gICAgfSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyRmluYWxpc2VEZXNjcmlwdG9yKGRlc2NyaXB0b3IpIHtcbiAgICB2YXIgdXJsRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluZU5hbWVcIik7XG4gICAgcmVtb3ZlQ2hpbGRyZW4odXJsRWxlbSk7XG4gICAgdXJsRWxlbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkZXNjcmlwdG9yLm1pbmVOYW1lKSk7XG5cbiAgICB2YXIgcHJpdmFjeUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaXZhY3lcIik7XG4gICAgcmVtb3ZlQ2hpbGRyZW4ocHJpdmFjeUVsZW0pO1xuICAgIHByaXZhY3lFbGVtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRlc2NyaXB0b3IucHJpdmFjeSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdEZpbmFsaXNlKCkge1xuICAgIGZldGNoSnNvbih7XG4gICAgICBwYXRoOiBcIi9jb25maWd1cmF0b3IvbWluZS91c2VyLWNvbmZpZ1wiLFxuICAgICAgcGFyYW1zOiB7IG1pbmVJZDogcmVhZE1pbmVJZCgpIH1cbiAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICByZW5kZXJGaW5hbGlzZVVwbG9hZGVkRmlsZXMoZGF0YS5kYXRhRmlsZXMpO1xuICAgICAgICByZW5kZXJGaW5hbGlzZVN1cHBsZW1lbnRhcmllcyhkYXRhLnN1cHBsZW1lbnRhcnlEYXRhU291cmNlcywgZGF0YS5kYXRhVG9vbHMpO1xuICAgICAgICByZW5kZXJGaW5hbGlzZURlc2NyaXB0b3IoZGF0YS5taW5lRGVzY3JpcHRvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIEV4cG9ydHNcbiAgICovXG5cbiAgcmV0dXJuIHtcbiAgICBvcGVuSW5pdGlhbFBhZ2U6IG9wZW5Jbml0aWFsUGFnZSxcbiAgICByZWdpc3RlclVzZXI6IHJlZ2lzdGVyVXNlcixcbiAgICBsb2dpblVzZXI6IGxvZ2luVXNlcixcbiAgICByZW5kZXJEYXNoYm9hcmRNaW5lczogcmVuZGVyRGFzaGJvYXJkTWluZXMsXG4gICAgcmVuZGVyVXNlclByb2ZpbGU6IHJlbmRlclVzZXJQcm9maWxlLFxuICAgIHVwbG9hZEZpbGU6IHVwbG9hZEZpbGUsXG4gICAgaW5pdE1hcENvbHVtbnM6IGluaXRNYXBDb2x1bW5zLFxuICAgIHNhdmVNYXBDb2x1bW5zOiBzYXZlTWFwQ29sdW1ucyxcbiAgICBpbml0U3VwcGxlbWVudGFyaWVzOiBpbml0U3VwcGxlbWVudGFyaWVzLFxuICAgIHNhdmVTdXBwbGVtZW50YXJpZXM6IHNhdmVTdXBwbGVtZW50YXJpZXMsXG4gICAgcmVuZGVyQ2hlY2tBdmFpbGFiaWxpdHk6IHJlbmRlckNoZWNrQXZhaWxhYmlsaXR5LFxuICAgIHNhdmVEZXNjcmlwdG9yczogc2F2ZURlc2NyaXB0b3JzLFxuICAgIGluaXRGaW5hbGlzZTogaW5pdEZpbmFsaXNlXG4gIH07XG59KSgpO1xuIiwiLy8gdmFyIGVuZHBvaW50ID0gXCJodHRwczovL3dpemFyZC5pbnRlcm1pbmUub3JnL3YxXCI7XG52YXIgZW5kcG9pbnQgPSBcImh0dHA6Ly8xMjcuMC4wLjE6OTk5MS9hcGkvdjFcIjtcblxuLy8gU2luY2Ugb3VyIHNlcnZlciAobm90IHRoZSBBUEkpIGRvZXNuJ3Qga25vdyB3aGV0aGVyIHRoZSB1c2VyIGlzXG4vLyBhdXRoZW50aWNhdGVkLCBjaGVja2luZyBmb3IgdGhpcyBhbmQgc2VuZGluZyB0aGVtIHRvIHRoZSBgL3JlZ2lzdGVyYCBwYWdlXG4vLyBpcyBhIGNvbW1vbiBwYXR0ZXJuLiBXZSBjb2RpZnkgdGhpcyBoZXJlLCBzbyB0aGF0IHdlIGNhbiB1c2UgaXQgaW4gb3VyXG4vLyBnZW5lcmljIHJlcXVlc3QgZnVuY3Rpb25zIGJlbG93LlxuZnVuY3Rpb24gaGFuZGxlRXJyb3JSZXNwb25zZShyZXMpIHtcbiAgaWYgKHJlcy5zdGF0dXMgPT09IDQwMSkge1xuICAgIC8vIFRoZSB1c2VyIGlzbid0IGF1dGhvcml6ZWQsIHNvIG1ha2UgdGhlbSBzaWduIGluLlxuICAgIG9wZW5QYWdlKFwiL3JlZ2lzdGVyXCIpO1xuICAgIHJldHVybiBuZXcgRXJyb3IoXCJZb3UgYXJlIG5vdCBhdXRob3JpemVkLlwiKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG5cbi8vIEFyZ3VtZW50IGNhbiBiZSBlaXRoZXIgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBwYXRoIG9yIGFuIG9iamVjdCB3aXRoXG4vLyBgcGF0aGAgYW5kIGBwYXJhbXNgIGtleXMsIHdoZXJlIHBhcmFtcyBpcyBhbiBvYmplY3Qgb2Ygc3RyaW5nIGVudHJpZXMuXG5mdW5jdGlvbiBzZXJ2aWNlKGFyZykge1xuICBpZiAodHlwZW9mIGFyZyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBXaGVuIHdlIGFkZCBxdWVyeSBwYXJhbXMsIG91ciBiYWNrZW5kIHdpbGwgY29tcGxhaW4gaWYgd2UgZG9uJ3QgaGF2ZSBhXG4gICAgLy8gdHJhaWxpbmcgc2xhc2guXG4gICAgdmFyIHBhdGggPSBhcmcucGF0aC5zbGljZSgtMSkgPT09ICcvJyA/IGFyZy5wYXRoIDogYXJnLnBhdGguY29uY2F0KCcvJyk7XG5cbiAgICB2YXIgdXJsID0gbmV3IFVSTChlbmRwb2ludC5jb25jYXQocGF0aCkpO1xuXG4gICAgaWYgKCdwYXJhbXMnIGluIGFyZykge1xuICAgICAgZm9yICh2YXIga2V5IGluIGFyZy5wYXJhbXMpIHtcbiAgICAgICAgaWYgKGFyZy5wYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHZhciB2YWwgPSBhcmcucGFyYW1zW2tleV07XG4gICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHVybDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZW5kcG9pbnQuY29uY2F0KGFyZyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmV0Y2hKc29uKHBhdGgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZldGNoKHNlcnZpY2UocGF0aCksIHtcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QoaGFuZGxlRXJyb3JSZXNwb25zZShyZXMpKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcG9zdERhdGEocGF0aCwgZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZmV0Y2goc2VydmljZShwYXRoKSwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChoYW5kbGVFcnJvclJlc3BvbnNlKHJlcykpO1xuICAgICAgfVxuICAgIH0pXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvcGVuUGFnZShwYXRoKSB7XG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcGF0aDtcbn1cblxuXG5leHBvcnQge1xuICBwb3N0RGF0YSwgZmV0Y2hKc29uLCBzZXJ2aWNlLCBvcGVuUGFnZVxufVxuIiwiaW1wb3J0IHtwb3N0RGF0YSwgb3BlblBhZ2V9IGZyb20gXCIuL2NvbW1zLmpzXCI7XG5pbXBvcnQge2NsZWFyQWxlcnRNZXNzYWdlLCByZW5kZXJBbGVydE1lc3NhZ2V9IGZyb20gXCIuL3VpLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbigpIHtcblxuICAvKlxuICAgKiBQYWdlOiByZWdpc3RlclxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIHJlYWRGb3JtKG9iaikge1xuICAgIHZhciBpbnB1dHMgPSB7fTtcblxuICAgIE9iamVjdC5lbnRyaWVzKG9iai5pbnB1dHMpLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBrZXkgPSBlbnRyeVswXTtcbiAgICAgIHZhciB2YWwgPSBlbnRyeVsxXTtcbiAgICAgIGlucHV0c1trZXldID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmFsKS52YWx1ZTtcbiAgICB9KTtcblxuICAgIGNsZWFyQWxlcnRNZXNzYWdlKG9iai5hbGVydElkKTtcblxuICAgIHZhciBlcnJvciA9IG9iai52YWxpZGF0aW9ucy5zb21lKGZ1bmN0aW9uKHRlc3RGdW4pIHtcbiAgICAgIHZhciByZXMgPSB0ZXN0RnVuKGlucHV0cyk7XG4gICAgICBpZiAocmVzKSByZW5kZXJBbGVydE1lc3NhZ2Uob2JqLmFsZXJ0SWQsIHJlcyk7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0pO1xuXG4gICAgaWYgKGVycm9yKSByZXR1cm47XG4gICAgZWxzZSByZXR1cm4gaW5wdXRzO1xuICB9XG5cbiAgdmFyIHZhbGlkYXRlID0ge1xuICAgIHBhc3N3b3Jkc01hdGNoOiBmdW5jdGlvbihpbnB1dHMpIHtcbiAgICAgIGlmIChpbnB1dHMucGFzc3dvcmQgIT09IGlucHV0cy5wYXNzd29yZENvbmZpcm0pIHtcbiAgICAgICAgcmV0dXJuIFwiUGFzc3dvcmRzIGRvIG5vdCBtYXRjaC5cIjtcbiAgICAgIH1cbiAgICB9LFxuICAgIG5vdEVtcHR5OiBmdW5jdGlvbihpbnB1dHMpIHtcbiAgICAgIGlmIChPYmplY3QudmFsdWVzKGlucHV0cykuc29tZShmdW5jdGlvbihpbnApIHsgcmV0dXJuICFpbnA7IH0pKSB7XG4gICAgICAgIHJldHVybiBcIlBsZWFzZSBmaWxsIGluIGFsbCB0aGUgZmllbGRzLlwiO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiByZWdpc3RlclVzZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIGlucHV0RGF0YSA9IHJlYWRGb3JtKHtcbiAgICAgIGlucHV0czoge1xuICAgICAgICBlbWFpbDogXCJyZWdpc3Rlci1lbWFpbFwiLFxuICAgICAgICBmaXJzdE5hbWU6IFwicmVnaXN0ZXItZmlyc3QtbmFtZVwiLFxuICAgICAgICBsYXN0TmFtZTogXCJyZWdpc3Rlci1sYXN0LW5hbWVcIixcbiAgICAgICAgb3JnYW5pc2F0aW9uOiBcInJlZ2lzdGVyLW9yZ2FuaXNhdGlvblwiLFxuICAgICAgICBwYXNzd29yZDogXCJyZWdpc3Rlci1wYXNzd29yZFwiLFxuICAgICAgICBwYXNzd29yZENvbmZpcm06IFwicmVnaXN0ZXItcGFzc3dvcmQtY29uZmlybVwiXG4gICAgICB9LFxuICAgICAgYWxlcnRJZDogXCJyZWdpc3RlckZvcm1BbGVydFwiLFxuICAgICAgdmFsaWRhdGlvbnM6IFtcbiAgICAgICAgdmFsaWRhdGUucGFzc3dvcmRzTWF0Y2gsXG4gICAgICAgIHZhbGlkYXRlLm5vdEVtcHR5LFxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgaWYgKGlucHV0RGF0YSkge1xuICAgICAgcG9zdERhdGEoXCIvdXNlci9yZWdpc3RlclwiLCBpbnB1dERhdGEpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlZ2lzdGVyUmVzKSB7XG4gICAgICAgICAgcmVuZGVyQWxlcnRNZXNzYWdlKFwicmVnaXN0ZXJGb3JtQWxlcnRcIiwgXCJBY2NvdW50IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LlwiKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVyclJlcykge1xuICAgICAgICAgIGlmIChlcnJSZXMgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJSZXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgYW55IGVycm9yIG1lc3NhZ2VzIGZyb20gYmFja2VuZC5cbiAgICAgICAgICAgIGVyclJlcy5qc29uKClcbiAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyQWxlcnRNZXNzYWdlKFwicmVnaXN0ZXJGb3JtQWxlcnRcIiwgcmVzLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ2luVXNlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB2YXIgaW5wdXREYXRhID0gcmVhZEZvcm0oe1xuICAgICAgaW5wdXRzOiB7XG4gICAgICAgIGVtYWlsOiBcInNpZ25pbi1lbWFpbFwiLFxuICAgICAgICBwYXNzd29yZDogXCJzaWduaW4tcGFzc3dvcmRcIlxuICAgICAgfSxcbiAgICAgIGFsZXJ0SWQ6IFwic2lnbmluRm9ybUFsZXJ0XCIsXG4gICAgICB2YWxpZGF0aW9uczogW1xuICAgICAgICB2YWxpZGF0ZS5ub3RFbXB0eSxcbiAgICAgIF1cbiAgICB9KTtcblxuICAgIGlmIChpbnB1dERhdGEpIHtcbiAgICAgIHBvc3REYXRhKFwiL3VzZXIvbG9naW5cIiwgaW5wdXREYXRhKVxuICAgICAgICAudGhlbihmdW5jdGlvbihsb2dpblJlcykge1xuICAgICAgICAgIG9wZW5Jbml0aWFsUGFnZSgpO1xuICAgICAgICB9KTtcbiAgICAgIC8vIFRPRE8gaGFuZGxlIGludmFsaWQgbG9naW4gKEkgZG9uJ3QgdGhpbmsgdGhlIGJhY2tlbmQgY3VycmVudGx5IGdpdmVzXG4gICAgICAvLyB1cyBhIGxlZ2liaWxlIHJlc3BvbnNlIHdoZW4gdGhpcyBoYXBwZW5zLCBqdXN0IDQwMCBCYWQgUmVxdWVzdClcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuXG59KTtcbiIsImZ1bmN0aW9uIHJlbmRlckFsZXJ0TWVzc2FnZShlbGVtSWQsIHRleHQpIHtcbiAgdmFyIHNwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSWQpO1xuXG4gIHNwYW4uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpO1xufVxuXG5mdW5jdGlvbiBjbGVhckFsZXJ0TWVzc2FnZShlbGVtSWQpIHtcbiAgdmFyIHNwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSWQpO1xuXG4gIHJlbW92ZUNoaWxkcmVuKHNwYW4pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDaGlsZHJlbihub2RlKSB7XG4gIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVwbGFjZVRleHQoZWxlbUlkLCB0ZXh0KSB7XG4gIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKTtcbiAgdmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgcmVtb3ZlQ2hpbGRyZW4oZWxlbSk7XG4gIGVsZW0uYXBwZW5kQ2hpbGQodGV4dCk7XG59XG5cbmV4cG9ydCB7Y2xlYXJBbGVydE1lc3NhZ2UsIHJlbmRlckFsZXJ0TWVzc2FnZSwgcmVtb3ZlQ2hpbGRyZW4sIHJlcGxhY2VUZXh0fVxuIl0sInNvdXJjZVJvb3QiOiIifQ==