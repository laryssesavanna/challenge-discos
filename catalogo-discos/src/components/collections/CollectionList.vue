<template>
  <div>
    <h1>Listar Coleções</h1>
    <p>
      <input type="text" v-model="search" placeholder="Buscar por nome">
    </p>
    <p>
      <router-link to="/collection/create">
        <button type="button"> Cadastrar coleção </button>
      </router-link>
    </p>
    <table>
      <thead v-if="collectionList.length > 0">
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody v-if="collectionList.length > 0">
          <tr v-for="item in filteredData" :key="item.idCollection">
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>
                <router-link :to="{ path: '/collection/view/'+ item.idCollection }">
                  <button type="button"> Visualizar </button>
                </router-link>
                  <button type="button" @click="removeColl(item.idCollection)"> Remover </button>
              </td>
          </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td>Não há coleções cadastradas.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CollectionService from '../../api/collection-service';

export default {
  data() {
    return {
      collection: {
        id: '',
        name: '',
        description: '',
      },
      collectionList: [],
      search: '',
    };
  },
  computed: {
    // Filtering data for dynamic search field
    filteredData() {
      return this.collectionList.filter(item => item.name.toLowerCase()
        .match(this.search.toLowerCase()));
    },
  },
  methods: {
    async listAll() {
      const response = await CollectionService.listAllCollections();
      console.log(response.data);
      this.collectionList = response.data.data;
    },
    async removeColl(id) {
      const response = await CollectionService.deleteCollection(id);
      console.log(response.data);
      this.listAll();
    },
  },
  created() {
    this.listAll();
  },
};
</script>
