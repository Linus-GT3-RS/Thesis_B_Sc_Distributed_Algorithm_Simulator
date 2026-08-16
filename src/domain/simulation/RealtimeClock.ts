import { MilisecsSinceEpoch } from "../common/Time.js";


// //? time managemnt for cmds
// - create RTClock when running
// - update time before cmds?.. but not pause cmd?


// todo use other classes for types for ms?
export class RealtimeClock {

    private lastRealtimeTimestamp: MilisecsSinceEpoch;

    // starts time measuring
    constructor(
        private getRealtimeTimestamp: () => MilisecsSinceEpoch
    ) {
        this.lastRealtimeTimestamp = getRealtimeTimestamp();
    }

    // measures time and gives elapsed time since last measurement
    public getElapsedTime_ms(): number {
        // calc elapsed time
        const realtimeNow: MilisecsSinceEpoch = this.getRealtimeTimestamp();
        const elapsedRealtimeTime: number = realtimeNow - this.lastRealtimeTimestamp;
        this.lastRealtimeTimestamp = realtimeNow;

        return elapsedRealtimeTime;
    }

}