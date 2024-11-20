import { defineStore } from "pinia";
// project imports
import { $api } from "~/composables/api";
import {
  IProductDetailedCardListResponse,
  IProductDetailResponse
} from "~/types/product";

interface IState {
  list: IProductDetailedCardListResponse;
  detail: IProductDetailResponse;
  multimedia: any;
}

export const useProductStore = defineStore({
  id: "productStore",
  state: (): IState => {
    return <IState>{
      list: {
        items: []
      },
      detail: {
        summary: "",
        fullDescription: "",
        mainImage: { sourceUrl: "" },
        highlights: [],
        inclusions: [],
        exclusions: [],
        WhatToBring: [],
        notAllowed: [],
        knowBeforeYoGo: "",
        destination: { name: "", url: "" },
        category: { name: "", url: "" },
        productType: "TOUR_OR_ACTIVITY",
        paymentOptions: [],
        transferInformation: {
          meetingPoint: null,
          pickUpPoint: null,
          dropOffPoint: null,
          transferAvailable: false
        }
      },
      multimedia: {}
    };
  },
  getters: {
    getProductPaymentOptions(state) {
      return state.detail.paymentOptions;
    },
    getProducts(state) {
      return state.list.items;
    },
    getProductDetail(state) {
      return state.detail;
    },
    getProductType(state) {
      return state.detail.productType;
    },
    getMultimedia(state) {
      return state.multimedia.items;
    },
    getProductId(state) {
      return state.detail?.id;
    },
    getTransferAvailable(state) {
      return state.detail.transferInformation.transferAvailable;
    }
  },
  actions: {
    async fetchProducts(locale: string) {
      try {
        const queryString = new URLSearchParams({ lang: locale }).toString();
        const data = await $api(
          `/v1/websites/products${queryString ? `?${queryString}` : ""}`
        );
        this.list.items = data.items;
      } catch (exception) {
        throw createError({
          statusCode: 404,
          statusMessage: "Page Not Found"
        });
      }
    },
    async fetchDetailById(id: string, locale: string) {
      try {
        if (id === undefined) {
          console.error("Product id is not defined");
          return;
        }
        const queryString = new URLSearchParams({ lang: locale }).toString();
        const data = await $api(
          `/v1/websites/products/${id}${queryString ? `?${queryString}` : ""}`
        );
        this.detail = data;
      } catch (exception) {
        throw createError({
          statusCode: 404,
          statusMessage: "Page Not Found"
        });
      }
    },
    async fetchCurrentProductMultimedia(locale: string, productId: string) {
      try {
        const queryString = new URLSearchParams({ lang: locale }).toString();
        const data = await $api(
          `/v1/websites/products/${productId}/multimedia?${queryString ? `?${queryString}` : ""}`
        );
        this.multimedia = data;
      } catch (exception) {
        throw createError({
          statusCode: 404,
          statusMessage: "Page Not Found"
        });
      }
    }
  }
});
