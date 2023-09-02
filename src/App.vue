<template>
<v-app>
  <NavBar></NavBar>
  <v-main>
      <router-view />
  </v-main>
  <Footer></Footer>
</v-app>
</template>
<script>
import NavBar from "@/components/nav/nav"
import Footer from "@/components/footer/footer"
export default {
  components:{
    Footer,
    NavBar
  },
};
</script>