<template>
    <div class="skripte-view">
      <v-data-table :headers="stupci" :items="skripte" :loading="ucitavam">
        <template v-slot:[`item.akcije`]="{ item }">
          <v-btn small color="red" class="white--text" @click="deleteSkripta(item.id)">Izbriši</v-btn>
          <!-- Add a button or link for editing the script -->
          <v-btn small color="primary" class="white--text" :href="'/skripte/edit/' + item.id">Uredi</v-btn>
        </template>
      </v-data-table>
  
      <v-text-field v-model="forma.naziv" placeholder="Naziv"></v-text-field>
      <v-text-field v-model="forma.opis" placeholder="Opis"></v-text-field>
      <v-btn @click="dodajSkriptu">Dodaj skriptu</v-btn>
  
      <v-snackbar v-model="snackbar.model" right top :color="snackbar.color" timeout="1000">
        {{ snackbar.text }}
      </v-snackbar>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SkripteView',
    data() {
      return {
        snackbar: {
          model: false,
          color: '',
          text: ''
        },
        forma: {
          naziv: '',
          opis: ''
        },
        skripte: [],
        stupci: [
          { text: 'Naziv', value: 'naziv' },
          { text: 'Opis', value: 'opis' },
          { text: 'Akcije', value: 'akcije' }
        ],
        ucitavam: false
      };
    },
    created() {
      this.getDostupneSkripte();
    },
    methods: {
      getDostupneSkripte: function () {
        this.ucitavam = true;
  
        this.axios.get('http://localhost:8081/api/skripte/dohvati').then((response) => {
          this.skripte = response.data;
        }).catch(() => {
          this.snackbar.model = true;
          this.snackbar.color = 'red';
          this.snackbar.text = 'Greška pri dohvatu skripti.';
        }).finally(() => {
          this.ucitavam = false;
        });
      },
      dodajSkriptu: function () {
        this.axios.post('http://localhost:8081/api/skripte/dodaj', this.forma).then(() => {
          this.getDostupneSkripte();
          this.snackbar.color = 'green';
          this.snackbar.text = 'Uspješno dodana skripta.';
        }).catch(() => {
          this.snackbar.color = 'red';
          this.snackbar.text = 'Greška pri dodavanju skripte.';
        }).finally(() => {
          this.snackbar.model = true;
          this.ucitavam = false;
        });
      },
      deleteSkripta: function (id) {
        this.axios.get('http://localhost:8081/api/skripte/izbrisi/' + id).then(() => {
          this.getDostupneSkripte();
  
          this.snackbar.color = 'green';
          this.snackbar.text = 'Uspješno izbrisana skripta.';
        }).catch(() => {
          this.snackbar.color = 'red';
          this.snackbar.text = 'Greška pri brisanju skripte.';
        }).finally(() => {
          this.snackbar.model = true;
          this.ucitavam = false;
        });
      }
    }
  };
  </script>
  