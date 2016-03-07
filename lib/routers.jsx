const routeHandler = (args) => {

  const defaults = {
    title: "Hello World",
    description: "React WebChap App",
    tmpl: null
  }
  args = Object.assign(defaults,args)

  ReactLayout.render(MainLayout, args)
}

FlowRouter.route('/', {
    name:'home',
    action: function(params, queryParams) {
        routeHandler({title:'Welcome to React ChatApp!'})
    }
});

FlowRouter.route('/signup', {
    name:'home',
    action: function(params, queryParams) {
        // routeHandler({title:'User Account Registration!'})
    ReactLayout.render(Signup)    
    }
});

FlowRouter.route('/room/:tuId', {
  name:'category',
    action: function(params, queryParams) {
       routeHandler({tuId:params.tuId,title:'Chatting Room Entered!'})
    }
});


// FlowRouter.route('/addFriend',{
//   name:'addFriend',
//    action:function(params){
//      ReactLayout.render(addFriend);
//    }
// })