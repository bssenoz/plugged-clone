import { defineStore } from "pinia";
// project imports
import { $api } from "~/composables/api";
import { IPaymentStatusResponse, PaymentStatusEnum } from "~/types/order";
import { CHECKOUT_SUCCESS_URL } from "~/constants";
import { SnackbarType } from "~/types/common";

interface IState {
  orderId: string;
  paymentId: string;
  paymentStatus: IPaymentStatusResponse | null;
  showCreditCardForm: boolean;
  snackbar: SnackbarType;
}

export const useOrderStoreBackUp = defineStore("order", {
  state: (): IState => {
    return {
      paymentId: "",
      orderId: "",
      paymentStatus: null,
      showCreditCardForm: false,
      snackbar: {
        show: false,
        message: "",
        type: "success"
      }
    };
  },
  getters: {
    isCreditCardVisible(state) {
      return state.showCreditCardForm;
    },
    getSnackbar: (state) => state.snackbar
  },
  actions: {
    setOrderId(orderId: string) {
      this.orderId = orderId;
    },
    setPaymentId(paymentId: string) {
      this.paymentId = paymentId;
    },
    async fetchPaymentStatus(paymentId: string) {
      if (!paymentId) {
        this.showCreditCardForm = true;
        return;
      }
      try {
        const router = useRouter();

        const data = await $api(`/v1/payments/${paymentId}/status`);
        this.paymentStatus = data;
        if (data.status === PaymentStatusEnum.PAID) {
          await router.push(
            CHECKOUT_SUCCESS_URL.replace("{orderId}", data.orderId)
          );
        }
        this.showCreditCardForm = data.status !== PaymentStatusEnum.PAID;
        if (data.status === PaymentStatusEnum.ERROR) {
          this.showSnackbar(
            `${data?.errorMessage} ${data?.errorCode}`,
            "error"
          );
        }
      } catch (exception) {
        throw createError({
          statusCode: 404,
          statusMessage: "Page Not Found"
        });
      }
    },
    showSnackbar(message: string, type: "success" | "error" = "success") {
      this.snackbar.show = true;
      this.snackbar.message = message;
      this.snackbar.type = type;
    },
    closeSnackbar() {
      this.snackbar.show = false;
      this.snackbar.message = "";
    }
  }
});
