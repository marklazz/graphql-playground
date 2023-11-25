FROM node:16

RUN apt-get update && apt-get install -y curl ca-certificates gnupg lsb-release && \
    curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | tee /etc/apt/trusted.gpg.d/apt.postgresql.org.gpg > /dev/null && \
    sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list' && \
    apt-get update && apt-get install -y libpq-dev postgresql-client

# Create app directory
ENV APP_NAME full
ENV APP_HOME /app/$APP_NAME
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

ADD . $APP_HOME

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY . . 

RUN npm install

# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
# COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
