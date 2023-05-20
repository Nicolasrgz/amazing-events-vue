const { createApp } = Vue

const app = createApp({
  data() {
    return {
      eventDetails: null,
      apiEvents: [],
      params: {}
    }
  },

  created() {
    this.params = new URLSearchParams(location.search)
    const identificador = this.params.get('id')
    console.log(identificador)
    console.log(this.params)
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then(res => res.json())
      .then(data => {
        this.apiEvents = data.events
        this.eventDetails = this.apiEvents.find(event => event._id == identificador)
        document.title = `details of ${this.eventDetails.name}`
      })
      .catch(error => console.error(error))
  }
})

app.mount('#app')


