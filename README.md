# Pengumuman-LP

## Setup
* sudo nano /home/pi/.config/lxsession/LXDE-pi/autostart
* And paste this :
```
@xset s noblank

@xset s off

@xset –dpms

@chromium-browser --incognito --kiosk http://reservasi.lp.if.its.ac.id

```
