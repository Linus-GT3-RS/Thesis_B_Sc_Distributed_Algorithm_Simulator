
// Requests initiation of the algorithm

import { UnsupportedMessageTypeError, UnsupportedNodeTypeError } from "../../algorithm/algorithm/Algorithm.js";
import { RealtimeClock } from "../../simulation/RealtimeClock.js";
import { SimulationContext, SimulationEngine } from "../../simulation/SimulationEngine.js";





// with the given nodeID as initiator
export class AlgorithmInitCmd {
    constructor(
        public initiatorId: number,
    ) { }
}


export abstract class IHandlerAlgorithmInitCmd {

    public abstract handle(cmd: AlgorithmInitCmd): void;

}




export class ExecAlgorithmCmd { } // todo name

export abstract class IHandlerExecAlgorithmCmd {

    public abstract handle(cmd: ExecAlgorithmCmd): void;

}


//! does each state know a StateSpecificEventListener?
// thats prolly DOmainController
//      handle function gets ev and calls the method
//      which is used to queue sth on the ui thread
// interface has benefit that state cannot emit events he shouldnt be able to
// while delveoper does not need to validate each event in controller
//! just private attr for each?


export class RunningSimulationState
    implements
    IHandlerAlgorithmInitCmd,
    IHandlerExecAlgorithmCmd {

    constructor(
        private context: SimulationContext,
        private engine: SimulationEngine,
        private rtclock: RealtimeClock,

    ) { }


    public handle(cmd: AlgorithmInitCmd): void {
        // check algorithm init type
        // -> init allowed?

        // if no
        // error ev

        // if yes
        // let sim do initiation

        // schedule msg processing cmd?
    }


    public handle(cmd: ExecAlgorithmCmd): void {
        // updt rtclock and simtime

        // let engine process msgs at cur time
    }

    // handles any error thrown in the SimulationEngine
    //! same for each state that does anything with an algo?
    // building rendering running all the same no?
    // -> make into class that ev state gets
    private onError(err: unknown) {
        // send error ev
        // do full reset by going back to GrapnhConfigState
        // log error (should be fine is no enterprise app?)
    }


}

//? runs in a WebWorker Thread
// receives cmds via WebWorker Thread CmdQueue
export class DomainController {

    private state: unknown;

    // private eventListener: unknown;

    public handleCommand(cmd: unknown) {
        if (cmd instanceof AlgorithmInitCmd
            && this.state instanceof IHandlerAlgorithmInitCmd
        ) {
            this.state.handle(cmd);
        }
        // else if(){}

        throw new Error(`Cannot handle cmd=${cmd}. Current state is: ${this.state}`); // todo ev
    }

}