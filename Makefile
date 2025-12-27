.PHONY: dev dev-lan emulator-android

dev:
	npx expo start --clear

dev-lan:
	REACT_NATIVE_PACKAGER_HOSTNAME=10.42.0.1 npx expo start --lan --clear

emulator-android:
	adb kill-server
	adb start-server
	emulator -avd Pixel_Dev -gpu host -dns-server 8.8.8.8 -no-snapshot-load &