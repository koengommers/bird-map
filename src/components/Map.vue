<!-- Shows circles on a map, indicating breeding grounds -->
<script>
import mapboxgl from 'mapbox-gl'
import { birdTypes } from '../constants'

const MAPBOX_TOKEN = 'pk.eyJ1Ijoia2dvbW1lcnMiLCJhIjoiY2pjYWU5cGltMDZueTMzczgwY3d6d2duNCJ9.BJiu6FuElQ1EpcsZt2uMfQ'

export default {
  mounted() {
    mapboxgl.accessToken = MAPBOX_TOKEN
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [4.901, 52.3567],
      zoom: 12
    })

    this.map.on('load', this.addBirdMarkers)
  },
  methods: {
    addBirdMarkers() {
      this.map.addSource('birds', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: this.$store.getters.filteredData
        }
      })
      this.map.addLayer({
        id: 'points',
        type: 'circle',
        source: 'birds',
        paint: {
          'circle-radius': 3,
          'circle-color': {
            property: 'Vogel',
            type: 'categorical',
            stops: birdTypes.map((type) => [type.name, type.color])
          }
        }
      })
    },
    updateBirdMarkers() {
      this.map.getSource('birds')?.setData({
        type: 'FeatureCollection',
        features: this.$store.getters.filteredData
      })
    }
  },
  watch: {
    '$store.getters.filteredData': function() {
      this.updateBirdMarkers()
    }
  }
}
</script>

<template>
  <div id="map"></div>
</template>

<style>
#map {
  width: 100%;
  height: 100vh;
}

.mapboxgl-control-container {
  display: none;
}
</style>
