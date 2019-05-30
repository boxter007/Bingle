from BackGround import models
import logging
log = logging.getLogger("collect")
def getIssue(id):
    issueobj = models.Issue.objects.filter(id=id)
    curIssue = None
    if(issueobj.exists()):
            curIssue = issueobj[0]
    return curIssue

def getSolution(id):
    submitobj = models.Issue.Submit.objects.filter(id=id).first()
    return submitobj

def makeIssue(user,title,timelimit,codelimit,cost,issuecontent,checks):
    
    newissue =  models.Issue.objects.create(
                        title = title,
                        content = issuecontent,
                        user = models.User.objects.filter(id=user)[0],
                        timelimit = timelimit,
                        codelimit = codelimit,
                        cost = cost)
    
    for item in checks:
        if item['input'] != '' and item['output'] != '' and item['cost'] != '' and float(item['cost']) > 0:
            newissue.Check.objects.create(
                input=item['input'],
                output = item['output'],
                percent = float(item['cost']),
                issue = newissue)