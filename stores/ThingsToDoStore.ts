import { defineStore } from "pinia";
// project imports
import { $api } from "~/composables/api";
import { IThingsToDoResponse } from "~/types/thingsToDo";

export const useThingsToDoStore = defineStore({
  id: "thingsToDoStore",
  state: (): IThingsToDoResponse => ({
    thingsToDo: []
  }),
  getters: {
    getThingsToDo: (state) => state.thingsToDo
  },
  actions: {
    async fetchThingsToDo(id: string, locale: string) {
      try {
        const queryString = new URLSearchParams({ lang: locale }).toString();
        const data = await $api(
          `/v1/websites/${id}/things-to-do${queryString ? `?${queryString}` : ""}`
        );
        this.thingsToDo = data.thingsToDo;
      } catch (exception) {
        console.log(exception);
      }
    }
  }
});
