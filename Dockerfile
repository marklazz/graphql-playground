FROM node:16

# Create app directory
ENV APP_NAME graphql-playground
ENV APP_HOME /app/$APP_NAME
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

ADD . $APP_HOME

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY . . 

RUN ls
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
# COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
