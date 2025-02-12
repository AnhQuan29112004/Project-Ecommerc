from ..Category.models import Category

def linkMenu(request):
    category = Category.objects.all()
    return dict(links = category)