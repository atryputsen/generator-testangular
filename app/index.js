'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var TestangularGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
    if (typeof this.env.options.appPath === 'undefined') {
      this.env.options.appPath = this.options.appPath;

      if (!this.env.options.appPath) {
        try {
          this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
        } catch (e) {}
      }
      this.env.options.appPath = this.env.options.appPath || 'app';
      this.options.appPath = this.env.options.appPath;
    }

    this.appPath = this.env.options.appPath;
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Testangular generator!'));
    //this.appname = this.appname || path.basename(process.cwd());
    //this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
    var prompts = [{
        name: 'appname',
        message: 'Enter angular app name:',
        default: path.basename(process.cwd())
    }];

    this.prompt(prompts, function (props) {
      this.appname = props.appname;

      done();
    }.bind(this));
  },

  app: function () {
    this.directory('skeleton/','./');
    this.template('skeleton/js/configuration.js','./js/configuration.js');
    this.template('skeleton/js/setup.js','./js/setup.js');
    this.template('skeleton/bower.json','./bower.json');
    this.template('skeleton/Gruntfile.js','./Gruntfile.js');
    this.template('skeleton/index.html','./index.html');
    this.template('skeleton/package.json','./package.json');
  }
});

module.exports = TestangularGenerator;
