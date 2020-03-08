import React from 'react';
import { StyleSheet, Image, TouchableOpacity, ImageURISource } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { changeAvatarActionType } from '../store/types/changeAvatarActionType';
import { changeAvatarAction } from '../store/actions/changeAvatarAction';

class Avatar extends React.Component<{ avatar: ImageURISource, dispatch: Function }, {}> {

    constructor(props) {
        super(props);
        this.state = {};
        this._avatarClicked = this._avatarClicked.bind(this);
    }

    _avatarClicked() {
        ImagePicker.showImagePicker({}, (response) => {
            if (response.didCancel) {
                console.log('L\'utilisateur a annulé')
            }
            else if (response.error) {
                console.log('Erreur : ', response.error)
            }
            else {
                //console.log('Photo : ', response.uri)
                let requireSource = { uri: response.uri }
                let action: changeAvatarActionType = changeAvatarAction(requireSource);
                //console.log('action : ', action);
                this.props.dispatch(action);
            }
        });
    }

    render() {
        //console.log("Avatar : ", this.props.avatar);
        return (
            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={this._avatarClicked}>
                <Image style={styles.avatar} source={this.props.avatar} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    touchableOpacity: {
        margin: 5,
        width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#9B9B9B',
        borderWidth: 2
    }
});

const mapStateToProps = (state) => {
    //console.log("state");
    //console.log(state);
    return {
        avatar: state.avatarReducer.avatar_uri
    }
}
export default connect(mapStateToProps)(Avatar)