# -*- coding: utf8 -*-
from __future__ import unicode_literals

from flask import current_app
from flask_login import UserMixin, login_user, logout_user
from mongoengine import StringField, DateTimeField

from . import BaseDocument, register_pre_save
from configs.config import conf
from utils.datetime_utils import now_lambda
from utils.md5_utils import MD5


@register_pre_save()
class User(UserMixin, BaseDocument):
    username = StringField(min_length=6, max_length=20, required=True)  # 用户名
    password = StringField(max_length=32, required=True)  # 密码
    nickname = StringField(min_length=1, max_length=20, required=True)  # 昵称
    avatar = StringField()  # 头像
    sign_in_ip = StringField(default=None)  # 登录IP
    sign_in_at = DateTimeField(default=None)  # 登录时间
    sign_out_at = DateTimeField(default=None)  # 注销时间

    meta = {
        'collection': 'user',
        'db_alias': conf.DATABASE_NAME,
        'strict': False
    }

    def login(self, remember_me):
        login_user(self, remember=remember_me)
        self.sign_in_at = now_lambda()

    def logout(self):
        self.sign_out_at = now_lambda()
        self.save()
        logout_user()

    def verify_password(self, password):
        return self.password == password