const URL = "https://japceibal.github.io/emercado-api/user_cart/";
const showCart = document.getElementById("table-cart");
const cartImg = document.getElementById("cartImg");
const cartName = document.getElementById("cartName");
const cartCost = document.getElementById("cartCost");
const cartAmount = document.getElementById("cartAmount");
const cartSubt = document.getElementById("cartSubt");
const cartBuyID = localStorage.getItem("catBuyID")
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
                dataImg.setAttribute("id", "cartImg");
                dataImg.src = `${elem.image}`;
                let count = document.createElement("input");
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
                subtotal(elem.unitCost, parseInt(count.value));
            });
        })
}

//Se calcula el subtotal de la compra del articulo
function subtotal(cost, amount) {
        let subt = cost * amount;
        console.log(cost, amount, subt);
        cartSubt.innerText = subt;
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
//Funcion para agregar los datos al carrito 
callJSON()

function showInfo(item) {
    console.log(item)
    let dataImg = document.createElement("img");
    dataImg.setAttribute("id", "cartImg");
    dataImg.src = `${item.images[0]}`;

    let count = document.createElement("input");
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
    subtotal(item.cost, parseInt(count.value))
        
}

   ;
   