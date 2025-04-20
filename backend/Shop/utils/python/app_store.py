from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

def paginate(request,product, per_page):
    paginate = Paginator(product, per_page)
    crrPage = request.GET.get('page')
    paginateStore = paginate.get_page(crrPage)
    numberPerPage = paginate.page_range
    numberPage = paginateStore.number
    
    return [paginateStore,numberPerPage,numberPage]


    