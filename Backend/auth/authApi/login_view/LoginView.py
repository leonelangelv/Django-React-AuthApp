from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response

import json
from django.contrib.auth.hashers import check_password
from django.db import connection
from django.http import HttpRequest
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from auth.utils.UserSimulator import UserSimulator

@method_decorator(csrf_exempt, name="dispatch")
class LoginView(APIView):
    def post(self, request: HttpRequest):
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM users WHERE username=%s", [username])
                userData = cursor.fetchone()

            if not userData:
                return Response({"ok": False, "message": "The username does not exist"})

            with connection.cursor() as cursor:
                userId = userData[0]
                cursor.execute('''
                    SELECT p.name, c.name FROM users u
                    JOIN provinces p ON p.provinceId = u.provinceId
                    JOIN countries c ON c.countryId = p.countryId
                    WHERE u.userId = %s''', [userId])
                userLocation = cursor.fetchone()
            hashed_password = userData[4]

            if not check_password(password, hashed_password):
                return Response({"ok": False, "message": "Invalid password"})

            if userData and check_password(password, hashed_password):
                user_simulator = UserSimulator({"id": userData[0], "username": userData[1]})

                refresh = RefreshToken.for_user(user_simulator)
                access_token = str(refresh.access_token)

                if userLocation:
                    province = userLocation[0]
                    country = userLocation[1]
                else:
                    province = 'No selected'
                    country = 'No selected'
                
                return Response(
                    {
                        "ok": True,
                        "userId": userData[0],
                        "access_token": access_token,
                        "message": "",
                        "user": {
                            "userId": userData[0],
                            "username": userData[1],
                            "name": userData[2],
                            "lastname": userData[3],
                            "province": province,
                            "country": country,
                        },
                    }
                )
            
            return Response({"ok": False, "message": "Unexpected error"})

        except Exception as e:
            return Response({'error in LoginView': str(e)})
