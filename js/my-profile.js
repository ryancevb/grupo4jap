
(function () {
    'use strict'

    let forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            
          }
          form.classList.add('was-validated')
                if(form.checkValidity()){
                    alert("Perfil actualizado!!");
                }
                setLocalStorage(event)
            }, false)
      })
  })()


//Foto de Perfil
 document.addEventListener("DOMContentLoaded", function() {
    const imageInput = document.getElementById("imageInput");
    const imageContainer = document.getElementById("imageContainer");
    const profileImage = document.getElementById("profileImage");
    
    imageInput.addEventListener("change", (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const imageSrc = e.target.result;
                profileImage.src = imageSrc;
                localStorage.setItem("profileImage", imageSrc); 
            };

            reader.readAsDataURL(selectedImage);
        }
    });


    const savedImageSrc = localStorage.getItem("profileImage");
    if (savedImageSrc) {
        profileImage.src = savedImageSrc;
    }
});

// Obtener los datos en el local storage
const firstName = document.getElementById("firstName");
const secondName = document.getElementById("secondName");
const firstLastName = document.getElementById("firstLastName");
const secondLastName= document.getElementById("secondLastName");
const phone = document.getElementById("phone"); 
 
function setLocalStorage(event){
  event.preventDefault();
  const profileImage = document.getElementById("profileImage");
  let img = profileImage.src;
  let name = firstName.value;
  let nametwo = secondName.value;
  let lastname = firstLastName.value;
   let lastnametwo = secondLastName.value;
  let tell = phone.value;
  console.log(img)
  if((name != "" && 
   lastname != "" &&   tell != ""  && img != "img2/profile.jpg") || (lastnametwo != "" || nametwo != "")  ){
      localStorage.setItem("firstName", name); 
  localStorage.setItem("secondName", nametwo); 
  localStorage.setItem("firstLastName", lastname); 
  localStorage.setItem("phone", tell); 
  localStorage.setItem("secondLastName", lastnametwo);
  }

  

  
}

function getValuesFromLocalStorage(){

 

  let name= localStorage.getItem("firstName");
  let nametwo= localStorage.getItem("secondName");
  let lastname= localStorage.getItem("firstLastName");
  let lastnametwo= localStorage.getItem("secondLastName");
  let tell= localStorage.getItem("phone");

  if(name  == null  ||
    nametwo  == null ||
    lastname  == null ||
    lastnametwo == null ||
   tell  == null ){
    firstName.innerHTML == ""
    secondName.innerHTML == ""
    firstLastName.innerHTML == ""
    secondLastName.innerHTML == ""
    phone.innerHTML == ""
    }else {
      firstName.setAttribute("value", name)
      secondName.setAttribute("value", nametwo);
      firstLastName.setAttribute("value", lastname);
      secondLastName.setAttribute("value", lastnametwo);
      phone.setAttribute("value", tell);

    }
    let userEmail= localStorage.getItem("correo");
    let inputEmail = document.getElementById("exampleInputEmail1");
    inputEmail.setAttribute("value", userEmail);

}
getValuesFromLocalStorage();

