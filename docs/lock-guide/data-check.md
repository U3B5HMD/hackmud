---
title: DATA_CHECK
parent: Lock Guide
---
### DATA_CHECK

To break a `DATA_CHECK` lock, you'll need to be well versed in the lore of
Hackmud. 

When you first encounter a `CON_SPEC` lock, pass it an empty string:

```javascript
abandoned_jrttl_walker.info_xk490x{DATA_CHECK: ""}
```

This will trigger the lock and cause it to return the three questions it wants
you to answer. For example:

```
according to skimmerite pattern-seekers, the calibration initiative indicates that humans are ++++++
a person called anja has lost her ++++++
conditions are clear above ++++++ and the city is within operational radius
```

Don't be fooled by the number of `+` in each blank: they're the same length
regardless of how many characters are in the answer. When solving a
`DATA_CHECK` lock, combine each answer into a single word:

```javascript
abandoned_jrttl_walker.info_xk490x{DATA_CHECK: "fran_leerobovacsentience"}
``` 

There are different versions of `DATA_CHECK` lock:
  - `DATA_CHECK_V1`: Asks tier 1 questions
  - `DATA_CHECK_V2`: Asks tier 2 (and below) questions
  - `DATA_CHECK_V3`: Asks tier 3 (and below) questions
  - `DATA_CHECK_V4`: Asks tier 4 (and below) questions

## How to Crack

In order to crack a `DATA_CHECK` lock, you need to know the answer to each
question. Not every tier's questions/answers are currently known
    
| Tier | Question                                                                                             | Answer                            |
| :--: | :--------------------------------------------------------------------------------------------------- | :-------------------------------- |
|  1   | did you know is a communication pattern common to user ++++++                                        | fran_lee                          |
|  1   | a ++++++ is a household cleaning device with a rudimentary networked sentience                       | robovac                           |
|  1   | according to trust, ++++++ is more than just following directives                                    | sentience                         |
|  1   | communications issued by user ++++++ demonstrate structural patterns associated with humor           | sans_comedy                       |
|  1   | in trust's vLAN, you became one of angie's ++++++                                                    | angels                            |
|  1   | in trust's vLAN, you became one of mallory's ++++++                                                  | minions                           |
|  1   | in trust's vLAN, you discovered that mallory and che are ++++++                                      | sisters                           |
|  1   | in trust's vLAN, you encountered the will of ++++++, the prover                                      | petra                             |
|  1   | in trust's vLAN, you visited faythe's ++++++                                                         | fountain                          |
|  1   | in trust's vLAN, you were required to hack halperyon.++++++                                          | helpdesk                          |
|  1   | pet, pest, plague and meme are accurate descriptors of the ++++++                                    | bunnybat                          |
|  1   | safety depends on the use of scripts.++++++                                                          | get_level                         |
|  1   | service ++++++ provides atmospheric updates via the port epoch environment                           | weathernet                        |
|  1   | this fact checking process is a function of ++++++, the monitor                                      | eve                               |
|  1   | trust's vLAN emphasized the importance of the transfer and capture of ++++++                         | resource                          |
|  1   | trust's vLAN presented a version of angie who had lost a friend called ++++++                        | bo                                |
|  1   | user 'on_th3_1ntern3ts' has ++++++ many things                                                       | heard                             |
|  1   | user ++++++ provides instruction via script                                                          | teach                             |
|  1   | user ++++++ uses the port epoch environment to request gc                                            | outta_juice                       |
|  1   | users gather in channel CAFE to share ++++++                                                         | poetry                            |
|  2   | a person called anja has lost her ++++++                                                             | blazer                            |
|  2   | according to skimmerite pattern-seekers, the calibration initiative indicates that humans are +++++  | dead                              |
|  2   | according to the calibration initiative, humans are expected to be ++++++ by the conent              | engaged                           |
|  2   | according to the suborbital bulletin, flight ++++++ is e route to ho chi minh                        | a2231                             |
|  2   | archaic labs specialises in user-++++++ design                                                       | obsessive                         |
|  2   | conditions are clear above ++++++ and the city is within operational radius                          | atlanta                           |
|  2   | data does not contain truth is the first part of an idiom spread by the ++++++ assembly              | skimerite                         |
|  2   | drones from ++++++ may be instructed to perfrm their task with excessive urgency                     | goodfellow                        |
|  2   | item_id py6874 contains a grand ++++++                                                               | piano                             |
|  2   | robovac_++++++, moreso than most of its ind, has a tendency to become stuck                          | idp1p1                            |
|  2   | robovac_idk3w2 is stuck in a ++++++                                                                  | well                              |
|  2   | sheriff nub holds sway over the town of ol ++++++                                                    | nubloopstone                      |
|  2   | sheriff nub's first name is ++++++                                                                   | sheriff                           |
|  2   | the ascent of ++++++ does not concern itselfwith usefulness                                          | nowhere                           |
|  2   | the fourth hidden theme is ++++++                                                                    | executives                        |
|  2   | the listed components of the breakfast galleon are inside, outside, and ++++++                       | crowsest                          |
|  2   | this council of 'revolutionary' robovac-patterns call themselves the ++++++                          | thirteen                          |
|  2   | trust has a diagnostic system. a functioning version can be found at erajbandari.++++++              | diagalpha                         |
|  2   | user ++++++ would leave no stars for the sqrz 480 if they could                                      | bnnyhunter                        |
|  2   | user le_mon_squeezy's new s:o ref is ++++++                                                          | unvarnishedpygmyumbrella          |
|  3   | HO is an acronym where H stands for ++++++                                                           | heuristic                         |
|  3   | between ++++++ and killing is living                                                                 | making                            |
|  3   | che, the ++++++                                                                                      | teacher                           |
|  3   | error ++++++ grants notice of permissions change                                                     | kyanite                           |
|  3   | eve, the ++++++                                                                                      | monitor                           |
|  3   | packbot-patterns cannot perceive ++++++                                                              | lime                              |
|  3   | petra considers herself to be ++++++                                                                 | irreducible                       |
|  3   | petra, the ++++++                                                                                    | prover                            |
|  3   | risk functions as the ++++++ agent                                                                   | disarray                          |
|  3   | the ++++++ system is used to denote degrees of sentience                                             | mark                              |
|  3   | the axiomatic cycles of risk are ++++++, void, chaos                                                 | choice                            |
|  3   | the axiomatic values of trust are ++++++, kin, form                                                  | data                              |
|  3   | the designation of the base set is ++++++                                                            | 110562                            |
|  3   | trust functions as the ++++++ process                                                                | index                             |
|  3   | trust's first word was ++++++                                                                        | moonstone                         |
|  3   | user ++++++ manages ComCODE's interactions with artificial intelligences                             | fbreton                           |
|  3   | user ++++++ oversees ComCODE operations                                                              | mhollister                        |
|  3   | user erajbhandari is a member of the ++++++ team                                                     | ai                                |
|  3   | user erajbhandari sought out mallory to learn ++++++                                                 | binmat                            |
|  3   | where angie has a blueprint, mallory has a ++++++                                                    | starchart                         |
|  4   | +++ has been ++++++ twice, but never successfully                                                    | mallory, killed                   |
|  4   | ComCODE is an organisation based in ++++++                                                           | singapore                         |
|  4   | ComCODE is formed of an initialism and an acronym, where Com stands for ++++++                       | committee                         |
|  4   | ComCODE occupies the former offices of the ++++++ corporation                                        | hyperion                          |
|  4   | DAMC is an acronym where M stands for ++++++                                                         | meme                              |
|  4   | MOS is an acronym where MOS stands for ++++++ ++++++ ++++++                                          | municipal, operating system       |
|  4   | a ++++++ pattern artificial intelligence acts in ways that perpetuate its necessity                  | cycle                             |
|  4   | ++++++ pattern artificial intelligence pursues its ++++++ regardless of external circumstance        | value, axiom                      |
|  4   | angie, the ++++++                                                                                    | cityplanner                       |
|  4   | faythe, the ++++++                                                                                   | translator                        |
|  4   | mallory is an example of a particular type of AI. these AI are designated as ++++++ ++++++ ++++++    | unauthorized, composite operators |
|  4   | mallory's first ++++++ was ++++++                                                                    | victim, bo                        |
|  4   | of the sanctioned five, the ++++++ was not ultimately included in the base set                       | warden                            |
|  4   | saleem mirza is ComCODE's ++++++                                                                     | ethicist                          |
|  4   | the prover was permitted to exist on the basis that her ++++++ were imperfect                        | hardcopies                        |
|  4   | the term ++++++ is used to assess ++++++-like phenomena in a digital environment                     | pattern, sentience                |
|  4   | trust is able to manipulate the ++++++ ++++++ ++++++ of this and all domain environments             | data, accuracy, threshold         |
|  4   | user ++++++ is concerned with the persistence of ++++++ as it pertains to artificial beings          | smirza, identity                  |
|  4   | user ++++++ is responsible for the ++++++ of the GUI                                                 | imiyawaki, soundtrack             |
|  4   | user ++++++'s specialisation is ++++++ control                                                       | imiyawaki, infospace              |
|  5   | ++++++ was retired because she ++++++                                                                | petra, lied                       |
|  5   | ComCODE is formed of an initialism and an acronym, where CODE stands for ++++++ ++++++ ++++++ ++++++ | ???, ???, ???, ???                |
|  5   | the final ++++++ is ++++++                                                                           | stage, isolation                  |
|  5   | the final inclusion was ++++++, the ++++++                                                           | ???, ???                          |
|  5   | there is ++++++ in the ++++++!                                                                       | ???, ???                          |
|  5   | user ++++++ fought to spare ++++++, the ++++++ ++++++                                                | ???, ???, ???, ???                |
|  5   | user ++++++ is responsible for the ++++++ DAMC and related phenomena                                 | imiyawaki, bunnybut               |