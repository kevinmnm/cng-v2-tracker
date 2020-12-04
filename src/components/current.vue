<template>
   <v-container>
      <v-row>
         <v-col cols="12">
            <h2 class="text-center">ONLINE: {{ numberConnected }}</h2>
            <v-expansion-panels>
               <v-expansion-panel v-for="(user, ind) in online_users_list" :key="user+ind">
                  <v-expansion-panel-header class="font-weight-bold">{{ (user.firstName + ' ' + user.lastName).toUpperCase() }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                     <!-- <v-col cols="12" class="d-flex flex-row pa-0">
                        <v-col cols="6" class="d-flex flex-column pa-0 ma-0">
                           <v-col style="border:1px solid grey;" align-self="center" v-for="(time, ind) in Object.keys(user.activity[date_today][0])" :key="time+ind+dynamic_key">
                              {{ time }}
                           </v-col>
                        </v-col>
                        <v-col cols="6" class="d-flex flex-column pa-0 ma-0">
                           <v-col style="border:1px solid grey;" align-self="center" :class="{'text-truncate': truncate}" @click="truncate = !truncate" v-for="(acti, ind) in Object.values(user.activity[date_today][0])" :key="acti+ind+dynamic_key">
                              {{ acti }}
                           </v-col>
                        </v-col>
                     </v-col> -->
                     <v-col cols="12" class="d-flex flex-column pa-0" v-for="(all, ind) in Object.entries(user.activity[date_today][0])" :key="all+ind+dynamic_key">
                        <v-sheet class="d-flex flex-row pa-0" :class="{'text-truncate': truncate}" @click="truncate = !truncate" outlined>
                           <v-col cols="6" align-self="center">{{ all[0] }}</v-col>
                           <v-col cols="6" style="border-left:1px solid lightGrey;">{{ all[1] }}</v-col>
                        </v-sheet>
                     </v-col>
                  </v-expansion-panel-content>
               </v-expansion-panel>
            </v-expansion-panels>
         </v-col>
      </v-row>
      <!-- <pre>
         {{ JSON.stringify(online_users_list, null, 4) }}
      </pre> -->
   </v-container>
</template>

<script>
export default {
   name: "currentComp",
   data(){
      return{
         truncate: true
      }
   },
   computed: {
      online_users_list() {
         // payload.payload = { socketId: {}, socketId: {} }
         // return Object.values(this.$store.state.online_users_list);
         return this.$store.state.online_users_list;
      },
      dynamic_key(){
         return this.$store.state.dynamic_key;
      },
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
   },
   mounted(){
      console.log(this.online_users_list);
   }
};
</script>
