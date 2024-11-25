import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IEvento } from "@/interfaces/IEvento";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedView } from "@/components/ThemedView";
import Evento from "@/components/evento/Evento";
import ModalEvento from "@/components/evento/ModalEvento";

export default function EventosListView() {
  const [eventos, setEventos] = useState<IEvento[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const onAdd = (titulo: string, descricao: string, data: Date) => {
    const novoEvento: IEvento = {
      id: Math.random() * 1000,
      titulo: titulo,
      descricao: descricao,
      data: data,
    };

    const eventosADD: IEvento[] = [...eventos, novoEvento];
    setEventos(eventosADD);

    setShowModal(!showModal);
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <MaterialIcons
          name="event"
          size={310}
          color="#808080"
          style={styles.headerImage}
        />
      }
    >
        <ThemedView style={styles.headerContainer}>
            <TouchableOpacity onPress={() => handleModal()} style={styles.buttonAdd}>
            <MaterialIcons name="add-circle-outline" size={24} color="black" />
            </TouchableOpacity>
        </ThemedView>

        <ModalEvento visible={showModal} onAdd={onAdd} onCancel={handleModal} />

        <ThemedView style={styles.container}>
            {eventos.map(evento => <Evento key={evento.id} titulo={evento.titulo} descricao={evento.descricao} data={evento.data} />)}
        </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  buttonAdd: {
    backgroundColor: "green",
    borderRadius: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
    padding: 5,
  },
});
