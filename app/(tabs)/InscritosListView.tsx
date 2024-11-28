import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedView } from "@/components/ThemedView";
import { IInscricao } from "@/interfaces/IInscricao";
import ModalInscrito from "@/components/inscricao/ModalInscrito";
import Inscricao from "@/components/inscricao/Inscricao";

export default function InscritosListView() {
  const [inscritos, setInscrito] = useState<IInscricao[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const onAdd = (inscrito: string, evento: string) => {
    const novoInscrito: IInscricao = {
      id: Math.random() * 1000,
      inscrito: inscrito,
      evento: evento
    };

    const inscritoADD: IInscricao[] = [...inscritos, novoInscrito];
    setInscrito(inscritoADD);

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
        <TouchableOpacity
          onPress={() => handleModal()}
          style={styles.buttonAdd}
        >
          <MaterialIcons name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </ThemedView>

      <ModalInscrito visible={showModal} onAdd={onAdd} onCancel={handleModal} />

      <ThemedView style={styles.container}>
        {inscritos.map((inscrito) => (
          <Inscricao
            key={inscrito.id}
            inscrito={inscrito.inscrito}
            evento={inscrito.evento}
          />
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
