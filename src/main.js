import angular from 'angular';
import $ from 'jquery';
import * as d3 from 'd3';
import _ from 'lodash';
import {TimezonesService} from './services/timezones.service';
import {GraphAppContainerCtrl, GraphAppContainerComp} from './graph.app.container/graph.app.container';


// Module: app - Holds the application
let graph = angular.module('graph', []);

graph.service('timezones', TimezonesService);
graph.controller('graphAppContainerCtrl', GraphAppContainerCtrl);
graph.directive('graphAppContainer', GraphAppContainerComp);
