from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from . import compiler,issue
from django.http import HttpResponse, HttpRequest
import json
import logging

log = logging.getLogger("collect")
def coding(request):
    request.session['user'] = '1'
    context          = {}
    return render(request, 'c-form.html', context)

def qlist(request):
    context          = {}
    return render(request, 'c-list.html', context)
#获取试题明细
def detail(request):
    id       = request.GET['id']
    user     = request.session['user']
    issueobj = issue.getIssue(id)
    context  = {}
    if issueobj != None:
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