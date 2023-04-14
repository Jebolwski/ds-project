from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = 'django-insecure-1$=y8c2+23cd%ps3aoszxvmk3im=o644zzil6a2%!m#rpgj431'

DEBUG = True

ALLOWED_HOSTS = []


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'base',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'rest_auth',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'rest_auth.registration',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "APP": {
            "client_id": "312160132508-559m6f8fou58ah8bog5p2s686fm12b6k.apps.googleusercontent.com",
            "secret": "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",
        },
    },
}



CORS_ALLOW_ALL_ORIGINS = True

WSGI_APPLICATION = 'backend.wsgi.application'

SITE_ID = 4

REST_FRAMEWORK = {
    'DATETIME_FORMAT': '%d %B %Y %H:%M',
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
}


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LOGIN_REDIRECT_URL = "/"

LANGUAGE_CODE = 'en-EN'

TIME_ZONE = 'Europe/Istanbul'

USE_I18N = True

USE_TZ = True

OIDC_RSA_PRIVATE_KEY = "oixr42"

STATIC_ROOT= os.path.join(BASE_DIR,'staticfiles')

STATIC_URL = '/static/'

MEDIA_ROOT = 'media/'

MEDIA_URL = 'media/'


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = "587"
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "besevler.mah.muh@gmail.com"
EMAIL_HOST_PASSWORD = "yeewkfrckfphikfa"

STRIPE_SECRET_KEY = "sk_test_51Mrh0yEOifjlaxrYnhbYBIm8UxkihZwXU5mM7lj8Fq0VFZ9dEDSkkZxvz3uAtKvSVhLyDmn2gJwBBiWT4UHR4Asp00izLPiUmv"
STRIPE_WEBHOOK_SECRET = "whsec_f8ec86c5648f8345da108ea3222576afa41a5210f6caabb672441ec231ff6dee"
CHECKOUT_SUCCESS_URL = "http://localhost:3000/checkout/success/"
CHECKOUT_FAILED_URL = "http://localhost:3000/checkout/failed/"