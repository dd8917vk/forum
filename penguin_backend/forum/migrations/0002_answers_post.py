# Generated by Django 3.1.4 on 2020-12-16 21:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='answers',
            name='post',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='forum.posts'),
            preserve_default=False,
        ),
    ]
