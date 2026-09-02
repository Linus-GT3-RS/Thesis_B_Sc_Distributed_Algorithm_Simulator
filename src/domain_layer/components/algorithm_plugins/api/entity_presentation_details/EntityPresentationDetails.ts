
export type PresentationDetail =
    ColorDetail |
    ThicknessDetail |
    PropertyDetail

export interface ColorDetail {
    color: string,
}

export interface ThicknessDetail {
    isThick: boolean,
}

export interface PropertyDetail {
    property: string,
    value: string,
}