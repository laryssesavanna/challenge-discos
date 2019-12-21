<template>
  <nav class="menu-lateral">
    <h1>Menu</h1>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        Discos
        <ul>
          <li>
            <router-link to="/disc/create">Cadastrar Disco</router-link>
          </li>
          <li>
            <router-link to="/disc/list">Listar Discos</router-link>
          </li>
        </ul>
      </li>
      <li>Coleções
        <ul>
          <li>
            <router-link to="/collection/create">Criar Coleções</router-link>
          </li>
          <li>
            <router-link to="/collection/list">Listar Coleções</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Menu',
};
</script>
