const table1 = document.getElementById('table-1');
const table2 = document.getElementById('tbody-table-2')
const table3 = document.getElementById('tbody-table-3')

let apiEvents
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(res => res.json())
  .then(data => {
    apiEvents = data;
    const eventoMayorAsistencia = calcularPorcentajeMayor(apiEvents.events.map(event => event.name), apiEvents.events.map(event => event.assistance), apiEvents.events.map(event => event.capacity));
    const eventoMenorAsistencia = calcularMenorPorcentaje(apiEvents.events.map(event => event.name), apiEvents.events.map(event => event.assistance), apiEvents.events.map(event => event.capacity));
    const eventoConMayorCapacidad = mayorAsistencia(apiEvents.events.map(event => event.name), apiEvents.events.map(event => event.capacity));
    imprimirDatosUp(apiEvents.events);
    imprimirDatosPast(apiEvents.events);

    estructuraTable1(eventoMayorAsistencia, eventoMenorAsistencia, eventoConMayorCapacidad);
  });
  
function calcularPorcentajeMayor(name, asistencia, capacidad) {
    let arrayDeDatos = [];
    for (let i = 0; i < apiEvents.events.length; i++) {
      if ( !isNaN(capacidad[i])) {
        let porcentaje = (asistencia[i] * 100) / capacidad[i];
        let elemento = { name: name[i], porcentaje: porcentaje };
        arrayDeDatos.push(elemento);
      }}
    
    const eventoMayorAsistencia = arrayDeDatos.reduce((max, asistencia) => {
      return asistencia.porcentaje > max.porcentaje ? asistencia : max;
    });

  return ((eventoMayorAsistencia.name + ": " + eventoMayorAsistencia.porcentaje.toFixed(2) + "%"))
};
  
function calcularMenorPorcentaje(name, asistencia, capacidad) {
    let arrayDeDatos = [];
    for (let i = 0; i < apiEvents.events.length; i++) {
      if (!isNaN(capacidad[i])) {
        let porcentaje = (asistencia[i] * 100) / capacidad[i];
        let elemento = { name: name[i], porcentaje: porcentaje };
        arrayDeDatos.push(elemento);
      }
    }
    
    const eventoMenorAsistencia = arrayDeDatos.reduce((min, asistencia) => {
      return asistencia.porcentaje < min.porcentaje ? asistencia : min;
    });
    
     return (eventoMenorAsistencia.name + ": " + eventoMenorAsistencia.porcentaje.toFixed(2) + "%");
}
  
function mayorAsistencia(name, capacidad) {
    let arrayDeDatos = [];
    for (let i = 0; i < apiEvents.events.length; i++) {
      if (capacidad[i]) {
        let elemento = { name: name[i], capacity: capacidad[i] };
        arrayDeDatos.push(elemento);
      }
    }
    
    const mayorCapacidad = arrayDeDatos.sort((a, b) => b.capacity - a.capacity);
    if (mayorCapacidad.length > 0) {
      const eventoConMayorCapacidad = mayorCapacidad[0];
      return (eventoConMayorCapacidad.name + ": " + eventoConMayorCapacidad.capacity);
    }
}

function estructuraTable1(eventoMayorAsistencia, eventoMenorAsistencia, mayorCapacidad) {
    let estructura = `
      <tr class = "text-center">
        <th>Event with the highest % of attendance</th>
        <th>Event with the lowest % of attendance</th>
        <th>Event with larger capacity</th>
      </tr>
      <tr class = "text-center">
        <td>${eventoMayorAsistencia}</td>
        <td>${eventoMenorAsistencia}</td>
        <td>${mayorCapacidad}</td>
      </tr>
    `;

    table1.innerHTML = estructura;
  }
//upcoming tiene 19 eventos

function estructura2(categoria, totalCategoria, promedioCategoria) {
  return `
      <tr class = "text-center">
        <td>${categoria}</td>
        <td>$${totalCategoria}</td>
        <td>${promedioCategoria}%</td>
      </tr>
  `;
}

function imprimirDatosUp(data) {
  let datosFiltrados = {};

  for (let elemento of data) {
    let fechaEvento = new Date(elemento.date).getTime();
    let fechaLimite = new Date(apiEvents.currentDate).getTime();

    if (fechaEvento > fechaLimite) {
      const categoria = elemento.category;

      if (!datosFiltrados[categoria]) {
        datosFiltrados[categoria] = [];
      }
      datosFiltrados[categoria].push(elemento);
    }
  }

  let estructuraTabla = '';
  for (let categoria in datosFiltrados) {
    let totalCategoria = datosFiltrados[categoria].reduce((total, elemento) => {
      return total + (elemento.price * elemento.estimate);
    }, 0);
    let promedioCategoria = datosFiltrados[categoria].reduce((promedio, elemento) => {
      return promedio + ((elemento.estimate * 100 / elemento.capacity)/ datosFiltrados[categoria].length);
    }, 0);
    estructuraTabla += estructura2(categoria, totalCategoria, promedioCategoria.toFixed(2));
  }

  table2.innerHTML = estructuraTabla;
  return datosFiltrados;
}
// estructura 3
function estructura3(categoria, totalCategoria, promedioCategoria) {
  return `
      <tr class= "col-12 text-center">
        <td>${categoria}</td>
        <td>$${totalCategoria}</td>
        <td>${promedioCategoria}%</td>
      </tr>
  `;
}

function imprimirDatosPast(data) {
  let datosFiltrados = {};

  for (let elemento of data) {
    let fechaEvento = new Date(elemento.date).getTime();
    let fechaLimite = new Date(apiEvents.currentDate).getTime();

    if (fechaEvento < fechaLimite) {
      const categoria = elemento.category;

      if (!datosFiltrados[categoria]) {
        datosFiltrados[categoria] = [];
      }
      datosFiltrados[categoria].push(elemento);
    }
  }

  let estructuraTabla = '';
  for (let categoria in datosFiltrados) {
    let totalCategoria = datosFiltrados[categoria].reduce((total, elemento) => {
      return total + (elemento.price * elemento.assistance);
    }, 0);
    let promedioCategoria = datosFiltrados[categoria].reduce((promedio, elemento) => {
      return promedio + ((elemento.assistance * 100 / elemento.capacity)/ datosFiltrados[categoria].length);
    }, 0);
    estructuraTabla += estructura3(categoria, totalCategoria, promedioCategoria.toFixed(2));
  }

  table3.innerHTML = estructuraTabla;
  return datosFiltrados;
}
