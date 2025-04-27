from django.db.models.signals import post_save
from django.dispatch import receiver
from Account.models import Account, VendorProfile, UserProfile

@receiver(post_save, sender=Account)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.role == 'Vendor':
            VendorProfile.objects.create(user=instance)
        elif instance.role == 'User':
            UserProfile.objects.create(user=instance)