require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong !'
    },
];

const rest = new REST(
    {
        version: '10'
    }
).setToken(process.env.DISCORD_TOKEN);

(async () => {

    try {

        console.log('Register slash command ...');
        
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILDS_ID),
            {
                body: commands
            }
        )

        console.log(`Success register slash command !`);
        
    } catch (e) {
        console.log(`Errors : ${e}`);
    }

})();