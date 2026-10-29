/* Logicers: the es words of long-lost-cousin, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-long-lost-cousin-es.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "hippo": {
  "fact": "Las ballenas y los delfines son los parientes vivos más cercanos del hipopótamo. Su último antepasado común vivió hace unos 55 millones de años."
 },
 "trex": {
  "fact": "Las aves son dinosaurios vivos, así que una gallina está más cerca del T. rex que cualquier cocodrilo o lagarto."
 },
 "termite": {
  "fact": "Las termitas no son hormigas. Son cucarachas que se volvieron sociales."
 },
 "hyena": {
  "fact": "Las hienas parecen perros, pero entre los carnívoros están del lado de los gatos, junto a los gatos, las civetas y las mangostas."
 },
 "shark": {
  "fact": "Las rayas son parientes planos de los tiburones. Un atún, que es un pez óseo, está más cerca de un delfín que de un tiburón."
 },
 "flamingo": {
  "fact": "Los parientes vivos más cercanos del flamenco son los zambullidores, unas aves pequeñas que bucean. Las cigüeñas y las garzas solo se le parecen."
 },
 "red_panda": {
  "fact": "El panda rojo no es un oso. Pertenece al grupo de los mapaches, las comadrejas y las mofetas. El panda gigante sí es un oso de verdad."
 },
 "mushroom": {
  "fact": "Los hongos están más cerca de los animales que de las plantas. Un hongo es un primo lejano tuyo, no del roble."
 },
 "bat": {
  "fact": "Los murciélagos no son ratones voladores. Pertenecen al grupo de los caballos, los gatos, los perros y las ballenas. Los ratones están en la otra gran rama, con los monos y con nosotros."
 },
 "turtle": {
  "fact": "Los estudios del genoma sitúan a las tortugas junto a los cocodrilos y las aves, y no junto a los lagartos. Esa separación ocurrió hace unos 255 millones de años."
 },
 "horseshoe_crab": {
  "fact": "Los cangrejos herradura no son cangrejos. Son parientes de las arañas y los escorpiones."
 },
 "falcon": {
  "fact": "Los estudios del genoma apartaron a los halcones de los gavilanes y las águilas. Sus parientes más cercanos son los loros y las aves cantoras."
 },
 "firefly": {
  "fact": "Las luciérnagas no son moscas. Son escarabajos, igual que las mariquitas."
 },
 "anteater": {
  "fact": "Los osos hormigueros y los perezosos son parientes cercanos. Al pangolín lo llaman «oso hormiguero escamoso» y a la equidna «oso hormiguero espinoso», pero ninguno de los dos es un pariente cercano."
 },
 "centipede": {
  "fact": "Los ciempiés y los milpiés son parientes cercanos. Ambos tienen muchas patas, y ninguno es un insecto."
 },
 "aardvark": {
  "fact": "El cerdo hormiguero pertenece a un grupo africano que incluye a los elefantes, las vacas marinas y los damanes. No tiene un parentesco cercano con los cerdos."
 },
 "triceratops": {
  "fact": "El Triceratops era un dinosaurio, y las aves son dinosaurios vivos. Las tortugas son reptiles de otra rama, y el cuerno del rinoceronte solo se le parece."
 },
 "seal": {
  "fact": "Las focas y las morsas son pinnípedos. Son carnívoros del lado de los perros, así que el perro viene después. Los delfines volvieron al mar por su cuenta."
 },
 "octopus": {
  "fact": "El pulpo es un molusco, igual que el caracol."
 },
 "penguin": {
  "fact": "Los parientes vivos más cercanos del pingüino son los albatros y los petreles. Las dos ramas se separaron hace unos 60 millones de años. Los frailecillos solo se parecen a los pingüinos."
 },
 "meerkat": {
  "fact": "Los suricatos son mangostas, que están del lado de los gatos entre los carnívoros. Los osos están del lado de los perros, y los perros de las praderas, que se ponen de pie igual que ellos, son roedores."
 },
 "ant": {
  "fact": "Las hormigas evolucionaron a partir de las avispas y pertenecen al grupo de las avispas y las abejas. Las termitas son parientes de las cucarachas."
 },
 "beaver": {
  "fact": "El castor es un roedor, igual que el ratón. Los conejos no son roedores, pero son los parientes más próximos de los roedores. Las nutrias son carnívoras."
 },
 "axolotl": {
  "fact": "El ajolote es una salamandra, y las salamandras son anfibios, igual que las ranas. Los lagartos son reptiles."
 },
 "camel": {
  "fact": "Los camellos y las llamas pertenecen a la misma familia. Las llamas son los camellos de Sudamérica."
 },
 "seahorse": {
  "fact": "El caballito de mar es un pez óseo, del mismo gran grupo que el atún."
 },
 "toucan": {
  "fact": "Los tucanes pertenecen al orden de los pájaros carpinteros. Los cálaos desarrollaron su gran pico por separado."
 },
 "porcupine": {
  "fact": "Los puercoespines son roedores de la rama de la cobaya. Los ratones son roedores de otra rama, y los erizos desarrollaron sus púas por separado."
 },
 "mantis": {
  "fact": "Los parientes más cercanos de la mantis religiosa son las cucarachas y las termitas."
 },
 "narwhal": {
  "fact": "El narval y la beluga son los únicos dos miembros vivos de su familia de ballenas."
 },
 "velociraptor": {
  "fact": "El Velociraptor tenía plumas y era un pariente cercano de las aves."
 },
 "orca": {
  "fact": "La orca es el miembro más grande de la familia de los delfines."
 },
 "flea": {
  "fact": "Las pulgas están más cerca de las moscas que de los piojos. Las mariposas vienen después: igual que las pulgas y las moscas, pasan por una fase de pupa. Los piojos no."
 },
 "pangolin": {
  "fact": "Los parientes vivos más cercanos del pangolín son los carnívoros, como los gatos. Los caballos están en una rama cercana. Sus escamas solo se parecen a la armadura de un armadillo."
 },
 "barnacle": {
  "fact": "Los percebes parecen moluscos con concha, pero son crustáceos, parientes de los cangrejos. Las arañas son otros artrópodos, y los mejillones son moluscos."
 },
 "kiwi": {
  "fact": "El ADN de huesos antiguos mostró que los parientes más cercanos del kiwi eran las gigantescas aves elefante de Madagascar, y no los moas de Nueva Zelanda."
 },
 "snake": {
  "fact": "Las serpientes pertenecen al mismo orden que los lagartos. En el fondo, una serpiente es un lagarto muy modificado."
 },
 "deer": {
  "fact": "Los ciervos y las vacas son rumiantes. Incluso un cerdo está más cerca de un ciervo que un caballo."
 },
 "scorpion": {
  "fact": "Los escorpiones son arácnidos, igual que las arañas. Las langostas solo se les parecen."
 },
 "otter": {
  "fact": "Las nutrias pertenecen a la familia de las comadrejas. Las focas son otros carnívoros, y los castores son roedores."
 },
 "stegosaurus": {
  "fact": "El Stegosaurus y el Triceratops pertenecían a los dinosaurios de cadera de ave. El T. rex venía de la otra gran rama."
 },
 "giant_panda": {
  "fact": "El panda gigante es un oso de verdad. El panda rojo no lo es: pertenece al grupo de los mapaches y las comadrejas."
 },
 "sea_urchin": {
  "fact": "Los erizos de mar y las estrellas de mar pertenecen al mismo grupo. Hasta un erizo está más cerca de un erizo de mar que una medusa."
 },
 "swallow": {
  "fact": "Las golondrinas son aves cantoras, igual que los gorriones, y los loros son los parientes más cercanos de las aves cantoras. Los vencejos solo se parecen a las golondrinas."
 },
 "tomato": {
  "fact": "El tomate y la papa pertenecen al mismo género. Los chiles están en la misma familia, la de las solanáceas. Los hongos ni siquiera son plantas."
 },
 "guinea_pig": {
  "fact": "El capibara, el roedor vivo más grande, pertenece a la familia de la cobaya. Los conejos no son roedores en absoluto."
 },
 "bee": {
  "fact": "Las abejas evolucionaron a partir de las avispas."
 },
 "sugar_glider": {
  "fact": "El petauro del azúcar es un marsupial, del mismo orden que el koala. Las ardillas voladoras desarrollaron por separado su membrana para planear."
 },
 "ichthyosaur": {
  "fact": "Los ictiosaurios eran reptiles del mar. Su forma de delfín evolucionó por separado: es un clásico ejemplo de animales que se parecen sin ser parientes cercanos."
 },
 "thylacine": {
  "fact": "El tigre de Tasmania era un marsupial, igual que el canguro. Solo se parecía a un lobo. El ornitorrinco también es australiano, pero pone huevos."
 },
 "whale_shark": {
  "fact": "El tiburón ballena es un tiburón. Las ballenas son mamíferos, y una ballena está más cerca de un atún que de cualquier tiburón."
 },
 "ostrich": {
  "fact": "Los avestruces y los emús están en la misma rama antigua de aves, la que también incluye a los kiwis y a los ñandúes."
 },
 "tapir": {
  "fact": "Los tapires se parecen un poco a los cerdos, pero pertenecen al grupo de los caballos y los rinocerontes."
 },
 "tick": {
  "fact": "Las garrapatas son arácnidos, igual que las arañas, y no insectos."
 },
 "mammoth": {
  "fact": "El ADN antiguo muestra que el mamut lanudo estaba más cerca del elefante asiático que del africano. Los mastodontes pertenecían a una familia distinta y más antigua."
 },
 "dimetrodon": {
  "fact": "El Dimetrodon no era un dinosaurio. Pertenece a la línea que llevó a los mamíferos, así que está más cerca de un perro que del T. rex o de una gallina."
 },
 "armadillo": {
  "fact": "Los armadillos pertenecen al grupo de los perezosos y los osos hormigueros. El pangolín también lleva armadura, pero pertenece al grupo de los gatos y otros carnívoros."
 },
 "woodlouse": {
  "fact": "Las cochinillas de la humedad son crustáceos que viven en tierra, parientes de los camarones y los cangrejos."
 },
 "human": {
  "fact": "Los chimpancés y los bonobos son nuestros parientes vivos más cercanos. Después vienen los gorilas, y luego los orangutanes."
 },
 "eel": {
  "fact": "Las anguilas son peces óseos, igual que los salmones. Las lampreas se parecen a las anguilas, pero son peces sin mandíbulas de una rama mucho más antigua. Incluso una rana está más cerca de una anguila."
 },
 "duck": {
  "fact": "Los patos y las gallinas van juntos: las aves acuáticas como el pato y las gallináceas forman una misma rama antigua de aves. Las fochas solo se parecen a los patos."
 },
 "dolphin": {
  "fact": "Los delfines y las ballenas descienden de mamíferos ungulados terrestres, el grupo de las vacas, los cerdos y los hipopótamos. Los caballos también son ungulados, pero de otra rama."
 },
 "crocodile": {
  "fact": "Los parientes vivos más cercanos del cocodrilo son las aves, no los lagartos."
 },
 "koala": {
  "fact": "El koala no es un oso. Es un marsupial, y sus parientes vivos más cercanos son los wombats."
 },
 "butterfly": {
  "fact": "Las mariposas y las polillas forman un mismo orden de insectos."
 },
 "zebra": {
  "fact": "Las cebras y los caballos pertenecen al mismo género, Equus. Sus ramas se separaron hace unos 4 millones de años."
 },
 "jellyfish": {
  "fact": "Los corales son animales, y parientes cercanos de las medusas."
 },
 "swift": {
  "fact": "Los vencejos son los parientes más cercanos de los colibríes. Las golondrinas se parecen a los vencejos, pero son aves cantoras."
 },
 "hyrax": {
  "fact": "El damán se parece a una cobaya, pero sus parientes vivos más cercanos son los elefantes y las vacas marinas. El cerdo hormiguero viene del mismo grupo africano."
 },
 "komodo": {
  "fact": "El dragón de Komodo y los demás varanos comparten una rama con las serpientes. Los cocodrilos están más cerca de las aves."
 },
 "slug": {
  "fact": "Las babosas son caracoles que perdieron su concha. El pulpo también es un molusco, y las lombrices de tierra pertenecen a otro grupo."
 },
 "echidna": {
  "fact": "La equidna y el ornitorrinco son los únicos mamíferos que ponen huevos. Los erizos y los puercoespines desarrollaron sus púas por separado."
 },
 "lungfish": {
  "fact": "Los peces pulmonados son los parientes vivos más cercanos de todos los animales de cuatro extremidades, así que un pez pulmonado está más cerca de una vaca que de un salmón. Su antepasado común vivió hace unos 420 millones de años."
 },
 "mouse": {
  "fact": "Los roedores y los primates comparten una rama, así que un ratón está más cerca de ti que de una musaraña. Ese antepasado común vivió hace unos 90 millones de años."
 },
 "dodo": {
  "fact": "El dodo era una paloma gigante que no podía volar. Su pariente vivo más cercano es la paloma de Nicobar."
 },
 "elephant": {
  "fact": "Los mamuts eran elefantes, de la misma familia. Después vienen los manatíes: las vacas marinas son parientes cercanas de los elefantes. Los hipopótamos solo lo parecen."
 },
 "pterodactyl": {
  "fact": "Los pterosaurios eran reptiles voladores y los parientes más cercanos de los dinosaurios, y las aves son dinosaurios. Los murciélagos aprendieron a volar por su cuenta."
 },
 "earthworm": {
  "fact": "Las sanguijuelas son parientes cercanas de las lombrices de tierra."
 },
 "shrew": {
  "fact": "La musaraña se parece a un ratón, pero no es un roedor. Pertenece al grupo de los erizos y los topos, y hasta los murciélagos están más cerca de ella que los ratones."
 },
 "horse": {
  "fact": "Los caballos, los rinocerontes y los tapires son los ungulados de dedos impares. Las vacas y los camellos son de dedos pares, otra rama."
 },
 "crane": {
  "fact": "Las grullas pueden parecerse a las garzas, pero pertenecen al mismo grupo que los rascones, como la focha. Las garzas pertenecen a otro grupo de aves."
 },
 "wolf": {
  "fact": "Las focas son carnívoros del lado de los perros, así que un lobo está más cerca de una foca que de una hiena, que es del lado de los gatos. El tigre de Tasmania era un marsupial que solo se parecía a un lobo."
 },
 "tuna": {
  "fact": "Los atunes y los caballitos de mar no se parecen en nada, pero pertenecen al mismo grupo de peces óseos. Los salmones están en otra rama, y las anguilas en una más antigua."
 },
 "platypus": {
  "fact": "El ornitorrinco tiene un pico como el de un pato y una cola como la de un castor, pero es un mamífero. Él y las equidnas son los únicos mamíferos vivos que ponen huevos."
 },
 "lizard": {
  "fact": "Los lagartos y las aves son reptiles, así que un lagarto está más cerca de una gallina que de un perro. Las salamandras son anfibios, igual que las ranas."
 },
 "manatee": {
  "fact": "Los manatíes pertenecen a los afroterios, un grupo de mamíferos que incluye a los cerdos hormigueros y los elefantes. Las morsas y los delfines pertenecen a otro grupo, y las vacas marinas evolucionaron por separado hasta parecerse a ellos."
 },
 "housefly": {
  "fact": "Las moscas, las mariposas y las abejas pasan por una fase de pupa, y las abejas se separaron primero. La libélula no es una mosca y no tiene fase de pupa."
 },
 "lobster": {
  "fact": "Los insectos y los crustáceos forman una misma rama de los artrópodos, así que una langosta está más cerca de un escarabajo que de un escorpión. Los escorpiones son arácnidos."
 },
 "apple": {
  "fact": "El manzano y el roble pertenecen a las rósidas, un gran grupo de plantas con flores. Los tomates también son plantas con flores. El musgo no tiene flores."
 },
 "pig": {
  "fact": "Los cerdos y los hipopótamos son ungulados de dedos pares. Los caballos tienen un número impar de dedos y están en la misma gran rama. Los conejos están en otra."
 },
 "millipede": {
  "fact": "Los milpiés y los ciempiés son miriápodos. Las cochinillas de la humedad son crustáceos, otros artrópodos. Las lombrices de tierra ni siquiera son artrópodos."
 },
 "mastodon": {
  "fact": "Los mastodontes y los mamuts eran parientes de los elefantes. Los damanes son pequeños primos africanos de los elefantes. Los rinocerontes solo lo parecen."
 },
 "great_white": {
  "fact": "Los tiburones y las rayas son parientes cercanos, con esqueleto de cartílago. Los delfines se parecen a los tiburones, pero son mamíferos. El pulpo ni siquiera tiene columna vertebral."
 },
 "hornbill": {
  "fact": "Los cálaos y los tucanes pertenecen al mismo grupo de aves terrestres. Los loros son aves terrestres de otra rama. Las gallinas están más lejos."
 },
 "chili": {
  "fact": "Los chiles y los tomates son solanáceas. Los robles también son plantas con flores. El musgo no tiene flores en absoluto."
 },
 "salamander": {
  "fact": "El ajolote es una salamandra. Las ranas son los parientes más cercanos de las salamandras. Los lagartos se parecen a las salamandras, pero son reptiles."
 },
 "heron": {
  "fact": "Las garzas y las cigüeñas están en el gran grupo de las aves acuáticas. Las grullas solo se parecen a las garzas: pertenecen al grupo de los rascones. Los avestruces están todavía más lejos."
 },
 "sponge": {
  "fact": "Las esponjas son animales, igual que los corales. Los hongos están más cerca de los animales que las plantas. El musgo es una planta."
 },
 "moth": {
  "fact": "Las polillas y las mariposas pertenecen al mismo orden de insectos. Las moscas también pasan por una fase de pupa. Las libélulas son una rama más antigua."
 },
 "orangutan": {
  "fact": "Los orangutanes y los seres humanos son grandes simios, igual que los gorilas y los chimpancés. Los monos son primates, pero no grandes simios. Los perezosos solo comparten la vida en los árboles."
 },
 "eagle": {
  "fact": "Las águilas y los pájaros carpinteros son aves terrestres, una gran rama de las aves. Las garzas pertenecen a las aves acuáticas. Las gallinas se separaron todavía antes."
 },
 "leech": {
  "fact": "Las sanguijuelas son parientes cercanas de las lombrices de tierra. Los caracoles pertenecen a la misma gran rama de animales. Las serpientes solo parecen gusanos."
 },
 "dog": {
  "fact": "Las focas son carnívoros del lado de los perros, así que están más cerca del perro que una hiena. Las hienas están del lado de los gatos, así que la hiena y el gato quedan empatados."
 },
 "shrimp": {
  "fact": "Los camarones y las langostas son decápodos. Las cochinillas de la humedad también son crustáceos, pero de otra rama. Los escorpiones son parientes de las arañas, no crustáceos."
 },
 "whale": {
  "fact": "Las ballenas son ungulados de dedos pares, igual que las vacas. Las focas pertenecen a la misma gran rama de mamíferos. Los conejos están en la otra."
 },
 "parrot": {
  "fact": "Los loros son los parientes más cercanos de las aves paseriformes, como el gorrión. Los halcones vienen después. Los tucanes solo comparten con ellos el pico de colores vivos."
 },
 "oak": {
  "fact": "El roble y la papa son plantas con flores. El musgo es una planta sin flores. Los hongos ni siquiera son plantas."
 },
 "beetle": {
  "fact": "Las luciérnagas son escarabajos. Las cucarachas son insectos que solo se parecen a los escarabajos. Las arañas ni siquiera son insectos."
 },
 "coral": {
  "fact": "Los corales y las medusas son cnidarios. Sus siguientes parientes más cercanos son animales como nosotros. Las esponjas se separaron antes que ambos."
 },
 "hedgehog": {
  "fact": "Los erizos y las musarañas forman un grupo natural, junto con los topos. Los puercoespines solo comparten las púas: son roedores. Las equidnas son mamíferos que ponen huevos."
 },
 "grasshopper": {
  "fact": "Los saltamontes y las cucarachas pertenecen a la misma rama de insectos. Las mariposas también pueden doblar las alas hacia atrás. Las libélulas no."
 },
 "stork": {
  "fact": "Las cigüeñas y los pingüinos pertenecen al mismo grupo de aves acuáticas. Los flamencos, en cambio, pertenecen al grupo de los zambullidores. Los avestruces están todavía más lejos."
 },
 "frog": {
  "fact": "Las ranas y las salamandras son los parientes más cercanos entre sí. Los lagartos y los seres humanos pertenecen a otra rama, así que están igual de lejos."
 },
 "llama": {
  "fact": "Las ballenas son ungulados de dedos pares, igual que las llamas, así que son parientes más cercanos que los caballos, que tienen dedos impares. Los canguros son marsupiales."
 },
 "spider": {
  "fact": "Las arañas y los escorpiones son arácnidos. Los insectos, como las hormigas, están dentro del grupo de los crustáceos, así que la hormiga y el cangrejo quedan empatados."
 },
 "starfish": {
  "fact": "Las estrellas de mar y los seres humanos pertenecen a la misma gran rama de animales. Los cangrejos están en la otra gran rama. Las medusas se separaron antes que ambos."
 },
 "cat": {
  "fact": "Los gatos y los perros son carnívoros. El pangolín, con escamas y todo, pertenece a la misma gran rama de mamíferos. Los conejos pertenecen a otra."
 },
 "elephant_bird": {
  "fact": "El ave elefante gigante era la más cercana al pequeño kiwi. El avestruz se separó antes. Las gallinas pertenecen a otra rama de aves."
 },
 "rabbit": {
  "fact": "Los conejos no son roedores, pero los roedores, como la cobaya, son sus parientes más cercanos. Los seres humanos estamos en la misma gran rama. Los canguros son marsupiales."
 },
 "crab": {
  "fact": "Los cangrejos y las langostas son los decápodos que caminan. Los camarones también son decápodos, pero nadadores. El cangrejo herradura no es un cangrejo: es pariente de las arañas."
 },
 "albatross": {
  "fact": "Los albatros y los pingüinos pertenecen al gran grupo de las aves acuáticas. Las águilas son aves terrestres. Los patos están en una rama de aves más antigua."
 },
 "walrus": {
  "fact": "La morsa pertenece al grupo de las focas y los leones marinos. Los osos también son carnívoros del lado de los perros, así que están más cerca que los manatíes, que solo lo parecen."
 },
 "lamprey": {
  "fact": "La lamprea es un pez sin mandíbulas, pero es un vertebrado igual que el salmón. Las sanguijuelas son gusanos sin columna vertebral. Las medusas están todavía más lejos."
 },
 "moss": {
  "fact": "El musgo y el manzano son plantas. Los hongos y los seres humanos están más cerca entre sí que de cualquier planta, así que quedan empatados."
 },
 "dragonfly": {
  "fact": "La libélula es un insecto, igual que la mosca. Los insectos están dentro del grupo de los crustáceos, así que el cangrejo viene después. Las arañas están en otra rama."
 },
 "prairie_dog": {
  "fact": "El perro de las praderas no es un perro. Es una ardilla terrestre, un roedor igual que el ratón. Los suricatos son carnívoros, y los canguros son marsupiales."
 },
 "sparrow": {
  "fact": "Aquí, los gorriones y los loros son los parientes más cercanos entre sí. Las águilas también son aves terrestres. Los colibríes pertenecen al grupo de los vencejos."
 },
 "raccoon": {
  "fact": "Los mapaches y las comadrejas son parientes cercanos. El panda rojo pertenece al mismo grupo más amplio. Los osos son carnívoros de otra rama."
 },
 "chicken": {
  "fact": "Las gallinas y los patos están juntos en una rama temprana de las aves. Las palomas están en la rama principal. El T. rex era un dinosaurio, pero solo un primo lejano."
 },
 "salmon": {
  "fact": "Los salmones y los atunes pertenecen a los peces de aletas radiadas. Los peces pulmonados también son peces óseos, pero de aletas lobuladas. Los tiburones tienen el esqueleto de cartílago."
 },
 "kangaroo": {
  "fact": "Los canguros y los koalas pertenecen al mismo orden de marsupiales. El tigre de Tasmania era un marsupial de otro orden. Los ratones no son marsupiales."
 },
 "louse": {
  "fact": "Los piojos y las pulgas son insectos sin alas. Las garrapatas también pican, pero son arácnidos. Las lombrices de tierra ni siquiera son artrópodos."
 },
 "iguana": {
  "fact": "Las iguanas y los dragones de Komodo son lagartos. Los cocodrilos son reptiles de otra rama. Las salamandras solo se parecen a los lagartos: son anfibios."
 },
 "capybara": {
  "fact": "Los capibaras y los puercoespines pertenecen a la misma rama de roedores. Los ratones son roedores de otra rama. Los cerdos no son roedores en absoluto."
 },
 "cockroach": {
  "fact": "Las termitas son un tipo de cucaracha que vive en colonias. Las mantis son parientes cercanas. Los escarabajos solo se parecen a las cucarachas."
 },
 "mussel": {
  "fact": "Los mejillones y los pulpos son moluscos. Los percebes también viven dentro de conchas pegadas a las rocas, pero son crustáceos. Los corales están todavía más lejos."
 },
 "turkey": {
  "fact": "Los pavos y las gallinas pertenecen a la misma familia de gallináceas. Los patos, que son aves acuáticas, vienen después. Los avestruces pertenecen a una rama de aves más antigua."
 },
 "potato": {
  "fact": "Las papas y los chiles son solanáceas. Los manzanos son plantas con flores de otra familia. Los hongos ni siquiera son plantas."
 },
 "cow": {
  "fact": "Las vacas y los ciervos pertenecen al mismo grupo de los rumiantes. Los camellos también tienen un número par de dedos, pero están en otra rama. Los caballos tienen un número impar."
 },
 "ray": {
  "fact": "Las rayas son parientes cercanas de los tiburones: ambos tienen esqueleto de cartílago. Los salmones son peces óseos. El pulpo ni siquiera tiene columna vertebral."
 },
 "ladybird": {
  "fact": "Las mariquitas son escarabajos. Los escarabajos y las mariposas pasan por una fase de pupa; las cucarachas no. Las garrapatas ni siquiera son insectos."
 },
 "rhino": {
  "fact": "Los rinocerontes y los tapires son los parientes más cercanos entre sí. Los caballos también son ungulados de dedos impares. Los elefantes solo lo parecen."
 },
 "coot": {
  "fact": "Las fochas y las grullas pertenecen al mismo orden de aves. Las garzas pertenecen a otro grupo. Los patos están en una rama más antigua."
 },
 "gorilla": {
  "fact": "Los gorilas, los chimpancés y los seres humanos forman un grupo cercano de grandes simios. Los orangutanes se separaron antes. Los monos no son grandes simios, ni mucho menos."
 },
 "squid": {
  "fact": "Los calamares y los pulpos son cefalópodos. Los caracoles también son moluscos, pero de otra clase. Las medusas no son moluscos en absoluto."
 },
 "wasp": {
  "fact": "Las hormigas y las avispas pertenecen al mismo orden de insectos, junto con las abejas. Las moscas también pasan por una fase de pupa. Los saltamontes no."
 },
 "flying_squirrel": {
  "fact": "Las ardillas voladoras y los perros de las praderas pertenecen los dos a la familia de las ardillas. Los ratones también son roedores. El petauro del azúcar solo se les parece: es un marsupial."
 },
 "emu": {
  "fact": "El kiwi está más cerca del emú que el avestruz: los avestruces se separaron primero. Los pavos están en una rama completamente distinta."
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["long-lost-cousin"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["long-lost-cousin"] = days;
  window.LG_PUZZLES["long-lost-cousin.byId"] = byId;
})();
window.LG_PUZZLES["long-lost-cousin.things"] = {
 "hippo": {
  "name": "Hipopótamo",
  "the": "el hipopótamo",
  "of": "del hipopótamo",
  "bare": "hipopótamo"
 },
 "pig": {
  "name": "Cerdo",
  "the": "el cerdo",
  "of": "del cerdo",
  "bare": "cerdo"
 },
 "whale": {
  "name": "Ballena",
  "the": "la ballena",
  "of": "de la ballena",
  "bare": "ballena"
 },
 "rhino": {
  "name": "Rinoceronte",
  "the": "el rinoceronte",
  "of": "del rinoceronte",
  "bare": "rinoceronte"
 },
 "trex": {
  "name": "T. rex",
  "the": "el T. rex",
  "of": "del T. rex",
  "bare": "T. rex"
 },
 "komodo": {
  "name": "Dragón de Komodo",
  "the": "el dragón de Komodo",
  "of": "del dragón de Komodo",
  "bare": "dragón de Komodo"
 },
 "chicken": {
  "name": "Gallina",
  "the": "la gallina",
  "of": "de la gallina",
  "bare": "gallina"
 },
 "crocodile": {
  "name": "Cocodrilo",
  "the": "el cocodrilo",
  "of": "del cocodrilo",
  "bare": "cocodrilo"
 },
 "termite": {
  "name": "Termita",
  "the": "la termita",
  "of": "de la termita",
  "bare": "termita"
 },
 "ant": {
  "name": "Hormiga",
  "the": "la hormiga",
  "of": "de la hormiga",
  "bare": "hormiga"
 },
 "wasp": {
  "name": "Avispa",
  "the": "la avispa",
  "of": "de la avispa",
  "bare": "avispa"
 },
 "cockroach": {
  "name": "Cucaracha",
  "the": "la cucaracha",
  "of": "de la cucaracha",
  "bare": "cucaracha"
 },
 "hyena": {
  "name": "Hiena",
  "the": "la hiena",
  "of": "de la hiena",
  "bare": "hiena"
 },
 "cat": {
  "name": "Gato",
  "the": "el gato",
  "of": "del gato",
  "bare": "gato"
 },
 "dog": {
  "name": "Perro",
  "the": "el perro",
  "of": "del perro",
  "bare": "perro"
 },
 "bear": {
  "name": "Oso",
  "the": "el oso",
  "of": "del oso",
  "bare": "oso"
 },
 "shark": {
  "name": "Tiburón",
  "the": "el tiburón",
  "of": "del tiburón",
  "bare": "tiburón"
 },
 "dolphin": {
  "name": "Delfín",
  "the": "el delfín",
  "of": "del delfín",
  "bare": "delfín"
 },
 "tuna": {
  "name": "Atún",
  "the": "el atún",
  "of": "del atún",
  "bare": "atún"
 },
 "ray": {
  "name": "Raya",
  "the": "la raya",
  "of": "de la raya",
  "bare": "raya"
 },
 "flamingo": {
  "name": "Flamenco",
  "the": "el flamenco",
  "of": "del flamenco",
  "bare": "flamenco"
 },
 "heron": {
  "name": "Garza",
  "the": "la garza",
  "of": "de la garza",
  "bare": "garza"
 },
 "grebe": {
  "name": "Zambullidor",
  "the": "el zambullidor",
  "of": "del zambullidor",
  "bare": "zambullidor"
 },
 "stork": {
  "name": "Cigüeña",
  "the": "la cigüeña",
  "of": "de la cigüeña",
  "bare": "cigüeña"
 },
 "red_panda": {
  "name": "Panda rojo",
  "the": "el panda rojo",
  "of": "del panda rojo",
  "bare": "panda rojo"
 },
 "raccoon": {
  "name": "Mapache",
  "the": "el mapache",
  "of": "del mapache",
  "bare": "mapache"
 },
 "giant_panda": {
  "name": "Panda gigante",
  "the": "el panda gigante",
  "of": "del panda gigante",
  "bare": "panda gigante"
 },
 "mushroom": {
  "name": "Hongo",
  "the": "el hongo",
  "of": "del hongo",
  "bare": "hongo"
 },
 "human": {
  "name": "Ser humano",
  "the": "el ser humano",
  "of": "del ser humano",
  "bare": "ser humano"
 },
 "moss": {
  "name": "Musgo",
  "the": "el musgo",
  "of": "del musgo",
  "bare": "musgo"
 },
 "oak": {
  "name": "Roble",
  "the": "el roble",
  "of": "del roble",
  "bare": "roble"
 },
 "bat": {
  "name": "Murciélago",
  "the": "el murciélago",
  "of": "del murciélago",
  "bare": "murciélago"
 },
 "monkey": {
  "name": "Mono",
  "the": "el mono",
  "of": "del mono",
  "bare": "mono"
 },
 "horse": {
  "name": "Caballo",
  "the": "el caballo",
  "of": "del caballo",
  "bare": "caballo"
 },
 "mouse": {
  "name": "Ratón",
  "the": "el ratón",
  "of": "del ratón",
  "bare": "ratón"
 },
 "turtle": {
  "name": "Tortuga",
  "the": "la tortuga",
  "of": "de la tortuga",
  "bare": "tortuga"
 },
 "lizard": {
  "name": "Lagarto",
  "the": "el lagarto",
  "of": "del lagarto",
  "bare": "lagarto"
 },
 "frog": {
  "name": "Rana",
  "the": "la rana",
  "of": "de la rana",
  "bare": "rana"
 },
 "horseshoe_crab": {
  "name": "Cangrejo herradura",
  "the": "el cangrejo herradura",
  "of": "del cangrejo herradura",
  "bare": "cangrejo herradura"
 },
 "lobster": {
  "name": "Langosta",
  "the": "la langosta",
  "of": "de la langosta",
  "bare": "langosta"
 },
 "spider": {
  "name": "Araña",
  "the": "la araña",
  "of": "de la araña",
  "bare": "araña"
 },
 "crab": {
  "name": "Cangrejo",
  "the": "el cangrejo",
  "of": "del cangrejo",
  "bare": "cangrejo"
 },
 "falcon": {
  "name": "Halcón",
  "the": "el halcón",
  "of": "del halcón",
  "bare": "halcón"
 },
 "eagle": {
  "name": "Águila",
  "the": "el águila",
  "of": "del águila",
  "bare": "águila"
 },
 "parrot": {
  "name": "Loro",
  "the": "el loro",
  "of": "del loro",
  "bare": "loro"
 },
 "firefly": {
  "name": "Luciérnaga",
  "the": "la luciérnaga",
  "of": "de la luciérnaga",
  "bare": "luciérnaga"
 },
 "dragonfly": {
  "name": "Libélula",
  "the": "la libélula",
  "of": "de la libélula",
  "bare": "libélula"
 },
 "housefly": {
  "name": "Mosca",
  "the": "la mosca",
  "of": "de la mosca",
  "bare": "mosca"
 },
 "ladybird": {
  "name": "Mariquita",
  "the": "la mariquita",
  "of": "de la mariquita",
  "bare": "mariquita"
 },
 "anteater": {
  "name": "Oso hormiguero",
  "the": "el oso hormiguero",
  "of": "del oso hormiguero",
  "bare": "oso hormiguero"
 },
 "echidna": {
  "name": "Equidna",
  "the": "la equidna",
  "of": "de la equidna",
  "bare": "equidna"
 },
 "sloth": {
  "name": "Perezoso",
  "the": "el perezoso",
  "of": "del perezoso",
  "bare": "perezoso"
 },
 "pangolin": {
  "name": "Pangolín",
  "the": "el pangolín",
  "of": "del pangolín",
  "bare": "pangolín"
 },
 "centipede": {
  "name": "Ciempiés",
  "the": "el ciempiés",
  "of": "del ciempiés",
  "bare": "ciempiés"
 },
 "earthworm": {
  "name": "Lombriz de tierra",
  "the": "la lombriz de tierra",
  "of": "de la lombriz de tierra",
  "bare": "lombriz de tierra"
 },
 "millipede": {
  "name": "Milpiés",
  "the": "el milpiés",
  "of": "del milpiés",
  "bare": "milpiés"
 },
 "beetle": {
  "name": "Escarabajo",
  "the": "el escarabajo",
  "of": "del escarabajo",
  "bare": "escarabajo"
 },
 "aardvark": {
  "name": "Cerdo hormiguero",
  "the": "el cerdo hormiguero",
  "of": "del cerdo hormiguero",
  "bare": "cerdo hormiguero"
 },
 "kangaroo": {
  "name": "Canguro",
  "the": "el canguro",
  "of": "del canguro",
  "bare": "canguro"
 },
 "elephant": {
  "name": "Elefante",
  "the": "el elefante",
  "of": "del elefante",
  "bare": "elefante"
 },
 "triceratops": {
  "name": "Triceratops",
  "the": "el Triceratops",
  "of": "del Triceratops",
  "bare": "Triceratops"
 },
 "seal": {
  "name": "Foca",
  "the": "la foca",
  "of": "de la foca",
  "bare": "foca"
 },
 "walrus": {
  "name": "Morsa",
  "the": "la morsa",
  "of": "de la morsa",
  "bare": "morsa"
 },
 "octopus": {
  "name": "Pulpo",
  "the": "el pulpo",
  "of": "del pulpo",
  "bare": "pulpo"
 },
 "jellyfish": {
  "name": "Medusa",
  "the": "la medusa",
  "of": "de la medusa",
  "bare": "medusa"
 },
 "snail": {
  "name": "Caracol",
  "the": "el caracol",
  "of": "del caracol",
  "bare": "caracol"
 },
 "starfish": {
  "name": "Estrella de mar",
  "the": "la estrella de mar",
  "of": "de la estrella de mar",
  "bare": "estrella de mar"
 },
 "penguin": {
  "name": "Pingüino",
  "the": "el pingüino",
  "of": "del pingüino",
  "bare": "pingüino"
 },
 "puffin": {
  "name": "Frailecillo",
  "the": "el frailecillo",
  "of": "del frailecillo",
  "bare": "frailecillo"
 },
 "duck": {
  "name": "Pato",
  "the": "el pato",
  "of": "del pato",
  "bare": "pato"
 },
 "albatross": {
  "name": "Albatros",
  "the": "el albatros",
  "of": "del albatros",
  "bare": "albatros"
 },
 "meerkat": {
  "name": "Suricato",
  "the": "el suricato",
  "of": "del suricato",
  "bare": "suricato"
 },
 "prairie_dog": {
  "name": "Perro de las praderas",
  "the": "el perro de las praderas",
  "of": "del perro de las praderas",
  "bare": "perro de las praderas"
 },
 "bee": {
  "name": "Abeja",
  "the": "la abeja",
  "of": "de la abeja",
  "bare": "abeja"
 },
 "beaver": {
  "name": "Castor",
  "the": "el castor",
  "of": "del castor",
  "bare": "castor"
 },
 "otter": {
  "name": "Nutria",
  "the": "la nutria",
  "of": "de la nutria",
  "bare": "nutria"
 },
 "rabbit": {
  "name": "Conejo",
  "the": "el conejo",
  "of": "del conejo",
  "bare": "conejo"
 },
 "axolotl": {
  "name": "Ajolote",
  "the": "el ajolote",
  "of": "del ajolote",
  "bare": "ajolote"
 },
 "eel": {
  "name": "Anguila",
  "the": "la anguila",
  "of": "de la anguila",
  "bare": "anguila"
 },
 "camel": {
  "name": "Camello",
  "the": "el camello",
  "of": "del camello",
  "bare": "camello"
 },
 "llama": {
  "name": "Llama",
  "the": "la llama",
  "of": "de la llama",
  "bare": "llama"
 },
 "cow": {
  "name": "Vaca",
  "the": "la vaca",
  "of": "de la vaca",
  "bare": "vaca"
 },
 "seahorse": {
  "name": "Caballito de mar",
  "the": "el caballito de mar",
  "of": "del caballito de mar",
  "bare": "caballito de mar"
 },
 "squid": {
  "name": "Calamar",
  "the": "el calamar",
  "of": "del calamar",
  "bare": "calamar"
 },
 "toucan": {
  "name": "Tucán",
  "the": "el tucán",
  "of": "del tucán",
  "bare": "tucán"
 },
 "hornbill": {
  "name": "Cálao",
  "the": "el cálao",
  "of": "del cálao",
  "bare": "cálao"
 },
 "woodpecker": {
  "name": "Pájaro carpintero",
  "the": "el pájaro carpintero",
  "of": "del pájaro carpintero",
  "bare": "pájaro carpintero"
 },
 "porcupine": {
  "name": "Puercoespín",
  "the": "el puercoespín",
  "of": "del puercoespín",
  "bare": "puercoespín"
 },
 "hedgehog": {
  "name": "Erizo",
  "the": "el erizo",
  "of": "del erizo",
  "bare": "erizo"
 },
 "guinea_pig": {
  "name": "Cobaya",
  "the": "la cobaya",
  "of": "de la cobaya",
  "bare": "cobaya"
 },
 "mantis": {
  "name": "Mantis religiosa",
  "the": "la mantis religiosa",
  "of": "de la mantis religiosa",
  "bare": "mantis religiosa"
 },
 "grasshopper": {
  "name": "Saltamontes",
  "the": "el saltamontes",
  "of": "del saltamontes",
  "bare": "saltamontes"
 },
 "narwhal": {
  "name": "Narval",
  "the": "el narval",
  "of": "del narval",
  "bare": "narval"
 },
 "marlin": {
  "name": "Marlín",
  "the": "el marlín",
  "of": "del marlín",
  "bare": "marlín"
 },
 "beluga": {
  "name": "Beluga",
  "the": "la beluga",
  "of": "de la beluga",
  "bare": "beluga"
 },
 "velociraptor": {
  "name": "Velociraptor",
  "the": "el Velociraptor",
  "of": "del Velociraptor",
  "bare": "Velociraptor"
 },
 "orca": {
  "name": "Orca",
  "the": "la orca",
  "of": "de la orca",
  "bare": "orca"
 },
 "humpback": {
  "name": "Ballena jorobada",
  "the": "la ballena jorobada",
  "of": "de la ballena jorobada",
  "bare": "ballena jorobada"
 },
 "great_white": {
  "name": "Tiburón blanco",
  "the": "el tiburón blanco",
  "of": "del tiburón blanco",
  "bare": "tiburón blanco"
 },
 "flea": {
  "name": "Pulga",
  "the": "la pulga",
  "of": "de la pulga",
  "bare": "pulga"
 },
 "butterfly": {
  "name": "Mariposa",
  "the": "la mariposa",
  "of": "de la mariposa",
  "bare": "mariposa"
 },
 "louse": {
  "name": "Piojo",
  "the": "el piojo",
  "of": "del piojo",
  "bare": "piojo"
 },
 "armadillo": {
  "name": "Armadillo",
  "the": "el armadillo",
  "of": "del armadillo",
  "bare": "armadillo"
 },
 "barnacle": {
  "name": "Percebe",
  "the": "el percebe",
  "of": "del percebe",
  "bare": "percebe"
 },
 "mussel": {
  "name": "Mejillón",
  "the": "el mejillón",
  "of": "del mejillón",
  "bare": "mejillón"
 },
 "kiwi": {
  "name": "Kiwi",
  "the": "el kiwi",
  "of": "del kiwi",
  "bare": "kiwi"
 },
 "elephant_bird": {
  "name": "Ave elefante",
  "the": "el ave elefante",
  "of": "del ave elefante",
  "bare": "ave elefante"
 },
 "ostrich": {
  "name": "Avestruz",
  "the": "el avestruz",
  "of": "del avestruz",
  "bare": "avestruz"
 },
 "moa": {
  "name": "Moa",
  "the": "el moa",
  "of": "del moa",
  "bare": "moa"
 },
 "snake": {
  "name": "Serpiente",
  "the": "la serpiente",
  "of": "de la serpiente",
  "bare": "serpiente"
 },
 "iguana": {
  "name": "Iguana",
  "the": "la iguana",
  "of": "de la iguana",
  "bare": "iguana"
 },
 "deer": {
  "name": "Ciervo",
  "the": "el ciervo",
  "of": "del ciervo",
  "bare": "ciervo"
 },
 "scorpion": {
  "name": "Escorpión",
  "the": "el escorpión",
  "of": "del escorpión",
  "bare": "escorpión"
 },
 "weasel": {
  "name": "Comadreja",
  "the": "la comadreja",
  "of": "de la comadreja",
  "bare": "comadreja"
 },
 "stegosaurus": {
  "name": "Stegosaurus",
  "the": "el Stegosaurus",
  "of": "del Stegosaurus",
  "bare": "Stegosaurus"
 },
 "polar_bear": {
  "name": "Oso polar",
  "the": "el oso polar",
  "of": "del oso polar",
  "bare": "oso polar"
 },
 "sea_urchin": {
  "name": "Erizo de mar",
  "the": "el erizo de mar",
  "of": "del erizo de mar",
  "bare": "erizo de mar"
 },
 "swallow": {
  "name": "Golondrina",
  "the": "la golondrina",
  "of": "de la golondrina",
  "bare": "golondrina"
 },
 "sparrow": {
  "name": "Gorrión",
  "the": "el gorrión",
  "of": "del gorrión",
  "bare": "gorrión"
 },
 "swift": {
  "name": "Vencejo",
  "the": "el vencejo",
  "of": "del vencejo",
  "bare": "vencejo"
 },
 "tomato": {
  "name": "Tomate",
  "the": "el tomate",
  "of": "del tomate",
  "bare": "tomate"
 },
 "potato": {
  "name": "Papa",
  "the": "la papa",
  "of": "de la papa",
  "bare": "papa"
 },
 "chili": {
  "name": "Chile",
  "the": "el chile",
  "of": "del chile",
  "bare": "chile"
 },
 "capybara": {
  "name": "Capibara",
  "the": "el capibara",
  "of": "del capibara",
  "bare": "capibara"
 },
 "sugar_glider": {
  "name": "Petauro del azúcar",
  "the": "el petauro del azúcar",
  "of": "del petauro del azúcar",
  "bare": "petauro del azúcar"
 },
 "koala": {
  "name": "Koala",
  "the": "el koala",
  "of": "del koala",
  "bare": "koala"
 },
 "flying_squirrel": {
  "name": "Ardilla voladora",
  "the": "la ardilla voladora",
  "of": "de la ardilla voladora",
  "bare": "ardilla voladora"
 },
 "ichthyosaur": {
  "name": "Ictiosaurio",
  "the": "el ictiosaurio",
  "of": "del ictiosaurio",
  "bare": "ictiosaurio"
 },
 "thylacine": {
  "name": "Tigre de Tasmania",
  "the": "el tigre de Tasmania",
  "of": "del tigre de Tasmania",
  "bare": "tigre de Tasmania"
 },
 "platypus": {
  "name": "Ornitorrinco",
  "the": "el ornitorrinco",
  "of": "del ornitorrinco",
  "bare": "ornitorrinco"
 },
 "wolf": {
  "name": "Lobo",
  "the": "el lobo",
  "of": "del lobo",
  "bare": "lobo"
 },
 "whale_shark": {
  "name": "Tiburón ballena",
  "the": "el tiburón ballena",
  "of": "del tiburón ballena",
  "bare": "tiburón ballena"
 },
 "crane": {
  "name": "Grulla",
  "the": "la grulla",
  "of": "de la grulla",
  "bare": "grulla"
 },
 "emu": {
  "name": "Emú",
  "the": "el emú",
  "of": "del emú",
  "bare": "emú"
 },
 "tapir": {
  "name": "Tapir",
  "the": "el tapir",
  "of": "del tapir",
  "bare": "tapir"
 },
 "tick": {
  "name": "Garrapata",
  "the": "la garrapata",
  "of": "de la garrapata",
  "bare": "garrapata"
 },
 "mammoth": {
  "name": "Mamut",
  "the": "el mamut",
  "of": "del mamut",
  "bare": "mamut"
 },
 "african_elephant": {
  "name": "Elefante africano",
  "the": "el elefante africano",
  "of": "del elefante africano",
  "bare": "elefante africano"
 },
 "mastodon": {
  "name": "Mastodonte",
  "the": "el mastodonte",
  "of": "del mastodonte",
  "bare": "mastodonte"
 },
 "asian_elephant": {
  "name": "Elefante asiático",
  "the": "el elefante asiático",
  "of": "del elefante asiático",
  "bare": "elefante asiático"
 },
 "dimetrodon": {
  "name": "Dimetrodon",
  "the": "el Dimetrodon",
  "of": "del Dimetrodon",
  "bare": "Dimetrodon"
 },
 "woodlouse": {
  "name": "Cochinilla de la humedad",
  "the": "la cochinilla de la humedad",
  "of": "de la cochinilla de la humedad",
  "bare": "cochinilla de la humedad"
 },
 "shrimp": {
  "name": "Camarón",
  "the": "el camarón",
  "of": "del camarón",
  "bare": "camarón"
 },
 "orangutan": {
  "name": "Orangután",
  "the": "el orangután",
  "of": "del orangután",
  "bare": "orangután"
 },
 "gorilla": {
  "name": "Gorila",
  "the": "el gorila",
  "of": "del gorila",
  "bare": "gorila"
 },
 "chimp": {
  "name": "Chimpancé",
  "the": "el chimpancé",
  "of": "del chimpancé",
  "bare": "chimpancé"
 },
 "lamprey": {
  "name": "Lamprea",
  "the": "la lamprea",
  "of": "de la lamprea",
  "bare": "lamprea"
 },
 "salmon": {
  "name": "Salmón",
  "the": "el salmón",
  "of": "del salmón",
  "bare": "salmón"
 },
 "coot": {
  "name": "Focha",
  "the": "la focha",
  "of": "de la focha",
  "bare": "focha"
 },
 "salamander": {
  "name": "Salamandra",
  "the": "la salamandra",
  "of": "de la salamandra",
  "bare": "salamandra"
 },
 "wombat": {
  "name": "Wombat",
  "the": "el wombat",
  "of": "del wombat",
  "bare": "wombat"
 },
 "moth": {
  "name": "Polilla",
  "the": "la polilla",
  "of": "de la polilla",
  "bare": "polilla"
 },
 "zebra": {
  "name": "Cebra",
  "the": "la cebra",
  "of": "de la cebra",
  "bare": "cebra"
 },
 "sponge": {
  "name": "Esponja",
  "the": "la esponja",
  "of": "de la esponja",
  "bare": "esponja"
 },
 "coral": {
  "name": "Coral",
  "the": "el coral",
  "of": "del coral",
  "bare": "coral"
 },
 "hummingbird": {
  "name": "Colibrí",
  "the": "el colibrí",
  "of": "del colibrí",
  "bare": "colibrí"
 },
 "hyrax": {
  "name": "Damán",
  "the": "el damán",
  "of": "del damán",
  "bare": "damán"
 },
 "slug": {
  "name": "Babosa",
  "the": "la babosa",
  "of": "de la babosa",
  "bare": "babosa"
 },
 "lungfish": {
  "name": "Pez pulmonado",
  "the": "el pez pulmonado",
  "of": "del pez pulmonado",
  "bare": "pez pulmonado"
 },
 "shrew": {
  "name": "Musaraña",
  "the": "la musaraña",
  "of": "de la musaraña",
  "bare": "musaraña"
 },
 "dodo": {
  "name": "Dodo",
  "the": "el dodo",
  "of": "del dodo",
  "bare": "dodo"
 },
 "turkey": {
  "name": "Pavo",
  "the": "el pavo",
  "of": "del pavo",
  "bare": "pavo"
 },
 "pigeon": {
  "name": "Paloma",
  "the": "la paloma",
  "of": "de la paloma",
  "bare": "paloma"
 },
 "manatee": {
  "name": "Manatí",
  "the": "el manatí",
  "of": "del manatí",
  "bare": "manatí"
 },
 "pterodactyl": {
  "name": "Pterodáctilo",
  "the": "el pterodáctilo",
  "of": "del pterodáctilo",
  "bare": "pterodáctilo"
 },
 "leech": {
  "name": "Sanguijuela",
  "the": "la sanguijuela",
  "of": "de la sanguijuela",
  "bare": "sanguijuela"
 },
 "apple": {
  "name": "Manzana",
  "the": "la manzana",
  "of": "de la manzana",
  "bare": "manzana"
 }
};
