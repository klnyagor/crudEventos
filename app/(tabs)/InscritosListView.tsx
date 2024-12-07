import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedView } from "@/components/ThemedView";
import { IInscricao } from "@/interfaces/IInscricao";
import ModalInscrito from "@/components/inscricao/ModalInscrito";
import Inscricao from "@/components/inscricao/Inscricao";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InscritosListView() {
  const DATASTORAGE = '@crudEventos';
  const [inscritos, setInscritos] = useState<IInscricao[]>([]);
  const [selectedInscrito, setSelectedInscrito] = useState<IInscricao>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const getStorage = async () => {
    try {
      const storage = await AsyncStorage.getItem(`${DATASTORAGE}:inscritos`);
      const inscritosStorage = storage != null ? JSON.parse(storage) : [];
      setInscritos(inscritosStorage);
    } catch (err) {
      console.error({'Erro': err});
    }
  }

  const handleSetStorage = async (inscritos: IInscricao[]) => {
    AsyncStorage.setItem(`${DATASTORAGE}:inscritos`, JSON.stringify(inscritos));
  };

  const onAdd = async (inscrito: string, evento: string, id?: number) => {
    if (!id || id <= 0) {
      const novoInscrito: IInscricao = {
        id: Math.random() * 1000,
        inscrito: inscrito,
        evento: evento,
      };

      const inscritoADD: IInscricao[] = [...inscritos, novoInscrito];
      setInscritos(inscritoADD);
      handleSetStorage(inscritoADD);
    } else {
      inscritos.forEach((inscricao) => {
        if (inscricao.id == id) {
          inscricao.inscrito = inscrito;
          inscricao.evento = evento;
        }
      });
      handleSetStorage(inscritos);
    }

    setShowModal(!showModal);
  };

  useEffect(() =>{
    getStorage();
  }, [])

  const onDelete = async (id: number) => {
    const delInscrito = (prevInscritos: IInscricao[]) => prevInscritos.filter((item) => item.id !== id);
    const inscritosUpdt = delInscrito(inscritos);
    setInscritos(inscritosUpdt);
    handleSetStorage(inscritosUpdt);
  };

  const handleModal = () => {
    setSelectedInscrito(undefined);
    setShowModal(!showModal);
  };

  const handleEditModal = (selectedInscrito: IInscricao) => {
    setSelectedInscrito(selectedInscrito);
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
        <TouchableOpacity
          onPress={() => handleModal()}
          style={styles.buttonAdd}
        >
          <MaterialIcons name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </ThemedView>

      <ModalInscrito
        visible={showModal}
        onAdd={onAdd}
        onCancel={handleModal}
        inscricao={selectedInscrito}
      />

      <ThemedView style={styles.container}>
        {inscritos.map((inscrito) => (
          <View style={styles.boxContainer} key={inscrito.id}>
            <Inscricao inscrito={inscrito.inscrito} evento={inscrito.evento} />
            <View style={styles.icons}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => handleEditModal(inscrito)}
              >
                <MaterialIcons name="edit" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onDelete(inscrito.id)}
                style={styles.icon}
              >
                <MaterialIcons name="delete-forever" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
