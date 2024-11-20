export enum PaxTypeEnum {
    ADULT= 'ADULT',
    CHILD = 'CHILD',
    INFANT = 'INFANT',
    PERSON = 'PERSON',
}

export enum PaxCriteriaEnum {
    NONE = 'NONE',
    AGE = 'AGE',
    HEIGHT = 'HEIGHT',
}

export type PaxDetailType = {
    id: number;
    type: PaxTypeEnum;
    minAge?: number;
    maxAge?: number;
    minHeight?: number;
    maxHeight?: number;
    criteria: PaxCriteriaEnum;
}