var wizard = (function() {
  /*
   * Helpers
   */

  // var endpoint = "https://wizard.intermine.org/v1";
  var endpoint = "http://localhost:5000/v1";

  function service(path) {
    return endpoint.concat(path);
  }

  function openPage(path) {
    window.location.href = path;
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

  // Since our server (not the API) doesn't know whether the user is
  // authenticated, checking for this and sending them to the `/register` page
  // is a common pattern. We codify this here, along with parsing the JSON of
  // the response.
  function fetchJson(path) {
    return new Promise(function(resolve, reject) {
      fetch(service(path))
        .then(function(res) {
          if (res.ok) {
            return res.json();
          }

          // The user isn't authorized, so make them sign in.
          openPage("/register");
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
        body: JSON.stringify(data)
      }).then(function(res) {
        if (res.ok) {
          resolve(res);
        } else {
          // The user isn't authorized, so make them sign in.
          openPage("/register");
        }
      }).catch(function(err) {
        console.error("Failed to POST to ".concat(path));
      });
    });
  }

  /*
   * Page: home
   */

  function openInitialPage(event) {
    if (event) event.preventDefault();

    fetchJson("/mines")
      .then(function(listOfMines) {
        if (listOfMines.length) {
          // We have mines; display them in the dashboard page!
          openPage("/dashboard");
        } else {
          // We don't have mines; skip to the first wizard step.
          openPage("/wizard/upload");
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
    fetchJson("/mines")
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

  function uploadFile() {
    var remoteUrl = document.getElementById("remoteFile").value;

    if (remoteUrl) {
      postData("/data/file/upload/remote", { remoteUrl: remoteUrl })
        .then(function(res) {
          openPage("/wizard/mapColumns");
        });
    } else {
      var file = document.getElementById("fileUpload").files[0];

      var formData = new FormData();
      formData.append("file", file);

      fetch(service("/data/file/upload"), {
        method: "POST",
        body: formData
      }).then(function(res) {
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
    postData("/file/properties/detect", { fileId: "TODO" })
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

    postData("/file/properties/save", { fileID: "TODO", answers: answers })
      .then(function(res) {
        openPage("/wizard/supplementaryData");
      });
  }

  /*
   * Page: wizard/supplementaryData
   */

  function renderSupplementaryData() {
    fetchJson("/mine/supplementaryDataSources")
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
    fetchJson("/mine/dataTools")
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

    return postData("/mine/supplementaryDataSources", { sources: checked });
  }

  function saveDataTools() {
    var checked = getCheckedNames("tool");

    return postData("/mine/dataTools", { tools: checked });
  }

  function saveSupplementaries() {
    Promise.all([
      saveSupplementaryDataSources(),
      saveDataTools()
    ]).then(function() {
      openPage("/wizard/config");
    });
  }

  /*
   * Page: wizard/config
   */

  /*
   * Page: wizard/finalise
   */

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
    saveSupplementaries: saveSupplementaries
  };
})();
