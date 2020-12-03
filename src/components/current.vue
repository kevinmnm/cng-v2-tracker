<template>
   <v-container>
      <v-row>
         <v-col cols="12">
            <h2>{{ numberConnected }}</h2>
            <v-expansion-panels>
               <v-expansion-panel v-for="(user, ind) in online_users_list" :key="user+ind">
                  <v-expansion-panel-header>{{ user.firstName + ' ' + user.lastName }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                     <v-col cols="12" class="d-flex flex-row pa-0">
                     <v-col cols="6" class="d-flex flex-column green pa-0 ma-0">
                        <v-col v-for="(time, ind) in Object.keys(user.activity[date_today][0])" :key="time+ind">
                           {{ time }}
                        </v-col>
                     </v-col>
                     <v-col cols="6" class="d-flex flex-column orange pa-0 ma-0">
                        <v-col v-for="(acti, ind) in Object.values(user.activity[date_today][0])" :key="acti+ind">
                           {{ acti }}
                        </v-col>
                     </v-col>
                     </v-col>
                  </v-expansion-panel-content>
               </v-expansion-panel>
            </v-expansion-panels>
         </v-col>
      </v-row>
      <pre>
         {{ JSON.stringify(online_users_list, null, 4) }}
         <!-- {{ JSON.stringify(online_users_list, null, 4) }} -->
         <!-- [ [{}], [{}] ] -->
      </pre>
   </v-container>
</template>

<script>
export default {
   name: "currentComp",
   computed: {
      online_users_list() {
         // payload.payload = { socketId: {}, socketId: {} }
         // return Object.values(this.$store.state.online_users_list);
         return this.$store.state.online_users_list;
      },
      // allConnected() {
      //    return this.$store.state.all_connected;
      // },
      numberConnected() {
         return this.$store.state.number_connected;
      },
      date_today() {
         return new Date().toLocaleDateString("en-US");
      },
   },
   watch: {
      online_users_list(){
         console.log(this.online_users_list);
      }
   }
};
</script>
