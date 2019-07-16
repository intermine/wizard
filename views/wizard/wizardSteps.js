/* This page is used to name and route all wizard pages.
  Make sure the match the view file name to the step name
  or it won't be able to find it. */

module.exports = {
  steps: [
    {
      name: "upload",
      text: "Upload files"
    },
    {
      name: "mapColumns",
      text: "Map columns",
      uploadLink: true
    },
    {
      name: "supplementaryData",
      text: "Supplementary data"
    },
    {
      name: "config",
      text: "Configure settings"
    },
    {
      name: "finalise",
      text: "Finalise & save"
    }
  ]
};
