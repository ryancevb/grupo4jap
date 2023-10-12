let catid = localStorage.getItem("catID");
let nameProd = document.getElementById("categories");
const product = document.getElementById("showProducts");
let item = [];

//llamando a la API 
function callJSON() {
    fetch("https://japceibal.github.io/emercado-api/cats_products/" + catid + ".json")

        .then(response => response.json())
        .then(infoApi => {
            item = infoApi.products;
            console.log(item);
            nameProd.innerHTML = infoApi.catName; //Se le agrega el nombre a la categoria
            showProducts(item) // Función que muestra los Productos
            filteredArray(item) // Función que filtra los elementos según el precio seleccionado
            sortElementsByPrice(item) // Función que selecciona ordena los elementos según el precio 
            selectedProduct(item) // Función que selecciona un elemento y te redirige a su información 
            searchFilter(item) // Función que busca los elementos, en el buscador
            
        })
        .catch(error => console.log(error))
}

callJSON()

// Mostrar el producto
function showProducts(item) {
    product.innerHTML = "";
    for (let i = 0; i < item.length; i++) {
        product.innerHTML += `
         <div class="container-prod" id="${item[i].id}">
             <div>
                 <img id="div__img-prod" src=${item[i].image} style= max-width:25vh>
             </div>
             <div><h5> ${item[i].name} - ${item[i].currency}  ${item[i].cost}</h5>
                 <div id="container__div-sold"> ${item[i].soldCount} vendidos   </div>
                 
                 <p>${item[i].description}</p>
             </div>
         </div> `;
    }
}


function filteredArray(item) { //Creo la función y dentro el evento para que ocurra con el btn "Filtrar"
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        if ((document.getElementById("rangeFilterCountMin").value != '') || (document.getElementById("rangeFilterCountMax").value != '')) {
            const min = document.getElementById("rangeFilterCountMin").value; // Obtengo valor ingresado
            const max = document.getElementById("rangeFilterCountMax").value;
            product.innerHTML = ""; // con esto la idea era vaciar el html y luego agregar lo de abajo
            item.forEach(element => { //por cada elemto de prod voy a realizar la condición
                if (element.cost >= min && element.cost <= max) {
                    console.log(element);
                    product.innerHTML += `
                            <div id="container-prod">
                                <div>
                                    <img id="div__img-prod" src=${element.image} style= max-width:20vh>
                                </div>
                                <div><h5> ${element.name} - ${element.currency}  ${element.cost}</h5>
                                    <div id="container__div-sold"> ${element.soldCount} vendidos   </div>
                                    <p>${element.description}<element/p>
                                </div>
                            </div> `;
                }
            })
        };
        cleanFilter();
    })
};

// agregamos un evento al botón Limpiar para que muestre todos los productos
function cleanFilter() {
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        // Limpio los input
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        let cleanList = document.getElementById("showProducts");;
        // Limpio los productos filtrados
        cleanList.innerHTML = "";
        // Obtengo la lista de productos 
        showProducts(item);
    })
}


// Ordenamos la lista de array con SORT
function sortElementsByPrice(item) {
    let array = item.filter(elem => typeof elem.cost === "number");
    let arraySold = item.filter(obj => typeof obj.soldCount === "number");
    
    // Filtrado de precio de forma Ascendente 
    document.getElementById("sortAsc").addEventListener("click", function () {
        array.sort(function (a, b) {
            return a.cost - b.cost;
        });
        showProducts(array);
        cleanFilter();
    });

    //Filtrado de precio de forma Descendente 
    document.getElementById("sortDesc").addEventListener("click", function () {
        array.sort(function (a, b) {
            return b.cost - a.cost;
        });
        showProducts(array);
        cleanFilter();
    });

    //Filtrado por RELEVANCIA segùn la cantidad vendida 
    document.getElementById("sortByCount").addEventListener("click", function () {
        arraySold.sort(function (a, b) {
            return b.soldCount - a.soldCount;
        });

        showProducts(arraySold);
        cleanFilter();
    });

}


// Agregar la búsqueda de productos en tiempo real
function searchFilter(item){
    let inputSearch = document.getElementById("input-search");
    inputSearch.addEventListener("input", function(){
        let searched = inputSearch.value.toLowerCase();
        console.log(searched);
        product.innerHTML = "";
        item.forEach(element => {
        if ((element.name.toLowerCase().includes(searched)) || (element.description.toLowerCase().includes(searched))) {
                product.innerHTML += `
                    <div id="container-prod">
                        <div>
                            <img id="div__img-prod" src=${element.image} style= max-width:20vh>
                        </div>
                        <div><h5> ${element.name} - ${element.currency}  ${element.cost}</h5>
                            <div id="container__div-sold"> ${element.soldCount} vendidos   </div>
                            <p>${element.description}</p>
                        </div>
                    </div> `;
            }});
    })
}

// Obtener el ID del producto seleccionado
function selectedProduct(item){
    product.addEventListener("click", (e) =>{
        let selectProd = e.target.closest(".container-prod").id; // closest busca hacia "atrás" el elemento que coincida
        localStorage.setItem("Id-Prod", selectProd)
        window.location = "product-info.html"
    } )
}

showProducts();
