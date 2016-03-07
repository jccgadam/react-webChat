
MainLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const user = Meteor.user()
    return {
      user: user || {},
      isLoggedIn: !!user
    }
  },
  _renderChildren() {
    return <main>
       <Navbar user={this.data.user} isLoggedIn={this.data.isLoggedIn}/>
       {this.data.isLoggedIn ? <LandingLayout tuId={this.props.tuId}/> : null}
       {this.props.tmpl}    
     </main> 
  },
  render() {
    var style={
      width:'100%'
    }
   return <div>
      <div className='jumbotron'>
        <MainHeader title={this.props.title} description={this.props.description} />
      </div> 
      {this._renderChildren()}
    </div>
  }
})

MainHeader = class extends React.Component{
  render(){
    var style ={
      marginLeft:'30px',
      width:'40%'
    }

    return (
      <div style={style}>
        <h2>{this.props.title}</h2>
        <p>{this.props.description}</p>
      </div>
      )
  }
}