FROM iron/node

WORKDIR /demo-bot-slack
ADD . /demo-bot-slack

ENV SLACK_BOT_TOKEN=$SLACK_BOT_TOKEN \
	SLACK_BOT_TYPE=$SLACK_BOT_TYPE

ENTRYPOINT ["node", "bot.js"]