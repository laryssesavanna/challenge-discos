<template>
  <div>
    <label class="view" for="nome">Nome da coleção: </label>
    {{collection.name}}<br/>
    <label for="descricao">Descrição: </label>
    {{collection.description}}<br/>
    <p>
      <label for="descricao">Adicione um novo disco: </label>
      <select v-model="selectedDisc">
        <option value="" disabled selected>Escolha um disco</option>
        <option v-for="item in allDiscList" :key="item.idDisc" :value="item.idDisc">
          {{item.title}}</option>
      </select>
      <button type="button" @click="addDiscInColl(selectedDisc)">Adicionar</button>
    </p>
    <h2>Discos desta coleção: </h2>
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
          <tr v-for="item in discList" :key="item.idDisc">
              <td>{{ item.title }}</td>
              <td>{{ item.artist_name }}</td>
              <td>{{ item.genre }}</td>
              <td>{{ item.year }}</td>
              <td>
                  <button type="button" @click="removeDiscFromColl(item.idDisc)">
                    Remover da coleção</button>
              </td>
          </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td>Esta coleção ainda não possui discos.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CollectionService from '../../api/collection-service';
import DiscService from '../../api/disc-service';

export default {
  data() {
    return {
      collection: {
        idCollection: '',
        name: '',
        description: '',
      },
      discList: [],
      allDiscList: [],
      selectedDisc: '',
    };
  },
  props: {
    idColl: {
      type: String,
      required: false,
    },
  },
  methods: {
    async getCollection() {
      const id = this.idColl;
      const response = await CollectionService.findCollection(id);
      const pos = { media: 0 };
      this.collection = response.data.data[pos.media];
    },
    async getAllDiscFromColl() {
      const id = this.idColl;
      const response = await CollectionService.listAllDiscsFromColl(id);
      this.discList = response.data.data;
    },
    async getAllDiscsFromDB() {
      const response = await DiscService.listAllDiscs();
      this.allDiscList = response.data.data;
    },
    async removeDiscFromColl(idDisco) {
      const idCollec = this.idColl;
      await CollectionService.deleteDiscFromCollection(idDisco, idCollec);
      this.getAllDiscFromColl();
    },
    async addDiscInColl(idDisco) {
      const idCollec = this.idColl;
      await CollectionService.insertDiscInCollection(idDisco, idCollec);
      this.getAllDiscFromColl();
    },
  },
  created() {
    this.getCollection();
    this.getAllDiscFromColl();
    this.getAllDiscsFromDB();
  },
};
</script>
