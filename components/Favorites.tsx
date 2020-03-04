import React from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Platform,
    StatusBar
} from "react-native";
import HeroItem from "./HeroItem";
import { displayLoading } from "../helpers/LoadingHelper"
import { toggleHeroFavoriteStatus } from "../helpers/FavoriteHelper"

class Favorites extends React.Component<{}, { favoriteHeroes: Hero[], isLoading: boolean }> {

    constructor(props) {
        super(props);
        this.state = {
            favoriteHeroes: [],
            isLoading: false
        };
    }

    render() {
        console.log("render");
        return (
            <View style={styles.main_componenet}>

                <FlatList
                    data={this.state.favoriteHeroes}
                    keyExtractor={item => {
                        //console.log(item);
                        let id = item.id;
                        return id.toString();
                    }}
                    renderItem={({ item }) => <HeroItem hero={item} toggleHeroFavoriteStatus={ toggleHeroFavoriteStatus }/>}
                />
                {displayLoading(this.state.isLoading)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_componenet: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1
    },
    textinput: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: "#000000",
        borderWidth: 1,
        paddingLeft: 5
    }
});

export default Favorites;
