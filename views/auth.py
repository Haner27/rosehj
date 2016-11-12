# -*- coding: utf8 -*-
from __future__ import unicode_literals

from flask import Blueprint, render_template, jsonify, request, url_for, redirect, make_response
from flask_login import login_required, current_user

from models.user import User
from . import res
from errors import Errors

instance = Blueprint('auth', __name__)


@instance.before_request
def before_request():
    pass


@instance.route('/user/admin', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')  # 登录页

    username = request.form.get('username')
    password = request.form.get('password')
    remember_me = True if request.form.get('remember_me') else False

    if not username or not password:
        return res(code=Errors.PARAMS_REQUIRED)

    user = User.objects(username=username).first()
    if not user or not user.verify_password(password):
        return res(code=Errors.AUTH_LOGIN_INFO_ERROR)

    # 登录
    user.sign_in_ip = request.remote_addr
    user.login(remember_me)
    user.save()

    return jsonify(success=True)


@instance.route('/user/logout')
@login_required
def logout():
    current_user.logout()
    cookies = request.cookies # 获取服务器cookie
    if 'islogin' in cookies:
        del cookies['islogin']

    response = make_response('ssss') # 创建一个响应对象
    response.set_cookie('1', '1', 2) # 设置cookie， 键值对和过期时间（秒数）
    response.status_code = 200 # 设置状态码
    return response


@instance.route('/user/add/<username>/<password>')
def add(username, password):
    user = User()
    user.username = username
    user.password = password
    user.nickname = username
    user.save()
    return jsonify(success=True)