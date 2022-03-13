const { Client, MessageEmbed } = require("discord.js-selfbot");
const { VoiceChannel, Tokens, SunucuID } = require("./settings.json");
const randomStr = require("randomstring");

Tokens.forEach(hesap => {
    let token = randomStr.generate({charset: 'abcassas'});
    token = new Client();

    try {
        token.login(hesap).catch(err=> { });

        token.on("ready", () => {
            console.log(`${token.user.tag} Hazır.`);
    
            //Ses Kanalını Alma
            let vc = token.channels.cache.get(VoiceChannel)
            if(!vc) return;
            //Ses Kanalına Katılma
            vc.join().catch(err=> { });
            //Sunucuyu Alma
            let guild = token.guilds.cache.get(SunucuID)
            if(guild) {
                //Kulaklığını Kapat
                guild.me.voice.setSelfDeaf(true).catch(err=> { })
            }
        });
    } catch {
        return
    }
    //Bot Sesten Düşerse Otomatik Bağlanma
    token.on("voiceStateUpdate", (oldChannel, newChannel) => {
        let vc = token.channels.cache.get(VoiceChannel);
        if(!vc) return;
        vc.join().catch(err=> { })
    });
});