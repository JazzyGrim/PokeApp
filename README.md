Ovo je projekt napravljen koristeći React Native + Expo ( create-react-native-app ).
Za pokretanje potrebno je instalirati Node.JS, te unutar direktorija pokrenuti komandu "npm install".
Za pokretanje preko Expo klijenta potreban je i Expo CLI ( npm i -g expo-cli ). Aplikacija se zatim pokreće s "expo start" te ju je moguće isprobati preko fizičkog uređaja ( ili na emulatoru ).
Sam projekt sastoji se početne stranice na kojoj se nalazi lista pokemona te stranice za detaljan uvid u informacije u pokemonu.
Moguće je i pretraživati pokemone po imenu i broju, kao i filtrirati pokemone po vrsti.

NAPOMENA:
Zbog vremenskog ograničenja za riješavanje projekta, moram napomenuti da nisam bio u mogućnosti na vrijeme dovršiti i optimizirati kod.
Primjerice, Poke-API nema nikakve opcije za sortiranje te iz tog razloga sort nije implementiran.
API također nema pagination prilikom sortiranja po odredenoj vrsti pokemona. Iz ovog razloga, kada se odabere vrsta pokemona, automatski se učita kompletna lista pokemona ( cca. 100 pokemona po vrsti ), kao i poseban request za svakog pokemona u toj listi ( da bi se učitala njegova slika ).
Ovo je extremely inefficient, i definitivno nije production-ready.
Proper Error handling is also missing.

Sve u svemu, aplikacija se može znatno poboljšati, međutim kako sam trenutno između dva putovanja, nisam stigao :)
Na Vama je da procijenite je li Vam ovo dovoljno, ili biste pričekali još cca. tjedan i pol kada ću napokon imati vremena za pravilan rad :)
Za bilokakva pitanja slobodno mi se javite, probati ću odgovoriti čim prije.