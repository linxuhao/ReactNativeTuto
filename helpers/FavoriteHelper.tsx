import {Animated } from "react-native";

export function toggleHeroFavoriteStatus(idHero: number, animated: Animated.Value, component: React.Component) {
    //console.log("hero with id is toggled " + idHero);
    //console.log("animation started " + JSON.stringify(animated));
    let destinationValue: number;
    if(Number.parseInt(JSON.stringify(animated)) === 100){
        destinationValue = 0;
    }else{
        destinationValue = 100;
    }
    Animated.timing(animated, {
        duration: 200,
        toValue: destinationValue,
    }).start(/*() => console.log("animation ended " + JSON.stringify(animated))*/);
}