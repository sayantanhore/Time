import moment from 'moment';
export class TimezonesService {
  constructor($http) {
    'ngInject';
    this.$http = $http;
  }
  getZonalTime(timeGap) {
    let hours = Math.floor(Math.abs(timeGap));
    let minutes = Math.round((Math.abs(timeGap) - hours) * 100);
    if (timeGap < 0) {
      return moment().utc().subtract(hours, 'hours').subtract(minutes, 'minutes').format('LLL');
    } else {
      return moment().utc().add(hours, 'hours').add(minutes, 'minutes').format('LLL');
    }
  }

  getTimezones() {
    return this.$http({
      method: 'GET',
      url: '/timezones'
    });
  }
}
