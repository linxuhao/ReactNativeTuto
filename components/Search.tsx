import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Platform,
  StatusBar,
} from "react-native";
import { getHeroes } from "../helpers/Data";
import HeroItem from "./HeroItem";
import { displayLoading } from "../helpers/LoadingHelper"
import { toggleHeroFavoriteStatus } from "../helpers/FavoriteHelper"

class Search extends React.Component<{}, { heroes: Hero[], filteredHeroes: Hero[], isLoading: boolean } > {
  //Im trying to not call the function setState which triggers re-render everytime i change this value
  //And re-render whenever i change this value is useless here
  _searchString: string;

  constructor(props) {
    super(props);
    this.state = {
      heroes: [],
      filteredHeroes: [],
      isLoading: false
    };
    this._searchString = "";
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
    var stateToSet = this.prepareStateToUpdate(allHeroes, filteredData);
    this.setState(stateToSet);
  }

  private async loadHeros() {
    let allHeroes: Hero[];
    if (this.state.heroes.length === 0) {
      await getHeroes().then(data => allHeroes = data, raison => console.log(raison));
    }
    else {
      allHeroes = this.state.heroes;
    }
    return allHeroes;
  }

  private prepareStateToUpdate(allHeroes: Hero[], filteredData: Hero[]) {
    var stateToSet;
    if (this.state.heroes.length === 0) {
      stateToSet = { heroes: allHeroes, filteredHeroes: filteredData, isLoading: false };
    }
    else {
      stateToSet = { filteredHeroes: filteredData, isLoading: false };
    }
    return stateToSet;
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

  render() {
    console.log("render");
    //console.log("heroes length : " + this.state.heroes.length);
    //console.log("filteredHeroes length : " + this.state.filteredHeroes.length);
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
        <FlatList
          data={this.state.filteredHeroes}
          keyExtractor={item => {
            //console.log(item);
            let id = item.id;
            return id.toString();
          }}
          renderItem={({ item }) => <HeroItem hero={item} toggleHeroFavoriteStatus = {toggleHeroFavoriteStatus} />}
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

export default Search;
