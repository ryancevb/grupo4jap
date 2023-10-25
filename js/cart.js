const URL = "https://japceibal.github.io/emercado-api/user_cart/";
const showCart = document.getElementById("table-cart");
const cartImg = document.getElementById("cartImg");
const cartName = document.getElementById("cartName");
const cartCost = document.getElementById("cartCost");
const cartAmount = document.getElementById("cartAmount");
const cartSubt = document.getElementById("cartSubt");
const cartBuyID = localStorage.getItem("catBuyID");
const cartBuySTotal = document.getElementById("tdSubtotal");
const cartEnvioTotal = document.getElementById("tdCostoEnvio");
const cartTotal = document.getElementById("tdTotal");
const popup = document.getElementById("popupMetodo");
var userID = undefined; // para próx entregas agregar en el fetch
var userCart = [];

var totalComprado = 0;

//Se obtiene la información del producto para el carrito 
function getCartInfo() {
    fetch(URL + 25801 + ".json")
        .then(response => response.json())
        .then(data => {
            userCart = data
            console.log(userCart);
            userCart.articles.forEach(elem => {
                let dataImg = document.createElement("img");
                dataImg.setAttribute("class", "cartImg");
                dataImg.src = `${elem.image}`;
                let count = document.createElement("input");
                count.setAttribute("type", "number");
                count.addEventListener("input", () => {
                    subtotal(elem.unitCost, parseInt(count.value));
                });
                cartAmount.appendChild(count);
                let currency = document.createTextNode(elem.currency + " ");
                let cost = document.createTextNode(elem.unitCost);
                cartCost.appendChild(currency);
                cartCost.appendChild(cost);
                cartImg.appendChild(dataImg);
                let prodName = document.createTextNode(elem.name)
                cartName.appendChild(prodName);
                mostrarTotales(data.articles);

            });
        })
}


document.getElementById("tipoEnvio").addEventListener("change", () => { mostrarTotales()})
function mostrarTotales(){
let stotal;
let subt = document.getElementById("cartSubt").innerHTML;
let nsubt = document.getElementById("subtNewProd").innerHTML;
    tipoEnvio = document.getElementById("tipoEnvio").value;
   
    if(tipoEnvio != ""){
if(isNaN(parseInt(subt)) ||isNaN(parseInt(nsubt))){

    stotal = 0;
}
else{   
     stotal = parseInt(subt) + parseInt(nsubt);
}
    let costEnvio = 0;
    letcostTotal = 0;
    
    if(tipoEnvio == "estandar"){

        costEnvio = stotal*0.05
    }else if(tipoEnvio == "express"){

        costEnvio = stotal*0.07
    }else if(tipoEnvio == "sameDay"){
        costEnvio = stotal*0.15
    }

    costTotal = stotal + costEnvio;

    cartBuySTotal.innerHTML = "USD "+ stotal;
    cartEnvioTotal.innerHTML = "USD "+ costEnvio; 
    cartTotal.innerHTML = "USD " + costTotal 
}

}

document.getElementById("btnSeleccionar").addEventListener("click", () =>{
    popup.showModal();

})
document.getElementById("cerrarPopup").addEventListener("click", () =>{
    popup.close();

})

document.getElementById("chTarjetaCredito").addEventListener("change", () => {
    if(document.getElementById("chTarjetaCredito").checked){
        document.getElementById("chBancaria").checked = false

        document.getElementById("txtNumTarjeta").disabled = false;
        document.getElementById("txtCodSeguridadTarjeta").disabled = false;
        document.getElementById("txtVencimientoTarjeta").disabled = false;

        document.getElementById("txtNumBancaria").disabled = true;

    }
})
document.getElementById("chBancaria").addEventListener("change", () => {
    if(document.getElementById("chBancaria").checked){
        document.getElementById("chTarjetaCredito").checked = false

        document.getElementById("txtNumBancaria").disabled = false;
        document.getElementById("txtNumTarjeta").disabled = true;
        document.getElementById("txtCodSeguridadTarjeta").disabled = true;
        document.getElementById("txtVencimientoTarjeta").disabled = true;

    }
})
//Se calcula el subtotal de la compra del articulo
function subtotal(cost, amount) {
    
    let subt = (cost * amount);
    console.log(cost, amount, subt);
    cartSubt.innerHTML = (subt); 

    totalComprado += subt;
    mostrarTotales();
}

getCartInfo();

//Se agrega al carrito la compra hecha en el product-info

//Se obtiene el JSON 
async function callJSON() {
    try {
        const response = await fetch("https://japceibal.github.io/emercado-api/products/" + cartBuyID + ".json")
        const data = await response.json()
        item = data;
        return showInfo(item)
    } catch (error) {
        console.log(error)
    }

}
//Funcion para agregar los datos al carrito, si no se encuentra ningún valor en localStorage no se ejecuta 
function nameX(cartBuyID) {
    if (cartBuyID !== null) {
        callJSON()
    }
}
nameX(cartBuyID);


function showInfo(item) {



    ///Se crea el <tr>
    var row = document.createElement("TR");
    row.setAttribute("id", "trTD");
    showCart.appendChild(row);
    let cell = document.getElementById("trTD");
   


    /// Crea un elemento <td> 
    var column1 = document.createElement("TD");
    var column2 = document.createElement("TD");
    var column3 = document.createElement("TD");
    var column4 = document.createElement("TD");
    var column5 = document.createElement("TD");

    column1.setAttribute("class", "cartImg");
    column2.setAttribute("class", "cartName");
    column3.setAttribute("class", "cartCost");
    column4.setAttribute("class", "cartAmount");
    column5.setAttribute("id", "subtNewProd");
   

    //Subtotal
    function subtotal(cost, amount) {
        const subtNewProd = document.getElementById("subtNewProd");
        let subt = cost;
        subt = (cost * amount);
        console.log(cost, amount, subt);
        subtNewProd.innerHTML = subt;
    }

    //imagen
    let dataImg = document.createElement("img");
    dataImg.setAttribute("class", "cartImg");
    dataImg.src = `${item.images[0]}`;

     //Contador
    let count = document.createElement("input");
    count.setAttribute("type", "number");
    count.addEventListener("input", () => {
        subtotal(item.cost, parseInt(count.value));
    });

    //Datos
    let currency = document.createTextNode(item.currency + " ");
    let cost = document.createTextNode(item.cost);
    let prodName = document.createTextNode(item.name)

     //Se crea los elementos de adentro de los <td>
    column2.appendChild(prodName);
    column3.appendChild(currency);
    column3.appendChild(cost);
    column4.appendChild(count);
    column1.appendChild(dataImg);

   // se ponen adentro de lor <tr> los <td>
    cell.appendChild(column1);
    cell.appendChild(column2);
    cell.appendChild(column3);
    cell.appendChild(column4);
    cell.appendChild(column5);

};

