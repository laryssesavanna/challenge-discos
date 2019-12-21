import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import DiscCreate from '../components/discs/DiscCreate.vue';
import DiscList from '../components/discs/DiscList.vue';
import CollectionCreate from '../components/collections/CollectionCreate.vue';
import CollectionList from '../components/collections/CollectionList.vue';
import CollectionView from '../components/collections/CollectionView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  // DISC ROUTES
  {
    path: '/disc/create',
    name: 'create-disc',
    component: DiscCreate,
  },
  {
    path: '/disc/list',
    name: 'list-disc',
    component: DiscList,
  },
  {
    path: '/disc/edit/:idDisc',
    name: 'edit-disc',
    component: DiscCreate,
    props: true,
  },
  // COLLECTION ROUTES
  {
    path: '/collection/create',
    name: 'create-collection',
    component: CollectionCreate,
  },
  {
    path: '/collection/list',
    name: 'list-collection',
    component: CollectionList,
  },
  {
    path: '/collection/view/:idColl',
    name: 'view-collection',
    component: CollectionView,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
