FROM python:3.5

ENV PYTHONUNBUFFERED=1
ENV WEBSEVER_DIR=/webserver

RUN mkdir $WEBSEVER_DIR

WORKDIR $WEBSEVER_DIR

ADD requirements.txt $WEBSEVER_DIR/

RUN pip install gunicorn

RUN pip install -r requirements.txt

ADD . $WEBSEVER_DIR/
