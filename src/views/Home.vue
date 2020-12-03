<template>
   <v-container>
      <Logged />
   </v-container>
</template>

<script>
import Logged from "@/components/Logged.vue";
import { io } from "socket.io-client";

export default {
   name: "Home",
   components: {
      Logged,
   },
   created() {
      window.socket = io(this.$store.state.fetch_url, {
         query: {
            admin: "kevinmnm",
         },
      });

      window.socket.on("online-admin", (data) => {
         this.$store.commit("NUMBER_CONNECTED_MUTATION", data.payload);
      });

      window.socket.on('user-update-current', data => {
         console.warn(data);
         this.$store.commit('ONLINE_USERS_LIST', data);
      });
   },
};
</script>
