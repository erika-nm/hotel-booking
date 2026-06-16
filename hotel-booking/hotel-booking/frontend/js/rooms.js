const API_URL =
"https://hotel-booking-production-bccd.up.railway.app";

const roomContainer =
document.getElementById(
"roomContainer"
);

fetch(
`${API_URL}/api/rooms`
)
.then(res => res.json())
.then(data => {

    data.forEach(room => {

        roomContainer.innerHTML += `

        <div class="room-card">

            <img
src="${API_URL}/images/${room.image_url}"
alt="${room.room_name}">

            <div class="room-content">

                <h2>
                ${room.room_name}
                </h2>

                <p>
                ${room.description}
                </p>

                <div class="room-price">
                Rp ${Number(room.price).toLocaleString("id-ID")}
                </div>

                <button
                class="book-btn"
                onclick="bookRoom(${room.id})">

                Book Now

                </button>

            </div>

        </div>

        `;

    });

})
.catch(error => {

    console.error(error);

    roomContainer.innerHTML =
    "<p>Gagal memuat data kamar</p>";

});

function bookRoom(id){

    localStorage.setItem(
    "roomId",
    id
    );

    window.location.href =
    "booking.html";

}