import React from "react";
import { StyleSheet, View, Text, Image, FlatList, Animated, processColor } from "react-native";
import Svg, {
  Defs,
  ClipPath,
  Path,
  G,
  Rect,
  Color
} from 'react-native-svg';

class HeroItem extends React.Component<{ hero: Hero, toggleHeroFavoriteStatus: Function }, {animatedValue: Animated.Value}> {

  _myRect1;
  _myRect2;
  _myRect3;
  _myRect4;
  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0)
    };

    this.state.animatedValue.addListener( (value) => {
      let fillColor : Color = this.updateFillColor(this.state.animatedValue);
      this._myRect1.setNativeProps({ fill: fillColor });
      this._myRect2.setNativeProps({ fill: fillColor });
      this._myRect3.setNativeProps({ fill: fillColor });
      this._myRect4.setNativeProps({ fill: fillColor });
    });
  }

  private getImageUri(uri: string): string {
    return "http://cdn.dota2.com/" + uri;
  }

  render() {
    let winrate = (this.props.hero.pro_win / this.props.hero.pro_pick) * 100;
    let AnimatedRect = Animated.createAnimatedComponent(Rect);
    let fillColor : Color = this.updateFillColor(this.state.animatedValue);
    return (
      <View style={styles.main_container}>
        <Image
          style={styles.image}
          source={{ uri: this.getImageUri(this.props.hero.img) }}
        />

        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Animated.View style={{
                        transform: [
                            {
                                scaleX: this.state.animatedValue.interpolate({
                                    inputRange: [0, 50, 100],
                                    outputRange: [1, 2, 1]
                                })
                            },
                            {
                                scaleY: this.state.animatedValue.interpolate({
                                    inputRange: [0, 50, 100],
                                    outputRange: [1, 2, 1]
                                })
                            }
                        ]
                    }}>
              <Svg height="40" width="40" onPress={() => this.props.toggleHeroFavoriteStatus(this.props.hero.id, this.state.animatedValue, this)}>
                <Defs>
                  <ClipPath id="clip-rule-clip">
                    <Path d="M20,2L8,40L38,16L2,16L32,40z" />
                  </ClipPath>
                </Defs>
                <G clipPath="url(#clip-rule-clip)">
                  <AnimatedRect ref={ ref => this._myRect1 = ref } x="0" y="0" width="20" height="20" fill={fillColor}/>
                  <AnimatedRect ref={ ref => this._myRect2 = ref } x="20" y="0" width="20" height="20" fill={fillColor}/>
                  <AnimatedRect ref={ ref => this._myRect3 = ref } x="0" y="20" width="20" height="20" fill={fillColor}/>
                  <AnimatedRect ref={ ref => this._myRect4 = ref } x="20" y="20" width="20" height="20" fill={fillColor}/>
                </G>
              </Svg>
            </Animated.View>

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

  /**
   * The only way i found to make Animated.AnimatedInterpolation object to string.........
   * @param animatedValue the current animated value
   */
  private updateFillColor(animatedValue: Animated.Value) : string {
    let fillColor = JSON.stringify(animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [
        "grey",
        "gold"
      ]
    })).replace(new RegExp('"', 'g'), '');
    return fillColor;
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
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18,
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
    marginTop: 10,
    flex: 0.3,
    fontWeight: "bold",
    fontSize: 20,
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
