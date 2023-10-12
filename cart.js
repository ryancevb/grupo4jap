const URL = "https://japceibal.github.io/emercado-api/user_cart/";
const showCart = document.getElementById("table-cart");
const cartImg = document.getElementById("cartImg");
const cartName = document.getElementById("cartName");
const cartCost = document.getElementById("cartCost");
const cartAmount = document.getElementById("cartAmount");
const cartSubt = document.getElementById("cartSubt");
var userID = undefined; // para próx entregas agregar en el fetch
var userCart = [];

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
                count.value = elem.count;
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
function subtotal(cost, amount) {
        let subt = cost * amount;
        console.log(cost, amount, subt);
        cartSubt.innerText = subt;
}

getCartInfo();