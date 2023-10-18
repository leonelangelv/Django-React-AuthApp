import mysql.connector
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .services.create_user import create_user
from .services.delete_user import delete_user
from .services.update_user import updateUser
from .services.logIn_user import logInUser 

# from .services.update_user import

cnx = mysql.connector.connect(
    user="root",
    password="12345678",
    host="127.0.0.1",
    database="apiuser",
)

@csrf_exempt
def singUp(request):
    if request.method == "POST":
        return create_user(cnx, request)
    else:
        return JsonResponse({"error": "Invalid HTTP method"}, status=400)


@csrf_exempt
def logIn(request, user_id=None):
    if request.method == "POST":
        return logInUser(cnx, request)
    elif request.method == "DELETE":
        return delete_user(cnx, user_id)
    else:
        return JsonResponse({"error": "Invalid HTTP method"}, status=400)


@csrf_exempt
def updateUser(request, user_id=None):
    if request.method == "PUT":
        return updateUser(cnx, user_id)
    else:
        return JsonResponse({"error": "Invalid HTTP method"}, status=400)
