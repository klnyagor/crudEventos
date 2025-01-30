import Evento from "@/components/evento/Evento";
import ModalEvento from "@/components/evento/ModalEvento";
import { ThemedView } from "@/components/ThemedView";
import { IEvento } from "@/interfaces/IEvento";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function EventosDetailScreen() {
  const DATASTORAGE = "@crudEventos";
  const { eventoId } = useLocalSearchParams();
  const [eventDetail, setEventDetail] = useState<IEvento>();
  const [events, setEvents] = useState<IEvento[]>([]);

  const [showModal, setShowModal] = useState<boolean>(false);

  const getStorage = async () => {
    try {
      const storage = await AsyncStorage.getItem(`${DATASTORAGE}:eventos`);
      const eventosStorage = storage != null ? JSON.parse(storage) : [];
      setEvents(eventosStorage);

      eventosStorage.forEach((element: IEvento) => {
        if (element.id.toString() == eventoId) {
          setEventDetail(element);
        }
      });
    } catch (err) {
        console.error({'Erro': err});
    }
  };

  const handleSetStorage = async (eventos: IEvento[]) => {
    AsyncStorage.setItem(`${DATASTORAGE}:eventos`, JSON.stringify(eventos));
  };

  const onUpdate = async (
    titulo: string,
    descricao: string,
    data: Date
  ) => {
    if (eventDetail) {
      events.forEach((evento) => {
        if (evento.id == eventDetail.id) {
          evento.titulo = titulo;
          evento.descricao = descricao;
          evento.data = data;
        }
      });
      handleSetStorage(events);
    }

    setShowModal(false);
  };

  const onDelete = () => {
    if (eventDetail) {
      const delEvento = (prevEvento: IEvento[]) =>
        prevEvento.filter((item) => item.id !== eventDetail.id);
      const eventosUpdt = delEvento(events);
      setEvents(eventosUpdt);
      handleSetStorage(eventosUpdt);
    }

    router.replace("/EventosListView");
  };

  const handleEditModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    getStorage();
  }, []);

  return (
    <View>
      <ModalEvento
        visible={showModal}
        onAdd={onUpdate}
        onCancel={handleEditModal}
        evento={eventDetail}
      />

      <ThemedView style={styles.headerContainer}>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => onDelete()} style={styles.icon}>
            <MaterialIcons name="delete-forever" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEditModal()}>
            <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ThemedView>
      <ThemedView style={styles.boxContainer}>
        <Evento
          titulo={eventDetail ? eventDetail.titulo : ""}
          descricao={eventDetail ? eventDetail.descricao : ""}
          data={eventDetail ? eventDetail.data : new Date()}
        />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "gray",
  },
  boxContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    flexDirection: "row",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    margin: 10,
  },
});
