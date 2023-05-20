const { createApp } = Vue

const app = createApp({
  data() {
    return {
      apiEvents: [],
      busqueda: "",
      filtroTitulo: [],
      checkedInput: [],
      categorias: [],
      
      filtroFechasUp: [],
      fechaEvento: [],
   
      eventosFuturos: [] // Nueva propiedad para almacenar los eventos Futuros filtrados
    }
  },

  created() {
    const url = "https://mindhub-xj03.onrender.com/api/amazing"
    fetch(url)
      .then(res => res.json())
      .then(data => { 
        this.apiEvents = data.events 
        this.currentDate = data.currentDate
        
        this.categorias = [... new Set (this.apiEvents.map(event => event.category))]

        this.fechaLimite = new Date(this.currentDate).getTime()

        
        this.eventosFuturos = this.apiEvents.filter(event => event.fechaEvento < this.fechaLimite)

        this.eventosFuturos = this.apiEvents.filter(event => {
            const fechaEvento = new Date(event.date).getTime() // Obtiene la fecha del evento
            return fechaEvento < this.fechaLimite // Filtra los eventos Futuros
          })

        // this.eventsPast()
      })
      .catch(error => console.error(error))
  },

  methods: {
    // eventsPast() {
    //   this.eventosFuturos = [] // Reinicia la lista de eventos Futuros
    //   for (let elemento of this.apiEvents) {
    //     this.fechaEvento = new Date(elemento.date).getTime(); // Usa elemento.date en lugar de elemento.apiEvents.date
    //     this.fechaLimite = new Date(this.currentDate).getTime();
    //     if (this.fechaEvento < this.fechaLimite) {
    //       this.eventosFuturos.push(elemento); // Agrega el evento a la lista de eventos Futuros
    //     }
    //   }
    // }
  },

  computed: {
    filtrarPorTitulo() {
      this.filtroTitulo = this.eventosFuturos.filter(event => event.name.toLowerCase().includes(this.busqueda.toLowerCase()))
      console.log(this.filtroTitulo)
    },
  }
})

app.mount('#app')


// function imprimirDatos (lista, ubicacion){
//     for (let elemento of lista){
//         let fechaEvento = new Date(elemento.date).getTime();
//         let fechaLimite = new Date(apiEvents.currentDate).getTime();
//         if (fechaEvento < fechaLimite) {
//             ubicacion.innerHTML += armarDiv(elemento);
//         }
//     }
// }