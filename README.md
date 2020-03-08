# ReactNativeTuto

Tutorial React native + Redux from openclassrooms.com : https://openclassrooms.com/fr/courses/4902061-developpez-une-application-mobile-react-native


## Link to expo project :
https://expo.io/@linxuhao/ReactNativeTuto

## Link to Britise :
https://app.bitrise.io/app/cfcf42c241d28253#/builds

## Test Dependencies (Already included in the package.json, no need to reinstall manually): 

Jest for test : https://jestjs.io/docs/en/getting-started.html

Husky to launch test automaticly on git hook : https://github.com/typicode/husky

## To start the App:
### Run "npm install" to get all the dependencies installed before you try to start the app

Because of outdated react version, react native and react native devtools are both low, you need to use "react-devtools@^3" in order to debug this with react devtools : run "npm uninstall -g react-devtools" to uninstall already installed react devtools and run "npm install -g react-devtools@^3". And run "react-devtools" to use it.

### Type in console: npm run android (i don't have Mac so i never tested "npm run ios")


## To build realease for Android

Create a assets folder under "{react_native_project_folder}/android/app/src/main"

And in project root folder run "react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res" to build the js bundle in that folder

And finally run "cd android" and "./gradlew assembleRelease -x bundleReleaseJsAndAssets"

The APK is in "{react_native_project_folder}\android\app\build\outputs\apk\release"
