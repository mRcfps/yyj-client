from django.conf.urls import url

from cart import views

urlpatterns = [
    url(
        r'^entries/$',
        views.EntryListView.as_view(),
        name='entry-list'
    ),
    url(
        r'^entries/(?P<pk>\d+)/$',
        views.EntryDetailView.as_view(),
        name='entry-detail'
    ),
]
