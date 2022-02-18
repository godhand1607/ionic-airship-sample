import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

// Cordova imports
import { UrbanAirShip } from '@ionic-native/urbanairship/ngx';

const uaConfig = {
  development: {
    appKey: '',
    appSecret: ''
  },
  production: {
    appKey: '',
    appSecret: ''
  }
};


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private urbanAirship: UrbanAirShip,
  ) {

    this.initializeApp();

  }

  async initializeApp() {
    await this.platform.ready();
    this.setupPushNotifications();
  }

  async setupPushNotifications() {
    await this.takeOff();

    this.getDeeplinkOnLaunch((deepLink) => {
      alert(JSON.stringify({ from: 'getDeeplinkOnLaunch', ...deepLink }));
    });

    this.addDeeplinkEventListener((event) => {
      alert(JSON.stringify({ from: 'addDeeplinkEventListener', ...event }));
    });

    this.checkAndEnableNotifications();
  }

  async takeOff() {
    return await this.urbanAirship.takeOff(uaConfig);
  }

  async getDeeplinkOnLaunch(cb) {

    try {
      const result = await this.urbanAirship.getDeepLink(true);
      cb(result);
    } catch (e) {
      console.log('UA getDeeplinkOnLaunch ERR: ', e);
    }
  }

  addDeeplinkEventListener(cb) {
    document.addEventListener('urbanairship.deep_link', cb);
  }

  async checkAndEnableNotifications() {
    try {
      const enabled = await this.urbanAirship.isUserNotificationsEnabled();
      if (!enabled) {
        this.enableNotifications();
      }
    } catch (e) {
      console.log('UA isUserNotificationsEnabled ERR: ', e);
    }
  }

  async enableNotifications() {
    try {
      const enabled = this.urbanAirship.setUserNotificationsEnabled(true);
      console.log('User notifications are enabled! Fire away! ', enabled);
    } catch (e) {
      console.log('UA ENABLE USER NOTIFICATIONS ERR: ', e);
    }
  }

}
