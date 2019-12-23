<template>
  <div>
    <h1>Cadastrar Disco</h1>
    <form>
      <div class="success_msg"><p>{{ this.message }}</p></div>
      <div>
        <label for="discTitle">Título do Disco: </label>
        <input v-model="disc.title" type="text" name="discTitle" required/>
      </div>
      <br />
      <div>
        <label for="discArtist">Nome do Artista: </label>
        <input v-model="disc.artist_name" type="text" name="discArtist" required/>
      </div>
      <br />
      <div>
        <label for="discGenre">Gênero: </label>
        <input v-model="disc.genre" type="text" placeholder="Ex.: Rock"
        name="discGenre" required/>
      </div>
      <br />
      <div>
        <label for="discYear">Ano de Lançamento: </label>
        <input v-model="disc.year" type="number" placeholder="Ex.: 2015" name="discYear" required/>
      </div>
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
      message: '',
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
      let resp = null;
      // In case this is an update request
      if (this.idDisc) {
        const id = this.idDisc;
        resp = await DiscService.editDisc(id, obj);
      } else {
        resp = await DiscService.createDisc(obj);
      }
      // If everything is ok, tell user.
      if (resp.data.status === 'Success') {
        // eslint-disable-next-line no-alert
        alert('Operação realizada com sucesso.');
      }
      // Redirect to list disc page
      this.$router.push('/disc/list');
    },
    // In case this is an update request
    async loadEditDisc() {
      const id = this.idDisc;
      // Array position (vue doesn't allow us to set the position directly)
      const pos = { media: 0 };
      const response = await DiscService.findDisc(id);
      this.disc = response.data.data[pos.media];
    },
  },
  created() {
    // In case this is an update request
    if (this.idDisc) {
      this.loadEditDisc();
    }
  },
};
</script>
