<template>
  <div class="container" :class="{'container__up': !axiosEnd && data.length > 0 }">
    <b-button variant="info" @click="getData()" v-if="!axiosEnd">
      Consultame 
      <span v-if="!axiosEnd && data.length >0">
        de nuevo
      </span>
    </b-button>
    <b-overlay :show="axiosEnd"></b-overlay>
    <pre v-if="!axiosEnd && data.length > 0">{{data}}</pre>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      data: [],
      axiosEnd: false
    }
  },
  methods: {
    getData () {
      this.axiosEnd = true
      axios.get('/api/main/').then((res) => {
        this.data = JSON.stringify(JSON.parse(res.data), null, 2)
        this.axiosEnd = false
      })
      .catch((res) => {
        console.log(res)
        this.axiosEnd = false
        this.$notify({
          title: 'Oops, ocurrió un error, prueba nuevamente.',
          type: 'error'
      })
      })
    }
  }
}
</script>
