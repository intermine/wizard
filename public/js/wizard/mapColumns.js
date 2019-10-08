import {loadStorage, openPage, postData} from '../comms.js';
import {readMineId} from '../mineIDs.js';
import {replaceText} from '../ui.js';

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
  var uploadedFile = JSON.parse(loadStorage("currentFile"));
  postData({
    path: "/configurator/file/properties/detect",
    params: {
      mineId: readMineId()    }
  }, uploadedFile)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      renderDataPreview(data.dataFile, data.filePreview);
      renderDataDescriptors(data.descriptors);
      renderDataQuestions(data.questions);
    });
    initNextPage();
}

function saveMapColumns() {
  var uploadedFile = JSON.parse(loadStorage("currentFile"));
  var answers = questionsStore.map(function(questionId) {
    var answerId = document.querySelector(
      'input[name="' + questionId + '"]:checked'
    ).value;

    return {
      questionId: questionId,
      answerId: answerId
    }
  });

  postData({
    path: "/configurator/file/properties/save",
    params: { mineId: readMineId() }
  }, { dataFile: uploadedFile , answers: answers })
    .then(function() {
      openPage("/wizard/supplementaryData");
    });
}

function initNextPage() {
  // Make the next page button fire the save function.
  var nextPage = document.getElementById("nextPageLink");

  nextPage.addEventListener("click", function(event) {
    event.preventDefault();
    saveMapColumns();
  });
}

export {initMapColumns};
