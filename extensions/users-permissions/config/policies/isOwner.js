// module.exports = async (ctx, next) => {
//     if (ctx.state.user) {
//       //check user id
//       const { id } = ctx.params;
//       console.log('isOwner policy ID: ',id);
//       console.log('isOwner policy ctx: ',ctx);
//       console.log('isOwner policy User: ',ctx.state);
//       if(id === ctx.state.user.id){
//           //isowner confirmed
//           return await next();
//       }
//       ctx.unauthorized(`You're not allowed to do this action!`);
//     }
  
//     ctx.unauthorized(`You're not allowed to do this action!`);
//   };