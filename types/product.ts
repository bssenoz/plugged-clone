import {
    CodeNameType,
    DurationType,
    FileType,
    IWebBaseResponse,
    PriceType,
    ReviewSummaryType,
    TextUrlType
} from "~/types/common";

export interface IProductDetailedCardListResponse {
    items: ProductDetailedCardType[];
    currentItem:Object
    multimedia:Object
}


export type ProductDetailedCardType = {
    category: TextUrlType;
    destination: TextUrlType;
    review: ReviewSummaryType;
    price: PriceType;
    tags: CodeNameType[];
    duration: DurationType;
    url: string,
    mainImage: string
}

export type ProductCardType = {
    category: TextUrlType;
    destination: TextUrlType;
    review: ReviewSummaryType;
    price: PriceType;
    tags: CodeNameType[];
    duration: DurationType;
    url: string,
    mainImage: string
}

export type TransferInformationType = {
    meetingPoint: string | null,
    pickUpPoint:  string | null,
    dropOffPoint: string | null,
    transferAvailable: boolean
}

export interface IProductDetailResponse extends IWebBaseResponse {
    summary: string;
    productType: string;
    fullDescription: string;
    mainImage: FileType;
    highlights: string[];
    inclusions: string[];
    exclusions: string[];
    WhatToBring: string[];
    notAllowed: string[];
    paymentOptions: string[] | null;
    knowBeforeYoGo: string[];
    destination: TextUrlType | null;
    category: TextUrlType | null;
    transferInformation: TransferInformationType

}