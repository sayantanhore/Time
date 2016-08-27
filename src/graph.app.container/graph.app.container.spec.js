import {GraphAppContainerCtrl} from './graph.app.container';

describe('Graph App Container controller', () => {
  let timezoneService, $rootScope, $q;
  let $scope, graphAppContainerCtrl;
  beforeEach(angular.mock.module('graph'));
  beforeEach(inject(($injector) => {
    timezoneService = $injector.get('timezones');
    $q = $injector.get('$q');
    spyOn(timezoneService, 'getTimezones').and.returnValue(
      $q.when({
        data: {
          timezones: {
            'time1': 'zone1',
            'time2': 'zone2'
          }
        }
      })
    );
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    graphAppContainerCtrl = new GraphAppContainerCtrl($scope, timezoneService);
  }));
  it('should pass', () => {
    graphAppContainerCtrl.getTimezones();
    $scope.$digest();
    expect(graphAppContainerCtrl.allTimezones).toEqual({
      'time1': 'zone1',
      'time2': 'zone2'
    });
    expect(graphAppContainerCtrl.cities).toEqual(
      ['zone1', 'zone2']
    );
  });
});