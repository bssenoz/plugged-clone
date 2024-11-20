import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: []
  }),
  getters: {
    getItems: (state) => state.items,
    getProduct: (state) => (productId) =>
      state.items.find((product) => product.productId === productId)
  },
  actions: {
    addItem(productId, packageItem) {
      const product = this.items.find((p) => p.productId === productId);
      if (product) {
        product.selectedPackages.push(packageItem);
      } else {
        this.items.push({
          productId,
          selectedPackages: [packageItem]
        });
      }
    },
    removeItem(productId, packageId) {
      const product = this.items.find((p) => p.productId === productId);
      if (product) {
        product.selectedPackages = product.selectedPackages.filter(
          (pkg) => pkg.packageId !== packageId
        );
        if (product.selectedPackages.length === 0) {
          this.items = this.items.filter((p) => p.productId !== productId);
        }
      }
    },
    updateItem(productId, packageItem) {
      const product = this.items.find((p) => p.productId === productId);
      if (product) {
        const index = product.selectedPackages.findIndex(
          (pkg) => pkg.packageId === packageItem.packageId
        );
        if (index !== -1) {
          product.selectedPackages[index] = packageItem;
        } else {
          product.selectedPackages.push(packageItem);
        }
      }
    },
    clearCart() {
      this.items = [];
    }
  },
  persist: {
    storage: persistedState.localStorage
  }
});
