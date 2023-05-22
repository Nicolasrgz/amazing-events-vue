const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      apiEvents: [],
      currentDate: [],

      name: [],
      assistance: [],
      capacity: [],

      arrayMayorAsistencia: [],
      eventoMayorAsistencia: [],

      arrayMenorAsistencia: [],
      eventoMenorAsistencia: [],

      arrayMayorCapacidad: [],
      mayorCapacidad: [],
      eventoMayorCapacidad: [],

            
      fechaEvento: [],
      eventosFuturos: [],
      eventosPasados: [],

      datosFiltrados: {},
      categoria: [],

      totalCategoria: {},
      promedioCategoria: {},

      totalCategoriaPast: {},
      promedioCategoriaPast:{},

      elemento: [],
    };
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then((res) => res.json())
      .then((data) => {
        this.apiEvents = data.events;
        this.currentDate = data.currentDate;

        this.name = this.apiEvents.map((event) => event.name);
        this.assistance = this.apiEvents.map((event) => event.assistance);
        this.capacity = this.apiEvents.map((event) => event.capacity);

        this.fechaLimite = new Date(this.currentDate).getTime()

        this.eventosFuturos = this.apiEvents.filter(event => event.fechaEvento > this.fechaLimite)
        this.eventosFuturos = this.apiEvents.filter(event => {
          this.fechaEvento = new Date(event.date).getTime() // Obtiene la fecha del evento
            return this.fechaEvento > this.fechaLimite 
          }) // Filtra los eventos Futuros
          this.imprimirDatosUp();

        this.eventosPasados = this.apiEvents.filter(event => event.fechaEvento < this.fechaLimite) 
        this.eventosPasados = this.apiEvents.filter(event => {
          this.fechaEvento = new Date(event.date).getTime() // Obtiene la fecha del evento
          return this.fechaEvento < this.fechaLimite // Filtra los eventos Pasados
        })
        this.imprimirDatosPast(); 
      });
  },
  methods: {
    calcularMayorAsistencia() {
      for (let i = 0; i < this.apiEvents.length; i++) {
        if (!isNaN(this.capacity[i])) {
          this.elemento = { name: this.name[i], porcentaje: (this.assistance[i] * 100) / this.capacity[i] };   
          this.arrayMayorAsistencia.push(this.elemento);
        }
      }
      if (this.arrayMayorAsistencia.length > 0) {
        this.eventoMayorAsistencia = this.arrayMayorAsistencia.reduce(
          (max, assistance) => {
            return assistance.porcentaje > max.porcentaje ? assistance : max;
          }
        );
      }
      return (this.eventoMayorAsistencia.name +": " + this.eventoMayorAsistencia.porcentaje.toFixed(2) + "%"
      );
    },
    calcularMenorAsistencia() {
      for (let i = 0; i < this.apiEvents.length; i++) {
        if (!isNaN(this.assistance[i])) {
          this.elemento = { name: this.name[i], porcentaje: (this.assistance[i] * 100) / this.capacity[i] };
          this.arrayMenorAsistencia.push(this.elemento);
        }
      }
      if (this.arrayMenorAsistencia.length > 0) {
        this.eventoMenorAsistencia = this.arrayMenorAsistencia.reduce(
          (max, assistance) => {
            return assistance.porcentaje > max.porcentaje ? assistance : max;
          }
        );
      }
      return ( this.eventoMenorAsistencia.name + ": " + this.eventoMenorAsistencia.porcentaje.toFixed(2) +"%"
      );
    },
    calcularMayorCapacidad() {
      for (let i = 0; i < this.apiEvents.length; i++) {
        if (this.capacity[i]) {
          this.elemento = { name: this.name[i], capacity: this.capacity[i] };    
          this.arrayMayorCapacidad.push(this.elemento);
        }
      }
      this.mayorCapacidad = this.arrayMayorCapacidad.sort( (a, b) => b.capacity - a.capacity);
      if (this.mayorCapacidad.length > 0) {
        this.eventoMayorCapacidad = this.mayorCapacidad[0];
        return ( this.eventoMayorCapacidad.name + ": " + this.eventoMayorCapacidad.capacity
        );
      }
    },
    imprimirDatosUp() {   
      for (let elemento of this.eventosFuturos) {
        const categoria = elemento.category;
    
        if (!this.totalCategoria[categoria]) {
          this.totalCategoria[categoria] = 0;
        }
        this.totalCategoria[categoria] += elemento.price * elemento.estimate;
        console.log(this.totalCategoria[categoria])
        if (!this.promedioCategoria[categoria]) {
          this.promedioCategoria[categoria] = 0;
        }
        this.promedioCategoria[categoria] += (elemento.estimate * 100) / elemento.capacity;
      }
  
      for (let categoria in this.totalCategoria) {
        this.promedioCategoria[categoria] /= this.eventosFuturos.filter((e) => e.category === categoria).length;
      }
    },
    imprimirDatosPast(){
      for(let elemento of this. eventosPasados){
        const categoriaPast = elemento.category;
        if(!this.totalCategoriaPast[categoriaPast]){
          this.totalCategoriaPast[categoriaPast] = 0
        }
        this.totalCategoriaPast[categoriaPast] += elemento.price * elemento.assistance;

        if(!this.promedioCategoriaPast[categoriaPast]){
          this.promedioCategoriaPast[categoriaPast] = 0;
        }
        this.promedioCategoriaPast[categoriaPast] += (elemento.assistance * 100) / elemento.capacity;
      }
      for(let categoriaPast in this.totalCategoriaPast){
        this.promedioCategoriaPast[categoriaPast] /= this.eventosPasados.filter((e) => e.category === categoriaPast).length
      }
    },    
  },
});
app.mount("#app")