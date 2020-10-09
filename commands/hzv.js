module.exports = {
    name: "hzv",
    description: "Displays Hitzone Value",
    execute(message, args) {
        message.channel.send("Hitzone Values for " + args[1]);
    },
};