AddFriendReqList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var uId = Meteor.userId()
    var sendAddFriendReqs = Meteor.subscribe('sendAddFriendReqs',uId)
    var receAddFriendReqs = Meteor.subscribe('receAddFriendReqs',uId)
    return {
      sendAddFriendReqs: AddFriends.find({fuId:uId}).fetch()||{},
      receAddFriendReqs: AddFriends.find({tuId:uId}).fetch()||{}
    }
  },
  _renderSendReqs() {
    return this.data.sendAddFriendReqs.map((req) => {
      return <SendAddFriendReq  key={req._id}  status={req.status} firstName={req.tUser.firstName} lastName={req.tUser.lastName}/>;
    });
  },
  _renderRecReqs(){
  	return this.data.receAddFriendReqs.map((req) => {
      return <RecAddFriendReq _id={req._id} key={req._id} status={req.status} fuId={req.fuId} tuId={req.tuId} firstName={req.fUser.firstName} lastName={req.fUser.lastName} title =' is sending you friend request!'/>;
    });
  },
  render(){
  	var style={
            marginLeft:'40px',
            backgroundColor:'#444753',
            width:'100%'
        }
  	return <div className="bs-example" style={style}>
		    <ul className="list-group">
		       {this._renderSendReqs()}
		       {this._renderRecReqs()}
		    </ul>
		   </div>
  	
  }
})

SendAddFriendReq = React.createClass({
  getFullName(){
  	var firstName = this.props.firstName;
  	var lastName = this.props.lastName;
  	return firstName +' '+lastName;

  },
  getStatus(){
     if(this.props.status===0){
     	return ' is pending'
     }
  },
  render(){
  	if(this.getStatus())
  	return <li className="list-group-item">
             Your Friend Request to <strong>{this.getFullName()}</strong>
  	         <p>{this.getStatus()}</p><strong></strong>
  	       </li>
  	else 
  	return <div></div>       
  }
})

RecAddFriendReq = React.createClass({
  accept(event){

  	event.preventDefault();
  	var key = this.props._id
  	var fuId = this.props.fuId;
  	var tuId = this.props.tuId
    Meteor.call('confirmAddFriend',fuId,tuId,key);
  },
  decline(event){
    event.preventDefault();
    var key = this.props._id;
    var fuId = this.props.fuId;
    var tuId = this.props.tuId;
    Meteor.call('declineAddFriend',fuId,tuId);

  },
  render(){
  	if(this.props.status===1)
  	{
  		return <div></div>
  	}
    else{
      var style={
        marginLeft:'25px'
      }
  	return <li className="list-group-item"><strong>{this.props.firstName} {this.props.lastName}</strong><p></p>{this.props.title}
              <button className ='btn btn-primary' onClick={this.accept} >Accept</button>
              <button className ='btn btn-danger' onClick={this.decline} style={style}>Decline</button>
  	       </li>
    }	
 }
})


AddFriend = React.createClass({
	getInitialState:function(){
        return{
        	friendEmail:null,
        	error:null
        }
	},
	handleEmailInput(event){
		event.preventDefault();
          this.setState({
    	      friendEmail:event.target.value
          } )
	},
	onSubmit(event){
       event.preventDefault();
        var friendEmail = this.state.friendEmail;
        var uId = Meteor.userId();
        Meteor.call('addFriend',uId,friendEmail,function(error,res){
        	if(!error){

        		bootbox.alert(res)
        	}
        	else{
        		console.log(error)
        	}
        })
	},
	render(){
		var style={
			marginTop:'15px',
			marginBottom:'15px'
		}
		var marginLeft ={
			marginLeft:'60px'
		}
		return (
		  <form onSubmit={this.onSubmit} style={marginLeft}>
           <div className='row'>
            <div className='col-lg-2'>
	            <input 
	              text="Friend Email" 
	              ref="email"
	              type="email"
	              placeholder="Friend Email Address"
	              onChange={this.handleEmailInput}
	              style={style}
	            ></input>
	            </div>
            </div>
            <button className='btn btn-primary' type='submit'>Add Friend</button>
          </form>
            )
	}
})