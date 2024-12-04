import DateTimePicker from "react-datetime-picker";
import React, { useEffect, useState } from "react";
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
import { IEvento } from "@/interfaces/IEvento";

export type ModalEventoProps = {
  visible: boolean;
  onAdd: (titulo: string, descricao: string, data: Date, id: number) => void;
  onCancel: () => void;
  evento?: IEvento;
};

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ModalEvento({
  visible,
  onAdd,
  onCancel,
  evento
}: ModalEventoProps) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if(evento){
      setId(evento.id);
      setTitulo(evento.titulo);
      setDescricao(evento.descricao);
      setData(evento.data);
    }else{
      setId(0);
      setTitulo('');
      setDescricao('');
      setData(new Date());
    }
  }, [evento])

  const [show, setShow] = useState(false);
  const [data, setData] = useState<Value>(new Date());

  const handleChange = (novaData: Value) => {
    setData(novaData ?? new Date());
  };

  const showDatePicker = () => {
    setShow(!show);
  };

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
              placeholder="Título"
              value={titulo}
              onChangeText={(text) => setTitulo(text)}
              autoFocus
            />
            <TextInput
              style={styles.boxInput}
              placeholder="Descrição"
              value={descricao}
              onChangeText={(desc) => setDescricao(desc)}
            />

            <Button onPress={showDatePicker} title="Selecionar data" />
            <Text>Selecionado: {data.toLocaleString()}</Text>
            {show && (
              <View style={styles.datePickerContainer}>
                <DateTimePicker minDate={new Date()} value={data} onChange={handleChange} />
              </View>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => onAdd(titulo, descricao, data, id)}
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
    backgroundColor: "orange",
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
