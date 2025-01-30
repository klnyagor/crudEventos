import Inscricao from "@/components/inscricao/Inscricao";
import ModalInscrito from "@/components/inscricao/ModalInscrito";
import { ThemedView } from "@/components/ThemedView";
import { IInscricao } from "@/interfaces/IInscricao";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function InscritosDetailScreen() {
  const DATASTORAGE = "@crudEventos";
  const { inscritoId } = useLocalSearchParams();
  const [inscritoDetail, setInscritoDetail] = useState<IInscricao>();
  const [inscritos, setInscritos] = useState<IInscricao[]>([]);

  const [showModal, setShowModal] = useState<boolean>(false);

  const getStorage = async () => {
    try {
      const storage = await AsyncStorage.getItem(`${DATASTORAGE}:inscritos`);
      const inscritosStorage = storage != null ? JSON.parse(storage) : [];
      setInscritos(inscritosStorage);

      inscritosStorage.forEach((element: IInscricao) => {
        if (element.id.toString() == inscritoId) {
          setInscritoDetail(element);
        }
      });
    } catch (err) {
      console.error({ "Erro": err });
    }
  };

  const handleSetStorage = async (inscritos: IInscricao[]) => {
    AsyncStorage.setItem(`${DATASTORAGE}:inscritos`, JSON.stringify(inscritos));
  };

  const onUpdate = async (inscrito: string, evento: string) => {
    if (inscritoDetail) {
      inscritos.forEach((inscricao) => {
        if (inscricao.id == inscritoDetail.id) {
          inscricao.inscrito = inscrito;
          inscricao.evento = evento;
        }
      });
      handleSetStorage(inscritos);
    }
    setShowModal(false);
    router.replace("/InscritosListView");
  };

  const onDelete = async () => {
    if (inscritoDetail) {
      const delInscrito = (prevInscrito: IInscricao[]) =>
        prevInscrito.filter((item) => item.id !== inscritoDetail.id);
      const inscritosUpdt = delInscrito(inscritos);
      setInscritos(inscritosUpdt);
      handleSetStorage(inscritosUpdt);
    }

    router.replace("/InscritosListView");
  };

  const handleEditModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    getStorage();
  }, []);

  return (
    <View>
      <ModalInscrito
        visible={showModal}
        onAdd={onUpdate}
        onCancel={handleEditModal}
        inscricao={inscritoDetail}
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
        <Inscricao
          inscrito={inscritoDetail ? inscritoDetail.inscrito : ""}
          evento={inscritoDetail ? inscritoDetail.evento : ""}
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
