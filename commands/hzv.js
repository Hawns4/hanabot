module.exports = {
    name: "hzv",
    description: "Displays Hitzone Value",
    args: true,
    usage: "<Monster Name> <Damage Type>",
    execute(message, args) {
        //TODO: Read args to find which monster file to search for
        const fs = require("fs");
        const monster = JSON.parse(fs.readFileSync("./data/acidic_glavenus.json"));

        let damageType = args[args.length - 1].toLowerCase();
        damageType = damageType.charAt(0).toUpperCase() + damageType.slice(1);
        console.log(monster[damageType]);

        //TODO: Send hitzone values from read JSON
    },
};