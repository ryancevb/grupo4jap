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

//Modo Noche 

document.addEventListener("DOMContentLoaded", function() {
  const nightModeSwitch = document.getElementById("night-mode-switch");
  const nightModeStylesheet = document.getElementById("night-mode-stylesheet");

  // Función para activar o desactivar el modo nocturno
  function toggleNightMode() {
    nightModeStylesheet.disabled = !nightModeSwitch.checked;

    // Cambiar el texto del interruptor según el modo actual
    if (nightModeSwitch.checked) {
      nightModeSwitch.nextElementSibling.textContent = "Modo Diurno";
    } else {
      nightModeSwitch.nextElementSibling.textContent = "Modo Nocturno";
    }

    // Guardar el estado del modo en localStorage
    localStorage.setItem("nightMode", nightModeSwitch.checked);
  }

  // Agregar el evento de cambio para el interruptor
  nightModeSwitch.addEventListener("change", toggleNightMode);

  // Verificar el estado almacenado en localStorage al cargar la página
  const storedNightMode = localStorage.getItem("nightMode");
  if (storedNightMode === "true") {
    nightModeSwitch.checked = true;
  } else {
    nightModeSwitch.checked = false;
  }

  // Inicializar el modo según el estado almacenado
  toggleNightMode();
});





