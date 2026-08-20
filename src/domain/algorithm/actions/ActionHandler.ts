import { Identifiable } from "../../common/EntityStores.js";
import { GenericNode, GenericMessageData } from "../data/AlgoData.js";

//* the current design implementaiton
//
// simulation snapshot is like image thats capturing
// a moment of real world
// which nodes exist in rl, edges, messages
//
// the simulation is the chain of snapshots, like a video irl
// is just the chain of images
//
// engine gets a snapshot and does  stuff
// on this current time
// -L engine producs new snapshots
// engine is nog only the internet but the entire real world
// executioner
//
// Node is programm on computer
// gets the environment to interact with world
// so the algorithmProtocol class is actually
// a running node instance
// this isntance gets triggerd either by
// incming msg from lower sysetme
// or from init cmd from above
//
// msg system is udp...
// if the msg is not received cause node is offline 
// the msg gets lost
// also id is like ip+port of node programm.. and it
// is expected to always work... so no misconfigured ip
// configs (node receives nothing) need to be simulated obv
// or also not that node can block ips etc
// with udp the id is lie open ip+port for every
// udp msg
// future3: make msgs to be tcp... mb a setting could set that 
// for the simulation
//
// !
// everyhting that reallife admin would do gets into
// the engine via cmd and handles instant (s. more by features)
// ---
// and everyting that the process would or could do is 
// done via the environment
// he can log, see data, get pending msgs and send stuff
// graph is either static made by admin through instant cmd/irl action
// or the algo can handle dynmaic changes implemented through messages
//? -> all environment systems are simulated by the simulation
//
// when coding a new node process i dont
// see or care if this would actually be a node in my
// sim or for a reallife node because of the node environment
// -> feels real and clean i feel like
//
// the initiation rules would also be obsolete that way
// cause irl u cant know if someelse also did init
// algo has to handle that
// ... the rules could just be "info for user"... which would
// also be displayed irl .. "hey this algo is not for parallel... do 
// you know what youre doing??"
//
//* erro handling
//
// if i mess sth up and a
// exceptioies flies cause a obj does not exist
// thats fine cause i faield and made the sim invali
//
// all other errors are stuff that could happen irl
// and would need to be handled
// -> developer of process decides
// just log it? kill node? inform nodes? (see features)
//
// in a node process a exceoption could
// - be from invalid received msg -> gets ignored
// node state is not affected by this... but developer
// would be interest to see why algo behaves weird
// "why is this node still not finished"....
// therefore a log on invalid msg would be good... mb an error log
// so it gets highlighted
// -> sim can continue to run tho
//
// if node process somehow is in invalid state
// e.g. nötiger wert nicht gesetzt
// e.g. nachbar nicht verfügbar
// -> kann ja au legit irl passiern weil da au jmd
// des ding coded und au lowlevel festlegt... wenn da nen 
// human error ist muss des ding damit klarkommen
// sim can continue aswell... in rl there would need to be a 
// fix aswell
// -> nb a log.... and node goes unresponsive etc
// so admin would need to check why algo is not advending... sees
// the node logged sth... "Oh thats why" 
// admin can then decide what to do... restart node... or algo
// can do the same in sim
// and benefit of sim is ja even that u see stuff like that
// directly on the big picture... instead of running from oc to pc
// and checking the logs
// node könnte au in ner advanced future in enn stuck mode gehen, des ding 
// lgoo au loggen dass man sieht was problem is aber dann wartet
// es darauf dass developer es neu startet
// wär nen cmd in sim... und algo muss des dann handln könn logo
// aber einfach variatne bisher node get einfach in stuck
// dass developer es sieht und dann des ganze ding neustarte nach
// error fix (irl und sim)
//
//* feature ideen
//
// if edge gets added /removed, an admin would do this
// not in the programm but outside in the lower environment layer
// for messages in... on both nodes if edge must be 2points
// or only on one if it is 1point
// this new "config" would be regarded by the outsystem because
// it knows the edge type and can therefore validate
// -> there could also be a msg for dynmamic edge adding
// without admin but that woudl be future2 even.. so ignore
//
// node deletion could go two routes
// outside shutdown of pc in reallife would be cmd into engine
// to set node to inactive..
// and also the edges would need to be adjusted cause admin would 
// change them manually on each lower level in environment in 
// reallife instanlty... so engine would adjust them aswell
// with simple way to just delete all msgs.. or make them
// onepoint from inactive edge only... or just let them be
// and msgs get lost... could work if algo excepts udp and
// does not need msg 100% delivery like tcp (realiable msg delivery)
// all remaining pending msgs to this time get lost
// (unless tcp is simulated which would be future3 lmaoo)
// ... v2 woudl bedynmaic edge deletion is future2 again
//
// node creation same as deletion
// cmd to timestamp... node gets added/ set to active
// while instantly the admin updates the low level outsystem for each
// node to containg the new edge
// then run of sim continues... either he gets a msg or can also init etc
// future2: he would ask neighbors and edges are added dynm
//
// 2pt and 1pt edges could also be added
// out system is in rl configured by admin.. he says which neighbors
// this node can inform... so this node can send stuff
// ... sim is reallife so node can send via udp stuff
// receiver does not need to know cause sim just says here is msg
// and node receives it
// -> would be cmd at time x and be instant for all because admin did
// it for all
// future2: dynmaic edge adding/deltion by node requesting
// it from the out system
//

export interface NodeProcessEnvironment {
    in: ISystemIncomingMessages,
    out: ISystemOutgoingMessages,
    local: ISystemLocalData,
    up: ISystemLogging
}


/**
 * Lists all Log Actions
 * available to Algorithm
 */
export abstract class ISystemLogging {

    public abstract log(msg: string): void;

}


export abstract class ISystemIncomingMessages {

}

/**
 * Lists all Message Actions
 * available to Algorithm
 */
export abstract class ISystemOutgoingMessages {

    /**
     * 
     * @param msg 
     * @param receiver 
     * @throws {IdentifiableError} if given edge does not exist. RealWorld Analogy: tcp handshake neccessary
     */
    public abstract send(msg: GenericMessageData, receiver: Identifiable): void;

    public abstract getNeighbors(): MapIterator<Readonly<Identifiable>>;
    public abstract getNeighborCount(): number;

}



export type MutableNodeKeys<N extends GenericNode> =
    Exclude<keyof N, keyof GenericNode> // is union

/**
 * Lists all Node Actions
 * available to Algorithm
 */
export abstract class ISystemLocalData<N extends GenericNode> {

    /**
     * Allows to read all node properties
     */
    public abstract get<K extends keyof N>(
        property: K
    ): Readonly<N[K]>;

    /**
     * Allows to write mutable node properties
     */
    public abstract set<K extends MutableNodeKeys<N>>(
        property: K, value: N[K]
    ): void;

}