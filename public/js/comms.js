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


export {
  postData, fetchJson, service, openPage, saveStorage, loadStorage
}
