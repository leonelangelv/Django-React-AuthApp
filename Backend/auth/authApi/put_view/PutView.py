from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.views import APIView
from rest_framework.response import Response

import json
from django.contrib.auth.hashers import make_password
from django.db import connection
from django.http import HttpRequest
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class PutView(APIView):
    def put(self, request: HttpRequest):
        try:
            token = request.headers.get("Authorization")
            data = json.loads(request.body)
            user_id = data.get('user_id')
            name = data.get('name')
            lastname = data.get('lastname')
            password = data.get('password')
            repeat_password = data.get('repeat_password')
            country = data.get('country')
            province = data.get('province')

            try:
                UntypedToken(token)
            except (InvalidToken, TokenError) as error:
                return Response({'ok': False, 'message': str(error)}, status=401)
            
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM users WHERE userId = %s", [user_id])
                user_data = cursor.fetchone()

            if not user_data:
                return Response({'ok': False, 'message': 'The user does not exist'})

            # Verificar que las contraseñas coincidan
            if password != repeat_password:
                return Response({'ok': False, 'message': 'Passwords do not match'}, status=400)

            # Obtener el ID del país y la provincia
            with connection.cursor() as cursor:
                cursor.execute("SELECT countryId FROM Countries WHERE name = %s", [country])
                country_id = cursor.fetchone()[0]
                cursor.execute("SELECT provinceId FROM Provinces WHERE name = %s AND countryId = %s", [province, country_id])
                province_id = cursor.fetchone()[0]

            # Actualizar el usuario
            with connection.cursor() as cursor:
                hashed_password = make_password(password)
                cursor.execute("UPDATE Users SET name = %s, lastname = %s, passwordHash = %s, provinceId = %s WHERE userId = %s",
                               [name, lastname, hashed_password, province_id, user_id])

                return Response({'ok': True, 'message': 'User updated correctly'}, status=200)

        except Exception as e:
            print(f"Error in PutView: {str(e)}")
            return Response({'ok': False, 'message': 'Error updating user'}, status=500)
        