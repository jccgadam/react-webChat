LandingLayout = React.createClass({
	render(){
		var tuId = this.props.tuId
		if(tuId)
		{
			return ( 
			    <div className='row'>  
				   <div className='col-lg-2'>
				     <NotificationList/>
				     <AddFriendReqList/>
				     <FriendsList/>
				   </div>
				   <div className='col-lg-2'>
				   </div>
				   <div className='col-lg-5'>  
				     <MessageLayOut tuId={this.props.tuId}/>
				   </div>  
			    </div> 
			   )
          
        }
        else{
        	return ( 
			    <div className='row'>  
				   <div className='col-lg-2'>
				     <NotificationList/>
				     <AddFriendReqList/>
				     <FriendsList/>
				   </div>
				</div>
			)   

        }
    }				
	
})
