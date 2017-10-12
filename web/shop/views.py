from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from shop.models import Product, Photo, Item
from shop.serializers import (ProductDetailSerializer,
                              ProductPhotoSerializer,
                              ItemSerializer)
from cart.models import Cart, CartEntry

import message


class ProductDetailView(generics.RetrieveAPIView):

    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    permission_classes = (AllowAny,)


class ProductPhotosView(generics.ListAPIView):

    serializer_class = ProductPhotoSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        product = Product.objects.get(id=self.kwargs['pk'])
        return product.photos.all()


class ProductItemsView(generics.ListAPIView):

    serializer_class = ItemSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        product = Product.objects.get(id=self.kwargs['pk'])
        return product.items.all()


class AddToCartView(APIView):

    def post(self, request):
        item = Item.objects.get(id=request.data['item'])
        cart, created = Cart.objects.get_or_create(user=request.user)

        # Check if the item added is already in the cart
        for entry in cart.entries.all():
            if entry.item == item:
                entry.quantity += int(request.data['quantity'])
                entry.save()
                return Response(message.OPERATION_SUCCEED,
                                status=status.HTTP_200_OK)

        # Else, we create new cart entry for this item
        CartEntry.objects.create(
            cart=cart,
            item=item,
            quantity=request.data['quantity']
        )

        return Response(message.OPERATION_SUCCEED,
                        status=status.HTTP_200_OK)
