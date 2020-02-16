FROM python:3.6

RUN mkdir -p /opt/backend_rest
WORKDIR /opt/backend_rest

COPY . /opt/backend_rest

RUN pip install --upgrade pip
RUN pip install gunicorn && pip install -r requirements.txt


