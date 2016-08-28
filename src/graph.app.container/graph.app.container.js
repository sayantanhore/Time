import _ from 'lodash';
import moment from 'moment';
export class GraphAppContainerCtrl {
  constructor($scope, timezones) {
    'ngInject';
    this.timezones = timezones;
    this.getTimezones();
    this.desiredTime = moment().format('LLL');
  }
  getTime($event) {
    let place = angular.element($event.target).html().trim();
    let timezone = _.pickBy(this.allTimezones, (zone, time) => {
      if (_.isEqual(zone, place)) {
        return time;
      }
    });

    this.desiredTime = this.timezones.getZonalTime(_.toNumber(_.invert(timezone)[place]));
  }
  getTimezones() {
    function successCallback(res) {
      this.allTimezones = res.data.timezones;
      this.cities = _.keys(_.invert(res.data.timezones));
    }
    function errorCallback(res) {
      console.log('error');
    }
    this.timezones.getTimezones()
      .then(successCallback.bind(this), errorCallback.bind(this));
  }
}

export function GraphAppContainerComp() {
  return {
    restrict: 'E',
    controllerAs: '$ctrl',
    scope: {},
    controller: GraphAppContainerCtrl,
    link: function(scope, elem, attrs) {
      console.log(elem.prop('offsetHeight'));
      let sidebar = angular.element(elem[0].querySelector('.sidebar'));
      let offsetHeight = sidebar.prop('offsetHeight');
      let scrollHeight = sidebar.prop('scrollHeight');
      sidebar.prop({'scrollTop': parseFloat(scrollHeight - offsetHeight) / 2});

      console.log(sidebar.prop('scrollTop'));
    },
    templateUrl: 'src/graph.app.container/graph.app.container.html'
  }
}
