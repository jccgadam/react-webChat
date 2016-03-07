Login = new React.createClass({
  getInitialState:function(){
  	return{
  		email:null,
  		password:null,
  		error:[]
  	}

  },
  handleEmailInput:function(event){
    event.preventDefault();
    this.setState({
    	email:event.target.value
    })
  },
  handlePasswordInput: function (event) {
  	event.preventDefault();
    this.setState({
      password: event.target.value
    });
  },
  onSubmit:function(event){
    event.preventDefault();
    var email = this.state.email;
    var password = this.state.password;
    
    Meteor.loginWithPassword(email,password,(error,res)=>{
    	if(!error){
    		FlowRouter.go('/');
    	}
    	else{

    		var loginerror='Email or Password not correct!'
			 if(this.state.error.indexOf(loginerror)==-1)
		    {
		      this.setState({error: this.state.error.concat([loginerror])})
		    }
	
            
		}

    	
    });
  },
  render:function(){
    return (
         <div>
          <form className='navbar-form' onSubmit={this.onSubmit}>
            <div className='row'>
             <div className='col-lg-8'>
              </div>
              <div className='col-lg-4'>
                <div className='form-group'>
    	            <input 
                    className='form-control'
    	              text="Email Address" 
    	              ref="email"
    	              type="email"
    	              placeholder="Email Address"
    	              onChange={this.handleEmailInput}/>
                </div>	         
                <div className='form-group'>
    	            <input
                    className='form-control' 
    	              text="Password" 
    	              type="password"
    	              ref="password"
    	              placeholder='Password'
    	              onChange={this.handlePasswordInput}/>
                </div>  
                 <button className='form-control btn btn-success' type='submit'>Login</button>
                 <a href='/signup'><button className='form-control btn btn-primary' type='button'>Sign Up</button></a>
                 <p>{this.state.error}</p> 
             </div>
           </div>
           </form>
         </div>
      )
  }
})