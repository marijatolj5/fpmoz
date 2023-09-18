<template>
  <v-container class="pt-16">
    <v-row justify="space-around">
      <v-card width="1200">
        <v-img
          height="200px"
          contain
          src="https://api.itkarijera.ba/api/cms/documentfile/download/1138"
        >
          <v-app-bar flat color="rgba(0, 0, 0, 0)">
            <v-toolbar-title class="text-h6 indigo--text pl-0">
              FPMOZ stranica 
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn color="white" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>

          <v-card-title class="white--text mt-16">
            <v-avatar size="56">
              <img
                alt="logo"
                src="https://w7.pngwing.com/pngs/178/551/png-transparent-vue-js-javascript-framework-front-and-back-ends-github-technical-angle-text-triangle.png"
              />
            </v-avatar>
            <p class="ml-3 indigo--text">FPMOZ</p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">Timeline projekta</div>

          <v-timeline align-top dense>
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
              small
            >
              <div>
                <div>{{ message.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    messages: [
      {
        message: `Ova stranica je rezultat rada na kolegiju Informaticki projekt 2.
         Koristimo Hacker News up koji nam donosi vijesti.
         Vijesti mogu da se filtriraju po tipu i datumu.`,
      },
      {
        message: `Imamo funkciju pretrazivanje, kako bi nam olaksalo pregledavanje vijesti.`,
      },
          {
        message: `Imamo CRUD operacije za korisnika, mogućnost dodavanja novog korisnika. 
        Takoder mozemo raditi izmjene korisnika i brisanje.`,
      },
    ],
    }),
    };    
</script>

<style>
</style>