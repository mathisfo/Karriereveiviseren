"""innbackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
from django.views.generic import TemplateView
from django.contrib.auth.views import LogoutView
from userAuth.views import GoogleLogin
from innapp.views import GoogleLogin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('innapp.api.urls')),
    path('token-auth/', obtain_jwt_token),
    path('userAuth/', include('userAuth.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    #path('', TemplateView.as_view(template_name="index.html")),
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('login/', GoogleLogin.as_view(), name='google_login'),
    path('auth/', include('dj_rest_auth.urls')),
]
