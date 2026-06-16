const express = require("express");
const cors = require("cors");
const db = require("./db");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const path = require("path");
const uploadRoutes =
require("./routes/uploadRoutes");
const invoiceRoutes =
require("./routes/invoiceRoutes");
const app = express();


app.use(cors());
app.use(express.json());
app.use(
    "/images",
    express.static(
        path.join(__dirname,"images")
    )
);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use(
    "/api/upload",
    uploadRoutes
);
app.use(
    "/api/invoice",
    invoiceRoutes
);  

app.get("/", (req, res) => {
  res.send("Hotel Booking API Running");
});

app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Database Connected",
      result
    });
  });
});

app.get("/db-name", (req, res) => {
  db.query("SELECT DATABASE() AS db", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});