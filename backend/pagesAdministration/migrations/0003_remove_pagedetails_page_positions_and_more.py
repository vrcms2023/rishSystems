# Generated by Django 4.2.5 on 2024-01-14 03:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pagesAdministration', '0002_pagedetails_page_positions'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pagedetails',
            name='page_positions',
        ),
        migrations.AddField(
            model_name='pagedetails',
            name='page_position',
            field=models.IntegerField(default=0, max_length=100),
        ),
    ]