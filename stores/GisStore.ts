import { defineStore } from "pinia";
// project imports
import { $api } from "~/composables/api";

export const useGisStore = defineStore("gisStore", {
  state: () => {
    return {
      productId: "",
      locale: "en",
      places: {
        id: null,
        coordinates: []
      },
      transferAvailability: {
        available: null,
        message: ""
      },
      autocomplete: {
        items: [],
        totalPages: 0,
        currentPage: 0,
        totalElements: 0
      }
    };
  },
  getters: {
    getId(state) {
      return state.places.id;
    },
    getState(state) {
      return state.places;
    },
    getCoordinates(state) {
      return state.places.coordinates;
    },
    getAutocompleteItems(state) {
      return state.autocomplete.items;
    },
    getTransferAvailability(state) {
      return state.transferAvailability.available;
    }
  },
  actions: {
    setProductId(id: string) {
      this.productId = id;
    },
    setId(id: string) {
      this.productId = id;
    },
    setLocale(locale: string) {
      this.locale = locale;
    },
    async fetchDestinationMap(id: string) {
      if (id == null) {
        console.log("It should be a new destination");
        return;
      }
      try {
        const data = await $api(`/v1/gis/destinations/${id}/map`);
        this.places = data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAutocomplete(query: string, locale: string) {
      try {
        if (query.trim() === "") {
          return;
        }
        const response = await $api(
          `/v1/gis/places/autocomplete?query=${query}&locale=${locale}`
        );

        this.autocomplete.items = response.items;
        this.autocomplete.totalPages = response.totalPages;
        this.autocomplete.currentPage = response.currentPage;
        this.autocomplete.totalElements = response.totalElements;
        console.log("autocoöpl", this.autocomplete);
      } catch (error) {
        console.log(error);
      }
    },
    async checkTransferAvailability(request: {
      productId: string | undefined;
      placeId: any;
    }) {
      this.transferAvailability.available = null;
      const data = await $api(
        `/v1/gis/products/${request.productId}/check-transfer-availability`,
        {
          method: "POST",
          body: request
        }
      );

      if (data && data.available !== null) {
        this.transferAvailability.available = data.available;
      }
      return data;
    }
  }
});
