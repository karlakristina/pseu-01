<template>
    <div class="kategorije-skripti">
      <v-data-table :headers="stupci" :items="kategorijeSkripti" :loading="ucitavam">
        <template v-slot:[`item.akcije`]="{ item }">
          <v-btn small color="red" class="white--text" @click="izbrisiKategorijuSkripti(item.id)">Izbriši</v-btn>
        </template>
      </v-data-table>
  
      <v-text-field v-model="forma.naziv" placeholder="Naziv kategorije"></v-text-field>
      <v-btn @click="dodajKategorijuSkripti">Dodaj kategoriju</v-btn>
  
      <v-snackbar
        v-model="snackbar.model" right top
        :color="snackbar.color" timeout="1000"
      >
        {{ snackbar.text }}
      </v-snackbar>
    </div>
  </template>
  
  <script>
  export default {
    name: 'KategorijeSkriptiView',
    data() {
      return {
        kategorijeSkripti: [],
        ucitavam: false,
        forma: {
          naziv: ''
        },
        stupci: [
          { text: 'Naziv kategorije', value: 'naziv' },
          { text: 'Akcije', value: 'akcije' }
        ],
        snackbar: {
          model: false,
          color: '',
          text: ''
        }
      }
    },
    created() {
      this.dohvatiKategorijeSkripti();
    },
    methods: {
      dohvatiKategorijeSkripti: function() {
        this.ucitavam = true;
  
        this.axios
          .get('http://localhost:8081/api/kategorije-skripti/dohvati')
          .then((response) => {
            this.kategorijeSkripti = response.data;
          })
          .catch(() => {
            this.showSnackbar('red', 'Greška pri dohvatu kategorija skripti.');
          })
          .finally(() => {
            this.ucitavam = false;
          });
      },
      dodajKategorijuSkripti: function() {
        this.axios
          .post('http://localhost:8081/api/kategorije-skripti/dodaj', this.forma)
          .then(() => {
            this.dohvatiKategorijeSkripti();
            this.showSnackbar('green', 'Uspješno dodana kategorija skripti.');
          })
          .catch(() => {
            this.showSnackbar('red', 'Greška pri dodavanju kategorije skripti.');
          })
          .finally(() => {
            this.ucitavam = false;
          });
      },
      izbrisiKategorijuSkripti: function(id) {
        this.axios
          .get('http://localhost:8081/api/kategorije-skripti/izbrisi/' + id)
          .then(() => {
            this.dohvatiKategorijeSkripti();
            this.showSnackbar('green', 'Uspješno izbrisana kategorija skripti.');
          })
          .catch(() => {
            this.showSnackbar('red', 'Greška pri brisanju kategorije skripti.');
          })
          .finally(() => {
            this.ucitavam = false;
          });
      },
      showSnackbar: function(color, text) {
        this.snackbar.model = true;
        this.snackbar.color = color;
        this.snackbar.text = text;
      }
    }
  };
  </script>
  