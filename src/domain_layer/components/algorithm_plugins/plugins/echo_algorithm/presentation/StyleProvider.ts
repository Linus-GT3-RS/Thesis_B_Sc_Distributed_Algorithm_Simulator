import type { PresentationModelNodeState, PresentationModelMessageState, PresentationModelEdgeState } from "@/domain_layer/components/simulation/entity_presentation/models/PresentationModels.js";
import { IStylistPresentationModel } from "../../../plugin_api/model_enhancing/EnhancerModel.js";
import type { IStyleRulesetProviderNodeState, IStyleRulesetProviderMessageState, IStyleRulesetProviderEdgeState } from "../../../plugin_api/model_enhancing/ProviderModelStyles.js";

//* NodeState

export class StyleRulesetProviderEchoAlgoNodeState
    implements IStyleRulesetProviderNodeState {

    public applyStyle(
        model: Readonly<PresentationModelNodeState>,
        stylist: IStylistPresentationModel
    ): void {
        if (model.dataDetails.get("is-initiator") === true) {
            stylist.setThickness(true);
        }
        if (model.dataDetails.get("status") === "informed") {
            stylist.setColor("blue");
        }
    }

}


//* MessageState

export class StyleRulesetProviderEchoAlgoMessageState
    implements IStyleRulesetProviderMessageState {

    public applyStyle(
        model: Readonly<PresentationModelMessageState>,
        stylist: IStylistPresentationModel
    ): void {
        if (model.typePayload === "echo-msg-payload") {
            stylist.setColor("blue");
        }
        else if (model.typePayload === "info-msg-payload") {
            stylist.setColor("yellow");
        }
    }

}


//* EdgeState

export class StyleRulesetProviderEchoAlgoEdgeState
    implements IStyleRulesetProviderEdgeState {

    public applyStyle(
        model: Readonly<PresentationModelEdgeState>,
        stylist: IStylistPresentationModel
    ): void {
        if (model.dataDetails.get("in-spanning-tree") === true) {
            stylist.setThickness(true);
        }
    }

}