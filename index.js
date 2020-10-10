const fs = require('fs');
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
commandFiles.forEach(file => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

client.on("ready", () => {
  console.log("Ready!");
});

client.login(token);

//Command handling
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return; // Ignore all bot/non-command messages

  // Get message command
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return; // Check if command exists

  const command = client.commands.get(commandName); // Get the command

  // Check if command arguments are met
  if (command.args && !args.length) {
    if (command.usage) {
      return message.channel.send(`The proper syntax for \`${prefix}${command.name}\` is: \`${prefix}${command.name} ${command.usage}\``)
    }
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command.');
  }

});
