import { UndirectedEdgeState } from "../../../plugin_api/entities/state_entities/Edges.js";
import { MessageData } from "../../../plugin_api/entities/state_entities/Messages.js";
import { NodeState } from "../../../plugin_api/entities/state_entities/Nodes.js";
import { IDetailerPresentationModel } from "../../../plugin_api/model_enhancing/EnhancerModel.js";
import { type IDetailProviderNodeState, type IDetailProviderMessageData, type IDetailProviderEdgeState, DetailProviderErrorInvalidEntityType } from "../../../plugin_api/model_enhancing/ProviderModelDetails.js";
import { EchoAlgorithmNodeState, InfoMessageData, EchoMessageData } from "../data/EchoAlgoEntities.js";

//* NodeState

export class DetailProviderEchoAlgoNodeState
    implements IDetailProviderNodeState {

    public addDetails(
        entity: Readonly<NodeState>,
        detailer: IDetailerPresentationModel
    ): void {
        if (entity instanceof EchoAlgorithmNodeState) {
            this.doAddDetails(entity, detailer);
        }
        else {
            throw new DetailProviderErrorInvalidEntityType(`
                Expected NodeState to be of type EchoAlgorithmNodeState
                but received NodeState with type: ${typeof entity}`);
        }
    }

    private doAddDetails(
        entity: Readonly<EchoAlgorithmNodeState>,
        detailer: IDetailerPresentationModel
    ): void {
        detailer
            .setStringDetail("status",
                entity.isInformed ? "informed" : "not informed"
            )
            .setNumberDetail("num-informed-neighbors",
                entity.numberInformedNeighbors
            );
        if (entity.isInitiator) {
            detailer.setBooleanDetail("is-initiator", true);
        }
    }

}


//* MessageData

export class DetailProviderEchoAlgoMessageData
    implements IDetailProviderMessageData {

    public addDetails(
        entity: Readonly<MessageData>,
        detailer: IDetailerPresentationModel
    ): void {
        if (entity instanceof InfoMessageData) {
            this.doAddDetails(entity, detailer);
        }
        else if (entity instanceof EchoMessageData) {
            // no detail enhancement
            return;
        }
        else {
            throw new DetailProviderErrorInvalidEntityType(`
                            Expected MessageState to contain data of
                            type InfoMsg or EchoMsg
                            but received Data with type: ${typeof entity}`
            );
        }
    }

    private doAddDetails(
        entity: Readonly<InfoMessageData>,
        detailer: IDetailerPresentationModel,
    ): void {
        detailer.setNumberDetail("sender-node",
            entity.senderID.id
        );
    }

}


//* Edge States 

// todo
// how to get information about the two nodes here
// to make spanning tree info
export class DetailProviderEdgeState
    implements IDetailProviderEdgeState {

    public addDetails(
        entity: Readonly<UndirectedEdgeState>,
        detailer: IDetailerPresentationModel
    ): void {
    }

}