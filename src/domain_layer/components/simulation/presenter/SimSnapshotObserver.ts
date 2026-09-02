import { Identifiable } from "../../../../common/EntityStores.js";
import { NodeProcessLog } from "../../algorithm_plugins/api/entities/state_entities/Logs.js";
import { MessageState } from "../../algorithm_plugins/api/entities/state_entities/Messages.js";
import { NodeState } from "../../algorithm_plugins/api/entities/state_entities/Nodes.js";


//* Types

export type NodeProcessLogObserver = EntityStateObserver<NodeProcessLog>
export type NodeStateObserver = EntityStateObserver<NodeState>
export type MessageStateObserver = EntityStateObserver<MessageState>

//* Observer

/**
 * Is interest in updates to the EntityState
 */
export class EntityStateObserver<I extends Identifiable> {

    constructor(
        private updates: Set<number>,
    ) { }

    public notifyUpdate(state: Readonly<I>): void {
        this.updates.add(state.id);
    }

}