
FriendsList = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        const userId = Meteor.userId()
        const subs = Meteor.subscribe("Friends",userId)
        const isReady = subs.ready()
        let friend = {}
        if (isReady)
         { 
           friend = Friends.findOne()
         }
         return { 
             friends:friend.friends||[]
           }
    },
    renderFriends() {
       if(this.data.friends.length===0){
        return <div>FriendsList is Empty!</div>
       }
    return (this.data.friends).map((friend) => {
      return <EachFriend key={friend._id} id={friend._id} profile={friend.profile}/>
    })
    },
    render(){
        var style={
            marginLeft:'40px',
            backgroundColor:'#444753'
        }
        var h2Style = {
            width:'20%'
        }
        return (
                <div>
                    <div className="people-list" id="people-list" style={style}>
                        <ul className="list">
                        {this.renderFriends()}
                        </ul>
                    </div>
                    <AddFriend/>
                </div>
               )
    }
})

EachFriend = React.createClass({
   getFullName(){
    var firstName = this.props.profile.firstName;
    var lastName = this.props.profile.lastName;
    return firstName +' '+lastName;

  },
   render(){
        return(
               <li className="clearfix">
                <a href={'/room/'+this.props.id}>
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar"/>
                  <div className="about">
                    <div className="name">{this.getFullName()}</div>
                  </div>
                </a>  
               </li>


               // <a href={'/room/'+this.props.id}><button type="button" className="list-group-item">{this.props.profile.firstName} {this.props.profile.lastName}</button></a>
              ) 
   }
})

