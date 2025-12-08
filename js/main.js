// Urban Kicks - Simulador profesional (Entrega 1)
// --------------------------------------------------
// Aquí se integran variables, constantes, arrays, funciones,
// condicionales, ciclos, Console, Prompt, Confirm y Alert.
// Toda la interacción del simulador se hace vía diálogos y consola.
// La parte visual (Bootstrap) solo acompaña y muestra los modelos.

// =====================
// 1) Constantes globales
// =====================

// IVA del 21% (requisito: declarar constantes)
const IVA = 0.21;

// Monto a partir del cual el envío es gratis
const TOPE_ENVIO_GRATIS = 200;

// Costo fijo de envío cuando no se llega al tope
const COSTO_ENVIO = 15;

// =====================
// 2) Array de objetos (modelos de zapatillas)
// =====================

// Requisito: usar arrays. Aquí usamos un array de objetos para ser más profesional.
const zapatillas = [
  { id: 1, nombre: "Air Jordan 1 Retro High", precio: 180 },
  { id: 2, nombre: "Nike Dunk Low Panda", precio: 150 },
  { id: 3, nombre: "Yeezy 350 V2", precio: 220 },
  { id: 4, nombre: "New Balance 550", precio: 140 },
  { id: 5, nombre: "Adidas Forum Low", precio: 120 }
];

// =====================
// 3) Variables de estado simple
// =====================

let nombreUsuario = ""; // Se completa en solicitarDatos()

// =====================
// 4) Funciones principales del simulador
// =====================

/**
 * solicitarDatos()
 * -----------------
 * Entrada de datos del usuario usando prompt.
 * Utiliza un bucle while para validar que el nombre no esté vacío.
 */
function solicitarDatos() {
  // Requisito: uso de prompt y while
  let nombre = prompt("👟 Bienvenido a Urban Kicks\n\nPor favor, ingresa tu nombre:");

  // Validación: mientras el nombre esté vacío o sea null, seguimos preguntando
  while (!nombre || nombre.trim() === "") {
    alert("⚠️ El nombre no puede estar vacío. Intenta nuevamente.");
    nombre = prompt("Por favor, ingresa tu nombre:");
  }

  nombreUsuario = nombre.trim();
  console.log("Usuario identificado como:", nombreUsuario);
}

/**
 * mostrarMenu()
 * -------------
 * Recorre el array de zapatillas con un bucle for
 * y genera un texto numerado para mostrar por alert/prompt.
 */
function mostrarMenu() {
  // Requisito: uso de for para recorrer arrays
  let menu = "👟 Urban Kicks - Catálogo de Sneakers\n\n";
  for (let i = 0; i < zapatillas.length; i++) {
    const z = zapatillas[i];
    menu += `${z.id}) ${z.nombre} - $${z.precio}\n`;
  }
  menu += "\nIngresa el número del modelo que quieres cotizar:";
  return menu;
}

/**
 * cotizarProducto()
 * -----------------
 * Función principal de cotización:
 * - Muestra el menú de productos
 * - Pide la opción con prompt
 * - Valida con condicionales if/else
 * - Calcula subtotal + IVA
 * - Determina si hay envío gratis o pagado
 * - Muestra el resultado con alert y registra en consola
 */
function cotizarProducto() {
  const mensajeMenu = mostrarMenu();

  // Pedimos al usuario que elija un modelo mediante prompt
  const opcionStr = prompt(mensajeMenu);

  // Si cancela el prompt, devolvemos null para que el while principal pueda cortar
  if (opcionStr === null) {
    console.log("El usuario canceló la selección de producto.");
    return null;
  }

  const opcion = parseInt(opcionStr, 10);

  // Validamos que la opción sea un número válido
  if (isNaN(opcion)) {
    alert("⚠️ Opción no válida. Debes ingresar el número del modelo.");
    console.warn("El usuario ingresó un valor no numérico en la selección de modelo.");
    return false;
  }

  // Buscamos la zapatilla correspondiente en el array
  const productoSeleccionado = zapatillas.find((z) => z.id === opcion);

  if (!productoSeleccionado) {
    alert("⚠️ No existe un modelo con ese número. Intenta nuevamente.");
    console.warn("El usuario ingresó un ID de modelo inexistente:", opcion);
    return false;
  }

  console.log("Producto seleccionado:", productoSeleccionado);

  // Calculamos el IVA y el precio final (procesamiento de datos)
  const ivaCalculado = productoSeleccionado.precio * IVA;
  const precioConIva = productoSeleccionado.precio + ivaCalculado;

  // Determinamos si el envío es gratis o tiene costo
  let costoEnvio = 0;
  let mensajeEnvio = "";

  // Requisito: uso de condicional if/else
  if (precioConIva >= TOPE_ENVIO_GRATIS) {
    mensajeEnvio = "Envío GRATIS 🎁";
    costoEnvio = 0;
  } else {
    mensajeEnvio = `Envío con costo fijo de $${COSTO_ENVIO}`;
    costoEnvio = COSTO_ENVIO;
  }

  const totalFinal = precioConIva + costoEnvio;

  // Mostramos un resumen al usuario (salida de datos)
  let resumen =
    "Resumen de cotización Urban Kicks\n\n" +
    `👤 Cliente: ${nombreUsuario}\n` +
    `👟 Modelo: ${productoSeleccionado.nombre}\n` +
    `💵 Precio base: $${productoSeleccionado.precio}\n` +
    `🧾 IVA (${(IVA * 100).toFixed(0)}%): $${ivaCalculado.toFixed(2)}\n` +
    `📦 ${mensajeEnvio}\n` +
    "-----------------------------\n" +
    `TOTAL FINAL: $${totalFinal.toFixed(2)}`;

  alert(resumen);
  console.log("Cotización generada:", {
    cliente: nombreUsuario,
    modelo: productoSeleccionado.nombre,
    precioBase: productoSeleccionado.precio,
    iva: ivaCalculado,
    costoEnvio,
    totalFinal
  });

  // Preguntamos si quiere confirmar la compra (uso de confirm)
  const confirmaCompra = confirm("¿Quieres confirmar esta compra?");

  if (confirmaCompra) {
    alert("✅ ¡Gracias por tu compra en Urban Kicks!");
    console.log("El usuario confirmó la compra del modelo:", productoSeleccionado.nombre);
  } else {
    alert("No hay problema, puedes seguir cotizando otros modelos. 😉");
    console.log("El usuario NO confirmó la compra del modelo:", productoSeleccionado.nombre);
  }

  // Devolvemos true indicando que la cotización se completó correctamente
  return true;
}

/**
 * iniciarSimulador()
 * ------------------
 * Controla el ciclo principal del simulador usando while y confirm.
 * - Llama a solicitarDatos() una sola vez.
 * - Permite cotizar múltiples productos mientras el usuario quiera continuar.
 */
function iniciarSimulador() {
  console.clear();
  console.log("=== Urban Kicks - Simulador iniciado ===");

  // Primero pedimos el nombre del usuario
  solicitarDatos();

  let seguir = true;

  // Requisito: ciclo principal con while
  while (seguir) {
    const resultado = cotizarProducto();

    // Si el usuario canceló en el prompt de selección, salimos directamente
    if (resultado === null) {
      alert("Has cancelado la selección de producto. El simulador finalizará.");
      console.log("El usuario salió del simulador desde la selección de producto.");
      break;
    }

    // Preguntamos si desea cotizar otra zapatilla
    seguir = confirm("¿Quieres cotizar otra zapatilla en Urban Kicks?");
  }

  alert("👋 Gracias por usar el simulador de Urban Kicks. ¡Vuelve pronto!");
  console.log("=== Urban Kicks - Simulador finalizado ===");
}

// =====================
// 5) Lógica para la UI visual (opcional, pero profesional)
// =====================
// Solo muestra tarjetas con los mismos modelos del array.
// La lógica del simulador sigue siendo 100% por consola y diálogos.

/**
 * renderizarGridZapatillas()
 * --------------------------
 * Genera tarjetas Bootstrap con los modelos de zapatillas
 * para que se vean en el HTML.
 */
function renderizarGridZapatillas() {
  const grid = document.getElementById("gridZapatillas");
  if (!grid) return;

  grid.innerHTML = "";

  zapatillas.forEach((z) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6";

    col.innerHTML = `
      <article class="card-sneaker p-3 h-100 d-flex flex-column justify-content-between">
        <div>
          <h3 class="h6 mb-1">${z.nombre}</h3>
          <span class="badge badge-price mb-2">Precio: $${z.precio}</span>
          <div class="small text-muted">
            Incluye cálculo de IVA del ${(IVA * 100).toFixed(0)}% en el simulador.
          </div>
        </div>
        <div class="mt-3 d-flex justify-content-between align-items-center small text-muted">
          <span>ID: ${z.id}</span>
          <span class="badge badge-iva">IVA ${(IVA * 100).toFixed(0)}%</span>
        </div>
      </article>
    `;

    grid.appendChild(col);
  });
}

// Asociamos el botón "Iniciar simulador en consola" con la función iniciarSimulador()
document.addEventListener("DOMContentLoaded", () => {
  renderizarGridZapatillas();

  const btnIniciar = document.getElementById("btnIniciar");
  if (btnIniciar) {
    btnIniciar.addEventListener("click", () => {
      iniciarSimulador();
    });
  }

  console.log("Urban Kicks - Página cargada. Listo para iniciar el simulador.");
});
