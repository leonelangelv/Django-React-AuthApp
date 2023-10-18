from mysql.connector.connection import MySQLConnection
from django.http import JsonResponse

def delete_user(cnx: MySQLConnection, user_id=None):
    cursor = cnx.cursor()

    cursor.execute("SELECT * FROM users WHERE userId = %s", (user_id,))
    user = cursor.fetchone()

    if user is None:
        return JsonResponse({"ok": False, "message": "User not found"}, status=404)

    cursor.execute("DELETE FROM addresses WHERE userId = %s", (user_id,))
    cursor.execute("DELETE FROM users WHERE userId = %s", (user_id,))

    cnx.commit()
    cursor.close()

    return JsonResponse({"ok": True, "msg": "User deleted"}, status=200)