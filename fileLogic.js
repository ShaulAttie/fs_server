const fs = require("fs");
// const path = require("path");

/////////////////////////////////////////////////////
// CREATE FOLDER
function createDir(path) {
  console.log("createDir ",path);
  console.log(path.includes("/"));
  // const path0 = path.slice(path.lastIndexOf("/")+1)
  // if(isValidFileName(path0)) return false
  if (!fs.existsSync(path)) {
    // console.log(`Creating file`);
    fs.mkdirSync(path);
    return true
  } else {
    console.log(
      `This folder exists! \nA folder "${path} NEW" will be created!`
    );
    createDir(`${path} NEW`);
  }
  readFolder(path);
}
// createDir("root/lunch NEW")

///////////////////////////////////////
// COPY FILE only for first level
function copyDir(path) {
  // console.log("copyDir", path);
  createDir(path + " copy")
  
  if (readFolder(path).length != 0) {
    readFolder(path).forEach((element) =>
      element.name.includes(".txt")
        ? fs.copyFileSync(
            `${path}/` + element.name,
            `${path} COPY/` + element.name
          )
        : fs.mkdirSync(`${path} COPY/` + element.name)
    );
  }
}
// copyDir("root/lunch");
//////////////////////////////////////////
// MOVE FOLDER to Garbage Can
function delFileFolder(fileORfolderName) {
  const rootFiles = readFolder("root");
  // will create Garbage Can in case is needed
  rootFiles.every((element) => !element.name.includes("Garbage Can")) &&
    createDir("root/Garbage Can");
  // will isolate the file name
  const result = fileORfolderName.slice(fileORfolderName.lastIndexOf("/") + 1);
  // will move the file to the Garbage Can
  fs.renameSync(`${fileORfolderName}`, `root/Garbage Can/${result}`);
}
// delFileFolder("root/lunch");
////////////////////////////////////////////////
// RENAME Files/Folder
function moveFileFolder(from, dest, path) {
  if(isValidFileName(dest)) return false
  fs.renameSync(`${path}/${from}`, `${path}/${dest}`);
  return true
}
// moveFileFolder("root/meal", "root/dinner1 COPY");
///////////////////////////////////////////////
//reading all the folders and files from a folder
function readFolder(path) {
  const files = fs.readdirSync(path, { withFileTypes: true }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  // console.log(files);
  return files;
}
// readFolder("root/aaa/");
////////////////////////////////////////

// Create file
function createFile(fileName, dataContent, path, enconding = "utf-8") {
  console.log(`${path}/${fileName}`);
  if (fs.existsSync(`${path}/${fileName}`)) {
    return "The File exists";
  }
  if (!isValidFileName) return "Forbidden Characters";
  try {
    // Create
    fs.writeFileSync(`${path}/${fileName}`, dataContent, { enconding });
    readFolder(path);
    return `file created at ${path}/${fileName}`;
  } catch (error) {
    return "Error from existFileCreate";
  }
}
// Read
function readFile(path) {
  // console.log(path);
  try {
    const readFile = fs.readFileSync(path, { encoding: "utf-8" },(err, data)=> {
        if (err) throw err; // Fail if the file can't be read.
          res.writeHead(200, {'Content-Type': 'image/jpeg'});
          res.end(data)});
    return readFile;
  } catch (error) {
    return `error from readFile`;
  }fs.re
}
// fs.readFile('image.jpg', function(err, data) {
//   if (err) throw err; // Fail if the file can't be read.
//     res.writeHead(200, {'Content-Type': 'image/jpeg'});
//     res.end(data);
// readFile("./root/test.txt")

// Update File
function updateFile(fileName, dataContent) {
  if (!fs.existsSync(`root/${fileName}`)) {
    return "The File doesn't exists";
  }
  try {
    fs.appendFileSync(`root/${fileName}`, `\n${dataContent}`);
    return `the file: ${fileName} has been updated`;
  } catch (error) {
    return `error at update`;
  }
}
// Delete file
function delFile(fileName) {
  if (!fs.existsSync(`root/${fileName}`)) {
    return "The File doesn't exists";
  }
  try {
    fs.rmSync(`root/${fileName}`);
    return `File: ${fileName} removed`;
  } catch (error) {
    return `error from deFile`;
  }
}

function isValidFileName(fileName = "") {
  const symbols = [
    "#",
    "%",
    "&",
    "{",
    "}",
    "<",
    ">",
    "*",
    "?",
    "/",
    "\\",
    " ",
    "$",
    "!",
    "'",
    '"',
    ":",
    "@",
    "+",
    "`",
    "|",
    "=",
  ];
  return symbols.find((char) => fileName.includes(char)) ? true : false;
}

async function isValid(req, res, next) {
  const { fileName } = req.body;
  if (isValidFileName(fileName)) {
    next();
  } else {
    res.status(400).json("file name is not valid");
  }
}
// function addToFile(path, string) {
//   fs.appendFileSync(path, string);
// }

module.exports = {
  createDir,
  copyDir,
  delFileFolder,
  moveFileFolder,
  readFolder,
  isValid,
  isValidFileName,

  createFile,
  readFile,
  updateFile,
  delFile,
};

// existFileCreate("./root/dinner/test2", "test")
// update("./root/test.txt", "test02")
// addToFile("./root/test.txt", "\ntest02")
// readFile("./root/test.txt")
// delFile("./root/test.txt")
// delFolder("root")

// Example: Image Filenames ^\w+\.(gif|png|jpg|jpeg)$
