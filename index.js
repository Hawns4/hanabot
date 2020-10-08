const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "-";
client.once("ready", () => {
  console.log("Ready!");
});

client.login("Njk3OTc3Mzk0MTkwODc2Njky.XvacGQ.5SUNPrNY7Dc3oVCwOBtlsiUOX00");

client.on("message", (message) => {
  if (message.content.startsWith(prefix) || !message.author.bot) {
    const args = message.content.slice(prefix.length).split(" ");
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
