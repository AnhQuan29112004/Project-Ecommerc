from ..carts.models import Cart, CartItem
from ..carts.views import _card_id
def counter(request):
    counter = 0
    if "admin" in request.path:
        return {}
    else:
        try:
            cart = Cart.objects.get(cart_id = _card_id(request))
            cartItem = CartItem.objects.filter(cart = cart)
            for i in cartItem:
                counter += i.quantity
        except:
            pass
    return dict(counter_cart = counter)