Message = React.createClass({
  propTypes: {
    message: React.PropTypes.object.isRequired
  },
  formatTime(time) {
    return moment(time).format('h:mm A');
  },

  deleteMessage(event) {
    event.preventDefault();
    var id = event.target.id
    Meteor.call('removeMessage',id);
  },
  render() {
    var spanStyle = 
                {
                  color:'black',
                  fontSize:'16px'
                }

    var smallStyle =
                {
                  color:'black'
                }  
      if(this.props.message.fuId !== Meteor.userId())
    { 
      return <li id="cmt-19">
              <p className="commentInfo"><span style={spanStyle}>{this.props.message.fuser.firstName}:</span><small className="commentDateStamp">{this.formatTime(this.props.message.time)}</small></p>
              <div className="comment">
                <p>{this.props.message.text}</p>
              </div>
             </li>
    }
    else{
      
       return <li id="cmt-19">
               <div className='commentRight'>
                 <p>{this.props.message.text}</p>
               </div>
                <div className="commentInfo" >
                  <p> <span style={spanStyle}>:me</span><small className="commentDateStamp">{this.formatTime(this.props.message.time)}</small></p>
                </div>
             </li>

    }
  }
});
