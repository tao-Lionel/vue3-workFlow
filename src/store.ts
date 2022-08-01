import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      tableId: 0 as number,
    };
  },
  mutations: {
    setTableId(state, tableId: number) {
      state.tableId = tableId;
    },
  },
  getters: {
    getTableId(state) {
      return state.tableId;
    },
  },
});

export default store;
