document.getElementById("button").addEventListener("click", validarRegistro);

//Validar Registro
function validarRegistro(e) {
  let email = document.getElementById("floatingInput3").value;
  let password = document.getElementById("exampleInputPassword1").value;
  const checkbox = document.getElementById("exampleCheck1");
  
  let fallo = false;
  document.getElementById("required").style.display = "none";
  document.getElementById("required1").style.display = "none";
  document.getElementById("required2").style.display = "none";
  document.getElementById("alert_text").style.display = "none";

  if(email.indexOf("@") == -1){
    document.getElementById("required").style.display = "block";
    document.getElementById("alert_text").style.display = "block";
    e.preventDefault();
    fallo = true;
  }
  if(password.length < 6){

    document.getElementById("required1").style.display = "block";
    document.getElementById("alert_text").style.display = "block";
    e.preventDefault();
    fallo = true;
  }
  if(!checkbox.checked){
    document.getElementById("required2").style.display = "block";
    document.getElementById("alert_text").style.display = "block";
    e.preventDefault();
    fallo = true;
  }

  if (!fallo) {
    e.preventDefault();
    localStorage.setItem("correo", email);
    localStorage.setItem("pass", password);
    window.location.href = "index.html";
  } 
  }


document.addEventListener("keydown", function (event) {
  if (event.key === "Delete") {
    localStorage.clear();

    alert("LocalStorage ha sido borrado.");
  }
});