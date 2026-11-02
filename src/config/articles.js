/**
 * BRANIE — de artikelen per pijler
 * ------------------------------------------------------------------
 * Op de site staat alleen de introductie en één foto; de rest van het
 * verhaal ligt (voorlopig alleen visueel) achter de pre-orderknop.
 *
 * Per artikel:
 *  - slug      deel van de URL: /pijlers/<pijler>/<slug>
 *  - category  klein label (bijv. 'Interview', 'Listicle')
 *  - title     titel; subtitle (optioneel) eronder
 *  - author    naam van de schrijver (optioneel)
 *  - image     foto in src/assets/pillars/ (of wall/ of sales/); weglaten = geen foto
 *  - intro     de zichtbare alinea('s)
 *  - minutes   leestijd van het hele artikel
 *
 * De afgeschermde tekst staat versleuteld in articles-locked.js (die is
 * gegenereerd: de echte tekst komt bewust niet in de website).
 */
export const articles = {
  "personen": [
    {
      slug: "schaatsen-of-sjansen",
      category: "Achtergrond",
      title: "Schaatsen of sjansen?",
      image: "personen-schaatsen.webp",
      intro: [
        "Veertig jaar geleden werd er op de Jaap Edenbaan niet alleen geschaatst, maar ook geouwehoerd, geflirt en misschien wel een eerste zoen gescoord. Tegenwoordig glijdt er tussen de rondjes door ook regelmatig een telefoon uit de zak. Is de Amsterdamse schaatsbaan nog altijd een plek om te sjansen, of zoeken we elkaar tegenwoordig ergens anders op?",
      ],
      minutes: 4,
    },
    {
      slug: "oliebollenkraam-museumplein",
      category: "Interview",
      title: "Geen website of socials. Wél vaste klanten.",
      author: "Milou Lammerts",
      intro: [
        "Op het Museumplein verkopen Rob en Martin oliebollen, appelflappen en ongevraagd een beetje goede zin. De familiekraam staat er al ruim dertig jaar. Kinderen van toen komen inmiddels met hun eigen kinderwagen. En tussen de vaste klanten door verschijnt het een en ander die ze kent van TikTok. Dat laatste hadden de mannen eve onderschat.",
      ],
      minutes: 2,
    },
    {
      slug: "jan-bloem",
      category: "Portret",
      title: "Al bijna een halve eeuw dé plek voor bloemen en een praatje!",
      author: "Puck Diepstraten",
      intro: [
        "De melkboer verdween, de slager vertrok en de oude buurtbewoners maakten plaats voor nieuwe gezichten. Maar op het Surinameplein staat nog altijd dezelfde bloemenman. Jan Blöte, beter bekend als Jan Bloem, verkoopt er al bijna vijftig jaar bloemen. De buurt is in al die jaren flink veranderd; al vindt Jan zelf van niet.",
      ],
      minutes: 4,
    },
    {
      slug: "jes-shoes",
      category: "Interview",
      title: "Wat de klant niet ziet: ‘Wij zijn nooit echt klaar’",
      intro: [
        "Winkelen gaat steeds meer online. En daarnaast heeft de markt moeite om een nieuwe generatie koopmannen aan te trekken. Toch staat de eigenaar van Jes Shoes nog altijd op het waterloopplein. Al meer dan vijftig jaar is de markt zijn werkplek. Voor hem draait winkelen om meer dan alleen iets kopen. Het gaat om persoonlijk contact, een praatje, een grapje en onthouden wat er speelt. Toch komt er meer kijken bij het leven achter de marktkraam.",
      ],
      minutes: 3,
    },
  ],
  "de-stad": [
    {
      slug: "straatnamen",
      category: "Listicle",
      title: "Straatnamen waar je twee keer naar kijkt",
      author: "Ninthe",
      image: "oude-nieuwstraat-bord.webp",
      intro: [
        "Je komt regelmatig rare of bijzondere straatnamen tegen. Je vraagt je dan af: waarom heet deze straat zo? Wat is er hier in hemelsnaam gebeurd? Achter sommige straatnamen schuilt gewoon een oud gebouw of iemand met een grappige achternaam. Neem bijvoorbeeld Kattengat. Die naam roept al veel vragen op. Zouden hier vroeger alleen katten gewoond hebben?",
        "Ontdek de verhalen achter deze vijf straatnamen. Soms schuilt er achter een straatnaam toch iets anders dan je denkt.",
      ],
      minutes: 3,
    },
    {
      slug: "museumplein",
      category: "Listicle",
      title: "5 dingen die zelfs jij als Amsterdammer nog niet weet over het Museumplein",
      intro: [
        "Je fietst er dwars doorheen, haalt er iets bij de appie en weet precies hoe je de toeristen ontwijkt. Maar weet je ook waar je met licht kunt schrijven? Of waarom je onder het Rijksmuseum omhoog moet kijken? Vijf redenen om op het Museumplein eens uit je doppen te kijken.",
      ],
      minutes: 2,
    },
    {
      slug: "wanneer-werd-dit-normaal",
      category: "Achtergrond",
      title: "Wanneer werd dit eigenlijk normaal?",
      image: "straatvervuiling-1.webp",
      intro: [
        "Een bankje waar je niet op kunt zitten. Een winkelkarretje midden op straat. En een muur waarop stickers en graffiti zich langzaam opstapelen. In Amsterdam-West kom je ze gewoon tegen. Je kijkt er misschien even naar en loopt vervolgens door. Maar wanneer zijn we eigenlijk gewend geraakt aan een straat die steeds meer beschadigingen laat zien?",
      ],
      minutes: 4,
    },
    {
      slug: "oud-amsterdam-verse-verf",
      category: "Achtergrond",
      title: "Oud Amsterdam, verse verf",
      author: "Charlie Kantelberg",
      intro: [
        "Amsterdam verandert sneller dan je kunt bijhouden. Winkels verdwijnen en op iedere straathoek lijkt wel iets verbouwd te worden, maar tussen die veranderingen staan gebouwen die juist niét zomaar mogen veranderen. Zo zorgen de schilders van het bedrijf Simons ervoor dat de monumentale gevels van de binnenstad niet in het verleden blijven hangen.",
      ],
      minutes: 4,
    },
    {
      slug: "woonboten-en-buurtfeesten",
      category: "Achtergrond",
      title: "Van half zinkende woonboten en buurtfeesten tot veiligheidsplannen",
      intro: [
        "Half zinkende woonboten vol Oranjesupporters. Buurtfeesten die pas stopten als de laatste buurman naar huis ging. En Koninginnedag, waarop verdwalen in de grote stad onderdeel van de planning was. Amsterdam weet al eeuwen hoe je een feestje moet bouwen, maar de wijze waarop is flink veranderd. Hoe is de stad gezellige chaos naar georganiseerde gezelligheid gegaan?",
      ],
      minutes: 3,
    },
  ],
  "onderweg": [
    {
      slug: "open-boek-op-de-pont",
      category: "Interview",
      title: "Een open boek op de pont",
      image: "onderweg-pont.webp",
      intro: [
        "Noga Limper (21) groeide op in Buitenveldert, fietste als tiener elke dag vanuit Duivendrecht naar school en woont nu in de Museumbuurt. Ze danst, zingt, roeit, speelt toneel en vertelt iedereen alles. Alleen de pont naar Noord neemt ze bijna nooit. Vandaag wel.",
      ],
      minutes: 5,
    },
    {
      slug: "grachten-van-baan",
      category: "Listicle",
      title: "Van specerijen tot selfiesticks: vijf keer dat de Amsterdamse grachten van baan veranderden",
      image: "grachten-6.webp",
      intro: [
        "Wie aan Amsterdam denkt, denkt aan de vele grachten. Tegenwoordig dobberen er rondvaarboten voorbij, liggen er woonboten voor prijzen waar je u tegen zegt en maken toeristen honderden foto’s van dezelfde brug. Maar de grachten kennen al een heel lang verleden. Dit zijn vijf dingen die laten zien hoe Amsterdamse grachten van handelsroute naar fotohotspot veranderden. De Amsterdamse grachten hebben een grotere carrière switch gemaakt dan de gemiddelde persoon in een midlife crisis.",
      ],
      minutes: 2,
    },
  ],
  "cultuur": [
    {
      slug: "amsterdam-in-hakken",
      category: "Listicle",
      title: "Amsterdam in hakken",
      subtitle: "5 redenen waarom je aan de kleding op straat ziet dat Amsterdam verandert",
      author: "Maud Derkx",
      image: "roken-graffitideur.webp",
      intro: [
        "Tik. Tak. Tik. Hakken op de Amsterdamse klinkers. Een fietser schiet voorbij, een toerist maakt een foto van een gracht en aan de overkant loopt iemand in een oversized voetbalshirt, zonnebril en vintage jas. Niemand lijkt hetzelfde gekleed te zijn. Gelukkig maar.",
      ],
      minutes: 4,
    },
    {
      slug: "filmtheaters",
      category: "Listicle",
      title: "Achter elke deur schuilt een verhaal… ook bij deze filmtheaters",
      author: "Madeline Deroo",
      image: "de-uitkijk-filmtheater.webp",
      intro: [
        "Een filmtheater opgericht door het Amsterdamse studentenverzet tot de kleinste bioscoop van Nederland: in Amsterdam heb je het allemaal. Bij deze 5 oude Amsterdamse filmtheaters is er meer te vinden dan een goeie film.",
      ],
      minutes: 3,
    },
    {
      slug: "concerto",
      category: "Listicle",
      title: "Concerto, een ‘gewone’ platenzaak? Echt niet!",
      subtitle: "Vier redenen waarom",
      image: "concerto-cd-wand.webp",
      intro: [
        "Wanneer je bij Concerto naar binnenloopt, is de kans groot dat je langer blijft dan gepland. Tussen de platenbakken valt genoeg te ontdekken, maar waarom is deze winkel uitgegroeid tot zoveel meer dan een platenzaak?",
      ],
      minutes: 2,
    },
    {
      slug: "muren-van-ndsm",
      category: "Achtergrond",
      title: "Vandalisme of kunst, de muren van NDSM",
      subtitle: "Een spuitbus maakt nog geen kunstenaar",
      author: "Roemer Atteveld",
      image: "cultuur-straat.webp",
      intro: [
        "Op de NDSM-werf kijkt Anne Frank je aan vanaf 240 vierkante meter muur. Dat is groter dan elk appartement dat jij je in deze stad kunt veroorloven. De Braziliaanse kunstenaar Eduardo Kobra maakte Let Me Be Myself in 2016. Hij had er meer dan maarliefst 450 spuitbussen en 35 liter lakverf voor nodig.",
      ],
      minutes: 3,
    },
    {
      slug: "lab111",
      category: "Interview",
      title: "“Naar de bioscoop gaan is bijzonder dan een film kijken op je laptop”",
      author: "Madeline Deroo",
      intro: [
        "LAB111 bestaat 10 jaar. Wat ooit begon in een oud laboratorium, met één bioscoopzaal dat helemaal uit elkaar viel, is uitgegroeid tot dé plek voor een film, pizza of om gewoon lekker aan de bak te gaan achter de laptop. Daan de Wit (35) is de mede-eigenaar, de smeerolie en het brein achter LAB111. Hoe kijkt hij terug op de afgelopen tien jaar?",
      ],
      minutes: 5,
    },
    {
      slug: "art-cafe",
      category: "Reportage",
      title: "Geen spierpijn, wel verfvlekken",
      intro: [
        "Pilates, hot yoga en spinning. In Amsterdam kun je je op honderd manieren in het zweet werken. De ene les belooft strakkere billen, de andere een betere conditie. Maar Julia en Anne gooiden het over een andere boeg. Geen dumbbells of yogamatjes, maar kwasten en verf. Hun Art Café is een sportschool voor je creativiteit.",
      ],
      minutes: 3,
    },
    {
      slug: "waterlooplein",
      category: "Vroeger & nu",
      title: "Van legerdump tot vintage blazer: het Waterlooplein",
      author: "Charissa Klitsie",
      image: "stad-markt.webp",
      intro: [
        "Een vintage blazer scoren, afdingen aan de kraam of thuiskomen met iets dat niemand anders heeft. Op het Waterlooplein is struinen nog altijd de bedoeling. Maar in 1950 kwam je hier niet om je outfit compleet te maken. Amsterdam krabbelde op uit de oorlog en de markt bood spullen die schaars waren of die mensen nodig hadden. Dezelfde markt, een andere tijd. Wat je er zoekt, zegt veel over de tijd waarin je leeft.",
      ],
      minutes: 3,
    },
  ],
  "proef-de-stad": [
    {
      slug: "loyaal-aan-de-borrel",
      category: "Recensie",
      title: "Loyaal aan de borrel",
      image: "terras-twee-jongens.webp",
      intro: [
        "“Een paar Loyaaltjes en dan ga ik weer naar huis”",
        "Zegt Wil, tachtig jaar oud, geboren en getogen Jordanees. Zelf drink ik ook graag jenever, maar Loyaal is aan mij voorbijgegaan. Op dat moment zit ik al veel te lang op het terras met twee vrienden bij café Thijssen. Het is dinsdagavond en we hebben alle drie de volgende dag vroeg college. Maar na dit nieuwe inzicht hebben wij voor die avond nog één doel voor ogen: het testen van Loyaal jenever.",
      ],
      minutes: 2,
    },
    {
      slug: "loetje",
      category: "Achtergrond",
      title: "Van biljartcafé naar biefstukimperium",
      subtitle: "Dezelfde jus, een heel ander verhaal.",
      author: "Aniek",
      image: "loetje-2.webp",
      intro: [
        "Loetje: voor de één een vertrouwde plek voor een biefstuk, voor de ander een voorbeeld van hoe een typisch Amsterdamse zaak steeds groter kan worden. In 1977 begon Ludwig ‘Loetje’ Klinkhamer in Amsterdam met een klein biljartcafé. Inmiddels heeft Loetje tientallen locaties door heel Nederland. Wat veranderde er onderweg?",
      ],
      minutes: 2,
    },
    {
      slug: "de-drie-fleschjes",
      category: "Achtergrond",
      title: "De kroeg die ouder is dan je favoriete koffietentje",
      subtitle: "In een stad die voortdurend vernieuwt, houdt dit proeflokaal al eeuwen vast aan zijn eigen tradities.",
      author: "Iris Grisnigt",
      image: "bruine-kroeg-interieur.webp",
      intro: [
        "Van jenever aan de toog tot matcha op iedere straathoek: Amsterdam verandert. Maar wat gebeurt er met plekken die al eeuwen meegaan? Achter de Nieuwe Kerk, in de Gravenstraat, zit De Drie Fleschjes. Een proeflokaal met een geschiedenis die teruggaat tot 1619.",
      ],
      minutes: 4,
    },
    {
      slug: "papeneiland",
      category: "Achtergrond",
      title: "Matcha? Doe effe normaal",
      subtitle: "Amsterdam verandert, maar café ’t Papeneiland blijft eigenwijs",
      image: "proef-bruine-kroeg.webp",
      intro: [
        "Terwijl Amsterdam steeds meer koffietentjes met matcha, havermelk en de nieuwste trends telt, doen ze bij café ’t Papeneiland lekker niet mee. In deze eeuwenoude Jordaanse kroeg houdt de familie Netel vast aan wat ze al generaties kennen. Geen hippe fratsen, maar een eigen karakter en een toonbank vol appeltaart waar zelfs Bill Clinton voor langskwam.",
      ],
      minutes: 2,
    },
  ],
};
