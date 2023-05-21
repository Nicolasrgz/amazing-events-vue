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
      this.eventoMayorAsistencia = this.arrayMayorAsistencia.reduce(
        (max, assistance) => {
          return assistance.porcentaje > max.porcentaje ? assistance : max;
        }
      );
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
      this.eventoMenorAsistencia = this.arrayMenorAsistencia.reduce(
        (min, assistance) => { return assistance.porcentaje < min.porcentaje ? assistance : min;
        }
      );
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
  },
});

app.mount("#app");


// const table1 = document.getElementById('table-1');
// const table2 = document.getElementById('tbody-table-2')
// const table3 = document.getElementById('tbody-table-3')

// let apiEvents
// fetch("https://mindhub-xj03.onrender.com/api/amazing")
//   .then(res => res.json())
//   .then(data => {
//     apiEvents = data;
//     const eventoMayorAsistencia = calcularPorcentajeMayor(apiEvents.events.map(event => event.name), apiEvents.events.map(event => event.assistance), apiEvents.events.map(event => event.capacity));
//     const eventoMenorAsistencia = calcularMenorPorcentaje(apiEvents.events.map(event => event.name), apiEvents.events.map(event => event.assistance), apiEvents.events.map(event => event.capacity));
//     const eventoConMayorCapacidad = mayorAsistencia(apiEvents.events.map(event => event.name), apiEvents.events.map(event => event.capacity));
//     imprimirDatosUp(apiEvents.events);
//     imprimirDatosPast(apiEvents.events);

//     estructuraTable1(eventoMayorAsistencia, eventoMenorAsistencia, eventoConMayorCapacidad);
//   });
  
// ;
  

// function estructuraTable1(eventoMayorAsistencia, eventoMenorAsistencia, mayorCapacidad) {
//     let estructura = `
//       <tr class = "text-center">
//         <th>Event with the highest % of attendance</th>
//         <th>Event with the lowest % of attendance</th>
//         <th>Event with larger capacity</th>
//       </tr>
//       <tr class = "text-center">
//         <td>${eventoMayorAsistencia}</td>
//         <td>${eventoMenorAsistencia}</td>
//         <td>${mayorCapacidad}</td>
//       </tr>
//     `;

//     table1.innerHTML = estructura;
//   }
//upcoming tiene 19 eventos

// function estructura2(categoria, totalCategoria, promedioCategoria) {
//   return `
//       <tr class = "text-center">
//         <td>${categoria}</td>
//         <td>$${totalCategoria}</td>
//         <td>${promedioCategoria}%</td>
//       </tr>
//   `;
// }

// function imprimirDatosUp(data) {
//   let datosFiltrados = {};

//   for (let elemento of data) {
//     let fechaEvento = new Date(elemento.date).getTime();
//     let fechaLimite = new Date(apiEvents.currentDate).getTime();

//     if (fechaEvento > fechaLimite) {
//       const categoria = elemento.category;

//       if (!datosFiltrados[categoria]) {
//         datosFiltrados[categoria] = [];
//       }
//       datosFiltrados[categoria].push(elemento);
//     }
//   }

//   let estructuraTabla = '';
//   for (let categoria in datosFiltrados) {
//     let totalCategoria = datosFiltrados[categoria].reduce((total, elemento) => {
//       return total + (elemento.price * elemento.estimate);
//     }, 0);
//     let promedioCategoria = datosFiltrados[categoria].reduce((promedio, elemento) => {
//       return promedio + ((elemento.estimate * 100 / elemento.capacity)/ datosFiltrados[categoria].length);
//     }, 0);
//     estructuraTabla += estructura2(categoria, totalCategoria, promedioCategoria.toFixed(2));
//   }

//   table2.innerHTML = estructuraTabla;
//   return datosFiltrados;
// }
// estructura 3
// function estructura3(categoria, totalCategoria, promedioCategoria) {
//   return `
//       <tr class= "col-12 text-center">
//         <td>${categoria}</td>
//         <td>$${totalCategoria}</td>
//         <td>${promedioCategoria}%</td>
//       </tr>
//   `;
// }

// function imprimirDatosPast(data) {
//   let datosFiltrados = {};

//   for (let elemento of data) {
//     let fechaEvento = new Date(elemento.date).getTime();
//     let fechaLimite = new Date(apiEvents.currentDate).getTime();

//     if (fechaEvento < fechaLimite) {
//       const categoria = elemento.category;

//       if (!datosFiltrados[categoria]) {
//         datosFiltrados[categoria] = [];
//       }
//       datosFiltrados[categoria].push(elemento);
//     }
//   }

//   let estructuraTabla = '';
//   for (let categoria in datosFiltrados) {
//     let totalCategoria = datosFiltrados[categoria].reduce((total, elemento) => {
//       return total + (elemento.price * elemento.assistance);
//     }, 0);
//     let promedioCategoria = datosFiltrados[categoria].reduce((promedio, elemento) => {
//       return promedio + ((elemento.assistance * 100 / elemento.capacity)/ datosFiltrados[categoria].length);
//     }, 0);
//     estructuraTabla += estructura3(categoria, totalCategoria, promedioCategoria.toFixed(2));
//   }

//   table3.innerHTML = estructuraTabla;
//   return datosFiltrados;
// }
