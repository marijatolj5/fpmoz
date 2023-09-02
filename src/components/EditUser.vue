<template>
  <v-container> 

      
      <v-row justify="center">
      <v-dialog v-model="showing" persistent max-width="600px">
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
                    v-model="editUserId.firstName"
                    ref="firstName"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Prezime*"
                    v-model="editUserId.lastName"
                    ref="lastName"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    v-model="editUserId.email"
                    ref="email"
                    type="email"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Kancelarija*"
                    ref="office"
                    v-model="editUserId.office"
                    type="text"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Telefon*"
                    ref="phone"
                    v-model="editUserId.phone"
                    type="text"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*Obavezna polja</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click.prevent="close" text>
              Zatvori
            </v-btn>
            <v-btn color="blue darken-1" text @click="editUser()">
              Sacuvaj
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    showing: {
      required: true,
      type: Boolean,
    },
    editUserId: {},
  },
  data(){
       return{
       }
  },
  methods:{
  
      editUser() {
      if (
        this.$refs.firstName.value != '' &&
        this.$refs.lastName.value != '' &&
        this.$refs.email.value != '' &&
        this.$refs.phone.value != '' &&
        this.$refs.office.value != ''
      ) {
        const user = {
          firstName: this.$refs?.firstName?.value,
          lastName: this.$refs.lastName.value,
          email: this.$refs.email.value,
          phone: this.$refs.phone.value,
          office: this.$refs.office.value,
        }
        this.$store.commit('editUser', user)
        alert('Uspeno izmenjen user')
      } else {
        alert('Polja nisu popunjena')
      }
    },
     close() {
      this.$emit('close')
    },
  }
};
</script>

<style>
</style>