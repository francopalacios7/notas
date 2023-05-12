/* let resultado = document.querySelector("#resultado")
let peso = document.querySelector("#peso")
let estatura = document.querySelector("#estatura")
let form = document.querySelector("form")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let resultado1 = 0
    resultado.innerHTML+=resultado1
    return resultado.value = peso.value / (estatura.value ** 2)
}) */


/* 
let formulario = document.getElementById("formulario")
const pesoArg = document.getElementById("pesoArg")
const dolar = document.getElementById("dolar")
const resultado = document.getElementById("resultado")


formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    let pesos = parseFloat(pesoArg.value)
    let dolares = parseFloat(dolar.value)
    if (pesos){
       pesoArg.value = "" 
       let mensaje = `El resultado del cambio de pesos a dolares es de: ${cambioPesos}(pesos).toFixed(2)`}
       resultado.textContent = mensaje
    
    if (dolares){
        dolar.value = ""
        let mensaje = `El resultado del cambio de dolares a pesos es de: ${cambioDolar}(dolares).toFixed(2)`
        resultado.textContent = mensaje})
   } 

function cambioPesos(monedaUno){
    const pesos = 140
    return monedaUno / pesos;
}
function cambioDolar(monedaDos){
    const pesoDolar = 140
    return monedaDos * pesoDolar;
} */




let form = document.getElementById("formulario-js")
let title = document.getElementById("titulo-nueva-nota")
let description = document.getElementById("descripcion-nueva-nota")
let borrar = document.querySelectorAll('#formulario-js input[value="borrar"]')
let buscar = document.getElementById("busqueda")
let realizadas = document.getElementById("realizadas")
let container = document.getElementById("container-notas")


let notas = [{
    titulo: 'Ir a comprar',
    descripcion: 'Comida',
    realizada: false,
    id : 0
},
{
    titulo: 'Darle de comer al gato',
    descripcion: 'Comida',
    realizada: false,
    id : 1
},
{
    titulo: 'Ir a jugar al futbol',
    descripcion: 'Comida',
    realizada: false,
    id : 2
},
]
let idNotas = 3

pintarArticles( notas, container )

form.addEventListener('submit', (e) => {
e.preventDefault()
if (title.value && description.value) {
    let nota = {
        titulo: title.value,
        descripcion: description.value,
        realizada: false,
        id : idNotas
    }
    idNotas++
    reiniciarForm(title, description)
    notas.push(nota)
    pintarArticles( notas, container )
} else {
    alert('Todos los campos son obligatorios')
}
console.log(notas)

})


container.addEventListener( 'click', (e) => {
let dataSet = e.target.dataset
console.log([ e.target] ) 
if(dataSet.accion == "borrar"){
    
    notas = notas.filter( nota => nota.id != dataSet.id )

   
    pintarArticles( notas, container )
}
if(dataSet.accion == "estado"){
   
    const nota = notas.find( nota => nota.id == dataSet.id )
    nota.realizada = !nota.realizada
}
} )


buscar.addEventListener( 'input', () => {
const filtrarPorBusqueda = filtrarPorTitulo( notas, buscar.value )
if( realizadas.checked ){
    const filtradoPorRealizadas = filtrarPorRealizadas( filtrarPorBusqueda )
    pintarArticles( filtradoPorRealizadas, container )
}else{
    pintarArticles( filtrarPorBusqueda, container )
}
})

realizadas.addEventListener( 'change', () => {
const filtrarPorBusqueda = filtrarPorTitulo( notas, buscar.value )
if( realizadas.checked ){
    const filtradoPorRealizadas = filtrarPorRealizadas( filtrarPorBusqueda )
    pintarArticles( filtradoPorRealizadas, container )
}else{
    pintarArticles( filtrarPorBusqueda, container )
}
})

function filtrarPorRealizadas( notas ) {
return notas.filter( nota => nota.realizada )
}

function filtrarPorTitulo( notas, busqueda ) {
return notas.filter( nota => nota.titulo.toLowerCase().includes( busqueda.toLowerCase() ) )
}

function reiniciarForm(input, text) {
input.value = ""
text.value = ""
}

function pintarArticles( notas, contenedor ){
let template = ""
for( let nota of notas){
    template += crearArticle( nota ) 
}
contenedor.innerHTML = template
}

function crearArticle(nota) {
let estado = ''
if( nota.realizada ){
    estado = 'checked'
}
return `<article class="card col-3">
            <header class="card-header">
                <div class="form-check">
                    <input class="form-check-input" data-accion="estado" data-id="${nota.id}" type="checkbox" ${estado} value="" id="">
                    ${nota.titulo}
                </div>
            </header>
            <main class="card-body"> <p> ${nota.descripcion} </p> </main>
            <footer class="card-footer d-flex justify-content-center">
                <button class="btn btn-danger" data-accion="borrar" data-id="${nota.id}">Borrar nota</button>
            </footer>
        </article>
`
}