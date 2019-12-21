const Discord = require("discord.js");
const config = require("./config.json");
const Client = new Discord.Client({disableEveryone: true});
module.exports = { Client };

const messages = require("./handlers/msg_handler.js");
const border = require("./handlers/border_handler.js");
const checklist = require("./handlers/ready_handler.js");

let initialised = false;

// -- Events --

// Debugging

Client.on("disconnect", closeEvent => {
    console.error(`Fatal error occured... Reason: ${closeEvent.reason}`);
})

Client.on("reconnecting", () => {
    console.log("Reconnecting...");
})

Client.on("error", error => {
    console.error(error);
})

Client.on("warn", warning => {
    console.error(warning);
})

// Discord

Client.on("ready", () => {
    console.log("Ready!");

    let botChannel = Client.channels.get(config.bot_channel);    
    botChannel.send("Ready!");

    if (!initialised) {
        checklist.handleTasks();
        initialised = true;
    }
})

Client.on("message", message => {
    messages.handleMsg(message);
})

Client.on("guildMemberAdd", member => {
    border.handleJoins(member);
})

Client.on("guildMemberRemove", member => {
    border.handleLeaves(member);
})

// -- Login --

Client.login(config.token);