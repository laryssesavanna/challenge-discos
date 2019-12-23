<template>
  <div>
    <h1>Cadastrar Coleção</h1>
    <form>
      <div>
        <label for="collNome">Nome: </label>
        <input v-model="collection.name" type="text" name="collNome" />
      </div>
      <br />
      <div>
        <label for="collDescricao">Descrição: </label>
        <input v-model="collection.description" type="text" name="collDescricao" />
      </div>
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
      const resp = await CollectionService.createCollection(obj);

      if (resp.data.status === 'Success') {
        // eslint-disable-next-line no-alert
        alert('Operação realizada com sucesso.');
      }
      this.$router.push('/collection/list');
    },
  },
};
</script>
