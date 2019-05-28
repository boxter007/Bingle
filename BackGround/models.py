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

        def __str__(self):
            return self.id + ',submitid:' + self.submitid + ',checkid:' + self.checkid

