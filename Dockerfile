FROM iron/node

WORKDIR /demo-bot-slack
ADD . /demo-bot-slack

RUN cd demo-bot-slack && \
	npm install

ENV SLACK_BOT_TOKEN=$SLACK_BOT_TOKEN \
	SLACK_BOT_TYPE=$SLACK_BOT_TYPE

ENTRYPOINT ["node", "bot.js"]