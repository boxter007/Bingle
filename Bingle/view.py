from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from . import compiler,issue
from django.http import HttpResponse, HttpRequest
import json
import logging

log = logging.getLogger("collect")
def coding(request):
    context          = {}
    id       = request.GET['id']
    issueobj = issue.getIssue(id)
    context['issueid']    = id
    context['title']    = issueobj.title
    
    return render(request, 'c-form.html', context)
#获取试题列表
def qlist(request):
    context          = {}
    level = int(request.GET.get('level', 0))
    page = request.GET.get('page','1')
    codelevel = issue.getLevels()
    lists = {}
    
    for item in codelevel:
        issues = issue.getIssuesByLevel(item.id, page)
        lists[item.id] = issues
        
    context['level'] = level
    context['codelevel'] = codelevel
    context['lists'] = lists
    
    return render(request, 'c-list.html', context)
#获取试题明细
def detail(request):
    id       = request.GET['id']
    user     = request.session['user']
    issueobj = issue.getIssue(id)
    context  = {}
    if issueobj != None:
        context['id']    = id
        context['title']    = issueobj.title
        context['content']  = issueobj.content
        context['user']     = issueobj.user.name
        context['createdate']   = issueobj.createdate
        context['timelimit']    = issueobj.timelimit
        context['codelimit']    = issueobj.codelimit
        context['cost']         = issueobj.cost
        context['submit']       = issueobj.submit_set.all()[0:10]
    return render(request, 'c-detail.html', context)
def answers(request):
    context          = {}
    return render(request, 'c-answers.html', context)
#获取指定代码提交的内容
def viewsolution(request):
    id          = request.GET['id']
    user        = request.session['user']
    submitobj   = issue.getSolution(id)
    context     = {}
    if submitobj != None:
        context['codetype']     = submitobj.codetype
        context['code']         = submitobj.code
        context['checks']       = submitobj.submitcheck_set.all()
        context['createdate']   = submitobj.createdate
        context['cost']         = submitobj.cost
        context['issue']        = submitobj.issue
    return render(request, 'c-viewsolution.html', context)

def index(request):
    request.session['user'] = '1'
    context          = {}
    return render(request, 'c-index.html', context)
def profile(request):
    context          = {}
    return render(request, 'c-profile.html', context)

@csrf_exempt
def running(request):    
    context          = {}
    codetype = request.POST['codetype']
    code     = request.POST['code']
    stdin    = request.POST['stdin']
    issue    = request.POST['issue']
    user     = request.session['user']
    #log.info(request.POST)
    result   = compiler.compiler(codetype,code,stdin,issue,user)
    #result.submit()
    context['stdout']   = result.run()
    context['code']     = code
    context['codetype'] = codetype
    return  HttpResponse(json.dumps(context), content_type='application/json')

@csrf_exempt
def submit(request):    
    context          = {}
    codetype = request.POST['codetype']
    code     = request.POST['code']
    stdin    = request.POST['stdin']
    issue    = request.POST['issue']
    user     = request.session['user']
    #log.info(request.POST)
    result   = compiler.compiler(codetype,code,stdin,issue,user)
    context['stdout']   = result.submit()
    context['code']     = code
    context['codetype'] = codetype
    return  HttpResponse(json.dumps(context), content_type='application/json')

@csrf_exempt
def makequestion(request):  
    request.session['user'] = '1'
    context         = {}
    if request.method == 'POST' :
        title           = request.POST['title']
        timelimit       = request.POST['timelimit']
        codelimit       = request.POST['codelimit']
        cost            = request.POST['issuecost']
        issuecontent    = request.POST['issuecontent']
        user            = request.session['user']
        level           = request.POST['level']
        issuetype       = request.POST['issuetype']
        checks =  []
        
        l = len(request.POST.getlist('checkinput'))
        for i in range(0,l):
            check = {}
            check['input']  =   request.POST.getlist('checkinput')[i]
            check['output'] =   request.POST.getlist('checkoutput')[i]
            check['cost']   =   request.POST.getlist('cost')[i].split(';')[1] if ';' in request.POST.getlist('cost')[i] else 0
            checks.append(check)

        issue.makeIssue(user,title,timelimit,codelimit,cost,issuecontent,checks,issuetype,level)
    return render(request, 'c-makequestion.html', context)