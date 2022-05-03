<!-- Shows filter selection and total number of visible items -->
<script>
import { mapGetters } from 'vuex'
import EyeIcon from 'vue-material-design-icons/Eye.vue'
import FilterItem from './FilterItem.vue'
import { birdTypes } from '../constants'

export default {
  data() {
    return {
      birdTypes
    }
  },
  components: {FilterItem, EyeIcon},
  computed: {
    ...mapGetters(['filteredData'])
  }
}
</script>

<template>
  <div class="bottom-bar">
    <FilterItem :type="type" v-for="type in birdTypes" :key="type.name" />
    <div class="visible-count">
      <EyeIcon class="icon" /> {{ filteredData.length }}
    </div>
  </div>
</template>

<style>
.bottom-bar {
  display: flex;
  gap: 16px;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #fff;
}

.visible-count {
  padding: 16px;
  display: flex;
  gap: 4px;
  line-height: 1;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  opacity: 0.5;
}

.material-design-icon.icon {
  height: 16px;
  width: 16px;
}

.material-design-icon.icon > .material-design-icon__svg {
  height: 16px;
  width: 16px;
}
</style>
