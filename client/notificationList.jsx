NotificationList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var uId = Meteor.userId()
    var notifications =  Meteor.subscribe('notifications',uId)
    return {
    	notifications:Notifications.find().fetch()||{}
    }
  },
  _renderNotifications(){
  	return this.data.notifications.map((notice) => {
      return <Notification  key={notice._id} id={notice._id} type={notice.type} firstName={notice.tuser.firstName} lastName={notice.tuser.lastName}/>;
    });
   },
   render(){
   	return <div>
   	          {this._renderNotifications()}
   	       </div>
   }
})

Notification = React.createClass({
	closeNotice(event){
        event.preventDefault();
        var noticeId = event.target.value
        Meteor.call('deleteNotification',noticeId)
	},
	render(){
		if(this.props.type===0)
		{
			return <div className='alert alert-error'>
				     <p>{this.props.firstName} {this.props.lastName} declined your add friend request!</p><button type='button' value={this.props.id} className='close' onClick={this.closeNotice}>×</button>
	               </div>
           }
        else if(this.props.type===1)
		{
			return <div className='alert alert-error'>
		     	     <p>{this.props.firstName} {this.props.lastName} accepted your add friend request!</p><button type='button' value={this.props.id} className='close' onClick={this.closeNotice}>×</button>
                   </div> 
        }       
	}
})