import React from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";

class HeroItem extends React.Component<{ hero: Hero }, {}> {

  private getImageUri(uri: string): string {
    return "http://cdn.dota2.com/" + uri;
  }

  render() {
    let winrate = (this.props.hero.pro_win / this.props.hero.pro_pick) * 100;
    return (
      <View style={styles.main_container}>
        <Image
          style={styles.image}
          source={{ uri: this.getImageUri(this.props.hero.img) }}
        />

        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>
              {this.props.hero.localized_name}
            </Text>
            <Text style={styles.winrate_text}>{winrate.toFixed(0)}%</Text>
          </View>

          <View style={styles.description_container}>
            <FlatList
              data={this.props.hero.roles}
              keyExtractor={item => {
                //console.log(item);
                return item.toString();
              }}
              renderItem={({ item }) => (
                <Text style={styles.description_text}> {item} </Text>
              )}
            />
          </View>

          <View style={styles.type_container}>
            <Text style={styles.type_text}>
              {this.props.hero.primary_attr.toUpperCase()} : {this.props.hero.attack_type}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: "row"
  },
  content_container: {
    flex: 2,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: "row"
  },
  description_container: {
    flex: 7
  },
  type_container: {
    flex: 1,
    marginBottom: 5
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5
  },
  image: {
    flex: 1,
    margin: 5,
    resizeMode: "stretch"
  },
  winrate_text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666"
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666"
  },
  type_text: {
    textAlign: "right",
    fontSize: 14
  }
});

export default HeroItem;
