from django.contrib import admin
from ErrorSim.models import ErrorRecord


class ErrorRecordAdmin(admin.ModelAdmin):
    list_display = ['id', 'api', 'code', 'https', 'encrypt']

admin.site.register(ErrorRecord, ErrorRecordAdmin)
