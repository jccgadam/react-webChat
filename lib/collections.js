Messages = new Mongo.Collection("Messages");
Friends = new Mongo.Collection("Friends");
AddFriends = new Mongo.Collection('AddFriends');
Notifications  = new Mongo.Collection('Notifications');

AddFriendsSchema = new SimpleSchema({
	fuId: {
       type:String,
	},
	fUser:{
        type:Object,
	},
	'fUser.firstName':{
		type:String,
	},
	'fUser.lastName':{
		type:String,
	},
	tuId:{
		type:String,
	},
	tUser:{
        type:Object,
	},
	'tUser.firstName':{
		type:String,
	},
	'tUser.lastName':{
		type:String,
	},
	status:{
		type:Number,
		autoValue:function(){
			if(this.isInsert&&!this.isSet){
				return 0;
			}
		}
	},
	createdAt:{
		type:Date,
		autoValue:function(){
			if(this.isInsert&&!this.isSet){
				return new Date();
			}
		}
	}

})


AddFriends.attachSchema(AddFriendsSchema)