describe('Timezone service', () => {
  let timezones, $httpBackend;
  beforeEach(angular.mock.module('graph'));
  beforeEach(inject((_timezones_, _$httpBackend_) => {
    timezones = _timezones_;
    $httpBackend = _$httpBackend_;
  }));
  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  it('should calculate zonal time backward', () => {
    let timeGap = -3.30;
    let localTime = 10.20;
    let zonalTime = moment().subtract(3, 'hours').subtract(30, 'minutes').format('LLL');
    expect(timezones.getZonalTime(timeGap)).toBe(zonalTime);
  });
  it('should calculate zonal time forward', () => {
    let timeGap = 10.00;
    let localTime = 10.20;
    let zonalTime = moment().add(10, 'hours').add(0, 'minutes').format('LLL');
    expect(timezones.getZonalTime(timeGap)).toBe(zonalTime);
  });
  it('should fetch timezones', () => {
    $httpBackend.when('GET', '/timezones').respond({
      timezones: {
        'time1': 'zone1',
        'time2': 'zone2'
      }
    });
    timezones.getTimezones()
      .then((response) => {
          console.log(response.data);
          expect(response.data).toEqual({
            timezones: {
              'time1': 'zone1',
              'time2': 'zone2'
            }
          });
      });;
    $httpBackend.flush();
  });
});