import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const api=axios.create({
  baseURL:'http://academico3.rj.senac.br/api/',
})
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

  useEffect(() => {
    api.get(`Acompanhamento/filterByBrupoIdByEstudanteId/${1}/${1}`)
      .then(response=>{
        data.push(data.request.response)
      })
      .catch(error=> {
        console.log(error)
      })
    }, []);

  return (
    <View style={styles.container}>
      <AccordionItem
        title={data.situacaoAprendizagem.titulo}
        content={data[0].comentarios.comentario}
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
    backgroundColor: '#ffffff',
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
  },
  contentText: {
    padding: 10,
    fontSize: 16,
    color: '#333333',
  },
});

export default Accordion;

