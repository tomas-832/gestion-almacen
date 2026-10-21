const secciones = {
    productos: {
        titulo: "Productos",
        endpoint: "/productos"
    },
    compras: {
        titulo: "Compras",
        endpoint: "/compras"
    },
    ventas: {
        titulo: "Ventas",
        endpoint: "/ventas"
    },
    proveedores: {
        titulo: "Proveedores",
        endpoint: "/proveedores"
    },
    gastos: {
        titulo: "Gastos",
        endpoint: "/gastos"
    }
};

const parametros = new URLSearchParams(window.location.search);
const tipo = parametros.get("tipo");
const seccion = secciones[tipo];

const titulo = document.getElementById("tituloSeccion");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("tablaDatos");
const jsonDatos = document.getElementById("jsonDatos");
const botonActualizar = document.getElementById("btnActualizar");

if (!seccion) {
    window.location.replace("/");
} else {
    titulo.textContent = seccion.titulo;
    document.title = seccion.titulo + " - Almacén Don José";

    botonActualizar.addEventListener("click", cargarDatos);
    cargarDatos();
}

async function cargarDatos() {
    mensaje.textContent = "Consultando datos...";
    botonActualizar.disabled = true;

    try {
        const respuesta = await fetch(seccion.endpoint);

        if (!respuesta.ok) {
            throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        mostrarDatos(datos);

        mensaje.textContent = Array.isArray(datos)
            ? `${datos.length} registro(s) encontrado(s).`
            : "Datos cargados correctamente.";
    } catch (error) {
        mensaje.textContent =
            "No se pudieron cargar los datos. Verificá que el endpoint exista.";

        console.error(error);
    } finally {
        botonActualizar.disabled = false;
    }
}

function mostrarDatos(datos) {
    const registros = Array.isArray(datos) ? datos : [datos];

    const encabezado = tabla.querySelector("thead");
    const cuerpo = tabla.querySelector("tbody");

    encabezado.replaceChildren();
    cuerpo.replaceChildren();

    jsonDatos.textContent = JSON.stringify(datos, null, 2);

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

    const filaEncabezado = document.createElement("tr");

    columnas.forEach(columna => {
        const th = document.createElement("th");
        th.textContent = columna;
        filaEncabezado.appendChild(th);
    });

    encabezado.appendChild(filaEncabezado);

    registros.forEach(registro => {
        const fila = document.createElement("tr");

        columnas.forEach(columna => {
            const celda = document.createElement("td");
            const valor = columna === "valor"
                ? registro
                : registro?.[columna];

            celda.textContent =
                valor == null ? "" :
                typeof valor === "object" ? JSON.stringify(valor) :
                String(valor);

            fila.appendChild(celda);
        });

        cuerpo.appendChild(fila);
    });
}

