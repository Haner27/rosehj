# -*- coding: utf8 -*-
from __future__ import unicode_literals

from mongoengine import StringField, IntField, ListField, EmbeddedDocumentField, EmbeddedDocument, DateTimeField, \
    BooleanField
from flask import url_for

from . import BaseDocument, register_pre_save
from configs.config import conf
from utils.datetime_utils import format_datetime
from models.user import User


@register_pre_save()
class Resource(BaseDocument):
    IMAGE = 1
    VIDEO = 2

    # 上传文件格式设置
    ALLOWED_FORMATS = ['jpg', 'png', 'jpeg', 'gif', 'rm', 'rmvb', 'wmv', 'avi', 'mp4', '3gp', 'mkv', 'ogg']
    ALLOWED_IMAGE = ['jpg', 'png', 'jpeg', 'gif']

    # 上传文件大小上线
    ALLOWED_MAX_SIZE = 200 * 1024 ** 2  # 200M

    RESOURCE_TYPE = [
        (IMAGE, '图片'),
        (VIDEO, '视频')
    ]

    name = StringField()
    type = IntField(choices=RESOURCE_TYPE)
    file_id = StringField()

    meta = {
        'collection': 'resource',
        'db_alias': conf.DATABASE_NAME,
        'strict': False
    }

    def as_dict(self):
        dic = dict(self.to_mongo())
        if 'created_at' in dic:
            del dic['created_at']
        if 'updated_at' in dic:
            del dic['updated_at']
        if 'deleted_at' in dic:
            del dic['deleted_at']
        dic['url'] = url_for('file.show', file_id=self.file_id)
        return dic


@register_pre_save()
class Reply(BaseDocument):
    """
    对评价的回复分2级
    """
    comment_id = StringField()
    parent_id = StringField()
    content = StringField()
    nickname = StringField()
    email = StringField()
    to_nickname = StringField()
    to_email = StringField()
    notify_new_post = BooleanField()
    notify_follow_up = BooleanField()
    website = StringField()

    meta = {
        'collection': 'reply',
        'db_alias': conf.DATABASE_NAME,
        'strict': False
    }

    def as_dict(self):
        dic = dict(self.to_mongo())
        dic['created_at'] = format_datetime(self.created_at, '%b %d, %Y')
        if 'updated_at' in dic:
            del dic['updated_at']

        if 'deleted_at' in dic:
            del dic['deleted_at']

        return dic


@register_pre_save()
class CommentText(BaseDocument):
    content = StringField()
    content_id = StringField()
    nickname = StringField()
    email = StringField()
    notify_new_post = BooleanField()
    notify_follow_up = BooleanField()
    website = StringField()

    meta = {
        'collection': 'comment',
        'db_alias': conf.DATABASE_NAME,
        'strict': False
    }

    @property
    def replies(self):
        rs = []
        for r in Reply.objects(comment_id=self.id, deleted_at=None).order_by('created_at'):
            rs.append(r.as_dict())
        return rs

    def as_dict(self):
        dic = dict(self.to_mongo())
        dic['created_at'] = format_datetime(self.created_at, '%b %d, %Y')
        if 'updated_at' in dic:
            del dic['updated_at']

        if 'deleted_at' in dic:
            del dic['deleted_at']

        dic['replies'] = self.replies
        return dic


# @register_pre_save()
# class Tag(BaseDocument):
#     name = StringField(required=True)
#
#     meta = {
#         'collection': 'tag',
#         'db_alias': conf.DATABASE_NAME,
#         'strict': False
#     }
#
#     def as_dict(self):
#         dic = dict(self.to_mongo())
#         if 'created_at' in dic:
#             del dic['created_at']
#         if 'updated_at' in dic:
#             del dic['updated_at']
#         if 'deleted_at' in dic:
#             del dic['deleted_at']
#         return dic


@register_pre_save()
class Content(BaseDocument):
    FROM_HJ_WORLD = 1
    FROM_FASHION = 2
    FROM_CONTACT = 3
    FROM_IDS = [
        (FROM_HJ_WORLD, 'HJ\'S WORLD'),
        (FROM_FASHION, 'FASHION'),
        (FROM_CONTACT, 'CONTACT')
    ]

    title = StringField()  # 标题
    text = StringField()  # 内容
    author_id = StringField()  # 作者
    from_id = IntField(choices=FROM_IDS)  # 来源
    # tags = ListField(StringField(), default=[])

    meta = {
        'collection': 'content',
        'db_alias': conf.DATABASE_NAME,
        'strict': False
    }

    @property
    def comments(self):
        cts = []
        for comment in CommentText.objects(content_id=self.id, deleted_at=None):
            cts.append(comment.as_dict())
        return cts

    def as_dict(self):
        dic = dict(self.to_mongo())
        dic['comments'] = self.comments
        dic['created_at'] = format_datetime(self.created_at, '%b %d, %Y')
        u = User.objects(id=self.author_id).first()
        dic['author_name'] = u.nickname if u else '-'
        return dic


@register_pre_save()
class Banner(BaseDocument):
    file_name = StringField(required=True)
    file_id = StringField(required=True)
    file_url = StringField(required=True)

    meta = {
        'collection': 'banner',
        'db_alias': conf.DATABASE_NAME,
        'strict': False
    }

    def as_dict(self):
        dic = dict(self.to_mongo())
        if 'created_at' in dic:
            del dic['created_at']
        if 'updated_at' in dic:
            del dic['updated_at']
        if 'deleted_at' in dic:
            del dic['deleted_at']
        return dic