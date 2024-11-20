export interface ITransferServiceAvailabilityRequest {
    productId: string;
    placeId?: string;
    point?: PointType;
}

export type PointType = {
    lat: number;
    lon: number;
};