import  axios from "axios";
import { SERVER_URL } from "src/config/config";
export const ADD_ITEM = 'ADD_ITEM' 
export const UPDATE_ITEM = 'UPDATE_ITEM' 

export const ADD_ITEMS = 'ADD_ITEMS' 

export function addItem(item) {
  
  return dispatch => {
        return  axios({
        method: 'post',
        url: SERVER_URL +`addProduct`,
        data: item,
        config: { headers: {'Content-Type': 'Application/json' }}
      })
    }
}

export function updateItem(item) {

    return dispatch => {
        return  axios({
        method: 'put',
        url: SERVER_URL +`updateProduct?_id=${item._id}`,
        data: item,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
    }

}

export function addItems(items) {
  return { 
        type: ADD_ITEMS,
        data:items
     }
}

export function setItems(items) {
  return { 
        type: ADD_ITEMS,
        items
     }
}

export function getItemsList() {
  return dispatch => {
    return axios.get(SERVER_URL+`getAllProducts`)
  }
}

