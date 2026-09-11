import type { UIEventGateway } from "../gateway/UIEventGateway";

/**
 * Creates a WorkerThread in which
 * the DomainLayer runs.
 * 
 * The worker is owned by this class
 */
export class WebMasterDomainWorker {

    private webWorkerDomainLayer = new Worker(
        new URL('../../domain_layer/worker/WebWorker.ts', import.meta.url),
        { type: 'module' }
    );

    constructor(
        private uiEventGateway: UIEventGateway,
        // handleIncomingMessage: (message: MessageEvent<any>) => void,
    ) {
        // this.webWorkerDomainLayer.onmessage = handleIncomingMessage;
        this.webWorkerDomainLayer.onmessage = (message) => {
            this.uiEventGateway.onEventMessage(message);
        }
    }

    /**
     * Sends the received message to the
     * DommainCommandGateway
     * 
     * Message is not checked but strictly forwarded.
     * 
     * @param message 
     */
    public sendToDomainCmdGateway(message: unknown) {
        this.webWorkerDomainLayer.postMessage(message);
    }

}