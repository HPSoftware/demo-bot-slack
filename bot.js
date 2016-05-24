var fs = require('fs');

var token = process.env.SLACK_BOT_TOKEN || '';
var message_map = {};
var bot_type = process.env.SLACK_BOT_TYPE || 'default';

function loadConfig() {
    fs.readFile('./config/' + bot_type + '.json', function(err, data) {
        if (err)
            console.log('Failed to load bot ' + bot_type + ' configuration');
        else if (data.length)
            message_map = JSON.parse(data);
        else
            console.log('HDM bot configuration file has no data')
    });
}
fs.watch('./config/' + bot_type + '.json', function(event, filename) {
    if (event == "change") {
        console.log('HDM bot reloading configuration');
        loadConfig();
    }
});
loadConfig();

/* slack infra */

var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = controller.spawn({
    token: token
})
bot.startRTM(function(err, bot, payload) {
    if (err) {
        console.log('HDM bot could not connect to Slack');
    } else
        console.log('HDM bot connected Slack');
});

/* slack infra */

function botReply(bot, message, message_map_category) {
    var message_keys = Object.keys(message_map.all).concat(
        Object.keys(message_map[message_map_category]));

    console.log('HDM bot all+' + message_map_category + ' keys: ' + message_keys.length);

    var replied = false;

    message_keys.forEach(function(key) {
        if (!replied) {
            var keyRegexp = new RegExp(key, 'i');
            console.log('HDM bot compare key ' + key + ' to: ' + message.text);
            if (keyRegexp.test(message.text)) {
                var bot_reply_msg = {};
                if (message_map.all[key])
                    bot_reply_msg = message_map.all[key];
                else
                    bot_reply_msg = message_map[message_map_category][key];
                console.log('HDM bot reply with ' + JSON.stringify(bot_reply_msg) + ' to: ' + message.text);
                bot.reply(message, bot_reply_msg);
                replied = true;
            }
        }
    });
    if (!replied)
        bot.reply(message, message_map.default);
}

// reply to a direct mention - @bot hello
controller.on('direct_mention', function(bot, message) {
    console.log('HDM bot direct mention: ' + JSON.stringify(message));
    // reply to _message_ by using the _bot_ object
    botReply(bot, message, "direct_mention");
});

// reply to a direct message
controller.on('direct_message', function(bot, message) {
    console.log('HDM bot direct message');
    // reply to _message_ by using the _bot_ object
    botReply(bot, message, "direct_message");
});
