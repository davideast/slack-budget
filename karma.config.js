module.exports = function(config) {
  config.set({
    basePath: './test',
    files: [
       '**/*.test.js'
    ],
    frameworks: ['jasmine'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    reporters: ['mocha'],
    singleRun: false
  });
};