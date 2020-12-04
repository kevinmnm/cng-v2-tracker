<template>
   <v-container>
      <v-row>
         <v-col cols="12" class="d-flex flex-row">
            <v-col cols="6">
               <v-btn width="100%" @click="current = false" :class="{ primary: !current }"
                  >all</v-btn
               >
            </v-col>
            <v-col cols="6">
               <v-btn width="100%" @click="current = true" :class="{ primary: current }"
                  >current</v-btn
               >
            </v-col>
         </v-col>

         <Static v-if="!current" />
         <Current v-if="current" />

         <!-- <keep-alive>
         <component :is="test"></component>
         </keep-alive> -->
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
   data() {
      return {
         current: false,
         // test: 'Current'
      };
   },
   computed: {
      online_users_list() {
         return this.$store.state.online_users_list;
      },
      dynamic_key() {
         return this.$store.state.dynamic_key;
      },
   },
};
</script>
