
export type RenderAttribute =
    ColorRenderAttr |
    ThicknessRenderAttr |
    DataRenderAttr
    ;

export class ColorRenderAttr {
    constructor(
        public color: string
    ) { }
}

export class ThicknessRenderAttr {
    constructor(
        public isThick: boolean
    ) { }
}

export class DataRenderAttr {
    constructor(
        public name: string,
        public data: string
    ) { }
}