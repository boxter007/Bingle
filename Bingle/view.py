from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from . import compiler
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
def detail(request):
    context          = {}
    return render(request, 'c-detail.html', context)
def answers(request):
    context          = {}
    return render(request, 'c-answers.html', context)
def viewsolution(request):
    context          = {}
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