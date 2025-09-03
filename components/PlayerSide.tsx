import {useKeepAwake} from "expo-keep-awake";
import {router, Stack, useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import {useTimer} from "react-timer-hook";
import {useTimerResultType} from "react-timer-hook/dist/types/src/useTimer";
import {View, Text, Pressable, StyleSheet} from "react-native";

type PlayerSideProps = {
    active: boolean;
    initialTime: Date;
    addedSeconds: number;
    onPress: () => void;
}

export default function PlayerSide(props: PlayerSideProps) {
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

const styles = StyleSheet.create({
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