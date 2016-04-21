var slack = require('slack-client');
var rtmClient = slack.RtmClient;
var token = process.env.SLACK_API_TOKEN || '';

var rtm = new rtmClient(token, {logLevel: 'debug'});
rtm.start();

var CLIENT_EVENTS = slack.CLIENT_EVENTS;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
	console.log('AUTHENTICATED');
});
