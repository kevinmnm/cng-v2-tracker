import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      fetch_url: "http://localhost:5555",
      number_connected: 0,
      online_users_list: [], // socket.id: trackerModel
      all_data: { // For static component.
         all_user: null,
         all_tracker: null
      }
   },
   mutations: {
      ALL_DATA_MUTATION(state, payload) { // For static component.
         state.all_data.all_user = payload.allUser;
         state.all_data.all_tracker = payload.allTracker;
      },
      NUMBER_CONNECTED_MUTATION(state, payload) {
         state.number_connected = payload;
      },
      ONLINE_USERS_LIST(state, payload) { // Current user list for current.vue component.
         if (payload.action === 'add') { // Initial online users rendering.
            payload.payload.forEach( pl => {
               state.online_users_list.push(Object.values(pl)[0]);
            });
         } else if (payload.action === 'update') { // When new user connects.
            console.warn(JSON.stringify(payload.payload, null, 3));
            let new_user_to_update = Object.values(payload.payload)[0];

            let already_online;

            state.online_users_list.forEach( el => {
               if (el._id === new_user_to_update._id) {
                  return already_online = true;
               }
            });

            // if (!state.online_users_list.includes(new_user_to_update)) {
            if (!already_online) { // If user is not currently online.
               state.online_users_list.push(new_user_to_update);
            } else { // If user is currently online.
               let replace_index = state.online_users_list.indexOf(new_user_to_update);
               state.online_users_list[replace_index] = new_user_to_update;
            }
         } else if (payload.action === 'delete') {
            let user_to_delete = Object.values(payload.payload)[0];
            let del_index = state.online_users_list.indexOf(user_to_delete);
            state.online_users_list.splice(del_index, 1);
         } else {
            alert('hmmmmm err?');
         }

         console.warn(payload);
         console.dir(state.online_users_list);
      }
   },
   actions: {
      fetchAllData({commit}, payload){ // For static component.
         fetch(payload).then( res => {
            res.json().then( datas => {
               commit('ALL_DATA_MUTATION', datas);
            });
         });
      },
      // allConnected({commit}, payload){
      //    commit('ALL_CONNECTED_MUTATION', payload);
      // }  
   },
   modules: {}
});




/**************************************/
/************  NOTES  *****************/
/** FOR current.vue COMPONENT ONLY! **/
/**
 * 
 * 
 * 
   When a custom event "user-update-current" triggers and "action" is "update" or "delete", below is the example data format we receive from the server. We will only receive ONE chunk of data. (Object)

{
  HIcXnFJx8FkFGjAWAAAJ: {
    _id: 5fc7d017cea6fa64f4b6c66e,
    firstName: 'alsdjf',
    lastName: 'asldkjf',
    username: '321321',
    activity: { '12/2/2020': [Array] },
    createdAt: 2020-12-02T17:34:57.129Z,
    updatedAt: 2020-12-03T00:00:34.539Z,
    __v: 0
  }
}
 * 
 *
 * 
 * 
 * 
 * 
 * 
 * 
 *
 *
   When "user-update-current" triggers and "action" is "add", we are getting initial online users list. Below is the example data format we'll receive from the server. (Array)

[
  {
    Ra6aPmkWSgNVQr59AAAD: {
      _id: 5fc5b094b87e504cf4bac2c9,
      firstName: 'first',
      lastName: 'last',
      username: '123123',
      activity: [Object],
      createdAt: 2020-12-01T02:55:21.967Z,
      updatedAt: 2020-12-02T23:36:53.264Z,
      __v: 0
    }
  },
  {
    HIcXnFJx8FkFGjAWAAAJ: {
      _id: 5fc7d017cea6fa64f4b6c66e,
      firstName: 'alsdjf',
      lastName: 'asldkjf',
      username: '321321',
      activity: [Object],
      createdAt: 2020-12-02T17:34:57.129Z,
      updatedAt: 2020-12-03T00:00:34.539Z,
      __v: 0
    }
  }
]
 * 
 *
 * 
 * 
 * 
 * 
 * 
 * 
 *
 *
   Final data should be converted to below format for CURRENT.VUE component to render. (state.online_users_list) (Array)

   [
   {
      _id: 5fc5b094b87e504cf4bac2c9,
      firstName: 'first',
      lastName: 'last',
      username: '123123',
      activity: [Object],
      createdAt: 2020-12-01T02:55:21.967Z,
      updatedAt: 2020-12-02T23:36:53.264Z,
      __v: 0
    },
    {
      _id: 5fc7d017cea6fa64f4b6c66e,
      firstName: 'alsdjf',
      lastName: 'asldkjf',
      username: '321321',
      activity: [Object],
      createdAt: 2020-12-02T17:34:57.129Z,
      updatedAt: 2020-12-03T00:00:34.539Z,
      __v: 0
    }
]
 **/
