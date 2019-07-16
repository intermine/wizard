var wizard = (function() {
  // var endpoint = "https://wizard.intermine.org/v1";
  var endpoint = "http://localhost:5000/v1";

  function service(path) {
    return endpoint.concat(path);
  }

  function openPage(path) {
    window.location.href = path;
  }

  function renderAlertMessage(elemId, text) {
    var span = document.getElementById(elemId);

    span.appendChild(document.createTextNode(text));
  }

  function clearAlertMessage(elemId) {
    var span = document.getElementById(elemId);

    while (span.firstChild) {
      span.removeChild(span.firstChild);
    }
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

  function openInitialPage(event) {
    if (event) event.preventDefault();

    fetch(service("/mines"))
      .then(function(res) {
        if (!res.ok) {
          // We aren't logged in; open the registration page.
          openPage("/register");
        }

        return res.json();
      })
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

  function postData(path, data, cb) {
    fetch(service(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(function(res) {
      if (res.ok) {
        return cb(res);
      }

      console.error("Failed to POST to ".concat(path));
    }).catch(function(err) {
      console.error("Failed to POST to ".concat(path));
    });
  }

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
      postData("/user/register", inputData, function(registerRes) {
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
      postData("/user/login", inputData, function(loginRes) {
        openInitialPage();
      });
    }

    return false;
  }

  return {
    openInitialPage: openInitialPage,
    registerUser: registerUser,
    loginUser: loginUser
  };
})();
