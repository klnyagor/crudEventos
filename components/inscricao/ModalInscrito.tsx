import React, { useState } from "react";
import {
  Button,
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
  onAdd: (inscrito: string, evento: string) => void;
  onCancel: () => void;
};

export default function ModalInscrito({
  visible,
  onAdd,
  onCancel,
}: ModalInscritoProps) {
  const [inscrito, setInscrito] = useState("");
  const [evento, setEvento] = useState("");

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
                onPress={() => onAdd(inscrito, evento)}
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

  datePickerContainer: {
    marginTop: 20,
    width: "100%", // Garante que o DateTimePicker ocupe a largura disponível
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    paddingVertical: 15, // Adiciona espaçamento vertical
    alignItems: "center",
  },
});
