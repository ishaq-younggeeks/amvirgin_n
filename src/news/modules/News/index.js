import {connect} from 'react-redux';

import News from './components/news';
import {newsListData} from "./NewsReducer";

const mapStateToProps = (state) => {
  return  {
    newsList: state.news.newsList,
    fetchingData: state.news.fetchingData
  }
}

const mapDispatchToProps = (dispatch) => {
	return({
    newsListData:() => dispatch(newsListData()),
	});
};

export default connect(mapStateToProps,mapDispatchToProps)(News);