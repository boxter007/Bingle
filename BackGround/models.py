from django.db import models

# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    nickname = models.CharField(max_length=100)
    email = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Issue(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=50000)
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=0)
    createdate = models.DateTimeField(auto_now_add=True)
    timelimit = models.IntegerField(default=1)
    codelimit = models.IntegerField(default=1000)
    cost = models.FloatField(default=100.00)
    level = models.ForeignKey('IssueLevel',on_delete=models.CASCADE,default=0)
    champion = models.ManyToManyField('Champion', through='IssueChampion',through_fields=('issueid', 'championid'),)

    def __str__(self):
        return self.title

    class Check(models.Model):
        id = models.AutoField(primary_key=True)
        percent = models.FloatField()
        input = models.CharField(max_length=50000)
        output = models.CharField(max_length=50000)
        issue = models.ForeignKey('Issue',on_delete=models.CASCADE,default=0)
        createdate = models.DateTimeField(auto_now_add=True)

        def __str__(self):
            return self.input

    class Submit(models.Model):
        id = models.AutoField(primary_key=True)
        codetype = models.CharField(max_length=100)
        code = models.CharField(max_length=50000)
        user = models.ForeignKey(User,on_delete=models.CASCADE,default=0)
        checks = models.ManyToManyField('Check', through='SubmitCheck',through_fields=('submitid', 'checkid'),)
        createdate = models.DateTimeField(auto_now_add=True)
        cost = models.FloatField(default=100.00)
        issue = models.ForeignKey('Issue',on_delete=models.CASCADE,default=0)

        def __str__(self):
            return 'ID:%d,USER:%s,LANG:%s' % (self.id, self.user.name,self.codetype) 

    class SubmitCheck(models.Model):
        id = models.AutoField(primary_key=True)
        submitid = models.ForeignKey('Submit',on_delete=models.CASCADE)
        checkid = models.ForeignKey('Check',on_delete=models.CASCADE)
        ispass = models.BooleanField()
        cost = models.FloatField(default=100.00)
        createdate = models.DateTimeField(auto_now_add=True)
        memory = models.FloatField(default=0.00)
        runtime = models.FloatField(default=0.00)


    class IssueLevel(models.Model):
        id = models.AutoField(primary_key=True)
        name = models.CharField(max_length=100)

        def __str__(self):
            return self.name

class IssueChampion(models.Model):
    id = models.AutoField(primary_key=True)
    issueid = models.ForeignKey('Issue',on_delete=models.CASCADE)
    championid = models.ForeignKey('Champion', on_delete=models.CASCADE)

    
class Champion(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    starttime = models.DateTimeField(auto_now_add=False)
    endtime = models.DateTimeField(auto_now_add=False)
    enterprise = models.ForeignKey('Enterprise',on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Enterprise(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class SurveyIssues(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=50000)
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=0)
    createdate = models.DateTimeField(auto_now_add=True)
    timelimit = models.IntegerField(default=1)
    cost = models.FloatField(default=100.00)
    level = models.ForeignKey('IssueLevel',on_delete=models.CASCADE,default=0)
    champion = models.ManyToManyField('Champion', through='SurveyIssueChampion',through_fields=('surveyissueid', 'championid'),)
    status = models.ForeignKey('SurveyIssueStatus',on_delete=models.CASCADE,default=0)
    def __str__(self):
        return self.title

class SurveyIssueChampion(models.Model):
    id = models.AutoField(primary_key=True)
    surveyissueid = models.ForeignKey('SurveyIssues',on_delete=models.CASCADE)
    championid = models.ForeignKey('Champion', on_delete=models.CASCADE)

class SurveyIssueStatus(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name