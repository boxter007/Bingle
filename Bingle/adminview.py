import json
import logging
from . import compiler,issue
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt

log = logging.getLogger("collect")

#试卷列表页面
@csrf_exempt
def getSurveyIssues(request):
    context = {}
    if request.method == 'POST':
        level       = int(request.POST.get('level' , -1))
        page        = 1
        champion    = int(request.POST.get('champion' , -1))
        status      = int(request.POST.get('status', -1))
    else:
        level       = int(request.GET.get('level' , -1))
        page        = int(request.GET.get('page' , 1))
        champion    = int(request.GET.get('champion' , -1))
        status      = int(request.GET.get('status', -1))

    context['levels']       = issue.getLevels()
    context['statuses']     = issue.getSurveyIssueStatuses()
    context['champions']    = issue.getChampions()
    context['level']        = level
    context['champion']     = champion
    context['status']       = status
    context['issues']       = issue.getSurveyIssues(level, champion, status, page)
    return render(request, 'issue-list.html', context)