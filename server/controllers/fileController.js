const fs = require("fs");
const path = require("path");

// File used for SmartWasteAI waste complaints
let currentFileName = "waste_complaints.txt";

const getFilePath = () => {
    return path.join(__dirname, "..", currentFileName);
};


// 1. CREATE FILE
const createFile = (req, res) => {

    const filePath = getFilePath();

    fs.writeFile(filePath, "", (error) => {

        if (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error creating file"
            });
        }

        res.json({
            message: "Waste complaints file created successfully"
        });
    });
};


// 2. WRITE / UPDATE FILE
const writeFile = (req, res) => {

    const {
        name,
        location,
        wasteType,
        priority,
        description
    } = req.body;

    const data = `
Citizen: ${name}
Location: ${location}
Waste Type: ${wasteType}
Priority: ${priority}
Description: ${description}
----------------------------------------
`;

    fs.writeFile(getFilePath(), data, (error) => {

        if (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error writing file"
            });
        }

        res.json({
            message: "Waste complaint written successfully"
        });
    });
};


// 3. READ FILE
const readFile = (req, res) => {

    fs.readFile(getFilePath(), "utf8", (error, data) => {

        if (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error reading file"
            });
        }

        res.json({
            message: "File read successfully",
            data: data
        });
    });
};


// 4. APPEND DATA
const appendFile = (req, res) => {

    const {
        name,
        location,
        wasteType,
        priority,
        description
    } = req.body;

    const data = `
Citizen: ${name}
Location: ${location}
Waste Type: ${wasteType}
Priority: ${priority}
Description: ${description}
----------------------------------------
`;

    fs.appendFile(getFilePath(), data, (error) => {

        if (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error appending complaint"
            });
        }

        res.json({
            message: "Waste complaint appended successfully"
        });
    });
};


// 5. RENAME FILE
const renameFile = (req, res) => {

    const oldPath = getFilePath();

    const newFileName = "smartwaste_complaints.txt";

    const newPath = path.join(
        __dirname,
        "..",
        newFileName
    );

    fs.rename(oldPath, newPath, (error) => {

        if (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error renaming file"
            });
        }

        currentFileName = newFileName;

        res.json({
            message: "File renamed successfully"
        });
    });
};


// 6. DELETE FILE
const deleteFile = (req, res) => {

    fs.unlink(getFilePath(), (error) => {

        if (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error deleting file"
            });
        }

        res.json({
            message: "Waste complaints file deleted successfully"
        });
    });
};


module.exports = {
    createFile,
    writeFile,
    readFile,
    appendFile,
    renameFile,
    deleteFile
};