# Ishihara App

Ishihara is a proof of concept developed by Modus Create. This experimental app tests for color blindness using Ishihara plates and is built on Ionic, Stencil, and AWS

## Getting Started

To start building, clone this repo to a new directory:

```bash
npm install
```

## Production

To build for production, run:

```bash
npm run build
```

A production build includes:

* Minified code bundles
* Generated Service workers
* App manifest


## Service Workers

Service workers are generated via the Stencil build tool. For more information on how they can be configured, see the [Service Worker docs](https://stenciljs.com/docs/service-workers).

## Developing with a Service Worker

For most cases, you'll want to develop your app without generating a Service Worker. But if you'd like to test out Web Push Notifications or Background Sync, you'll need to have one generated. To generate a Service Worker during dev builds, we've added the npm script:

```
npm run start.sw
```

This will start a dev build and generate a Service Worker as well.

## Unit Tests

To run the unit tests once, run:

```bash
npm test
```

To run the unit tests and watch for file changes during development, run:

```bash
npm run test.watch
```

## Deployment to distribution platforms 

### Submitting to the iOS App store:

Requirements

* Xcode
* Apple Developers account
* A valid provisioning profile
* App Development and Distribution certificates

if plaform is not added, be sure to add it 

```bash
 npx capacitor add ios
```

```bash
 npx capacitor run ios
```

## Generating Signing Certificates

To create the certificates and profiles needed, contact the IOS department or visit [Apple's member center](https://help.apple.com/xcode/mac/current/#/dev3a05256b8)  and follow the links described in Apple's documentation.

There are two types of certificates that matter here, Development, and Distribution. Development Certificates are just that, meant for development time. They are meant to sign an app and deploy it to devices that the certificate has access to.

Distribution certs are meant for distributing an app to the store. When an app is signed with a Distribution cert, it can be installed on any device.


## Signing the App in Xcode.

After generating the correct certificates, there are options to either have Xcode automatically manage certificates or manually manage them. It's suggested to let Xcode automatically manage certificates. This will make sure that the correct Development and Distribution certs are used, based on the build type selected.

With this option selected, select Archive from the Product > Archive menu. This will build a version of the app that is ready for distribution in the app stores. After archive has been created, Xcode Organizer is opened.

Xcode Organizer displays a list with builds of the current app. Pick the last build and click 'Upload to App Store'. There should be a place to select the team followed by some more information on the app and a "Upload" button to click.

If the upload successfully, the app should be listed on iTunes Connect and listed in 'Activities'. From there, TestFlight can be enabled for beta testing, or the App can be sent for approval from Apple.


## Updating the App 

An app can be updated by either submitting a new version to Apple.

NB: In order for the iOS App Store to accept the updated build, the config.xml file will need to be edited to increment the version value, 
    then rebuild the app for release following the same instructions above.


### Submitting to the Google play store:

To generate a release build for Android, build your web app and then run the following cli command

```bash
npx cap copy && npx cap sync
```

This will copy all web assets and sync any plugin changes.

Next, open Android studio:

```bash
npx cap open android
```
### To create an AAB binary locally using Android Studio:

* Open the Build menu
* Choose Generate Signed Bundle / APK
* Follow the prompts to sign the AAB with your keystore file

[Read more for complete documnetation](https://developer.android.com/studio/publish/app-signing)

Now that a release AAB/APK has been generated, [Google Play Store Developer Console](https://play.google.com/console/developers) is needed to upload to playstore.

* Create an Application (This is already created for Ishihara)
* Be sure to fill out the description for the app along with providing screenshots and additional info. When ready, upload the signed release 
  AAB/APK that was generated and publish the app.

## Updating the app

An app can be updated by either submitting a new signed version to the Google Play Store

NB: In order for the Google Play Store to accept updated AAB/APK, the android/app/build.gradle file will need to be edited to increment 
    the versionCode value, then rebuild the app for release following the instructions above.