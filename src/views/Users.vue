<template>
  <v-container class="pt-16">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="indigo" dark v-bind="attrs" v-on="on">
            Dodaj korisnika
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Korisnik</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Ime*"
                    v-model="firstnameUser"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Prezime*"
                    v-model="lastnameUser"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    v-model="email"
                    type="email"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Kancelarija*"
                    v-model="office"
                    type="text"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Telefon*"
                    v-model="phone"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*Obavezno polje</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Zatvori
            </v-btn>
            <v-btn color="blue darken-1" text @click="submitUserData()">
              Sacuvaj
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-simple-table height="550px" class="indigo my-12">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left white--text">Ime i prezime</th>
            <th class="text-left white--text">Email</th>
            <th class="text-left white--text">Kancelarija</th>
            <th class="text-left white--text">Telefon</th>
            <th class="text-left white--text">Izmeni korisnika</th>
            <th class="text-left white--text">Obrisi korisnika</th>
          </tr>
        </thead>
        <thead>
          <tr v-for="item in users" :key="item.id">
            <td>{{ item.firstName }} {{ item.lastName }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.office }}</td>
            <td>{{ item.phone }}</td>
               <td>
              <v-btn color="indigo" @click="openModal(item)" depressed>
                <v-icon color="white" left> mdi-account-edit-outline </v-icon>
                <span class="white--text"> Izmeni</span>
              </v-btn>
            </td>
            <td>
              <v-btn color="indigo" @click="deleteUser(item.id)" depressed>
                <v-icon color="white" left> mdi-trash-can-outline </v-icon>
                <span class="white--text"> Obrisi</span>
              </v-btn>
            </td>
         
          </tr>
        </thead>
      </template>
    </v-simple-table>

    <edit-user
      :showing="editDialog"
      :editUserId="editUserId"
      @close="editDialog = false"
    ></edit-user>
  </v-container>
</template>

<script>
import EditUser from "@/components/EditUser.vue";
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    "edit-user": EditUser,
    // eslint-disable-next-line vue/no-unused-components
    user: [],
  },
  data() {
    return {
      users: [],
      dialog: false,
      firstnameUser: "",
      lastnameUser: "",
      email: "",
      office: "",
      phone: "",
      editUserId: null,
      editDialog: false,
    };
  },

  methods: {
    deleteUser(id) {
      this.$store.commit("deleteUser", id);
    },
    getContacts() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.users = this.$store.getters.userList;
      return this.users;
    },

    openModal(id) {
      this.editUserId = id;
      console.log(this.firstnameUser);
      this.editDialog = true;
    },

    submitUserData() {
      const user = {
        firstName: this.firstnameUser,
        lastName: this.lastnameUser,
        email: this.email,
        phone: this.phone,
        office: this.office,
      };
      if (
        this.firstName != "" &&
        this.lastName != "" &&
        this.email != "" &&
        this.phone != "" &&
        this.office != ""
      ) {
        this.$store.commit("addUser", user);
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.phone = "";
        this.office = "";
        this.getContacts();
        console.log(this.users);
        alert("Uspesno sacuvan korisnik");
        this.dialog = false;
      } else alert("Popuni sva polja!!");
    },
  },
  mounted() {
 this.getContacts()
  },
};
</script>

<style scoped>
tr,
th,
td {
  color: white;
}
tbody:hover {
  background: transparent;
}
</style>