const {remote, ipcRenderer} = require("electron")

const formulario = document.getElementById("formularioCrearExistencia");
const existenciaCodigo = document.getElementById("codigo");
const existenciaCodigoInsumo = document.getElementById("codigo_insumo");
const existenciaCantidad = document.getElementById("cantidad");
const existenciaFechaIngreso = document.getElementById("fecha_ingreso");
const existenciaFechaVencimiento = document.getElementById("fecha_vencimiento");

let actProductoID = document.getElementById("act_id");
let actProductoNombre = document.getElementById("act_nombre");
let actProductoEtiqueta = document.getElementById("act_etiqueta");
let actProductoUnidad = document.getElementById("act_unidad");
let actProductoCantidad = document.getElementById("act_cantidad");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nuevaExistencia = {
        codigo: existenciaCodigo.value,
        codigo_insumo: existenciaCodigoInsumo.value,
        cantidad: existenciaCantidad.value,
        fecha_ingreso: existenciaFechaIngreso.value,
        fecha_vencimiento: existenciaFechaVencimiento.value
    }

    ipcRenderer.send('asynchronous-crearExistencia', nuevaExistencia)
    
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log("Respuesta: "+arg)
        actProductoID.value = arg.id;
        actProductoNombre.value = arg.nombre;
        actProductoEtiqueta.value = arg.etiqueta;
        actProductoUnidad.value = arg.unidad;
        actProductoCantidad.value = arg.cantidad;
    })
})