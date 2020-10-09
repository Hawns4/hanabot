const fs = require('fs');
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('/js'));
commandFiles.forEach(file => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
})

client.once("ready", () => {
  console.log("Ready!");
});


client.login(token);

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();

  switch (command) {
    case "hzv":
      client.commands.get(command).execute(message, args);
      break;
    default:
      message.channel.send("That isn't a command");
      break;
  }

});
