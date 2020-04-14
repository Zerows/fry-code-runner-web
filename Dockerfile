FROM ruby:2.5
WORKDIR /app
COPY . /app
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g ember-cli
RUN bundle check || bundle install
RUN bundle exec rake ember:install
RUN cd frontend && npm install
EXPOSE 3000
EXPOSE 5672
EXPOSE 6379

