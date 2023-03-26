import { createContext, useEffect, useState } from 'react'
import { escuro, claro } from '../estilosGlobais'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const TemaContext = createContext({})

export function TenaProvider({children}) {
   const [tema, setTema] = useState('escuro')

   const temas = {
      'escuro': escuro,
      'claro': claro
   }

   useEffect(async () => {
      const tema = await AsyncStorage.getItem('@tema');
      if(tema){
         setTemaAtual(tema)
      }
   }, [])

   async function setTemaAtual(tema){
      await AsyncStorage.setItem('@tema', tema)
      setTema(tema)
   }

   return(
      <TemaContext.Provider
         value={{
            tema,
            setTemaAtual,
            temaEscolhido: temas[tema],
         }}
      >
         {children}
      </TemaContext.Provider>
   )
}