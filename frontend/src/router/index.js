import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CharacterView from '../views/CharacterView.vue'
import EvaluationView from '../views/EvaluationView.vue'
import LightconeView from '../views/LightconeView.vue'
import LightconeDetailView from '../views/LightconeDetailView.vue'
import LightconeEditView from '../views/LightconeEditView.vue'
import LightconeCreateView from '../views/LightconeCreateView.vue'
import CharacterBuildView from '../views/CharacterBuildView.vue'
import BuildListView from '../views/BuildListView.vue'
import BuildDetailView from '../views/BuildDetailView.vue'
import CharacterEditView from '../views/CharacterEditView.vue'
import CharacterCreateView from '../views/CharacterCreateView.vue' // นำเข้า CharacterCreateView

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/characters',
      name: 'characters',
      component: CharacterView
    },
    {
      path: '/evaluation',
      name: 'evaluation',
      component: EvaluationView
    },
    {
      path: '/lightcones',
      name: 'lightcones',
      component: LightconeView
    },
    {
      path: '/lightcone/:id',
      name: 'lightcone-detail',
      component: LightconeDetailView
    },
    {
      path: '/lightcone/:id/edit',
      name: 'lightcone-edit',
      component: LightconeEditView
    },
    {
      path: '/lightcone/create',
      name: 'lightcone-create',
      component: LightconeCreateView
    },
    {
      path: '/character/:id/build',
      name: 'character-build',
      component: CharacterBuildView
    },
    {
      path: '/builds',
      name: 'builds',
      component: BuildListView
    },
    {
      path: '/build/:id',
      name: 'build-detail',
      component: BuildDetailView
    },
    {
      path: '/character/:id/edit',
      name: 'character-edit',
      component: CharacterEditView
    },
    {
      path: '/character/create',
      name: 'character-create',
      component: CharacterCreateView
    }
  ]
})

export default router