import { defineStore } from "pinia";
// project imports
import { $api } from "~/composables/api";

// API isteklerini yönetmek için yeniden kullanılabilir fonksiyonlar
async function fetchApi(url: string, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  // eslint-disable-next-line no-return-await
  return await $api(`${url}${queryString ? `?${queryString}` : ""}`);
}

// Hataları yönetmek için ortak bir fonksiyon
function handleError(exception: any) {
  console.error(exception);
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found"
  });
}

export const useAvailabilityStore = defineStore({
  id: "availabilityStore",
  state: () => ({
    paxDetails: [],
    dailySessions: new Map(),
    availablePackages: [],
    activityDate: new Date(),
    paxCounts: {
      PERSON: 0,
      ADULT: 0,
      CHILD: 0,
      INFANT: 0
    }
  }),
  getters: {
    getPaxDetails: (state) => state.paxDetails,
    getDailySessions: (state) => state.dailySessions,
    getAvaliablePackage: (state) => state.availablePackages
  },
  actions: {
    mapResponse(response: any) {
      const mapped = new Map();
      if (response.success && response.days) {
        Object.entries(response.days).forEach(([date, data]) => {
          const sessions = data.sessions.map(
            ({
              startTime,
              endTime,
              adultQuota,
              childQuota,
              infantQuota,
              quotaId,
              productId,
              packageId,
              salePrice
            }) => ({
              startTime,
              endTime,
              adultQuota,
              childQuota,
              infantQuota,
              quotaId,
              productId,
              packageId,
              salePrice
            })
          );
          // Date anahtarına göre yeni Map'e session verilerini ekle
          mapped.set(date, sessions);
        });
      }
      return mapped;
    },
    async fetchAvailabilityForm(productId, locale) {
      try {
        const response = await fetchApi(
          `/v1/products/${productId}/availability-form`,
          { lang: locale }
        );
        this.paxDetails = response.paxDetails;
        this.paxDetails.forEach((pax) => {
          if (pax.type === "PERSON") {
            this.paxCounts.PERSON = 1;
          } else if (pax.type === "ADULT") {
            this.paxCounts.ADULT = 1;
          }
        });
        console.log(this.paxDetails, "paxDetails");
      } catch (exception) {
        handleError(exception);
      }
    },
    async fetchAvailablePackages(
      productId,
      activityDate,
      paxCounts,
      locale,
      currency
    ) {
      try {
        const params = new URLSearchParams({
          "activity-date": activityDate,
          lang: locale,
          currency
        });

        Object.entries(paxCounts).forEach(([key, value]) => {
          if (value > 0) {
            const paramKey = `${key.toLowerCase()}-count`;
            params.append(paramKey, value.toString());
          }
        });

        const response = await fetchApi(
          `/v1/products/${productId}/available-packages`,
          params
        );
        this.availablePackages = response;
      } catch (exception) {
        handleError(exception);
      }
    },
    async fetchAvailabilityCalendar(
      productId,
      startDate,
      endDate,
      locale,
      curr
    ) {
      try {
        const response = await fetchApi(
          `/v1/products/${productId}/availability-calendar`,
          {
            lang: locale,
            currency: curr,
            "start-date": startDate,
            "end-date": endDate,
            "show-price": true
          }
        );
        const newSessions = this.mapResponse(response);

        // Eğer dailySessions daha önce tanımlanmamışsa, doğrudan yeni Map'i ata
        if (!this.dailySessions) {
          this.dailySessions = newSessions;
        } else {
          // Mevcut ve yeni gelen verileri birleştir
          newSessions.forEach((sessions, date) => {
            if (this.dailySessions.has(date)) {
              // Var olan tarih için, mevcut oturumlarla yeni oturumları birleştir
              // Bu örnekte, sadece yeni oturumları ekliyoruz. Ancak, daha karmaşık bir birleştirme mantığı da uygulanabilir.
              const currentSessions = this.dailySessions.get(date);
              const updatedSessions = [...currentSessions, ...sessions];
              this.dailySessions.set(date, updatedSessions);
            } else {
              // Yeni tarihse, Map'e ekle
              this.dailySessions.set(date, sessions);
            }
          });
        }

        // Vue ya da Pinia'nın reaktif sistemini tetiklemek için, Map'i yeniden atayabilirsiniz.
        // Bu, özellikle Vue 3 ile birlikte kullanıyorsanız gerekli olabilir.
        this.dailySessions = new Map(this.dailySessions);
      } catch (exception) {
        handleError(exception);
      }
    }
  }
});
