import {Request, Response, Router} from 'express';
import {Client} from 'discord.js';
import {List} from './list';

export default class extends List {
  constructor(public client: Client, router: Router) {
    super(
      {endpoint: '/botlistspace', name: 'botlist.space', id: 'botlistspace'},
      client,
      router
    );
  }

  handleRequest(req: Request, res: Response) {
    if (
      !super.checkOrigin(global.config.bot_lists.botlistspace.key, req, res)
    ) {
      return;
    }

    super.sendEmbed(req.body.user.id);
    super.saveVote(req.body.user.id);
  }
}

/*
example webhook body:
{
  site: 'botlist.space',
  bot: 'bot id',
  timestamp: 1234,
  user: {
    id: 'user id',
    username: 'ben!',
    discriminator: '0002',
    avatar: 'avatar hash',
    short_description: '???'
  }
}
*/
