const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    aliases: ['도움', '도움말'],
    category: 'basic',
    description: '도움말 안내',
    run: async (client, message, args) => {
      message.reply({
        embeds: [
          new MessageEmbed()
          .setTitle('도움말')
          .setDescription('Bouncy Bot의 도움말입니다.')
          .setThumbnail('https://cdn.discordapp.com/app-icons/923091172430327808/27a58ed062b3488d3038a2def59ce2aa.png')
          .addFields(
            { name: '!b help', value: '도움말을 출력합니다.' },
            { name: '!b play', value: '게임을 실행합니다.' },
          )
          .setColor('#fffb00')
        ],
        allowedMentions: {
          repliedUser: false
        }
      })
    }
}