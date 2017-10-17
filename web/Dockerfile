FROM python:3.5

ENV PYTHONUNBUFFERED 1

RUN mkdir /web
WORKDIR /web
ADD . /web/
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple \
    -r requirements.txt

RUN python manage.py makemigrations \
    && python manage.py migrate \
    && python manage.py loaddata fixture.json \
    && gunicorn yunyanjin.wsgi -b 0.0.0.0:8000

EXPOSE 8000