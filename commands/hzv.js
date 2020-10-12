const Discord = require('discord.js');
const fs = require("fs");

module.exports = {
    name: "hzv",
    description: "Displays Hitzone Value",
    args: true,
    usage: "<Monster Name> <Damage Type>",
    execute(message, args) {
        const validDamageTypes = ["Sever", "Blunt", "Ranged", "Fire", "Water", "Thunder", "Ice", "Dragon"];

        for (let i = 0; i < args.length; i++) {
            args[i] = args[i].charAt(0).toUpperCase() + args[i].slice(1);
        }

        try {
            let damageType = args[args.length - 1];
            if (validDamageTypes.includes(damageType)) {
                args.pop();
            } else {
                damageType = "Simple";
            }
            const monsterName = args.join("_");
            return message.channel.send(createEmbed(monsterName, damageType));
        } catch (err) {
            console.log(err);
            message.channel.send("I couldn't find a monster by that name.\nPlease check the spelling of the name and try again.");
        }
    },
};

createEmbed = (monsterName, damageType) => {
    let monsterData = JSON.parse(fs.readFileSync(`./data/${monsterName}.json`));
    monsterData = monsterData[damageType];
    let embeddedData = new Discord.MessageEmbed();
    embeddedData.setTitle(monsterName.split("_").join(" ")).attachFiles([`./data/${monsterName}.png`]).setThumbnail(`attachment://${monsterName}.png`);
    return embeddedData;
}