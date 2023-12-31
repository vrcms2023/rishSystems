# Generated by Django 4.2.5 on 2024-01-08 05:03

import common.BaseModel
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('HomePage', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='clientlogo',
            old_name='alt_text',
            new_name='alternitivetext',
        ),
        migrations.AddField(
            model_name='clientlogo',
            name='category',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='clientlogo',
            name='contentType',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='clientlogo',
            name='originalname',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='clientlogo',
            name='path',
            field=models.FileField(blank=True, null=True, upload_to=common.BaseModel.image_upload_path),
        ),
    ]
