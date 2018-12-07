FROM ruby:2.5
WORKDIR /app
COPY . /app
RUN bundle
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g ember-cli
RUN rake ember:install
EXPOSE 3000
EXPOSE 5672
EXPOSE 6379

