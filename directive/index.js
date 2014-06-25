'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var utils = require('../utils.js');

var DirectiveGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('You called the directive subgenerator with the argument ' + this.name + '.');
    try {
		this.appname = require(path.join(process.cwd(), 'package.json')).name;
	} catch (e) {
		this.appname = 'Cant find name from package.json';
	}
  },
  askFor: function () {
  	var cb = this.async();

	var prompts = [{
		type:'confirm',
		name: 'needpartial',
		message: 'Does this directive need a partial html file?',
		default: true
	}];

	this.prompt(prompts, function (props) {
		this.needpartial = props.needpartial;

		cb();
	}.bind(this));
  },
  files: function () {
    var directiveName = this.name;

	if (this.needpartial){
		this.template('directive.js', 'directive/'+directiveName+'/'+directiveName+'.js');
		this.template('directive.html', 'directive/'+directiveName+'/'+directiveName+'.html');
		this.template('directive.less', 'directive/'+directiveName+'/'+directiveName+'.less');
		this.template('spec.js', 'test/unit/directive/'+directiveName+'/'+directiveName+'.js');


        utils.forEachFile('', /\.html/, function(file){
            utils.addToFile(file,'<script src="directive/'+directiveName+'/'+directiveName+'.js"></script>',utils.DIRECTIVE_JS_MARKER,'  ');
        });
        console.log('updating ' + ' ' + directiveName + ' ' + 'index.html');

		utils.addToFile('css/app.less','@import "../directive/'+directiveName+'/'+directiveName+'.less";',utils.DIRECTIVE_LESS_MARKER,'');
		console.log('updating ' + ' ' + directiveName + ' ' + 'app/app.less');
	} else {
		this.template('directive_simple.js', 'directive/'+directiveName+'.js');
		this.template('spec.js', 'test/unit/directive/'+directiveName+'/'+directiveName+'.js');

		utils.forEachFile('', /\.html/, function(file){
            utils.addToFile(file,'<script src="directive/'+directiveName+'.js"></script>',utils.DIRECTIVE_JS_MARKER,'  ');
        });
        console.log('updating ' + ' ' + directiveName + ' ' + 'index.html');
	}
  }
});

module.exports = DirectiveGenerator;