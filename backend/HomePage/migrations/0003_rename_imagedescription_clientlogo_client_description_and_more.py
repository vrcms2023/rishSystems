# Generated by Django 4.2.5 on 2024-01-08 05:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('HomePage', '0002_rename_alt_text_clientlogo_alternitivetext_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='clientlogo',
            old_name='imageDescription',
            new_name='client_description',
        ),
        migrations.RenameField(
            model_name='clientlogo',
            old_name='clientTitle',
            new_name='client_title',
        ),
    ]