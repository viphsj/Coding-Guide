<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Android Setup](#android-setup)
- [Clone Source](#clone-source)
- [Generating Signed APK](#generating-signed-apk)
- [Rock & Roll](#rock--roll)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---
title: ReactNative Android Setup
date: 2016-03-03 08:48:05
tags: React-Native
---

## Android Setup
> https://facebook.github.io/react-native/docs/android-setup.html

1. install git, npm, java
2. ``$ brew install android-sdk``
3. ``$ vim ~/.bashrc`` && ``$ vim ~/.bash_profile`` && them all add the following:

	> export ANDROID_HOME=/usr/local/opt/android-sdk

4. ``$ android`` and config the Android SDK

## Clone Source
1. ``$ git clone source``
2. ``$ cd source_folder``
3. ``$ git pull origin staging``
4. ``$ npm install``
5. ``$ npm install -g react-native-cli``
6. ``$ brew install watchman``

## Generating Signed APK
> https://facebook.github.io/react-native/docs/signed-apk-android.html

1. ``$ keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000``
2. config and get the file ``my-release-key.keystore``, move it to ``android/app`` directory in your project folder
3. ``$ vim ~/.gradle/gradle.properties``
4. add the following (replace ***** with the correct keystore password, alias and key password)

```
MYAPP_RELEASE_STORE_FILE = my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS = my-key-alias
MYAPP_RELEASE_STORE_PASSWORD = *****
MYAPP_RELEASE_KEY_PASSWORD = *****
```

## Rock & Roll
1. ``$ android avd``
2. create an android device && start it
3. ``$ react-native run-android``
4. tips: if you close the shell, to re-listening the change in your project, ues ``$ npm start`` || ``$ react-native start``