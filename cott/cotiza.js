document.addEventListener("DOMContentLoaded", function () {
  const nombre = document.getElementById("myname");
  const apellidos = document.getElementById("surname");
  const correo = document.getElementById("email");
  const celular = document.getElementById("mobile");
  //const contrasenia = document.getElementById("password");
  const terminosYcondiciones = document.getElementById("termsAndConditions");
  const form = document.getElementById("form");
  const listInputs = document.querySelectorAll(".form-input");
  const menuOptions = document.querySelector(".menu-options");
  const opcionSeleccionada = document.getElementById("opcionSeleccionada");
  const botonEnviar = document.getElementById("enviarFormulario");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let condicion = validacionForm();
    if (condicion) {
      enviarFormulario();
    }
  });

  botonEnviar.addEventListener("click", () => {
    let condicion = validacionForm();
    if (condicion) {
      const opcionSeleccionada = document.getElementById("opcionSeleccionada").textContent.trim();
      const urlVentas1 = "https://api.whatsapp.com/send?phone=51968993153&text=Hola%20quisiera%20mas%20informaci%C3%B3n";
      const urlVentas2 = "https://api.whatsapp.com/send?phone=51970304628&text=Hola%20quisiera%20mas%20informaci%C3%B3n";
      const urlVentas3 = "https://api.whatsapp.com/send?phone=51962531722&text=Hola%20quisiera%20mas%20informaci%C3%B3n3";
      let mensajePersonalizado = obtenerMensajePersonalizado();

      if (opcionSeleccionada === "Ventas1 (Norte)") {
        window.open(urlVentas1 + mensajePersonalizado, "_blank");
      } else if (opcionSeleccionada === "Ventas2 (Sur)") {
        window.open(urlVentas2 + mensajePersonalizado, "_blank");
      } else if (opcionSeleccionada === "Ventas3 (Centro-Oriente)") {
        window.open(urlVentas3 + mensajePersonalizado, "_blank");
      }
    }
  });

  function validacionForm() {
    form.lastElementChild.innerHTML = "";
    let condicion = true;
    listInputs.forEach((element) => {
      element.lastElementChild.innerHTML = "";
    });
    if (nombre.value.length < 1 || nombre.value.trim() == "") {
      mostrarMensajeError("myname", "Nombre no válido*");
      condicion = false;
    }
    if (apellidos.value.length < 1 || apellidos.value.trim() == "") {
      mostrarMensajeError("surname", "Apellido no válido");
      condicion = false;
    }
    if (correo.value.length < 1 || correo.value.trim() == "") {
      mostrarMensajeError("email", "Correo no válido*");
      condicion = false;
    }
    if (
      celular.value.length != 9 ||
      celular.value.trim() == "" ||
      isNaN(celular.value)
    ) {
      mostrarMensajeError("mobile", "Celular no válido*");
      condicion = false;
    }
    /*if (contrasenia.value.length < 1 || contrasenia.value.trim() == "") {
      mostrarMensajeError("password", "Contraseña no válida*");
      condicion = false;
    }*/
    if (!terminosYcondiciones.checked) {
      mostrarMensajeError("termsAndConditions", "Acepta los términos y condiciones*");
      condicion = false;
    } else {
      mostrarMensajeError("termsAndConditions", "");
    }
    return condicion;
  }

  function mostrarMensajeError(claseInput, mensaje) {
    let elemento = document.querySelector(`.${claseInput}`);
    elemento.lastElementChild.innerHTML = mensaje;
  }

  function enviarFormulario() {
    form.reset();
    form.lastElementChild.innerHTML = "¡Listo!";
  }

  function obtenerMensajePersonalizado() {
    const nombre = document.getElementById("myname").value;
    const apellidos = document.getElementById("surname").value;
    const correo = document.getElementById("email").value;
    const celular = document.getElementById("mobile").value;
    //const contrasenia = document.getElementById("password").value;

    const mensajePersonalizado = `\nNombre: ${nombre}\nApellidos: ${apellidos}\nCorreo: ${correo}\nCelular: ${celular}`;

    return encodeURI(mensajePersonalizado);
  }

  const menuTrigger = document.querySelector(".menu-trigger");

  let menuOpen = false;
  menuTrigger.addEventListener("click", () => {
    if (menuOpen) {
      menuOptions.style.display = "none";
    } else {
      menuOptions.style.display = "block";
    }
    menuOpen = !menuOpen;
  });

  menuOptions.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      opcionSeleccionada.textContent = e.target.textContent;
      menuOptions.style.display = "none";
      menuOpen = false;
    }
  });
});