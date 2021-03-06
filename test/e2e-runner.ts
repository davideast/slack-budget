var Jasmine = require('jasmine');
var SpecReporter = require('jasmine-spec-reporter');

var jrunner = new Jasmine();
jrunner.configureDefaultReporter({print: () => {}});    // jasmine < 2.4.1, remove default reporter logs
jrunner.env.clearReporters();                       // jasmine >= 2.5.2, remove default reporter logs
jrunner.addReporter(new SpecReporter());            // add jasmine-spec-reporter
jrunner.loadConfig({
    "spec_dir": "dist",
    "spec_files": [
        "**/*.e2e.js"
    ]
});                           // load jasmine.json configuration
jrunner.execute();