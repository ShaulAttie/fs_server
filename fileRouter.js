const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = multer()

const fileLogic = require("./fileLogic")



////////////////////////////////////////////// POST to UPLOAD FILE
router.post('/upload', upload.single("new_file"),(req,res)=>{
  // console.log(req.file);
  // console.log(req.body.path);
  try{
    const {file , body} = req
      fileLogic.createFile(file.originalname,file.buffer, body.path)
     res.status(200).send('done')
  }catch (err) {
    res.status(400).send( 'not good');
  }
})

///////////////////// POST to Create Folder
router.post('/create', upload.none(), (req,res)=>{
  // console.log(`${req.body.path}/${req.body.new_folder}`);
  try{
    const {body} = req
     const result =  fileLogic.createDir(`${body.path}/${body.new_folder}`)
     if(!result) throw {code: 400 , message: "invalid symbol"}
     res.status(200).send('done')
  }catch (err) {
    res.status(err.code || 400).send(err.message);
  }
})

///////////////////// PUT to RENAME Folder
router.put('/rename',upload.single("rename_folder"),(req,res)=>{
  // console.log(`${req.body.path}/${req.body.new_folder}`);
  // console.log(req.body.rename_folder[0]);
  // console.log(req.body.rename_folder[1]);
  // console.log(req.body.path);
  try{
     const result =  fileLogic.moveFileFolder(`${req.body.rename_folder[0]}`,`${req.body.rename_folder[1]}`,`${req.body.path}`)
     if(!result) throw {code: 400 , message: "invalid symbol"}
     res.status(200).send('done')
  }catch (err) {
    res.status(err.code || 400).send(err.message);
  }
})

///////////////////// GET to READ Folder
router.get('/read',(req,res)=>{
  // console.log(req.query.path);
  try{
    const {path} = req.query
     const files = fileLogic.readFolder(path)
     res.status(200).send(files)
  }catch (err) {
    res.status(400).send( 'not good');
    
  }
})

///////////////////// DELETE to DELETE FILES & EMPTY Folder
router.delete('/delete',upload.none(),(req,res)=>{
  try{
    const {body} = req
     const files = fileLogic.delFileFolder(`${body.path}/${body.del_FF}`)
     res.status(200).send(files)
  }catch (err) {
    res.status(400).send( 'not good');
  }
})

///////////////////// POST to COPY Folder
router.post('/copy',upload.none(),(req,res)=>{
  // console.log(req.body);
  try{
    const {body} = req
     const files = fileLogic.copyDir(`${body.path}/${body.copy_FF}`)
     res.status(200).send(files)
  }catch (err) {
    res.status(400).send( 'not good');
  }
})

///////////////////// GET READ FILE BUFFER to COPY Folder
router.get('/read_b',(req,res)=>{
  // console.log(req.query.path);
  try{
    const {query} = req
     const files = fileLogic.readFile(`${query.path}`)
     res.status(200).send(files)
  }catch (err) {
    res.status(400).send( 'not good');
  }
})








// createDir("root")
// existFileCreate("./root/test.txt", "test")
// update("./root/test.txt", "test02")
// addToFile("./root/test.txt", "\ntest02")
// readFile("./root/test.txt")
// delFile("./root/test.txt")
// delFolder("root")


module.exports = router




// const express = require("express");
// const router = express.Router();
// const efesCrud = require("./fileLogic");
// const multer = require('multer')
// const upload = multer()


// router.post('/upload', upload.single(new"),async (req,res)=>{
//   try{
//     const {file} = req
//      await efesCrud.create(file.originalname,file.buffer)
//      res.status(200).send('done')
//   }catch (err) {
//     res.status(400).send( 'not good');
    
//   }
// })




// router.post("/create", async (req, res) => {
//   try {
//     const result = await efesCrud.create(req.body.fileName, req.body.fileData);
//     console.log(result);
//     res.send(result);
//   } catch (err) {
//     res.status(400).send( err);
//   }
// });

// router.put("/update",efesCrud.isValid, async (req, res) => {
//   console.log(111, "im in");
//   try {
//     const result = await efesCrud.update(
//       req.body.fileName,
//       req.body.dataToUpdate
//     );
//     res.send(result);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// router.put("/delete",efesCrud.isValid, async (req, res) => {
//   try {
//     const result = await efesCrud.del(req.body.fileName);
//     res.send(result);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// router.get("/read",efesCrud.isValid, async (req, res) => {
//   try {
//     const result = await efesCrud.read(req.body.fileName);
//     res.send(result);
//   } catch (err) {
//     res.status(400).send("test error: ", err);
//   }
// });
// module.exports = router;