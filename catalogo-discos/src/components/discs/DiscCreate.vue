<template>
  <div>
    <h1>Cadastrar Disco</h1>
    <form>
      <label for="discTitle">Título do Disco:</label>
      <input v-model="disc.title" type="text" name="discTitle" />
      <br />
      <label for="discArtist">Nome do Artista:</label>
      <input v-model="disc.artist_name" type="text" name="discArtist" />
      <br />
      <label for="discGenre">Gênero:</label>
      <input v-model="disc.genre" type="text" placeholder="Ex.: Rock"
      name="discGenre" />
      <br />
      <label for="discYear">Ano de Lançamento:</label>
      <input v-model="disc.year" type="text" placeholder="YYYY-MM-DD"
      name="discYear" />
      <br />
      <div>
        <button type="button" @click="saveDisc()">Salvar Disco</button>
      </div>
    </form>
  </div>
</template>

<script>

import DiscService from '../../api/disc-service';

export default {
  data() {
    return {
      disc: {
        title: '',
        artist_name: '',
        genre: '',
        year: '',
      },
    };
  },
  props: {
    idDisc: {
      type: String,
      required: false,
    },
  },
  methods: {
    async saveDisc() {
      const obj = this.disc;
      if (this.idDisc) {
        const id = this.idDisc;
        await DiscService.editDisc(id, obj);
      } else {
        await DiscService.createDisc(obj);
      }
    },
    async loadEditDisc() {
      const id = this.idDisc;
      const pos = { media: 0 };
      const response = await DiscService.findDisc(id);
      this.disc = response.data.data[pos.media];
    },
  },
  created() {
    if (this.idDisc) {
      this.loadEditDisc();
    }
  },
};
</script>
