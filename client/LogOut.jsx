LogOut = React.createClass({
	LogOut:function(event){
    
       	Meteor.logout(function(err){
            if(err){
                console.log(err)
            }
        });
	},
	render(){
		return(
                <button className='btn btn-danger' onClick={this.LogOut}>Log Out</button>
              )
		
	}
})