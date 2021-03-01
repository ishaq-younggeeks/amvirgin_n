const intialState = {
  addedProduct: {},
  currencies: [],
  categories: [],
  countries: [],
  products: [],
  product: {},
  BrandList:[],
  BrandDetails:[],
  isBrandLoading:false,
  approvedbrand:[],
  addProductError: "",
  getProductError: "",
  AttributesDetails:[],
  statusapproval:{},
  metaData:{},
  isFetching:true
};

const sellerAddProductReducer = (state = intialState, action) => {
  switch (action.type) {
    case "CURRENCIES":
      return {
        ...state,
        currencies: action.payload
      };

    case "CATEGORIES":
      return {
        ...state,
        categories: action.payload
      };
      case "BrandApproved":
      return {
        ...state,
        isBrandLoading:false,
        approvedbrand:action.payload
      }
      case "isBrandLoading":
        return {
          isBrandLoading:true
        }
      case "BrandDetails":
        return {
          ...state,
          BrandDetails:action.payload
        }
      case "brandList":
        return {
          ...state,
          BrandList:action.payload
        }

      case "AttributesData":
        return {
          ...state,
          AttributesDetails:action.payload
        }

        case "Applyforapproval":
        return {
          ...state,
          statusapproval:action.payload
        }
        
    case "COUNTRIES":
      return {
        ...state,
        countries: action.payload
      };

      case "STATE":
        return {
          ...state,
          statelist: action.payload
        };
  
      case "CITY":
        return {
          ...state,
          cities: action.payload
        };
      case "CLEAR_REDUX_STATE":
          return {
            ...state,
            [action.payload.state]: action.payload.load
        };  
      
        case "ATTRIBUTES":
        return {
          ...state,
          attributes: action.payload
        };
        
      case "HSNCODE":
        return {
          ...state,
          hsnCode:action.payload
        }; 

    case "ADD_PRODUCT":
      console.log("Product Added");
      return {
        ...state,
        addedProduct: action.payload
      };
    case "ADDING_PRODUCT_ERROR":
      console.log("Error while adding the product");
      return {
        ...state,
        addProductError: action.payload
      };

    case "UPDATING_PRODUCT_ERROR":
      return {
        ...state,
        updateProductError:action.payload
      }

    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        metaData:action.payload2,
        isFetching:false
      };
      case "AFTER_DELETE_PRODUCTS":
        return {
          ...state,
          products: state.products.filter(item => item.key!==action.payload)
        };  
    case "GET_PRODUCT":
      return {
        ...state,
        product: action.payload
      };

    case "GET_PRODUCT_ERROR":
      return {
        ...state,
        getProductError: action.payload
      };
    case 'CLEAR_PRODUCT_DETAIL':
      console.log("clear detail work perfectly",action.payload)
      return {
        ...state,
        product:action.payload
       }
    case 'EDIT_PRODUCT':
      return {
        ...state,
        editproduct:action.payload
      }
    case 'REQUEST':
      return {
        ...state,
        isFetching:true
      }
    default:
      return state;
  }
};

export default sellerAddProductReducer;
