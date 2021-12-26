const { Client, Collection, Intents } = require("discord.js"),
client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS], partials: ["CHANNEL", "REACTION", "MESSAGE"] }),
Discord = require('discord.js'),
{ REST } = require('@discordjs/rest'),
{ Routes } = require('discord-api-types/v9'),
serve = require('./modules/serve.js'),
fs = require('fs'),
prefix = '!b';

serve();

client.commands = new Collection()
client.aliases = new Collection()
client.categories = fs.readdirSync("./commands/") // 카테고리 저장
// fs.readdirSync로 commands 폴더 안에 있는 폴더 이름들을 저장한다
// MainFile/commands/*/*.js 형식

fs.readdirSync('./commands').forEach(dir => {
// commands폴더 안에 있는 폴더 이름 구하기
  fs.readdirSync(`./commands/${dir}`)
  .filter(f => f.endsWith('.js')) // js 파일만 불러오기
  .forEach(f => { // 파일 이름 불러오기
    let pull = require(`./commands/${dir}/${f}`)
    // 한 카테고리 폴더에 있는 여러개 파일 중에서 한개씩 불러온다.
    
    if (pull.name) /* 명령어 이름이 존재한다면 */ {
      client.commands.set(pull.name, pull)
      // 명령어 이름으로 명령어를 찾아야 하므로 이름을 key값으로 정한다. 이때 value는 명령어 전체 데이터로 저장한다.
      console.log(`${pull?.name} 명령어 불러오기 성공!`)
    } else console.log(`${pull?.name} 명령어 불러오기 실패!`)

    if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(a => client.aliases.set(a, pull.name))
    
    // 동의어가 있는데 그게 리스트라면 동의어 리스트에 추가한다.
  });
});

client.on('ready', () => {
    console.log(`${client.user.tag}에 로그인 되었습니다!`);
    client.user.setActivity({
        name: `!b`,
        type: 'PLAYING'
    });
});

client.on('messageCreate', async msg => {
  if (msg.author.bot || msg.system || !msg.content.startsWith(prefix)) return;
  // 메시지를 보낸 유저가 봇이거나 시스템이면 무시한다
  // 메시지를 보낸 유저가 접두사로 시작하지 않는다면 무시한다
  let args = msg.content.slice(prefix.length).trim().split(' '), // args 구하기
  cmd = args.shift().toLowerCase(), // 명령어 이름을 구한다.
  command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd)); // 명령어를 찾기
  
  command?.run(client, msg, args); // 명령어 있을 경우 실행
});

client.login(process.env.token);