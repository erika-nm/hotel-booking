const roomContainer =
document.getElementById(
"roomContainer"
);

fetch(
"http://localhost:3000/api/rooms"
)
.then(res => res.json())
.then(data => {

    data.forEach(room => {

        roomContainer.innerHTML += `

        <div class="room-card">

            <img
src="http://localhost:3000/images/${room.image_url}"
alt="${room.room_name}">

            <div class="room-content">

                <h2>
                ${room.room_name}
                </h2>

                <p>
                ${room.description}
                </p>

                <div class="room-price">
                Rp ${room.price.toLocaleString()}
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

});

function bookRoom(id){

    localStorage.setItem(
    "roomId",
    id
    );

    window.location.href =
    "booking.html";

}