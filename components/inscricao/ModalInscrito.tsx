import { IInscricao } from "@/interfaces/IInscricao";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export type ModalInscritoProps = {
  visible: boolean;
  onAdd: (inscrito: string, evento: string, id: number) => void;
  onCancel: () => void;
  inscricao?: IInscricao;
};

export default function ModalInscrito({
  visible,
  onAdd,
  onCancel,
  inscricao,
}: ModalInscritoProps) {
  const [inscrito, setInscrito] = useState("");
  const [evento, setEvento] = useState("");
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if(inscricao){
      setId(inscricao.id);
      setInscrito(inscricao.inscrito);
      setEvento(inscricao.evento);
    }else{
      setId(0);
      setInscrito('');
      setEvento('');
    }
  }, [inscricao])

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {}}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.boxContainer}>
            <TextInput
              style={styles.boxInput}
              placeholder="Inscrito"
              value={inscrito}
              onChangeText={(text) => setInscrito(text)}
              autoFocus
            />
            <TextInput
              style={styles.boxInput}
              placeholder="Evento"
              value={evento}
              onChangeText={(desc) => setEvento(desc)}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => onAdd(inscrito, evento, id)}
              >
                <Text>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={() => onCancel()}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* box container */}
        </View>
        {/* container */}
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  boxContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  boxInput: {
    alignSelf: "stretch",
    height: 40,
    borderRadius: 5,
    backgroundColor: "#DDD",
    margin: 5,
  },
  buttonAdd: {
    backgroundColor: "green",
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 20,
  },
  buttonCancel: {
    backgroundColor: "red",
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    height: 70,
  },
});
