<template>
  <div>
    <h1>Cadastrar Coleção</h1>
    <form>
      <label for="collNome">Nome: </label>
      <input v-model="collection.name" type="text" name="collNome" />
      <br />
      <label for="collDescricao">Descrição: </label>
      <input v-model="collection.description" type="text" name="collDescricao" />
      <br/>
      <div>
        <button type="button" @click="saveCollection()">Salvar Coleção</button>
      </div>
    </form>
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
    };
  },
  methods: {
    async saveCollection() {
      const obj = this.collection;
      await CollectionService.createCollection(obj);
    },
  },
};
</script>
