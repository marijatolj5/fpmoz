import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    query: "",
    filteredNews: [],
    usersList: [
      {
        id: 1,
        email: "mika@mikic.com",
        firstName: "Mika",
        lastName: "Mikic",
        office: "IT Company",
        phone: "00000000",
      },
      {
        id: 2,
        email: "pera@yahoo.com",
        firstName: "Pera",
        lastName: "Peric",
        office: "Tech",
        phone: "+11 123439853",
      },
      {
        id: 3,
        email: "mara@maric.com",
        firstName: "Mara",
        lastName: "Maric",
        office: "IT centar",
        phone: "+87533334",
      },
      {
        id: 4,
        email: "pera@gmail.com",
        firstName: "Pera",
        lastName: "Mikic",
        office: "Tech",
        phone: "349874879",
      },
    ],
  },
  mutations: {
    setNews(state, news) {
      state.news = news;
      state.filteredNews = news; // Initialize filtered news
    },
    filterNews(state, { query, startDate, endDate }) {
      state.filteredNews = state?.news?.filter((newsItem) => {
        const titleMatches = newsItem.title
          .toLowerCase()
          .includes(query.toLowerCase());

        // Filter by date range
        
        const newsDate = new Date(newsItem.time * 1000);
        const isWithinDateRange =
          (!startDate || newsDate >= startDate) &&
          (!endDate || newsDate <= endDate);

        return titleMatches && isWithinDateRange;
      });
    },
    deleteUser(state, id) {
      const index = state.usersList
        .map((x) => {
          return x.id;
        })
        .indexOf(id);
      state.usersList.splice(index, 1);
    },
    addUser(state, obj) {
      const contact = {
        id: Date.now(),
        ...obj,
      };
      state.usersList.push(contact);
    },

    editUser(state, item) {
      const items = state.usersList;
      var foundIndex = items.findIndex((x) => x.id == item.id);
      items[foundIndex] = item;
    },
  },
  actions: {

    async fetchNews({ commit }) {
      try {
        const response = await axios.get(
          "https://hacker-news.firebaseio.com/v0/topstories.json"
        );
        const newsIds = response.data;
    
        // Fetch news items and filter based on date
        const newsPromises = newsIds.map(async (id) => {
          const itemResponse = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          const itemData = itemResponse.data;
               
          // Filter by date (e.g., older than a week)
          const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
          if (itemData.time < oneWeekAgo) {
            return itemData;
          } else {
            return null; // Ignore items that are not older than a week
          }
        });
    
        const newsData = await Promise.all(newsPromises);
        const filteredNews = newsData?.filter((item) => item !== null); // Remove null entries
    
        commit("setNews", filteredNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    },
    
  },
  getters: {
    userList: (state) => {
      return state.usersList;
    },

    getFilteredNews(state) {
      return state.filteredNews;
    },
  },
});
