# -*- coding: utf8 -*-
from __future__ import unicode_literals

from flask import Blueprint, render_template, jsonify, request

instance = Blueprint('index', __name__)


@instance.before_request
def before_request():
    pass


@instance.route('/', methods=['GET'])
@instance.route('/w', methods=['GET'])
@instance.route('/f', methods=['GET'])
@instance.route('/d/<page>', methods=['GET'])
@instance.route('/c', methods=['GET'])
def index(page=None):
    return render_template('index.html', page=page)  # 主页