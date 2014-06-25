'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var utils = require('../utils.js');

var ServiceGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('You called the service subgenerator with the argument ' + this.name + '.');
    try {
		this.appname = require(path.join(process.cwd(), 'package.json')).name;
	} catch (e) {
		this.appname = 'Cant find name from package.json';
	}
  },

  files: function () {
    var serviceName = this.name;
    this.template('service.js', 'service/'+serviceName+'.js');
	this.template('spec.js', 'test/unit/service/'+serviceName+'.js');

    utils.forEachFile('', /\.html/,function(file){
        utils.addToFile(file,'<script src="service/'+serviceName+'.js"></script>',utils.SERVICE_JS_MARKER,'  ');
        console.log('updating ' + ' ' + serviceName + ' ' + file);
    });
  }
});

module.exports = ServiceGenerator;