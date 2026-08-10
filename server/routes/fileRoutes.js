const express = require("express");

const {
    createFile,
    writeFile,
    readFile,
    appendFile,
    renameFile,
    deleteFile
} = require("../controllers/fileController");

const router = express.Router();


// Create file
router.post("/create", createFile);


// Write / update file
router.post("/write", writeFile);


// Read file
router.get("/read", readFile);


// Append data
router.post("/append", appendFile);


// Rename file
router.put("/rename", renameFile);


// Delete file
router.delete("/delete", deleteFile);


module.exports = router;