# Generic Slack bot for conversation demo

This is an implementaion of a simple Slack bot, based on node.js and the [botkit package](https://github.com/howdyai/botkit). The bot is using a json configuration file to match keywords and reply with static messages (can include attachments). It can be used to quickly create a demo bot without actual implementaion of backend logic or integrations.

## Installation and usage

* Clone from github and run `npm install`.
* Create/join a Slack team and create bot(s) in that group (see [Slack docs](https://get.slack.help/hc/en-us/categories/200111606-Using-Slack)). For each bot you want to run with demo-bot-slack, copy the bot [API token](https://get.slack.help/hc/en-us/articles/215770388-Creating-and-regenerating-API-tokens).
* Write a conversation json configuration file and place it under the `config` folder (see configuraiton file format below) .
* Set the following environment variables:
  * `SLACK_BOT_TOKEN` - the API token copied from Slack
  * `SLACK_BOT_TYPE` - the name of the json configuration file to use for this bot execution (without the js extnesion, e.g. `SET SLACK_BOT_TYPE=workbench` will run a bot with the configuraiton file `config/workbench.json`).
* Run the bot using `node bot.js`

## Conversation configuration file format

demo-bot-slack is using json to match types of messages->keywords->replies.
A first key of `default` specifies what the bot will answer if no match is found. A second key of `all` specifies keywords that will be matched on all event types. Subsequent keys will specify the event name and a list of keywords to match.
All keyword keys will be matched as javascript regular expressions, and can use any regexp expression format. Reply format is [Slack's message format](https://api.slack.com/docs/formatting), including attachments.
```
{
	'default': 'a default repsonse',
	'all': {
		'.*keyword.*1': {'text': 'reply text'},
		'.*keyword.*2': {'text': 'some reply text',
            'attachments': [{
                'title': 'attachment title',
                'text': 'attachment text',
                'color': "#7CD197",
                'mrkdwn_in': ['text', 'title']
            }]}
	},
	'direct_mention': {
		'.*keyword.*3': {'text': 'reply text'}
	},
	'direct_message': {
	}
}
```
The bot will match keywords by the following order:
- Keywords under the `all` category, from top to bottom
- Keywords in subsequent categories (top to bottom for both categories and keywords within)
- If no match was found, the default reply
If a match is found, the reply is sent and the lookup is done (i.e. you can't match more than one reply to an event).

## License
MIT License

## Credits
* Inbar Shani - @inbarshani
