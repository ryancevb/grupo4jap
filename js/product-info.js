let receivedProd = localStorage.getItem("Id-Prod");
const container = document.getElementById("infoProd");
const contImg = document.getElementById("contImg");
let containercomm = document.getElementById("containercommProd");
let containerrel = document.getElementById("containerRelatedProd"); 
let item = [];

//Fetch para obtener las fotos  de los productos
function callJSONImg() {
    fetch("https://japceibal.github.io/emercado-api/products/" + receivedProd + ".json")

        .then(response => response.json())
        .then(data => {
            img = data.images;
            callImg(img) //Muestro las imagenes
            getID()
        })
        .catch(error => console.log(error))
}

callJSONImg();

//Llamo imagenes del producto
function callImg(img) {
    const container =  document.getElementById("container2");
    const imgActive =  document.getElementById("imgActive");

    const image1 = document.createElement("img");
        image1.src = `${img[0]}`;
        image1.classList.add(`d-block`); 
        image1.classList.add(`w-30`); 
        image1.classList.add(`showImg`); 
        imgActive.appendChild(image1);

    for(let i = 1; i < img.length; i++){
        const div = document.createElement("div");
        div.classList.add(`carousel-item`)
        container.appendChild(div);

        const image = document.createElement("img");
        image.src = `${img[i]}`;
        image.classList.add(`d-block`); 
        image.classList.add(`w-30`); 
        image.classList.add(`showImg`); 
        div.appendChild(image);
        
    }
}

// fetch para la info de los productos 
async function callJSON() {
    try {
        const response = await fetch("https://japceibal.github.io/emercado-api/products/" + receivedProd + ".json")
        const data = await response.json()
        item = data;
        return showInfo(item)
    } catch (error) {
        console.log(error)
    }

}

callJSON()

//Informaciòn de los productos 

function showInfo(item) {
    container.innerHTML = "";
        container.innerHTML += `       
        <div class ="card">
         <p class="title">Nombre</p>
         <p class="description"> ${item.name} </p>
        </div>

        
        <div class ="card">
        <p  class="title">Descripción</p>
        <p class="description"> ${item.description} </p>
        </div>

        <div class ="card">
        <p class="title">Costo</p>
        <p class="description"> ${item.currency} ${item.cost} </p>
        </div>
    
        <div class ="card">
        <p  class="title">Vendidos</p>
        <p class="description">${item.soldCount}</p>
        </div>
        <div class ="card">
        <p  class="title">Categorias</p>
        <p class="description" >${item.category}</p>
        </div>`
    } 


//Llamamos a los comentarios
async function callJSONcomm() {
    try {
        const response = await fetch("https://japceibal.github.io/emercado-api/products_comments/" + receivedProd + ".json")
        const data = await response.json()
        com = data;
        rel= data.relatedProducts
        console.log(com)
        console.log(rel)
        return showInfocomm(com)
    } catch (error) {
        console.log(error)
    }
}
callJSONcomm()
function showInfocomm(com) {
    containercomm.innerHTML = "";
    console.log(com)

    console.log(com)
    containercomm.innerHTML += ""
    for (let i = 0; i < com.length; i++) {
        containercomm.innerHTML += `
        
        <div class ="comms">
        <p class ="name">${com[i].user}</p><!– Nombre –>
        <p class = "date">${com[i].dateTime}</p><!– Date –>
       
        <span class="fa fa-star checked">${com[i].score} </span> <!– Puntuación –>
        
        <p>${com[i].description} <!– Descripción –></p>
        </div>
            `;
    }
}

// Desafiate  - Ingresar comentarios

document.addEventListener('DOMContentLoaded', function () {

    var today = new Date();
    var dateNow = today.toLocaleString('sv-SE');
    let userEmail = localStorage.getItem("correo");
    const formulario = document.querySelector('#comments form');
    const containerCommProd = document.getElementById('containercommProd');


    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log(dateNow)
        const comentario = document.getElementById('floatingTextarea').value;
        const puntuacion = document.getElementById('options').value;
        const nuevoParrafo = document.createElement('p');

        nuevoParrafo.innerHTML = `
        <div class="comms"> 
        <p class ="name">${userEmail}</p>
        <p class = "date">${dateNow}</p>
        <span class="fa fa-star checked">${puntuacion}
        </span> <br>
        <p>${comentario} </p></div>`;

        containerCommProd.appendChild(nuevoParrafo);


        document.getElementById('floatingTextarea').value = '';
    });
});

//Traer los productos relacionados
async function callJSONrel() {
    try {
        const response = await fetch("https://japceibal.github.io/emercado-api/products/" + receivedProd + ".json")
        const data = await response.json()
        
        rel= data.relatedProducts
       
        console.log(rel)
         showInforel(rel)
         selectedRelProduct(rel)
    } catch (error) {
        console.log(error)
    }
    // selectedProduct(rel)
}
callJSONrel()
function showInforel(rel) {
    
   containerrel.innerHTML += ""
    for (let i = 0; i < rel.length; i++) {
        containerrel.innerHTML += `
        
        <div class ="rel" id="${rel[i].id}" >
        <div class ="name">  <p >${rel[i].name}</p> </div>
       
        <div class = "img">
        
        <img src=${rel[i].image} style="width:40%">
        </div>
        
        </div>
            `;
    }

   
}



function selectedRelProduct(rel){
    containerrel.addEventListener("click", (e) =>{
        let selectProd = e.target.closest(".rel").id; // closest busca hacia "atrás" el elemento que coincida
        console.log(selectProd)
        localStorage.setItem("Id-Prod", selectProd)
        window.location = "product-info.html"
    } )
}

// showInforel(rel);




// Modo noche

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

// Obtener el ID para comprar y agregar en el carrito 

function getID(){
     document.getElementById("btnCart").addEventListener("click", function () {

      localStorage.setItem("catBuyID", receivedProd);
      window.location = "cart.html";
    });
}
   