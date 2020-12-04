<template>
   <v-container>
      <v-row>
         <v-col cols="12">
            <h2 class="text-center" key='1'>TOTAL: {{ all_user.length }}</h2>
            <v-expansion-panels>
               <v-expansion-panel v-for="(user, ind) in all_user" :key="user + ind">
                  <v-expansion-panel-header>
                     <v-col cols="7" class="font-weight-bold" style="font-size: 20px;">{{ (user.firstName + ' ' + user.lastName).toUpperCase() }}</v-col>
                     <v-col cols="5" style="font-size:15px;">{{ user.username }}</v-col>
                  </v-expansion-panel-header>
                     <v-expansion-panel-content>
                        <v-expansion-panels>
                           <v-expansion-panel v-for="(dates, ind) in Object.keys(user.activity)" :key="dates + ind">
                              <v-expansion-panel-header>{{dates}}</v-expansion-panel-header>
                                 <v-expansion-panel-content>
                                       <!-- <v-col cols="12" class="yellow d-flex flex-row">
                                          <v-col cols='6' class="red d-flex flex-column pa-0 ma-0" >
                                             <v-card 
                                                v-for="times in Object.keys(user.activity[dates][0])" 
                                                :key="times"
                                             >
                                                <v-col cols='12'>{{times}}</v-col>
                                             </v-card>
                                          </v-col>
                                          <v-col cols='6' class="red d-flex flex-column pa-0 ma-0">
                                             <v-card 
                                                v-for="(act, ind) in Object.values(user.activity[dates][0])" 
                                                :key="act+ind"
                                             >
                                                <v-col cols='12'>{{act}}</v-col>
                                             </v-card>
                                          </v-col>
                                       </v-col> -->
                                       <v-col cols="12" class="d-flex flex-column pa-0" v-for="(all, ind) in Object.entries(user.activity[dates][0])" :key="all+ind">
                                          <v-sheet class="d-flex flex-row ma-0" outlined width="100%">
                                             <v-col cols="6" align-self="center">{{ all[0] }}</v-col>
                                             <v-col cols="6" style="border-left:1px solid lightGrey;">{{ all[1] }}</v-col>
                                          </v-sheet>
                                       </v-col>
                                 </v-expansion-panel-content>
                           </v-expansion-panel>
                        </v-expansion-panels>
                     </v-expansion-panel-content>
               </v-expansion-panel>
            </v-expansion-panels>
         </v-col>
      </v-row>
   </v-container>
</template>

<script>
export default {
   name: "staticComp",
   data(){
      return{
         all_user_dates: [],
         all_user_time: null
      }
   },
   computed: {
      fetch_url(){
         return this.$store.state.fetch_url
      },
      all_user(){
         return this.$store.state.all_data.all_tracker
      }

      // all_user_dates(){
      //    let a;
      //    this.all_user.forEach( ac => {
      //          // console.warn(Object.keys(ac.activity));
      //          a = Object.keys(ac.activity);
      //       })
      //    return a;
      // }
      // date_today(){
      //    return new Date().toLocaleDateString('en-US');
      // }
   },
   created(){
      this.$store.dispatch('fetchAllData', this.fetch_url + '/data');
   },
   watch: {
      all_user(val) {
         val.forEach( ac => {
            this.all_user_dates.push(Object.keys(ac.activity));
         });
      },
      // all_user_dates(val) {
      //    this.all_user.map( ea => {
      //       console.warn(Object.keys(ea.activity));
      //    })
      // }
   }
};
</script>
