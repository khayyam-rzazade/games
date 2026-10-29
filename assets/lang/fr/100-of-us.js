/* Logicers: the fr words of 100-of-us, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-100-of-us-fr.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "live-india": {
  "q": "Sur 100 personnes dans le monde, combien vivent en Inde ?",
  "sentence": "Aucun pays n’a plus d’habitants.",
  "stamp": "vivent en Inde"
 },
 "live-high-income": {
  "q": "Sur 100 personnes dans le monde, combien vivent dans un pays à revenu élevé ?",
  "sentence": "« Revenu élevé » est le groupe des pays les plus riches selon la Banque mondiale.",
  "stamp": "vivent dans un pays à revenu élevé"
 },
 "live-africa": {
  "q": "Sur 100 personnes dans le monde, combien vivent en Afrique ?",
  "sentence": "C’est tout le continent, du Maroc à l’Afrique du Sud.",
  "stamp": "vivent en Afrique"
 },
 "live-eu": {
  "q": "Sur 100 personnes dans le monde, combien vivent dans l’Union européenne ?",
  "sentence": "Ce sont les 27 pays membres réunis.",
  "stamp": "vivent dans l’Union européenne"
 },
 "live-asia": {
  "q": "Sur 100 personnes dans le monde, combien vivent en Asie ?",
  "sentence": "Plus de gens vivent en Asie que sur tous les autres continents réunis.",
  "stamp": "vivent en Asie"
 },
 "live-india-china": {
  "q": "Sur 100 personnes dans le monde, combien vivent en Inde ou en Chine ?",
  "sentence": "Plus d’une personne sur trois vit dans ces deux pays seulement.",
  "stamp": "vivent en Inde ou en Chine"
 },
 "live-americas": {
  "q": "Sur 100 personnes dans le monde, combien vivent dans les Amériques ?",
  "sentence": "C’est l’Amérique du Nord, centrale et du Sud, avec les Caraïbes.",
  "stamp": "vivent dans les Amériques"
 },
 "live-low-income": {
  "q": "Sur 100 personnes dans le monde, combien vivent dans un pays à faible revenu ?",
  "sentence": "« Faible revenu » est le groupe des pays les moins riches selon la Banque mondiale.",
  "stamp": "vivent dans un pays à faible revenu"
 },
 "live-europe": {
  "q": "Sur 100 personnes dans le monde, combien vivent en Europe ?",
  "sentence": "La Russie est comptée ici comme faisant partie de l’Europe.",
  "stamp": "vivent en Europe"
 },
 "live-china": {
  "q": "Sur 100 personnes dans le monde, combien vivent en Chine ?",
  "sentence": "Seule l’Inde compte plus d’habitants.",
  "stamp": "vivent en Chine"
 },
 "live-middle-income": {
  "q": "Sur 100 personnes dans le monde, combien vivent dans un pays à revenu intermédiaire ?",
  "sentence": "La plupart des gens vivent dans des pays qui ne sont ni riches ni pauvres.",
  "stamp": "vivent dans un pays à revenu intermédiaire"
 },
 "live-ten-biggest": {
  "q": "Sur 100 personnes dans le monde, combien vivent dans les dix pays les plus peuplés ?",
  "sentence": "Les 43 autres sont répartis dans plus de 200 pays et territoires.",
  "stamp": "vivent dans les dix pays les plus peuplés"
 },
 "home-electricity": {
  "q": "Sur 100 personnes dans le monde, combien ont l’électricité à la maison ?",
  "sentence": "Donc environ 8 sur 100 vivent encore sans électricité.",
  "stamp": "ont l’électricité à la maison"
 },
 "people-children": {
  "q": "Sur 100 personnes dans le monde, combien sont des enfants de moins de 15 ans ?",
  "sentence": "On compte tout le monde, des nouveau-nés aux jeunes de 14 ans.",
  "stamp": "sont des enfants de moins de 15 ans"
 },
 "home-internet": {
  "q": "Sur 100 personnes dans le monde, combien utilisent Internet ?",
  "sentence": "Les 26 autres n’ont pas utilisé Internet au cours des trois derniers mois.",
  "stamp": "utilisent Internet"
 },
 "work-farming": {
  "q": "Sur 100 personnes qui travaillent dans le monde, combien travaillent dans l’agriculture ?",
  "sentence": "Ici, l’agriculture comprend aussi la sylviculture et la pêche.",
  "stamp": "travaillent dans l’agriculture"
 },
 "school-read": {
  "q": "Sur 100 adultes dans le monde, combien savent lire et écrire ?",
  "sentence": "Ici, « adultes » veut dire toutes les personnes de 15 ans ou plus.",
  "stamp": "adultes savent lire et écrire"
 },
 "people-parliament": {
  "q": "Sur 100 parlementaires dans le monde, combien sont des femmes ?",
  "sentence": "Donc les hommes occupent environ 73 sièges sur 100.",
  "stamp": "parlementaires sont des femmes"
 },
 "home-city": {
  "q": "Sur 100 personnes dans le monde, combien vivent en ville ?",
  "sentence": "Les 42 autres vivent à la campagne.",
  "stamp": "vivent en ville"
 },
 "health-measles": {
  "q": "Sur 100 enfants d’un an dans le monde, combien sont vaccinés contre la rougeole ?",
  "sentence": "Donc environ 16 sur 100 commencent la vie sans cette protection.",
  "stamp": "enfants d’un an sont vaccinés contre la rougeole"
 },
 "home-water": {
  "q": "Sur 100 personnes dans le monde, combien ont de l’eau potable sûre à la maison ?",
  "sentence": "« Sûre » veut dire : à la maison, disponible quand on en a besoin, et sans contamination.",
  "stamp": "ont de l’eau potable sûre à la maison"
 },
 "money-poverty": {
  "q": "Sur 100 personnes dans le monde, combien vivent avec moins de 3 dollars par jour ?",
  "sentence": "Les 3 dollars sont ajustés selon ce que l’argent permet d’acheter dans chaque pays.",
  "stamp": "vivent avec moins de 3 dollars par jour"
 },
 "people-65": {
  "q": "Sur 100 personnes dans le monde, combien ont 65 ans ou plus ?",
  "sentence": "Les 90 autres ont moins de 65 ans.",
  "stamp": "ont 65 ans ou plus"
 },
 "work-women": {
  "q": "Sur 100 personnes actives dans le monde, combien sont des femmes ?",
  "sentence": "La population active compte toutes les personnes qui ont un emploi ou en cherchent un.",
  "stamp": "personnes actives sont des femmes"
 },
 "home-toilet": {
  "q": "Sur 100 personnes dans le monde, combien ont des toilettes sûres à la maison ?",
  "sentence": "« Sûres » veut dire des toilettes qui ne sont pas partagées avec d’autres logements, et dont les déchets sont évacués ou traités sans danger.",
  "stamp": "ont des toilettes sûres à la maison"
 },
 "money-account": {
  "q": "Sur 100 adultes dans le monde, combien ont un compte en banque ou un compte d’argent mobile ?",
  "sentence": "Un compte d’argent mobile se trouve sur un téléphone, sans besoin d’agence bancaire.",
  "stamp": "adultes ont un compte en banque ou d’argent mobile"
 },
 "health-hunger": {
  "q": "Sur 100 personnes dans le monde, combien n’ont pas assez à manger ?",
  "sentence": "« Pas assez » veut dire trop peu de calories pour mener une vie normale et active.",
  "stamp": "n’ont pas assez à manger"
 },
 "work-services": {
  "q": "Sur 100 personnes qui travaillent dans le monde, combien sont dans les services, comme les magasins, les écoles et les bureaux ?",
  "sentence": "Les services couvrent le commerce, les transports, les hôtels, l’enseignement, la santé et le travail de bureau.",
  "stamp": "sont dans les services"
 },
 "home-cooking": {
  "q": "Sur 100 personnes dans le monde, combien cuisinent avec un combustible propre, comme le gaz ou l’électricité ?",
  "sentence": "Les 26 autres cuisinent avec des combustibles comme le bois, le charbon de bois ou le charbon.",
  "stamp": "cuisinent avec un combustible propre"
 },
 "people-women": {
  "q": "Sur 100 personnes dans le monde, combien sont des femmes ou des filles ?",
  "sentence": "Donc environ 50 sont des hommes ou des garçons.",
  "stamp": "sont des femmes ou des filles"
 },
 "health-births": {
  "q": "Sur 100 naissances dans le monde, combien sont assistées par du personnel de santé qualifié ?",
  "sentence": "« Qualifié » veut dire un médecin, une sage-femme ou du personnel infirmier.",
  "stamp": "naissances assistées par du personnel qualifié"
 },
 "work-industry": {
  "q": "Sur 100 personnes qui travaillent dans le monde, combien sont dans l’industrie, comme les usines et la construction ?",
  "sentence": "L’industrie, c’est les mines, les usines, la construction, ainsi que la production d’énergie et d’eau.",
  "stamp": "sont dans l’industrie"
 },
 "home-slum": {
  "q": "Sur 100 personnes qui vivent dans les villes du monde, combien vivent dans un bidonville ?",
  "sentence": "Un logement de bidonville manque d’au moins une chose de base, comme l’eau propre, des toilettes, assez de place ou des murs solides.",
  "stamp": "citadins vivent en bidonville"
 },
 "health-tobacco": {
  "q": "Sur 100 adultes dans le monde, combien consomment du tabac ?",
  "sentence": "Ici, « adultes » veut dire toutes les personnes de 15 ans ou plus. Le tabac, ce n’est pas seulement les cigarettes.",
  "stamp": "adultes consomment du tabac"
 },
 "work-self": {
  "q": "Sur 100 personnes qui travaillent dans le monde, combien travaillent à leur compte ?",
  "sentence": "Cela comprend les personnes qui aident dans un commerce ou une ferme de famille sans être payées.",
  "stamp": "travaillent à leur compte"
 },
 "people-parliament-fra": {
  "q": "Sur 100 parlementaires en France, combien sont des femmes ?",
  "sentence": "Donc les hommes occupent environ 64 sièges sur 100 dans sa chambre basse ou unique.",
  "stamp": "parlementaires en France sont des femmes"
 },
 "home-internet-bra": {
  "q": "Sur 100 personnes au Brésil, combien utilisent Internet ?",
  "sentence": "Les 16 autres n’ont pas utilisé Internet au cours des trois derniers mois.",
  "stamp": "au Brésil utilisent Internet"
 },
 "people-65-rus": {
  "q": "Sur 100 personnes en Russie, combien ont 65 ans ou plus ?",
  "sentence": "Les 82 autres ont moins de 65 ans.",
  "stamp": "en Russie ont 65 ans ou plus"
 },
 "home-city-jpn": {
  "q": "Sur 100 personnes au Japon, combien vivent en ville ?",
  "sentence": "Les 8 autres vivent à la campagne.",
  "stamp": "au Japon vivent en ville"
 },
 "money-account-tur": {
  "q": "Sur 100 adultes en Turquie, combien ont un compte en banque ou un compte d’argent mobile ?",
  "sentence": "Un compte d’argent mobile se trouve sur un téléphone, sans besoin d’agence bancaire.",
  "stamp": "adultes en Turquie ont un compte en banque ou d’argent mobile"
 },
 "people-children-ken": {
  "q": "Sur 100 personnes au Kenya, combien sont des enfants de moins de 15 ans ?",
  "sentence": "On compte tout le monde, des nouveau-nés aux jeunes de 14 ans.",
  "stamp": "au Kenya sont des enfants de moins de 15 ans"
 },
 "work-farming-chn": {
  "q": "Sur 100 personnes qui travaillent en Chine, combien travaillent dans l’agriculture ?",
  "sentence": "Ici, l’agriculture comprend aussi la sylviculture et la pêche.",
  "stamp": "travaillent dans l’agriculture en Chine"
 },
 "home-cooking-ind": {
  "q": "Sur 100 personnes en Inde, combien cuisinent avec un combustible propre, comme le gaz ou l’électricité ?",
  "sentence": "Les 23 autres cuisinent avec des combustibles comme le bois, le charbon de bois ou le charbon.",
  "stamp": "en Inde cuisinent avec un combustible propre"
 },
 "health-measles-phl": {
  "q": "Sur 100 enfants d’un an aux Philippines, combien sont vaccinés contre la rougeole ?",
  "sentence": "Donc environ 20 sur 100 commencent la vie sans cette protection.",
  "stamp": "enfants d’un an aux Philippines sont vaccinés contre la rougeole"
 },
 "home-electricity-uga": {
  "q": "Sur 100 personnes en Ouganda, combien ont l’électricité à la maison ?",
  "sentence": "Donc environ 45 sur 100 vivent encore sans électricité.",
  "stamp": "en Ouganda ont l’électricité à la maison"
 },
 "school-read-bgd": {
  "q": "Sur 100 adultes au Bangladesh, combien savent lire et écrire ?",
  "sentence": "Ici, « adultes » veut dire toutes les personnes de 15 ans ou plus.",
  "stamp": "adultes au Bangladesh savent lire et écrire"
 },
 "work-women-jpn": {
  "q": "Sur 100 personnes actives au Japon, combien sont des femmes ?",
  "sentence": "La population active compte toutes les personnes qui ont un emploi ou en cherchent un.",
  "stamp": "personnes actives au Japon sont des femmes"
 },
 "home-water-eth": {
  "q": "Sur 100 personnes en Éthiopie, combien ont de l’eau potable sûre à la maison ?",
  "sentence": "« Sûre » veut dire : à la maison, disponible quand on en a besoin, et sans contamination.",
  "stamp": "en Éthiopie ont de l’eau potable sûre à la maison"
 },
 "people-parliament-bra": {
  "q": "Sur 100 parlementaires au Brésil, combien sont des femmes ?",
  "sentence": "Donc les hommes occupent environ 82 sièges sur 100 dans sa chambre basse ou unique.",
  "stamp": "parlementaires au Brésil sont des femmes"
 },
 "home-toilet-chn": {
  "q": "Sur 100 personnes en Chine, combien ont des toilettes sûres à la maison ?",
  "sentence": "« Sûres » veut dire des toilettes qui ne sont pas partagées avec d’autres logements, et dont les déchets sont évacués ou traités sans danger.",
  "stamp": "en Chine ont des toilettes sûres à la maison"
 },
 "money-account-ken": {
  "q": "Sur 100 adultes au Kenya, combien ont un compte en banque ou un compte d’argent mobile ?",
  "sentence": "Un compte d’argent mobile se trouve sur un téléphone, sans besoin d’agence bancaire.",
  "stamp": "adultes au Kenya ont un compte en banque ou d’argent mobile"
 },
 "home-internet-egy": {
  "q": "Sur 100 personnes en Égypte, combien utilisent Internet ?",
  "sentence": "Les 25 autres n’ont pas utilisé Internet au cours des trois derniers mois.",
  "stamp": "en Égypte utilisent Internet"
 },
 "people-65-can": {
  "q": "Sur 100 personnes au Canada, combien ont 65 ans ou plus ?",
  "sentence": "Les 80 autres ont moins de 65 ans.",
  "stamp": "au Canada ont 65 ans ou plus"
 },
 "home-city-vnm": {
  "q": "Sur 100 personnes au Vietnam, combien vivent en ville ?",
  "sentence": "Les 61 autres vivent à la campagne.",
  "stamp": "au Vietnam vivent en ville"
 },
 "work-farming-idn": {
  "q": "Sur 100 personnes qui travaillent en Indonésie, combien travaillent dans l’agriculture ?",
  "sentence": "Ici, l’agriculture comprend aussi la sylviculture et la pêche.",
  "stamp": "travaillent dans l’agriculture en Indonésie"
 },
 "people-children-bra": {
  "q": "Sur 100 personnes au Brésil, combien sont des enfants de moins de 15 ans ?",
  "sentence": "On compte tout le monde, des nouveau-nés aux jeunes de 14 ans.",
  "stamp": "au Brésil sont des enfants de moins de 15 ans"
 },
 "home-cooking-ken": {
  "q": "Sur 100 personnes au Kenya, combien cuisinent avec un combustible propre, comme le gaz ou l’électricité ?",
  "sentence": "Les 68 autres cuisinent avec des combustibles comme le bois, le charbon de bois ou le charbon.",
  "stamp": "au Kenya cuisinent avec un combustible propre"
 },
 "people-parliament-jpn": {
  "q": "Sur 100 parlementaires au Japon, combien sont des femmes ?",
  "sentence": "Donc les hommes occupent environ 84 sièges sur 100 dans sa chambre basse ou unique.",
  "stamp": "parlementaires au Japon sont des femmes"
 },
 "home-electricity-nga": {
  "q": "Sur 100 personnes au Nigeria, combien ont l’électricité à la maison ?",
  "sentence": "Donc environ 37 sur 100 vivent encore sans électricité.",
  "stamp": "au Nigeria ont l’électricité à la maison"
 },
 "health-measles-afg": {
  "q": "Sur 100 enfants d’un an en Afghanistan, combien sont vaccinés contre la rougeole ?",
  "sentence": "Donc environ 45 sur 100 commencent la vie sans cette protection.",
  "stamp": "enfants d’un an en Afghanistan sont vaccinés contre la rougeole"
 },
 "home-internet-mex": {
  "q": "Sur 100 personnes au Mexique, combien utilisent Internet ?",
  "sentence": "Les 17 autres n’ont pas utilisé Internet au cours des trois derniers mois.",
  "stamp": "au Mexique utilisent Internet"
 },
 "people-65-usa": {
  "q": "Sur 100 personnes aux États-Unis, combien ont 65 ans ou plus ?",
  "sentence": "Les 82 autres ont moins de 65 ans.",
  "stamp": "aux États-Unis ont 65 ans ou plus"
 },
 "money-account-ind": {
  "q": "Sur 100 adultes en Inde, combien ont un compte en banque ou un compte d’argent mobile ?",
  "sentence": "Un compte d’argent mobile se trouve sur un téléphone, sans besoin d’agence bancaire.",
  "stamp": "adultes en Inde ont un compte en banque ou d’argent mobile"
 },
 "home-city-bgd": {
  "q": "Sur 100 personnes au Bangladesh, combien vivent en ville ?",
  "sentence": "Les 67 autres vivent à la campagne.",
  "stamp": "au Bangladesh vivent en ville"
 },
 "work-farming-bra": {
  "q": "Sur 100 personnes qui travaillent au Brésil, combien travaillent dans l’agriculture ?",
  "sentence": "Ici, l’agriculture comprend aussi la sylviculture et la pêche.",
  "stamp": "travaillent dans l’agriculture au Brésil"
 },
 "home-water-pak": {
  "q": "Sur 100 personnes au Pakistan, combien ont de l’eau potable sûre à la maison ?",
  "sentence": "« Sûre » veut dire : à la maison, disponible quand on en a besoin, et sans contamination.",
  "stamp": "au Pakistan ont de l’eau potable sûre à la maison"
 },
 "people-parliament-gbr": {
  "q": "Sur 100 parlementaires au Royaume-Uni, combien sont des femmes ?",
  "sentence": "Donc les hommes occupent environ 60 sièges sur 100 dans sa chambre basse ou unique.",
  "stamp": "parlementaires au Royaume-Uni sont des femmes"
 },
 "home-cooking-nga": {
  "q": "Sur 100 personnes au Nigeria, combien cuisinent avec un combustible propre, comme le gaz ou l’électricité ?",
  "sentence": "Les 74 autres cuisinent avec des combustibles comme le bois, le charbon de bois ou le charbon.",
  "stamp": "au Nigeria cuisinent avec un combustible propre"
 },
 "people-children-deu": {
  "q": "Sur 100 personnes en Allemagne, combien sont des enfants de moins de 15 ans ?",
  "sentence": "On compte tout le monde, des nouveau-nés aux jeunes de 14 ans.",
  "stamp": "en Allemagne sont des enfants de moins de 15 ans"
 },
 "home-electricity-eth": {
  "q": "Sur 100 personnes en Éthiopie, combien ont l’électricité à la maison ?",
  "sentence": "Donc environ 43 sur 100 vivent encore sans électricité.",
  "stamp": "en Éthiopie ont l’électricité à la maison"
 },
 "people-65-chn": {
  "q": "Sur 100 personnes en Chine, combien ont 65 ans ou plus ?",
  "sentence": "Les 85 autres ont moins de 65 ans.",
  "stamp": "en Chine ont 65 ans ou plus"
 },
 "home-internet-zaf": {
  "q": "Sur 100 personnes en Afrique du Sud, combien utilisent Internet ?",
  "sentence": "Les 22 autres n’ont pas utilisé Internet au cours des trois derniers mois.",
  "stamp": "en Afrique du Sud utilisent Internet"
 },
 "school-read-ind": {
  "q": "Sur 100 adultes en Inde, combien savent lire et écrire ?",
  "sentence": "Ici, « adultes » veut dire toutes les personnes de 15 ans ou plus.",
  "stamp": "adultes en Inde savent lire et écrire"
 },
 "money-account-bra": {
  "q": "Sur 100 adultes au Brésil, combien ont un compte en banque ou un compte d’argent mobile ?",
  "sentence": "Un compte d’argent mobile se trouve sur un téléphone, sans besoin d’agence bancaire.",
  "stamp": "adultes au Brésil ont un compte en banque ou d’argent mobile"
 },
 "home-city-ken": {
  "q": "Sur 100 personnes au Kenya, combien vivent en ville ?",
  "sentence": "Les 68 autres vivent à la campagne.",
  "stamp": "au Kenya vivent en ville"
 },
 "work-farming-vnm": {
  "q": "Sur 100 personnes qui travaillent au Vietnam, combien travaillent dans l’agriculture ?",
  "sentence": "Ici, l’agriculture comprend aussi la sylviculture et la pêche.",
  "stamp": "travaillent dans l’agriculture au Vietnam"
 },
 "people-parliament-ind": {
  "q": "Sur 100 parlementaires en Inde, combien sont des femmes ?",
  "sentence": "Donc les hommes occupent environ 86 sièges sur 100 dans sa chambre basse ou unique.",
  "stamp": "parlementaires en Inde sont des femmes"
 },
 "health-measles-mdg": {
  "q": "Sur 100 enfants d’un an à Madagascar, combien sont vaccinés contre la rougeole ?",
  "sentence": "Donc environ 54 sur 100 commencent la vie sans cette protection.",
  "stamp": "enfants d’un an à Madagascar sont vaccinés contre la rougeole"
 },
 "home-toilet-bra": {
  "q": "Sur 100 personnes au Brésil, combien ont des toilettes sûres à la maison ?",
  "sentence": "« Sûres » veut dire des toilettes qui ne sont pas partagées avec d’autres logements, et dont les déchets sont évacués ou traités sans danger.",
  "stamp": "au Brésil ont des toilettes sûres à la maison"
 },
 "people-65-jpn": {
  "q": "Sur 100 personnes au Japon, combien ont 65 ans ou plus ?",
  "sentence": "Les 70 autres ont moins de 65 ans.",
  "stamp": "au Japon ont 65 ans ou plus"
 },
 "home-cooking-phl": {
  "q": "Sur 100 personnes aux Philippines, combien cuisinent avec un combustible propre, comme le gaz ou l’électricité ?",
  "sentence": "Les 40 autres cuisinent avec des combustibles comme le bois, le charbon de bois ou le charbon.",
  "stamp": "aux Philippines cuisinent avec un combustible propre"
 },
 "people-children-ind": {
  "q": "Sur 100 personnes en Inde, combien sont des enfants de moins de 15 ans ?",
  "sentence": "On compte tout le monde, des nouveau-nés aux jeunes de 14 ans.",
  "stamp": "en Inde sont des enfants de moins de 15 ans"
 },
 "home-internet-idn": {
  "q": "Sur 100 personnes en Indonésie, combien utilisent Internet ?",
  "sentence": "Les 27 autres n’ont pas utilisé Internet au cours des trois derniers mois.",
  "stamp": "en Indonésie utilisent Internet"
 },
 "work-women-egy": {
  "q": "Sur 100 personnes actives en Égypte, combien sont des femmes ?",
  "sentence": "La population active compte toutes les personnes qui ont un emploi ou en cherchent un.",
  "stamp": "personnes actives en Égypte sont des femmes"
 },
 "home-electricity-mdg": {
  "q": "Sur 100 personnes à Madagascar, combien ont l’électricité à la maison ?",
  "sentence": "Donc environ 57 sur 100 vivent encore sans électricité.",
  "stamp": "à Madagascar ont l’électricité à la maison"
 },
 "people-parliament-can": {
  "q": "Sur 100 parlementaires au Canada, combien sont des femmes ?",
  "sentence": "Donc les hommes occupent environ 70 sièges sur 100 dans sa chambre basse ou unique.",
  "stamp": "parlementaires au Canada sont des femmes"
 },
 "home-city-nga": {
  "q": "Sur 100 personnes au Nigeria, combien vivent en ville ?",
  "sentence": "Les 36 autres vivent à la campagne.",
  "stamp": "au Nigeria vivent en ville"
 },
 "work-farming-eth": {
  "q": "Sur 100 personnes qui travaillent en Éthiopie, combien travaillent dans l’agriculture ?",
  "sentence": "Ici, l’agriculture comprend aussi la sylviculture et la pêche.",
  "stamp": "travaillent dans l’agriculture en Éthiopie"
 },
 "home-water-bgd": {
  "q": "Sur 100 personnes au Bangladesh, combien ont de l’eau potable sûre à la maison ?",
  "sentence": "« Sûre » veut dire : à la maison, disponible quand on en a besoin, et sans contamination.",
  "stamp": "au Bangladesh ont de l’eau potable sûre à la maison"
 },
 "people-65-bra": {
  "q": "Sur 100 personnes au Brésil, combien ont 65 ans ou plus ?",
  "sentence": "Les 89 autres ont moins de 65 ans.",
  "stamp": "au Brésil ont 65 ans ou plus"
 },
 "money-account-pak": {
  "q": "Sur 100 adultes au Pakistan, combien ont un compte en banque ou un compte d’argent mobile ?",
  "sentence": "Un compte d’argent mobile se trouve sur un téléphone, sans besoin d’agence bancaire.",
  "stamp": "adultes au Pakistan ont un compte en banque ou d’argent mobile"
 },
 "home-internet-ind": {
  "q": "Sur 100 personnes en Inde, combien utilisent Internet ?",
  "sentence": "Les 30 autres n’ont pas utilisé Internet au cours des trois derniers mois.",
  "stamp": "en Inde utilisent Internet"
 },
 "people-children-eth": {
  "q": "Sur 100 personnes en Éthiopie, combien sont des enfants de moins de 15 ans ?",
  "sentence": "On compte tout le monde, des nouveau-nés aux jeunes de 14 ans.",
  "stamp": "en Éthiopie sont des enfants de moins de 15 ans"
 },
 "home-cooking-bgd": {
  "q": "Sur 100 personnes au Bangladesh, combien cuisinent avec un combustible propre, comme le gaz ou l’électricité ?",
  "sentence": "Les 72 autres cuisinent avec des combustibles comme le bois, le charbon de bois ou le charbon.",
  "stamp": "au Bangladesh cuisinent avec un combustible propre"
 },
 "health-measles-pak": {
  "q": "Sur 100 enfants d’un an au Pakistan, combien sont vaccinés contre la rougeole ?",
  "sentence": "Donc environ 14 sur 100 commencent la vie sans cette protection.",
  "stamp": "enfants d’un an au Pakistan sont vaccinés contre la rougeole"
 },
 "home-electricity-mmr": {
  "q": "Sur 100 personnes en Birmanie, combien ont l’électricité à la maison ?",
  "sentence": "Donc environ 20 sur 100 vivent encore sans électricité.",
  "stamp": "en Birmanie ont l’électricité à la maison"
 },
 "people-parliament-nzl": {
  "q": "Sur 100 parlementaires en Nouvelle-Zélande, combien sont des femmes ?",
  "sentence": "Donc les hommes occupent environ 54 sièges sur 100 dans sa chambre basse ou unique.",
  "stamp": "parlementaires en Nouvelle-Zélande sont des femmes"
 },
 "home-city-egy": {
  "q": "Sur 100 personnes en Égypte, combien vivent en ville ?",
  "sentence": "Les 57 autres vivent à la campagne.",
  "stamp": "en Égypte vivent en ville"
 },
 "people-65-ind": {
  "q": "Sur 100 personnes en Inde, combien ont 65 ans ou plus ?",
  "sentence": "Les 93 autres ont moins de 65 ans.",
  "stamp": "en Inde ont 65 ans ou plus"
 },
 "work-farming-ken": {
  "q": "Sur 100 personnes qui travaillent au Kenya, combien travaillent dans l’agriculture ?",
  "sentence": "Ici, l’agriculture comprend aussi la sylviculture et la pêche.",
  "stamp": "travaillent dans l’agriculture au Kenya"
 },
 "school-read-pak": {
  "q": "Sur 100 adultes au Pakistan, combien savent lire et écrire ?",
  "sentence": "Ici, « adultes » veut dire toutes les personnes de 15 ans ou plus.",
  "stamp": "adultes au Pakistan savent lire et écrire"
 },
 "home-internet-vnm": {
  "q": "Sur 100 personnes au Vietnam, combien utilisent Internet ?",
  "sentence": "Les 16 autres n’ont pas utilisé Internet au cours des trois derniers mois.",
  "stamp": "au Vietnam utilisent Internet"
 },
 "money-account-nga": {
  "q": "Sur 100 adultes au Nigeria, combien ont un compte en banque ou un compte d’argent mobile ?",
  "sentence": "Un compte d’argent mobile se trouve sur un téléphone, sans besoin d’agence bancaire.",
  "stamp": "adultes au Nigeria ont un compte en banque ou d’argent mobile"
 },
 "home-water-mex": {
  "q": "Sur 100 personnes au Mexique, combien ont de l’eau potable sûre à la maison ?",
  "sentence": "« Sûre » veut dire : à la maison, disponible quand on en a besoin, et sans contamination.",
  "stamp": "au Mexique ont de l’eau potable sûre à la maison"
 },
 "people-children-chn": {
  "q": "Sur 100 personnes en Chine, combien sont des enfants de moins de 15 ans ?",
  "sentence": "On compte tout le monde, des nouveau-nés aux jeunes de 14 ans.",
  "stamp": "en Chine sont des enfants de moins de 15 ans"
 },
 "home-cooking-mmr": {
  "q": "Sur 100 personnes en Birmanie, combien cuisinent avec un combustible propre, comme le gaz ou l’électricité ?",
  "sentence": "Les 46 autres cuisinent avec des combustibles comme le bois, le charbon de bois ou le charbon.",
  "stamp": "en Birmanie cuisinent avec un combustible propre"
 },
 "people-parliament-esp": {
  "q": "Sur 100 parlementaires en Espagne, combien sont des femmes ?",
  "sentence": "Donc les hommes occupent environ 56 sièges sur 100 dans sa chambre basse ou unique.",
  "stamp": "parlementaires en Espagne sont des femmes"
 },
 "home-toilet-nga": {
  "q": "Sur 100 personnes au Nigeria, combien ont des toilettes sûres à la maison ?",
  "sentence": "« Sûres » veut dire des toilettes qui ne sont pas partagées avec d’autres logements, et dont les déchets sont évacués ou traités sans danger.",
  "stamp": "au Nigeria ont des toilettes sûres à la maison"
 },
 "work-farming-pak": {
  "q": "Sur 100 personnes qui travaillent au Pakistan, combien travaillent dans l’agriculture ?",
  "sentence": "Ici, l’agriculture comprend aussi la sylviculture et la pêche.",
  "stamp": "travaillent dans l’agriculture au Pakistan"
 },
 "home-city-chn": {
  "q": "Sur 100 personnes en Chine, combien vivent en ville ?",
  "sentence": "Les 34 autres vivent à la campagne.",
  "stamp": "en Chine vivent en ville"
 },
 "people-65-deu": {
  "q": "Sur 100 personnes en Allemagne, combien ont 65 ans ou plus ?",
  "sentence": "Les 76 autres ont moins de 65 ans.",
  "stamp": "en Allemagne ont 65 ans ou plus"
 },
 "home-electricity-hti": {
  "q": "Sur 100 personnes à Haïti, combien ont l’électricité à la maison ?",
  "sentence": "Donc environ 46 sur 100 vivent encore sans électricité.",
  "stamp": "à Haïti ont l’électricité à la maison"
 },
 "money-account-mex": {
  "q": "Sur 100 adultes au Mexique, combien ont un compte en banque ou un compte d’argent mobile ?",
  "sentence": "Un compte d’argent mobile se trouve sur un téléphone, sans besoin d’agence bancaire.",
  "stamp": "adultes au Mexique ont un compte en banque ou d’argent mobile"
 },
 "home-internet-nga": {
  "q": "Sur 100 personnes au Nigeria, combien utilisent Internet ?",
  "sentence": "Les 59 autres n’ont pas utilisé Internet au cours des trois derniers mois.",
  "stamp": "au Nigeria utilisent Internet"
 },
 "health-measles-eth": {
  "q": "Sur 100 enfants d’un an en Éthiopie, combien sont vaccinés contre la rougeole ?",
  "sentence": "Donc environ 28 sur 100 commencent la vie sans cette protection.",
  "stamp": "enfants d’un an en Éthiopie sont vaccinés contre la rougeole"
 },
 "people-parliament-zaf": {
  "q": "Sur 100 parlementaires en Afrique du Sud, combien sont des femmes ?",
  "sentence": "Donc les hommes occupent environ 55 sièges sur 100 dans sa chambre basse ou unique.",
  "stamp": "parlementaires en Afrique du Sud sont des femmes"
 },
 "home-cooking-idn": {
  "q": "Sur 100 personnes en Indonésie, combien cuisinent avec un combustible propre, comme le gaz ou l’électricité ?",
  "sentence": "Les 9 autres cuisinent avec des combustibles comme le bois, le charbon de bois ou le charbon.",
  "stamp": "en Indonésie cuisinent avec un combustible propre"
 },
 "people-children-pak": {
  "q": "Sur 100 personnes au Pakistan, combien sont des enfants de moins de 15 ans ?",
  "sentence": "On compte tout le monde, des nouveau-nés aux jeunes de 14 ans.",
  "stamp": "au Pakistan sont des enfants de moins de 15 ans"
 },
 "home-city-deu": {
  "q": "Sur 100 personnes en Allemagne, combien vivent en ville ?",
  "sentence": "Les 18 autres vivent à la campagne.",
  "stamp": "en Allemagne vivent en ville"
 },
 "people-65-kor": {
  "q": "Sur 100 personnes en Corée du Sud, combien ont 65 ans ou plus ?",
  "sentence": "Les 80 autres ont moins de 65 ans.",
  "stamp": "en Corée du Sud ont 65 ans ou plus"
 },
 "home-water-nga": {
  "q": "Sur 100 personnes au Nigeria, combien ont de l’eau potable sûre à la maison ?",
  "sentence": "« Sûre » veut dire : à la maison, disponible quand on en a besoin, et sans contamination.",
  "stamp": "au Nigeria ont de l’eau potable sûre à la maison"
 },
 "work-farming-ind": {
  "q": "Sur 100 personnes qui travaillent en Inde, combien travaillent dans l’agriculture ?",
  "sentence": "Ici, l’agriculture comprend aussi la sylviculture et la pêche.",
  "stamp": "travaillent dans l’agriculture en Inde"
 },
 "home-electricity-moz": {
  "q": "Sur 100 personnes au Mozambique, combien ont l’électricité à la maison ?",
  "sentence": "Donc environ 63 sur 100 vivent encore sans électricité.",
  "stamp": "au Mozambique ont l’électricité à la maison"
 },
 "money-account-vnm": {
  "q": "Sur 100 adultes au Vietnam, combien ont un compte en banque ou un compte d’argent mobile ?",
  "sentence": "Un compte d’argent mobile se trouve sur un téléphone, sans besoin d’agence bancaire.",
  "stamp": "adultes au Vietnam ont un compte en banque ou d’argent mobile"
 },
 "home-internet-pak": {
  "q": "Sur 100 personnes au Pakistan, combien utilisent Internet ?",
  "sentence": "Les 43 autres n’ont pas utilisé Internet au cours des trois derniers mois.",
  "stamp": "au Pakistan utilisent Internet"
 },
 "work-women-ind": {
  "q": "Sur 100 personnes actives en Inde, combien sont des femmes ?",
  "sentence": "La population active compte toutes les personnes qui ont un emploi ou en cherchent un.",
  "stamp": "personnes actives en Inde sont des femmes"
 },
 "people-parliament-swe": {
  "q": "Sur 100 parlementaires en Suède, combien sont des femmes ?",
  "sentence": "Donc les hommes occupent environ 55 sièges sur 100 dans sa chambre basse ou unique.",
  "stamp": "parlementaires en Suède sont des femmes"
 },
 "school-read-egy": {
  "q": "Sur 100 adultes en Égypte, combien savent lire et écrire ?",
  "sentence": "Ici, « adultes » veut dire toutes les personnes de 15 ans ou plus.",
  "stamp": "adultes en Égypte savent lire et écrire"
 },
 "home-city-eth": {
  "q": "Sur 100 personnes en Éthiopie, combien vivent en ville ?",
  "sentence": "Les 76 autres vivent à la campagne.",
  "stamp": "en Éthiopie vivent en ville"
 },
 "people-65-gbr": {
  "q": "Sur 100 personnes au Royaume-Uni, combien ont 65 ans ou plus ?",
  "sentence": "Les 80 autres ont moins de 65 ans.",
  "stamp": "au Royaume-Uni ont 65 ans ou plus"
 },
 "home-cooking-pak": {
  "q": "Sur 100 personnes au Pakistan, combien cuisinent avec un combustible propre, comme le gaz ou l’électricité ?",
  "sentence": "Les 45 autres cuisinent avec des combustibles comme le bois, le charbon de bois ou le charbon.",
  "stamp": "au Pakistan cuisinent avec un combustible propre"
 },
 "people-children-nga": {
  "q": "Sur 100 personnes au Nigeria, combien sont des enfants de moins de 15 ans ?",
  "sentence": "On compte tout le monde, des nouveau-nés aux jeunes de 14 ans.",
  "stamp": "au Nigeria sont des enfants de moins de 15 ans"
 },
 "home-toilet-ind": {
  "q": "Sur 100 personnes en Inde, combien ont des toilettes sûres à la maison ?",
  "sentence": "« Sûres » veut dire des toilettes qui ne sont pas partagées avec d’autres logements, et dont les déchets sont évacués ou traités sans danger.",
  "stamp": "en Inde ont des toilettes sûres à la maison"
 },
 "money-account-bgd": {
  "q": "Sur 100 adultes au Bangladesh, combien ont un compte en banque ou un compte d’argent mobile ?",
  "sentence": "Un compte d’argent mobile se trouve sur un téléphone, sans besoin d’agence bancaire.",
  "stamp": "adultes au Bangladesh ont un compte en banque ou d’argent mobile"
 },
 "home-electricity-tza": {
  "q": "Sur 100 personnes en Tanzanie, combien ont l’électricité à la maison ?",
  "sentence": "Donc environ 48 sur 100 vivent encore sans électricité.",
  "stamp": "en Tanzanie ont l’électricité à la maison"
 },
 "work-farming-egy": {
  "q": "Sur 100 personnes qui travaillent en Égypte, combien travaillent dans l’agriculture ?",
  "sentence": "Ici, l’agriculture comprend aussi la sylviculture et la pêche.",
  "stamp": "travaillent dans l’agriculture en Égypte"
 },
 "home-internet-eth": {
  "q": "Sur 100 personnes en Éthiopie, combien utilisent Internet ?",
  "sentence": "Les 78 autres n’ont pas utilisé Internet au cours des trois derniers mois.",
  "stamp": "en Éthiopie utilisent Internet"
 },
 "people-parliament-mex": {
  "q": "Sur 100 parlementaires au Mexique, combien sont des femmes ?",
  "sentence": "Donc les hommes occupent environ 50 sièges sur 100 dans sa chambre basse ou unique.",
  "stamp": "parlementaires au Mexique sont des femmes"
 },
 "health-measles-nga": {
  "q": "Sur 100 enfants d’un an au Nigeria, combien sont vaccinés contre la rougeole ?",
  "sentence": "Donc environ 43 sur 100 commencent la vie sans cette protection.",
  "stamp": "enfants d’un an au Nigeria sont vaccinés contre la rougeole"
 },
 "home-city-ind": {
  "q": "Sur 100 personnes en Inde, combien vivent en ville ?",
  "sentence": "Les 64 autres vivent à la campagne.",
  "stamp": "en Inde vivent en ville"
 },
 "people-65-fra": {
  "q": "Sur 100 personnes en France, combien ont 65 ans ou plus ?",
  "sentence": "Les 77 autres ont moins de 65 ans.",
  "stamp": "en France ont 65 ans ou plus"
 },
 "home-water-bra": {
  "q": "Sur 100 personnes au Brésil, combien ont de l’eau potable sûre à la maison ?",
  "sentence": "« Sûre » veut dire : à la maison, disponible quand on en a besoin, et sans contamination.",
  "stamp": "au Brésil ont de l’eau potable sûre à la maison"
 },
 "money-account-idn": {
  "q": "Sur 100 adultes en Indonésie, combien ont un compte en banque ou un compte d’argent mobile ?",
  "sentence": "Un compte d’argent mobile se trouve sur un téléphone, sans besoin d’agence bancaire.",
  "stamp": "adultes en Indonésie ont un compte en banque ou d’argent mobile"
 },
 "home-cooking-eth": {
  "q": "Sur 100 personnes en Éthiopie, combien cuisinent avec un combustible propre, comme le gaz ou l’électricité ?",
  "sentence": "Les 93 autres cuisinent avec des combustibles comme le bois, le charbon de bois ou le charbon.",
  "stamp": "en Éthiopie cuisinent avec un combustible propre"
 },
 "people-children-jpn": {
  "q": "Sur 100 personnes au Japon, combien sont des enfants de moins de 15 ans ?",
  "sentence": "On compte tout le monde, des nouveau-nés aux jeunes de 14 ans.",
  "stamp": "au Japon sont des enfants de moins de 15 ans"
 },
 "work-farming-bgd": {
  "q": "Sur 100 personnes qui travaillent au Bangladesh, combien travaillent dans l’agriculture ?",
  "sentence": "Ici, l’agriculture comprend aussi la sylviculture et la pêche.",
  "stamp": "travaillent dans l’agriculture au Bangladesh"
 },
 "home-electricity-ken": {
  "q": "Sur 100 personnes au Kenya, combien ont l’électricité à la maison ?",
  "sentence": "Donc environ 23 sur 100 vivent encore sans électricité.",
  "stamp": "au Kenya ont l’électricité à la maison"
 },
 "people-parliament-rwa": {
  "q": "Sur 100 parlementaires au Rwanda, combien sont des femmes ?",
  "sentence": "Donc les hommes occupent environ 36 sièges sur 100 dans sa chambre basse ou unique.",
  "stamp": "parlementaires au Rwanda sont des femmes"
 },
 "home-city-pak": {
  "q": "Sur 100 personnes au Pakistan, combien vivent en ville ?",
  "sentence": "Les 60 autres vivent à la campagne.",
  "stamp": "au Pakistan vivent en ville"
 },
 "people-65-ita": {
  "q": "Sur 100 personnes en Italie, combien ont 65 ans ou plus ?",
  "sentence": "Les 75 autres ont moins de 65 ans.",
  "stamp": "en Italie ont 65 ans ou plus"
 },
 "home-internet-ken": {
  "q": "Sur 100 personnes au Kenya, combien utilisent Internet ?",
  "sentence": "Les 65 autres n’ont pas utilisé Internet au cours des trois derniers mois.",
  "stamp": "au Kenya utilisent Internet"
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["100-of-us"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["100-of-us"] = days;
  window.LG_PUZZLES["100-of-us.byId"] = byId;
})();
