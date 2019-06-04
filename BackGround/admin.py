from django.contrib import admin

# Register your models here.
from BackGround import models
admin.site.register(models.User)
admin.site.register(models.Issue)
admin.site.register(models.Issue.Check)
admin.site.register(models.Issue.Submit)
admin.site.register(models.Issue.SubmitCheck)
admin.site.register(models.Issue.IssueLevel)
admin.site.register(models.IssueChampion)
admin.site.register(models.Champion)
admin.site.register(models.Enterprise)


