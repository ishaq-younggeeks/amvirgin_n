import Profile from './Profile/Profile';
import { connect } from 'react-redux';
import { uploadDisplay, Fetchdata,updateProfile,clearSavedStatus,ChangePassword } from './ProfileAction';
import { countryList,stateList,cityList } from '../MyProducts/sellerAddProductAction'

const mapStateToProps = (state) => {
    return ({
        profileData: state.profile.data,
        progress: state.profile.progress,
        countries:state.sellerAddProduct.countries,
        statelist:state.sellerAddProduct.statelist,
        cities:state.sellerAddProduct.cities,
        savedStatus:state.profile.savedStatus,
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        uploadDisplay: (data) => dispatch(uploadDisplay(data)),
        Fetchdata:()=> dispatch(Fetchdata()),
        countryList: () => dispatch(countryList()),
        stateList: (countryId) => dispatch(stateList(countryId)),
        cityList: (stateId) => dispatch(cityList(stateId)),
        clearSavedStatus:() => dispatch(clearSavedStatus()),
        updateProfile:(data) => dispatch(updateProfile(data)),
        changePassword:(data) => dispatch(ChangePassword(data))

    });
}

export default connect(mapStateToProps, mapDispatchToProps )(Profile)
 