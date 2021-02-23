# I believe this is correct, but we might have to double check everything as it's not yet been tested.
FROM python:3.8
ENV PYTHONUNBUFFERED 1

ARG DJANGO_ALLOWED_HOSTS

ENV DJANGO_ALLOWED_HOSTS $DJANGO_ALLOWED_HOSTS

WORKDIR /backend
RUN pip install pipenv
COPY Pipfile* ./
# This really isn't an efficient way to handle this, basically we should use pipenv in container
# or drop pipenv completely.
# TODO: fix this in a docker efficiency update
RUN cd /backend && pipenv lock --keep-outdated --requirements > requirements.txt
RUN pip install -r requirements.txt
COPY . /backend/
RUN python3.8 manage.py makemigrations
RUN python3.8 manage.py migrate
EXPOSE 8000