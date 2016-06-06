# Scream 5

A series of crowd based yelling games for [Barkley's](http://barkleyus.com/) 2016 annual meeting.


## About / Setup

Capturing streaming audio from multiple microphone inputs using a single web browser appears to be impossible. To resolve this issue, this project utilizes both Google Chrome and Google Chrome Canary to send microphone data to a single processing source.

The capture interfaces must be loaded in separate browsers (NOT separate windows of the same browser!). The capture interfaces are located at `/capture?stage=left` and `/capture?stage=right`.

Additionally, two separate aggregate devices must be setup using the Audio Midi Setup panel on OSX. You should name these channels 'left' and 'right'.

For best results, adjust the settings on each browser and check "Allow all sites to use system exclusive messages to access MIDI devices". This setting can be found by clicking on the video/audio manager icon in the browser's url entry field, then clicking "Manage Microphone Settings".



## Config - /config
Set configuration options for each game. This interface can be reached via a mobile device if on the same network as the machine running the games. Visit `http://localhost:3000/config` to operate.



## Capture - /capture
An interface required to capture the left and right channel data. Pass in a query key of `stage` to use. Accepted routes are `/capture?stage=left` and `/capture?stage=right`.



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
