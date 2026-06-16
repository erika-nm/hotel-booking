const API_URL =
"https://hotel-booking-production-bccd.up.railway.app";

let roomPrice = 0;

const roomId = localStorage.getItem("roomId");

// Ambil data kamar
fetch(`${API_URL}/api/rooms/${roomId}`)
  .then(res => res.json())
  .then(room => {

    roomPrice = room.price;

    document.getElementById("roomInfo").innerHTML = `
      <h2>${room.room_name}</h2>
      <p>Rp ${Number(room.price).toLocaleString("id-ID")} / malam</p>
    `;

  })
  .catch(err => {
    console.error(err);
    alert("Gagal mengambil data kamar");
  });

// Hitung total harga
function calculatePrice() {

  const checkIn =
    document.getElementById("check_in").value;

  const checkOut =
    document.getElementById("check_out").value;

  if (!checkIn || !checkOut) {
    return;
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  const diff = end - start;

  const nights =
    diff / (1000 * 60 * 60 * 24);

  const total =
    nights * roomPrice;

  document.getElementById("nightCount").innerText =
    `Lama Menginap: ${nights} malam`;

  document.getElementById("totalPrice").innerText =
    `Total: Rp ${total.toLocaleString("id-ID")}`;
}

// Event tanggal
document
  .getElementById("check_in")
  .addEventListener("change", calculatePrice);

document
  .getElementById("check_out")
  .addEventListener("change", calculatePrice);

console.log("booking.js berhasil dimuat");

// Submit booking
const form =
  document.getElementById("bookingForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const totalHarga =
    parseInt(
      document
        .getElementById("totalPrice")
        .innerText
        .replace(/[^\d]/g, "")
    ) || 0;

  const data = {
    customer_name:
      document.getElementById("customer_name").value,

    email:
      document.getElementById("email").value,

    phone:
      document.getElementById("phone").value,

    room_id: roomId,

    check_in:
      document.getElementById("check_in").value,

    check_out:
      document.getElementById("check_out").value,

    total_price: totalHarga
  };

  try {

    const response = await fetch(
      `${API_URL}/api/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal booking");
    }

    localStorage.setItem("bookingId", result.bookingId);

    localStorage.setItem("customerName", data.customer_name);
    localStorage.setItem("email", data.email);
    localStorage.setItem("phone", data.phone);
    localStorage.setItem("checkIn", data.check_in);
    localStorage.setItem("checkOut", data.check_out);
    localStorage.setItem("totalPrice", data.total_price);

    window.location.href = "success.html";

  } catch (error) {

    console.error(error);

    alert("Gagal melakukan booking");

  }

});