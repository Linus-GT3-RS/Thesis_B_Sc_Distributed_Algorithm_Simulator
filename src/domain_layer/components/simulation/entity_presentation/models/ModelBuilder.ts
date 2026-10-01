import type { IDetailProviderNodeState, IDetailProviderMessageData, IDetailProviderEdgeState } from "@/domain_layer/components/algorithm_plugins/plugin_api/model_enhancing/ProviderModelDetails.js";
import type { IStyleRulesetProviderNodeState, IStyleRulesetProviderMessageState, IStyleRulesetProviderEdgeState } from "@/domain_layer/components/algorithm_plugins/plugin_api/model_enhancing/ProviderModelStyles.js";
import { UndirectedEdgeState } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Edges.js";
import { LogType, ProcessLogState } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Logs.js";
import { MessageState } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Messages.js";
import { NodeState } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Nodes.js";
import { DetailerPresentationModel, StylistPresentationModel } from "./ModelEnhancerImpl.js";
import type { PresentationModelNodeLog, PresentationModelNodeState, PresentationModelMessageState, PresentationModelEdgeState } from "./PresentationModels.js";

/**
 ** For each entity group that shall be presented
 ** a PresentationModelBuilder must exist
 ** that gets the Entity and builds its EntityModel
 */

//* Types
export type IModelBuilderNodeLog =
    IModelBuilder<ProcessLogState, PresentationModelNodeLog>

export type IModelBuilderNodeState =
    IModelBuilder<NodeState, PresentationModelNodeState>

export type IModelBuilderMessageState =
    IModelBuilder<MessageState, PresentationModelMessageState>

export type IModelBuilderEdgeState =
    IModelBuilder<UndirectedEdgeState, PresentationModelEdgeState>

export abstract class IModelBuilder
    <Entity, EntityPresentationModel> {

    public abstract build(entity: Readonly<Entity>): EntityPresentationModel;

}


//* Builder NodeLog
export class ModelBuilderNodeLog implements IModelBuilderNodeLog {

    public build(log: Readonly<ProcessLogState>): PresentationModelNodeLog {
        const basemodel: PresentationModelNodeLog = {
            id: log.id,
            logType: this.type2String(log.type),
            log: log.msg,
            idLogger: log.logger
        };
        return basemodel;
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
        const basemodel: PresentationModelNodeState = {
            id: entity.id,
            dataDetails: new Map<string, string | number | boolean>(),
            styles: new Map<string, string>(),
        };

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
        const basemodel: PresentationModelMessageState = {
            id: entity.id,
            idSender: entity.sender, idReceiver: entity.receiver,
            sendTime: entity.sendTime, destinationTime: entity.destinationTime,
            typePayload: entity.data.type,
            dataDetails: new Map<string, string | number | boolean>(),
            styles: new Map<string, string>(),
        };

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
        entity: Readonly<UndirectedEdgeState>
    ): PresentationModelEdgeState {
        // build basemodel
        const basemodel: PresentationModelEdgeState = {
            id: entity.id,
            idNodeA: entity.nodeA.id, idNodeB: entity.nodeB.id,
            edgeType: "bi-directional",
            length_ms: entity.length_ms,
            dataDetails: new Map<string, string | number | boolean>(),
            styles: new Map<string, string>(),
        };

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