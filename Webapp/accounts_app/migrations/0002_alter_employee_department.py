# Generated by Django 5.0 on 2023-12-06 23:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='department',
            field=models.CharField(default='Sales', max_length=100),
        ),
    ]
