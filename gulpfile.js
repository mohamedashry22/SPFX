'use strict';

const build = require('@microsoft/sp-build-web');

build.lintCmd.enabled = false;
build.LintCmdTask.enabled= false;
build.lintCmd.enabled = false;
build.tslintCmd.enabled = false;

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));