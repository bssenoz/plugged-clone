import {UrlNameType} from "~/types/common";

export interface IThingsToDoResponse {
    thingsToDo: [];
}

export type ThingsToDoType = {
    categoryName: string;
    sites: UrlNameType[];
}