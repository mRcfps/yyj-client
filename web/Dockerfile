FROM python:3.5

ENV PYTHONUNBUFFERED 1

RUN mkdir /web
WORKDIR /web
ADD . /web/
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple \
    -r requirements.txt
