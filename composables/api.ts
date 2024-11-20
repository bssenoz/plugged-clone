/* eslint-disable no-param-reassign */

export const $api = $fetch.create({
  // Request interceptor
  async onRequest({ options }) {
    // Set baseUrl for all API calls
    options.baseURL = useRuntimeConfig().public.BASE_API_URL || "/api";
    options.headers = {
      "Website-Id": useRuntimeConfig().public.WEBSITE_ID,
      "Main-Locale": useRuntimeConfig().public.MAIN_LANGUAGE
    };
  }
});

/* eslint-enable no-param-reassign */
