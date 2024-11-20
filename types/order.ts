// Enums

export enum ProductTypeEnum {
    NONE = "NONE",
    TOUR_OR_ACTIVITY = "TOUR_OR_ACTIVITY",
    EVENT_OR_CONCERT = "EVENT_OR_CONCERT",
    TRANSFER = "TRANSFER"
}

export enum PaxTypeEnum {
    ADULT = "ADULT",
    CHILD = "CHILD",
    INFANT = "INFANT",
    PERSON = "PERSON",
    GROUP = "GROUP"
}


// Interfaces

export interface IOrderRequest {
    contactPerson: ContactPersonType;
    items: OrderItemRequest[];
    websiteId: string;
    userId: string;
}

export interface IOrderResponse {
    id: string | null;
    orderTrackId: string | null;
    contactPerson: ContactPersonType;
    items: OrderItemType[];
    orderCreatedAt: string | null;
    orderApprovedAt: string | null;
    additionalData: {
        [key: string]: string;
    };
    paymentOption: PaymentOptionType | null;
}

export interface IUpdateOrderRequest {
    updateType: string;
    nextStep: string;
    orderId: string;
    contactPerson: ContactPersonType;
    items: OrderItemRequest[];
    websiteId: string;
    userId: string;
    additionalData: {
        [key: string]: string;
    };
}

// Types

export type OrderItemRequest = {
    productId: string;
    packageId: string;
    quotaId: string;
    activityDate: string;
    productType: ProductTypeEnum;
    participants: ParticipantType[];
    data: { [key: string]: any };
}

export type OrderItemType = {
    id: string;
    trackId: string;
    activityDate: string;
    quotaDetailId: string;
    productId: string;
    productName: string;
    packageId: string;
    packageType: string;
    packageName: string;
    status: string;
    salePrice: SalePriceType;
    adultCount: number,
    childCount: number,
    infantCount: number,
    personCount: number,
    groupCount: number,
    totalCount: number,
    data: { [key: string]: any };
}

export type ParticipantType = {
    paxType: PaxTypeEnum;
}

export type ContactPersonType = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneCountryCode: string;
    phoneNumber: string;
}
export type SalePriceType = {
    amount: number,
    currency: string,
}

export interface IPaymentStatusResponse {
    paymentId: string;
    orderId: string;
    status: PaymentStatusEnum;
    errorCode: string;
    errorMessage: string;
}

export enum PaymentStatusEnum {
    PRE_PAID = 'PRE_PAID',
    PAID = 'PAID',
    VOID = 'VOID',
    REFUND = 'REFUND',
    REJECT = 'REJECT',
    ERROR = 'ERROR',
    ROLLBACK = 'ROLLBACK'
}

export interface IPaymentRequest {
    orderId: string;
    installmentCount: number;
    bankInstallmentCount: number;
    cardOwner: string;
    cardNumber: string;
    cardValidMonth: string;
    cardValidYear: string;
    cardCVC: string;
}

export type PaymentOptionType = {
    id: string;
    type: PaymentOptionTypeEnum;
    percentage: number;
}

export enum PaymentOptionTypeEnum {
    NO_PAYMENT = 'NO_PAYMENT',
    PARTIAL_PAYMENT = 'PARTIAL_PAYMENT',
    FULL_PAYMENT = 'FULL_PAYMENT'
}

/**  **/



