import { Animated } from "react-native";
import { toogleFavoriteAction } from "../store/actions/toggleFavoriteAction";
import { toggleFavoriteActionType } from "../store/types/toggleFavoriteActionType";

export function toggleHeroFavoriteStatus(idHero: number, animated: Animated.Value, dispatche: Function, faviroteHeroes: Set<number>) {
    //console.log("hero with id is toggled " + idHero);
    //console.log("animation started " + JSON.stringify(animated));
    //console.log("before click favorite hero " + faviroteHeroes.has(idHero));

    //Prepare toggle favirote action
    let action: toggleFavoriteActionType = toogleFavoriteAction(idHero);
    let destinationValue: number;

    if (faviroteHeroes.has(idHero)) {
        //If in favorite, display favorite off animation
        destinationValue = 0;
    } else {
        //if not in favorite, display favorite on animation
        destinationValue = 100;
    }
    Animated.timing(animated, {
        duration: 200,
        toValue: destinationValue,
    }).start(() => {
        //dispatch action after animation ends
        dispatche(action);
        //console.log("animation ended " + JSON.stringify(animated))
    });    
}