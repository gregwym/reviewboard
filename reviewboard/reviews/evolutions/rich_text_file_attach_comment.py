from django_evolution.mutations import AddField
from django.db import models

MUTATIONS = [
    AddField('FileAttachmentComment', 'rich_text', models.BooleanField,
             initial=False)
]
