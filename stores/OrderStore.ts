import { defineStore } from "pinia";
import axios from "axios";
import {
  IUpdateOrderRequest,
  IOrderResponse,
  IOrderRequest,
  IPaymentRequest,
  IPaymentStatusResponse,
  PaymentStatusEnum
} from "~/types/order";
import { CHECKOUT_SUCCESS_URL } from "~/constants";

interface IState {
  orderId: string;
  order: IOrderResponse;
  paymentId: string;
  paymentStatus: IPaymentStatusResponse | null;
  showCreditCardForm: boolean;
  snackbar: {
    show: boolean;
    message: string;
    type: string;
  };
}

export const useOrderStore = defineStore("orderStore", {
  state: (): IState => {
    return {
      paymentId: "",
      orderId: "",
      paymentStatus: null,
      showCreditCardForm: false,
      order: {
        id: null,
        orderTrackId: null,
        contactPerson: {
          id: "",
          firstName: "",
          lastName: "",
          email: "",
          phoneCountryCode: "",
          phoneNumber: ""
        },
        items: [],
        orderCreatedAt: null,
        orderApprovedAt: null,
        additionalData: {},
        paymentOption: null
      },
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
    getOrder: (state) => state.order,
    getSnackbar: (state) => state.snackbar,
    getProductId: (state) => state?.order?.items[0].productId || null
  },
  actions: {
    setOrderId(orderId: string) {
      this.orderId = orderId;
    },
    setPaymentId(paymentId: string) {
      this.paymentId = paymentId;
    },
    async createOrder(orderRequest: IOrderRequest) {
      // eslint-disable-next-line no-useless-catch
      try {
        const { data } = await axios.post(
          `${useRuntimeConfig().public.BASE_API_URL}/v1/marketplace/orders`,
          orderRequest
        );
        return data;
      } catch (e) {
        throw e;
      }
    },
    async updateOrder(orderRequest: IUpdateOrderRequest) {
      // eslint-disable-next-line no-useless-catch
      try {
        const { data } = await axios.put(
          `${useRuntimeConfig().public.BASE_API_URL}/v1/marketplace/orders/${orderRequest.orderId}`,
          orderRequest
        );
        return data;
      } catch (e) {
        throw e;
      }
    },
    async getOrderById(orderId: string) {
      // eslint-disable-next-line no-useless-catch
      try {
        const { data } = await axios.get(
          `${useRuntimeConfig().public.BASE_API_URL}/v1/marketplace/orders/${orderId}`
        );
        this.order = data;
      } catch (e) {
        throw e;
      }
    },
    // eslint-disable-next-line consistent-return
    async takePayment(paymentRequest: IPaymentRequest) {
      try {
        const { data } = await axios.post(
          `${useRuntimeConfig().public.BASE_API_URL}/v1/payments/take`,
          paymentRequest
        );
        return data;
      } catch (e) {
        this.snackbar.show = true;
        this.snackbar.message = e.response.data.message;
      }
    },
    async fetchPaymentStatus(paymentId: string) {
      if (!paymentId) {
        this.showCreditCardForm = true;
        return;
      }
      try {
        const router = useRouter();
        const { data } = await axios.get(
          `${useRuntimeConfig().public.BASE_API_URL}/v1/payments/${paymentId}/status`
        );
        this.paymentStatus = data;
        if (this.paymentStatus?.status === PaymentStatusEnum.PAID) {
          this.redirectToSuccessPage();
        }
        this.showCreditCardForm = data.status !== PaymentStatusEnum.PAID;
        if (data.status === PaymentStatusEnum.ERROR) {
          this.showSnackbar(
            `${data?.errorMessage} ${data?.errorCode}`,
            "error"
          );
        }
        // eslint-disable-next-line consistent-return
        return data;
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
    },
    async redirectToSuccessPage() {
      const router = useRouter();
      await router.push(
        CHECKOUT_SUCCESS_URL.replace("{orderId}", this.orderId)
      );
    }
  }
});
