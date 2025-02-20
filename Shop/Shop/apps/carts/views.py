from django.shortcuts import render, redirect,get_object_or_404
from .models import Cart, CartItem
from ..Store.models import Product
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from decimal import Decimal

# Create your views here.
def _card_id(request):
    cart = request.session.session_key
    if not cart:
        cart = request.session.create()
    return cart

def add_cart(request, product_id):
    try:
        if request.method != "POST":
            return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

        product = Product.objects.get(id=product_id)
        
        try:
            cart = Cart.objects.get(cart_id=_card_id(request))
        except Cart.DoesNotExist:
            cart = Cart.objects.create(cart_id=_card_id(request))

        try:
            cart_item = CartItem.objects.get(product=product, cart=cart, is_active=True)
            cart_item.quantity += 1
            cart_item.save()
        except CartItem.DoesNotExist:
            cart_item = CartItem.objects.create(
                product=product,
                cart=cart,
                quantity=1,
                is_active=True
            )

        cart_items = CartItem.objects.filter(cart=cart, is_active=True)
        total = 0
        for item in cart_items:
            total += item.product.price * item.quantity
        
        tax = total * 2 / 100
        grand_total = total + tax

        response_data = {
            'message': 'Add success',
            'item': {
                'quantity': cart_item.quantity,
                'total_item': cart_item.total_item(),
            },
            'total': str(total),
            'tax': str(tax),
            'grand_total': str(grand_total)
        }
        
        return JsonResponse(response_data)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def remove_cart(request,product_id):
    cart = Cart.objects.get(cart_id=_card_id(request))
    removeProduct = Product.objects.get(id = product_id)
    cartItem = CartItem.objects.get(product = removeProduct, cart = cart)
    if cartItem.quantity >1:
        cartItem.quantity -= 1
        cartItem.save()
    elif cartItem.quantity ==1:
        cartItem.delete()
    return redirect('cart')

def remove_cart_item(request,product_id):
    cart = Cart.objects.get(cart_id=_card_id(request))
    removeProduct = Product.objects.get(id = product_id)
    cartItem = CartItem.objects.get(product = removeProduct, cart = cart)
    # if cartItem.quantity >1:
    #     cartItem.quantity -= 1
    #     cartItem.save()
    cartItem.delete()
    return redirect('cart')


def cart(request, total=0, quantity=0, cartItem = None):
    try:
        tax = 0
        grandTotal = 0
        cart = Cart.objects.get(cart_id = _card_id(request))
        cartItem = CartItem.objects.filter(cart = cart, is_active=True)
        for i in cartItem:
            total += i.product.price * i.quantity
            quantity += 1
        tax = (2*total)/100
        grandTotal = total + tax
    except ObjectDoesNotExist:
        pass
    return render(request, "store/cart.html",{
        "cart_item": cartItem,
        "tax": tax,
        "grand_total":grandTotal,
        "total":total
    })