# Scream 5

A series of crowd based yelling games for [Barkley's](http://barkleyus.com/) 2016 annual meeting.


# Config - /config
Set configuration options for each game.



# Capture - /capture
An interface required to capture the left and right channel data. Pass in a query key of `stage` to use. Accepted routes are `/capture?stage=left` and `/capture?stage=right`.



# Moonshooter - /moonshooter
Reach a volume between a high and low threshold to build power. Once enough power is created, the rocket is launched.

### Config
* Sensitivity - Divides the result of the halved combined channel volume
* Lo Threshold - The lowest acceptable volume to trigger an increase in power
* Hi Threshold - The highest acceptable volume to trigger an increase in power



# Office Space - /office-space
Navigate a 2d landscape using stage left and stage right volume to control left and right boosters.

### Config
* Sensitivity - Divides each channels volume
* Lo Threshold - The lowest acceptable volume to trigger an increase in power
* Hi Threshold - Not used



# Star Twerk, the Y Generation - /star-twerk
Speak the right tone at the right time to make the dancer dance.

* Sensitivity - Divides the result of the halved combined channel volume
* Lo Threshold - The lowest acceptable volume to trigger an action
* Hi Threshold - Not used
