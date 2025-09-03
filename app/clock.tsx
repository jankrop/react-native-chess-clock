import {Stack, useLocalSearchParams} from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation'
import {View, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import {useKeepAwake} from "expo-keep-awake";

import PlayerSide from "@/components/PlayerSide";

enum Player {
    NONE = 0,
    LEFT = 1,
    RIGHT = 2,
}

export default function ClockPage() {
    useKeepAwake();

    const { initialMinutes, addedSeconds } = useLocalSearchParams();

    const time = new Date();
    time.setSeconds(
        time.getSeconds() + parseInt(initialMinutes as string) * 60
        - parseInt(addedSeconds as string)  // Subtracting time increment because it gets added at render for both players
    );

    const [player, setPlayer] = useState<Player>(Player.NONE);

    function onPlayerPress(p: Player) {
        if (player != p && player != Player.NONE) return;

        if (p == Player.LEFT) {
            setPlayer(Player.RIGHT)
        } else {
            setPlayer(Player.LEFT)
        }
    }

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    })

    return (
        <>
            <Stack.Screen options={{
                headerShown: false,
            }}/>
            <View style={styles.container}>
                <PlayerSide
                    active={player == Player.LEFT}
                    initialTime={time}
                    addedSeconds={parseInt(addedSeconds as string)}
                    onPress={() => onPlayerPress(Player.LEFT)}
                />
                <PlayerSide
                    active={player == Player.RIGHT}
                    initialTime={time}
                    addedSeconds={parseInt(addedSeconds as string)}
                    onPress={() => onPlayerPress(Player.RIGHT)}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})