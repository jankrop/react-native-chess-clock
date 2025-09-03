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
            timer.resume();
        } else {
            const time = new Date();
            time.setMilliseconds(time.getMilliseconds() + timer.totalMilliseconds + props.addedSeconds * 1000);
            timer.restart(time);
            timer.pause();
        }
    }, [props.active]);

    return (
        <Pressable
            onPress={props.onPress}
            onLongPress={() => router.navigate('/')}
            style={[
                styles.playerContainer,
                props.active && styles.playerContainerActive,
            ]}
        >
            <View style={styles.rotate}>
                <Text style={[styles.time, props.active && styles.timeActive]}>{ getTimeString(timer) }</Text>
            </View>
        </Pressable>
    )
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
    playerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        color: '#009F6B',
        fontSize: 96,
    },
    playerContainerActive: {
        backgroundColor: '#009F6B',
        color: '#ffffff',
    },
    time: {
        fontSize: 96,
        color: '#009F6B',
    },
    timeActive: {
        color: '#ffffff',
    },
    rotate: {
        transform: [{'rotate': '90deg'}],
    }
})