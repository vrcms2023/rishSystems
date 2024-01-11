# Generated by Django 4.2.5 on 2024-01-11 05:53

import common.BaseModel
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='imageAndVideo',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('created_by', models.CharField(blank=True, max_length=50, null=True)),
                ('updated_by', models.CharField(blank=True, max_length=50, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('path', models.FileField(blank=True, null=True, upload_to=common.BaseModel.image_upload_path)),
                ('category', models.CharField(blank=True, max_length=100, null=True)),
                ('originalname', models.CharField(blank=True, max_length=100, null=True)),
                ('contentType', models.CharField(blank=True, max_length=100, null=True)),
                ('alternitivetext', models.CharField(blank=True, max_length=500, null=True)),
                ('image_title', models.CharField(blank=True, max_length=200, null=True)),
                ('image_description', models.CharField(blank=True, max_length=500, null=True)),
                ('likes', models.BooleanField(default=False)),
                ('Views', models.CharField(blank=True, max_length=500, null=True)),
                ('Downloads', models.CharField(blank=True, max_length=500, null=True)),
                ('location', models.CharField(blank=True, max_length=500, null=True)),
                ('imageDimension', models.CharField(blank=True, max_length=200, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]