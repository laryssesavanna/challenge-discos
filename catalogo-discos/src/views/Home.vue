<template>
  <div class="home">
    <HelloWorld msg="Bem vindo ao seu catálogo de discos!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>
