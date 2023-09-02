<template>
  <v-container>
    <v-row>
      <v-col align-self="center">
        <NewsList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "home",
  components: {
    NewsList: () => import("@/components/NewsList.vue"),
  },
};
</script>
