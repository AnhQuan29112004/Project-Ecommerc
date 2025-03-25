from django.utils.deprecation import MiddlewareMixin
from django.contrib.sessions.backends.db import SessionStore
from django.conf import settings


class CustomSessionMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith("/admin/"):
            settings.SESSION_COOKIE_NAME = "admin_session"
        else:
            settings.SESSION_COOKIE_NAME = "user_session"

        response = self.get_response(request)
        return response 