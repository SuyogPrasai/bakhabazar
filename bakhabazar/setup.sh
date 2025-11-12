#!/bin/bash
python manage.py makemigrations
python manage.py makemigrations api
python manage.py migrate
python manage.py collectstatic --noinput

daphne -b 0.0.0.0 -p 8001 bakhabazar.asgi:application &
gunicorn -c gunicorn.conf.py &

wait