import {Request, Response, Router} from 'express';
import {Client} from 'discord.js';
import {List} from './list';

export default class extends List {
  constructor(public client: Client, router: Router) {
    super({endpoint: '/topgg', name: 'Top.gg', id: 'topgg'}, client, router);
  }

  handleRequest(req: Request, res: Response) {
    if (!super.checkOrigin(global.config.bot_lists.topgg.key, req, res)) {
      return;
    }

    super.sendEmbed(req.body.user);

    const amt = req.body.isWeekend ? 2 : 1;

    super.saveVote(req.body.user, amt);
  }
}

/*
example webhook body:

{
  bot: 'bot id',
  user: 'user id',
  type: 'upvote',
  isWeekend: false,
  query: ''
}
*/
