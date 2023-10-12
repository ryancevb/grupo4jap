const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Para sacar los datos del local storage 
function logearse(e) {
  if (!localStorage.getItem("correo") || !localStorage.getItem("pass")) {
    window.location.href = "login.html";
  }
}

logearse();


document.getElementById("logout").addEventListener("click", function (event) {
 /* if (event.key === "Delete") {*/
    localStorage.removeItem("correo");

    alert("Se ha cerrado la sesión.");
  });

//Obtenemos el email en la página 
const email= document.getElementById("email");
let userEmail= localStorage.getItem("correo");
console.log(localStorage.getItem("correo"));
email.innerHTML= userEmail;
email.href="myprofile.html";



//Modo noche
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