import React from "react";
import { FlatList } from "react-native";
import HeroItem from "./HeroItem";

class HeroList extends React.Component<{ heroes: Hero[], toggleFavorite: Function, favoriteHeroes: Set<number> }, {}> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log("Hero List render");
        return (
                <FlatList
                    data={this.props.heroes}
                    keyExtractor={item => {
                        //console.log(item);
                        let id = item.id;
                        return id.toString();
                    }}
                    renderItem={({ item }) => <HeroItem hero={item} isFavorite={this.props.favoriteHeroes.has(item.id)} toggleHeroFavoriteStatus={this.props.toggleFavorite} />}
                />
        );
    }
}

export default HeroList;
