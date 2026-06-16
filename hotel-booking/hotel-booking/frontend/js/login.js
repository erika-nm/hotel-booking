const API_URL =
"https://hotel-booking-production-bccd.up.railway.app";

async function login() {

  const username =
  document.getElementById("username").value;

  const password =
  document.getElementById("password").value;

  try {

    const response = await fetch(
      `${API_URL}/api/admin/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      }
    );

    const data = await response.json();

    if (data.success) {

      localStorage.setItem(
        "admin",
        JSON.stringify(data.admin)
      );

      window.location.href =
      "admin.html";

    } else {

      alert("Login gagal");

    }

  } catch (error) {

    console.error(error);
    alert("Gagal terhubung ke server");

  }

}