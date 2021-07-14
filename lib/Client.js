const { Client, Collection } = require('discord.js');

module.exports = class VexClient extends Client {
    constructor(options = {}) {
        super(options);

        this.commands = new Collection();
        this.settings = require('../settings.json');
    }
}