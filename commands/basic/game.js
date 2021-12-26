const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

const moveButtons = new MessageActionRow()
.addComponents([
    new MessageButton()
    .setCustomId('left')
    .setStyle('PRIMARY')
    .setEmoji('⬅️')
    .setDisabled(true)
])
.addComponents([
    new MessageButton()
    .setCustomId('right')
    .setStyle('PRIMARY')
    .setEmoji('➡️')
    .setDisabled(true)
]);
// 버튼 선언

const levelSetEmbed = new MessageEmbed()
.setTitle('Level Setting')
.setDescription('🔵 - 매우 쉬움\n🟢 - 쉬움\n🟡 - 보통\n🔴 - 어려움')
.setColor('#fffb00')
// 레벨 선택 임베드 선언

const levelSelect = new MessageActionRow()
.addComponents(
  new MessageSelectMenu()
  .setCustomId('lev')
  .setPlaceholder('단계를 선택해주세요!')
  .addOptions([
    {
      label: '🔵 1단계',
      description: '기본적인 조작법을 익히는 튜토리얼 같은 단계입니다.',
			value: '1',
    },
    {
      label: '🟢 2단계',
      description: '이제 본격적으로 시작해볼까요?',
			value: '2',
    },
    {
      label: '🟢 3단계',
      description: '블럭 사이 간격이..? 점프점프!',
			value: '3',
    },
    {
      label: '🟢 4단계',
      description: '오르막과 전기를 조심하세요!',
			value: '4',
    }
  ])
)


const { stringify, createLevels } = require('/home/runner/Bouncy-Bot/modules/level.js')
const levels = createLevels(':green_square:', ':blue_square:', ':yellow_circle:', ':star:', ':zap:');

module.exports = {
    name: 'game',
    aliases: ['play', 'gameplay'],
    category: 'basic',
    description: '게임 플레이',
    run: async (client, message, args) => {
      function makeGame(num) {
        class Object {
          constructor(x, y) {
            this.x = x;
            this.y = y;
          }
        }

        let embed = new MessageEmbed()
        .setTitle(`Level ${num + 1}`)
        .setDescription(stringify(levels[num]))
        .setColor('#fffb00');
        // 인게임 임베드 선언

        let ball, star, dx = 0, dy = 0; // 좌표 선언
        for (let i = 0; i < levels[num].length; i++) {
          for (let j = 0; j < levels[num][0].length; j++) {
            if (levels[num][i][j] === ':yellow_circle:') {
              ball = new Object(j, i);
            }
            if (levels[num][i][j] === ':star:') {
              star = new Object(j, i);
            }
          }
        }
        
        message.reply({
          embeds: [embed],
          components: [moveButtons],
          allowedMentions: {
            repliedUser: false
          }
        })/*.then(msg => {
          setInterval(() => {
            /*if (levels[num].length > ball.y + 1 && levels[num][ball.y + 1][ball.x] == ':green_square:') {
              dy = 2;
            } else {
              dy -= 1;
            }
            if (0 < ball.y && levels[num][ball.y - 1][ball.x] == ':green_square:') dy = -1;
            levels[num][ball.y][ball.x] = ':blue_square:';
            levels[num][ball.y][ball.x] = ':yellow_circle:';
            embed.description = stringify(levels[num]);
            ball.x += dx;
            if (dy < 0) ball.y -= 1;
            if (dy > 0) ball.y += 1;
            msg.edit({
              content: [ball.x == star.x && ball.y == star.y?'clear!' : ''],
              embeds: [embed],
              components: [moveButtons],
              allowedMentions: {
                repliedUser: false
              }
            })
          }, 700);
        });*/
      
        const filter = b => ['left', 'right'].includes(b.customId) && b.user.id == message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter });

        collector.on('collect', b => {
          /*if (b.customId === 'right' && ball.x < levels[num][0][.length - 1 && levels[num][ball.y][ball.x + 1] != ':green_square:') dx = 1;
          if (b.customId === 'left' && ball.x > 0 && levels[num][ball.y][ball.x - 1] != ':green_square:') dx = -1; // 오른쪽 버튼 이동*/

          /*levels[num][ball.y][ball.x] = ':blue_square:';
          levels[num][ball.y][ball.x + dx] = ':yellow_circle:';
          embed.description = stringify(levels[num]);
          ball.x += dx; // 왼쪽 버튼 이동*/

          /*b.update({
            content: [],
            allowedMentions: {
              repliedUser: false
            }
          });*/
        });
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
      } // makeGame 함수 선언 끝
      message.reply({
        embeds: [levelSetEmbed],
        components: [levelSelect],
        allowedMentions: {
          repliedUser: false
        }
      });
        
        client.on('interactionCreate', async interaction => {
          if (interaction.customId === 'lev') {
            makeGame(Number(interaction.values) - 1);
            await interaction.update({ components: [] });
          }
        });
      /*} else {
        makeGame(args - 1);
      }*/

        
      } // 런 명령어 끝
} //모듈 전체 끝

//몰폰으로 잠시 접속했습니다
//현재 진핸상황 말씀해주실 수 있나요?