import {connect} from 'react-redux'
import Advthome from './Advthome'
import {creatAdvt,fetchAdvt,clearState} from './AdvAction'


const mapStateToProps = state => {
  return {
    advtlist:state.sellerAdvt.advtlist,
    savedStatus:state.sellerAdvt.savedStatus
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    creatAdvt:(data) =>dispatch(creatAdvt(data)),
    fetchAdvt:() => dispatch(fetchAdvt()),
    clearState:(state,type) => dispatch(clearState(state,type))
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(Advthome);


