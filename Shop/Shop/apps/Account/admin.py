from django.contrib import admin
from .models import Account

# Register your models here.
class AccountAdmin(admin.ModelAdmin):
    list_display = ["email", 'username','is_active','date_joined']
    readonly_fields = ["password"]
    fieldsets=()
    ordering = ['-date_joined']
    list_filter = ['email']

admin.site.register(Account, AccountAdmin)