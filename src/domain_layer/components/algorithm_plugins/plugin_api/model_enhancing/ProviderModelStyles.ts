import { PresentationModelEdgeState, PresentationModelMessageState, PresentationModelNodeState } from "../../../simulation/entity_presentation/models/PresentationModels.js";
import { IStylistPresentationModel } from "./EnhancerModel.js";

//= Interface Types
/**
 * For each EntityGroup that shall be presented
 * and which must be styleable
 * a StyleProvider interface for the type of this EntityGroup
 * must be provided
 * 
 * For each entity type that can occur within the group,
 * a provider implementation must be created 
 * in order for the model to contain all neccessary styles.
 */
export type IStyleRulesetProviderNodeState =
    ITemplateStyleRulesetProvider<PresentationModelNodeState>

export type IStyleRulesetProviderMessageState =
    ITemplateStyleRulesetProvider<PresentationModelMessageState>

export type IStyleRulesetProviderEdgeState =
    ITemplateStyleRulesetProvider<PresentationModelEdgeState>


//* Template
abstract class ITemplateStyleRulesetProvider<PresentationModel> {

    /** 
     * The provider determines how the given model for
     * an entity group should be styled.
     * 
     * Since the rules only depend on the data available in the model, 
     * any entity type from the entity group can be used. 
     * 
     * The provider therefore does not need to distinguish between 
     * the concrete entity types of the group and does not 
     * throw an error if expected data is missing because the 
     * model belongs to a different entity type within the group. 
     * 
     * -> Astyle provider is just a ruleset
     * if the neccessary data cannot be found no styles are applied
     * */
    public abstract applyStyle(
        model: Readonly<PresentationModel>,
        stylist: IStylistPresentationModel
    ): void;

}