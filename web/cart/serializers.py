from rest_framework import serializers

from cart.models import CartEntry
from shop.serializers import ItemSerializer


class CartEntrySerializer(serializers.ModelSerializer):

    item = ItemSerializer()
    photo = serializers.SerializerMethodField()

    class Meta:
        model = CartEntry
        fields = ('id', 'item', 'quantity', 'photo')
        read_only_field = ('item', 'photo')

    def get_photo(self, cart_entry):
        request = self.context.get('request')
        try:
            photo = cart_entry.item.product.image.url
            return request.build_absolute_uri(photo)
        except ValueError:
            # this product has no avatar
            return None


class CartEntryEditSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartEntry
        fields = ('quantity',)
