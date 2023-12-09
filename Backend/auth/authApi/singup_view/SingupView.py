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
            userExist = cursor.fetchone()

        if userExist:
            return Response({'ok': False, 'message': 'The user already exists'})

        if password == repetPassword and username:
            hashed_password = make_password(password)
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO users (username, name, lastname, passwordHash) VALUES (%s, %s, %s, %s)", [username, name, lastname, hashed_password])
                userId = cursor.lastrowid
            
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM users WHERE username = %s", [username])
                userData = cursor.fetchone()

            with connection.cursor() as cursor:
                userId = userData[0]
                cursor.execute('''
                    SELECT p.name, c.name FROM users u
                    JOIN provinces p ON p.provinceId = u.provinceId
                    JOIN countries c ON c.countryId = p.countryId
                    WHERE u.userId = %s''', [userId])
                userLocation = cursor.fetchone()
                
            user_simulator = UserSimulator({'id': cursor.lastrowid, 'username': username})
            refresh = RefreshToken.for_user(user_simulator)
            access_token = str(refresh.access_token)

            if userLocation:
                province = userLocation[0]
                country = userLocation[1]
            else:
                province = 'No selected'
                country = 'No selected'
            
            return Response({
                'ok': True, 
                'userId': userId,
                'access_token': access_token, 
                'message': 'user created', 
                'user': {
                    "userId": userData[0],
                    "username": userData[1],
                    "name": userData[2],
                    "lastname": userData[3],
                    "province": province,
                    "country": country,
                }})
        else:
            return Response({'ok': False, 'message': 'invalid credentials'})