import { IDetailerPresentationModel, IStylistPresentationModel } from "../../../algorithm_plugins/plugin_api/model_enhancing/EnhancerModel.js";

export class DetailerPresentationModel
    implements IDetailerPresentationModel {

    constructor(
        private details: Map<string, string | number | boolean>, // full access
    ) { }

    public setStringDetail(
        key: string, value: string,
    ): IDetailerPresentationModel {
        this.details.set(key, value);
        return this;
    }

    public setNumberDetail(
        key: string, value: number,
    ): IDetailerPresentationModel {
        this.details.set(key, value);
        return this;
    }

    public setBooleanDetail(
        key: string, value: boolean,
    ): IDetailerPresentationModel {
        this.details.set(key, value);
        return this;
    }

}



export class StylistPresentationModel
    implements IStylistPresentationModel {

    constructor(
        private styles: Map<string, string>, // full access
    ) { }

    public setColor(color: string): IStylistPresentationModel {
        this.styles.set("color", color);
        return this;
    }

    public setThickness(isThick: boolean): IStylistPresentationModel {
        this.styles.set("thickness", isThick ? "thick" : "thin");
        return this;
    }

    public setShape(shape: string): IStylistPresentationModel {
        this.styles.set("shape", shape);
        return this;
    }

}