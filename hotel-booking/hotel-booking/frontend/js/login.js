async function login() {

  const username =
  document.getElementById("username").value;

  const password =
  document.getElementById("password").value;

  const response = await fetch(
    "http://localhost:3000/api/admin/login",
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

  if(data.success){

    localStorage.setItem(
      "admin",
      JSON.stringify(data.admin)
    );

    window.location.href =
    "admin.html";

  }else{

    alert("Login gagal");

  }

}