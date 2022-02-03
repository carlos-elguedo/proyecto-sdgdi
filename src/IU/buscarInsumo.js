const {remote, ipcRenderer} = require("electron")

const formulario = document.getElementById("buscarInsumo");
const insumoCodigo = document.getElementById("codigo");
const insumoCategoria = document.getElementById("categoria");
const insumoEtiqueta = document.getElementById("etiqueta");
const insumoNombre = document.getElementById("nombre");
const insumoUbicacion = document.getElementById("ubicacion");
const insumoCantidad = document.getElementById("cantidad");
const insumoUnidad = document.getElementById("unidad");

/*let resProductoNombre = document.getElementById("res_nombre");
let resProductoID = document.getElementById("res_id");
let resProductoEtiqueta = document.getElementById("res_etiqueta");
let resProductoUnidad = document.getElementById("res_unidad");
let resProductoCantidad = document.getElementById("res_cantidad");*/

let resultado = document.getElementById("resultado");
let listaExistencias = document.getElementById("listaExistencias");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    resultado.innerHTML = ""
    listaExistencias.innerHTML = ""

    let cantidad

    if(insumoCantidad.value != "") cantidad = parseFloat(insumoCantidad.value)
    
    const consulta = {
        codigo: insumoCodigo.value,
        categoria: insumoCategoria.value,
        etiqueta: insumoEtiqueta.value,
        nombre: insumoNombre.value,
        ubicacion: insumoUbicacion.value,
        cantidad: cantidad,
        unidad: insumoUnidad.value
    }

    ipcRenderer.send('asynchronous-buscarInsumo', consulta)

    ipcRenderer.on('asynchronous-reply-buscarInsumo', (event, resultado) => {
        listarInsumos(resultado)
    })
})

function desplegarExistencias(idElemento){

    const existencia = {
        codigo: "",
        codigo_insumo: idElemento,
        cantidad: "",
        fecha_ingreso: "",
        fecha_vencimiento: ""
    }

    ipcRenderer.send('asynchronous-buscarExistencia', existencia)

    ipcRenderer.on('asynchronous-reply-buscarExistencia', (event, resultado) => {
        listarExistencias(resultado)
    })
}

function listarInsumos(Insumos) {
    let tarjetas = ""
    
    Insumos.forEach(function(insumo) {
        tarjetas += '<div id="'+insumo.codigo+'" onclick="desplegarExistencias(this.id)" class="card text-white bg-primary mb-3 mt-4 animate__animated animate__backInLeft" style="max-width: 20rem;">'+
                    '   <div class="card-header">'+insumo.categoria+' > '+insumo.etiqueta+'</div>'+
                    '   <div class="card-body">'+
                    '      <h1 class="card-title">'+insumo.nombre+'</h1>'+
                    '      <p class="card-text">'+
                    '          Codigo: '+insumo.codigo+'</br>'+
                    '          Cantidad: '+insumo.cantidad+insumo.unidad+'</br>'+
                    '          Ubicación: '+insumo.ubicacion+
                    '      </p>'+
                    '   </div>'+
                    '</div>'
    });

    resultado.innerHTML = tarjetas
}

function listarExistencias(existencias) {
    let tarjetas = ""

    existencias.forEach(function(existencia) {
        tarjetas += '<div id="'+existencia.codigo+'" class="card text-white bg-secondary mb-3 mt-4 animate__animated animate__backInRight" style="max-width: 20rem;">'+
                        '<div class="card-header">'+existencia.codigo+' - '+existencia.codigo_insumo+'</div>'+
                        '<div class="card-body">'+
                        '    <h1 class="card-title">'+"Hola"+'</h1>'+
                        '    <p class="card-text">Fecha de ingreso: '+existencia.fecha_ingreso+'</br>Fecha de vencimiento: '+existencia.fecha_vencimiento+'</p>'+
                        '</div>'+
                        '</div>'
    });

    listaExistencias.innerHTML = tarjetas
}