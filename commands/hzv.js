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
            // TODO debug simple displayType
            let displayType = args[args.length - 1];
            if (displayType === "Advanced") {
                args.pop();
            } else {
                displayType = "Simple";
            }
            const monsterName = args.join("_");
            return message.channel.send(createEmbed(monsterName, displayType));
        } catch (err) {
            message.channel.send("I couldn't find a monster by that name.");
            message.channel.send("Please check the spelling of the name and try again.");
            message.channel.send("Note: Due to the amount of advanced data associated with Alatreon and Safi'jiiva, you must type: ```-hzv Alatreon <fire|ice|dragon> active advanced\nor\n-hzv [broken|critical] Safi'jiiva advanced\nWords encased in \"<>\" are mandatory, \"[]\" are optional, and words separated by \"|\" are the valid choices```");
        }
    },
};

createEmbed = (monsterName, displayType) => {
    let monsterData = JSON.parse(fs.readFileSync(`./data/${monsterName}.json`));
    // TODO debug not grabbing simple data
    monsterData = monsterData[displayType];
    let embed = new Discord.MessageEmbed();
    embed.setTitle(monsterName.split("_").join(" ")).setDescription(`${displayType} hitzone value data for ${monsterName.split("_").join(" ")}`).attachFiles([`./data/${monsterName}.png`]).setThumbnail(`attachment://${monsterName}.png`);
    parseData(embed, monsterData, displayType);
    return embed;
}

parseData = (embed, monsterData, displayType) => {
    for (data in monsterData) {
        if (monsterData.hasOwnProperty(data)) {
            let childData = monsterData[data];
            let description = "";
            for (partValue in childData) {
                let hzvData = "";
                if (displayType === "Advanced") {
                    hzvData = childData[partValue];
                } else {
                    hzvData = childData[partValue].replace(/\*/g, "⭐").replace(/x/g, "❌");
                }
                description += partValue + ": " + hzvData + "\n";
            }
            embed.addField(data, description, true);
        }
    }
}