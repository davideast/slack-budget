"use strict";
var command_rules_1 = require('./command-rules');
function command(post) {
    return parseCommand(post, command_rules_1.allRules);
}
exports.command = command;
/**
 * Reads a command from Slack and creates a set of instructions
 */
function parseCommand(post, commandRules) {
    var instructions = commandRules.map(function (rule) {
        if (rule.match(post.text)) {
            return rule.buildInstructions(post);
        }
    });
    return instructions;
}
exports.parseCommand = parseCommand;
