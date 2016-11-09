# -*- coding: utf8 -*-
from __future__ import unicode_literals

from flask import Blueprint, render_template, jsonify, request

instance = Blueprint('index', __name__)


@instance.before_request
def before_request():
    pass


@instance.route('/<regex(".*"):path>', methods=['GET'])
def index(path=None):
    return render_template('index.html', path=path)  # 主页