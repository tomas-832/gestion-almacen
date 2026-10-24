
const endpoints = {
    productos: "/productos",
    proveedores: "/proveedores",
    compras: "/compras",
    ventas: "/ventas",
    gastos: "/gastos"
};

const vistas = document.querySelectorAll(".vista");
const botonesNavegacion = document.querySelectorAll("[data-seccion]");

let productosActuales = [];

function mostrarFormularioProducto() {
    const formulario = document.getElementById("formProducto");

    formulario.classList.remove("oculto");
    document.getElementById("mensajeFormulario").textContent = "";
    document.getElementById("codigoProducto").focus();
}

function navegar(seccion, accion = null) {
    const vista = document.getElementById(`vista-${seccion}`);

    if (!vista) return;

    vistas.forEach(elemento => elemento.classList.remove("activa"));
    vista.classList.add("activa");

    document.querySelectorAll(".nav-item").forEach(boton => {
        boton.classList.toggle(
            "activo",
            boton.dataset.seccion === seccion
        );
    });

    if (seccion === "productos") {
        cargarProductos();

        if (accion === "nuevo") {
            document.getElementById("formProducto").classList.remove("oculto");
            document.getElementById("nombreProducto").focus();
        }
    } else if (seccion !== "inicio" && seccion !== "informes") {
        cargarSeccion(seccion);
    }
}

botonesNavegacion.forEach(boton => {
    boton.addEventListener("click", () => {
        navegar(boton.dataset.seccion, boton.dataset.accion);
    });
});

// Productos


document.getElementById("formProducto").addEventListener(
    "submit",
    async evento => {
        evento.preventDefault();

        const formulario = evento.currentTarget;
        const mensaje = document.getElementById("mensajeFormulario");
        const boton = formulario.querySelector('button[type="submit"]');

        const codigo = document
            .getElementById("codigoProducto")
            .value
            .trim()
            .toUpperCase();

        const nombre = document
            .getElementById("nombreProducto")
            .value
            .trim();

        const precio = Number(
            document.getElementById("precioProducto").value
        );

        const stockMinimo = Number(
            document.getElementById("stockMinimo").value
        );

        if (!/^PROD_[0-9]{4,}$/.test(codigo)) {
            mensaje.textContent =
                "El código debe tener el formato PROD_0001.";
            return;
        }

        if (
            !nombre ||
            !Number.isFinite(precio) ||
            precio <= 0 ||
            !Number.isInteger(stockMinimo) ||
            stockMinimo < 0
        ) {
            mensaje.textContent = "Revisá los datos ingresados.";
            return;
        }

        const nuevoProducto = {
            codigo: codigo,
            nombre: nombre,
            precioVenta: precio,
            stockMinimo: stockMinimo
        };

        boton.disabled = true;
        mensaje.textContent = "Guardando producto...";

        try {
            const respuesta = await fetch("/productos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoProducto)
            });

            if (!respuesta.ok) {
                if (respuesta.status === 409) {
                    throw new Error(
                        "Ya existe un producto con ese código."
                    );
                }

                if (respuesta.status === 400) {
                    throw new Error(
                        "Los datos enviados no son válidos."
                    );
                }
            }

            mensaje.textContent = "Producto registrado correctamente.";

            formulario.reset();
            document.getElementById("stockMinimo").value = 5;
            formulario.classList.add("oculto");

            await cargarProductos();

        } catch (error) {
            mensaje.textContent = error.message;
            console.error("Error al registrar producto:", error);
        } finally {
            boton.disabled = false;
        }
    }
);


document.getElementById("btnCancelarProducto").addEventListener("click", () => {
    document.getElementById("formProducto").classList.add("oculto");
    document.getElementById("formProducto").reset();
    document.getElementById("mensajeFormulario").textContent = "";
});

document.getElementById("btnActualizarProductos").addEventListener(
    "click",
    cargarProductos
);

function obtenerCampo(objeto, ...nombres) {
    for (const nombre of nombres) {
        if (objeto[nombre] !== undefined && objeto[nombre] !== null) {
            return objeto[nombre];
        }
    }

    return null;
}

function formatoPrecio(valor) {
    if (valor === null || valor === undefined || valor === "") {
        return "—";
    }

    return "$" + Number(valor).toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

async function solicitarJSON(url, opciones = {}) {
    const respuesta = await fetch(url, opciones);

    if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status}`);
    }

    if (respuesta.status === 204) {
        return null;
    }

    const texto = await respuesta.text();

    return texto ? JSON.parse(texto) : null;
}

async function cargarProductos() {
    const mensaje = document.getElementById("mensajeProductos");
    const cuerpo = document.querySelector("#tablaProductos tbody");

    mensaje.textContent = "Consultando productos...";
    document.getElementById("btnActualizarProductos").disabled = true;

    try {
        const datos = await solicitarJSON(endpoints.productos);

        productosActuales = Array.isArray(datos) ? datos : [];
        document.getElementById("jsonProductos").textContent =
            JSON.stringify(datos, null, 2);

        cuerpo.replaceChildren();

        productosActuales.forEach(producto => {
            const codigo = obtenerCampo(producto, "codigo", "id");
            const nombre = obtenerCampo(producto, "nombre");
            const precio = obtenerCampo(producto,"precioVenta","precio_venta","precio");
            const stock = obtenerCampo(
                producto, "stock_actual", "stockActual"
            );
            const minimo = obtenerCampo(
                producto, "stock_minimo", "stockMinimo"
            );

            const fila = document.createElement("tr");

            [
                codigo,
                nombre,
                formatoPrecio(precio),
                stock,
                minimo
            ].forEach(valor => {
                const celda = document.createElement("td");
                celda.textContent = valor ?? "—";
                fila.appendChild(celda);
            });

            const stockBajo =
                stock !== null &&
                minimo !== null &&
                Number(stock) < Number(minimo);

            const celdaEstado = document.createElement("td");
            const etiqueta = document.createElement("span");

            etiqueta.className = stockBajo
                ? "estado-stock stock-bajo"
                : "estado-stock stock-normal";

            etiqueta.textContent = stockBajo ? "Stock bajo" : "Normal";
            celdaEstado.appendChild(etiqueta);
            fila.appendChild(celdaEstado);

            cuerpo.appendChild(fila);

            const celdaActivo = document.createElement("td");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = producto.activo;
            checkbox.setAttribute("aria-label", `Activar ${producto.nombre}`);

            celdaActivo.appendChild(checkbox);
            fila.appendChild(celdaActivo);

            checkbox.addEventListener("change", async () => {
    const nuevoEstado = checkbox.checked;

    // Confirmar antes de desactivar
    if (!nuevoEstado) {
        const confirmar = confirm(
            `¿Estás seguro de que querés desactivar "${producto.nombre}"?`
        );

        if (!confirmar) {
            checkbox.checked = true;
            return;
        }
    }

    try {
        const respuesta = await fetch(
            `/productos/${producto.idProducto}/activo`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoEstado)
            }
        );

        if (!respuesta.ok) {
            throw new Error("No se pudo cambiar el estado del producto.");
        }

        alert(
            nuevoEstado
                ? "Producto activado correctamente."
                : "Producto desactivado correctamente."
        );

    } catch (error) {
        alert(error.message);

        // Volver al estado anterior si falla la petición
        checkbox.checked = !nuevoEstado;
                }
            });
        });

        mensaje.textContent =
            `${productosActuales.length} producto(s) encontrado(s).`;

        actualizarResumen();
    } catch (error) {
        mensaje.textContent =
            "No se pudieron cargar los productos. Revisá el backend.";

        console.error("Error al cargar productos:", error);
    } finally {
        document.getElementById("btnActualizarProductos").disabled = false;
    }
}

function actualizarResumen() {
    document.getElementById("totalProductos").textContent =
        productosActuales.length;

    const productosConStockBajo = productosActuales.filter(producto => {
        const stock = obtenerCampo(producto, "stock_actual", "stockActual");
        const minimo = obtenerCampo(producto, "stock_minimo", "stockMinimo");

        return stock !== null &&
            minimo !== null &&
            Number(stock) < Number(minimo);
    });

    document.getElementById("totalStockBajo").textContent =
        productosConStockBajo.length;
}

// Compras, ventas, proveedores y gastos

async function cargarSeccion(seccion) {
    const mensaje = document.getElementById(`mensaje-${seccion}`);
    const tabla = document.getElementById(`tabla-${seccion}`);
    const json = document.getElementById(`json-${seccion}`);

    mensaje.textContent = "Consultando datos...";

    try {
        const datos = await solicitarJSON(endpoints[seccion]);
        const registros = Array.isArray(datos)
            ? datos
            : datos == null ? [] : [datos];

        json.textContent = JSON.stringify(datos, null, 2);
        tabla.replaceChildren();

        if (registros.length === 0) {
            mensaje.textContent = "No hay registros para mostrar.";
            return;
        }

        const columnas = [
            ...new Set(registros.flatMap(registro =>
                registro && typeof registro === "object"
                    ? Object.keys(registro)
                    : ["valor"]
            ))
        ];

        const encabezado = document.createElement("thead");
        const filaEncabezado = document.createElement("tr");

        columnas.forEach(columna => {
            const celda = document.createElement("th");
            celda.textContent = columna;
            filaEncabezado.appendChild(celda);
        });

        encabezado.appendChild(filaEncabezado);
        tabla.appendChild(encabezado);

        const cuerpo = document.createElement("tbody");

        registros.forEach(registro => {
            const fila = document.createElement("tr");

            columnas.forEach(columna => {
                const celda = document.createElement("td");
                const valor = columna === "valor"
                    ? registro
                    : registro?.[columna];

                celda.textContent = valor == null
                    ? ""
                    : typeof valor === "object"
                        ? JSON.stringify(valor)
                        : String(valor);

                fila.appendChild(celda);
            });

            cuerpo.appendChild(fila);
        });

        tabla.appendChild(cuerpo);
        mensaje.textContent = `${registros.length} registro(s) encontrado(s).`;
    } catch (error) {
        mensaje.textContent =
            `No se pudieron cargar los datos de ${seccion}. Verificá que exista el endpoint.`;

        console.error(`Error al cargar ${seccion}:`, error);
    }
}

document.querySelectorAll("[data-actualizar]").forEach(boton => {
    boton.addEventListener("click", () => {
        cargarSeccion(boton.dataset.actualizar);
    });
});

// Cargar la pantalla inicial y los productos para calcular los indicadores.
navegar("inicio");
cargarProductos();
