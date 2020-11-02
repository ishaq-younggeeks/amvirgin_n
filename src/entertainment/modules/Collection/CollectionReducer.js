import {COLLECTION_DATA,CLEAR_COLLECTION_DATA} from './CollectionConstant';


const ACTION_HANDLERS = {
  [COLLECTION_DATA]: (state, action) => {
    return {
      ...state,
      collectionData:action.data
    }
  },
  [CLEAR_COLLECTION_DATA]: (state, action) => {
    return {
      ...state,
      collectionData:action.data
    }
  }

};

const initialState = {
  collectionData:{}
};

export default function ShowCollection(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
