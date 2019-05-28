from django.contrib import admin

# Register your models here.
from BackGround import models
admin.site.register(models.User)
admin.site.register(models.Issue)
admin.site.register(models.Issue.Check)
admin.site.register(models.Issue.Submit)
admin.site.register(models.Issue.SubmitCheck)