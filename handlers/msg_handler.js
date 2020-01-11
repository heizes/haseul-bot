const { resolveMember } = require("../functions/discord.js");
const { Client } = require("../haseul.js");

const client = require("../modules/client.js");
const commands = require("../modules/commands.js");
const emojis = require("../modules/emojis.js");
const instagram = require("../modules/instagram.js");
const lastfm = require("../modules/lastfm.js");
const levels = require("../modules/levels.js");
const media = require("../modules/media.js");
const misc = require("../modules/misc.js");
const moderation = require("../modules/moderation.js");
const notifications = require("../modules/notifications.js");
const patreon = require("../modules/patreon.js");
const profiles = require("../modules/profiles.js");
const reps = require("../modules/reps.js");
const roles = require("../modules/roles.js");
const servers = require("../modules/servers.js");
const twitter = require("../modules/twitter.js");
const users = require("../modules/users.js");
const utility = require("../modules/utility.js");
const vlive = require("../modules/vlive.js");

const serverSettings = require("../modules/server_settings.js");

exports.handleMsg = async function(message) {

    if (message.system) return;
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let { author, content, guild } = message;
    let prefix = serverSettings.get(guild.id, "prefix");

    if (content.startsWith(prefix)) {
        let args = content.slice(1).split(/\s+/);
        message.member = await resolveMember(guild, author.id, message.member);
        processCommand(message, args);
    }

    if (message.mentions.users.has(Client.user.id)) {
        let args = content.split(/\s+/);
        message.member = await resolveMember(guild, author.id, message.member);
        processMention(message, args);
    }

    processMessage(message);

}

async function processCommand(message, args) {
    client.onCommand(message, args);
    commands.onCommand(message, args);
    emojis.onCommand(message, args);
    instagram.onCommand(message, args);
    lastfm.onCommand(message, args);
    levels.onCommand(message, args);
    media.onCommand(message, args);
    misc.onCommand(message, args);
    moderation.onCommand(message, args);
    notifications.onCommand(message, args);
    patreon.onCommand(message, args);
    profiles.onCommand(message, args);
    reps.onCommand(message, args);
    roles.onCommand(message, args);
    servers.onCommand(message, args);
    twitter.onCommand(message, args);
    users.onCommand(message, args);
    utility.onCommand(message, args);
    vlive.onCommand(message, args);
}

async function processMention(message, args) {
    emojis.onMention(message, args);
}

async function processMessage(message) {
    levels.onMessage(message);
    notifications.onMessage(message);
    roles.onMessage(message);
    servers.onMessage(message);
}
