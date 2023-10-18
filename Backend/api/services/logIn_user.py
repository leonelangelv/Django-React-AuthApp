from mysql.connector.connection import MySQLConnection
from django.http import JsonResponse
import json


def logInUser(cnx: MySQLConnection, request):
    cursor = cnx.cursor()
    data = json.loads(request.body)

    name = data.get("name")
    password = data.get("password")

    cursor.execute(
        "SELECT `userId` FROM users WHERE LOWER(username) LIKE CONCAT('%', %s, '%') AND passwordHash = %s",
        (name, password,),
    )
    existUser = cursor.fetchone()
    print(existUser)

    if existUser != None:
        return JsonResponse(
            {"ok": True, "message": "El usuario si esta registrado"}, status=200
        )
    else:
        return JsonResponse(
            {"ok": False, "message": "Usuario no registrado"}, status=404
        )
