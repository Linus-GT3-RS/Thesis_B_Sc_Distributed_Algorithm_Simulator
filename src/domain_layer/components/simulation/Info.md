
# the current design implementaiton

and point of doing a simulation instead of using real stuff
is to be able to visualize and inspect all the elements u couldnt
    in reallife..like traveling messages..all nodes at once
or current edge state etc etc
    -> a simulation snapshot presenter takes in a snapshot
and decides what to display and in what detail the
"outside" should be informed..he decides what is relevant
to simulation viewer


### important
    everyhting that reallife admin would do gets into
the engine via cmd and handles instant(s.more by features)
---
    and everyting that the process would or could do is 
done via the environment
he can log, see data, get pending msgs and send stuff
graph is either static made by admin through instant cmd / irl action
or the algo can handle dynmaic changes implemented through messages
    ? -> all environment systems are simulated by the simulation

when coding a new node process i dont
see or care if this would actually be a node in my
sim or for a reallife node because of the node environment
    -> feels real and clean i feel like



## NodProcess error handling

in a node process a exceoption could
    - be from invalid received msg -> gets ignored
node state is not affected by this... but developer
would be interest to see why algo behaves weird
"why is this node still not finished"....
therefore a log on invalid msg would be good... mb an error log
so it gets highlighted
    -> sim can continue to run tho

if node process somehow is in invalid state
e.g.nötiger wert nicht gesetzt
e.g.nachbar nicht verfügbar
    -> kann ja au legit irl passiern weil da au jmd
des ding coded und au lowlevel festlegt... wenn da nen 
human error ist muss des ding damit klarkommen
sim can continue aswell... in rl there would need to be a 
fix aswell
    -> nb a log.... and node goes unresponsive etc
so admin would need to check why algo is not advending...sees
the node logged sth... "Oh thats why" 
admin can then decide what to do... restart node... or algo
can do the same in sim
and benefit of sim is ja even that u see stuff like that
directly on the big picture... instead of running from oc to pc
and checking the logs
node könnte au in ner advanced future in enn stuck mode gehen, des ding 
lgoo au loggen dass man sieht was problem is aber dann wartet
es darauf dass developer es neu startet
wär nen cmd in sim... und algo muss des dann handln könn logo
aber einfach variatne bisher node get einfach in stuck
dass developer es sieht und dann des ganze ding neustarte nach
error fix(irl und sim)


