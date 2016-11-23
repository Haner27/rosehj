# -*- coding: utf8 -*-
from __future__ import unicode_literals
import re
import json
import os


def _build_ueditor_config():
    with open("{0}/ueditor_config.json".format(os.path.dirname(__file__))) as f:
        # 删除 `/**/` 之间的注释
        temp = json.loads(re.sub(r'/\*(?:[^*]|\*(?!/))*\*/', '', f.read().decode('utf8')))
    return temp


class Config(object):
    DEBUG = True
    SECRET_KEY = 'h!a@n#n$e%n^g&f*a(n)g_i+n.k'
    # 加密salt
    SALT = '*^)h#a&n@#$;.'

    UEDITOR_CONIFG = _build_ueditor_config()

    MAIL_SERVER = 'localhost'
    MAIL_PORT = 0
    # MAIL_USE_TLS = False
    # MAIL_USE_SSL = False
    # MAIL_USERNAME = 'rosehj'
    # MAIL_PASSWORD = 'rosehj123456'
    MAIL_DEFAULT_SENDER = 'admin@rosehj.com'
    MAIL_MAX_EMAILS = 25
    MAIL_ASCII_ATTACHMENTS = True

    # mongodb 链接信息
    DATABASE_NAME = 'rosehj'
    DATABASE_HOST = '127.0.0.1'
    DATABASE_PORT = 27017
    DATABASE_USERNAME = 'root'
    DATABASE_PASSWORD = ''
    DATABASE_URL = 'mongodb://{0}:{1}@{2}:{3}'.format(DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT)

conf = Config