
//* Data Detailer

import { ModelDataDetail, ModelStyle } from "../models/PresentationModels.js";

export abstract class IDataDetailerPresentationModel {

    public abstract addDataDetail(key: string, value: string): void;

}

export class DataDetailerModel implements IDataDetailerPresentationModel {

    constructor(
        private data: ModelDataDetail, // full access
    ) { }

    public addDataDetail(key: string, value: string): void {
        this.data.set(key, value);
    }

}



//* Styles Detailer

/**
 * through the stylist a style provider
 * can set styles for his model.
 * 
 * stylist provides all possible styles the provider
 * can choose from
 */
abstract class IStyleDetailerPresentationModel {

    public abstract setColor(color: string): void;

    public abstract setThickness(isThick: boolean): void;

    public abstract setShape(shape: string): void;

}

export class StylistPresentationModel implements IStyleDetailerPresentationModel {

    constructor(
        private styles: ModelStyle, // full access
    ) { }

    public setColor(color: string): void {
        this.styles.set("color", color);
    }

    public setThickness(isThick: boolean): void {
        this.styles.set("thickness", isThick ? "thick" : "thin");
    }

    public setShape(shape: string): void {
        this.styles.set("shape", shape);
    }

}