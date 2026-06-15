const express = require("express");
const router = express.Router();
const db = require("../db");


router.post("/", (req, res) => {
  const {
    customer_name,
    email,
    phone,
    room_id,
    check_in,
    check_out,
    total_price
  } = req.body;

  const sql = `
    INSERT INTO bookings
    (
      customer_name,
      email,
      phone,
      room_id,
      check_in,
      check_out,
      total_price
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      customer_name,
      email,
      phone,
      room_id,
      check_in,
      check_out,
      total_price
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Booking berhasil",
        bookingId: result.insertId
      });
    }
  );
});

router.get("/", (req,res)=>{

    const sql = `
    
    SELECT
    bookings.*,
    rooms.room_name

    FROM bookings

    JOIN rooms
    ON bookings.room_id = rooms.id

    ORDER BY bookings.id DESC
    
    `;

    db.query(sql,(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

router.put("/:id",(req,res)=>{

    const { id } = req.params;

    const {
        customer_name,
        email,
        phone
    } = req.body;

    db.query(
        `
        UPDATE bookings
        SET
        customer_name=?,
        email=?,
        phone=?
        WHERE id=?
        `,
        [
            customer_name,
            email,
            phone,
            id
        ],
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Booking berhasil diupdate"
            });

        }
    );

});

router.delete("/:id",(req,res)=>{

    db.query(
        "DELETE FROM bookings WHERE id=?",
        [req.params.id],
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Booking berhasil dihapus"
            });

        }
    );

});

router.put("/:id/status",(req,res)=>{

    const { id } = req.params;

    const { status } = req.body;

    db.query(
        `
        UPDATE bookings
        SET status=?
        WHERE id=?
        `,
        [status,id],
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Status berhasil diupdate"
            });

        }
    );

});

module.exports = router;