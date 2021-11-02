import request from "../axios/request";

export const findUserList=(page, size)=>
{
  return request
  ({
    url:'/user/list',
    method:'GET',
    params:{page,size}
  })
}

export const lists=(page, size, user)=>
{
  return request
  ({
    url:'/user/listpage',
    methods:'POST',
    params:{page,size},
    data:user
  })
}
