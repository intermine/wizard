import {service, saveStorage, loadStorage, openPage} from '../comms.js'
import {readMineId} from '../mineIDs.js'
import {removeChildren, renderAlertMessage} from '../ui.js'

/*
 * Page: wizard/upload
 */

function readUploadData() {
  var fileFormat = document.getElementById("filetype-select").value;

  var organismSelect = document.getElementById("organism-select");
  var taxonID = organismSelect.value;
  var organismName = organismSelect.options[organismSelect.selectedIndex].text;

  if (!fileFormat || !taxonID) {
    throw new Error("Please fill in all the fields.");
  }

  return {
    fileFormat: fileFormat,
    organism: {
      name: organismName,
      taxonID: taxonID
    }
  };
}

function uploadFile() {
  var remoteUrl = document.getElementById("remoteFile").value;
  var files = document.getElementById("fileUpload").files;

  if (remoteUrl) {
    // TODO test uploading of remote URLs
    // (I don't think this is handled by our backend yet.)
    postData("/data/file/upload/remote", { remoteUrl: remoteUrl })
      .then(function(res) {
        openPage("/wizard/mapColumns");
      });
  } else if (files.length) {
    var file = files[0];

    var formData = new FormData();
    formData.append("dataFile", file);

    var url = service({
      path: "/data/file/upload/",
      params: { mineId: readMineId() }
    });

    fetch(url, {
      method: "POST",
      body: formData,
      credentials: 'include'
    }).then(function(res) {
      return res.text();
    }).then(function(fileId) {
      var fileName = files[0].name;

      try {
        var fileObj = readUploadData();
        fileObj.name = fileName;
        fileObj.fileId = fileId;

        saveStorage("currentFile", JSON.stringify(fileObj));
        openPage("/wizard/mapColumns");
      } catch(err) {
        renderAlertMessage(err.message);
      }
    }).catch(function(err) {
      renderAlertMessage("Failed to upload file.");
    });
  } else {
    renderAlertMessage("Please specify a file to upload.", "warning");
  }
}

var initFileDialogue = function() {
  //browse dialogues are unstyleable so we have to hide it and create our own.
  var fakeFile = document.getElementById('fakeFileUpload');
  var realFile = document.getElementById("fileUpload");

  fakeFile.addEventListener("click", function() {
    realFile.click();
  });

  realFile.addEventListener("change", function(file) {
    var fileName = this.files[0].name;
    document.getElementById("fileName").innerHTML = fileName;
  });

  // Make the next page button fire the upload function.
  var nextPage = document.getElementById("nextPageLink");

  nextPage.addEventListener("click", function(event) {
    event.preventDefault();
    uploadFile();
  });
};

export {initFileDialogue};
