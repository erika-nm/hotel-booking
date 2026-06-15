const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM rooms", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

router.get("/:id", (req, res) => {

  db.query(
    "SELECT * FROM rooms WHERE id = ?",
    [req.params.id],
    (err, result) => {

      if(err){
        return res.status(500).json(err);
      }

      res.json(result[0]);

    }
  );

});

router.post("/", (req, res) => {

    const {
        room_name,
        description,
        price,
        image_url
    } = req.body;

    const sql = `
    INSERT INTO rooms
    (
        room_name,
        description,
        price,
        image_url
    )
    VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            room_name,
            description,
            price,
            image_url
        ],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Kamar berhasil ditambahkan"
            });

        }
    );

});

router.put("/:id", (req, res) => {

    const { id } = req.params;

    const {
        room_name,
        description,
        price,
        image_url
    } = req.body;

    const sql = `
    UPDATE rooms
    SET
    room_name=?,
    description=?,
    price=?,
    image_url=?
    WHERE id=?
    `;

    db.query(
        sql,
        [
            room_name,
            description,
            price,
            image_url,
            id
        ],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Kamar berhasil diupdate"
            });

        }
    );

});

router.delete("/:id", (req, res) => {

    console.log("DELETE ROOM ID:", req.params.id);

    const { id } = req.params;

    db.query(
        "DELETE FROM rooms WHERE id=?",
        [id],
        (err, result) => {

            console.log("MYSQL RESULT:", result);

            if(err){
                console.log("MYSQL ERROR:", err);
                return res.status(500).json(err);
            }

            res.json({
                message:"Kamar berhasil dihapus"
            });

        }
    );

});

module.exports = router;