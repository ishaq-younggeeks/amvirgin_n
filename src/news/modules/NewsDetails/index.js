import {connect} from 'react-redux';
import NewsDetail from './components/newsDetail';




const mapStateToProps = (state) => {
  return  {
    // newsList: state.news.newsList,
    // fetchingData: state.news.fetchingData
  }
}

const mapDispatchToProps = (dispatch) => {
	return({
    // newsListData:() => dispatch(newsListData()),
	});
};

export default connect(mapStateToProps,mapDispatchToProps)(NewsDetail);