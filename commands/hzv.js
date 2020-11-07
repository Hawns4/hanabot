const Discord = require('discord.js');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const { uri } = require('../config.json');
const client = new MongoClient(uri, { useUnifiedTopology: true });

module.exports = {
    name: 'hzv',
    description: 'Displays Hitzone Value',
    args: true,
    usage: '<Monster Name> [advanced]',
    async execute(message, args) {
        capitalizeArgs(args);
        try {
            let displayType = args[args.length - 1];
            if (displayType === 'Advanced') {
                args.pop();
            } else {
                displayType = 'Simple';
            }
            const monsterName = args.join(" ");
            return message.channel.send(await createEmbed(monsterName, displayType));
        } catch (err) {
            console.log(err)
            message.channel.send('I couldn\'t find a monster by that name.Please check the spelling and try again.');
            message.channel.send('Note: Monsters with special punctuation in their name such as Safi\'jiiva and Kulu-Ya-Ku require that punctuation to be present.');
        }
    },
};

capitalizeArgs = (args) => {
    for (let i = 0; i < args.length; i++) {
        if (args[i].includes('-')) {
            const hyphenWord = args[i].split('-');
            for (let j = 0; j < hyphenWord.length; j++) {
                hyphenWord[j] = hyphenWord[j].charAt(0).toUpperCase() + hyphenWord[j].slice(1);
            }
            args[i] = hyphenWord.join('-');
        } else {
            args[i] = args[i].charAt(0).toUpperCase() + args[i].slice(1);
        }
    }
}

createEmbed = async (monsterName, displayType) => {
    const monsterData = await accessDatabase(monsterName, displayType);
    let embed = new Discord.MessageEmbed();
    // TODO: set thumbnail
    embed.setTitle(monsterName).setDescription(`${displayType} hitzone value data for ${monsterName}`);
    delete monsterData.Image;
    parseData(embed, monsterData[displayType]);
    return embed;
}

accessDatabase = async (monsterName, displayType) => {
    if (!client.isConnected()) {
        await client.connect();
    }
    const db = client.db('hanabot');
    const collection = db.collection('mhw');
    const condition = { Name: monsterName };
    let projection;
    displayType === 'Simple' ? projection = { _id: 0, Image: 1, Simple: 1 } : projection = { _id: 0, Image: 1, Advanced: 1 };
    const cursor = collection.find(condition).project(projection);
    let monsterData;
    await cursor.forEach(data => monsterData = data);
    return monsterData;
}

parseData = (embed, monsterData) => {
    for (header in monsterData) {
        const headerData = monsterData[header];
        let description = '';
        for (partValue in headerData) {
            description += partValue + ': ' + headerData[partValue] + '\n';
        }
        embed.addField(header, description, true);
    }
}