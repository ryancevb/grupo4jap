const URL = "https://japceibal.github.io/emercado-api/user_cart/";
const showCart = document.getElementById("table-cart");
const cartImg = document.getElementById("cartImg");
const cartName = document.getElementById("cartName");
const cartCost = document.getElementById("cartCost");
const cartAmount = document.getElementById("cartAmount");
const cartSubt = document.getElementById("cartSubt");
const cartBuyID = JSON.parse(localStorage.getItem("catBuyID"));
const cartBuySTotal = document.getElementById("tdSubtotal");
const cartEnvioTotal = document.getElementById("tdCostoEnvio");
const cartTotal = document.getElementById("tdTotal");
const popup = document.getElementById("popupMetodo");
const buttonTrash = document.querySelector(".trash");
const modal = document.getElementById("modal-content");
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
                count.setAttribute("id", "amountNumber");
                count.setAttribute("value", 1);
                count.oninput = function () {
                    if (this.value <= 1) {
                        this.value = 1;
                    }
                }
              
                cartSubt.appendChild(document.createTextNode(elem.unitCost));
                count.addEventListener("input", () => {
                    subtotal(elem.unitCost, parseInt(count.value), elem.currency);
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

                let firstProduct = document.getElementById("firstProduct");
                //Función para eliminar el 1er elemento producto 
                buttonTrash.addEventListener("click", () => {
                    cartBuyID.splice(0, 1);
                    localStorage.setItem('catBuyID', JSON.stringify(cartBuyID));
                    firstProduct.style.display = "none";
                    elem.unitCost = "0";
                    updatesubtotal(elem.unitCost, parseInt(count.value), elem.currency);
                    mostrarTotales();
                });

            });
        })
}



document.getElementById("tipoEnvio").addEventListener("change", () => { mostrarTotales() })
function mostrarTotales() {
    let stotal;
    // let subt = document.getElementById("cartSubt").innerHTML;
    let subt = 0;
    let nsubt = 0;
    tipoEnvio = document.getElementById("tipoEnvio").value;
    let cost = [];


    if (tipoEnvio != "") {
        if (isNaN(parseInt(subt)) || isNaN(parseInt(nsubt))) {
            subt = document.getElementById("cartSubt").innerHTML;
            subt = Number(subt);
            let elements = document.querySelectorAll('[id^="subtNewProd"]');
            elements.forEach((elem) => {
                // nsubt = Number(element.innerHTML);
                // stotal = Number(subt) + Number(nsubt);
                let eachProd = Number(elem.innerHTML)
                cost.push(eachProd);
                nsubt = cost.reduce((a, b) => a + b, 0);
                stotal = Number(subt) + Number(nsubt);
                console.log(typeof(nsubt));


            });

        } else {
            subt = document.getElementById("cartSubt").innerHTML;
            subt = Number(subt);
            let elements = document.querySelectorAll('[id^="subtNewProd"]');
            elements.forEach((elem) => {
                // nsubt = nsubt +  parseInt(elem.innerHTML);
                let eachProd = parseInt(elem.innerHTML)
                if (isNaN(eachProd)){cost.push(0)}
                else{cost.push(eachProd);
                nsubt = cost.reduce((a, b) => a + b, 0);}
                console.log(typeof(subt), subt, cost);
            });
            stotal = parseInt(subt) + parseInt(nsubt);
        }
        let costEnvio = 0;
        let costTotal = 0;

        if (tipoEnvio == "estandar") {

            costEnvio = stotal * 0.05
        } else if (tipoEnvio == "express") {

            costEnvio = stotal * 0.07
        } else if (tipoEnvio == "sameDay") {
            costEnvio = stotal * 0.15
        }

        costTotal = parseInt(stotal) + parseInt(costEnvio);

        if (nsubt === "") {
            cartBuySTotal.innerHTML = "USD " + subt;
        }
        cartBuySTotal.innerHTML = "USD " + stotal;

        cartEnvioTotal.innerHTML = "USD " + costEnvio.toFixed(2);
        cartTotal.innerHTML = "USD " + costTotal.toFixed(1);
        console.log(typeof(stotal));
    }

}


//Se calcula el subtotal de la compra del articulo
function subtotal(cost, amount, currency) {
    if (currency !== "USD") {
        let subt = ((cost / 40) * amount);
        while (cartSubt.firstChild) {
            cartSubt.removeChild(cartSubt.firstChild);
        }
        cartSubt.appendChild(document.createTextNode(subt));
        totalComprado += subt;

    } else {
        let subt = (cost * amount);
        console.log(amount + "cantidad")
        console.log(subt + "subt")
        while (cartSubt.firstChild) {
            cartSubt.removeChild(cartSubt.firstChild);
        }
        cartSubt.appendChild(document.createTextNode(parseInt(subt)));
        console.log(typeof(subt), subt);

        totalComprado += parseInt(subt);
    }
    mostrarTotales();
}

getCartInfo();

//Se agrega al carrito la compra hecha en el product-info
//Funcion para agregar los datos al carrito, si no se encuentra ningún valor en localStorage no se ejecuta 
function nameX(cartBuyID) {
    if (cartBuyID !== null) {
        callJSON()
    }

}

nameX();

//Se obtiene el JSON 
async function callJSON() {


    for (let i = 0; i < cartBuyID.length; i++) {
        const cartProd = cartBuyID[i];
        try {
            const response = await fetch("https://japceibal.github.io/emercado-api/products/" + cartProd + ".json");
            const data = await response.json();
            ///Se crea el <tr>
            var row = document.createElement("TR");
            row.setAttribute("class", "trTD");
            showCart.appendChild(row);

            /// Crea un elemento <td> 
            var column1 = document.createElement("TD");
            var column2 = document.createElement("TD");
            var column3 = document.createElement("TD");
            var column4 = document.createElement("TD");
            var column5 = document.createElement("TD");
            var column6 = document.createElement("TD");

            column1.setAttribute("class", "cartImg");
            column2.setAttribute("class", "cartName");
            column3.setAttribute("class", "cartCost");
            column4.setAttribute("class", "cartAmount");
            column5.setAttribute("id", `subtNewProd${data.id}`);


            //Subtotal
            function subtotal(cost, amount, currency) {
                let subtNewProd = document.getElementById(`subtNewProd${data.id}`);
                if (currency !== "USD") {
                    let subt = ((cost / 40) * amount);
                    while (subtNewProd.firstChild) {
                        subtNewProd.removeChild(subtNewProd.firstChild);
                    }
                    subtNewProd.appendChild(document.createTextNode(subt));
                } else {
                    let subt = cost;
                    subt = (cost * amount);
                    while (subtNewProd.firstChild) {
                        subtNewProd.removeChild(subtNewProd.firstChild);
                    }
                    subtNewProd.appendChild(document.createTextNode(subt));
                }
                mostrarTotales();
            }

            //imagen
            let dataImg = document.createElement("img");
            dataImg.setAttribute("class", "cartImg");
            dataImg.src = `${data.images[0]}`;

            //Contador
            let count = document.createElement("input");
            count.setAttribute("type", "number");
            count.setAttribute("class", "amountNumber");
            count.setAttribute("value", 1);
            count.oninput = function () {
                if (this.value <=1 ) {
                    this.value = 1;
                }
            }
            if (data.currency !== "USD"){
                 column5.appendChild(document.createTextNode(data.cost / 40));
            }else{
                column5.appendChild(document.createTextNode(data.cost));
            }
        
       
            count.addEventListener("input", () => {
                subtotal(data.cost, parseInt(count.value), data.currency);
            });

            //Datos
            let currency = document.createTextNode(data.currency + " ");
            let cost = document.createTextNode(data.cost);
            let prodName = document.createTextNode(data.name);

            //Columna para eliminar los datos 
            let deleteTrash = document.createElement("i");
            deleteTrash.setAttribute("class", "fa fa-trash-o trash");
            deleteTrash.style.fontSize = "36px";

            deleteTrash.addEventListener("click", () => {
                cartBuyID.splice(i, 1);
                localStorage.setItem('catBuyID', JSON.stringify(cartBuyID));
                showCart.removeChild(row)
                // updatesubtotal(data.cost, parseInt(count.value), data.currency);
                mostrarTotales()
            });

            //Se crea los elementos de adentro de los <td>
            column2.appendChild(prodName);
            column3.appendChild(currency);
            column3.appendChild(cost);
            column4.appendChild(count);
            column1.appendChild(dataImg);
            column6.appendChild(deleteTrash);

            // se ponen adentro de lor <tr> los <td>
            row.appendChild(column1);
            row.appendChild(column2);
            row.appendChild(column3);
            row.appendChild(column4);
            row.appendChild(column5);
            row.appendChild(column6);

        } catch (error) {
            console.error(error);
        }
    }

}

// Actualización del subtotal

function updatesubtotal(cost, amount, currency) {
    if (currency !== "USD") {
        let upSubt = ((cost / 40) * (amount=1));
        console.log(amount, upSubt);
        while (cartSubt.firstChild) {
            cartSubt.removeChild(cartSubt.firstChild);
        }
        cartSubt.appendChild(document.createTextNode(upSubt));
        totalComprado += upSubt;
        console.log(amount, upSubt);

    } else {
        let upSubt = (cost * (amount=1));
        console.log(amount, upSubt);
        while (cartSubt.firstChild) {
            cartSubt.removeChild(cartSubt.firstChild);
        }
        cartSubt.appendChild(document.createTextNode(upSubt));
        console.log(amount, upSubt);
        totalComprado += upSubt;
    }

    mostrarTotales();
}









// Validación del formulario y el modal
(function () {
    'use strict'


    var forms = document.querySelectorAll('.needs-validation')
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit',  function (event) {
                if (!form.checkValidity()  ) {
                    event.preventDefault()
                    event.stopPropagation()
                    showAlertError()
                }


                form.classList.add('was-validated');
              
                if(form.checkValidity(event)){
                    event.preventDefault();
                    showAlertSuccess();
                }
               
               
            }, false)
        })
})();

//Alertas
function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

//Validación de la tarjeta de crédito, adentro del modal, sí uno esta seleccionado el otro no se puede seleccionar
document.getElementById("chTarjetaCredito").addEventListener("change", () => {
    if (document.getElementById("chTarjetaCredito").checked) {
        document.getElementById("chBancaria").checked = false;

        document.getElementById("txtNumTarjeta").disabled = false;
        document.getElementById("txtCodSeguridadTarjeta").disabled = false;
        document.getElementById("txtVencimientoTarjeta").disabled = false;
        document.getElementById("txtNumBancaria").disabled = true;
        document.getElementById("chBancaria").checked = false;

        //Vaciar los inputs al seleccionar el otro checkbox
        document.getElementById("txtNumBancaria").value = "";

        document.getElementById("payment").innerHTML = "Tarjeta de crédito";

    }
});
document.getElementById("chBancaria").addEventListener("change", () => {
    if (document.getElementById("chBancaria").checked) {
        document.getElementById("chTarjetaCredito").checked = false

        document.getElementById("txtNumBancaria").disabled = false;
        document.getElementById("txtNumTarjeta").disabled = true;
        document.getElementById("txtCodSeguridadTarjeta").disabled = true;
        document.getElementById("txtVencimientoTarjeta").disabled = true;

        //Vaciar los inputs al seleccionar el otro checkbox
        document.getElementById("txtNumTarjeta").value = "";
        document.getElementById("txtCodSeguridadTarjeta").value = "";
        document.getElementById("txtVencimientoTarjeta").value = "";

        document.getElementById("payment").innerHTML = "Cuenta Bancaria";
    }
});


// validando el formulario
document.getElementById("buy-btn").addEventListener("click", function () {
    var tipoEnvio = document.getElementById("tipoEnvio");


    if ( !cuentaBancaria.checked && !chTarjetaCredito.checked) {
        cuentaBancaria.setCustomValidity("Seleccione un método de pago");
        chTarjetaCredito.setCustomValidity("Seleccione un método de pago");
    } else {

        cuentaBancaria.setCustomValidity("");
        chTarjetaCredito.setCustomValidity("");
       
    }
    //Se valida sí estan los checkbox validados
    validateCheckbox()

});




let btnMPago = document.getElementById("btnMPago");
let cuentaBancaria = document.getElementById("chBancaria");
let chTarjetaCredito = document.getElementById("chTarjetaCredito");
let txtNumTarjeta = document.getElementById("txtNumTarjeta");
let txtCodSeguridadTarjeta = document.getElementById("txtCodSeguridadTarjeta");
let txtVencimientoTarjeta = document.getElementById("txtVencimientoTarjeta");
let txtNumBancaria = document.getElementById("txtNumBancaria");

// Validación de sí los checkbocks estan validados y así mostrar el botón verde como validado

function validateCheckbox() {
    if (cuentaBancaria.checked || chTarjetaCredito.checked) {
        if ((chTarjetaCredito.checked && txtNumTarjeta.value
            !== "" && txtCodSeguridadTarjeta.value !== "" && txtVencimientoTarjeta.value !== "") ||
            (cuentaBancaria.checked && txtNumBancaria.value !== "")) {

            btnMPago.classList.remove("is-invalid");
            btnMPago.classList.add("is-valid");
            btnMPago.style.color = `green`;
            btnMPago.setCustomValidity("");
            return true;

        }
    }

    btnMPago.classList.remove("is-valid");
    btnMPago.classList.add("is-invalid");
    btnMPago.style.color = `red`;
    btnMPago.setCustomValidity("Debe ingresar el Metodo de Pago");
}


