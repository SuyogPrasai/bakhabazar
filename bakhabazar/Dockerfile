FROM python:3.13


COPY . ./Django_Backend
WORKDIR /Django_Backend


RUN pip install -r requirements.txt

EXPOSE 8000

RUN sed -i 's/\r$//g' ./setup.sh
RUN chmod +x ./setup.sh