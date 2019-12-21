<template>
  <div id="app">
    <Menu></Menu>
    <nav class="caixa-2">
      <!-- Aqui tinham as <router-link to="/">Home</router-link> -->
      <Header></Header>
      <div class="conteudo">
        <div class="conteudo2">
          <router-view/>
        </div>
      </div>
      <Footer></Footer>
    </nav>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Menu from '@/components/Menu.vue';

export default {
  components: {
    Footer,
    Header,
    Menu,
  },
};
</script>

<style lang="scss">
@import 'assets/css/style.css';
/*
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}*/
</style>
