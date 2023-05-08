import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


const AccordionItem = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.accordionItem}>
      <TouchableWithoutFeedback onPress={toggleAccordion}>
        <View style={styles.accordionHeader}>
          <Text style={styles.title}>{title}</Text>
          <Ionicons
            name={expanded ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={24}
            color="gray"
          />
        </View>
      </TouchableWithoutFeedback>
      {expanded && <Text style={styles.contentText}>{content}</Text>}
    </View>
  );
};

const Accordion = () => {
  const [data, setData] = useState([]);
  const [dados, setDados] = useState("");
  const fetchData = async () => {
    const resp = await fetch("http://academico3.rj.senac.br/api/Acompanhamento/filterByBrupoIdByEstudanteId/1/1");
    console.log(resp)
    const data = await resp.json();
    setData(data[0].situacaoAprendizagem);
    setDados(dados[0].comentarios)
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <View style={styles.container}>
      <AccordionItem
        title={data.titulo}
        content= {dados.comentario}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  accordionItem: {
    backgroundColor: '#205395',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  contentText: {
    padding: 10,
    fontSize: 16,
    color: '#333333',
  },
});

export default Accordion;

