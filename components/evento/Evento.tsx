import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type EventoProps = {
    titulo: string;
    descricao: string;
    data: Date;
};

export default function Evento({titulo, descricao, data}: EventoProps) {

    return(
        <View style={styles.box}>
            <Text style={styles.title}>{titulo}</Text>
            <Text style={styles.subTitle}>{descricao}</Text>
            <Text style={styles.subTitle}>{data.toLocaleString()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        borderRadius: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 10,
    }
});
