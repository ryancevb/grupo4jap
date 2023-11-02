
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
            }, false)
      })
  })()

function inputEmail() {
  let userEmail= localStorage.getItem("correo");
  let inputEmail = document.getElementById("exampleInputEmail1");
  inputEmail.setAttribute("value", userEmail)
 }
 inputEmail()

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
