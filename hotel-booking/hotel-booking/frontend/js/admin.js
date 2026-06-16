const API_URL =
"https://hotel-booking-production-bccd.up.railway.app";

const table =
document.getElementById("bookingTable");

const totalBooking =
document.getElementById("totalBooking");

async function loadBookings(){

    try{

        const response =
        await fetch(`${API_URL}/api/bookings`);

        const data =
        await response.json();

        totalBooking.textContent =
        data.length;

        table.innerHTML = "";

        data.forEach(item => {

            table.innerHTML += `
            <tr>

                <td>${item.id}</td>

                <td>${item.customer_name}</td>

                <td>${item.email}</td>

                <td>${item.phone}</td>

                <td>${item.room_name}</td>

                <td>${item.check_in}</td>

                <td>${item.check_out}</td>

                <td>
                Rp ${Number(item.total_price).toLocaleString("id-ID")}
                </td>

                <td>

                    <button onclick="editBooking(${item.id})">
                        Edit
                    </button>

                    <button onclick="deleteBooking(${item.id})">
                        Hapus
                    </button>

                </td>

            </tr>
            `;

        });

    }catch(error){

        console.error(error);

        alert("Gagal mengambil data booking");

    }

}

async function editBooking(id){

    const nama =
    prompt("Nama Baru");

    if(nama === null) return;

    const email =
    prompt("Email Baru");

    const phone =
    prompt("Phone Baru");

    await fetch(
        `${API_URL}/api/bookings/${id}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                customer_name:nama,
                email,
                phone
            })
        }
    );

    alert("Booking berhasil diupdate");

    loadBookings();

}

async function deleteBooking(id){

    if(!confirm("Hapus booking ini?")){
        return;
    }

    await fetch(
        `${API_URL}/api/bookings/${id}`,
        {
            method:"DELETE"
        }
    );

    alert("Booking berhasil dihapus");

    loadBookings();

}

loadBookings();