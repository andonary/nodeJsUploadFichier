const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  dest: "tmp/",
  limits: { fileSize: 3145728 }
});
const fs = require("fs");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("upload");
});

router.post("/upload", upload.array("monfichier"), (req, res, next) => {
  for (const mesFichiers of req.files) {
    fs.rename(
      mesFichiers.path,
      "public/images/" + mesFichiers.originalname,
      err => {
        if (err) {
          res.send("problème durant le déplacement");
        } else {
          res.send("Fichier uploadé avec succès");
        }
      }
    );
  }
});

module.exports = router;
