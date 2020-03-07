import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Platform,
  StatusBar,
  Animated,
} from "react-native";
import { getHeroes } from "../helpers/Data";
import { displayLoading } from "../helpers/LoadingHelper";
import { toggleHeroFavoriteStatus } from "../helpers/FavoriteHelper";
import { connect } from "react-redux";
import HeroList from "./heroList";

class Search extends React.Component<{ favoriteHeroes: Set<number>, dispatch: Function }, { filteredHeroes: Hero[], isLoading: boolean }> {
  //Im trying to not call the function setState which triggers re-render everytime i change this value
  //And re-render whenever i change this value is useless here
  _searchString: string;
  _allHeroes: Hero[];

  constructor(props) {
    super(props);
    this.state = {
      filteredHeroes: [],
      isLoading: false
    };
    this._searchString = "";
    this._allHeroes = [];
  }

  private async searchHeroes() {
    this.setState({ isLoading: true });
    //Load data from api if is not already done
    let allHeroes: Hero[] = await this.loadHeros();
    let filteredData: Hero[] = [];
    let lowercaseMatchKey = this._searchString.toLowerCase();

    //console.log(allHeroes);
    if (lowercaseMatchKey.length > 0) {
      this.filterHeroesByMathKey(allHeroes, lowercaseMatchKey, filteredData);
    } else {
      filteredData = allHeroes;
    }
    var stateToSet = { filteredHeroes: filteredData, isLoading: false };
    this.setState(stateToSet);
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

  private filterHeroesByMathKey(allHeroes: Hero[], lowercaseMatchKey: string, filteredData: Hero[]) {
    allHeroes.forEach(hero => {
      //console.log(hero)
      //console.log(matchKey)
      if (hero.localized_name.toLowerCase().includes(lowercaseMatchKey) ||
        hero.primary_attr.toLowerCase().includes(lowercaseMatchKey) ||
        hero.attack_type.toLowerCase().includes(lowercaseMatchKey) ||
        this.arrayInclude(hero.roles, lowercaseMatchKey)) {
        filteredData.push(hero);
      }
    });
  }

  private arrayInclude(arrayToCheck: string[], lowercaseMatchKey: string): boolean {
    let result = false;
    arrayToCheck.forEach(s => {
      let isInclude = s.toLowerCase().includes(lowercaseMatchKey);
      if (!result && isInclude) {
        result = true;
      }
    });
    return result;
  }

  private toggleHeroFavoriteStatusOnItem(idHero: number, animated: Animated.Value) {
    toggleHeroFavoriteStatus(idHero, animated, this.props.dispatch, this.props.favoriteHeroes);
  }

  render() {
    console.log("Search render");
    //console.log("heroes length : " + this.state.heroes.length);
    //console.log("filteredHeroes length : " + this.state.filteredHeroes.length);
    //console.log(this.props);
    return (
      <View style={styles.main_componenet}>
        <TextInput
          //Im trying to not call the function setState which triggers re-render everytime i call it
          //And re-render whenever i type a character is useless here
          onChangeText={text => {
            this._searchString = text;
          }}
          onSubmitEditing={() => this.searchHeroes()}
          style={styles.textinput}
          placeholder="Hero informations"
        />
        <Button title="Search" onPress={() => this.searchHeroes()} />
        <HeroList
          heroes={this.state.filteredHeroes}
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
    favoriteHeroes: state.toggleFavoriteReducer.favoritesHeroes
  }
}
export default connect(mapStateToProps)(Search)
