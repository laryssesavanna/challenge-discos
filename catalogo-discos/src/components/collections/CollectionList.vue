<template>
  <div>
    <h1>Listar Coleções</h1>
    <p>
      <input type="text" v-model="search" placeholder="Buscar por nome">
    </p>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
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
