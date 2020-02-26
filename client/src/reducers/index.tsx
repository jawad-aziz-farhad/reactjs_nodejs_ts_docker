import { ADD_ITEM, ADD_ITEMS, UPDATE_ITEM } from "../actions";


function itemDataReducer(state={items: []}, action : any){
    switch(action.type) {
        case ADD_ITEM:
          return Object.assign({}, state, 
              {
                items: [...state.items, action.item]
               }); 
        case UPDATE_ITEM:{
            let items =state.items.map((item: any)=>{
                if(item._id==action.item._id){
                    return action.item
                }
                return item
            })

            return Object.assign({}, state, 
              {
                items: [...items]
               }); 
        }
        case ADD_ITEMS:
            return Object.assign({}, state, 
              {
                items: action.data
               }); 
         default: 
           return state;
     }
}

export default itemDataReducer;