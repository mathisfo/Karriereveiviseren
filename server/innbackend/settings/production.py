import os
from innbackend.settings.base import *

SECRET_KEY = os.environ.get("SECRET_KEY")
DEBUG = False
ALLOWED_HOSTS = [os.environ.get("PRODUCTION_HOST")]
#ALLOWED_HOSTS = ["innapp.herokuapp.com"]

INSTALLED_APPS.extend(["whitenoise.runserver_nostatic"])

# Must insert after SecurityMiddleware, which is first in settings/base.py
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")

TEMPLATES[0]["DIRS"] = [os.path.join(BASE_DIR, "../", "innfrontend", "build")]

STATICFILES_DIRS = [os.path.join(BASE_DIR, "../", "innfrontend", "build", "static")]
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

STATIC_URL = "/static/"
WHITENOISE_ROOT = os.path.join(BASE_DIR, "../", "innfrontend", "build", "root")
