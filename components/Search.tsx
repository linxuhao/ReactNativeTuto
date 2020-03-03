import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Platform, StatusBar, FlatList } from 'react-native';
import { getHeroes } from '../helpers/Data'
import HeroItem from './HeroItem'

class Search extends React.Component<{}, { heroes: Hero[], filteredHeroes: Hero[] }> {
    //Im trying to not call the function setState which triggers re-render everytime i change this value
    //And re-render whenever i change this value is useless here
    _searchString: string;

    constructor(props) {
        super(props);
        this.state = {
            heroes: [],
            filteredHeroes: []
        };
        this._searchString = "";
    }

    async componentDidMount(){
        await getHeroes().then(data => this.setState({ heroes: data, filteredHeroes: data }), raison => console.log(raison));
    }

    private _filterHeroes() {

        let filteredData: Hero[];
        filteredData = [];
        let matchKey = this._searchString.toLowerCase();
        let allHeroes = this.state.heroes;
        //console.log(allHeroes);
        allHeroes.forEach(hero => {
            //console.log(hero)
            //console.log(matchKey)
            if (hero.localized_name.toLowerCase().includes(matchKey)
                || hero.primary_attr.toLowerCase().includes(matchKey)
                || hero.attack_type.toLowerCase().includes(matchKey)
                || this._arrayInclude(hero.roles, matchKey)) {
                filteredData.push(hero);
            }
        });
        this.setState({ filteredHeroes: filteredData });
    }

    private _arrayInclude(arrayToCheck: string[], matchKey: string) {
        let result = false;
        arrayToCheck.forEach(s => {
            let isInclude = s.toLowerCase().includes(matchKey);
            if (!result && isInclude) {
                result = true;
            }
        })
        return result;
    }

    render() {
        console.log("render");
        console.log(this.state.filteredHeroes.length);
        return (
            <View style={styles.main_componenet}>
                <TextInput
                    //Im trying to not call the function setState which triggers re-render everytime i call it
                    //And re-render whenever i type a character is useless here
                    onChangeText={(text) => { this._searchString = text; }}
                    onSubmitEditing={() => this._filterHeroes()}
                    style={styles.textinput} placeholder='Hero informations' />
                <Button title='Search' onPress={() => this._filterHeroes()} />
                <FlatList
                    data={this.state.filteredHeroes}
                    keyExtractor={(item) => {
                        //console.log(item);
                        let id = item.id;
                        return id.toString();
                    }
                    }
                    renderItem={({ item }) => <HeroItem hero={item} />}
                />
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
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
});

export default Search;