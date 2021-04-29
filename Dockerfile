FROM python:3.8

# Install curl, node, & yarn
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get -y install nodejs
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

WORKDIR /inn01-project/backend

# Install Python dependencies
RUN pip install pipenv
COPY ./backend/Pipfile* /inn01-project/backend/
RUN pipenv lock --keep-outdated --requirements > requirements.txt
# Install Python dependencies
RUN pip3 install --upgrade pip -r requirements.txt

# Install JS dependencies
WORKDIR /inn01-project/frontend

COPY ./innfrontend/package.json ./innfrontend/yarn.lock /inn01-project/frontend/
RUN $HOME/.yarn/bin/yarn install

# Add the rest of the code
COPY . /inn01-project/

# Build static files
RUN $HOME/.yarn/bin/yarn build

# Have to move all static files other than index.html to root/
# for whitenoise middleware
WORKDIR /inn01-project/frontend/build

RUN mkdir root && mv *.ico *.js *.json root

# Collect static files
RUN mkdir /inn01-project/backend/staticfiles

WORKDIR /inn01-project

# SECRET_KEY is only included here to avoid raising an error when generating static files.
# Be sure to add a real SECRET_KEY config variable in Heroku.
RUN DJANGO_SETTINGS_MODULE=innbackend.settings.production \
  SECRET_KEY=somethingsupersecret \
  python3 backend/manage.py collectstatic --noinput

EXPOSE $PORT

CMD python3 backend/manage.py runserver 0.0.0.0:$PORT