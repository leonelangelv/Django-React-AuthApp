from .authApi.singup_view.SingupView import SingupView
from .authApi.login_view.LoginView import LoginView
from .authApi.put_view.PutView import PutView
from .authApi.delete_view.DeleteView import DeleteView
from .authApi.geo_view.GeoView import GeoView
from .authApi.refresh_token.RefreshToken import RefreshTokenView
from .authApi.flag_view.FlagView import FlagView

def superPrint(msg):
    print(' - '*20)
    print(msg)
    print(' - '*20)
    