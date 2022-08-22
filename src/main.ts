import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import NodeWrap from "@/components/nodeWrap.vue";

const app = createApp(App);
app.component("NodeWrap", NodeWrap);
app.use(router);
app.use(Antd);
app.use(store);
app.directive("focus", {
  mounted(el, binding, vnode, prevVnode) {
    el.focus();
  },
});
app.mount("#app");
