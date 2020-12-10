import {connect} from 'react-redux'
import Advthome from './Advthome'
import {creatAdvt,fetchAdvt,clearState, deleteAdvt, editAdvt} from './AdvAction'


const mapStateToProps = state => {
  return {
    advtlist:state.sellerAdvt.advtlist,
    savedStatus:state.sellerAdvt.savedStatus,
    deleteStatus:state.sellerAdvt.deleteStatus
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    creatAdvt:(data) =>dispatch(creatAdvt(data)),
    fetchAdvt:() => dispatch(fetchAdvt()),
    clearState:(state,type) => dispatch(clearState(state,type)),
    deleteAdvt:(key) => dispatch(deleteAdvt(key))
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(Advthome);


