const API_URL =
"https://hotel-booking-production-bccd.up.railway.app";

const roomTable =
document.getElementById("roomTable");

async function loadRooms(){

    const response =
    await fetch(
    `${API_URL}/api/rooms`
    );

    const rooms =
    await response.json();

    roomTable.innerHTML = "";

    rooms.forEach(room=>{

        roomTable.innerHTML += `
        <tr>

            <td>${room.id}</td>

            <td>${room.room_name}</td>

            <td>
            Rp ${Number(room.price)
            .toLocaleString("id-ID")}
            </td>

            <td>

                <button
                class="edit-btn"
                onclick="editRoom(${room.id})">
                Edit
                </button>

                <button
                class="delete-btn"
                onclick="deleteRoom(${room.id})">
                Hapus
                </button>

            </td>

        </tr>
        `;

    });

}

async function addRoom(){

try{

const room_name =
document.getElementById("room_name").value;

const description =
document.getElementById("description").value;

const price =
document.getElementById("price").value;

const imageFile =
document.getElementById("roomImage").files[0];

if(!imageFile){
alert("Pilih gambar terlebih dahulu");
return;
}

const formData = new FormData();

formData.append(
"image",
imageFile
);

const uploadResponse =
await fetch(
`${API_URL}/api/upload`,
{
method:"POST",
body:formData
}
);

const uploadResult =
await uploadResponse.json();

const image_url =
uploadResult.filename;

await fetch(
`${API_URL}/api/rooms`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
room_name,
description,
price,
image_url
})
}
);

alert("Kamar berhasil ditambahkan");

loadRooms();

}catch(err){

console.error(err);

alert("Terjadi Error");

}

}

async function deleteRoom(id){

    if(!confirm("Yakin ingin menghapus kamar?")){
        return;
    }

    await fetch(
    `${API_URL}/api/rooms/${id}`,
    {
        method:"DELETE"
    });

    loadRooms();
}

async function editRoom(id){

    const room =
    await fetch(
    `${API_URL}/api/rooms/${id}`
    ).then(res=>res.json());

    const room_name =
    prompt(
        "Nama Kamar",
        room.room_name
    );

    const description =
    prompt(
        "Deskripsi",
        room.description
    );

    const price =
    prompt(
        "Harga",
        room.price
    );

    const image_url =
    prompt(
        "URL Gambar",
        room.image_url
    );

    if(!room_name) return;

    await fetch(
    `${API_URL}/api/rooms/${id}`,
    {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            room_name,
            description,
            price,
            image_url
        })
    });

    alert("Kamar berhasil diupdate");

    loadRooms();

}

loadRooms();