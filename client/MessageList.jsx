
MessageLayOut = React.createClass({
 getInitialState:function(){
        return{
          profile:null
        }
  },
  tuser(){
  
      var res = Meteor.call('tuser',this.props.tuId,(error,res)=>
     {   
         if(!error)
          {
            this.setState({profile:res.profile})
          }
     });
    
    return this.state.profile
  },
  render(){
   return <div>
            {
              <MessageList tuId={this.props.tuId} tuser={this.tuser()}/>
            }
          </div>
  }
})

MessageList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var fuId = Meteor.userId()
    var tuId =this.props.tuId
    var subs= Meteor.subscribe('Messages',fuId,tuId)
    return {
      messages: Messages.find({}).fetch()||{},
      fullName: this.props.tuser
    }
  },
  _renderFormMessages() {
    return this.data.messages.map((message) => {
      return <Message key={message._id} message={message} />;
    });
  },
  handleSubmit(event) {
    event.preventDefault();
    var fuId = Meteor.userId();
    var tuId = this.props.tuId;
    console.log(event)
    var message = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    if(message!=='')
    { 
      var fuser = {fuId:fuId,profile:Meteor.user().profile};
      Meteor.call("addMessage", message,fuser,tuId);
    }

    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  },
  deleteMessage(event) {
    event.preventDefault();
    Meteor.call('removeMessage',id);
  },
  _renderForm() {
    return( 
      <form onSubmit={this.handleSubmit} >
        <input
          type="text"
          ref="textInput"
          name="message"
          placeholder="Enter message..." />
     </form>)
  },
  _renderName(){
   var fullName = this.props.tuser||null
   if(fullName!==null)
   return fullName.firstName +' '+fullName.lastName
  },
  render() {
    var style={
      marginTop:'200px'
    }
    return (
      // <div className="container">
      <div>
        <header>
          <h2>Chat with {this._renderName()}</h2>
          {/*<Navbar/>*/}
        </header>
         <ul>
          {this._renderFormMessages()}
        </ul>
          {this._renderForm()}
      </div>
    );
  }
});
