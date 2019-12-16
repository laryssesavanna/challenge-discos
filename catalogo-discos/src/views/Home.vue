<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Menu/>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/Menu.vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
    Menu,
  },
};
</script>
