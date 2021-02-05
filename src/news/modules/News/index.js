import {connect} from 'react-redux';

import News from './components/News';
import {newsCategoryFnc, newsListingFnc} from "./NewsAction";

const mapStateToProps = (state) => {
  return  {
    newsCategory: state.News.newsCategory
  }
}

const mapDispatchToProps = (dispatch) => {
	return({
    newsCategoryFnc:() => dispatch(newsCategoryFnc()),
    newsListingFnc: (category, page) => dispatch(newsListingFnc(category, page))
	});
};

export default connect(mapStateToProps,mapDispatchToProps)(News);