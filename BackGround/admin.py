from django.contrib import admin

# Register your models here.
from BackGround import models
admin.site.register(models.User)
admin.site.register(models.SubmitCheck)
admin.site.register(models.Submit)
admin.site.register(models.Issue)
admin.site.register(models.Check)