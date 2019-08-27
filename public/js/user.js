import {fetchJson,postData, openPage, service} from "./comms.js";
import {clearAlertMessage, renderAlertMessage} from "./ui.js";
import {openInitialPage} from "./home.js";


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
          renderAlertMessage("alertbox", "Account created successfully.");
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


function logoutUser() {
  var path = "/user/logout";
  fetchJson(path).then(function(response) {
    console.log(response);
    if(response.message) {
      openPage("/register");
      // todo - also post statuse message saying there has been a successful
      // logout. Add soemthing to the openpage method to print to the header
      // alertbox
    } else {
      renderAlertMessage("alertbox", "Uhoh, problem logging out!");
    }
  });
}


export {loginUser, logoutUser, registerUser}
