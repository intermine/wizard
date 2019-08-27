import {fetchJson} from './comms.js';
import {logoutUser} from "./user.js";
import {removeChildren} from './ui.js';

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

export {renderUserProfile, createUserProfilePairs,createUserProfileEntry}
