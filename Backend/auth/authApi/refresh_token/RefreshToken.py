from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.response import Response

from django.http import HttpRequest


class RefreshTokenView(APIView):
    def post(self, request: HttpRequest):
        try:
            token = request.headers.get("Authorization")

            try:
                AccessToken(token)
                return Response({"ok": True, "message": "Valid token"}, status=200)
            except (InvalidToken, TokenError) as e:
                return Response({"ok": False, "message": str(e)}, status=401)

        except Exception as error:
            print(f"Error in RefreshTokenView: {error}")
            return Response({"ok": False, "message": str(error)}, status=400)
