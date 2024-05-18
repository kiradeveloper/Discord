const { Client, IntentsBitField, ActivityType, REST, Routes } = require('discord.js');
require('dotenv').config();

const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong !'
    },
    {
        name: 'speedtest',
        description: 'Show current internet download speed'
    }
];

const rest = new REST(
    {
        version: '10'
    }
).setToken(process.env.DISCORD_TOKEN);

(async () => {

    try {

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILDS_ID),
            {
                body: commands
            }
        )

        console.log(`${commands.length} commands registered !`);

        bot.on('ready', (res) => {
            console.log(`${res.user.tag} is ready !`);
        });
        
        bot.on('interactionCreate', (interaction) => {
        
            if (!interaction.isChatInputCommand()) return;
        
            if (interaction.commandName == 'ping') {
                interaction.reply('Pong !')
            }
            
        });
        
        bot.login(process.env.DISCORD_TOKEN);
        
    } catch (e) {
        console.log(`Error : ` + e);
    }

})();