from BackGround import models
import logging
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger
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
def getLevels():
    levels = models.Issue.IssueLevel.objects.all()
    return levels
def getIssuesByLevel(levelid,page):
    issues = models.Issue.objects.filter(level=levelid)
    lines = []
    for item in issues:
        line=[]
        line.append(item)
        line.append(item.Submit.objects.filter(cost=item.cost).count())
        line.append(100*round(item.Submit.objects.filter(cost=item.cost).count()/item.Submit.objects.all().count(),2))
        lines.append(line)
    issuesPage = Paginator(lines, 10)
    try:
        result = issuesPage.page(page)
    except PageNotAnInteger:
        result = issuesPage.page(1)
    except EmptyPage:
        result = issuesPage.page(issuesPage.num_pages)
    return result


def makeIssue(user,title,timelimit,codelimit,cost,issuecontent,checks,issuetype,level):
    
    newissue =  models.Issue.objects.create(
                        title = title,
                        content = issuecontent,
                        user = models.User.objects.filter(id=user)[0],
                        timelimit = timelimit,
                        codelimit = codelimit,
                        cost = cost,
                        issuetype = models.IssueType.objects.filter(id=issuetype)[0],
                        level = models.Issue.IssueLevel.objects.filter(id=int(level)).first())
    
    for item in checks:
        if item['input'] != '' and item['output'] != '' and item['cost'] != '' and float(item['cost']) > 0:
            newissue.Check.objects.create(
                input=item['input'],
                output = item['output'],
                percent = float(item['cost']),
                issue = newissue)