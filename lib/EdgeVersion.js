const path = require('path');
const fs = require("fs")

function getEdgeBrowserVersionOnWindows() {

  // will detect browser version only when installed in default paths like below.
  let EdgeVersion;

  try {
    let suffix = `\\Microsoft\\edge\\Applicaion\\msedge.exe`
    let prefix = process.env["PROGRAMFILES(X86)"]
    let EdgePath = path.join(prefix, suffix)

    if (fs.statSync(EdgePath)) {
      let ondriverdirectory = path.dirname(EdgePath);
      let fileNames = fs.readdirSync(ondriverdirectory)
        .filter(versionFolder => /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/g.test(versionFolder)).toString();
    
      console.log(`Found your Edge browser version ${fileNames}. Installing driver version: ${fileNames}.`);
      EdgeVersion = fileNames
    }
  } catch (error) {
    EdgeVersion = "86.0.600.0";
    console.log(`Could not found edge browser version. Installing default driver version: ${EdgeVersion}.`);
  }
  return EdgeVersion
}

module.exports = getEdgeBrowserVersionOnWindows()