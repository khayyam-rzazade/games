/* Logicers: the pt words of 100-of-us, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-100-of-us-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "live-india": {
  "q": "De cada 100 pessoas no mundo, quantas vivem na Índia?",
  "sentence": "Nenhum país tem mais habitantes.",
  "stamp": "vivem na Índia"
 },
 "live-high-income": {
  "q": "De cada 100 pessoas no mundo, quantas vivem em um país de renda alta?",
  "sentence": "Renda alta é o grupo dos países mais ricos do Banco Mundial.",
  "stamp": "vivem em país de renda alta"
 },
 "live-africa": {
  "q": "De cada 100 pessoas no mundo, quantas vivem na África?",
  "sentence": "É o continente inteiro, do Marrocos à África do Sul.",
  "stamp": "vivem na África"
 },
 "live-eu": {
  "q": "De cada 100 pessoas no mundo, quantas vivem na União Europeia?",
  "sentence": "É a soma de todos os 27 países-membros.",
  "stamp": "vivem na União Europeia"
 },
 "live-asia": {
  "q": "De cada 100 pessoas no mundo, quantas vivem na Ásia?",
  "sentence": "Vive mais gente na Ásia do que em todos os outros continentes juntos.",
  "stamp": "vivem na Ásia"
 },
 "live-india-china": {
  "q": "De cada 100 pessoas no mundo, quantas vivem na Índia ou na China?",
  "sentence": "Mais de uma em cada três pessoas vive só nesses dois países.",
  "stamp": "vivem na Índia ou na China"
 },
 "live-americas": {
  "q": "De cada 100 pessoas no mundo, quantas vivem nas Américas?",
  "sentence": "Isso inclui a América do Norte, a Central e a do Sul, além do Caribe.",
  "stamp": "vivem nas Américas"
 },
 "live-low-income": {
  "q": "De cada 100 pessoas no mundo, quantas vivem em um país de renda baixa?",
  "sentence": "Renda baixa é o grupo dos países mais pobres do Banco Mundial.",
  "stamp": "vivem em país de renda baixa"
 },
 "live-europe": {
  "q": "De cada 100 pessoas no mundo, quantas vivem na Europa?",
  "sentence": "Aqui, a Rússia conta como parte da Europa.",
  "stamp": "vivem na Europa"
 },
 "live-china": {
  "q": "De cada 100 pessoas no mundo, quantas vivem na China?",
  "sentence": "Só a Índia tem mais habitantes.",
  "stamp": "vivem na China"
 },
 "live-middle-income": {
  "q": "De cada 100 pessoas no mundo, quantas vivem em um país de renda média?",
  "sentence": "A maioria das pessoas vive em países que não são nem ricos nem pobres.",
  "stamp": "vivem em país de renda média"
 },
 "live-ten-biggest": {
  "q": "De cada 100 pessoas no mundo, quantas vivem nos dez países mais populosos?",
  "sentence": "As outras 43 se espalham por mais de 200 países e territórios.",
  "stamp": "vivem nos dez países mais populosos"
 },
 "home-electricity": {
  "q": "De cada 100 pessoas no mundo, quantas têm eletricidade em casa?",
  "sentence": "Então cerca de 8 em cada 100 ainda vivem sem eletricidade.",
  "stamp": "têm eletricidade em casa"
 },
 "people-children": {
  "q": "De cada 100 pessoas no mundo, quantas são crianças com menos de 15 anos?",
  "sentence": "Entram na conta todos, de bebês recém-nascidos a crianças de 14 anos.",
  "stamp": "têm menos de 15 anos"
 },
 "home-internet": {
  "q": "De cada 100 pessoas no mundo, quantas usam a internet?",
  "sentence": "As outras 26 não acessaram a internet nos últimos três meses.",
  "stamp": "usam a internet"
 },
 "work-farming": {
  "q": "De cada 100 trabalhadores no mundo, quantos trabalham na agricultura?",
  "sentence": "Aqui, a agricultura inclui também a produção florestal e a pesca.",
  "stamp": "trabalhadores na agricultura"
 },
 "school-read": {
  "q": "De cada 100 adultos no mundo, quantos sabem ler e escrever?",
  "sentence": "Aqui, adultos são todas as pessoas de 15 anos ou mais.",
  "stamp": "adultos sabem ler e escrever"
 },
 "people-parliament": {
  "q": "De cada 100 parlamentares no mundo, quantos são mulheres?",
  "sentence": "Então os homens ocupam cerca de 73 de cada 100 cadeiras.",
  "stamp": "parlamentares são mulheres"
 },
 "home-city": {
  "q": "De cada 100 pessoas no mundo, quantas vivem em uma cidade, grande ou pequena?",
  "sentence": "As outras 42 vivem no campo.",
  "stamp": "vivem em cidades"
 },
 "health-measles": {
  "q": "De cada 100 crianças de 1 ano no mundo, quantas estão vacinadas contra o sarampo?",
  "sentence": "Então cerca de 16 em cada 100 começam a vida sem essa proteção.",
  "stamp": "crianças de 1 ano vacinadas contra o sarampo"
 },
 "home-water": {
  "q": "De cada 100 pessoas no mundo, quantas têm água potável segura em casa?",
  "sentence": "Segura quer dizer: dentro de casa, disponível quando se precisa e livre de contaminação.",
  "stamp": "têm água potável segura em casa"
 },
 "money-poverty": {
  "q": "De cada 100 pessoas no mundo, quantas vivem com menos de 3 dólares por dia?",
  "sentence": "Os 3 dólares são ajustados ao que o dinheiro compra em cada país.",
  "stamp": "vivem com menos de 3 dólares por dia"
 },
 "people-65": {
  "q": "De cada 100 pessoas no mundo, quantas têm 65 anos ou mais?",
  "sentence": "As outras 90 têm menos de 65 anos.",
  "stamp": "têm 65 anos ou mais"
 },
 "work-women": {
  "q": "De cada 100 pessoas na força de trabalho mundial, quantas são mulheres?",
  "sentence": "A força de trabalho reúne todas as pessoas que têm emprego ou estão procurando um.",
  "stamp": "trabalhadores são mulheres"
 },
 "home-toilet": {
  "q": "De cada 100 pessoas no mundo, quantas têm banheiro seguro em casa?",
  "sentence": "Seguro quer dizer um banheiro que não é dividido com outras casas e em que os dejetos são descartados com segurança ou tratados.",
  "stamp": "têm banheiro seguro em casa"
 },
 "money-account": {
  "q": "De cada 100 adultos no mundo, quantos têm conta bancária ou carteira digital?",
  "sentence": "Uma carteira digital fica no celular, sem precisar de agência bancária.",
  "stamp": "adultos têm conta bancária ou carteira digital"
 },
 "health-hunger": {
  "q": "De cada 100 pessoas no mundo, quantas não têm comida suficiente?",
  "sentence": "Não ter comida suficiente quer dizer comer, com regularidade, menos calorias do que o corpo precisa para uma vida normal e ativa.",
  "stamp": "não têm comida suficiente"
 },
 "work-services": {
  "q": "De cada 100 trabalhadores no mundo, quantos trabalham em serviços, como lojas, escolas e escritórios?",
  "sentence": "Serviços incluem comércio, transporte, hotéis, educação, saúde e trabalho de escritório.",
  "stamp": "trabalhadores em serviços"
 },
 "home-cooking": {
  "q": "De cada 100 pessoas no mundo, quantas cozinham com combustível limpo, como gás ou eletricidade?",
  "sentence": "As outras 26 cozinham com combustíveis como lenha, carvão vegetal ou carvão mineral.",
  "stamp": "cozinham com combustível limpo"
 },
 "people-women": {
  "q": "De cada 100 pessoas no mundo, quantas são mulheres ou meninas?",
  "sentence": "Então cerca de 50 são homens ou meninos.",
  "stamp": "são mulheres ou meninas"
 },
 "health-births": {
  "q": "De cada 100 bebês que nascem no mundo, quantos nascem com a ajuda de um profissional de saúde qualificado?",
  "sentence": "Qualificado quer dizer que estudou para isso, como médico, enfermeiro ou parteira.",
  "stamp": "nascimentos com profissional qualificado"
 },
 "work-industry": {
  "q": "De cada 100 trabalhadores no mundo, quantos trabalham na indústria, como fábricas e construção?",
  "sentence": "Indústria quer dizer mineração, fábricas, construção e fornecimento de energia e de água.",
  "stamp": "trabalhadores na indústria"
 },
 "home-slum": {
  "q": "De cada 100 pessoas que moram nas cidades do mundo, quantas vivem em moradias precárias?",
  "sentence": "Uma moradia precária não tem pelo menos uma coisa básica, como água limpa, banheiro, espaço suficiente ou paredes firmes.",
  "stamp": "moradores de cidades em moradias precárias"
 },
 "health-tobacco": {
  "q": "De cada 100 adultos no mundo, quantos usam tabaco?",
  "sentence": "Aqui, adultos são todas as pessoas de 15 anos ou mais. Tabaco é mais do que cigarro.",
  "stamp": "adultos usam tabaco"
 },
 "work-self": {
  "q": "De cada 100 trabalhadores no mundo, quantos trabalham por conta própria?",
  "sentence": "Isso inclui quem ajuda no negócio ou na lavoura da família sem receber salário.",
  "stamp": "trabalhadores por conta própria"
 },
 "people-parliament-fra": {
  "q": "De cada 100 parlamentares na França, quantos são mulheres?",
  "sentence": "Então os homens ocupam cerca de 64 de cada 100 cadeiras na câmara baixa ou única do país.",
  "stamp": "parlamentares na França são mulheres"
 },
 "home-internet-bra": {
  "q": "De cada 100 pessoas no Brasil, quantas usam a internet?",
  "sentence": "As outras 16 não acessaram a internet nos últimos três meses.",
  "stamp": "no Brasil usam a internet"
 },
 "people-65-rus": {
  "q": "De cada 100 pessoas na Rússia, quantas têm 65 anos ou mais?",
  "sentence": "As outras 82 têm menos de 65 anos.",
  "stamp": "na Rússia têm 65 anos ou mais"
 },
 "home-city-jpn": {
  "q": "De cada 100 pessoas no Japão, quantas vivem em uma cidade, grande ou pequena?",
  "sentence": "As outras 8 vivem no campo.",
  "stamp": "no Japão vivem em cidades"
 },
 "money-account-tur": {
  "q": "De cada 100 adultos na Turquia, quantos têm conta bancária ou carteira digital?",
  "sentence": "Uma carteira digital fica no celular, sem precisar de agência bancária.",
  "stamp": "adultos na Turquia têm conta bancária ou carteira digital"
 },
 "people-children-ken": {
  "q": "De cada 100 pessoas no Quênia, quantas são crianças com menos de 15 anos?",
  "sentence": "Entram na conta todos, de bebês recém-nascidos a crianças de 14 anos.",
  "stamp": "no Quênia têm menos de 15 anos"
 },
 "work-farming-chn": {
  "q": "De cada 100 trabalhadores na China, quantos trabalham na agricultura?",
  "sentence": "Aqui, a agricultura inclui também a produção florestal e a pesca.",
  "stamp": "trabalhadores na agricultura da China"
 },
 "home-cooking-ind": {
  "q": "De cada 100 pessoas na Índia, quantas cozinham com combustível limpo, como gás ou eletricidade?",
  "sentence": "As outras 23 cozinham com combustíveis como lenha, carvão vegetal ou carvão mineral.",
  "stamp": "na Índia cozinham com combustível limpo"
 },
 "health-measles-phl": {
  "q": "De cada 100 crianças de 1 ano nas Filipinas, quantas estão vacinadas contra o sarampo?",
  "sentence": "Então cerca de 20 em cada 100 começam a vida sem essa proteção.",
  "stamp": "crianças de 1 ano nas Filipinas vacinadas contra o sarampo"
 },
 "home-electricity-uga": {
  "q": "De cada 100 pessoas em Uganda, quantas têm eletricidade em casa?",
  "sentence": "Então cerca de 45 em cada 100 ainda vivem sem eletricidade.",
  "stamp": "em Uganda têm eletricidade em casa"
 },
 "school-read-bgd": {
  "q": "De cada 100 adultos em Bangladesh, quantos sabem ler e escrever?",
  "sentence": "Aqui, adultos são todas as pessoas de 15 anos ou mais.",
  "stamp": "adultos em Bangladesh sabem ler e escrever"
 },
 "work-women-jpn": {
  "q": "De cada 100 pessoas na força de trabalho do Japão, quantas são mulheres?",
  "sentence": "A força de trabalho reúne todas as pessoas que têm emprego ou estão procurando um.",
  "stamp": "trabalhadores no Japão são mulheres"
 },
 "home-water-eth": {
  "q": "De cada 100 pessoas na Etiópia, quantas têm água potável segura em casa?",
  "sentence": "Segura quer dizer: dentro de casa, disponível quando se precisa e livre de contaminação.",
  "stamp": "na Etiópia têm água potável segura em casa"
 },
 "people-parliament-bra": {
  "q": "De cada 100 parlamentares no Brasil, quantos são mulheres?",
  "sentence": "Então os homens ocupam cerca de 82 de cada 100 cadeiras na Câmara dos Deputados.",
  "stamp": "parlamentares no Brasil são mulheres"
 },
 "home-toilet-chn": {
  "q": "De cada 100 pessoas na China, quantas têm banheiro seguro em casa?",
  "sentence": "Seguro quer dizer um banheiro que não é dividido com outras casas e em que os dejetos são descartados com segurança ou tratados.",
  "stamp": "na China têm banheiro seguro em casa"
 },
 "money-account-ken": {
  "q": "De cada 100 adultos no Quênia, quantos têm conta bancária ou carteira digital?",
  "sentence": "Uma carteira digital fica no celular, sem precisar de agência bancária.",
  "stamp": "adultos no Quênia têm conta bancária ou carteira digital"
 },
 "home-internet-egy": {
  "q": "De cada 100 pessoas no Egito, quantas usam a internet?",
  "sentence": "As outras 25 não acessaram a internet nos últimos três meses.",
  "stamp": "no Egito usam a internet"
 },
 "people-65-can": {
  "q": "De cada 100 pessoas no Canadá, quantas têm 65 anos ou mais?",
  "sentence": "As outras 80 têm menos de 65 anos.",
  "stamp": "no Canadá têm 65 anos ou mais"
 },
 "home-city-vnm": {
  "q": "De cada 100 pessoas no Vietnã, quantas vivem em uma cidade, grande ou pequena?",
  "sentence": "As outras 61 vivem no campo.",
  "stamp": "no Vietnã vivem em cidades"
 },
 "work-farming-idn": {
  "q": "De cada 100 trabalhadores na Indonésia, quantos trabalham na agricultura?",
  "sentence": "Aqui, a agricultura inclui também a produção florestal e a pesca.",
  "stamp": "trabalhadores na agricultura da Indonésia"
 },
 "people-children-bra": {
  "q": "De cada 100 pessoas no Brasil, quantas são crianças com menos de 15 anos?",
  "sentence": "Entram na conta todos, de bebês recém-nascidos a crianças de 14 anos.",
  "stamp": "no Brasil têm menos de 15 anos"
 },
 "home-cooking-ken": {
  "q": "De cada 100 pessoas no Quênia, quantas cozinham com combustível limpo, como gás ou eletricidade?",
  "sentence": "As outras 68 cozinham com combustíveis como lenha, carvão vegetal ou carvão mineral.",
  "stamp": "no Quênia cozinham com combustível limpo"
 },
 "people-parliament-jpn": {
  "q": "De cada 100 parlamentares no Japão, quantos são mulheres?",
  "sentence": "Então os homens ocupam cerca de 84 de cada 100 cadeiras na câmara baixa ou única do país.",
  "stamp": "parlamentares no Japão são mulheres"
 },
 "home-electricity-nga": {
  "q": "De cada 100 pessoas na Nigéria, quantas têm eletricidade em casa?",
  "sentence": "Então cerca de 37 em cada 100 ainda vivem sem eletricidade.",
  "stamp": "na Nigéria têm eletricidade em casa"
 },
 "health-measles-afg": {
  "q": "De cada 100 crianças de 1 ano no Afeganistão, quantas estão vacinadas contra o sarampo?",
  "sentence": "Então cerca de 45 em cada 100 começam a vida sem essa proteção.",
  "stamp": "crianças de 1 ano no Afeganistão vacinadas contra o sarampo"
 },
 "home-internet-mex": {
  "q": "De cada 100 pessoas no México, quantas usam a internet?",
  "sentence": "As outras 17 não acessaram a internet nos últimos três meses.",
  "stamp": "no México usam a internet"
 },
 "people-65-usa": {
  "q": "De cada 100 pessoas nos Estados Unidos, quantas têm 65 anos ou mais?",
  "sentence": "As outras 82 têm menos de 65 anos.",
  "stamp": "nos Estados Unidos têm 65 anos ou mais"
 },
 "money-account-ind": {
  "q": "De cada 100 adultos na Índia, quantos têm conta bancária ou carteira digital?",
  "sentence": "Uma carteira digital fica no celular, sem precisar de agência bancária.",
  "stamp": "adultos na Índia têm conta bancária ou carteira digital"
 },
 "home-city-bgd": {
  "q": "De cada 100 pessoas em Bangladesh, quantas vivem em uma cidade, grande ou pequena?",
  "sentence": "As outras 67 vivem no campo.",
  "stamp": "em Bangladesh vivem em cidades"
 },
 "work-farming-bra": {
  "q": "De cada 100 trabalhadores no Brasil, quantos trabalham na agricultura?",
  "sentence": "Aqui, a agricultura inclui também a produção florestal e a pesca.",
  "stamp": "trabalhadores na agricultura do Brasil"
 },
 "home-water-pak": {
  "q": "De cada 100 pessoas no Paquistão, quantas têm água potável segura em casa?",
  "sentence": "Segura quer dizer: dentro de casa, disponível quando se precisa e livre de contaminação.",
  "stamp": "no Paquistão têm água potável segura em casa"
 },
 "people-parliament-gbr": {
  "q": "De cada 100 parlamentares no Reino Unido, quantos são mulheres?",
  "sentence": "Então os homens ocupam cerca de 60 de cada 100 cadeiras na câmara baixa ou única do país.",
  "stamp": "parlamentares no Reino Unido são mulheres"
 },
 "home-cooking-nga": {
  "q": "De cada 100 pessoas na Nigéria, quantas cozinham com combustível limpo, como gás ou eletricidade?",
  "sentence": "As outras 74 cozinham com combustíveis como lenha, carvão vegetal ou carvão mineral.",
  "stamp": "na Nigéria cozinham com combustível limpo"
 },
 "people-children-deu": {
  "q": "De cada 100 pessoas na Alemanha, quantas são crianças com menos de 15 anos?",
  "sentence": "Entram na conta todos, de bebês recém-nascidos a crianças de 14 anos.",
  "stamp": "na Alemanha têm menos de 15 anos"
 },
 "home-electricity-eth": {
  "q": "De cada 100 pessoas na Etiópia, quantas têm eletricidade em casa?",
  "sentence": "Então cerca de 43 em cada 100 ainda vivem sem eletricidade.",
  "stamp": "na Etiópia têm eletricidade em casa"
 },
 "people-65-chn": {
  "q": "De cada 100 pessoas na China, quantas têm 65 anos ou mais?",
  "sentence": "As outras 85 têm menos de 65 anos.",
  "stamp": "na China têm 65 anos ou mais"
 },
 "home-internet-zaf": {
  "q": "De cada 100 pessoas na África do Sul, quantas usam a internet?",
  "sentence": "As outras 22 não acessaram a internet nos últimos três meses.",
  "stamp": "na África do Sul usam a internet"
 },
 "school-read-ind": {
  "q": "De cada 100 adultos na Índia, quantos sabem ler e escrever?",
  "sentence": "Aqui, adultos são todas as pessoas de 15 anos ou mais.",
  "stamp": "adultos na Índia sabem ler e escrever"
 },
 "money-account-bra": {
  "q": "De cada 100 adultos no Brasil, quantos têm conta bancária ou carteira digital?",
  "sentence": "Uma carteira digital fica no celular, sem precisar de agência bancária.",
  "stamp": "adultos no Brasil têm conta bancária ou carteira digital"
 },
 "home-city-ken": {
  "q": "De cada 100 pessoas no Quênia, quantas vivem em uma cidade, grande ou pequena?",
  "sentence": "As outras 68 vivem no campo.",
  "stamp": "no Quênia vivem em cidades"
 },
 "work-farming-vnm": {
  "q": "De cada 100 trabalhadores no Vietnã, quantos trabalham na agricultura?",
  "sentence": "Aqui, a agricultura inclui também a produção florestal e a pesca.",
  "stamp": "trabalhadores na agricultura do Vietnã"
 },
 "people-parliament-ind": {
  "q": "De cada 100 parlamentares na Índia, quantos são mulheres?",
  "sentence": "Então os homens ocupam cerca de 86 de cada 100 cadeiras na câmara baixa ou única do país.",
  "stamp": "parlamentares na Índia são mulheres"
 },
 "health-measles-mdg": {
  "q": "De cada 100 crianças de 1 ano em Madagascar, quantas estão vacinadas contra o sarampo?",
  "sentence": "Então cerca de 54 em cada 100 começam a vida sem essa proteção.",
  "stamp": "crianças de 1 ano em Madagascar vacinadas contra o sarampo"
 },
 "home-toilet-bra": {
  "q": "De cada 100 pessoas no Brasil, quantas têm banheiro seguro em casa?",
  "sentence": "Seguro quer dizer um banheiro que não é dividido com outras casas e em que os dejetos são descartados com segurança ou tratados.",
  "stamp": "no Brasil têm banheiro seguro em casa"
 },
 "people-65-jpn": {
  "q": "De cada 100 pessoas no Japão, quantas têm 65 anos ou mais?",
  "sentence": "As outras 70 têm menos de 65 anos.",
  "stamp": "no Japão têm 65 anos ou mais"
 },
 "home-cooking-phl": {
  "q": "De cada 100 pessoas nas Filipinas, quantas cozinham com combustível limpo, como gás ou eletricidade?",
  "sentence": "As outras 40 cozinham com combustíveis como lenha, carvão vegetal ou carvão mineral.",
  "stamp": "nas Filipinas cozinham com combustível limpo"
 },
 "people-children-ind": {
  "q": "De cada 100 pessoas na Índia, quantas são crianças com menos de 15 anos?",
  "sentence": "Entram na conta todos, de bebês recém-nascidos a crianças de 14 anos.",
  "stamp": "na Índia têm menos de 15 anos"
 },
 "home-internet-idn": {
  "q": "De cada 100 pessoas na Indonésia, quantas usam a internet?",
  "sentence": "As outras 27 não acessaram a internet nos últimos três meses.",
  "stamp": "na Indonésia usam a internet"
 },
 "work-women-egy": {
  "q": "De cada 100 pessoas na força de trabalho do Egito, quantas são mulheres?",
  "sentence": "A força de trabalho reúne todas as pessoas que têm emprego ou estão procurando um.",
  "stamp": "trabalhadores no Egito são mulheres"
 },
 "home-electricity-mdg": {
  "q": "De cada 100 pessoas em Madagascar, quantas têm eletricidade em casa?",
  "sentence": "Então cerca de 57 em cada 100 ainda vivem sem eletricidade.",
  "stamp": "em Madagascar têm eletricidade em casa"
 },
 "people-parliament-can": {
  "q": "De cada 100 parlamentares no Canadá, quantos são mulheres?",
  "sentence": "Então os homens ocupam cerca de 70 de cada 100 cadeiras na câmara baixa ou única do país.",
  "stamp": "parlamentares no Canadá são mulheres"
 },
 "home-city-nga": {
  "q": "De cada 100 pessoas na Nigéria, quantas vivem em uma cidade, grande ou pequena?",
  "sentence": "As outras 36 vivem no campo.",
  "stamp": "na Nigéria vivem em cidades"
 },
 "work-farming-eth": {
  "q": "De cada 100 trabalhadores na Etiópia, quantos trabalham na agricultura?",
  "sentence": "Aqui, a agricultura inclui também a produção florestal e a pesca.",
  "stamp": "trabalhadores na agricultura da Etiópia"
 },
 "home-water-bgd": {
  "q": "De cada 100 pessoas em Bangladesh, quantas têm água potável segura em casa?",
  "sentence": "Segura quer dizer: dentro de casa, disponível quando se precisa e livre de contaminação.",
  "stamp": "em Bangladesh têm água potável segura em casa"
 },
 "people-65-bra": {
  "q": "De cada 100 pessoas no Brasil, quantas têm 65 anos ou mais?",
  "sentence": "As outras 89 têm menos de 65 anos.",
  "stamp": "no Brasil têm 65 anos ou mais"
 },
 "money-account-pak": {
  "q": "De cada 100 adultos no Paquistão, quantos têm conta bancária ou carteira digital?",
  "sentence": "Uma carteira digital fica no celular, sem precisar de agência bancária.",
  "stamp": "adultos no Paquistão têm conta bancária ou carteira digital"
 },
 "home-internet-ind": {
  "q": "De cada 100 pessoas na Índia, quantas usam a internet?",
  "sentence": "As outras 30 não acessaram a internet nos últimos três meses.",
  "stamp": "na Índia usam a internet"
 },
 "people-children-eth": {
  "q": "De cada 100 pessoas na Etiópia, quantas são crianças com menos de 15 anos?",
  "sentence": "Entram na conta todos, de bebês recém-nascidos a crianças de 14 anos.",
  "stamp": "na Etiópia têm menos de 15 anos"
 },
 "home-cooking-bgd": {
  "q": "De cada 100 pessoas em Bangladesh, quantas cozinham com combustível limpo, como gás ou eletricidade?",
  "sentence": "As outras 72 cozinham com combustíveis como lenha, carvão vegetal ou carvão mineral.",
  "stamp": "em Bangladesh cozinham com combustível limpo"
 },
 "health-measles-pak": {
  "q": "De cada 100 crianças de 1 ano no Paquistão, quantas estão vacinadas contra o sarampo?",
  "sentence": "Então cerca de 14 em cada 100 começam a vida sem essa proteção.",
  "stamp": "crianças de 1 ano no Paquistão vacinadas contra o sarampo"
 },
 "home-electricity-mmr": {
  "q": "De cada 100 pessoas em Mianmar, quantas têm eletricidade em casa?",
  "sentence": "Então cerca de 20 em cada 100 ainda vivem sem eletricidade.",
  "stamp": "em Mianmar têm eletricidade em casa"
 },
 "people-parliament-nzl": {
  "q": "De cada 100 parlamentares na Nova Zelândia, quantos são mulheres?",
  "sentence": "Então os homens ocupam cerca de 54 de cada 100 cadeiras na câmara baixa ou única do país.",
  "stamp": "parlamentares na Nova Zelândia são mulheres"
 },
 "home-city-egy": {
  "q": "De cada 100 pessoas no Egito, quantas vivem em uma cidade, grande ou pequena?",
  "sentence": "As outras 57 vivem no campo.",
  "stamp": "no Egito vivem em cidades"
 },
 "people-65-ind": {
  "q": "De cada 100 pessoas na Índia, quantas têm 65 anos ou mais?",
  "sentence": "As outras 93 têm menos de 65 anos.",
  "stamp": "na Índia têm 65 anos ou mais"
 },
 "work-farming-ken": {
  "q": "De cada 100 trabalhadores no Quênia, quantos trabalham na agricultura?",
  "sentence": "Aqui, a agricultura inclui também a produção florestal e a pesca.",
  "stamp": "trabalhadores na agricultura do Quênia"
 },
 "school-read-pak": {
  "q": "De cada 100 adultos no Paquistão, quantos sabem ler e escrever?",
  "sentence": "Aqui, adultos são todas as pessoas de 15 anos ou mais.",
  "stamp": "adultos no Paquistão sabem ler e escrever"
 },
 "home-internet-vnm": {
  "q": "De cada 100 pessoas no Vietnã, quantas usam a internet?",
  "sentence": "As outras 16 não acessaram a internet nos últimos três meses.",
  "stamp": "no Vietnã usam a internet"
 },
 "money-account-nga": {
  "q": "De cada 100 adultos na Nigéria, quantos têm conta bancária ou carteira digital?",
  "sentence": "Uma carteira digital fica no celular, sem precisar de agência bancária.",
  "stamp": "adultos na Nigéria têm conta bancária ou carteira digital"
 },
 "home-water-mex": {
  "q": "De cada 100 pessoas no México, quantas têm água potável segura em casa?",
  "sentence": "Segura quer dizer: dentro de casa, disponível quando se precisa e livre de contaminação.",
  "stamp": "no México têm água potável segura em casa"
 },
 "people-children-chn": {
  "q": "De cada 100 pessoas na China, quantas são crianças com menos de 15 anos?",
  "sentence": "Entram na conta todos, de bebês recém-nascidos a crianças de 14 anos.",
  "stamp": "na China têm menos de 15 anos"
 },
 "home-cooking-mmr": {
  "q": "De cada 100 pessoas em Mianmar, quantas cozinham com combustível limpo, como gás ou eletricidade?",
  "sentence": "As outras 46 cozinham com combustíveis como lenha, carvão vegetal ou carvão mineral.",
  "stamp": "em Mianmar cozinham com combustível limpo"
 },
 "people-parliament-esp": {
  "q": "De cada 100 parlamentares na Espanha, quantos são mulheres?",
  "sentence": "Então os homens ocupam cerca de 56 de cada 100 cadeiras na câmara baixa ou única do país.",
  "stamp": "parlamentares na Espanha são mulheres"
 },
 "home-toilet-nga": {
  "q": "De cada 100 pessoas na Nigéria, quantas têm banheiro seguro em casa?",
  "sentence": "Seguro quer dizer um banheiro que não é dividido com outras casas e em que os dejetos são descartados com segurança ou tratados.",
  "stamp": "na Nigéria têm banheiro seguro em casa"
 },
 "work-farming-pak": {
  "q": "De cada 100 trabalhadores no Paquistão, quantos trabalham na agricultura?",
  "sentence": "Aqui, a agricultura inclui também a produção florestal e a pesca.",
  "stamp": "trabalhadores na agricultura do Paquistão"
 },
 "home-city-chn": {
  "q": "De cada 100 pessoas na China, quantas vivem em uma cidade, grande ou pequena?",
  "sentence": "As outras 34 vivem no campo.",
  "stamp": "na China vivem em cidades"
 },
 "people-65-deu": {
  "q": "De cada 100 pessoas na Alemanha, quantas têm 65 anos ou mais?",
  "sentence": "As outras 76 têm menos de 65 anos.",
  "stamp": "na Alemanha têm 65 anos ou mais"
 },
 "home-electricity-hti": {
  "q": "De cada 100 pessoas no Haiti, quantas têm eletricidade em casa?",
  "sentence": "Então cerca de 46 em cada 100 ainda vivem sem eletricidade.",
  "stamp": "no Haiti têm eletricidade em casa"
 },
 "money-account-mex": {
  "q": "De cada 100 adultos no México, quantos têm conta bancária ou carteira digital?",
  "sentence": "Uma carteira digital fica no celular, sem precisar de agência bancária.",
  "stamp": "adultos no México têm conta bancária ou carteira digital"
 },
 "home-internet-nga": {
  "q": "De cada 100 pessoas na Nigéria, quantas usam a internet?",
  "sentence": "As outras 59 não acessaram a internet nos últimos três meses.",
  "stamp": "na Nigéria usam a internet"
 },
 "health-measles-eth": {
  "q": "De cada 100 crianças de 1 ano na Etiópia, quantas estão vacinadas contra o sarampo?",
  "sentence": "Então cerca de 28 em cada 100 começam a vida sem essa proteção.",
  "stamp": "crianças de 1 ano na Etiópia vacinadas contra o sarampo"
 },
 "people-parliament-zaf": {
  "q": "De cada 100 parlamentares na África do Sul, quantos são mulheres?",
  "sentence": "Então os homens ocupam cerca de 55 de cada 100 cadeiras na câmara baixa ou única do país.",
  "stamp": "parlamentares na África do Sul são mulheres"
 },
 "home-cooking-idn": {
  "q": "De cada 100 pessoas na Indonésia, quantas cozinham com combustível limpo, como gás ou eletricidade?",
  "sentence": "As outras 9 cozinham com combustíveis como lenha, carvão vegetal ou carvão mineral.",
  "stamp": "na Indonésia cozinham com combustível limpo"
 },
 "people-children-pak": {
  "q": "De cada 100 pessoas no Paquistão, quantas são crianças com menos de 15 anos?",
  "sentence": "Entram na conta todos, de bebês recém-nascidos a crianças de 14 anos.",
  "stamp": "no Paquistão têm menos de 15 anos"
 },
 "home-city-deu": {
  "q": "De cada 100 pessoas na Alemanha, quantas vivem em uma cidade, grande ou pequena?",
  "sentence": "As outras 18 vivem no campo.",
  "stamp": "na Alemanha vivem em cidades"
 },
 "people-65-kor": {
  "q": "De cada 100 pessoas na Coreia do Sul, quantas têm 65 anos ou mais?",
  "sentence": "As outras 80 têm menos de 65 anos.",
  "stamp": "na Coreia do Sul têm 65 anos ou mais"
 },
 "home-water-nga": {
  "q": "De cada 100 pessoas na Nigéria, quantas têm água potável segura em casa?",
  "sentence": "Segura quer dizer: dentro de casa, disponível quando se precisa e livre de contaminação.",
  "stamp": "na Nigéria têm água potável segura em casa"
 },
 "work-farming-ind": {
  "q": "De cada 100 trabalhadores na Índia, quantos trabalham na agricultura?",
  "sentence": "Aqui, a agricultura inclui também a produção florestal e a pesca.",
  "stamp": "trabalhadores na agricultura da Índia"
 },
 "home-electricity-moz": {
  "q": "De cada 100 pessoas em Moçambique, quantas têm eletricidade em casa?",
  "sentence": "Então cerca de 63 em cada 100 ainda vivem sem eletricidade.",
  "stamp": "em Moçambique têm eletricidade em casa"
 },
 "money-account-vnm": {
  "q": "De cada 100 adultos no Vietnã, quantos têm conta bancária ou carteira digital?",
  "sentence": "Uma carteira digital fica no celular, sem precisar de agência bancária.",
  "stamp": "adultos no Vietnã têm conta bancária ou carteira digital"
 },
 "home-internet-pak": {
  "q": "De cada 100 pessoas no Paquistão, quantas usam a internet?",
  "sentence": "As outras 43 não acessaram a internet nos últimos três meses.",
  "stamp": "no Paquistão usam a internet"
 },
 "work-women-ind": {
  "q": "De cada 100 pessoas na força de trabalho da Índia, quantas são mulheres?",
  "sentence": "A força de trabalho reúne todas as pessoas que têm emprego ou estão procurando um.",
  "stamp": "trabalhadores na Índia são mulheres"
 },
 "people-parliament-swe": {
  "q": "De cada 100 parlamentares na Suécia, quantos são mulheres?",
  "sentence": "Então os homens ocupam cerca de 55 de cada 100 cadeiras na câmara baixa ou única do país.",
  "stamp": "parlamentares na Suécia são mulheres"
 },
 "school-read-egy": {
  "q": "De cada 100 adultos no Egito, quantos sabem ler e escrever?",
  "sentence": "Aqui, adultos são todas as pessoas de 15 anos ou mais.",
  "stamp": "adultos no Egito sabem ler e escrever"
 },
 "home-city-eth": {
  "q": "De cada 100 pessoas na Etiópia, quantas vivem em uma cidade, grande ou pequena?",
  "sentence": "As outras 76 vivem no campo.",
  "stamp": "na Etiópia vivem em cidades"
 },
 "people-65-gbr": {
  "q": "De cada 100 pessoas no Reino Unido, quantas têm 65 anos ou mais?",
  "sentence": "As outras 80 têm menos de 65 anos.",
  "stamp": "no Reino Unido têm 65 anos ou mais"
 },
 "home-cooking-pak": {
  "q": "De cada 100 pessoas no Paquistão, quantas cozinham com combustível limpo, como gás ou eletricidade?",
  "sentence": "As outras 45 cozinham com combustíveis como lenha, carvão vegetal ou carvão mineral.",
  "stamp": "no Paquistão cozinham com combustível limpo"
 },
 "people-children-nga": {
  "q": "De cada 100 pessoas na Nigéria, quantas são crianças com menos de 15 anos?",
  "sentence": "Entram na conta todos, de bebês recém-nascidos a crianças de 14 anos.",
  "stamp": "na Nigéria têm menos de 15 anos"
 },
 "home-toilet-ind": {
  "q": "De cada 100 pessoas na Índia, quantas têm banheiro seguro em casa?",
  "sentence": "Seguro quer dizer um banheiro que não é dividido com outras casas e em que os dejetos são descartados com segurança ou tratados.",
  "stamp": "na Índia têm banheiro seguro em casa"
 },
 "money-account-bgd": {
  "q": "De cada 100 adultos em Bangladesh, quantos têm conta bancária ou carteira digital?",
  "sentence": "Uma carteira digital fica no celular, sem precisar de agência bancária.",
  "stamp": "adultos em Bangladesh têm conta bancária ou carteira digital"
 },
 "home-electricity-tza": {
  "q": "De cada 100 pessoas na Tanzânia, quantas têm eletricidade em casa?",
  "sentence": "Então cerca de 48 em cada 100 ainda vivem sem eletricidade.",
  "stamp": "na Tanzânia têm eletricidade em casa"
 },
 "work-farming-egy": {
  "q": "De cada 100 trabalhadores no Egito, quantos trabalham na agricultura?",
  "sentence": "Aqui, a agricultura inclui também a produção florestal e a pesca.",
  "stamp": "trabalhadores na agricultura do Egito"
 },
 "home-internet-eth": {
  "q": "De cada 100 pessoas na Etiópia, quantas usam a internet?",
  "sentence": "As outras 78 não acessaram a internet nos últimos três meses.",
  "stamp": "na Etiópia usam a internet"
 },
 "people-parliament-mex": {
  "q": "De cada 100 parlamentares no México, quantos são mulheres?",
  "sentence": "Então os homens ocupam cerca de 50 de cada 100 cadeiras na câmara baixa ou única do país.",
  "stamp": "parlamentares no México são mulheres"
 },
 "health-measles-nga": {
  "q": "De cada 100 crianças de 1 ano na Nigéria, quantas estão vacinadas contra o sarampo?",
  "sentence": "Então cerca de 43 em cada 100 começam a vida sem essa proteção.",
  "stamp": "crianças de 1 ano na Nigéria vacinadas contra o sarampo"
 },
 "home-city-ind": {
  "q": "De cada 100 pessoas na Índia, quantas vivem em uma cidade, grande ou pequena?",
  "sentence": "As outras 64 vivem no campo.",
  "stamp": "na Índia vivem em cidades"
 },
 "people-65-fra": {
  "q": "De cada 100 pessoas na França, quantas têm 65 anos ou mais?",
  "sentence": "As outras 77 têm menos de 65 anos.",
  "stamp": "na França têm 65 anos ou mais"
 },
 "home-water-bra": {
  "q": "De cada 100 pessoas no Brasil, quantas têm água potável segura em casa?",
  "sentence": "Segura quer dizer: dentro de casa, disponível quando se precisa e livre de contaminação.",
  "stamp": "no Brasil têm água potável segura em casa"
 },
 "money-account-idn": {
  "q": "De cada 100 adultos na Indonésia, quantos têm conta bancária ou carteira digital?",
  "sentence": "Uma carteira digital fica no celular, sem precisar de agência bancária.",
  "stamp": "adultos na Indonésia têm conta bancária ou carteira digital"
 },
 "home-cooking-eth": {
  "q": "De cada 100 pessoas na Etiópia, quantas cozinham com combustível limpo, como gás ou eletricidade?",
  "sentence": "As outras 93 cozinham com combustíveis como lenha, carvão vegetal ou carvão mineral.",
  "stamp": "na Etiópia cozinham com combustível limpo"
 },
 "people-children-jpn": {
  "q": "De cada 100 pessoas no Japão, quantas são crianças com menos de 15 anos?",
  "sentence": "Entram na conta todos, de bebês recém-nascidos a crianças de 14 anos.",
  "stamp": "no Japão têm menos de 15 anos"
 },
 "work-farming-bgd": {
  "q": "De cada 100 trabalhadores em Bangladesh, quantos trabalham na agricultura?",
  "sentence": "Aqui, a agricultura inclui também a produção florestal e a pesca.",
  "stamp": "trabalhadores na agricultura de Bangladesh"
 },
 "home-electricity-ken": {
  "q": "De cada 100 pessoas no Quênia, quantas têm eletricidade em casa?",
  "sentence": "Então cerca de 23 em cada 100 ainda vivem sem eletricidade.",
  "stamp": "no Quênia têm eletricidade em casa"
 },
 "people-parliament-rwa": {
  "q": "De cada 100 parlamentares em Ruanda, quantos são mulheres?",
  "sentence": "Então os homens ocupam cerca de 36 de cada 100 cadeiras na câmara baixa ou única do país.",
  "stamp": "parlamentares em Ruanda são mulheres"
 },
 "home-city-pak": {
  "q": "De cada 100 pessoas no Paquistão, quantas vivem em uma cidade, grande ou pequena?",
  "sentence": "As outras 60 vivem no campo.",
  "stamp": "no Paquistão vivem em cidades"
 },
 "people-65-ita": {
  "q": "De cada 100 pessoas na Itália, quantas têm 65 anos ou mais?",
  "sentence": "As outras 75 têm menos de 65 anos.",
  "stamp": "na Itália têm 65 anos ou mais"
 },
 "home-internet-ken": {
  "q": "De cada 100 pessoas no Quênia, quantas usam a internet?",
  "sentence": "As outras 65 não acessaram a internet nos últimos três meses.",
  "stamp": "no Quênia usam a internet"
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["100-of-us"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["100-of-us"] = days;
  window.LG_PUZZLES["100-of-us.byId"] = byId;
})();
