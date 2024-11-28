import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type InscricaoProps = {
    inscrito: string;
    evento: string;
};

export default function Inscricao({inscrito, evento}: InscricaoProps) {

    return(
        <View style={styles.box}>
            <Text style={styles.title}>{inscrito}</Text>
            <Text style={styles.subTitle}>{evento}</Text>
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
