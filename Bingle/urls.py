"""Bingle URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import view,adminview

from django.conf.urls import url,include

urlpatterns = [
    url(r'^$', view.index),
    path('admin/', admin.site.urls),
    path('coding/', view.coding),
    path('running/', view.running),
    path('submit/', view.submit),
    path('qlist/', view.qlist),
    path('detail/', view.detail),
    path('answers/', view.answers),
    path('viewsolution/', view.viewsolution),
    path('profile/', view.profile),
    path('makequestion/', view.makequestion),
    path('makequestionsurvey/', view.makequestionsurvey),
    path('getSurveyIssues/', adminview.getSurveyIssues),
    path('debug/', view.debug),
]

from django.views.static import serve
 
urlpatterns += [ url(r'visual-algorithm/(?P<path>.*)$', serve, {'document_root': 'visual-algorithm/',}), ]
