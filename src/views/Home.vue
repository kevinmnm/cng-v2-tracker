<template>
   <Current />
</template>

<script>
import Current from "@/components/current.vue";
import { io } from "socket.io-client";

export default {
   name: "Home",
   components: {
      Current,
   },
   mounted() {
      window.socket = io('http://localhost:5555/', {
         query: {
            test_query: 'test query'
         }
      });
   },
};
</script>
