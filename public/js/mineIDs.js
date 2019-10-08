import { fetchJson, saveStorage, loadStorage} from "./comms.js";

  function createMineId() {
    return new Promise(function(resolve) {
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

  export {createMineId,readMineId}
