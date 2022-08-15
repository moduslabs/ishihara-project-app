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

## Deployment for test

To generate a new version for test for both platforms (iOS and Android), you will just push or merge the changes into the main branch. As you have a new change on the main, a workflow will start to build and deploy the apps on Google Play Console under the "Internal" track and on TestFlight in the Apple Store Connect.
Once the apps was deployed into the stores, there are some differents steps between them to make the app available for testers.

For iOS, you will need to assign the new for a tester lists which will receive an email to update the TestFlight version.
For Android, you just need do it for the initial configuration, where you should define the tester groups for the desired track, in our case the "Internal".


## Deployment to distribution platforms 

To update the app, you should create a new release with the desired version, this version will be used as the version name for the iOS and Android version.

For every release published, will be executed github actions triggering the AppFlow build and deploy process.
For the iOS, the new version will be release under TestFlight and for Android the track "Internal" will be used.

To promote for production on Apple Store Connect, you need create a new version in the production using the recently deployed version addint the release notes and other required infos.
To promote a android version, you can use the promote option from "Internal" track to "Production" also adding the release notes and other required infos.

After this process, both versions will be analyzed for the stores to be deployed into the public.

`
Obs: To automate the incremental number of the versions is used an "Action Secret" with the current production version. For every new release, the "ref_name" property will be used, therefore, the new version
will have the version defined for release. To be able to do this, is needed a token to update the
current version on every new release, so it's necessary update this token every time it expires.
`