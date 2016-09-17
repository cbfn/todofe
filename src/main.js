import Vue from 'vue';
import App from './App';
import VueSweetAlert from 'vue-sweetalert';
require('font-awesome/css/font-awesome.css');

// Added vue-resource for testing
Vue.use(require('vue-resource'));
Vue.use(VueSweetAlert);

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
});
