const {createApp} = Vue

const app = createApp({

    data(){
        return{
            apiEvents : [],
            busqueda: "",
            filtroTitulo: [],
        }
    },

    created(){

    const url = "https://mindhub-xj03.onrender.com/api/amazing"
    fetch(url)
    .then(res => res.json())
    .then(data => {
    this.apiEvents = data.events 
    
}).catch(error => console.error(error))
    },

    methods:{
        filtrarPorTitulo (){
            this.filtroTitulo = this.apiEvents.filter(event => event.name.toLowerCase().includes(this.busqueda.toLowerCase()))
            console.log(this.filtroTitulo)
          }
    }
})

app.mount('#app')