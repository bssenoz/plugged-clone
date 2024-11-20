export interface IWebBaseResponse {
    id?: string
    hreflangs: HreflangType[]
    canonical?: CanonicalType;
    title: string;
    meta?: Map<string, any>;
    httpStatus?: number,
    redirectUrl?: string
}

export interface IWebsiteResponse {
    id?: string
    hreflangs?: HreflangType[];
    canonical?: CanonicalType | null;
    title: string;
    meta?: Map<string, any>;
    httpStatus?: number,
    redirectUrl?: string
    titleTemplate: string;
    headerLogoUrl: string;
    faviconUrl?: string;
    mainLanguage: string;
    mainCurrency: string;
    languages: string[];
    currencies: string[];
}

export type HreflangType = {
    rel: string;
    href: string;
    hreflang: string;
}

export type CanonicalType = {
    rel: string;
    href: string;
}

export type TextUrlType = {
    text: string
    url: string
}

export type ReviewSummaryType = {
    count: number;
    rate: number;
}

export type PriceType = {
    amount: number;
    currency: CurrencyType;
}

export type CurrencyType = {
    code: string;
    name: string;
}

export type CodeNameType = {
    code: string
    name: string
}
export type DurationType = {
    amount: number;
    time: Time;
}

export type UrlNameType = {
    url: string,
    name: string
}


export enum Time {
    NONE = 0,
    MINUTE = 1,
    HOUR = 2,
    DAY = 3

}

export enum LanguageEnum {
    TR = "Türkçe",
    EN = "English",
    RU = "Русский",
    DE = "Deutsch"
}


export type FileType = {
    contentType: string;
    sourceUrl: string;
    rawSourceUrl: string;
    ordinal: number;
    extension: string;

};

export type SnackbarType = {
    show: boolean;
    message: string;
    type: string;
};
/**  **/


