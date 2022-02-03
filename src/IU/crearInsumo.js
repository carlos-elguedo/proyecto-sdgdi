const {remote, ipcRenderer} = require("electron")

const formulario = document.getElementById("formularioCrearInsumo");
const insumoCodigo = document.getElementById("codigo");
const insumoCategoria = document.getElementById("categoria");
const insumoEtiqueta = document.getElementById("etiqueta");
const insumoNombre = document.getElementById("nombre");
const insumoUbicacion = document.getElementById("ubicacion");
const insumoCantidad = document.getElementById("cantidad");
const insumoUnidad = document.getElementById("unidad");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nuevoInsumo = {
        codigo: insumoCodigo.value,
        categoria: insumoCategoria.value,
        etiqueta: insumoEtiqueta.value,
        nombre: insumoNombre.value,
        ubicacion: insumoUbicacion.value,
        cantidad: parseFloat(insumoCantidad.value),
        unidad: insumoUnidad.value
    }

    ipcRenderer.send('asynchronous-crearProducto', nuevoInsumo)
})