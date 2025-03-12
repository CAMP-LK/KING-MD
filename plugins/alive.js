const botCommand = {
  pattern: "alive",
  react: "👨‍💻",
  alias: ["online", "test", "bot"],
  desc: "Check bot online or no.",
  category: "main",
  use: ".alive",
  filename: __filename
};

cmd(botCommand, async (bot, message, chat, { from, prefix, l, quoted, body, isCmd, command, args, q, pushname, isMe, isOwner, reply }) => {
  try {
    let hostname;
    switch (os.hostname().length) {
      case 12:
        hostname = "replit";
        break;
      case 36:
        hostname = "heroku";
        break;
      case 8:
        hostname = "koyeb";
        break;
      default:
        hostname = os.hostname();
    }

    const responseMessage = `👋 Hello ${senderName}, I'm alive now!\n\n` +
      `*🚀 Version:* ${require("../package.json").version}\n` +
      `*⌛ Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB\n` +
      `*🕒 Runtime:* ${runtime(process.uptime())}\n` +
      `*📍 Platform:* ${hostname}\n\n` +
      "🐼 This is the result of our team's hard work, and our technical cybers team owns the bot's rights and code rights. Therefore, you have no chance to change and submit our bot under any circumstances. This bot includes 100 commands, logo, thumbnail, banner maker commands, and AI chatbot features.\n\n" +
      "*🌻 Have A Nice Day! 🌻";

    const loadingMessages = ["LOADING ●●○○○○", "LOADING ●●●●○○", "LOADING ●●●●●●", "`COMPLETED ✅`"];
    const initialMessage = { text: '' };
    let { key: messageKey } = await client.sendMessage(chatId, initialMessage);

    for (let i = 0; i < loadingMessages.length; i++) {
      const loadingMessage = { text: loadingMessages[i], edit: messageKey };
      await client.sendMessage(chatId, loadingMessage);
    }

    if (config.MODE === "nonbutton") {
      const menuOptions = [{
        title: '',
        rows: [{
          title: '1',
          rowId: `${commandPrefix}menu`,
          description: "COMMANDS MENU"
        }, {
          title: '2',
          rowId: `${commandPrefix}ping`,
          description: "BOT SPEED"
        }]
      }];

      const listMessage = {
        caption: responseMessage,
        image: { url: config.LOGO },
        footer: config.FOOTER,
        title: '',
        buttonText: "*🔢 Reply below number*",
        sections: menuOptions
      };

      const replyOptions = { quoted: message };
      await client.replyList(chatId, listMessage, replyOptions);
    } else if (config.MODE === "button") {
      const buttons = [{
        buttonId: `${commandPrefix}menu`,
        buttonText: { displayText: "MENU" }
      }, {
        buttonId: `${commandPrefix}ping`,
        buttonText: { displayText: "PING" }
      }];

      const buttonMessage = {
        image: { url: config.LOGO },
        caption: responseMessage,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 1,
        viewOnce: true
      };

      const sendOptions = { quoted: args };
      await client.sendMessage(chatId, buttonMessage, sendOptions);
    }
  } catch (error) {
    replyFunction("*ERROR !!*");
    logger(error);
  }
});
