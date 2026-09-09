import { BiDirectionalEdgeState } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Edges.js";
import { LogType, NodeLog } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Logs.js";
import { MessageState } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Messages.js";
import { NodeState } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Nodes.js";
import { IDetailProviderEdgeState, IDetailProviderMessageData, IDetailProviderNodeState } from "../../../algorithm_plugins/plugin_api/model_enhancing/ProviderModelDetails.js";
import { IStyleRulesetProviderEdgeState, IStyleRulesetProviderMessageState, IStyleRulesetProviderNodeState } from "../../../algorithm_plugins/plugin_api/model_enhancing/ProviderModelStyles.js";
import { DetailerPresentationModel, StylistPresentationModel } from "./ModelEnhancerImpl.js";
import { PresentationModelEdgeState, PresentationModelMessageState, PresentationModelNodeLog, PresentationModelNodeState } from "./PresentationModels.js";

//* Interfaces
/**
 * For each entity group that shall be presented
 * a PresentationModelBuilder must exist
 * that gets the Entity and builds its EntityModel
 */

export type IModelBuilderNodeLog =
    IModelBuilder<NodeLog, PresentationModelNodeLog>

export type IModelBuilderNodeState =
    IModelBuilder<NodeState, PresentationModelNodeState>

export type IModelBuilderMessageState =
    IModelBuilder<MessageState, PresentationModelMessageState>

export type IModelBuilderEdgeState =
    IModelBuilder<BiDirectionalEdgeState, PresentationModelEdgeState>

export abstract class IModelBuilder
    <Entity, EntityPresentationModel> {

    public abstract build(entity: Readonly<Entity>): EntityPresentationModel;

}


//* Builder NodeLog
export class ModelBuilderNodeLog implements IModelBuilderNodeLog {

    public build(log: Readonly<NodeLog>): PresentationModelNodeLog {
        return new PresentationModelNodeLog(
            log.id,
            this.type2String(log.type), log.msg,
            log.logger
        );
    }

    private type2String(logtype: LogType): string {
        switch (logtype) {
            case LogType.INFO:
                return "log-info";
            case LogType.WARNING:
                return "log-warning";
            case LogType.ERROR:
                return "log-error";
        }
    }

}


//* Builder NodeState
export class ModelBuilderNodeState implements IModelBuilderNodeState {

    constructor(
        private detailProvider: IDetailProviderNodeState,
        private styleRuleset: IStyleRulesetProviderNodeState,
    ) { }

    public build(entity: Readonly<NodeState>): PresentationModelNodeState {
        // build base
        const basemodel: PresentationModelNodeState = new PresentationModelNodeState(
            entity.id,
            new Map<string, string | number | boolean>(),
            new Map<string, string>(),
        );

        // add details
        this.detailProvider.addDetails(
            entity,
            new DetailerPresentationModel(basemodel.dataDetails)
        );

        // add styles
        this.styleRuleset.applyStyle(
            basemodel,
            new StylistPresentationModel(basemodel.styles)
        );

        return basemodel;
    }

}




//* Builder MessageState

export class ModelBuilderMessageState implements IModelBuilderMessageState {

    constructor(
        private detailProvider: IDetailProviderMessageData,
        private styleRuleset: IStyleRulesetProviderMessageState,
    ) { }

    public build(entity: Readonly<MessageState>): PresentationModelMessageState {
        // build basemodel
        const basemodel: PresentationModelMessageState = new PresentationModelMessageState(
            entity.id,
            entity.sender, entity.receiver,
            entity.sendTime, entity.destinationTime,
            entity.data.type,
            new Map<string, string | number | boolean>(),
            new Map<string, string>(),
        );

        // add details
        this.detailProvider.addDetails(
            entity.data,
            new DetailerPresentationModel(basemodel.dataDetails)
        );

        // add styles
        this.styleRuleset.applyStyle(
            basemodel,
            new StylistPresentationModel(basemodel.styles)
        );

        return basemodel;
    }

}


//* EdgeState

export class ModelBuilderEdgeState implements IModelBuilderEdgeState {

    constructor(
        private detailProvider: IDetailProviderEdgeState,
        private styleRuleset: IStyleRulesetProviderEdgeState,
    ) { }

    public build(
        entity: Readonly<BiDirectionalEdgeState>
    ): PresentationModelEdgeState {
        // build basemodel
        const basemodel: PresentationModelEdgeState = new PresentationModelEdgeState(
            entity.id,
            entity.nodeA.id, entity.nodeB.id, "bi-directional",
            entity.length_ms,
            new Map<string, string | number | boolean>(),
            new Map<string, string>(),
        );

        // add details
        this.detailProvider.addDetails(
            entity,
            new DetailerPresentationModel(basemodel.dataDetails)
        );

        // add styles
        this.styleRuleset.applyStyle(
            basemodel,
            new StylistPresentationModel(basemodel.styles)
        );

        return basemodel;
    }

}