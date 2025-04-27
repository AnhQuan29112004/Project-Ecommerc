from Shop.apps.Account.models import Account
from django.contrib.contenttypes.models import ContentType
from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.db import transaction

class Command(BaseCommand):
    help = "Create Permissions"
    
    def handle(self, *args, **options):
        
        vendor = Group.objects.get(name='Vendor')
        vendor.permissions.set(Permission.objects.all())

        user = Group.objects.get(name='User')
        user.permissions.set(Permission.objects.all())

        admin_group = Group.objects.get(name='Admin')
        admin_group.permissions.set(Permission.objects.all())