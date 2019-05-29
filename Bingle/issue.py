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