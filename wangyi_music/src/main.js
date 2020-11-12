import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import {NavBar} from 'vant'
import { Col, Row } from 'vant';
import { Icon } from 'vant';
import { Search } from 'vant';
import { Tab, Tabs } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import { Grid, GridItem } from 'vant';
import { Image as VanImage } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { List } from 'vant';
import { Form } from 'vant';
import { Field } from 'vant';
import { Button } from 'vant';
import { Divider } from 'vant';
import { Card } from 'vant';
import { Popup } from 'vant';
import { Sticky } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { NoticeBar } from 'vant';
import { Progress } from 'vant';
import moment from 'moment';
import '@/plugins/GlobalComps'
import { Checkbox, CheckboxGroup } from 'vant';
import { PullRefresh } from 'vant';
import store from './store/index';
import { NumberKeyboard } from 'vant';
import { Overlay } from 'vant';
import { ShareSheet } from 'vant';




import './assets/iconfont/iconfont.css'

Vue.use(NumberKeyboard);
Vue.use(PullRefresh);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Divider);
Vue.use(Button);
Vue.use(Field);
Vue.use(Form);
Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Col);
Vue.use(Row);
Vue.use(NavBar);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(List);
Vue.use(Card);
Vue.use(Popup);
Vue.use(Sticky);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(NoticeBar);
Vue.use(Progress);
Vue.use(Overlay);
Vue.use(ShareSheet);

axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.prototype.moment = moment;
Vue.prototype.axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')