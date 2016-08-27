import $ from 'jquery';
import * as d3 from 'd3';
import angular from 'angular';
describe('Application', () => {
  it('should load jquery', () => {
    expect($).toBeDefined();
    expect(d3).toBeDefined();
    expect(angular).toBeDefined();
  });
});