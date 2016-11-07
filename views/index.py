# -*- coding: utf8 -*-
from __future__ import unicode_literals

from flask import Blueprint, render_template, jsonify, request

instance = Blueprint('index', __name__)


@instance.before_request
def before_request():
    pass


@instance.route('/<category>', methods=['GET'])
def index(category):
    return render_template('index.html', catelog=category)  # 主页