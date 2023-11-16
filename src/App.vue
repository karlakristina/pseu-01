<template>
  <v-app id="inspire">
      <v-app-bar
              app
              style="background-color: #A1887F"
              flat
      >
          <v-container class="py-0 fill-height">

              <v-avatar
                      class="mr-10"
                      size="32"
              >
                  <v-img src="https://cdn2.iconfinder.com/data/icons/maps-and-locations/12/school-512.png"></v-img>
              </v-avatar>
              <h3>Aplikacija za razmjenjivanje studentskih skripti</h3>

          </v-container>
      </v-app-bar>

      <v-main>
          <v-img src = "https://www.snexplores.org/wp-content/uploads/2019/11/860_main_library_bacteria.png">
          <v-container>
              <v-row>
                  <v-col cols="2">
                      <v-sheet rounded="lg" style="background-color: #A1887F">
                          <v-list color="transparent">
                              <v-list-item
                                  v-for="link in links"
                                  :key="link.route"
                                  :to="link.route"
                                  text
                              >
                                  <v-list-item-content>
                                      <v-list-item-title>
                                          {{ link.text }}
                                      </v-list-item-title>
                                  </v-list-item-content>
                              </v-list-item>

                          </v-list>
                      </v-sheet>
                  </v-col>

                  <v-col>
                      <v-sheet
                              min-height="70vh"
                              rounded="lg"
                              style="background-color: #A1887F"
                      >
                          <router-view/>
                      </v-sheet>
                  </v-col>
              </v-row>
          </v-container>
          </v-img>
      </v-main>
  </v-app>
</template>

<script>

export default {
  data: () => ({
      links: [
          {
              text: "Korisnici",
              route: "/korisnici",
          },
          {
              text: "Skripte",
              route: "/skripte",
          },
          {
              text: "Ocjene",
              route: "/ocjene",
          },
          {
              text: "KategorijeSkripti",
              route: "/kategorijeskripti",
          },
          
      ],
  }),
}
</script>