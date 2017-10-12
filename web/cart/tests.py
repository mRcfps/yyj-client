from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from shop.models import Product, Item
from cart.models import Cart, CartEntry


class CartTests(APITestCase):
    """Test suite for cart-related APIs."""

    def setUp(self):
        self.user = User.objects.create_user(
            username='test',
            password='test'
        )
        self.product = Product.objects.create(name='iPhone')
        self.item_one = Item.objects.create(
            product=self.product,
            description='iPhone 7',
            price=10.00,
            unit='pcs',
            stock=100
        )
        self.item_two = Item.objects.create(
            product=self.product,
            description='iPhone 7 Plus',
            price=20.00,
            unit='pcs',
            stock=100
        )

        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_cart_entry_lifecycle(self):
        # Tom visits item-list api for the first time
        response = self.client.get(reverse('cart:entry-list'))

        # He can visit API and there's nothing in the cart
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

        # He adds two iPhone 7 to the cart
        data = {'item': self.item_one.id, 'quantity': 2}
        url = reverse('shop:add-to-cart')
        response = self.client.post(url, data, format='json')

        # His cart is not empty now
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(Cart.objects.get(user=self.user).entries.count(), 0)

        # He adds an iPhone 7 again
        data = {'item': self.item_one.id, 'quantity': 1}
        response = self.client.post(url, data, format='json')

        # He still has only one entry in the cart
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Cart.objects.get(user=self.user).entries.count(), 1)
        # self.assertEqual(response.data[0]['quantity'], 3)

        # He continues to add an iPhone 7 Plus to the cart
        data = {'item': self.item_two.id, 'quantity': 1}
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Cart.objects.get(user=self.user).entries.count(), 2)

        # He removed the iPhone 7 Plus
        url = reverse('cart:entry-detail', args=['2'])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Cart.objects.get(user=self.user).entries.count(), 1)
