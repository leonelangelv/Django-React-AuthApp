from mysql.connector.connection import MySQLConnection
from django.http import JsonResponse
import json

def create_user(cnx: MySQLConnection, request):
    """
      Crea un nuevo usuario en la base de datos.

      Esta función toma una conexión MySQL, una solicitud HTTP que contiene los datos del usuario,
      y crea un nuevo usuario en la base de datos si el usuario no existe previamente.

      :param cnx: Conexión MySQL activa.
      :param request: Objeto de solicitud HTTP que contiene los datos del usuario.
      :return: Un objeto JsonResponse con el resultado de la operación.
    """
    cursor = cnx.cursor()
    data = json.loads(request.body)

    username = data.get("user").get("username")
    password = data.get("user").get("passwordHash")

    cursor.execute(
        "SELECT COUNT(*) as user_count FROM users WHERE username = %s", (username,)
    )
    exist_user = cursor.fetchone()

    if exist_user[0] > 0:
        return JsonResponse(
            {
                "ok": False,
                "message": "El usuario ya existe",
            },
            status=409
        )

    if username and password:
        streetAddress = data.get("address").get("streetAddress")
        city = data.get("address").get("city")
        state = data.get("address").get("state")
        zipCode = data.get("address").get("zipCode")

        add_user = "INSERT INTO users (username, passwordHash) VALUES (%s, %s)"
        data_user = (username, password)
        cursor.execute(add_user, data_user)
        user_id = cursor.lastrowid

        add_address = "INSERT INTO addresses (`userId`, `streetAddress`, city, state, `zipCode`) VALUES (%s, %s, %s, %s, %s)"
        data_address = (user_id, streetAddress, city, state, zipCode)
        cursor.execute(add_address, data_address)
        address_id = cursor.lastrowid

        cnx.commit()
        cursor.close()

        return JsonResponse(
            {
                "ok": True,
                "message": "Usuario registrado exitosamente.",
                "data": {
                    "userId": user_id,
                    "username": username,
                },
            },
            status=201,
        )
    else:
        return JsonResponse(
            {
                "ok": False,
                "message": "Campos vacios.",
            },
            status=400,
        )