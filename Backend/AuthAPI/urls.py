"""
URL configuration for AuthAPI project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from auth.views import (
    LoginView,
    SingupView,
    DeleteView,
    PutView,
    GeoView,
    RefreshTokenView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/login", LoginView.as_view(), name="login"),
    path("auth/singup", SingupView.as_view(), name="singup"),
    path("auth/delete-user", DeleteView.as_view(), name="delete_user"),
    path("auth/update-user", PutView.as_view(), name="update_user"),
    path("geo-api", GeoView.as_view(), name="geo_api"),
    path("geo-api/<str:country>", GeoView.as_view(), name="geo_api_country"),
    path("auth/refresh-token", RefreshTokenView.as_view()),
]
