
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import {Text} from 'react-native-svg';
import api from './services/api';

const App = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get(`pam3etim/amandaoliveira/listar.php`);
      setChartData(response.data.resultado);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const pieData = chartData.map((item) => ({
    value: Number(item.qntvendas),
    key: `${item.qntestoque}=${item.qntvendas}`,
    
    svg:{
     fill: (
       '#' + ((Math.random() * 0xf46f) << 5 ).toString(16) + '000000'
     ).slice(0,7),
     name: item.qntestoque,
     valores: item.qntvendas,
     legendFontColor: '#7F7F7F',
     legendFontSize: 12,
    }
 }));
 

 const Label = ({slices}) => {
  
   return slices.map((slice, index) => {
     const {pieCentroid, data} = slice;
     return(
      
       <Text
         key={`label-${index}`}
         x={pieCentroid[0]}
         y={pieCentroid[1]}
         fill = "black"
         textAnchor={'middle'}
         alignmentBaseline={'middle'}
         fontSize={18}
         
       >
         {data.value}
       </Text>
     )
   })
 }
 
 return(
  
   <View style ={{flex: 1 , justifyContent: 'center'}}>
    

     <PieChart
       style={{height: 420}} 
       data={pieData}        
 
       backgroundColor="transparent"
       paddingLeft="15"
       yAxisLabel="%"
      >
     <Label></Label>
     <Text style={{textAnchor:'middle', fontSize:15}}>Quantidade de vendas 2023</Text>
      </PieChart>
 
   </View>
 );
 
 }
export default App;