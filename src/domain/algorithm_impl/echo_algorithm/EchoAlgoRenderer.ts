import { GenericEdge, GenericNode } from "../../algorithm/data/AlgoData.js";
import { ColorRenderAttr, DataRenderAttr, RenderAttribute, ThicknessRenderAttr } from "../../algorithm/rendering/RenderAttributes.js";
import { IAlgorithmEdgeRenderer, IAlgorithmMessageDataRenderer, IAlgorithmNodeRenderer } from "../../algorithm/rendering/Renderer.js";
import { EchoAlgorithmNode, EchoData, InfoData } from "./EchoAlgoData.js";

// todo feinschliff

//* Node Renderer

export class EchoAlgorithmNodeRenderer
    implements IAlgorithmNodeRenderer {

    public provide(
        node: GenericNode
    ): Array<RenderAttribute> {
        if (!(node instanceof EchoAlgorithmNode)) {
            throw new Error(); // todo
        }
        const res = new Array<RenderAttribute>();

        // Data
        res.push(new DataRenderAttr(
            "id", node.id.toString()
        ));
        res.push(new DataRenderAttr(
            "status", node.isInformed ? "informed" : "uninformed"
        ));
        res.push(new DataRenderAttr(
            "numInfNeighbors", node.numberInformedNeighbors.toString()
        ));

        // Thickness
        res.push(new ThicknessRenderAttr(
            node.isInitiator
        ));

        // Color
        if (node.isInitiator) {
            res.push(new ColorRenderAttr(
                "green"
            ));
        } else if (node.isInformed) {
            res.push(new ColorRenderAttr(
                "blue"
            ));
        }
        // else default color

        //! else default 

        return res;
    }

}


//* Edge Renderer

export class EchoAlgorithmEdgeRenderer
    implements IAlgorithmEdgeRenderer {

    public provide(
        edge: GenericEdge,
    ): Array<RenderAttribute> {
        if (!(edge.nodeA instanceof EchoAlgorithmNode)
            || !(edge.nodeB instanceof EchoAlgorithmNode)) {
            throw new Error(); // todo
        }
        const res = new Array<RenderAttribute>();

        // Thickness
        res.push(new ThicknessRenderAttr(
            // todo null check
            edge.nodeA.parentID! == edge.nodeB.id
            || edge.nodeB.parentID! == edge.nodeA.id
        ));

        // todo add generic info

        return res;
    }

}


//* Message Renderer

// todo give full msg so generic info can be rendered

export class EchoAlgoMsgDataRenderer
    implements IAlgorithmMessageDataRenderer {

    public provide(msg: unknown): Array<RenderAttribute> {
        if (msg instanceof EchoData) {
            return this.onEchoMessageData(msg);
        }
        else if (msg instanceof InfoData) {
            return this.onInfoMessageData(msg);
        }
        throw new Error(); // todo
    }

    private onEchoMessageData(data: EchoData): Array<RenderAttribute> {
        const res = new Array<RenderAttribute>();

        // Data
        res.push(new DataRenderAttr(
            "type", "Echo Message"
        ));

        // Color
        res.push(new ColorRenderAttr(
            "blue"
        ));

        return res;
    }

    private onInfoMessageData(data: InfoData): Array<RenderAttribute> {
        const res = new Array<RenderAttribute>();

        // Data
        res.push(new DataRenderAttr(
            "type", "Info Message"
        ));


        return res;
    }

}