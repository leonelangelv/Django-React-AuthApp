from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail

import random
from django.contrib.auth.hashers import make_password
from django.conf import settings
from django.db import connection


class RecoveryPasswordView(APIView):
    def post(self, request):
        code = "".join(random.choices("0123456789", k=6))

        username = request.data.get("username")
        email = request.data.get("email")

        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM recoveryPasswordCode WHERE username = %s", [username]
            )
            hasCode = cursor.fetchone()
            if hasCode:
                return Response(
                    {
                        "ok": True,
                        "message": "You already have a recovery password code",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE username = %s", [username])
            user = cursor.fetchone()
            if not user:
                return Response(
                    {"ok": False, "message": "The username does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            else:
                cursor.execute(
                    "INSERT INTO recoveryPasswordCode (username, code) VALUES (%s, %s)",
                    [username, code],
                )

        try:
            send_mail(
                "Recovery Password",
                f"Tu código de verificación es: {code}",
                settings.EMAIL_HOST_USER,
                [email],
            )

            return Response(
                {"ok": True, "message": "Gmail sent successfully"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            print(f"Error in RecoveryPasswordView: {e}")
            return Response(
                {"ok": False, "message": f"Error sending email: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class CheckRecoveryPasswordView(APIView):
    def post(self, request):
        username = request.data.get("username")
        code = request.data.get("code")

        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM recoveryPasswordCode WHERE username = %s",
                [username],
            )
            userCode = cursor.fetchone()[1]
            if userCode == code:
                return Response(
                    {"ok": True, "message": "Code exists"},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"ok": False, "message": "The code does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )


class ResetPasswordView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        repeatPassword = request.data.get("repeatPassword")

        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM recoveryPasswordCode WHERE username = %s", [username]
            )
            userCode = cursor.fetchone()
            print(not userCode)
            if not userCode:
                return Response(
                    {"ok": False, "message": "The code expired"},
                    status=status.HTTP_404_NOT_FOUND,
                )

        if password == repeatPassword:
            password_hash = make_password(password)
            with connection.cursor() as cursor:
                cursor.execute(
                    "UPDATE users SET passwordHash = %s WHERE username = %s",
                    [password_hash, username],
                )

            return Response(
                {"ok": True, "message": "Password updated successfully"},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"ok": False, "message": "Passwords do not match"},
                status=status.HTTP_400_BAD_REQUEST,
            )
