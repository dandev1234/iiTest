module.exports = {
    default: {
        timeout: 20000, // Increase timeout to 20 seconds
        require: ["step_definitions/*.js", "world.js"],
        format: ["progress-bar", "json:reports/cucumber_report.json"],
        publishQuiet: true
    }
};
