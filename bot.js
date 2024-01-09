// Variable para el nombre
var userName = "";

function toggleChat() {
  var chatContainer = document.getElementById("chat-container");
  var floatingButton = document.getElementById("floating-button");

  chatContainer.classList.toggle("hidden");
  floatingButton.style.display = (chatContainer.classList.contains("hidden")) ? "block" : "none";
}

function closeChat() {
  clearChat(); // Limpia el contenido actual del chat
  hideExitGif(); // Oculta el contenedor del gif
  toggleChat(); // Cierra el chat
}

function hideExitGif() {
  document.getElementById("exit-gif-container").classList.add("hidden");
}

function sendMessage() {
  var userInput = document.getElementById("user-input").value;
  
  // Agrega el mensaje del usuario al chat con "Tu:"
  document.getElementById("chat-output").innerHTML += "<p><strong>Tu:</strong> " + userInput + "</p>";
  document.getElementById("user-input").value = "";

  // El bot responde
  if (userInput.toLowerCase() === "hola") {
    // Respuesta del bot con "Botsin:"
    botResponse("Hola me llamo Maxim 🤖, soy tu asistente virtual en esta página, tengo respuestas y preguntas preprogramadas 👀🧑‍💻.");
    setTimeout(function () {
      askQuestion();
    }, 1000); // Espera un segundo antes de responder
  } else {
    // Respuesta del bot con "Botsin:"
    botResponse("Lo siento, no entiendo eso.");
  }
}


function botResponse(message) {
  document.getElementById("chat-output").innerHTML += "<p><strong>Botsin:</strong> " + message + "</p>";
}


function askQuestion() {
  botResponse("¿Deseas continuar o te envío los enlaces para que tengas una mejor idea?");

  showOptions([
    "<button class='option-button' onclick='selectOption(this)'>Continuar ✅</button>",
    "<button class='option-buttonver' onclick='selectOption(this)'>Enviar Enlace 💬</button>",
    "<button class='option-buttonxd' onclick='selectOption(this)'>Salir ❌</button>"
  ]);
}

function showOptions(options) {
  var optionsHTML = options.map(function (option, index) {
    return "<button data-index='" + index + "' onclick='selectOption(this)' style='margin-bottom: 5px;'>" + option + "</button>";
  }).join(" ");
  botResponse(optionsHTML);
}


function selectOption(button) {
  var selectedOption = button.textContent;
  var index = button.getAttribute("data-index");

  botResponse("Seleccionaste: " + selectedOption);

  if (selectedOption.toLowerCase() === "continuar ✅") {
    setTimeout(function () {
      botResponse("Dígame su nombre");
      document.getElementById("user-input").setAttribute("onchange", "handleUserNameResponse()");
    }, 1000); 
  } else if (selectedOption.toLowerCase() === "enviar enlace 💬") {
    sendLinks(); 
  } else if (selectedOption.toLowerCase() === "salir ❌") {
    showExitGif();
    botResponse("Gracias por visitarnos. ¡Hasta luego, " + userName + "!");
    setTimeout(function () {
      clearChat();
    }, 5000);
  }
}

function showExitGif() {
  document.getElementById("exit-gif-container").classList.remove("hidden");
}



function handleUserNameResponse() {
  var userInput = document.getElementById("user-input").value;

  // Agrega el mensaje del usuario al chat con "Tu:"
  document.getElementById("chat-output").innerHTML += "<p><strong>Tu:</strong> " + userInput + "</p>";
  userName = userInput;
  showNewOptions();

  document.getElementById("user-input").value = "";
  document.getElementById("user-input").removeAttribute("onchange");
}



function showNewOptions() {
  botResponse(userName + " ,aquí tienes algunas opciones:");
  
  showOptions2([
    "<button class='option-button-new' onclick='selectOption2(this)'>¿Cúales son las categorías con las que trabaja?</button>",
    "<button class='option-button-new' onclick='selectOption2(this)'>¿Cuáles son los productos más destacados?</button>",
    "<button class='option-button-new' onclick='selectOption2(this)'>¿Hay devoluciones?</button>",
    "<button class='option-button-new' onclick='selectOption2(this)'>¿Cuánto tiempo demora en la entrega?</button>",
    "<button class='option-button-new' onclick='selectOption2(this)'>¿La entrega es gratuita?</button>"
  ]);
}

function showOptions2(options) {
  var optionsHTML = options.map(function (option, index) {
    return "<button data-index='" + index + "' onclick='selectOption2(this)' style='margin-bottom: 5px;'>" + option + "</button>";
  }).join(" ");
  botResponse(optionsHTML);
}

function selectOption2(button) {
  var selectedOption2 = button.textContent;
  var index = button.getAttribute("data-index");

  botResponse(userName + " has seleccionado: " + selectedOption2);

  if(selectedOption2.toLowerCase() === "¿cúales son las categorías con las que trabaja?"){
    botResponse("Nuestras categorías son las siguientes: Protección visual🕶️, Protección Respiratoria😷, Protección Auditiva🎧, Señalización y Tránsito🦺, Viniles");
  } else if(selectedOption2.toLowerCase() === "¿cuáles son los productos más destacados?"){
    botResponse("Nuestros productos más destacados son: Protección Visual🕶️, Protección Respiratoria😷, Protección de manos🧤");
  } else if(selectedOption2.toLowerCase() === "¿hay devoluciones?"){
    botResponse("Sí, pero debes tener en cuenta lo siguiente: Que el producto que has adquirido este en buen estado y no este abierto📦📥");
  } else if(selectedOption2.toLowerCase() === "¿cuánto tiempo demora en la entrega?"){
    botResponse("El tiempo de entrega va a variar según la confirmación de su paga, si pasa de las 11:30am🕐 el envío sera para el día siguiente siempre y cuando sea día habil.🌞");
  } else if(selectedOption2.toLowerCase() === "¿la entrega es gratuita?"){
    botResponse("Esto va a depender, si se encuentra en Lima, y su producto pasa de los S/5000💵 su envío si sera gratuito. Sin embargo para Provincia, no❌, usted tendrá que pagar por el envío.");
  }

  // Espera 2 segundos antes de preguntar si el usuario quiere elegir otra opción o salir
  setTimeout(function() {
    botResponse("¿Quieres elegir otra opción o deseas salir?");
    showOptions2([
      "<button class='option-button-new-con' onclick='showNewOptions()'>Elegir otra opción</button>",
      "<button class='option-button-new-sali' onclick='exitChat()'>Salir</button>"
    ]);
  }, 3000);
}



function exitChat() {
  botResponse("Gracias por tu visita. ¡Hasta luego, " + userName + "!");
  
  // Mostrar el gif de despedida
  showExitGif();

  setTimeout(function() {
    clearChat();
    hideExitGif(); // Ocultar el gif de despedida después de limpiar el chat
  }, 5000);
}




function sendLinks() {
  botResponse("Enlaces de las ventas:");
  botResponse("<a href='https://api.whatsapp.com/send?phone=51968993153&text=Hola%20quisiera%20mas%20informaci%C3%B3n' style='color: #add8e6; font-weight: bold;'>Ventas 1 (NORTE)</a>");
  botResponse("<a href='https://api.whatsapp.com/send?phone=51970304628&text=Hola%20quisiera%20mas%20informaci%C3%B3n' style='color: #adff2f; font-weight: bold;'>Ventas 2 (SUR)</a>");
  botResponse("<a href='https://api.whatsapp.com/send?phone=51962531722&text=Hola%20quisiera%20mas%20informaci%C3%B3n' style='color: #8fbc8f; font-weight: bold;'>Ventas 3 (CENTRO ORIENTE)</a>");
}



function clearChat() {
  var chatOutput = document.getElementById("chat-output");
  chatOutput.innerHTML = "";
  document.getElementById("user-input").focus();
}
