const Discord = require('discord.js');
const fs = require("fs");

module.exports = {
    name: "hzv",
    description: "Displays Hitzone Value",
    args: true,
    usage: "<Monster Name> [advanced]",
    execute(message, args) {
        for (let i = 0; i < args.length; i++) {
            if (args[i].includes("-")) {
                const hyphenWord = args[i].split("-");
                for (let j = 0; j < hyphenWord.length; j++) {
                    hyphenWord[j] = hyphenWord[j].charAt(0).toUpperCase() + hyphenWord[j].slice(1);
                }
                args[i] = hyphenWord.join("-");
            } else {
                args[i] = args[i].charAt(0).toUpperCase() + args[i].slice(1);
            }
        }

        try {
            let displayType = args[args.length - 1];
            if (displayType === "Advanced") {
                args.pop();
            } else {
                displayType = "Simple";
            }
            const monsterName = args.join("_");
            return message.channel.send(createEmbed(monsterName, displayType));
        } catch (err) {
            message.channel.send("I couldn't find a monster by that name. Please check the spelling and try again.");
            message.channel.send("Note: Monsters with special punctuation in their name such as Safi'jiiva and Kulu-Ya-Ku require that punctuation to be present.");
        }
    },
};

createEmbed = (monsterName, displayType) => {
    let monsterData = JSON.parse(fs.readFileSync(`./data/${monsterName}.json`));
    // TODO debug not grabbing simple data
    monsterData = monsterData[displayType];
    let embed = new Discord.MessageEmbed();
    embed.setTitle(monsterName.split("_").join(" ")).setDescription(`${displayType} hitzone value data for ${monsterName.split("_").join(" ")}`).attachFiles([`./icons/${monsterName}.png`]).setThumbnail(`attachment://${monsterName}.png`);
    parseData(embed, monsterData, displayType);
    return embed;
}

parseData = (embed, monsterData, displayType) => {
    for (data in monsterData) {
        if (monsterData.hasOwnProperty(data)) {
            let childData = monsterData[data];
            let description = "";
            for (partValue in childData) {
                let hzvData = childData[partValue];
                description += partValue + ": " + hzvData + "\n";
            }
            embed.addField(data, description, true);
        }
    }
}