import {fetchJson,postData, openPage} from "./comms.js";
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

    clearAlertMessage();

    var error = obj.validations.some(function(testFun) {
      var res = testFun(inputs);
      if (res) renderAlertMessage(res, "warning", 5000);
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
      validations: [
        validate.passwordsMatch,
        validate.notEmpty,
      ]
    });

    if (inputData) {
      postData("/user/register", inputData)
        .then(function(registerRes) {
          // Render alert message for 10seconds.
          renderAlertMessage("Account created successfully", "success", 10000);
        })
        .catch(function(errRes) {
          if (errRes instanceof Error) {
            console.error(errRes);
          } else {
            // Handle any error messages from backend.
            errRes.json()
              .then(function(res) {
                // Render alert message for 10seconds.
                renderAlertMessage(res.message, "error", 10000);
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
        .then(function() {
          setupLocalStroageAfterLogin()
          openInitialPage();
        })
        .catch(function(err){
          // Wrong credentials
          if(err.status == 400){
            renderAlertMessage("Wrong credentials", "error", 5000);
          }
          else renderAlertMessage(); // Render default alertbox
        });
    }

    return false;
  }


function logoutUser() {
  var path = "/user/logout";
  fetchJson(path).then(function(response) {
    console.log(response);
    if(response.message) {
      resetLocalStorageAfterLogout()
      openPage("/register");
      // todo - also post statuse message saying there has been a successful
      // logout. Add soemthing to the openpage method to print to the header
      // alertbox
    } else {
      // Rendering message for 5seconds.
      renderAlertMessage("Uhoh, problem logging out!", "warning", 5000);
    }
  });
}


// Function to setup localStorage after login
// This function will set auth and navbar_title
function setupLocalStroageAfterLogin(){
  fetchJson("/user/profile")
    .then(function(user) {
      
      localStorage.setItem("auth", true)
      localStorage.setItem("navbar_title", user.firstName)
    });
}

// Function to reset the localStorage
// This function will remove the auth and navbar_title value from localStorage
function resetLocalStorageAfterLogout(){
  localStorage.removeItem("auth")
  localStorage.removeItem("navbar_title")
}

export {loginUser, logoutUser, registerUser}
