 Meteor.publish('Messages',function(fuId,tuId){
 	return Messages.find({$or:[{fuId:fuId,tuId:tuId},{tuId:fuId,fuId:tuId}]});
 })

 Meteor.publish('Friends',function(uId){
 	return Friends.find({owner:uId})
 })
 

 Meteor.publish('sendAddFriendReqs',function(uId){
 	return AddFriends.find({fuId:uId})
 })
 

 Meteor.publish('receAddFriendReqs',function(uId){
 	return AddFriends.find({tuId:uId})
 })

 Meteor.publish('notifications',function(uId){
 	return Notifications.find({owner:uId})
 })

   