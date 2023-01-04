const qrcode = require("qrcode-terminal");

const { Client, LocalAuth } = require("whatsapp-web.js");
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (message) => {
  if (message.body == "panda" || message.body == "Panda") {
    message.reply("😑");
  }
});

client.on("message", (message) => {
  if (message.body === "!ping") {
    client.sendMessage(message.from, "pong");
  }
});

client.on("message", async (msg) => {
  if (msg.body === "!groupinfo") {
    let chat = await msg.getChat();
    if (chat.isGroup) {
      msg.reply(`
                *Group Details*
                Name: ${chat.name}
                Description: ${chat.description}
                Created At: ${chat.createdAt.toString()}
                Created By: ${chat.owner.user}
                Participant count: ${chat.participants.length}
            `);
    } else {
      msg.reply("This command can only be used in group!");
    }
  }
});

client.on("message", async (msg) => {
  if (msg.body === "!groupname") {
    let chat = await msg.getChat();
    if (chat.isGroup) {
      const d = new Date();
      const date = String(d.getDate());
      const month = String(d.getMonth() + 1);
      const year = String(d.getFullYear());

      const m = date + "/" + month + "/" + year;
      chat.setSubject(m);
    } else {
      msg.reply("This command can only be used in group!");
    }
  }
});

client.initialize();
