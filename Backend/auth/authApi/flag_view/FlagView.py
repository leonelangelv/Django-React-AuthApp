from rest_framework.views import APIView 
from rest_framework.response import Response

import json
from django.http import HttpResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class FlagView(APIView):
  def get(self, request: HttpResponse, country=None):
    try:
      if country is None:
        return Response({'ok': False, 'message': 'The country name is required', 'flag': '', 'name': ''})
      
      with connection.cursor() as cursor:
        cursor.execute("SELECT urlImg, name FROM countries WHERE name = %s", [country])  
        data = cursor.fetchone()
        userFlag = data[0]
        flagName = data[1]

        return Response({'ok': True, 'message': '','flag': userFlag, 'name': flagName})

    except Exception as error:
      print(f"Error in FlagView: {error}") 