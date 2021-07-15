const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send("Listen!");
});

app.listen(2340);

const Discord = require('discord.js');
const Vex = require('./lib/Client.js');
const Client = new Vex({disableMentions: "everyone"});
const fs = require('fs');
const User = Client.user;

Client.on("ready", () => {
    Client.user.setActivity('Khaly rpg server | '+Client.settings.prefix+"help 馃", {
        type: "PLAYING"
    });
    console.log("Logged as: "+Client.user.tag);
    //registerCommands().then(() => console.log("Se han cargado los comandos correctamente."));
});

Client.login(require('./data.json').token);



















function registerCommands() {
    return new Promise(async(s, r) => {
        fs.readdir(__dirname + "/commands", (err, files) => {
            if (err) r(err);
            files.forEach(category => {
                fs.readdir(__dirname + "/commands/"+ category, (err, commands) => {
                    if(err)return r(err);
                    commands.forEach(command => {
                        if(!(command.split(".").pop() == "js")) return;
                        let Class = require(`${__dirname}/commands/${category}/${command}`);
                        let CMD = new Class(Client);
                        if(!CMD.options.name || !CMD.options.description || !CMD.options.category) return Client.logger.error("El comando '"+command.split(".")[0]+"' necesita m谩s especificaciones.")
                        let commandName = CMD.options.name.toLowerCase();
                        Client.commands.set(commandName, Class);
                        if(CMD.options.aliases)CMD.options.aliases.forEach(alias => {
                          Client.aliases.set(alias.toLowerCase(), Class);
                        });
                    });
                });
            });
            s();
        });
    });
}