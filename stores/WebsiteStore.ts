import { defineStore } from "pinia";
// project imports
import { $api } from "~/composables/api";
import { IWebsiteResponse } from "~/types/common";

interface IState {
  websiteId: string;
  locale: string;
  website: IWebsiteResponse;
}

export const useWebsiteStore = defineStore({
  id: "websiteStore",
  state: (): IState => ({
    websiteId: "",
    locale: "",
    website: {
      id: "test",
      hreflangs: [],
      canonical: "",
      title: "",
      meta: [],
      httpStatus: 200,
      redirectUrl: "",
      titleTemplate: "",
      headerLogoUrl: "",
      faviconUrl: "",
      mainLanguage: "",
      mainCurrency: "",
      languages: [],
      currencies: []
    }
  }),
  getters: {
    getWebsiteId: (state) => state.websiteId,
    getWebsite: (state) => state.website
  },
  actions: {
    async fetchWebsite(locale: string) {
      try {
        const queryString = new URLSearchParams({ lang: locale }).toString();
        const data: IWebsiteResponse = await $api(
          `/v1/websites${queryString ? `?${queryString}` : ""}`
        );

        if (data.id != null) {
          this.websiteId = data.id;
        }
        this.website = data; // Bütün website objesini doğrudan ata
      } catch (exception) {
        throw createError({
          statusCode: 404,
          statusMessage: "Page Not Found"
        });
      }
    }
  }
});
