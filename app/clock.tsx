import {router, Stack, useLocalSearchParams} from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation'
import {Pressable, Text, View, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import {useTimer} from 'react-timer-hook';
import {useTimerResultType} from "react-timer-hook/dist/types/src/useTimer";
import {useKeepAwake} from "expo-keep-awake";

enum Player {
    NONE = 0,
    LEFT = 1,
    RIGHT = 2,
}

type PlayerSideProps = {
    active: boolean;
    initialTime: Date;
    addedSeconds: number;
    onPress: () => void;
}

function PlayerSide(props: PlayerSideProps) {
    const timer = useTimer({
        expiryTimestamp: props.initialTime,
        autoStart: false,
        interval: 20,
    });

    function getTimeString(timer: useTimerResultType) {
        return (
            String(timer.minutes).padStart(2, "0") + ':' +
            String(timer.seconds).padStart(2, "0")
        );
    }

    useEffect(() => {
        if (props.active) {
            const time = new Date();
            time.setMilliseconds(time.getMilliseconds() + timer.totalMilliseconds + props.addedSeconds * 1000);
            timer.restart(time);
        } else {
            timer.pause();
        }
    }, [props.active]);

    return (
        <Pressable
            onPress={props.onPress}
            onLongPress={() => router.navigate('/')}
            style={[
                styles.playerContainer,
                { backgroundColor: props.active ? '#008000': '#ffffff' },
            ]}
        >
            <View style={{
                transform: [{'rotate': '90deg'}]
            }}>
                <Text style={{
                    color: props.active ? '#ffffff' : '#008000',
                    fontSize: 96
                }}>
                    { getTimeString(timer) }
                </Text>
            </View>
        </Pressable>
    )
}

export default function ClockPage() {
    useKeepAwake();

    const { initialMinutes, addedSeconds } = useLocalSearchParams();

    const time = new Date();
    time.setSeconds(time.getSeconds() + parseInt(initialMinutes as string) * 60);

    const [player, setPlayer] = useState<Player>(Player.NONE);

    function onPlayerPress(p: Player) {
        if (player != p && player != Player.NONE) return;

        if (player == Player.LEFT) {
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
            <View style={{
                flex: 1
            }}>
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
    playerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})