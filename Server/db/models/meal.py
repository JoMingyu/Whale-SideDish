# -*- coding: utf8 -*-

from db.mongodb import *


class MealModel(EmbeddedDocument):
    breakfast = StringField()
    lunch = StringField()
    dinner = StringField()


class MealScheduleModel(Document):
    code = StringField()
    date = StringField()
    meal = EmbeddedDocumentField(MealModel)
