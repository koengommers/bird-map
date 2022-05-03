import { createStore } from 'vuex'

const API_URL = 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=VOGELS&THEMA=vogels'

const store = createStore({
  state () {
    return {
      data: [],
      filter: [],
      msg: 'hello world'
    }
  },
  
  mutations: {
    setData(state, data) {
      state.data = data
    },
    toggleFilter(state, type) {
      if (state.filter.includes(type)) {
        state.filter = state.filter.filter((i) => i !== type)
      } else {
        state.filter = [...state.filter, type]
      }
    },
  },

  actions: {
    fetchBirdData(context) {
      return fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          context.commit('setData', data.features)
        })
        .catch((err) => console.error(err))
    }
  },

  getters: {
    count(state) {
      return state.data.reduce((counts, feature) => {
        const birdType = feature.properties.Vogel
        if (Object.keys(counts).includes(birdType)) {
          counts[birdType] += 1
        } else {
          counts[birdType] = 1
        }
        return counts
      }, {})
    },
    filteredData(state) {
      return state.filter.length === 0 ? state.data : state.data.filter((feature) => state.filter.includes(feature.properties.Vogel))
    }
  }
})

export default store;
