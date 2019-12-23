<template>
  <div>
    <h1>Listar Discos</h1>
    <p>
      <input type="text" v-model="search" placeholder="Buscar por título">
    </p>
    <p>
      <router-link to="/disc/create">
        <button type="button"> Cadastrar disco </button>
      </router-link>
    </p>
    <table>
      <thead v-if="discList.length > 0">
        <tr>
          <th>Título</th>
          <th>Artista</th>
          <th>Gênero</th>
          <th>Ano</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody v-if="discList.length > 0">
          <tr v-for="item in filteredData" :key="item.idDisc">
              <td>{{ item.title }}</td>
              <td>{{ item.artist_name }}</td>
              <td>{{ item.genre }}</td>
              <td>{{ item.year }}</td>
              <td>
                  <router-link :to="{ path: '/disc/edit/'+ item.idDisc }">
                    <button type="button"> Editar </button>
                  </router-link>
                  <button type="button" @click="removeDisc(item.idDisc)"> Remover </button>
              </td>
          </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td>Não há discos cadastrados.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import DiscService from '../../api/disc-service';

export default {
  data() {
    return {
      disc: {
        id: '',
        title: '',
        artist_name: '',
        genre: '',
        year: '',
      },
      discList: [],
      search: '',
    };
  },
  computed: {
    // Filtering data for dynamic search field
    filteredData() {
      return this.discList.filter(item => item.title.toLowerCase()
        .match(this.search.toLowerCase()));
    },
  },
  methods: {
    async listAll() {
      const response = await DiscService.listAllDiscs();
      this.discList = response.data.data;
    },
    async removeDisc(id) {
      await DiscService.deleteDisc(id);
      this.listAll();
    },
  },
  created() {
    this.listAll();
  },
};
</script>
