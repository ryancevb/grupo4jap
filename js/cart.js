const URL = "https://japceibal.github.io/emercado-api/user_cart/";
const showCart = document.getElementById("table-cart");
const cartImg = document.getElementById("cartImg");
const cartName = document.getElementById("cartName");
const cartCost = document.getElementById("cartCost");
const cartAmount = document.getElementById("cartAmount");
const cartSubt = document.getElementById("cartSubt");
const cartBuyID = localStorage.getItem("catBuyID");
var userID = undefined; // para próx entregas agregar en el fetch
var userCart = [];

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
                // subtotal(elem.unitCost, parseInt(count.value));
            });
        })
}

//Se calcula el subtotal de la compra del articulo
function subtotal(cost, amount) {
    let subt = (cost * amount);
    console.log(cost, amount, subt);
    // let price = document.createTextNode(subt) ;
    cartSubt.innerHTML = (subt); // Cambié appendChild por el innerHTML
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
nameX(cartBuyID)


function showInfo(item) {



    //for (var i = 1; i < numRow.length; i++) { //Número de filas
    // Crea las hileras de la tabla
    // Creo el TR---
    var row = document.createElement("TR");
    row.setAttribute("id", "trTD");
    showCart.appendChild(row);
    let cell = document.getElementById("trTD");
    //  for (var j = 0; j < 5; j++) { //Número de Columnas


    // Crea un elemento <td> y un nodo de texto, haz que el nodo de
    // texto sea el contenido de <td>, ubica el elemento <td> al final
    // de la hilera de la tabla
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

    function subtotal(cost, amount) {
        const subtNewProd = document.getElementById("subtNewProd");
        let subt = cost;
        subt = (cost * amount);
        console.log(cost, amount, subt);
        subtNewProd.innerHTML = subt;
    }


    let dataImg = document.createElement("img");
    dataImg.setAttribute("class", "cartImg");
    dataImg.src = `${item.images[0]}`;

    let count = document.createElement("input");
    count.setAttribute("type", "number");
    count.addEventListener("input", () => {
        subtotal(item.cost, parseInt(count.value));
    });


    let currency = document.createTextNode(item.currency + " ");
    let cost = document.createTextNode(item.cost);
    let prodName = document.createTextNode(item.name)


    column2.appendChild(prodName);
    column3.appendChild(currency);
    column3.appendChild(cost);
    column4.appendChild(count);
    column1.appendChild(dataImg);


    cell.appendChild(column1);
    cell.appendChild(column2);
    cell.appendChild(column3);
    cell.appendChild(column4);
    cell.appendChild(column5);
    // subtotal(item.cost, parseInt(count.value));
};

//Termina el tr
// }
// posiciona el <tbody> debajo del elemento <table>

// appends <table> into <body>
// body.appendChild(showCart);
// modifica el atributo "border" de la tabla y lo fija a "2";
//tabla.setAttribute("border", "2");
/* let count = document.createElement("input");
 count.addEventListener("input", () => {
     subtotal(item.cost, parseInt(count.value));
 });
 cartAmount.appendChild(count);
 let currency = document.createTextNode(item.currency + " ");
 let cost = document.createTextNode(item.cost);
 cartCost.appendChild(currency);
 cartCost.appendChild(cost);
 cartImg.appendChild(dataImg);
 let prodName = document.createTextNode(item.name)
 cartName.appendChild(prodName);
 subtotal(item.cost, parseInt(count.value))*/

//}



let h = document.createElement("TR");
showCart.appendChild(h); // Cambié el innerHTML por appendChild