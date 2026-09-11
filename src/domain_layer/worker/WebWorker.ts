import { type IDomainCommandGateway } from "../gateways/CommandGateway";
import { buildDomainLayer } from "../BuilderDomainLayer";

const domainCommandGateway: IDomainCommandGateway = buildDomainLayer(
    (message: unknown) => self.postMessage(message)
);

self.onmessage = (message) => {
    domainCommandGateway.receiveCommand(message.data);
}
