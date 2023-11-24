<template>
  <div class="map">
    <vuevectormap
      width="1280"
      height="720"
      map ="world_merc"
      :options="{
        // Map options..
        // markers: []
        // markerStyle: {}
        // etc..
      }">
    </vuevectormap>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
}
</script>

<style>


#app {
  /* height: 100%; */
  width: 100%;
  /* padding: 2.5rem;   */
}

#app > div {
  margin: auto;
}

.map {
  position: absolute;
  /* width: 1280px; */
  height: 100%;
  /* border: 1px solid #000; */
}
</style>
