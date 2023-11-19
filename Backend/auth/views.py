import json
from django.views import View
from django.db import connection
from django.http import JsonResponse, HttpRequest

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

def viewPrint(msg):
    print(' - '*20)
    print(msg)
    print(' - '*20)

@method_decorator(csrf_exempt, name='dispatch')
class SignupView(View):
    def post(self, request: HttpRequest):
        data = json.loads(request.body)
        username = data.get('user').get('username')
        password = data.get('user').get('password')
        name = data.get('user').get('name')
        lastname = data.get('user').get('lastname')
        repetPassword = data.get('user').get('repetPassword')

        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE username = %s", [username])
            userId = cursor.fetchone()
        
        if userId:
            return JsonResponse({'ok': False, 'message': 'The user already exists'})


        if password == repetPassword and username:
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO users (username, name, lastname, passwordHash) VALUES (%s, %s, %s, %s)", [username, name, lastname, password])
                return JsonResponse({'ok': True, 'user': username})
        else:
            return JsonResponse({'ok': False, 'message': 'invalid credentials'})



@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request: HttpRequest):
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE username=%s AND passwordHash=%s", [username, password])
            user = cursor.fetchone()

        if user:
            userId = user[0]
            return JsonResponse({'ok': True, 'userId': userId, 'message': '' })
        else:
            return JsonResponse({'ok': False, 'message': 'The username does not exist'})


@method_decorator(csrf_exempt, name='dispatch')
class DeleteView(View):
    def delete(self, request: HttpRequest):
        try:
            data = json.loads(request.body)
            userId = data.get("userId")
            password = data.get("password")

            with connection.cursor() as cursor:
                cursor.execute("SELECT passwordHash FROM users WHERE userId=%s", [userId])
                userPassword = cursor.fetchone()[0]

            if password == userPassword:
                with connection.cursor() as cursor:
                    cursor.execute("DELETE FROM users WHERE userId = %s", [userId])
                    return JsonResponse({'ok': True, 'message': 'User deleted'})
            else:
                return JsonResponse({'ok': False, 'message': 'Invalid password'})
        except Exception as error:
            return JsonResponse({'ok': False, 'message': str(error)}, status=400)







@method_decorator(csrf_exempt, name='dispatch')
class MyView(View):
    def get(self, request):
        # Aquí va tu código para manejar las solicitudes GET
        return JsonResponse({'message': 'This is a GET request'})

    def post(self, request):
        # Aquí va tu código para manejar las solicitudes POST
        return JsonResponse({'message': 'This is a POST request'})

    def delete(self, request):
        # Aquí va tu código para manejar las solicitudes DELETE
        return JsonResponse({'message': 'This is a DELETE request'})
    
    def put(self, request):
        return JsonResponse({'message': 'This is a PUT request'})