const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "library",
    description: "shh",
    args: false,
    execute(message, args) {
        message.channel.send(new MessageAttachment("https://cdn.discordapp.com/emojis/454554627141009408.gif?v=1"));
    }
}