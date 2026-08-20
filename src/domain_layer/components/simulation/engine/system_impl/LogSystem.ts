import { ISystemLogging } from "../algorithm_plugin_api/actions/Info.Readme/index.js";
import { Identifiable, IdentifiableStore } from "../../common/EntityStores.js";
import { NodeLog } from "../SimulationEngine.js";
import { LogUpdateListener } from "../../presenter/Updates.js";

export class LogSystem implements ISystemLogging {

    constructor(
        private logStore: IdentifiableStore<NodeLog>,
        private issuerNode: Identifiable,
        private updateListener: LogUpdateListener,
    ) { }

    public log(msg: string): void {
        const log: NodeLog = new NodeLog(
            this.logStore.size(), this.issuerNode, msg
        );
        this.logStore.insert(log);

        this.updateListener.notifyLogUpdated(log);
    }

}