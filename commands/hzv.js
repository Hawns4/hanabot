module.exports = {
    name: "hzv",
    description: "Displays Hitzone Value",
    args: true,
    usage: "<Monster Name> <Damage Type>",
    execute(message, args) {
        const fs = require("fs");
        const validDamageTypes = ["Sever", "Blunt", "Ranged", "Fire", "Water", "Thunder", "Ice", "Dragon"];

        for (let i = 0; i < args.length; i++) {
            args[i] = args[i].charAt(0).toUpperCase() + args[i].slice(1);
        }

        try {
            const damageType = args[args.length - 1];
            if (validDamageTypes.includes(damageType)) {
                args.pop();
                const monsterName = args.join("_");
                const monster = JSON.parse(fs.readFileSync(`./data/${monsterName}.json`));
                //TODO: Send embedded hitzone values from JSON
                return message.channel.send("Not yet implemented");
            } else {
                const monsterName = args.join("_");
                const monster = JSON.parse(fs.readFileSync(`./data/${monsterName}.json`));
                //TODO: Send embedded hitzone values from JSON
                return message.channel.send({ files: [`./data/${monsterName}.png`] });
            }
        } catch (err) {
            message.channel.send("I couldn't find a monster by that name.\nPlease check the spelling of the name and try again.");
        }
    },
};