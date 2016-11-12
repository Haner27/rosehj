# -*- coding: utf8 -*-
from __future__ import unicode_literals
from cStringIO import StringIO
import os
from random import randint
import urllib2
from bson import ObjectId
from zipfile import ZipFile, ZIP_DEFLATED

from flask import Blueprint, request, url_for, send_file, jsonify
from flask_login import login_required

from . import res
from models import gfs
from models.resource import Resource
from errors import Errors
from utils.md5_utils import MD5
from utils.datetime_utils import now_lambda
from configs.config import conf

instance = Blueprint('file', __name__)


@instance.before_request
def before_request():
    pass


@instance.route('/file/upload', methods=['GET', 'POST'])
@login_required
def upload():
    action = request.args.get('action')
    if action == 'config':
        result = conf.UEDITOR_CONIFG

    elif action in ('uploadimage', 'uploadvideo', 'uploadfile'):
        if len(request.files) > 1:
            result = {'state': '不支持多个文件同时上传'}
        else:
            f = request.files.values()[0]
            # if not is_allowed_format(f.filename):
            #     return res(code=Errors.UPLOAD_FORMAT_LIMITATION)
            #
            # if not is_allowed_size(f):
            #     return res(code=Errors.UPLOAD_SIZE_LIMITATION)

            ext = os.path.splitext(f.filename)[-1].strip('.').lower()
            data = f.stream.read()
            md5 = MD5(data).md5_content
            exists = gfs.find_one({'md5': md5})
            if not exists:
                original_filename = f.filename
                content_type = f.content_type
                filename = get_unique_name(ext)
                file_id = gfs.put(data, filename=filename, original_filename=original_filename,
                                  content_type=content_type)
            else:
                file_id = exists._id
                filename = exists.filename

            url = url_for('file.show', file_id=file_id)

            result = {
                "state": "SUCCESS",
                "url": url,
                "title": filename,
                "original": filename
            }

    # 抓取远程图片
    elif action == 'catchimage':
        sources = request.form.getlist('source[]')
        _list = []
        for source in sources:
            source = (source or '').strip()

            f = urllib2.urlopen(urllib2.Request(source, headers={'User-agent': 'Mozilla/5.0'}), timeout=10)
            ext = 'png'
            data = f.read()
            md5 = MD5(data).md5_content
            exists = gfs.find_one({'md5': md5})
            if not exists:
                original_filename = '图片'
                filename = get_unique_name(ext)
                file_id = gfs.put(data, filename=filename, original_filename=original_filename,
                                  content_type='image/png')
            else:
                file_id = exists._id

            url = url_for('file.show', file_id=file_id)

            _list.append({
                "url": url,
                "source": source,
                "state": "SUCCESS"
            })
        result = {
            "state": "SUCCESS",
            "list": _list
        }
    else:
        result = {'state': '不能识别的action: %s' % action}

    return jsonify(result)


# @instance.route('/file/download/<regex("[0-9a-z]{24}"):file_id>', methods=['GET'])
# def download(file_id):
#     f = gfs.get(ObjectId(file_id))
#     io = StringIO()
#     zf = ZipFile(io, 'w', ZIP_DEFLATED, True)
#     zf.writestr(f.filename, f.read(), ZIP_DEFLATED)
#     zf.close()
#     io.seek(0)
#     return send_file(io, as_attachment=True, attachment_filename='{0}.zip'.format(os.path.splitext(f.filename)[0]))


@instance.route('/file/show/<regex("[0-9a-z]{24}"):file_id>', methods=['GET'])
def show(file_id):
    f = gfs.get(ObjectId(file_id))
    io = StringIO(f.read())
    io.seek(0)
    return send_file(io, mimetype=f.content_type)  # 指定相关mimetype


def is_allowed_format(file_name):
    ext = os.path.splitext(file_name)[-1].strip('.')
    if ext.lower() not in Resource.ALLOWED_FORMATS:
        return False
    return True


def is_allowed_size(f):
    f.stream.seek(0, 2)
    content_length = f.tell()
    f.stream.seek(0)
    if content_length > Resource.ALLOWED_MAX_SIZE:
        return False
    return True


def get_unique_name(ext):
    now = now_lambda()
    return '{0}{1}.{2}'.format(now.strftime('%Y%m%d%H%M%S'), randint(100, 999), ext)

