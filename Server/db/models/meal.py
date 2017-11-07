from db.mongodb import *


class MealModel(EmbeddedDocument):
    breakfast = ListField()
    lunch = ListField()
    dinner = ListField()


class MealScheduleModel(Document):
    code = StringField()
    date = StringField()
    meal = EmbeddedDocumentField(MealModel)
