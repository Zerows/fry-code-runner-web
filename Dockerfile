FROM ruby:2.5
WORKDIR /app
COPY . /app
ENV BUNDLE_PATH /box
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g ember-cli
RUN cd frontend && npm install
EXPOSE 3000
EXPOSE 5672
EXPOSE 6379

