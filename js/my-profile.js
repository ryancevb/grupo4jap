
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