const Discord = require("discord.js");
const client = new Discord.Client();
client.once("ready", () => {
  console.log("Ready!");
});

const config = require("./config.json"); // Prefix and token
client.login(config.token);

client.on("message", (message) => {
  if (message.content.startsWith(config.prefix) || !message.author.bot) {
    const args = message.content.slice(config.prefix.length).split(" ");
    switch (args[0]) {
      case "hzv":
        message.channel.send("Hitzone value");
        break;
      case "ke":
        message.channel.send("Kinsect extracts");
        break;
      default:
        message.channel.send("Idiot");
        break;
    }
  }
});
