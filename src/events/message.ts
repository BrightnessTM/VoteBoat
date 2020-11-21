import {Client, Message} from 'discord.js';

export default class MessageEvent {
  name = 'message';

  constructor() {}

  async run(client: Client, msg: Message) {
    const prefix = 'v!';

    if (
      msg.author.bot ||
      !msg.content.startsWith(prefix) ||
      msg.channel.type !== 'text'
    ) {
      return;
    }

    const args = msg.content.split(/\s+/);
    const command = args.shift()?.slice(prefix.length).trim();

    msg.command = command;
    msg.args = args;

    if (!command) {
      return;
    }

    const cmd = client.cmds.find(
      c => !!(c.name === command || c?.aliases?.includes(command))
    );

    if (!cmd) {
      return;
    }

    if (!cmd.checkPerms(msg)) {
      msg.channel.send(':x: You do not have permission to use that command.');
      return;
    }

    cmd.run(client, msg).catch(console.error);
  }
}