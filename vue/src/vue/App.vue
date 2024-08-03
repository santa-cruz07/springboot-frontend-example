<template>
  <ToastMessage />
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ToastMessage from '@/components/ToastMessage.vue';
export default defineComponent({

  name: 'App',
  components: {
    ToastMessage
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

body {
  margin: 0;
}
</style>