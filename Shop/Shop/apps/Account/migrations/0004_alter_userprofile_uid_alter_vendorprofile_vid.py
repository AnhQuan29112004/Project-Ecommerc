# Generated by Django 5.1 on 2025-03-29 08:58

import shortuuidfield.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0003_alter_userprofile_uid_alter_vendorprofile_vid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='uid',
            field=shortuuidfield.fields.ShortUUIDField(blank=True, default='user_N7Ttz6', editable=False, max_length=22, unique=True),
        ),
        migrations.AlterField(
            model_name='vendorprofile',
            name='vid',
            field=shortuuidfield.fields.ShortUUIDField(blank=True, default='ven_fENyqF', editable=False, max_length=22, unique=True),
        ),
    ]
