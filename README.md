# ionic-airship-sample


## Prerequisites

1. NodeJS v16.14.0 or higher
2. Install Ionic CLI, `npm install -g @ionic/cli@6.17.0`
3. Install Cordova CLI, `npm install -g cordova@10.0.0`

## iOS app build
1. Install dependencies, `npm install`
2. Install cordova-ios, `ionic cordova platform add ios@6.2.0`
3. Update Airship config in `src/app/app.component.ts` (uaConfig)
4. Update bundle id in `config.xml` (widget.id)
5. Run ios app build, `ionic cordova build ios`
6. Open xcode project, `platforms/ios/ionic-airship-sample.xcworkspace`
