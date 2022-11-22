const { Client } = require("revolt.js");

const client = new Client();

const list = {
  servers: ["01F7ZSBSFHQ8TA81725KQCSDDP", "01G2XBZ9Q16KSD41RS1NTEC3Z7"],
  channels: ["01FD5J33XHKGMJJ9XCM71B9924", "01GJEBEESA2S02X6CDA5PG4NC7"],
};

client.on("ready", async () => {
  console.log(`Logged in as ${client.user._id}`);
});

client.on("message", async (m) => {
  const authorID = client.user._id;
  if (m.author_id !== authorID) {
    list.servers.forEach((e) => {
      if (m.channel.server_id === e) {
        list.channels.forEach((e) => {
          if (m.channel_id === e) {
            const content = m.content
              .split(" ")
              .filter((c) => c.match(/([0-9])/g))
              .join();
            if (content) {
              const n = parseInt(content);
              const final = n + 1;
              m.channel.sendMessage(final.toString());
            }
          }
        });
      }
    });
  }
});

if (!process.env.EMAIL || !process.env.PASSWORD) {
  console.error(
    "Error: No email/password provided\nTry Adding EMAIL=email_here PASSWORD=password_here before the command"
  );
  process.exit(1);
}

client
  .login({
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  })
  .catch((e) => {
    console.log("Error while logging in", e);
  });

// We do a little bit of trolling ;p
