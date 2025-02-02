import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IEvento } from "@/interfaces/IEvento";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedView } from "@/components/ThemedView";
import Evento from "@/components/evento/Evento";
import ModalEvento from "@/components/evento/ModalEvento";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from 'expo-router';

export default function EventosListView() {
  const DATASTORAGE = '@crudEventos';
  const [eventos, setEventos] = useState<IEvento[]>([]);
  const [selectedEvento, setSelectedEvento] = useState<IEvento>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const getStorage = async () => {
    try {
      const storage = await AsyncStorage.getItem(`${DATASTORAGE}:eventos`);
      const eventosStorage = storage != null ? JSON.parse(storage) : [];
      setEventos(eventosStorage);
    } catch (err) {
      console.error({'Erro': err});
    }
  }

  const handleSetStorage = async (eventos: IEvento[]) => {
    AsyncStorage.setItem(`${DATASTORAGE}:eventos`, JSON.stringify(eventos));
  };

  const navigateToDetails = (selectedEvento: IEvento) => {
    router.push({ pathname: "/Screens/EventosDetailScreen", params: {eventoId: selectedEvento.id} })
  };

  useEffect(() => {
    getStorage();
  }, [])

  const onAdd = async (
    titulo: string,
    descricao: string,
    data: Date,
    id?: number
  ) => {
    if (!id || id <= 0) {
      const novoEvento: IEvento = {
        id: Math.random() * 1000,
        titulo: titulo,
        descricao: descricao,
        data: data,
      };

      const eventosADD: IEvento[] = [...eventos, novoEvento];
      setEventos(eventosADD);
      handleSetStorage(eventosADD);
    } else {
      eventos.forEach((evento) => {
        if (evento.id == id) {
          evento.titulo = titulo;
          evento.descricao = descricao;
          evento.data = data;
        }
      });
      handleSetStorage(eventos);
    }

    setShowModal(false);
  };

  // const onDelete = async (id: number) => {
  //   // setEventos((prevEvento) => prevEvento.filter((item) => item.id !== id));
  //   const delEvento = (prevEvento: IEvento[]) => prevEvento.filter((item) => item.id !== id);
  //   const eventosUpdt = delEvento(eventos);
  //   setEventos(eventosUpdt);
  //   handleSetStorage(eventosUpdt);
  // };

  const handleModal = () => {
    setSelectedEvento(undefined);
    setShowModal(!showModal);
  };

  // const handleEditModal = (selectedEvento: IEvento) => {
  //   setSelectedEvento(selectedEvento);
  //   setShowModal(!showModal);
  // };

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
        <TouchableOpacity
          onPress={() => handleModal()}
          style={styles.buttonAdd}
        >
          <MaterialIcons name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </ThemedView>

      <ModalEvento
        visible={showModal}
        onAdd={onAdd}
        onCancel={handleModal}
        evento={selectedEvento}
      />

      <ThemedView style={styles.container}>

        {
          eventos.map(evento => 
            <TouchableOpacity key={evento.id} onPress={()=> navigateToDetails(evento)}>
              <Evento
                titulo={evento.titulo}
                descricao={evento.descricao}
                data={evento.data} />
            </TouchableOpacity>
          )
        }
        {/* {eventos.map((evento) => (
          <View style={styles.boxContainer} key={evento.id}>
            <Evento
              titulo={evento.titulo}
              descricao={evento.descricao}
              data={evento.data}
            />
            <TouchableOpacity onPress={() => handleEditModal(evento)}>
              <MaterialIcons name="edit" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onDelete(evento.id)}
                style={styles.icon}
              >
                <MaterialIcons name="delete-forever" size={24} color="black" />
              </TouchableOpacity>
          </View>
        ))} */}
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
  buttonAdd: {
    backgroundColor: "green",
    borderRadius: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
    padding: 5,
  },
  icons: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  icon: {
    margin: 10,
    backgroundColor: "gray",
  },
});
