import { defineStore } from "pinia";
import axios from "axios";

interface IState {
  data: any;
}

export const useTransferStore = defineStore("transferStore", {
  state: (): IState => {
    return {
      data: {
        meetingPoint: {
          id: null,
          type: null,
          productId: null,
          storeType: null,
          places: [],
          polygon: null,
          destination: null,
          destinations: []
        },
        pickUpPoint: {
          id: null,
          type: "",
          productId: "",
          storeType: "",
          places: [],
          polygon: null,
          destination: null,
          destinations: []
        },
        transferAvailable: false
      }
    };
  },
  getters: {
    getTransferData(state) {
      return state.data;
    },
    isTransferAvailable(state) {
      return state.data.transferAvailable;
    }
  },
  actions: {
    async fetchData(productId) {
      try {
        const { data } = await axios.get(
          `${useRuntimeConfig().public.BASE_API_URL}/v1/marketplace/products/${productId}/transfers`
        );
        this.data = data;
      } catch (error) {
        console.log(error);
      }
    }
  }
});
