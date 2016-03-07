Greeting = React.createClass({
  getFullName(){
    var firstName = this.props.profile.firstName;
    var lastName = this.props.profile.lastName;
    return firstName +' '+lastName;

  },
   render(){
    var style={
      color:'white'
    }
    return (<p style={style}>Hello! {this.getFullName()}</p>)
   }
})

Navbar = new React.createClass({
    _renderNavBar(){
      const user = this.props.user
      if(!this.props.isLoggedIn) 
        return <Login/>
      return <div className='row'>
        <div className='col-lg-8'>
        </div>
        <div className='col-lg-2'>
          <Greeting profile={user.profile}/>
        </div>
        <div className='col-lg-2'> 
          <LogOut/>
        </div>  
      </div>
    },
   render(){
     var style={
        marginTop:'8px',
        width:'100%'
     }
        return <div className="navbar navbar-inverse navbar-fixed-top" >
          <div className = 'navbar-collapse collapse' style={style}>
          <div>
           {this._renderNavBar()}
          </div>
          </div>  
        </div> 
  }
})

