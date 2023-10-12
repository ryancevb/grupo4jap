document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });
});

function logearse(e) {
  if (!localStorage.getItem("correo") || !localStorage.getItem("pass")) {
    window.location.href = "login.html";
  }
}
logearse();

document.addEventListener("keydown", function (event) {
  if (event.key === "b") {
    localStorage.clear();

    alert("LocalStorage ha sido borrado.");
  }
});
