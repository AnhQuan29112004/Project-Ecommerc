from rest_framework.filters import BaseFilterBackend
from datetime import datetime

class CustomSearchFilter(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        for key, value in request.query_params.items():
            if key and key not in ["page", "pageSize"] and value:
                if key == "keySearch":
                    queryset = queryset.filter(name__icontains=value)
                elif key == "researchField":
                    queryset = queryset.filter(researchField__name__icontains=value)
                elif key == "start_date":
                    try:
                        date_value = datetime.strptime(value, "%d/%m/%Y").date()
                        queryset = queryset.filter(**{f"start_date__gte": date_value})
                    except ValueError:
                        print("Invalid date format")
                elif key == "end_date":
                    try:
                        date_value = datetime.strptime(value, "%d/%m/%Y").date()
                        queryset = queryset.filter(**{f"start_date__lte": date_value})
                    except ValueError:
                        print("Invalid date format")
                else:
                    queryset = queryset.filter(**{f"{key}__icontains": value})
        return queryset