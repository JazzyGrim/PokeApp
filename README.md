This is a project made using React Native + Expo ( create-react-native-app ).
To run the app you must install Node.JS, and inside the project directory run "npm install".
To run the app using Expo, Expo CLI is also required ( npm i -g expo-cli ). Running the app is then as simple as running "expo start". You may also run the app on a physical device ( or an emulator ).
The project consists of a homepage which contains a list of pokemon, and a subsequent page that shows details about the selected pokemon.
It is also possible to search pokemon by their name or ID. Furthermore, filtering pokemon by type is also possible.

Note:
Do to the nature of PokeAPI, the app utilizes two ways of rendering data.
To elaborate:
When grabbing a list of pokemon, PokeAPI automatically paginates the data, making the client-side code extremely simple.
On the other hand, grabbing data such as Pokemon which are of a certain type is much different. That data is not paginated, so the actual optimization and pagination is done on the client.

There are also some performance improvements to be made, but due to time constraints I have to leave the app as is.
Plus, since this is a sample project, I don't feel like overengineering the app ;)
Oh, and another feature left out due to time constraints is the "similar pokemon" feature on the Pokemon screen.
Let me know if this is enough code for you, or if you'd like me to continue adding these features in a week or two when I can return to a normal work schedule.