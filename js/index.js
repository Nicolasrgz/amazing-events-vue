const {createApp} = Vue

const app = createApp({

    data(){
        return{
            apiEvents : [], //todos los eventos
            busqueda: "", //como inicia el input search
            filtroTitulo: [], //lo que retorna la funcion filtrarPorTitulo () 
            checked: [], //input seleccionados
            filtroChecked: [],
            categorias: [], //categorias filtradas sin repetir
            filtrados: []
        }
    },

    created(){

    const url = "https://mindhub-xj03.onrender.com/api/amazing"
    fetch(url)
    .then(res => res.json())
    .then(data => {
    this.apiEvents = data.events 
    this.categorias = [... new Set (this.apiEvents.map(event => event.category))]
    
    
}).catch(error => console.error(error))
    },
    computed:{
        filtrarPorTitulo (){
            this.filtroTitulo = this.apiEvents.filter(event => event.name.toLowerCase().includes(this.busqueda.toLowerCase()))
            console.log(this.filtroTitulo)
          }, 
        filtrarPorChecked(){
            this.filtroChecked = this.apiEvents.filter(event => event.name.toLowerCase(this.checked))
        }, 
    }
})
app.mount('#app')