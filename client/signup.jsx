
 Signup = React.createClass({
  getInitialState: function () {
    return {
      email: null,
      password: null,
      confirmPassword: null,
      firstName:null,
      midName:null,
      lastName:null,
      error:[],
      formIsValidate:false,
     
    }
  },
  handleEmailInput:function(event){
    event.preventDefault();
    this.setState({
    	email:event.target.value
    })
    var dupUser = 'Duplicate user';
    var index = this.state.error.indexOf(dupUser)
		if(index !=-1)
		{
			 var error = this.state.error.slice();
             error.splice(index, 1); 
             this.setState({error: error});
		}
  },
  validateEmail: function (event) {
  	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag = re.test(event.target.value);
    var notEmail = '* Email not validate';
 	if(!flag){
    	 if(this.state.error.indexOf(notEmail)==-1)
    	    {
    	    	this.setState({error: this.state.error.concat([notEmail])})
    	    }
 	}
 	else{
 		var index = this.state.error.indexOf(notEmail)
		if(index !=-1)
		{
			 var error = this.state.error.slice();
             error.splice(index, 1); 
             this.setState({error: error});
		}
 	}
  },
  handleFirstNameInput:function(event){
    event.preventDefault();
    this.setState({
    	firstName:event.target.value
    })
  },
  handleLastNameInput:function(event){
    event.preventDefault();
    this.setState({
    	lastName:event.target.value
    })
  },
  handlePasswordInput: function (event) {
  	event.preventDefault();
    this.setState({
      password: event.target.value
    });
  },
  handleConfirmPasswordInput: function (event) {
  	event.preventDefault();
    this.setState({
      confirmPassword: event.target.value
    });
  },
  isConfirmedPassword: function (event) {
    var pswnotMatch = '* Password input do not match';
    if (event.target.value != this.state.password)
       {
          if(this.state.error.indexOf(pswnotMatch)==-1)
    	    {
    	      this.setState({error: this.state.error.concat([pswnotMatch])})
    	    }
       }
    else
        {
    	var index = this.state.error.indexOf(pswnotMatch)
    	if(index !=-1)
    	{   
    		 var error = this.state.error.slice();
             error.splice(index, 1); 
             this.setState({error: error});
    	}

    }   
  },
  isEmpty: function (value) {
    return !_.isEmpty(value);
  },
  _renderError(){
    var errors = this.state.error;
    return errors.map((error,index) => {
      return <div className="alert alert-warning fade in" key={index}>
              <a href="#" className="close" data-dismiss="alert" aria-label="close" title="close">×</a>
              <strong>Error!{error}</strong>
             </div>
    }); 
  },
  onSubmit:function(event){
  	// event.preventDefault();
  	var formIsValidate = this.state.error.length===0;
    if(formIsValidate)
    {   event.preventDefault();
    	Accounts.createUser({email:this.state.email,password:this.state.password,profile:{firstName:this.state.firstName,lastName:this.state.lastName}},
    		(error,res)=>{
    			if(error){
    				var dupUser = 'Duplicate user';
    				 if(this.state.error.indexOf(dupUser)==-1)
				    	    {
				    	    	this.setState({error: this.state.error.concat([dupUser])})
				    	    }
    			}
    			else{
            var curUser = Meteor.userId();
            Friends.insert({owner:curUser,friends:[]})
    				FlowRouter.go('/')
    			}
    		})
    	
    }
    else{
    	event.preventDefault();
    }
  },
  render: function() {
    var style = {
      marginTop:'-20px',
      marginLeft:'35%'
    }
    var form = {
      border:'solid 1.5px',
      width:'350px',
      padding:'20px'
    }
    return <div>
      <div className='jumbotron'>
        <MainHeader title='User Registration' description='Create User' />
        </div> 
      <div className="create_account_screen" style={style}>  
        <div className="create_account_form" style={form}>
          {/*<h1>Create account</h1>*/}
          <form onSubmit={this.onSubmit}>
           <div className='row'>
            <div className='col-lg-3'>
	            {/*<input 
	              text="Email Address" 
	              ref="email"
	              type="email"
	              placeholder="Email Address"
	              onChange={this.handleEmailInput}
	              onBlur = {this.validateEmail}
	            ></input>*/}
              <div className="input-group">
                <strong>Email Address:</strong>
                <input type="text" className="form-control width500px" placeholder="Enter Email Address" aria-describedby="basic-addon2" onChange={this.handleEmailInput}
                onBlur = {this.validateEmail}/>
              </div>
	            </div>
            </div>

            <div className='row'>
            <div className='col-lg-3'> 
	           {/* <input 
	              text="Password" 
	              type="password"
	              ref="password"
	              placeholder='Password'
	              onChange={this.handlePasswordInput}
	            /> */}
              <div className="input-group">
                <strong>Password:</strong>
                <input type="password" className="form-control width500px" placeholder="Enter password" aria-describedby="basic-addon2" onChange={this.handlePasswordInput}
                />
              </div>
            </div>
            </div>
            <div className='row'>
            <div className='col-lg-3'>
	           {/* <input 
	              text="Confirm password" 
	              ref="passwordConfirm"
	              type="password"
	              placeholder="Confirm Password"
	              onChange={this.handleConfirmPasswordInput}
	              onBlur={this.isConfirmedPassword}
	            /> */}
              <div className="input-group">
                <strong>Confirm Password:</strong>
                <input type="password" className="form-control width500px" placeholder="Confirm password" aria-describedby="basic-addon2" onChange={this.handleConfirmPasswordInput}
                onBlur={this.isConfirmedPassword}
                />
              </div>
            </div>
            </div>
            <div className='row'>
            <div className='col-lg-3'>
	           {/* <input 
	              text="First Name" 
	              type="text"
	              placeholder="First Name"
	              onChange={this.handleFirstNameInput}
	            /> */}
              <div className="input-group">
                <strong>First Name:</strong>
                <input type="text" className="form-control width500px" placeholder="Enter FirstName" aria-describedby="basic-addon2" onChange={this.handleFirstNameInput}  
                />
              </div>
            </div>
            </div>
            <div className='row'>
            <div className='col-lg-2'>
	            {/*<input 
	              text="Last Name" 
	              type="text"
	              placeholder="Last Name"
	              onChange={this.handleLastNameInput}
	            /> */}
              <div className="input-group">
                <strong>Last Name:</strong>
                <input type="text" className="form-control width500px" placeholder="Enter LastName" aria-describedby="basic-addon2" onChange={this.handleLastNameInput}
                />
              </div>
            </div>
            </div>
            <div className='row'>
             <div className='col-lg-8'>
               {this._renderError()}
             </div>
            </div> 
            <div className='row'>
             <div className='col-lg-3'>
             </div>
             <div className='col-lg-8'>
	            <button 
	              type="submit" 
	              className="button button_wide"
	             >
	              CREATE ACCOUNT
	            </button>
	         </div>
	         </div>
          </form>
        </div>
      </div>
      </div>
    }
    
});