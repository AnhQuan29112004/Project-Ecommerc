# Generated by Django 5.1 on 2025-03-29 08:55

import Shop.apps.Store.models
import shortuuidfield.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Store', '0002_alter_product_product_status_alter_product_sku_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(upload_to=Shop.apps.Store.models.product_upload_path),
        ),
        migrations.AlterField(
            model_name='product',
            name='sku',
            field=shortuuidfield.fields.ShortUUIDField(blank=True, default='sku_KJ8tHZ', editable=False, max_length=22, unique=True),
        ),
    ]
