const URL = "https://japceibal.github.io/emercado-api/user_cart/";
const showCart = document.getElementById("table-cart");
const cartImg = document.getElementById("cartImg");
const cartName = document.getElementById("cartName");
const cartCost = document.getElementById("cartCost");
const cartAmount = document.getElementById("cartAmount");
const cartSubt = document.getElementById("cartSubt");
var userID = undefined; // para próx entregas agregar en el fetch
var userCart = [];

function getCartInfo(){
    fetch(URL + 25801 + ".json")
    .then(response => response.json())
    .then(data => {
        userCart = data
        console.log(userCart);
        // let newTable = document.createElement("table");
        // let tableBody = document.createElement("tbody");
        userCart.articles.forEach(elem => {
            let tableData = [elem.name, elem.currency, elem.unitCost];//, elem.count
            // for (let i = 0; i < tableData.length; i++) {
            //     let td = document.createTextNode(tableData[i])
            //     let tableInfo = document.createElement("td")
            //     tableInfo.appendChild(td)
            //     tableBody.appendChild(tableInfo)
            // }
            let dataImg = document.createElement("img");
            dataImg.setAttribute("id", "cartImg");
            dataImg.src = `${elem.image}`;
            let count = document.createElement("input");
            count.value = elem.count;
            count.addEventListener("input", () => {
                subtotal(elem.currency, count.value);
            });
            cartAmount.appendChild(count);
            // let count = document.createTextNode(`${ elem.count}`);
            // count.value = `${ elem.count}`;
            // cartAmount.appendChild(count);
            let currency = document.createTextNode(elem.currency);
            let cost = document.createTextNode(elem.unitCost);
            cartCost.appendChild(currency);
            cartCost.appendChild(cost);
            // showCart.appendChild(tableBody);
            cartImg.appendChild(dataImg);
            let prodName = document.createTextNode(elem.name)
            cartName.appendChild(prodName);
            subtotal(tableData);
            amountInput.value = subt;
            let amountInput = document.createTextNode();
            cartSubt.appendChild(amountInput);
        });
    })
}
function subtotal(currency, amount) {
    let subt = currency * amount;
    console.log(subt);
    cartSubt.innerText = subt;
}
// function subtotal(tableData, count) {
//     cartAmount.addEventListener("keydown", (e) =>{
//         let amount = e.target.value;
//         let subt = elem.currency * amount;
//         console.log(subt);
//         console.log(amount);
//         return subt;
//     })
    
// }
getCartInfo();