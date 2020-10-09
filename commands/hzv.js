module.exports = {
    name: "hzv",
    description: "Displays Hitzone Value",
    args: true,
    usage: "<Monster Name> <Damage Type>",
    execute(message, args) {
        message.channel.send("Hitzone Values for " + args[0]);
    },
};