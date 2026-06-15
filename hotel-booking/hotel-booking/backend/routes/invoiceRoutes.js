const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const db = require("../db");

router.get("/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
    SELECT
    bookings.*,
    rooms.room_name
    FROM bookings
    JOIN rooms
    ON bookings.room_id = rooms.id
    WHERE bookings.id = ?
    `;

    db.query(sql,[id],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        if(result.length === 0){
            return res.status(404).json({
                message:"Booking tidak ditemukan"
            });
        }

        const booking = result[0];

        const doc = new PDFDocument();

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=invoice-${booking.id}.pdf`
        );

        doc.pipe(res);

        doc.fontSize(24)
        .text("EVERGREEN WOODS HOTEL");

        doc.moveDown();

        doc.fontSize(16)
        .text(`Invoice Booking #${booking.id}`);

        doc.moveDown();

        doc.text(`Nama : ${booking.customer_name}`);
        doc.text(`Email : ${booking.email}`);
        doc.text(`Phone : ${booking.phone}`);
        doc.text(`Kamar : ${booking.room_name}`);
        doc.text(`Check In : ${booking.check_in}`);
        doc.text(`Check Out : ${booking.check_out}`);
        doc.text(`Status : ${booking.status}`);
        doc.text(`Total : Rp ${Number(booking.total_price).toLocaleString("id-ID")}`);

        doc.end();

    });

});

module.exports = router;