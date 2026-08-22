import { NodeState } from "../../api/entities/state_entities/Nodes.js";
import { INodeStatePresentationDetailProvider, PresentationDetailProviderError } from "../../api/entity_presentation_details/DetailProvider.js";
import type { PresentationDetail } from "../../api/entity_presentation_details/EntityPresentationDetails.js";
import { EchoAlgorithmNodeState } from "./EchoAlgoEntities.js";

//* Node 

export class EchoAlgoNodeStateDetailer
    implements INodeStatePresentationDetailProvider {

    public provide(state: Readonly<NodeState>): Array<PresentationDetail> {
        if (!(state instanceof EchoAlgorithmNodeState)) {
            throw new PresentationDetailProviderError(
                `Cannot provide PresentationDetails for
                NodeState with given type: ${state}`
            );
        }
        const details: Array<PresentationDetail> = [];

        // add Color Details
        if (state.isInformed) {
            details.push({
                color: "green"
            });
        }

        // add Thickness Details
        details.push({ isThick: state.isInitiator });

        // add Data Details
        details.push({
            property: "status",
            value: state.isInformed ? "informed" : "uninformed"
        });
        details.push({
            property: "countInformedNeighbors",
            value: state.numberInformedNeighbors.toString()
        });

        return details;
    }

}



// TODO

// //* Edge Renderer

// export class EchoAlgorithmEdgeRenderer
//     implements IAlgorithmEdgeRenderer {

//     public provide(
//         edge: GenericBiDirectionalEdge,
//     ): Array<RenderAttribute> {
//         if (!(edge.nodeA instanceof EchoAlgorithmNode)
//             || !(edge.nodeB instanceof EchoAlgorithmNode)) {
//             throw new Error(); // todo
//         }
//         const res = new Array<RenderAttribute>();

//         // Thickness
//         res.push(new ThicknessRenderAttr(
//             // todo null check
//             edge.nodeA.parentID! == edge.nodeB.id
//             || edge.nodeB.parentID! == edge.nodeA.id
//         ));

//         // todo add generic info

//         return res;
//     }

// }


// //* Message Renderer

// // todo give full msg so generic info can be rendered

// export class EchoAlgoMsgDataRenderer
//     implements IAlgorithmMessageDataRenderer {

//     public provide(msg: unknown): Array<RenderAttribute> {
//         if (msg instanceof EchoData) {
//             return this.onEchoMessageData(msg);
//         }
//         else if (msg instanceof InfoData) {
//             return this.onInfoMessageData(msg);
//         }
//         throw new Error(); // todo
//     }

//     private onEchoMessageData(data: EchoData): Array<RenderAttribute> {
//         const res = new Array<RenderAttribute>();

//         // Data
//         res.push(new DataRenderAttr(
//             "type", "Echo Message"
//         ));

//         // Color
//         res.push(new ColorRenderAttr(
//             "blue"
//         ));

//         return res;
//     }

//     private onInfoMessageData(data: InfoData): Array<RenderAttribute> {
//         const res = new Array<RenderAttribute>();

//         // Data
//         res.push(new DataRenderAttr(
//             "type", "Info Message"
//         ));


//         return res;
//     }

// }