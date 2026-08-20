
// Requests initiation of the algorithm

import { UnsupportedMessageTypeError, UnsupportedNodeTypeError } from "../../algorithm/algorithm/AlgorithmProtocol.js";
import { RealtimeClock } from "../../simulation/RealtimeClock.js";
import { SimulationContext, SimulationEngine } from "../../simulation/SimulationEngine.js";


export class CmdDoSimulationStep { }

export abstract class ICmdHandlerDoSimulationStep {
    public abstract handleCmd(cmd: CmdDoSimulationStep): void;
}




export class StoppedSimulationState
    implements
    ICmdHandlerDoSimulationStep,
    ICmdHandlerInitAlgorithm {

    constructor(
        private context: SimulationContext,
        private engine: SimulationEngine,
    ) { }

    public handleCmd(cmd: CmdDoSimulationStep): void {
        this.context.curSimTimestamp += 100;
        this.engine.processMessagesInstantTillSimTime(this.context);
        // todo time in sim has to be reworked little
        // rn engine thinks its directly simTie...
        // but in this stepping state it should go through
        // the time step by step... each timeframe can be reached
        // in this state... so no catch_up because its incr time per step

    }


    // todo intiation logic... validate.. set..
    // todo catch errors
    public handleCmd(cmd: CmdInitAlgorithm): void {
        this.engine.handleInitiation(cmd.initiatorId, this.context);
    }


}





// with the given nodeID as initiator
export class CmdInitAlgorithm {
    constructor(
        public initiatorId: number,
    ) { }
}


export abstract class ICmdHandlerInitAlgorithm {

    public abstract handleCmd(cmd: CmdInitAlgorithm): void;

}




export class ContinueAlgorithmExecutionCmd { } // todo name

export abstract class IHandlerExecAlgorithmCmd {

    public abstract handleCmd(cmd: ContinueAlgorithmExecutionCmd): void;

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
    ICmdHandlerInitAlgorithm,
    IHandlerExecAlgorithmCmd {

    constructor(
        private context: SimulationContext,
        private engine: SimulationEngine,
        private rtclock: RealtimeClock,

    ) { }


    public handleCmd(cmd: CmdInitAlgorithm): void {
        // check algorithm init type
        // -> init allowed?

        // if no
        // error ev

        // else let sim do initiation
        this.engine.handleInitiation(cmd.initiatorId, this.context);

        // schedule msg processing cmd?
    }


    public handleCmd(cmd: ContinueAlgorithmExecutionCmd): void {
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