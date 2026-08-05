import { GenericEdge, GenericNode } from "../data/Data.js";
import { RenderAttribute } from "./RenderAttributes.js";

//*
// A renderer defines which data of an entity
// is displayed in the user interface.
//
// Note:
// Generic simulation data (e.g. IDs, sender, receiver)
// is always available to generic views such as the log.
// Algorithm-specific views (e.g. graph labels or the
// properties view) only display the data provided by
// the renderer.


//* Node Renderer

export abstract class IAlgorithmNodeRenderer {

    // throws error
    public abstract provide(node: GenericNode): Array<RenderAttribute>;

}


//* Edge Renderer

export abstract class IAlgorithmEdgeRenderer {

    // throws error
    public abstract provide(
        edge: GenericEdge,
    ): Array<RenderAttribute>;

}


//* MessageData Renderer

export abstract class IAlgorithmMessageDataRenderer {

    // throws error
    public abstract provide(msgData: unknown): Array<RenderAttribute>;

}

