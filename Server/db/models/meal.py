# -*- coding: utf8 -*-

from mongoengine import Document, EmbeddedDocument
from mongoengine import EmbeddedDocumentField, StringField


class MealModel(EmbeddedDocument):
    breakfast = StringField()
    lunch = StringField()
    dinner = StringField()


class MealScheduleModel(Document):
    code = StringField()
    date = StringField()
    meal = EmbeddedDocumentField(MealModel)
