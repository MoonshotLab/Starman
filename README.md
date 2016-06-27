# Starman

A series of video games which are controlled via sound input.


## Config
Configuration options for each game can be set at /lib/utils.js.


## Moonshooter - /moonshooter
Reach a volume between a high and low threshold to build power. Once enough power is created, the rocket is launched.

### Config
* Sensitivity - Divides the result of the halved combined channel volume
* Lo Threshold - The lowest acceptable volume to trigger an increase in power
* Hi Threshold - The highest acceptable volume to trigger an increase in power



## Office Space - /office-space
Navigate a 2d landscape using stage left and stage right volume to control left and right boosters.

### Config
* Sensitivity - Divides each channels volume
* Lo Threshold - Not used
* Hi Threshold - Not used



## Star Twerk, the Y Generation - /star-twerk
Speak the right tone at the right time to make the dancer dance.

* Sensitivity - Divides the result of the halved combined channel volume
* Lo Threshold - The lowest acceptable volume to trigger an action
* Hi Threshold - Not used
