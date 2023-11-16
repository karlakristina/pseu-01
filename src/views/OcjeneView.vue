<template>
    <div class="ocjene-view">
      <v-data-table :headers="stupci" :items="ocjene" :loading="ucitavam">
        <template v-slot:[`item.korisnik.name`]="{ item }">
          <span>{{ item.korisnik.name }} {{ item.korisnik.surname }}</span>
        </template>
        <template v-slot:[`item.predmet.name`]="{ item }">
          <span>{{ item.predmet.name }}</span>
        </template>
        <template v-slot:[`item.akcije`]="{ item }">
          <v-btn color="red" class="white--text" small href="#" @click="deleteOcjena(item.id)">Izbriši</v-btn>
          <v-btn color="primary" class="white--text" small :href="'/ocjene/edit/' + item.id">Uredi</v-btn>
        </template>
      </v-data-table>
  
      <v-text-field v-model="forma.ocjena" placeholder="Unesi ocjenu" v-on:keyup.enter="addOcjena"></v-text-field>
      <v-autocomplete :items="korisnici" :item-text="item => item.name + ' ' + item.surname" item-value="id" v-model="forma.korisnik_id" placeholder="Izaberi korisnika"></v-autocomplete>
      <v-autocomplete :items="predmeti" :item-text="item => item.name" item-value="id" v-model="forma.predmet_id" placeholder="Izaberi predmet"></v-autocomplete>
  
      <v-btn @click="addOcjena">Dodaj ocjenu</v-btn>
  
      <v-snackbar v-model="snackbar.model" right top :color="snackbar.color" timeout="3000">
        {{ snackbar.text }}
      </v-snackbar>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OcjeneView',
    data() {
      return {
        snackbar: {
          model: false,
          color: '',
          text: ''
        },
        forma: {
          ocjena: '',
          korisnik_id: '',
          predmet_id: ''
        },
        ocjene: [],
        korisnici: [],
        predmeti: [],
        stupci: [
          { text: 'Ocjena', value: 'ocjena' },
          { text: 'Korisnik', value: 'korisnik.name' },
          { text: 'Predmet', value: 'predmet.name' },
          { text: 'Akcije', value: 'akcije' }
        ],
        ucitavam: false
      };
    },
    created() {
      this.getKorisnici();
      this.getPredmeti();
      this.getOcjene();
    },
    methods: {
      getOcjene() {
        this.ucitavam = true;
  
        this.axios.get("http://localhost:8081/api/ocjene/get").then((response) => {
          this.ocjene = response.data;
          this.ucitavam = false; // Set loading to false after data is loaded
        });
      },
      addOcjena() {
        // Validation logic can be added here
        this.ucitavam = true;
  
        this.axios.post("http://localhost:8081/api/ocjene/add", this.forma).then(() => {
          this.getOcjene(); // Refresh the list of ratings after adding
          this.snackbar.color = 'green';
          this.snackbar.text = 'Uspješno dodana ocjena.';
        }).catch(() => {
          this.snackbar.color = 'red';
          this.snackbar.text = 'Greška pri dodavanju ocjene.';
        }).finally(() => {
          this.snackbar.model = true;
          this.ucitavam = false;
        });
      }
    }
  };
  </script>
  