from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response

import json
from django.contrib.auth.hashers import make_password
from django.db import connection
from django.http import HttpRequest
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from auth.utils.UserSimulator import UserSimulator

@method_decorator(csrf_exempt, name='dispatch')
class SingupView(APIView):
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
            return Response({'ok': False, 'message': 'The user already exists'})

        if password == repetPassword and username:
            hashed_password = make_password(password)
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO users (username, name, lastname, passwordHash) VALUES (%s, %s, %s, %s)", [username, name, lastname, hashed_password])
                userId = cursor.lastrowid
                
            user_simulator = UserSimulator({'id': cursor.lastrowid, 'username': username})
            refresh = RefreshToken.for_user(user_simulator)
            access_token = str(refresh.access_token)
            return Response({'ok': True, 'userId': userId, 'access_token': access_token, 'message': 'user created'})
        else:
            return Response({'ok': False, 'message': 'invalid credentials'})