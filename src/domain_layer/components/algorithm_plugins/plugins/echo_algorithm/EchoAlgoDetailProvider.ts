
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
