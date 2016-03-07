    function checkEmailAddress(fut,fId,res){
       if(typeof res==='undefined')
      {
        return (-1);
      }

      if(fId ===res._id){
         return 0;
      }
      if(typeof res!='undefined'){
         var owner = Friends.findOne({owner:fId});
         var hasFriend = false;
          _.each(owner.friends,function(id){
              if(id._id===res._id){
                hasFriend = true;
              }
          })
          if(hasFriend)
           {
             fut.return (1);
           }
           else{    
             
             fut.return (true);
         }
         }
      
       return fut.wait();
    }


  Meteor.methods({
    addMessage(text,fuser,tuId) {
      var profile = Meteor.users.findOne({_id:tuId});
      var tuser = profile.profile
      Messages.insert({time:new Date(),text:text,fuId:fuser.fuId,fuser:fuser.profile,tuId:tuId,tuser:tuser});
    },
    removeMessage(id){
      Messages.remove({_id:id});
    },
    addFriend(fId,friendEmail){
     Future = Npm.require('fibers/future');
      var fut = new Future();
      var res = Meteor.users.findOne({'emails':{$elemMatch: { address: friendEmail }}})
      var restunInt = null;
       restunInt = checkEmailAddress(fut,fId,res)

       if(restunInt ===-1){
        return ('User Email not Found!');
       }
       else if (restunInt ===0){
        return ('Can not add own Email');
       }
       else if (restunInt ===1){
        return ('Email is already in Friend List');
       }
       else{
         var exist = AddFriends.findOne({fuId:fId,tuId:res._id}) ||null;
         if(exist){
            return ('Friend Request is pending! Please wait!')
         }
         { 
           var fprofile = Meteor.user().profile
           var tprofile = res.profile
           AddFriends.insert({fuId:fId,fUser:fprofile,tuId:res._id,tUser:tprofile})
           return ('Friend Request send')
         }  
       }
       // AddFriends.insert({fuId:fId,tuId:res._id,tUser:res.peofile})

      // if(typeof res==='undefined')
      // {
      //   return('User Email not Found!');
      // }

      // if(fId ===res._id){
      //    return 'Can not add own Email';
      // }
      // if(typeof res!='undefined'){
      //    var owner = Friends.findOne({owner:fId});
      //    var hasFriend = false;
      //     _.each(owner.friends,function(id){
      //         if(id._id===res._id){
      //           hasFriend = true;
      //         }
      //     })
      //     if(hasFriend)
      //      {
      //        fut.return('Email is already in your Freiend List!')
      //      }
      //      else{    
      //        AddFriends.insert({fuId:fId,tuId:res._id})
      //        fut.return('Add Friend Request Send!');
      //    }
      //    }
      
      //  return fut.wait();
    },
    tuser(tuser){
      return Meteor.users.findOne({_id:tuser})
    },
    confirmAddFriend(fuId,tuId,reqId){
      //get sender info
      var res = Meteor.users.findOne(fuId);
      var profile = res.profile;
      //sender info

      //sender info doc
      var insertDoc = {_id:fuId,profile:profile}
      //sender info doc 

      //receiver info doc
      var insertRecDoc = {_id:tuId,profile:Meteor.user().profile}
      //receiver info doc

      //sender user in Friend DB
      var friendId = Friends.findOne({owner:fuId})._id
      //receiver user in Friend DB
      var recId = Friends.findOne({owner:tuId})._id

      var res = Friends.update({_id:friendId},{$push:{friends:insertRecDoc}})
      var recres = Friends.update({_id:recId},{$push:{friends:insertDoc}})

      if(res&&recres){
        AddFriends.update({_id:reqId},{$set:{status:1}})
        Notifications.insert({
          tuser:{
          firstName:insertRecDoc.profile.firstName,
          lastName:insertRecDoc.profile.lastName
          },
          owner:fuId,type:1});
      }
    },
    declineAddFriend(fuId,tuId){
      var addFriendDoc = AddFriends.findOne({fuId:fuId,tuId:tuId})
      var addFriendId = addFriendDoc._id
      var tuser = addFriendDoc.tUser;
      AddFriends.remove({_id:addFriendId})
      Notifications.insert({tuser,owner:fuId,type:0});
    },
    deleteNotification(noticeId){
      Notifications.remove({_id:noticeId});
    }
  });


