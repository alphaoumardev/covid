import request from "../axios/request";

export const findUserList=(page, size)=>
{
  return request
  ({
    url:'/user',
    method:'GET',
    params:{page,size}
  })
}
// export const lists=()=>
// {
//   return request
//   ({
//     url:'/user',
//     methods:'get'
//   })
// }
