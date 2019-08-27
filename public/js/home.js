import {fetchJson, openPage} from "./comms.js";
import {createMineId} from "./mineIDs.js";

/*
 * Page: home
 */

function openInitialPage(event) {
  if (event) event.preventDefault();

  fetchJson("/mine/all")
    .then(function(listOfMines) {
      if (listOfMines.length) {
        // We have mines; display them in the dashboard page!
        openPage("/dashboard");
      } else {
        // We don't have mines; get started with the wizard!
        createMineId()
          .then(function() {
            openPage("/wizard/upload");
          });
      }
    });
}

export {openInitialPage};
