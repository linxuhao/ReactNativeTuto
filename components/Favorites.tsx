import React from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Platform,
    StatusBar,
    Animated
} from "react-native";
import HeroItem from "./HeroItem";
import { displayLoading } from "../helpers/LoadingHelper"
import { toggleHeroFavoriteStatus } from "../helpers/FavoriteHelper"
import { connect } from 'react-redux'
import { getHeroes } from "../helpers/Data";
import HeroList from "./heroList";

class Favorites extends React.Component<{ favoriteHeroes: Set<number>, dispatch: Function }, { isLoading: boolean }> {

    _allHeroes: Hero[];

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
        this._allHeroes = [];
    }

    private async loadHeros() {
        let allHeroes: Hero[];
        //load cache if cache is empty
        if (this._allHeroes.length === 0) {
            await getHeroes().then(data => this._allHeroes = data, raison => console.log(raison));
        }
        //get data from cache
        allHeroes = this._allHeroes;
        return allHeroes;
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        await this.loadHeros();
        this.setState({ isLoading: false });
    }


    private toggleHeroFavoriteStatusOnItem(idHero: number, animated: Animated.Value) {
        toggleHeroFavoriteStatus(idHero, animated, this.props.dispatch, this.props.favoriteHeroes);
    }

    render() {
        console.log("Favorite render");
        //console.log(this.props);
        //console.log(this._allHeroes.length);
        let favoriteHeroArray: Hero[] = [];
        if (this.props.favoriteHeroes.size > 0) {
            this._allHeroes.forEach((hero) => {
                if (this.props.favoriteHeroes.has(hero.id)) {
                    favoriteHeroArray.push(hero);
                }
            });
        }
        return (
            <View style={styles.main_componenet}>

                <HeroList
                    heroes={favoriteHeroArray}
                    favoriteHeroes={this.props.favoriteHeroes}
                    toggleFavorite={this.toggleHeroFavoriteStatusOnItem.bind(this)}
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

const mapStateToProps = (state) => {
    //console.log("state");
    //console.log(state);
    return {
        favoriteHeroes: state.favoritesHeroes
    }
}
export default connect(mapStateToProps)(Favorites)