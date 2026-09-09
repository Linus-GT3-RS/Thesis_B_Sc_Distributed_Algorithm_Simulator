import { BiDirectionalEdgeState } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Edges.js";
import { LogType, NodeLog } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Logs.js";
import { MessageState } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Messages.js";
import { NodeState } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Nodes.js";
import { IDetailProviderEntity, IStyleProviderNodeState, IDetailProvider, IStyleRulesetProvider } from "../../../algorithm_plugins/plugin_api/model_enhancing/ProviderModelDetails.js";
import { DetailProviderEchoAlgoNode } from "../../../algorithm_plugins/plugins/echo_algorithm/2EchoAlgoDetailProvider.js";
import { DetailerPresentationModel, StylistPresentationModel } from "./ModelEnhancerImpl.js";
import { PresentationModelEdgeState, PresentationModelMessageState, PresentationModelNodeLog, PresentationModelNodeState } from "./PresentationModels.js";

//* Builder NodeLog
export class ModelBuilderNodeLog {

    public build(log: Readonly<NodeLog>): PresentationModelNodeLog {
        return new PresentationModelNodeLog(
            log.id,
            this.type2String(log.type), log.msg,
            log.logger
        );
    }

    public type2String(logtype: LogType): string {
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
export class ModelBuilderNodeState {

    constructor(
        private detailProvider: IDetailProvider<NodeState> | null,
        // private styleProvider: IStyleRuleset<PresentationModelNodeState> | null,
    ) { }

    public build(state: Readonly<NodeState>): PresentationModelNodeState {
        const basemodel: PresentationModelNodeState = new PresentationModelNodeState(
            state.id, new Map<string, string>(), new Map<string, string>()
        );

        if (this.detailProvider !== null) {
            this.detailProvider.addDetails(
                state, new DetailerPresentationModel(basemodel.dataDetails)
            );
        }
        if (this.styleProvider !== null) {
            this.styleProvider.applyStyle(
                basemodel, new StylistPresentationModel(basemodel.styles)
            );
        }

        return basemodel;
    }

}

new ModelBuilderNodeState(new DetailProviderEchoAlgoNode())


export class ModelBuilderMessageState {

    public build(state: Readonly<MessageState>): PresentationModelMessageState {
        return new PresentationModelMessageState(
            state.id,
            state.sender, state.receiver,
            state.sendTime, state.destinationTime,
            new Map<string, string>(), new Map<string, string>()
        );
    }

}


export class ModelBuilderEdgeState {

    public build(state: Readonly<BiDirectionalEdgeState>): PresentationModelEdgeState {
        return new PresentationModelEdgeState(
            state.id,
            state.nodeA.id, state.nodeB.id, state.length_ms,
            "bidirectional",
            new Map<string, string>(), new Map<string, string>(),
        );
    }

}