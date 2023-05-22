const { createApp } = Vue

const app = createApp({
  data() {
    return {
      apiEvents: [],
      busqueda: "",
      filtroTitulo: [],
      checked: [],
      categorias: [],
      
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
        this.eventosFuturos = this.apiEvents.filter(event => event.fechaEvento > this.fechaLimite)

        this.eventosFuturos = this.apiEvents.filter(event => {
          this.fechaEvento = new Date(event.date).getTime() // Obtiene la fecha del evento
            return this.fechaEvento > this.fechaLimite // Filtra los eventos Futuros
          })
      })
      .catch(error => console.error(error))
  },

  computed: {
    filtrarPorTitulo (){
      this.filtroTitulo = this.eventosFuturos.filter(event => event.name.toLowerCase().includes(this.busqueda.toLowerCase())
      && (this.checked.includes(event.category) || this.checked.length == 0) )
    },
  }
})

app.mount('#app')
