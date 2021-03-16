export const routes = [
    {
      path: '/register',
      name: 'Register',
      component:()=>import('../views/Register')
    },
    {
      path: '/login',
      name: 'Login',
      component:()=>import('../views/Login')
    },
    {
      path: '/',
      name: 'Main',
      component:()=>import('../views/Main'),
      children:[
        {
          path:'/home',
          name:'Home',
          component:()=>import('../views/Home')
        },
        {
          path:'/typeList',
          name:'TypeList',
          component:()=>import('../views/TypeList')
        },
        {
          path:'/createType',
          name:'CreateType',
          component:()=>import('../views/CreateType')
        },
        {
          path:'/productList',
          name:'ProductList',
          component:()=>import('../views/ProductList')
        },
        {
          path:'/postProduct',
          name:'PostProduct',
          component:()=>import('../views/PostProduct')
        },
      ]
    }
  ]