from django.contrib import admin
from .models import Account, UserProfile, VendorProfile
from django.utils.safestring import mark_safe


# Register your models here.
class AccountAdmin(admin.ModelAdmin):
    list_display = ["email", 'username','is_active','date_joined']
    readonly_fields = ["password"]
    fieldsets=()
    ordering = ['-date_joined']
    list_filter = ['email']

class UserProfileAdmin(admin.ModelAdmin):
    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"
        

class VendorProfileAdmin(admin.ModelAdmin):
    def user_name(self, obj):
        return mark_safe(f'<p>{obj.user.username}</p>')
    
    list_display = ["user_name"]
    class Meta:
        verbose_name = "Vendor Profile"
        verbose_name_plural = "Vendor Profiles"
        
admin.site.register(Account, AccountAdmin)
admin.site.register(UserProfile,UserProfileAdmin)
admin.site.register(VendorProfile,VendorProfileAdmin)

