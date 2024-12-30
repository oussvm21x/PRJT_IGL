from rest_framework import permissions

class IsPatientOwner(permissions.BasePermission):
    """
    Custom permission to allow a patient to only access their own DPI.
    """

    def has_object_permission(self, request, view, obj):
        return obj.patient.user == request.user