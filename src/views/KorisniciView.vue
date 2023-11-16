<template>
    <div class="korisnik-view">
      <v-data-table :headers="stupci" :items="korisnici" :loading="ucitavam">
        <template v-slot:[`item.akcije`]="{ item }">
          <v-btn small color="red" class="white--text" @click="izbrisiKorisnik(item.id)">Izbriši</v-btn>
        </template>
      </v-data-table>
  
      <v-text-field v-model="forma.ime" placeholder="Ime"></v-text-field>
      <v-text-field v-model="forma.brindexa" placeholder="Broj indexa"></v-text-field>
      <v-btn @click="dodajKorisnik">Dodaj korisnika</v-btn>
  
      <v-snackbar v-model="snackbar.model" right top :color="snackbar.color" timeout="1000">
        {{ snackbar.text }}
      </v-snackbar>
    </div>
  </template>
  
  <script>
  export default {
    name: 'KorisnikView',
    data() {
      return {
        korisnici: [],
        ucitavam: false,
        forma: {
          ime: '',
          brindexa: ''
        },
        stupci: [
          { text: 'Ime', value: 'ime' },
          { text: 'Broj indexa', value: 'broj_indexa' },
          { text: 'Akcije', value: 'akcije' }
        ],
        snackbar: {
          model: false,
          color: '',
          text: ''
        }
      };
    },
    created() {
      this.dohvatiKorisnike();
    },
    methods: {
      dohvatiKorisnike: function () {
        this.ucitavam = true;
  
        this.axios.get('http://localhost:8081/api/korisnici/dohvati').then((response) => {
          this.korisnici = response.data;
        }).catch(() => {
          this.snackbar.model = true;
          this.snackbar.color = 'red';
          this.snackbar.text = 'Greška pri dohvatu korisnika.';
        }).finally(() => {
          this.ucitavam = false;
        });
      },
      dodajKorisnik: function () {
        this.axios.post('http://localhost:8081/api/korisnici/dodaj', this.forma).then(() => {
          this.dohvatiKorisnike();
          this.snackbar.color = 'green';
          this.snackbar.text = 'Uspješno dodan korisnik.';
        }).catch(() => {
          this.snackbar.color = 'red';
          this.snackbar.text = 'Greška pri dodavanju korisnika.';
        }).finally(() => {
          this.snackbar.model = true;
          this.ucitavam = false;
        });
      },
      izbrisiKorisnik: function (id) {
        this.axios.get('http://localhost:8081/api/korisnici/izbrisi/' + id).then(() => {
          this.dohvatiKorisnike();
  
          this.snackbar.color = 'green';
          this.snackbar.text = 'Uspješno izbrisan korisnik.';
        }).catch(() => {
          this.snackbar.color = 'red';
          this.snackbar.text = 'Greška pri brisanju korisnika.';
        }).finally(() => {
          this.snackbar.model = true;
          this.ucitavam = false;
        });
      }
    }
  };
  </script>
  