<template>
  <div class="news">
    
    <v-text-field
      solo
      placeholder="Pretrazi vesti po nazivu"
      v-model="query"
      @input="applyFilters"
    ></v-text-field>
    <div class="calendar-wrapper">
      <div class="calendar-toolbar-wrapper">
  <v-toolbar-title>Pocetni dan</v-toolbar-title>
    <v-date-picker
      v-model="startDate"
      @change="applyFilters"
      class="mr-2"
    ></v-date-picker>
    </div>
          <div class="calendar-toolbar-wrapper">

     <v-toolbar-title>Zavrsni dan</v-toolbar-title>
    <v-date-picker v-model="endDate" @change="applyFilters"></v-date-picker>
          </div>
    </div>
    <v-card class="mx-auto mt-2" width="885">
      <div v-for="item in paginatedNews" :key="item.id">
        <v-list-item
          link
          two-line
          :href="item.url"
          target="_blank"
          :key="item.id"
        >
          <v-list-item-content>
            <v-list-item-title>
              <span v-if="item.url">
                <a :href="item.url" target="_blank" rel="noopener">
                  {{ item.title }}
                </a>
              </span>
            </v-list-item-title>

            <v-list-item-subtitle
              >Kreirano
              {{
                new Date(item.time * 1000).toLocaleDateString()
              }}</v-list-item-subtitle
            >
            <v-list-item-subtitle>
              <span v-if="item.by">Kreirao {{ item.by }} </span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <span v-if="item.by">tip {{ item.type }} </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-card>

    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      @input="changePage"
      class="mt-8"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getFilteredNews"]),
    paginatedNews() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.news = this.getFilteredNews.slice(startIndex, endIndex);
      console.log(this.news)
      return this.news;
    },
    totalPages() {
      return Math.ceil(this.getFilteredNews.length / this.pageSize);
    },
  },
  data() {
    return {
      query: "",
      startDate: "",
      endDate: "",
      currentPage: 1,
      pageSize: 5,
    };
  },
  methods: {
    ...mapActions(["fetchNews"]),
    applyFilters() {
      this.currentPage = 1;
      const startDate = this.startDate ? new Date(this.startDate) : null;
      const endDate = this.endDate ? new Date(this.endDate) : null;
      this.$store.commit("filterNews", {
        query: this.query,
        startDate,
        endDate,
      });
    },

    changePage(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    this.fetchNews();
  },
};
</script>
<style>
.news {
  padding-top: 50px;
}
.calendar-wrapper{
  display: flex;
  justify-content: center;
}
.calendar-toolbar-wrapper{
  display: grid;
}
  @media screen and (max-width:900px) {
         .calendar-wrapper{
          flex-direction: column;
         }
  }
</style>
