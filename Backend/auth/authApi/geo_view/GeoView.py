from rest_framework_simplejwt.tokens import RefreshToken, UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

import json
from django.contrib.auth.hashers import make_password, check_password
from django.db import connection
from django.http import HttpRequest

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class GeoView(APIView):
    
    def get(self, request: HttpRequest, country=None):
        try:
            token = request.headers['Authorization']
        except Exception as e:
            return Response({'ok': False, 'message': f'The header {str(e)} does not exist'})
        
        try:
            UntypedToken(token)
        except (InvalidToken, TokenError) as e:
            return Response({'ok': False, 'message': str(e)}, status=401)
        
        try:
            if country:
                countries = self.get_countries()
                provinces = self.get_provinces(country)
                
                geo_dict = self.create_geo_dict(countries, provinces, country)
                
                return Response(geo_dict)
            
            countries = self.get_countries()

            geo_dict = self.create_geo_dict(countries)

            return Response(geo_dict)
        
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    def get_countries(self):
        with connection.cursor() as cursor:
            cursor.execute('SELECT name FROM countries')
            return cursor.fetchall()

    def get_provinces(self, country):
        with connection.cursor() as cursor:
            cursor.execute('''
                SELECT p.name
                FROM provinces p
                INNER JOIN countries c ON c.`countryId` = p.`countryId`
                WHERE c.name = %s;
            ''', [country])
            return cursor.fetchall()

    def create_geo_dict(self, countries, provinces=None, country_name=None):
        geo_dict = dict()
        if country_name:
            geo_dict['countries'] = {'name': country_name}
            geo_dict['countries']['provinces'] = [{'name': province[0]} for province in provinces]
        else:
            geo_dict['countries'] = [{'name': country[0]} for country in countries]
        return geo_dict