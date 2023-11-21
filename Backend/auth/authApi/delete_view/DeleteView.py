from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.views import APIView
from rest_framework.response import Response

import json
from django.contrib.auth.hashers import check_password
from django.db import connection
from django.http import HttpRequest
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class DeleteView(APIView):
    def delete(self, request: HttpRequest):
        try:
            token = request.headers.get('Authorization')
            
            data = json.loads(request.body)
            userId = data.get("userId")
            password = data.get("password")

            try:
                UntypedToken(token)
            except (InvalidToken, TokenError) as e:
                return Response({'ok': False, 'message': str(e)}, status=401)

            with connection.cursor() as cursor:
                cursor.execute("SELECT passwordHash FROM users WHERE userId=%s", [userId])
                userPassword = cursor.fetchone()[0]

            if check_password(password, userPassword):
                with connection.cursor() as cursor:
                    cursor.execute("DELETE FROM users WHERE userId = %s", [userId])
                    return Response({'ok': True, 'message': 'User deleted'})
            else:
                return Response({'ok': False, 'message': 'Invalid password'})
            
        except Exception as error:
            return Response({'ok': False, 'message': str(error)}, status=400)