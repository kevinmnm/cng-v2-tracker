<template>
   <v-container>
      <v-row>
         <v-col cols="12">
            <v-btn @click="current = true">current</v-btn>
            <v-btn @click="current = false">all</v-btn>
         </v-col>
         <Current v-if="current" :key="dynamic_key" />
         <Static v-else />
      </v-row>
   </v-container>
</template>

<script>
import Current from "@/components/current.vue";
import Static from "@/components/static.vue";

export default {
   name: "LoggedComp",
   components: {
      Current,
      Static,
   },
   data(){
      return{
         current: true,
         dynamic_key: 10
      }
   },
   computed: {
      online_users_list(){
         return this.$store.state.online_users_list;
      }
   },
   watch: {
      online_users_list() {
         this.dynamic_key++;
      }
   }
};
</script>
