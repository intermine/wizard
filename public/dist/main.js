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
 * - Promise
 * - URL searchParams
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

  function createMineId() {
    return new Promise(function(resolve, reject) {
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])("/configurator/mine/user-config/new/")
        .then(function(mineId) {
          sessionStorage.setItem("mineId", mineId);
          resolve(mineId);
        });
    });
  }

  function readMineId() {
    return sessionStorage.getItem("mineId");
  }

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
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])("/user/register", inputData)
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
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])("/user/login", inputData)
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
    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])("/mine/all")
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
    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])("/user/profile")
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

  function uploadFile() {
    var remoteUrl = document.getElementById("remoteFile").value;

    if (remoteUrl) {
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])("/data/file/upload/remote", { remoteUrl: remoteUrl })
        .then(function(res) {
          Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["openPage"])("/wizard/mapColumns");
        });
    } else {
      var file = document.getElementById("fileUpload").files[0];

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
        console.log("SUCCESSFULLY UPLOADED FILE!");
        console.log(res);
        // Things we need to do here:
        // - Somehow save the `fileId` we receive in the response
        // - Display a loading indicator
        // - When uploading is completed, we can go to the next page
      });
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
    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])({
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

    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])({
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
    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])("/configurator/supplementaryDataSources")
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
    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])("/configurator/dataTools")
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

    return Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])({
      path: "/configurator/mine/supplementaryDataSources",
      params: { mineId: readMineId() }
    }, { sources: checked });
  }

  function saveDataTools() {
    var checked = getCheckedNames("tool");

    return Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])({
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
      Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])("/mine/nameAvailability", { mineName: event.target.value })
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

    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["postData"])({
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
    Object(_comms_js__WEBPACK_IMPORTED_MODULE_0__["fetchJson"])({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aXphcmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL2NsaWVudC5qcyIsIndlYnBhY2s6Ly93aXphcmQvLi9wdWJsaWMvanMvY29tbXMuanMiLCJ3ZWJwYWNrOi8vd2l6YXJkLy4vcHVibGljL2pzL3JlZ2lzdGVyLmpzIiwid2VicGFjazovL3dpemFyZC8uL3B1YmxpYy9qcy91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBa0U7QUFDeEI7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU0sMkRBQVM7QUFDZjtBQUNBO0FBQ0E7QUFD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O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsSUFBSSxnRUFBaUI7O0FBRXJCO0FBQ0E7QUFDQSxlQUFlLGlFQUFrQjtBQUNqQztBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxvREFBb0QsYUFBYSxFQUFFO0FBQ25FO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLE1BQU0sMERBQVE7QUFDZDtBQUNBLFVBQVUsaUVBQWtCO0FBQzVCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlFQUFrQjtBQUNsQyxlQUFlO0FBQ2Y7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLE1BQU0sMERBQVE7QUFDZDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQSxDQUFDLEVBQUU7Ozs7Ozs7Ozs7Ozs7QUMvR0g7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRTJFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3B1YmxpYy9qcy9jbGllbnQuanNcIik7XG4iLCJpbXBvcnQge3Bvc3REYXRhLCBmZXRjaEpzb24sIHNlcnZpY2UsIG9wZW5QYWdlfSBmcm9tIFwiLi9jb21tcy5qc1wiO1xuaW1wb3J0IGRlZmF1bHRFeHBvcnQgZnJvbSBcIi4vcmVnaXN0ZXIuanNcIjtcblxuLyogUG9zc2libGUgcG9seWZpbGxzIHdlJ2xsIHdhbnQ6XG4gKiAtIEZldGNoXG4gKiAtIFByb21pc2VcbiAqIC0gVVJMIHNlYXJjaFBhcmFtc1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbigpIHtcblxuICBmdW5jdGlvbiByZW1vdmVDaGlsZHJlbihub2RlKSB7XG4gICAgd2hpbGUgKG5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2VUZXh0KGVsZW1JZCwgdGV4dCkge1xuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKTtcbiAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgIHJlbW92ZUNoaWxkcmVuKGVsZW0pO1xuICAgIGVsZW0uYXBwZW5kQ2hpbGQodGV4dCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVNaW5lSWQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZmV0Y2hKc29uKFwiL2NvbmZpZ3VyYXRvci9taW5lL3VzZXItY29uZmlnL25ldy9cIilcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24obWluZUlkKSB7XG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcIm1pbmVJZFwiLCBtaW5lSWQpO1xuICAgICAgICAgIHJlc29sdmUobWluZUlkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkTWluZUlkKCkge1xuICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibWluZUlkXCIpO1xuICB9XG5cbiAgLypcbiAgICogUGFnZTogaG9tZVxuICAgKi9cblxuICBmdW5jdGlvbiBvcGVuSW5pdGlhbFBhZ2UoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBmZXRjaEpzb24oXCIvbWluZS9hbGxcIilcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGxpc3RPZk1pbmVzKSB7XG4gICAgICAgIGlmIChsaXN0T2ZNaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgICAvLyBXZSBoYXZlIG1pbmVzOyBkaXNwbGF5IHRoZW0gaW4gdGhlIGRhc2hib2FyZCBwYWdlIVxuICAgICAgICAgIG9wZW5QYWdlKFwiL2Rhc2hib2FyZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBXZSBkb24ndCBoYXZlIG1pbmVzOyBnZXQgc3RhcnRlZCB3aXRoIHRoZSB3aXphcmQhXG4gICAgICAgICAgY3JlYXRlTWluZUlkKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBvcGVuUGFnZShcIi93aXphcmQvdXBsb2FkXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogUGFnZTogcmVnaXN0ZXJcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVuZGVyQWxlcnRNZXNzYWdlKGVsZW1JZCwgdGV4dCkge1xuICAgIHZhciBzcGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKTtcblxuICAgIHNwYW4uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJBbGVydE1lc3NhZ2UoZWxlbUlkKSB7XG4gICAgdmFyIHNwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSWQpO1xuXG4gICAgcmVtb3ZlQ2hpbGRyZW4oc3Bhbik7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkRm9ybShvYmopIHtcbiAgICB2YXIgaW5wdXRzID0ge307XG5cbiAgICBPYmplY3QuZW50cmllcyhvYmouaW5wdXRzKS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIga2V5ID0gZW50cnlbMF07XG4gICAgICB2YXIgdmFsID0gZW50cnlbMV07XG4gICAgICBpbnB1dHNba2V5XSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZhbCkudmFsdWU7XG4gICAgfSk7XG5cbiAgICBjbGVhckFsZXJ0TWVzc2FnZShvYmouYWxlcnRJZCk7XG5cbiAgICB2YXIgZXJyb3IgPSBvYmoudmFsaWRhdGlvbnMuc29tZShmdW5jdGlvbih0ZXN0RnVuKSB7XG4gICAgICB2YXIgcmVzID0gdGVzdEZ1bihpbnB1dHMpO1xuICAgICAgaWYgKHJlcykgcmVuZGVyQWxlcnRNZXNzYWdlKG9iai5hbGVydElkLCByZXMpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KTtcblxuICAgIGlmIChlcnJvcikgcmV0dXJuO1xuICAgIGVsc2UgcmV0dXJuIGlucHV0cztcbiAgfVxuXG4gIHZhciB2YWxpZGF0ZSA9IHtcbiAgICBwYXNzd29yZHNNYXRjaDogZnVuY3Rpb24oaW5wdXRzKSB7XG4gICAgICBpZiAoaW5wdXRzLnBhc3N3b3JkICE9PSBpbnB1dHMucGFzc3dvcmRDb25maXJtKSB7XG4gICAgICAgIHJldHVybiBcIlBhc3N3b3JkcyBkbyBub3QgbWF0Y2guXCI7XG4gICAgICB9XG4gICAgfSxcbiAgICBub3RFbXB0eTogZnVuY3Rpb24oaW5wdXRzKSB7XG4gICAgICBpZiAoT2JqZWN0LnZhbHVlcyhpbnB1dHMpLnNvbWUoZnVuY3Rpb24oaW5wKSB7IHJldHVybiAhaW5wOyB9KSkge1xuICAgICAgICByZXR1cm4gXCJQbGVhc2UgZmlsbCBpbiBhbGwgdGhlIGZpZWxkcy5cIjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJVc2VyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBpbnB1dERhdGEgPSByZWFkRm9ybSh7XG4gICAgICBpbnB1dHM6IHtcbiAgICAgICAgZW1haWw6IFwicmVnaXN0ZXItZW1haWxcIixcbiAgICAgICAgZmlyc3ROYW1lOiBcInJlZ2lzdGVyLWZpcnN0LW5hbWVcIixcbiAgICAgICAgbGFzdE5hbWU6IFwicmVnaXN0ZXItbGFzdC1uYW1lXCIsXG4gICAgICAgIG9yZ2FuaXNhdGlvbjogXCJyZWdpc3Rlci1vcmdhbmlzYXRpb25cIixcbiAgICAgICAgcGFzc3dvcmQ6IFwicmVnaXN0ZXItcGFzc3dvcmRcIixcbiAgICAgICAgcGFzc3dvcmRDb25maXJtOiBcInJlZ2lzdGVyLXBhc3N3b3JkLWNvbmZpcm1cIlxuICAgICAgfSxcbiAgICAgIGFsZXJ0SWQ6IFwicmVnaXN0ZXJGb3JtQWxlcnRcIixcbiAgICAgIHZhbGlkYXRpb25zOiBbXG4gICAgICAgIHZhbGlkYXRlLnBhc3N3b3Jkc01hdGNoLFxuICAgICAgICB2YWxpZGF0ZS5ub3RFbXB0eSxcbiAgICAgIF1cbiAgICB9KTtcblxuICAgIGlmIChpbnB1dERhdGEpIHtcbiAgICAgIHBvc3REYXRhKFwiL3VzZXIvcmVnaXN0ZXJcIiwgaW5wdXREYXRhKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZWdpc3RlclJlcykge1xuICAgICAgICAgIHJlbmRlckFsZXJ0TWVzc2FnZShcInJlZ2lzdGVyRm9ybUFsZXJ0XCIsIFwiQWNjb3VudCBjcmVhdGVkIHN1Y2Nlc3NmdWxseS5cIik7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJSZXMpIHtcbiAgICAgICAgICBpZiAoZXJyUmVzIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyUmVzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciBtZXNzYWdlcyBmcm9tIGJhY2tlbmQuXG4gICAgICAgICAgICBlcnJSZXMuanNvbigpXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIHJlbmRlckFsZXJ0TWVzc2FnZShcInJlZ2lzdGVyRm9ybUFsZXJ0XCIsIHJlcy5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBsb2dpblVzZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIGlucHV0RGF0YSA9IHJlYWRGb3JtKHtcbiAgICAgIGlucHV0czoge1xuICAgICAgICBlbWFpbDogXCJzaWduaW4tZW1haWxcIixcbiAgICAgICAgcGFzc3dvcmQ6IFwic2lnbmluLXBhc3N3b3JkXCJcbiAgICAgIH0sXG4gICAgICBhbGVydElkOiBcInNpZ25pbkZvcm1BbGVydFwiLFxuICAgICAgdmFsaWRhdGlvbnM6IFtcbiAgICAgICAgdmFsaWRhdGUubm90RW1wdHksXG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBpZiAoaW5wdXREYXRhKSB7XG4gICAgICBwb3N0RGF0YShcIi91c2VyL2xvZ2luXCIsIGlucHV0RGF0YSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24obG9naW5SZXMpIHtcbiAgICAgICAgICBvcGVuSW5pdGlhbFBhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAvLyBUT0RPIGhhbmRsZSBpbnZhbGlkIGxvZ2luIChJIGRvbid0IHRoaW5rIHRoZSBiYWNrZW5kIGN1cnJlbnRseSBnaXZlc1xuICAgICAgLy8gdXMgYSBsZWdpYmlsZSByZXNwb25zZSB3aGVuIHRoaXMgaGFwcGVucywganVzdCA0MDAgQmFkIFJlcXVlc3QpXG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLypcbiAgICogUGFnZTogZGFzaGJvYXJkXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9wZW5JblByb2dyZXNzTWluZShtaW5lKSB7XG4gICAgLy8gVE9ET1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVySW5Qcm9ncmVzc01pbmUobWluZSkge1xuICAgIHZhciBjb250YWluZXJMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICB2YXIgc3RhdHVzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc3RhdHVzRGl2LmNsYXNzTmFtZSA9IFwic3RhdHVzIGNvbnN0cnVjdGlvblwiO1xuICAgIHZhciBzdGF0dXNTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICBzdGF0dXNTdmcuY2xhc3NOYW1lID0gXCJpY29uIGljb24tYnVpbGRpbmdcIjtcbiAgICB2YXIgc3RhdHVzVXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndXNlJyk7XG4gICAgc3RhdHVzVXNlWyd4bGluazpocmVmJ10gPSBcIiNpY29uLWJ1aWxkaW5nXCI7XG4gICAgdmFyIHN0YXR1c1AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cbiAgICBzdGF0dXNQLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiSW5jb21wbGV0ZVwiKSk7XG4gICAgc3RhdHVzU3ZnLmFwcGVuZENoaWxkKHN0YXR1c1VzZSk7XG4gICAgc3RhdHVzRGl2LmFwcGVuZENoaWxkKHN0YXR1c1N2Zyk7XG4gICAgc3RhdHVzRGl2LmFwcGVuZENoaWxkKHN0YXR1c1ApO1xuICAgIGNvbnRhaW5lckxpLmFwcGVuZENoaWxkKHN0YXR1c0Rpdik7XG5cbiAgICB2YXIgbmFtZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBuYW1lQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBuYW1lQS5ocmVmID0gbWluZS5taW5lbG9jYXRpb247XG5cbiAgICBuYW1lQS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtaW5lLm1pbmVOYW1lLmNvbmNhdChcIiB3b3JrIGluIHByb2dyZXNzXCIpKSk7XG4gICAgbmFtZURpdi5hcHBlbmRDaGlsZChuYW1lQSk7XG4gICAgY29udGFpbmVyTGkuYXBwZW5kQ2hpbGQobmFtZURpdik7XG5cbiAgICB2YXIgYWN0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGFjdGlvbnNEaXYuY2xhc3NOYW1lID0gXCJjb250aW51ZS13aXphcmRcIjtcblxuICAgIHZhciBhY3Rpb25zVXBwZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgYWN0aW9uc1VwcGVyQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhY3Rpb25zVXBwZXJBLm9uY2xpY2sgPSBvcGVuSW5Qcm9ncmVzc01pbmUobWluZSk7XG4gICAgYWN0aW9uc1VwcGVyQS5jbGFzc05hbWUgPSBcInJlc3VtZVwiO1xuICAgIHZhciBhY3Rpb25zVXBwZXJTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICBhY3Rpb25zVXBwZXJTdmcuY2xhc3NOYW1lID0gXCJpY29uIGljb24tcmVzdW1lXCI7XG4gICAgdmFyIGFjdGlvbnNVcHBlclVzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VzZScpO1xuICAgIGFjdGlvbnNVcHBlclVzZVsneGxpbms6aHJlZiddID0gXCIjaWNvbi1yZXN1bWVcIjtcblxuICAgIGFjdGlvbnNVcHBlclN2Zy5hcHBlbmRDaGlsZChhY3Rpb25zVXBwZXJVc2UpO1xuICAgIGFjdGlvbnNVcHBlckEuYXBwZW5kQ2hpbGQoYWN0aW9uc1VwcGVyU3ZnKTtcbiAgICBhY3Rpb25zVXBwZXJBLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiQ29udGludWUgc2V0dXBcIikpO1xuICAgIGFjdGlvbnNVcHBlckRpdi5hcHBlbmRDaGlsZChhY3Rpb25zVXBwZXJBKTtcbiAgICBhY3Rpb25zRGl2LmFwcGVuZENoaWxkKGFjdGlvbnNVcHBlckRpdik7XG5cbiAgICB2YXIgYWN0aW9uc0xvd2VyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGFjdGlvbnNMb3dlckEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYWN0aW9uc0xvd2VyQS5ocmVmID0gXCIjXCI7XG4gICAgYWN0aW9uc0xvd2VyQS5jbGFzc05hbWUgPSBcImRpc2NhcmRcIjtcbiAgICB2YXIgYWN0aW9uc0xvd2VyU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgYWN0aW9uc0xvd2VyU3ZnLmNsYXNzTmFtZSA9IFwiaWNvbiBpY29uLWNhbmNlbFwiO1xuICAgIHZhciBhY3Rpb25zTG93ZXJVc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1c2UnKTtcbiAgICBhY3Rpb25zTG93ZXJVc2VbJ3hsaW5rOmhyZWYnXSA9IFwiI2ljb24tY2FuY2VsXCI7XG5cbiAgICBhY3Rpb25zTG93ZXJTdmcuYXBwZW5kQ2hpbGQoYWN0aW9uc0xvd2VyVXNlKTtcbiAgICBhY3Rpb25zTG93ZXJBLmFwcGVuZENoaWxkKGFjdGlvbnNMb3dlclN2Zyk7XG4gICAgYWN0aW9uc0xvd2VyQS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkRpc2NhcmRcIikpO1xuICAgIGFjdGlvbnNMb3dlckRpdi5hcHBlbmRDaGlsZChhY3Rpb25zTG93ZXJBKTtcbiAgICBhY3Rpb25zRGl2LmFwcGVuZENoaWxkKGFjdGlvbnNMb3dlckRpdik7XG5cbiAgICBjb250YWluZXJMaS5hcHBlbmRDaGlsZChhY3Rpb25zRGl2KTtcblxuICAgIHZhciBjb21wbGV0ZUJ5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tcGxldGVCeURpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtaW5lLmV0YURhdGUpKTtcblxuICAgIGNvbnRhaW5lckxpLmFwcGVuZENoaWxkKGNvbXBsZXRlQnlEaXYpO1xuXG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluLXByb2dyZXNzLW1pbmVzXCIpO1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY29udGFpbmVyTGkpO1xuICB9XG4gIC8vIFdoeSBpcyB0aGUgYWJvdmUgd3JpdHRlbiB3aXRoIGFwcGVuZENoaWxkIGFuZCB0aGUgYmVsb3cgd2l0aCBpbm5lckhUTUw/XG4gIC8vIEZvciB0aGUgam95IG9mIGNvbXBhcmlzb24gb2YgY291cnNlIVxuICBmdW5jdGlvbiByZW5kZXJSdW5uaW5nTWluZShtaW5lKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICBjb250YWluZXIuaW5uZXJIVE1MID1cbiAgICAgICc8ZGl2IGNsYXNzPVwic3RhdHVzIGFjdGl2ZVwiPicgK1xuICAgICAgICAnPHN2ZyBjbGFzcz1cImljb24gaWNvbi1jaGVja21hcmtcIj4nICtcbiAgICAgICAgICAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tY2hlY2ttYXJrXCI+PC91c2U+JyArXG4gICAgICAgICc8L3N2Zz4nICtcbiAgICAgICAgJzxwPkFjdGl2ZTwvcD4nICtcbiAgICAgICc8L2Rpdj4nICtcbiAgICAgICc8ZGl2PjxhIGhyZWY9XCInICsgbWluZS5taW5lbG9jYXRpb24gKyAnXCI+JyArIG1pbmUubWluZU5hbWUgKyAnPC9hPjwvZGl2PicgK1xuICAgICAgJzxkaXYgY2xhc3M9XCJtaW5lLWNvbmZpZ1wiPicgK1xuICAgICAgICAnPGEgaHJlZj1cImNvbmZpZ1wiPicgK1xuICAgICAgICAgICc8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLXZpZXdcIj4nICtcbiAgICAgICAgICAgICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi12aWV3XCI+PC91c2U+JyArXG4gICAgICAgICAgJzwvc3ZnPicgK1xuICAgICAgICAgICdWaWV3JyArXG4gICAgICAgICc8L2E+JyArXG4gICAgICAgICc8YSBocmVmPVwiI1wiPicgK1xuICAgICAgICAgICc8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWRvd25sb2FkXCI+JyArXG4gICAgICAgICAgICAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tZG93bmxvYWRcIj48L3VzZT4nICtcbiAgICAgICAgICAnPC9zdmc+JyArXG4gICAgICAgICAgJ0V4cG9ydCcgK1xuICAgICAgICAnPC9hPicgK1xuICAgICAgJzwvZGl2PicgK1xuICAgICAgJzxkaXYgY2xhc3M9XCJtaW5lLXRyb3VibGVzaG9vdGluZ1wiPicgK1xuICAgICAgICAnPGEgaHJlZj1cIiNcIj4gRGVsZXRlPC9hPicgK1xuICAgICAgJzwvZGl2Pic7XG5cbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicnVubmluZy1taW5lc1wiKTtcbiAgICBub2RlLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJEYXNoYm9hcmRNaW5lcygpIHtcbiAgICBmZXRjaEpzb24oXCIvbWluZS9hbGxcIilcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGxpc3RPZk1pbmVzKSB7XG4gICAgICAgIGxpc3RPZk1pbmVzLmZvckVhY2goZnVuY3Rpb24obWluZSkge1xuICAgICAgICAgIGlmIChtaW5lLm1pbmVTdGF0dXMgPT09IFwiaW4gcHJvZ3Jlc3NcIikge1xuICAgICAgICAgICAgcmVuZGVySW5Qcm9ncmVzc01pbmUobWluZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChtaW5lLm1pbmVTdGF0dXMgPT09IFwicnVubmluZ1wiKSB7XG4gICAgICAgICAgICByZW5kZXJSdW5uaW5nTWluZShtaW5lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBQYWdlOiB1c2Vycy9wcm9maWxlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVzZXJQcm9maWxlRW50cnkoZW50cnkpIHtcbiAgICB2YXIgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuXG4gICAgdmFyIHRpdGxlID0gZW50cnlbMF07XG4gICAgdmFyIHZhbHVlID0gZW50cnlbMV07XG5cbiAgICB0ci5pbm5lckhUTUwgPVxuICAgICAgJzx0ZCBjbGFzcz1cInRpdGxlXCI+JyArIHRpdGxlICsgJzwvdGQ+JyArXG4gICAgICAnPHRkPicgKyB2YWx1ZSArICc8L3RkPicgK1xuICAgICAgJzx0ZCBjbGFzcz1cImVkaXRcIj4nICtcbiAgICAgICAgJzxzdmcgY2xhc3M9XCJpY29uIGljb24tZWRpdFwiPicgK1xuICAgICAgICAgICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1lZGl0XCI+PC91c2U+JyArXG4gICAgICAgICc8L3N2Zz4nICtcbiAgICAgICc8L3RkPic7XG5cbiAgICByZXR1cm4gdHI7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVc2VyUHJvZmlsZVBhc3N3b3JkKCkge1xuICAgIHZhciB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG5cbiAgICB0ci5pbm5lckhUTUwgPVxuICAgICAgJzx0ZCBjbGFzcz1cInRpdGxlXCI+UGFzc3dvcmQ6PC90ZD4nICtcbiAgICAgICc8dGQgY2xhc3M9XCJ0b3BzZWNyZXRcIj5bVG9wIHNlY3JldF0gPGEgaHJlZj1cImNoYW5nZS1wYXNzd29yZC5odG1sXCI+Q2hhbmdlPC9hPjwvdGQ+JyArXG4gICAgICAnPHRkIGNsYXNzPVwiZWRpdFwiPicgK1xuICAgICAgICAnPHN2ZyBjbGFzcz1cImljb24gaWNvbi1lZGl0XCI+JyArXG4gICAgICAgICAgJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWVkaXRcIj48L3VzZT4nICtcbiAgICAgICAgJzwvc3ZnPicgK1xuICAgICAgJzwvdGQ+JztcblxuICAgIHJldHVybiB0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVzZXJQcm9maWxlUGFpcnModXNlckRhdGEpIHtcbiAgICByZXR1cm4gW1xuICAgICAgW1wiRW1haWw6XCIsIHVzZXJEYXRhLmVtYWlsXSxcbiAgICAgIFtcIkZpcnN0IE5hbWUocyk6XCIsIHVzZXJEYXRhLmZpcnN0TmFtZV0sXG4gICAgICBbXCJMYXN0IE5hbWUocyk6XCIsIHVzZXJEYXRhLmxhc3ROYW1lXSxcbiAgICAgIFtcIk9yZ2FuaXNhdGlvbjpcIiwgdXNlckRhdGEub3JnYW5pc2F0aW9uXVxuICAgIF07XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJVc2VyUHJvZmlsZSh0YXJnZXRJZCkge1xuICAgIGZldGNoSnNvbihcIi91c2VyL3Byb2ZpbGVcIilcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCk7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuXG4gICAgICAgIHZhciBwcm9maWxlUGFpcnMgPSBjcmVhdGVVc2VyUHJvZmlsZVBhaXJzKHVzZXIpO1xuXG4gICAgICAgIHByb2ZpbGVQYWlycy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgdmFyIGVsZW0gPSBjcmVhdGVVc2VyUHJvZmlsZUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBwYXNzd29yZEVsZW0gPSBjcmVhdGVVc2VyUHJvZmlsZVBhc3N3b3JkKCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwYXNzd29yZEVsZW0pO1xuXG4gICAgICAgIHJlbW92ZUNoaWxkcmVuKG5vZGUpO1xuICAgICAgICBub2RlLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIFBhZ2U6IHdpemFyZC91cGxvYWRcbiAgICovXG5cbiAgZnVuY3Rpb24gdXBsb2FkRmlsZSgpIHtcbiAgICB2YXIgcmVtb3RlVXJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZW1vdGVGaWxlXCIpLnZhbHVlO1xuXG4gICAgaWYgKHJlbW90ZVVybCkge1xuICAgICAgcG9zdERhdGEoXCIvZGF0YS9maWxlL3VwbG9hZC9yZW1vdGVcIiwgeyByZW1vdGVVcmw6IHJlbW90ZVVybCB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICBvcGVuUGFnZShcIi93aXphcmQvbWFwQ29sdW1uc1wiKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBmaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWxlVXBsb2FkXCIpLmZpbGVzWzBdO1xuXG4gICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChcImRhdGFGaWxlXCIsIGZpbGUpO1xuXG4gICAgICB2YXIgdXJsID0gc2VydmljZSh7XG4gICAgICAgIHBhdGg6IFwiL2RhdGEvZmlsZS91cGxvYWQvXCIsXG4gICAgICAgIHBhcmFtczogeyBtaW5lSWQ6IHJlYWRNaW5lSWQoKSB9XG4gICAgICB9KTtcblxuICAgICAgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNVQ0NFU1NGVUxMWSBVUExPQURFRCBGSUxFIVwiKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgLy8gVGhpbmdzIHdlIG5lZWQgdG8gZG8gaGVyZTpcbiAgICAgICAgLy8gLSBTb21laG93IHNhdmUgdGhlIGBmaWxlSWRgIHdlIHJlY2VpdmUgaW4gdGhlIHJlc3BvbnNlXG4gICAgICAgIC8vIC0gRGlzcGxheSBhIGxvYWRpbmcgaW5kaWNhdG9yXG4gICAgICAgIC8vIC0gV2hlbiB1cGxvYWRpbmcgaXMgY29tcGxldGVkLCB3ZSBjYW4gZ28gdG8gdGhlIG5leHQgcGFnZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogUGFnZTogd2l6YXJkL21hcENvbHVtbnNcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVuZGVyRGF0YVByZXZpZXcoZGF0YUZpbGUsIGZpbGVQcmV2aWV3KSB7XG4gICAgcmVwbGFjZVRleHQoXCJ1cGxvYWRUaXRsZVwiLCBcIlVwbG9hZDogXCIuY29uY2F0KGRhdGFGaWxlLm5hbWUpKTtcblxuICAgIHJlcGxhY2VUZXh0KFwicHJldmlld0hlYWRlckxhYmVsXCIsIGZpbGVQcmV2aWV3LmhlYWRlckxhYmVsKTtcbiAgICByZXBsYWNlVGV4dChcInByZXZpZXdIZWFkZXJSb3dcIiwgZmlsZVByZXZpZXcuaGVhZGVyUm93WzBdLmpvaW4oJyB8ICcpKTtcbiAgICByZXBsYWNlVGV4dChcInByZXZpZXdTbmlwcGV0TGFiZWxcIiwgZmlsZVByZXZpZXcuc25pcHBldExhYmVsKTtcbiAgICByZXBsYWNlVGV4dChcInByZXZpZXdGaWxlU25pcHBldFwiLCBmaWxlUHJldmlldy5maWxlU25pcHBldCk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJEYXRhRGVzY3JpcHRvcnMoZGVzY3JpcHRvcnMpIHtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRvcnNcIik7XG5cbiAgICBkZXNjcmlwdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIHZhciBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICBzcGFuLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcbiAgICAgIHZhciBuYW1lID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbS5hdHRyaWJ1dGVOYW1lKTtcbiAgICAgIHZhciB2YWx1ZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGl0ZW0uYXR0cmlidXRlVmFsdWUpO1xuICAgICAgc3Bhbi5hcHBlbmRDaGlsZChuYW1lKTtcbiAgICAgIGxpLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgbGkuYXBwZW5kQ2hpbGQodmFsdWUpO1xuICAgICAgbm9kZS5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgcXVlc3Rpb25zU3RvcmUgPSBbXTtcblxuICBmdW5jdGlvbiByZW5kZXJEYXRhUXVlc3Rpb25zKHF1ZXN0aW9ucykge1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxdWVzdGlvbnNcIik7XG5cbiAgICBxdWVzdGlvbnNTdG9yZSA9IFtdO1xuXG4gICAgcXVlc3Rpb25zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXG4gICAgICB2YXIgaDUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDVcIik7XG4gICAgICBoNS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtLnF1ZXN0aW9uSGVhZGVyKSk7XG5cbiAgICAgIHZhciBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBwLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGl0ZW0ucXVlc3Rpb25Xb3JkaW5nKSk7XG5cbiAgICAgIHZhciBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG5cbiAgICAgIGl0ZW0ucG9zc2libGVBbnN3ZXJzLmZvckVhY2goZnVuY3Rpb24oYW5zd2VyKSB7XG4gICAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcblxuICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGlucHV0LnR5cGUgPSBcInJhZGlvXCI7XG4gICAgICAgIGlucHV0LmNoZWNrZWQgPSBhbnN3ZXIuaXNEZWZhdWx0O1xuICAgICAgICBpbnB1dC52YWx1ZSA9IGFuc3dlci5hbnN3ZXJJZDtcbiAgICAgICAgaW5wdXQubmFtZSA9IGl0ZW0ucXVlc3Rpb25JZDtcblxuICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGFuc3dlci5hbnN3ZXJMYWJlbCkpXG5cbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICB9KTtcblxuICAgICAgcXVlc3Rpb25zU3RvcmUucHVzaChpdGVtLnF1ZXN0aW9uSWQpO1xuXG4gICAgICBsaS5hcHBlbmRDaGlsZChoNSk7XG4gICAgICBsaS5hcHBlbmRDaGlsZChwKTtcbiAgICAgIGxpLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgICBub2RlLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRNYXBDb2x1bW5zKCkge1xuICAgIHBvc3REYXRhKHtcbiAgICAgIHBhdGg6IFwiL2NvbmZpZ3VyYXRvci9maWxlL3Byb3BlcnRpZXMvZGV0ZWN0XCIsXG4gICAgICBwYXJhbXM6IHsgbWluZUlkOiByZWFkTWluZUlkKCkgfVxuICAgIH0sIHsgZmlsZUlkOiBcIlRPRE9cIiB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgcmVuZGVyRGF0YVByZXZpZXcoZGF0YS5kYXRhRmlsZSwgZGF0YS5maWxlUHJldmlldyk7XG4gICAgICAgIHJlbmRlckRhdGFEZXNjcmlwdG9ycyhkYXRhLmRlc2NyaXB0b3JzKTtcbiAgICAgICAgcmVuZGVyRGF0YVF1ZXN0aW9ucyhkYXRhLnF1ZXN0aW9ucyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhdmVNYXBDb2x1bW5zKCkge1xuICAgIHZhciBhbnN3ZXJzID0gcXVlc3Rpb25zU3RvcmUubWFwKGZ1bmN0aW9uKHF1ZXN0aW9uSWQpIHtcbiAgICAgIHZhciBhbnN3ZXJJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICdpbnB1dFtuYW1lPVwiJyArIHF1ZXN0aW9uSWQgKyAnXCJdOmNoZWNrZWQnXG4gICAgICApLnZhbHVlO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBxdWVzdGlvbklkOiBxdWVzdGlvbklkLFxuICAgICAgICBhbnN3ZXJJZDogYW5zd2VySWRcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHBvc3REYXRhKHtcbiAgICAgIHBhdGg6IFwiL2NvbmZpZ3VyYXRvci9maWxlL3Byb3BlcnRpZXMvc2F2ZVwiLFxuICAgICAgcGFyYW1zOiB7IG1pbmVJZDogcmVhZE1pbmVJZCgpIH1cbiAgICB9LCB7IGZpbGVJRDogXCJUT0RPXCIsIGFuc3dlcnM6IGFuc3dlcnMgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBvcGVuUGFnZShcIi93aXphcmQvc3VwcGxlbWVudGFyeURhdGFcIik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIFBhZ2U6IHdpemFyZC9zdXBwbGVtZW50YXJ5RGF0YVxuICAgKi9cblxuICBmdW5jdGlvbiByZW5kZXJTdXBwbGVtZW50YXJ5RGF0YSgpIHtcbiAgICBmZXRjaEpzb24oXCIvY29uZmlndXJhdG9yL3N1cHBsZW1lbnRhcnlEYXRhU291cmNlc1wiKVxuICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YVNvdXJjZXMpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1cHBsZW1lbnRhcnlEYXRhU291cmNlc1wiKTtcblxuICAgICAgICByZW1vdmVDaGlsZHJlbihub2RlKTtcblxuICAgICAgICBkYXRhU291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICB2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXG4gICAgICAgICAgaW5wdXQudHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICAgICAgICBpbnB1dC52YWx1ZSA9IHNvdXJjZS5pZDtcbiAgICAgICAgICBpbnB1dC5uYW1lID0gXCJzdXBwbGVtZW50YXJ5XCI7XG4gICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IFwiY2hlY2tlZFwiXG5cbiAgICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc291cmNlLmxhYmVsKSk7XG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQobGFiZWwpO1xuXG4gICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChsaSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJEYXRhVG9vbHMoKSB7XG4gICAgZmV0Y2hKc29uKFwiL2NvbmZpZ3VyYXRvci9kYXRhVG9vbHNcIilcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHRvb2xzKSB7XG4gICAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRhVG9vbHNcIik7XG5cbiAgICAgICAgcmVtb3ZlQ2hpbGRyZW4obm9kZSk7XG5cbiAgICAgICAgdG9vbHMuZm9yRWFjaChmdW5jdGlvbih0b29sKSB7XG4gICAgICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXG4gICAgICAgICAgdmFyIGgzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgICAgIGgzLmNsYXNzTmFtZSA9IFwic3ViSGVhZGVyXCI7XG4gICAgICAgICAgaDMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodG9vbC50b29sTmFtZSkpO1xuXG4gICAgICAgICAgdmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICBwLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRvb2wudG9vbERlc2NyaXB0aW9uKSk7XG5cbiAgICAgICAgICB2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG5cbiAgICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgaW5wdXQudHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICAgICAgICBpbnB1dC52YWx1ZSA9IHRvb2wudG9vbElkO1xuICAgICAgICAgIGlucHV0Lm5hbWUgPSBcInRvb2xcIjtcbiAgICAgICAgICBpbnB1dC5jaGVja2VkID0gXCJjaGVja2VkXCI7XG5cbiAgICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJFbmFibGVkXCIpKTtcblxuICAgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIGRpdi5jbGFzc05hbWUgPSBcImltYWdlUHJldmlld1wiO1xuXG4gICAgICAgICAgdmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgaW1nLnNyYyA9IHRvb2wudG9vbFByZXZpZXc7XG5cbiAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoaW1nKTtcblxuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGgzKTtcbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChwKTtcbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQoZGl2KTtcblxuICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdFN1cHBsZW1lbnRhcmllcygpIHtcbiAgICByZW5kZXJTdXBwbGVtZW50YXJ5RGF0YSgpO1xuICAgIHJlbmRlckRhdGFUb29scygpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2hlY2tlZE5hbWVzKG5hbWUpIHtcbiAgICB2YXIgY2hlY2tlZCA9IFtdO1xuXG4gICAgdmFyIGNoZWNrYm94ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShuYW1lKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hlY2tib3hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGNoZWNrYm94ZXNbaV0uY2hlY2tlZCkge1xuICAgICAgICBjaGVja2VkLnB1c2goY2hlY2tib3hlc1tpXS52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoZWNrZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBzYXZlU3VwcGxlbWVudGFyeURhdGFTb3VyY2VzKCkge1xuICAgIHZhciBjaGVja2VkID0gZ2V0Q2hlY2tlZE5hbWVzKFwic3VwcGxlbWVudGFyeVwiKTtcblxuICAgIHJldHVybiBwb3N0RGF0YSh7XG4gICAgICBwYXRoOiBcIi9jb25maWd1cmF0b3IvbWluZS9zdXBwbGVtZW50YXJ5RGF0YVNvdXJjZXNcIixcbiAgICAgIHBhcmFtczogeyBtaW5lSWQ6IHJlYWRNaW5lSWQoKSB9XG4gICAgfSwgeyBzb3VyY2VzOiBjaGVja2VkIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2F2ZURhdGFUb29scygpIHtcbiAgICB2YXIgY2hlY2tlZCA9IGdldENoZWNrZWROYW1lcyhcInRvb2xcIik7XG5cbiAgICByZXR1cm4gcG9zdERhdGEoe1xuICAgICAgcGF0aDogXCIvY29uZmlndXJhdG9yL21pbmUvZGF0YVRvb2xzXCIsXG4gICAgICBwYXJhbXM6IHsgbWluZUlkOiByZWFkTWluZUlkKCkgfVxuICAgIH0sIHsgdG9vbHM6IGNoZWNrZWQgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzYXZlU3VwcGxlbWVudGFyaWVzKCkge1xuICAgIFByb21pc2UuYWxsKFtcbiAgICAgIHNhdmVTdXBwbGVtZW50YXJ5RGF0YVNvdXJjZXMoKSxcbiAgICAgIHNhdmVEYXRhVG9vbHMoKVxuICAgIF0pLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICBvcGVuUGFnZShcIi93aXphcmQvY29uZmlnXCIpO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogUGFnZTogd2l6YXJkL2NvbmZpZ1xuICAgKi9cblxuICB2YXIgbWluZUF2YWlsYWJpbGl0eVRpbWVyO1xuXG4gIGZ1bmN0aW9uIHJlbmRlckNoZWNrQXZhaWxhYmlsaXR5KGV2ZW50KSB7XG4gICAgd2luZG93LmNsZWFyVGltZW91dChtaW5lQXZhaWxhYmlsaXR5VGltZXIpO1xuXG4gICAgbWluZUF2YWlsYWJpbGl0eVRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBwb3N0RGF0YShcIi9taW5lL25hbWVBdmFpbGFiaWxpdHlcIiwgeyBtaW5lTmFtZTogZXZlbnQudGFyZ2V0LnZhbHVlIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgdmFyIGljb25OYW1lID0gZGF0YS5pc0F2YWlsYWJsZSA/IFwiY2hlY2ttYXJrXCIgOiBcImNyb3NzXCI7XG4gICAgICAgICAgdmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcbiAgICAgICAgICAgIGRhdGEuaXNBdmFpbGFibGVcbiAgICAgICAgICAgICAgPyBcIlRoaXMgcHJvamVjdCBuYW1lIGlzIGZyZWUhXCJcbiAgICAgICAgICAgICAgOiBcIlRoaXMgcHJvamVjdCBuYW1lIGlzIHRha2VuLlwiXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2YWxpZGF0aW9uXCIpO1xuXG4gICAgICAgICAgdmFyIHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIik7XG4gICAgICAgICAgc3ZnLmNsYXNzTmFtZSA9IFwiaWNvbiBpY29uLVwiLmNvbmNhdChpY29uTmFtZSk7XG5cbiAgICAgICAgICB2YXIgdXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVzZVwiKTtcbiAgICAgICAgICB1c2VbJ3hsaW5rOmhyZWYnXSA9IFwiI2ljb24tXCIuY29uY2F0KGljb25OYW1lKTtcblxuICAgICAgICAgIHN2Zy5hcHBlbmRDaGlsZCh1c2UpO1xuXG4gICAgICAgICAgcmVtb3ZlQ2hpbGRyZW4obm9kZSk7XG5cbiAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKHN2Zyk7XG4gICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgICAgfSk7XG4gICAgfSwgNTAwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhdmVEZXNjcmlwdG9ycygpIHtcbiAgICB2YXIgbWluZU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pbmVOYW1lSW5wdXRcIikudmFsdWU7XG5cbiAgICB2YXIgcHJpdmFjeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnaW5wdXRbbmFtZT1cInB1YmxpY1ByaXZhdGVcIl06Y2hlY2tlZCdcbiAgICApLnZhbHVlO1xuXG4gICAgcG9zdERhdGEoe1xuICAgICAgcGF0aDogXCIvY29uZmlndXJhdG9yL21pbmUvZGVzY3JpcHRvcnNcIixcbiAgICAgIHBhcmFtczogeyBtaW5lSWQ6IHJlYWRNaW5lSWQoKSB9XG4gICAgfSwgeyBtaW5lTmFtZTogbWluZU5hbWUsIHByaXZhY3k6IHByaXZhY3kgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAvLyBUT0RPIGhhbmRsZSBjYXNlIHdoZXJlIGBtaW5lTmFtZWAgaXMgYWxyZWFkeSB0YWtlblxuICAgICAgICBvcGVuUGFnZShcIi93aXphcmQvZmluYWxpc2VcIik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIFBhZ2U6IHdpemFyZC9maW5hbGlzZVxuICAgKi9cblxuICBmdW5jdGlvbiByZW5kZXJGaW5hbGlzZVVwbG9hZGVkRmlsZXMoZmlsZXMpIHtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBsb2FkZWRGaWxlc1wiKTtcblxuICAgIHJlbW92ZUNoaWxkcmVuKG5vZGUpO1xuXG4gICAgZmlsZXMuZm9yRWFjaChmdW5jdGlvbihmaWxlKSB7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGRpdi5jbGFzc05hbWUgPSBcInN1YlN0ZXBDb250ZW50XCI7XG4gICAgICB2YXIgaDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIik7XG4gICAgICBoNC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShmaWxlLmRhdGFGaWxlLm5hbWUpKTtcbiAgICAgIHZhciB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIHZhciBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICBzcGFuLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcbiAgICAgIHNwYW4uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJPcmdhbmlzbTpcIikpO1xuXG4gICAgICBsaS5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgIGxpLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGZpbGUuZGF0YUZpbGUub3JnYW5pc20ubmFtZSkpO1xuICAgICAgdWwuYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgZGl2LmFwcGVuZENoaWxkKGg0KTtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZCh1bCk7XG5cbiAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckxpc3QoZWxlbUlkLCBpdGVtcykge1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKTtcblxuICAgIHJlbW92ZUNoaWxkcmVuKG5vZGUpO1xuXG4gICAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgYS5ocmVmID0gaXRlbS51cmw7XG4gICAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGl0ZW0udGV4dCk7XG5cbiAgICAgIGEuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgICBsaS5hcHBlbmRDaGlsZChhKTtcbiAgICAgIG5vZGUuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyRmluYWxpc2VTdXBwbGVtZW50YXJpZXMoc291cmNlcywgdG9vbHMpIHtcbiAgICByZW5kZXJMaXN0KFwic3VwcGxlbWVudGFyeURhdGFcIiwgc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICByZXR1cm4geyB0ZXh0OiBzb3VyY2UubGFiZWwsIHVybDogc291cmNlLnVybCB9O1xuICAgIH0pKTtcblxuICAgIHJlbmRlckxpc3QoXCJkYXRhVG9vbHNcIiwgdG9vbHMubWFwKGZ1bmN0aW9uKHRvb2wpIHtcbiAgICAgIHJldHVybiB7IHRleHQ6IHRvb2wudG9vbE5hbWUsIHVybDogdG9vbC50b29sUHJldmlldyB9O1xuICAgIH0pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckZpbmFsaXNlRGVzY3JpcHRvcihkZXNjcmlwdG9yKSB7XG4gICAgdmFyIHVybEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pbmVOYW1lXCIpO1xuICAgIHJlbW92ZUNoaWxkcmVuKHVybEVsZW0pO1xuICAgIHVybEVsZW0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZGVzY3JpcHRvci5taW5lTmFtZSkpO1xuXG4gICAgdmFyIHByaXZhY3lFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcml2YWN5XCIpO1xuICAgIHJlbW92ZUNoaWxkcmVuKHByaXZhY3lFbGVtKTtcbiAgICBwcml2YWN5RWxlbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkZXNjcmlwdG9yLnByaXZhY3kpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRGaW5hbGlzZSgpIHtcbiAgICBmZXRjaEpzb24oe1xuICAgICAgcGF0aDogXCIvY29uZmlndXJhdG9yL21pbmUvdXNlci1jb25maWdcIixcbiAgICAgIHBhcmFtczogeyBtaW5lSWQ6IHJlYWRNaW5lSWQoKSB9XG4gICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgcmVuZGVyRmluYWxpc2VVcGxvYWRlZEZpbGVzKGRhdGEuZGF0YUZpbGVzKTtcbiAgICAgICAgcmVuZGVyRmluYWxpc2VTdXBwbGVtZW50YXJpZXMoZGF0YS5zdXBwbGVtZW50YXJ5RGF0YVNvdXJjZXMsIGRhdGEuZGF0YVRvb2xzKTtcbiAgICAgICAgcmVuZGVyRmluYWxpc2VEZXNjcmlwdG9yKGRhdGEubWluZURlc2NyaXB0b3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBFeHBvcnRzXG4gICAqL1xuXG4gIHJldHVybiB7XG4gICAgb3BlbkluaXRpYWxQYWdlOiBvcGVuSW5pdGlhbFBhZ2UsXG4gICAgcmVnaXN0ZXJVc2VyOiByZWdpc3RlclVzZXIsXG4gICAgbG9naW5Vc2VyOiBsb2dpblVzZXIsXG4gICAgcmVuZGVyRGFzaGJvYXJkTWluZXM6IHJlbmRlckRhc2hib2FyZE1pbmVzLFxuICAgIHJlbmRlclVzZXJQcm9maWxlOiByZW5kZXJVc2VyUHJvZmlsZSxcbiAgICB1cGxvYWRGaWxlOiB1cGxvYWRGaWxlLFxuICAgIGluaXRNYXBDb2x1bW5zOiBpbml0TWFwQ29sdW1ucyxcbiAgICBzYXZlTWFwQ29sdW1uczogc2F2ZU1hcENvbHVtbnMsXG4gICAgaW5pdFN1cHBsZW1lbnRhcmllczogaW5pdFN1cHBsZW1lbnRhcmllcyxcbiAgICBzYXZlU3VwcGxlbWVudGFyaWVzOiBzYXZlU3VwcGxlbWVudGFyaWVzLFxuICAgIHJlbmRlckNoZWNrQXZhaWxhYmlsaXR5OiByZW5kZXJDaGVja0F2YWlsYWJpbGl0eSxcbiAgICBzYXZlRGVzY3JpcHRvcnM6IHNhdmVEZXNjcmlwdG9ycyxcbiAgICBpbml0RmluYWxpc2U6IGluaXRGaW5hbGlzZVxuICB9O1xufSkoKTtcbiIsIi8vIHZhciBlbmRwb2ludCA9IFwiaHR0cHM6Ly93aXphcmQuaW50ZXJtaW5lLm9yZy92MVwiO1xudmFyIGVuZHBvaW50ID0gXCJodHRwOi8vMTI3LjAuMC4xOjk5OTEvYXBpL3YxXCI7XG5cbi8vIFNpbmNlIG91ciBzZXJ2ZXIgKG5vdCB0aGUgQVBJKSBkb2Vzbid0IGtub3cgd2hldGhlciB0aGUgdXNlciBpc1xuLy8gYXV0aGVudGljYXRlZCwgY2hlY2tpbmcgZm9yIHRoaXMgYW5kIHNlbmRpbmcgdGhlbSB0byB0aGUgYC9yZWdpc3RlcmAgcGFnZVxuLy8gaXMgYSBjb21tb24gcGF0dGVybi4gV2UgY29kaWZ5IHRoaXMgaGVyZSwgc28gdGhhdCB3ZSBjYW4gdXNlIGl0IGluIG91clxuLy8gZ2VuZXJpYyByZXF1ZXN0IGZ1bmN0aW9ucyBiZWxvdy5cbmZ1bmN0aW9uIGhhbmRsZUVycm9yUmVzcG9uc2UocmVzKSB7XG4gIGlmIChyZXMuc3RhdHVzID09PSA0MDEpIHtcbiAgICAvLyBUaGUgdXNlciBpc24ndCBhdXRob3JpemVkLCBzbyBtYWtlIHRoZW0gc2lnbiBpbi5cbiAgICBvcGVuUGFnZShcIi9yZWdpc3RlclwiKTtcbiAgICByZXR1cm4gbmV3IEVycm9yKFwiWW91IGFyZSBub3QgYXV0aG9yaXplZC5cIik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuXG4vLyBBcmd1bWVudCBjYW4gYmUgZWl0aGVyIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcGF0aCBvciBhbiBvYmplY3Qgd2l0aFxuLy8gYHBhdGhgIGFuZCBgcGFyYW1zYCBrZXlzLCB3aGVyZSBwYXJhbXMgaXMgYW4gb2JqZWN0IG9mIHN0cmluZyBlbnRyaWVzLlxuZnVuY3Rpb24gc2VydmljZShhcmcpIHtcbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gV2hlbiB3ZSBhZGQgcXVlcnkgcGFyYW1zLCBvdXIgYmFja2VuZCB3aWxsIGNvbXBsYWluIGlmIHdlIGRvbid0IGhhdmUgYVxuICAgIC8vIHRyYWlsaW5nIHNsYXNoLlxuICAgIHZhciBwYXRoID0gYXJnLnBhdGguc2xpY2UoLTEpID09PSAnLycgPyBhcmcucGF0aCA6IGFyZy5wYXRoLmNvbmNhdCgnLycpO1xuXG4gICAgdmFyIHVybCA9IG5ldyBVUkwoZW5kcG9pbnQuY29uY2F0KHBhdGgpKTtcblxuICAgIGlmICgncGFyYW1zJyBpbiBhcmcpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhcmcucGFyYW1zKSB7XG4gICAgICAgIGlmIChhcmcucGFyYW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgdmFsID0gYXJnLnBhcmFtc1trZXldO1xuICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1cmw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVuZHBvaW50LmNvbmNhdChhcmcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZldGNoSnNvbihwYXRoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmZXRjaChzZXJ2aWNlKHBhdGgpLCB7XG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KGhhbmRsZUVycm9yUmVzcG9uc2UocmVzKSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvc3REYXRhKHBhdGgsIGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZldGNoKHNlcnZpY2UocGF0aCksIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QoaGFuZGxlRXJyb3JSZXNwb25zZShyZXMpKTtcbiAgICAgIH1cbiAgICB9KVxuICB9KTtcbn1cblxuZnVuY3Rpb24gb3BlblBhZ2UocGF0aCkge1xuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHBhdGg7XG59XG5cblxuZXhwb3J0IHtcbiAgcG9zdERhdGEsIGZldGNoSnNvbiwgc2VydmljZSwgb3BlblBhZ2Vcbn1cbiIsImltcG9ydCB7cG9zdERhdGEsIG9wZW5QYWdlfSBmcm9tIFwiLi9jb21tcy5qc1wiO1xuaW1wb3J0IHtjbGVhckFsZXJ0TWVzc2FnZSwgcmVuZGVyQWxlcnRNZXNzYWdlfSBmcm9tIFwiLi91aS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24oKSB7XG5cbiAgLypcbiAgICogUGFnZTogcmVnaXN0ZXJcbiAgICovXG5cblxuICBmdW5jdGlvbiByZWFkRm9ybShvYmopIHtcbiAgICB2YXIgaW5wdXRzID0ge307XG5cbiAgICBPYmplY3QuZW50cmllcyhvYmouaW5wdXRzKS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIga2V5ID0gZW50cnlbMF07XG4gICAgICB2YXIgdmFsID0gZW50cnlbMV07XG4gICAgICBpbnB1dHNba2V5XSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZhbCkudmFsdWU7XG4gICAgfSk7XG5cbiAgICBjbGVhckFsZXJ0TWVzc2FnZShvYmouYWxlcnRJZCk7XG5cbiAgICB2YXIgZXJyb3IgPSBvYmoudmFsaWRhdGlvbnMuc29tZShmdW5jdGlvbih0ZXN0RnVuKSB7XG4gICAgICB2YXIgcmVzID0gdGVzdEZ1bihpbnB1dHMpO1xuICAgICAgaWYgKHJlcykgcmVuZGVyQWxlcnRNZXNzYWdlKG9iai5hbGVydElkLCByZXMpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KTtcblxuICAgIGlmIChlcnJvcikgcmV0dXJuO1xuICAgIGVsc2UgcmV0dXJuIGlucHV0cztcbiAgfVxuXG4gIHZhciB2YWxpZGF0ZSA9IHtcbiAgICBwYXNzd29yZHNNYXRjaDogZnVuY3Rpb24oaW5wdXRzKSB7XG4gICAgICBpZiAoaW5wdXRzLnBhc3N3b3JkICE9PSBpbnB1dHMucGFzc3dvcmRDb25maXJtKSB7XG4gICAgICAgIHJldHVybiBcIlBhc3N3b3JkcyBkbyBub3QgbWF0Y2guXCI7XG4gICAgICB9XG4gICAgfSxcbiAgICBub3RFbXB0eTogZnVuY3Rpb24oaW5wdXRzKSB7XG4gICAgICBpZiAoT2JqZWN0LnZhbHVlcyhpbnB1dHMpLnNvbWUoZnVuY3Rpb24oaW5wKSB7IHJldHVybiAhaW5wOyB9KSkge1xuICAgICAgICByZXR1cm4gXCJQbGVhc2UgZmlsbCBpbiBhbGwgdGhlIGZpZWxkcy5cIjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJVc2VyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBpbnB1dERhdGEgPSByZWFkRm9ybSh7XG4gICAgICBpbnB1dHM6IHtcbiAgICAgICAgZW1haWw6IFwicmVnaXN0ZXItZW1haWxcIixcbiAgICAgICAgZmlyc3ROYW1lOiBcInJlZ2lzdGVyLWZpcnN0LW5hbWVcIixcbiAgICAgICAgbGFzdE5hbWU6IFwicmVnaXN0ZXItbGFzdC1uYW1lXCIsXG4gICAgICAgIG9yZ2FuaXNhdGlvbjogXCJyZWdpc3Rlci1vcmdhbmlzYXRpb25cIixcbiAgICAgICAgcGFzc3dvcmQ6IFwicmVnaXN0ZXItcGFzc3dvcmRcIixcbiAgICAgICAgcGFzc3dvcmRDb25maXJtOiBcInJlZ2lzdGVyLXBhc3N3b3JkLWNvbmZpcm1cIlxuICAgICAgfSxcbiAgICAgIGFsZXJ0SWQ6IFwicmVnaXN0ZXJGb3JtQWxlcnRcIixcbiAgICAgIHZhbGlkYXRpb25zOiBbXG4gICAgICAgIHZhbGlkYXRlLnBhc3N3b3Jkc01hdGNoLFxuICAgICAgICB2YWxpZGF0ZS5ub3RFbXB0eSxcbiAgICAgIF1cbiAgICB9KTtcblxuICAgIGlmIChpbnB1dERhdGEpIHtcbiAgICAgIHBvc3REYXRhKFwiL3VzZXIvcmVnaXN0ZXJcIiwgaW5wdXREYXRhKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZWdpc3RlclJlcykge1xuICAgICAgICAgIHJlbmRlckFsZXJ0TWVzc2FnZShcInJlZ2lzdGVyRm9ybUFsZXJ0XCIsIFwiQWNjb3VudCBjcmVhdGVkIHN1Y2Nlc3NmdWxseS5cIik7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJSZXMpIHtcbiAgICAgICAgICBpZiAoZXJyUmVzIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyUmVzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciBtZXNzYWdlcyBmcm9tIGJhY2tlbmQuXG4gICAgICAgICAgICBlcnJSZXMuanNvbigpXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIHJlbmRlckFsZXJ0TWVzc2FnZShcInJlZ2lzdGVyRm9ybUFsZXJ0XCIsIHJlcy5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBsb2dpblVzZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIGlucHV0RGF0YSA9IHJlYWRGb3JtKHtcbiAgICAgIGlucHV0czoge1xuICAgICAgICBlbWFpbDogXCJzaWduaW4tZW1haWxcIixcbiAgICAgICAgcGFzc3dvcmQ6IFwic2lnbmluLXBhc3N3b3JkXCJcbiAgICAgIH0sXG4gICAgICBhbGVydElkOiBcInNpZ25pbkZvcm1BbGVydFwiLFxuICAgICAgdmFsaWRhdGlvbnM6IFtcbiAgICAgICAgdmFsaWRhdGUubm90RW1wdHksXG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBpZiAoaW5wdXREYXRhKSB7XG4gICAgICBwb3N0RGF0YShcIi91c2VyL2xvZ2luXCIsIGlucHV0RGF0YSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24obG9naW5SZXMpIHtcbiAgICAgICAgICBvcGVuSW5pdGlhbFBhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAvLyBUT0RPIGhhbmRsZSBpbnZhbGlkIGxvZ2luIChJIGRvbid0IHRoaW5rIHRoZSBiYWNrZW5kIGN1cnJlbnRseSBnaXZlc1xuICAgICAgLy8gdXMgYSBsZWdpYmlsZSByZXNwb25zZSB3aGVuIHRoaXMgaGFwcGVucywganVzdCA0MDAgQmFkIFJlcXVlc3QpXG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cblxufSk7XG4iLCJmdW5jdGlvbiByZW5kZXJBbGVydE1lc3NhZ2UoZWxlbUlkLCB0ZXh0KSB7XG4gIHZhciBzcGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKTtcblxuICBzcGFuLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJBbGVydE1lc3NhZ2UoZWxlbUlkKSB7XG4gIHZhciBzcGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKTtcblxuICByZW1vdmVDaGlsZHJlbihzcGFuKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4obm9kZSkge1xuICB3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Q2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VUZXh0KGVsZW1JZCwgdGV4dCkge1xuICB2YXIgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JZCk7XG4gIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gIHJlbW92ZUNoaWxkcmVuKGVsZW0pO1xuICBlbGVtLmFwcGVuZENoaWxkKHRleHQpO1xufVxuXG5leHBvcnQge2NsZWFyQWxlcnRNZXNzYWdlLCByZW5kZXJBbGVydE1lc3NhZ2UsIHJlbW92ZUNoaWxkcmVuLCByZXBsYWNlVGV4dH1cbiJdLCJzb3VyY2VSb290IjoiIn0=