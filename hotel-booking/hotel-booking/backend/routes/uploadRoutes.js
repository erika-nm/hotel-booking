const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

    cb(
        null,
        path.join(
            __dirname,
            "../images"
        )
    );

},

    filename:(req,file,cb)=>{

        cb(
            null,
            Date.now() +
            path.extname(file.originalname)
        );

    }

});

const upload =
multer({storage});

console.log(
"Upload Folder:",
path.join(__dirname,"../images")
);

router.post(
    "/",
    upload.single("image"),
    (req,res)=>{

        res.json({
            filename:req.file.filename
        });

    }
);

module.exports = router;