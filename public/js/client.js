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
          console.error("Failed to POST to ".concat(path));
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

  return {
    openInitialPage: openInitialPage,
    registerUser: registerUser,
    loginUser: loginUser,
    renderDashboardMines: renderDashboardMines,
    renderUserProfile: renderUserProfile
  };
})();
