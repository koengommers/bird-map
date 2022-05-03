<!-- Shows single filter item for a bird type. Has prop `type` -->
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: ['type'],
  computed: {
    style() {
      return {
        '--color': this.type.color,
        opacity: (this.$store.state.filter.length === 0 || this.$store.state.filter.includes(this.type.name)) ? 1 : 0.5
      }
    },
    ...mapGetters(['count'])
  },
  methods: {
    ...mapMutations(['toggleFilter'])
  }
}
</script>

<template>
  <button :style="style" @click="toggleFilter(type.name)">{{ type.name }}<span>{{ count[type.name] ? count[type.name] : 0 }}</span></button>
</template>

<style scoped>
button {
  border: 2px solid var(--color);
  padding: 20px 30px;
  font-family: inherit;
  font-size: inherit;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
}

button::before {
  content: ' ';
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: var(--color);
  margin-right: 10px;
}

span {
  opacity: 0.5;
  font-weight: bold;
  font-size: 14px;
  margin-left: 5px;
}
</style>
