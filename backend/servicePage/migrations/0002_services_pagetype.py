# Generated by Django 4.2.5 on 2024-01-05 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servicePage', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='services',
            name='pageType',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
