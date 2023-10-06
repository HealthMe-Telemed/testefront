function show_hide_password(target) {
  var input = document.getElementById("password-input");

  if (input.getAttribute("type") == "password") {
  } else {
    target.classList.add("view");
    input.setAttribute("type", "text");
    target.classList.remove("view");
    input.setAttribute("type", "password");
  }
  return false;
}

function formatarCPF(campo) {
    campo.value = campo.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    campo.value = campo.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Aplica a máscara
}