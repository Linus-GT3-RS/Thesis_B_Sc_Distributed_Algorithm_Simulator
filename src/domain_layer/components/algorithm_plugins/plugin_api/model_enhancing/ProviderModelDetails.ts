import { BiDirectionalEdgeState } from "../entities/state_entities/Edges.js";
import { MessageData } from "../entities/state_entities/Messages.js";
import { NodeState } from "../entities/state_entities/Nodes.js";
import { IDetailerPresentationModel } from "./EnhancerModel.js";

//= Interface Types
/**
 * For each EntityGroup that shall be presented
 * and which must be detailbable,
 * a DetailProvider interface for the type of this EntityGroup
 * must be provided
 * 
 * For each entity type that can occur within the group,
 * a provider implementation must be created 
 * in order for the model to contain all neccessary details.
 */

export type IDetailProviderNodeState = ITemplateDetailProvider<NodeState>

export type IDetailProviderMessageData = ITemplateDetailProvider<MessageData>

export type IDetailProviderEdgeState = ITemplateDetailProvider<BiDirectionalEdgeState>


//= Template 
abstract class ITemplateDetailProvider<EntityGroup> {

    /**
     * The provider determines how the given entity type should be detailed
     * 
     * @throws {DetailProviderErrorInvalidEntityType} if the type of the
     *         given entity cannot be handled by this provider.
     *         Throwing this error is not required, but recommended to help
     *         detect unexpected entity types in the simulation early.
     */
    public abstract addDetails(
        entity: Readonly<EntityGroup>,
        detailer: IDetailerPresentationModel
    ): void;

}

//= Errors

export class DetailProviderErrorInvalidEntityType
    extends Error { }