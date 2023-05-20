const {createApp} = Vue

const app = createApp({

    data(){
        return{
            apiEvents : [],
            busqueda: "",
            filtroTitulo: [],
            checkedInput: [],
            categorias: [],
            añadirCategoria: []
        }
    },

    created(){

    const url = "https://mindhub-xj03.onrender.com/api/amazing"
    fetch(url)
    .then(res => res.json())
    .then(data => {
    this.apiEvents = data.events 
    this.categorias = this.apiEvents.map(event => event.category)
    this.añadirCategoria = [... new Set (this.categorias)]
    
}).catch(error => console.error(error))
    },

    method:{
        
    },


    computed:{
        filtrarPorTitulo (){
            this.filtroTitulo = this.apiEvents.filter(event => event.name.toLowerCase().includes(this.busqueda.toLowerCase()))
            console.log(this.filtroTitulo)
          },
        //   filtroCategorias(){
        //     this.añadirCategoria = []
        //     for(let elementos of this.apiEvents){
        //      if (!this.añadirCategoria.includes(elementos.category)) {
        //              this.añadirCategoria.push(elementos.category);
        //              console.log(this.añadirCategoria)
        //          }
        //     }
        //  }  
    }
})

app.mount('#app')


// function armarCheckbocx(objeto) {
//   return `<input type="checkbox" id="${objeto.category}" name="checkbox" value="${objeto.category}">
//   <label for="${objeto.category}">${objeto.category}</label>`;
// }

// function imprimirCheckbox(lista, ubicacion) {
//   let añadirCategoria = [];
//   for (let elemento of lista){
//     if (!añadirCategoria.includes(elemento.category)) {
//       ubicacion.innerHTML += armarCheckbocx(elemento);
//       añadirCategoria.push(elemento.category);
//     }
//   }
// }

// let apiEvents
// fetch("https://mindhub-xj03.onrender.com/api/amazing")
// .then(res => res.json())
// .then(data => {
//   apiEvents = data
//   imprimirDatos(apiEvents.events , section)
//   imprimirCheckbox(apiEvents.events, formulario)
// })

// inputBusqueda.addEventListener("input", ()=>{
//   let eventosFiltrados = apiEvents.events; 
//     if (inputBusqueda.value) { 
//       eventosFiltrados = filtrarPorTitulo(apiEvents.events, inputBusqueda.value);
//     }
//   let checkedCheckbox = formulario.querySelectorAll("input[name='checkbox']:checked");
//     if (checkedCheckbox.length > 0) { 
//       checkedCheckbox.forEach(checkbox => {
//       eventosFiltrados = filtrarPorCategoria(eventosFiltrados, checkbox.value);
//     });
//   }
//   section.innerHTML = "";
//   imprimirDatos(eventosFiltrados, section);
// });

// formulario.addEventListener('change', ()=>{
//   let eventosFiltrados = filtrarPorTitulo(apiEvents.events, inputBusqueda.value);
//   let checkedCheckbox = formulario.querySelectorAll("input[name='checkbox']:checked");
//   if (checkedCheckbox.length === 0) {
//     section.innerHTML = "";
//     imprimirDatos(eventosFiltrados, section);
//   } else {
//     checkedCheckbox.forEach(checkbox => {
//       eventosFiltrados = filtrarPorCategoria(eventosFiltrados, checkbox.value);
//     });
//     section.innerHTML = "";
//     imprimirDatos(eventosFiltrados, section);
//   }
// });





// function filtrarPorTitulo (data, busqueda){
//   return data.filter(event => event.name.toLowerCase().includes(busqueda.toLowerCase()))
// }

// function filtrarPorCategoria(data) {
//   let categoriasSeleccionadas = [];
//   formulario.querySelectorAll("input[name='checkbox']:checked").forEach((checkbox) => {
//     categoriasSeleccionadas.push(checkbox.value);
//   });
//   return data.filter(event => categoriasSeleccionadas.includes(event.category));
// }
