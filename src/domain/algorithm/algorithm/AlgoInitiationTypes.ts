
// defines how the State? handles
// an AlgorithmInitiationRequest
export enum AlgorithmInitiationTypes {

    // After the first InitiationRequest, no more
    // can be accepted.
    // The Simulation has to be restarted to set
    // a new InitiationRequest
    Single,

    // The number of InitiationRequests is not limited
    // and after the first InitReq more can be sent
    // no matter if the Engine is running or stopped
    Parallel,

    // after finished another run without 
    // restart is possible
    // Chained

};