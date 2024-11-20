import { defineStore } from "pinia";

export const useCountryStore = defineStore({
  id: "countryStore",

  state: () => ({
    countries: []
  }),

  getters: {
    getCountryName() {
      return this.countries.map((item) => item.name);
    },
    getPhoneCode() {
      return this.countries.map((item) => item.phoneCode);
    },
    getAlpha3Code() {
      return this.countries.map((item) => item.alpha3Code);
    },
    getAlpha2Code() {
      return this.countries.map((item) => item.alpha2Code);
    },
    getCountries() {
      return this.countries;
    }
  },

  actions: {
    async fetchCountry() {
      try {
        const response = await fetch(
          `https://api.rezervasyonyapp.com/v1/countries`
        ).then((res) => res.json());
        this.countries = response.items;
      } catch (error) {
        // eslint-disable-next-line no-underscore-dangle
        this._handleError("Fetching tour list failed.", error);
      }
    },

    clearError() {
      this.error = null;
    },

    // eslint-disable-next-line no-underscore-dangle
    _handleError(customMessage: string, error: any) {
      this.error =
        customMessage +
        (error.message
          ? ` Reason: ${error.message}`
          : " An unknown error occurred.");
      console.error(this.error);
    }
  }
});
