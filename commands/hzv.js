const Discord = require('discord.js');
const fs = require("fs");

module.exports = {
    name: "hzv",
    description: "Displays Hitzone Value",
    args: true,
    usage: "<Monster Name> [advanced]",
    execute(message, args) {
        for (let i = 0; i < args.length; i++) {
            args[i] = args[i].charAt(0).toUpperCase() + args[i].slice(1);
        }

        try {
            let damageType = args[args.length - 1];
            if (damageType === "Advanced") {
                args.pop();
            } else {
                damageType === "Simple";
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
    let embed = new Discord.MessageEmbed();
    embed.setTitle(monsterName.split("_").join(" ")).setDescription(`${damageType} hitzone value data for ${monsterName.split("_").join(" ")}`).attachFiles([`./data/${monsterName}.png`]).setThumbnail(`attachment://${monsterName}.png`);
    parseData(embed, monsterData);
    return embed;
}

parseData = (embed, monsterData) => {
    for (data in monsterData) {
        if (monsterData.hasOwnProperty(data)) {
            let childData = monsterData[data];
            let description = "";
            for (partValue in childData) {
                let hzvData = "";
                // TODO: Debug simple data embed
                if (typeof childData[partValue] === "string" && childData[partValue].contains("\*")) {
                    hzvData = childData[partValue].replace(/\*/g, "⭐");
                } else {
                    hzvData = childData[partValue];
                }
                description += partValue + ": " + hzvData + "\n";
            }
            embed.addField(data, description, true);
        }
    }
}