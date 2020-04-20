FROM ruby:2.5
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g ember-cli
EXPOSE 3000
EXPOSE 5672
EXPOSE 6379
WORKDIR /app
COPY . /app
RUN useradd -ms /bin/bash admin
RUN chown -R admin:admin /app
RUN chmod 755 /app
USER admin


