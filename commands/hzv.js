module.exports = {
    name: "hzv",
    description: "Displays Hitzone Value",
    args: true,
    usage: "<Monster Name> <Damage Type>",
    execute(message, args) {
        const fs = require("fs");
        const validDamageTypes = ["Sever", "Blunt", "Ranged", "Fire", "Water", "Thunder", "Ice", "Dragon"];

        //Get damage type
        let damageType = args.pop().toLowerCase();
        damageType = damageType.charAt(0).toUpperCase() + damageType.slice(1);
        if (!validDamageTypes.includes(damageType)) return message.channel.send("Invalid damage type, the accepted damage types are: " + validDamageTypes.join(", "));

        //Read args to find which monster file to search for
        try {
            let monsterFileName = args.join("_").toLowerCase();
            const monster = JSON.parse(fs.readFileSync(`./data/${monsterFileName}.json`));

            //TODO: Send hitzone values from read JSON
            message.channel.send("Not yet implemented");
        } catch (err) {
            message.channel.send("I couldn't find a monster by that name.\nPlease check the spelling of the name and try again.");
        }
    },
};