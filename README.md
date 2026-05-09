Steven Lomon Lennartsson

Detta är en Full Stack app som använder https://www.pokewallet.io/api-docs som en db för Pokémon kort som jag kommer bygga CRUD omkring. Man kommer att kunna söka efter kort från deras databas med en sökfunktion (Read) och kunna lägga till Pokémon kort i sin virtuella collection där man även kommer kunna uppdatera hur många exemplar man har av varje kort (Update) och ta bort dem från sin collection (Delete). För Create tänker jag att man ska kunna skapa egna custom Pokémon-kort och lägga till i sin collection, t.ex. om databasen inte skulle ha ett visst kort. Eller för att fylla på med egna roliga creations haha

Finns tillgänglig på https://stevencesario.github.io/react-assignment-1-pokemon/! 🌱

### Post-project reflections
För det första; ja, alla commits har gjorts direkt till main och det är ganska kaos i commitsen all in all hahaha.  
Jag har prioriterat att koda så mycket som möjligt från intuition, förstå och lära mig allt nytt och ha så kul som möjligt. Och detta vill jag säga att jag lyckats bra med!  
Myyyycket tid lades i början på Router-arkitekturen och att förstå det. Och det blev även en grej som itererades på under hela projektets gång.  
Den andra grejen som mycket tid lades ner på var sökfunktionaliteten. Jag gjorde även en pivot här, från automatic navigation med useEffect() till en Goodreads style dropdown med de 5 första sökresultaten. Debouncing var essential för att jag inte skulle bränna igenom requests då jag endast kunde göra 100 requests per timme.  
Hela projektets Gemini chat historik finns i [Build Logs](build-logs.md).  

Några av de allra största brain chemistry altering moments under projektets gång:  
* Lifting state up: collections state arrayen ska inte ligga i CollectionPage.jsx, den ska ligga i App.jsx!
* `prev`: Callback-variabeln i en "set state funktion" behöver inte hela `prev`! Den kan t.ex. heta `prevCollection`! Som i: `setUserCollection(prevCollection => prevCollection.map(item => item.id === id ? { ...item, amount: item.amount + 1 } : item));`
* Vi kan använda spread operator två gånger i en kodsnutt, först i en array och sedan i ett objekt! Som i: `setUserCollection([...userCollection, { ...card, amount: 1, isNew: true }]);`  

Jag har även fått jobba med blob-data för första gången i och med detta projekt! Och i och med det skapa lokala URL:er för bilder istället för att bara fetcha en image URL. Utöver detta har jag fått använda och blivit van med bl.a. `useSearchParams` och `useParams` (och skillnaden mellan dem!), `useNavigate`, `useLocation()` för att cacha API data i en liten "ryggsäck" för att minska antalet requests haha, optional chaining för att säkert nå och använda API data, och `useRef()` för att skapa en referens till en lokalt scoped useEffect variabel som i en annan funktion!  

Det finns ingen persistent state just nu. Detta är den allra största begränsningen just nu. Vad jag vet finns det inga buggar i appen just nu men jag är helt öppen till att ha fel med det haha!  
Man kan inte skapa sina egna kort vilken var tanken från början haha. Jag droppade detta då jag insåg att jag även om jag skulle tillåta användaren att ladda upp en egen bild för kortet skulle det ta väldigt mycket tid att skapa kort layouten dynamiskt.  

All CSS är helt vibe kodad, *speciellt* keyframe animationerna hahaha, och jag är helt okej med detta. Super neat att jag kunde återanvända "Slam-in" animationen från StickyNote, ett mini projekt jag kodade för att öva useState och komponent hierarki!  

I've had a blast!! Super excited att använda allt jag fått lära mig och använda här i andra projekt! 🙌
