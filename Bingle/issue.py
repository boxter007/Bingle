from BackGround import models
import logging
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q

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
def getSurveyIssueStatuses():
    statuses = models.SurveyIssueStatus.objects.all()
    return statuses
def getChampions():
    statuses = models.Champion.objects.all()
    return statuses


def getSubmitByResult(issueid, t, page):
    submits = models.Issue.Submit.objects.filter(issue_id=issueid).all()
    if (t == 2):
        submits = submits.filter(Q(result_id__in=[1, 2]))
    elif (t == 3):
        submits = submits.filter(Q(result_id__in=[3, 4, 5, 6]))

    r1 = Paginator(submits, 10)
    try:
        r1 = r1.page(page)
    except PageNotAnInteger:
        r1 = r1.page(1)
    except EmptyPage:
        r1 = r1.page(r1.num_pages)

    return r1



def getIssuesByLevel(levelid,page):
    issues = models.Issue.objects.filter(level=levelid)
    lines = []
    for item in issues:
        line=[]
        line.append(item)
        line.append(item.Submit.objects.filter(cost=item.cost).count())
        allsubmit = item.Submit.objects.all().count()
        if allsubmit == 0:
            line.append(0)
        else:
            line.append(100*round(item.Submit.objects.filter(cost=item.cost).count()/allsubmit,2))
        lines.append(line)
    issuesPage = Paginator(lines, 10)
    try:
        result = issuesPage.page(page)
    except PageNotAnInteger:
        result = issuesPage.page(1)
    except EmptyPage:
        result = issuesPage.page(issuesPage.num_pages)
    return result

def getSurveyIssues(levelid,championid,statusid,page):
    issues = models.SurveyIssues.objects.all()
    if levelid > 0:
        issues = issues.filter(level=levelid)
    if championid > 0:
        issues = issues.filter(champion=championid)
    if statusid > 0:
        issues = issues.filter(status=statusid)

    issuesPage = Paginator(issues, 10)
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
                        level = models.Issue.IssueLevel.objects.filter(id=int(level)).first())

    for item in checks:
        if item['input'] != '' and item['output'] != '' and item['cost'] != '' and float(item['cost']) > 0:
            newissue.Check.objects.create(
                input=item['input'],
                output = item['output'],
                percent = float(item['cost']),
                issue = newissue)