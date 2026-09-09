
//* Data Detailer

/**
    * Adds key-value pairs to the 
    * underlying PresentationModel of an Entity
    * 
    * This supplies the model with data details
    * that are specific to the exact entity type
    * and cannot be seen at the GenericBase of
    * this entitype type.
    * 
    * @param key 
    * @param value 
    */
export abstract class IDetailerPresentationModel {

    public abstract setStringDetail(
        key: string, value: string,
    ): IDetailerPresentationModel;

    public abstract setNumberDetail(
        key: string, value: number,
    ): IDetailerPresentationModel;

    public abstract setBooleanDetail(
        key: string, value: boolean,
    ): IDetailerPresentationModel;
}


//* Style Detailer

/**
 * Through the stylist a style provider
 * can set styles for a model.
 * 
 * stylist provides all possible styles the provider
 * can choose from
 */
export abstract class IStylistPresentationModel {

    public abstract setColor(color: string): IStylistPresentationModel;

    public abstract setThickness(isThick: boolean): IStylistPresentationModel;

    public abstract setShape(shape: string): IStylistPresentationModel;

}