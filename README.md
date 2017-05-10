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

* If want auto refresh, add this :
```
@nohup /home/pi/Desktop/reservasi/run.sh & </dev/null
```

* run.sh
```
#!/bin/bash
while true
do
    bash /home/pi/Desktop/reservasi/refresh.sh
    sleep 60
done
```

* refresh.sh
```
WID=$(xdotool search --onlyvisible --class chromium|head -1)
xdotool windowactivate ${WID}
xdotool key ctrl+F5
```

## Change Timezore Raspy
1. sudo raspi-config
2. Internationalization options
3. Change Time Zone
4. Select geographical area
5. Select city or region.
6. Reboot your pi.
