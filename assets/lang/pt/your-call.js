/* Logicers: the pt words of your-call, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-your-call-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "1962-cuba": {
  "place": "Washington",
  "pov": "Um avião espião descobriu que mísseis nucleares soviéticos estão sendo instalados em Cuba, a cerca de 150 km da Flórida. Você é o presidente dos Estados Unidos.",
  "short": "Kennedy",
  "did": "Kennedy ordenou um bloqueio naval a Cuba. Ele chamou o bloqueio de quarentena.",
  "next": "A União Soviética retirou seus mísseis de Cuba. Os Estados Unidos prometeram não invadir a ilha e, sem alarde, retiraram os próprios mísseis da Turquia.",
  "stamp": "Kennedy bloqueia Cuba",
  "choices": [
   "Bombardear as bases de mísseis",
   "Bloquear Cuba pelo mar",
   "Invadir a ilha"
  ]
 },
 "1995-trc": {
  "place": "Cidade do Cabo",
  "pov": "O apartheid acabou e o seu partido venceu as primeiras eleições livres. Sob o antigo regime, milhares de pessoas foram torturadas e mortas. Você é o presidente da África do Sul.",
  "short": "Mandela",
  "did": "O governo de Mandela criou a Comissão da Verdade e Reconciliação. Ela podia conceder anistia a quem contasse toda a verdade sobre os seus crimes políticos.",
  "next": "As audiências eram públicas e foram amplamente transmitidas. Mais de 21.000 vítimas deram depoimentos, e mais de 7.000 pessoas pediram anistia.",
  "stamp": "A comissão da verdade da África do Sul",
  "choices": [
   "Levar os responsáveis a julgamento",
   "Dar anistia a todos e seguir em frente",
   "Oferecer anistia em troca da verdade completa"
  ]
 },
 "1963-sweden": {
  "place": "Estocolmo",
  "pov": "O seu país dirige pela esquerda, mas todos os vizinhos dirigem pela direita. Em um referendo, 83% votaram para continuar pela esquerda. Você é o primeiro-ministro da Suécia.",
  "short": "Erlander",
  "did": "Erlander propôs a mudança, e o parlamento concordou. Em 3 de setembro de 1967, às 4 h 50 da manhã, todos os carros pararam e trocaram de lado.",
  "next": "A mudança correu bem, e os acidentes diminuíram por um tempo. Depois, a maioria dos suecos disse que a troca tinha sido uma boa ideia.",
  "stamp": "A Suécia passa a dirigir pela direita",
  "choices": [
   "Respeitar o voto e continuar pela esquerda",
   "Mudar para a direita mesmo assim",
   "Fazer um segundo referendo"
  ]
 },
 "1918-brest-litovsk": {
  "place": "Petrogrado",
  "pov": "O seu novo governo prometeu acabar com a guerra. O inimigo oferece a paz, mas só se você abrir mão de enormes territórios. O seu próprio partido está dividido. Você é o líder da Rússia Soviética.",
  "short": "Lênin",
  "did": "Lênin defendeu a assinatura. O partido tentou primeiro parar de lutar sem assinar, os alemães voltaram a avançar, e a Rússia assinou em 3 de março de 1918.",
  "next": "A Rússia perdeu a Ucrânia, os seus territórios poloneses e bálticos e a Finlândia. O tratado foi anulado em 11 de novembro de 1918, quando a Alemanha perdeu a guerra.",
  "stamp": "A paz de Brest-Litovski",
  "choices": [
   "Assinar a paz, por mais dura que seja",
   "Parar de lutar, mas não assinar nada",
   "Continuar lutando, em guerra revolucionária"
  ]
 },
 "1936-abdication": {
  "place": "Londres",
  "pov": "Você quer se casar com uma americana que já foi casada duas vezes. O seu governo e a Igreja dizem que ela não pode ser rainha. Você é o rei do Reino Unido.",
  "short": "Eduardo",
  "did": "Eduardo assinou a abdicação em 10 de dezembro de 1936. O irmão mais novo dele subiu ao trono como o rei Jorge VI.",
  "next": "O reinado dele durou 327 dias. Ele recebeu o título de duque de Windsor e se casou com Wallis Simpson, na França, em 3 de junho de 1937.",
  "stamp": "Eduardo VIII abdica do trono",
  "choices": [
   "Casar com ela e fazer dela rainha",
   "Casar com ela, mas sem que seja rainha",
   "Abdicar do trono e casar com ela"
  ]
 },
 "1803-louisiana": {
  "place": "Paris",
  "pov": "A febre amarela está destruindo o seu exército no Caribe, e a guerra contra a Grã-Bretanha está perto. Enviados americanos querem comprar um único porto do seu vasto território da Louisiana: Nova Orleans. Você é o governante da França.",
  "short": "Napoleão",
  "did": "Napoleão ofereceu aos enviados, surpresos, toda a Louisiana por 15 milhões de dólares. O tratado foi assinado em 30 de abril de 1803.",
  "next": "Os Estados Unidos ganharam 828.000 milhas quadradas e quase dobraram de tamanho. Os enviados só estavam autorizados a gastar até 10 milhões de dólares, e por uma área bem menor.",
  "stamp": "Napoleão vende a Louisiana",
  "choices": [
   "Recusar e ficar com o território",
   "Vender só Nova Orleans",
   "Vender toda a Louisiana"
  ]
 },
 "1443-hangul": {
  "place": "Coreia",
  "pov": "O seu povo fala coreano, mas escreve com caracteres chineses, que só uns poucos privilegiados conseguem dominar. A maioria das pessoas comuns não sabe ler nem escrever. Você é o rei da Coreia.",
  "short": "Sejong",
  "did": "Sejong mandou criar um alfabeto novo. Ele ficou pronto em 1443 e foi divulgado em 1446, embora muitos estudiosos e funcionários do governo fossem contra.",
  "next": "A elite menosprezou o novo alfabeto por séculos. Em 1894, o governo fez dele, hoje chamado hangul, a escrita preferida nos documentos oficiais.",
  "stamp": "A Coreia ganha seu próprio alfabeto",
  "choices": [
   "Ensinar os caracteres chineses a mais gente",
   "Criar um alfabeto novo e simples",
   "Melhorar a antiga escrita de base chinesa"
  ]
 },
 "1975-emergency": {
  "place": "Nova Délhi",
  "pov": "Um tribunal decidiu que você violou as regras eleitorais e cancelou a sua vaga no parlamento. Líderes da oposição estão reunindo multidões enormes contra você. Você é o primeiro-ministro da Índia.",
  "short": "Indira Gandhi",
  "did": "Indira Gandhi mandou decretar estado de emergência na noite de 25 de junho de 1975. Líderes da oposição foram presos e a imprensa passou a ser censurada.",
  "next": "A emergência durou 21 meses, e cerca de 110.000 pessoas foram presas. Em janeiro de 1977, ela convocou eleições e perdeu.",
  "stamp": "A Emergência na Índia",
  "choices": [
   "Renunciar",
   "Continuar no cargo e recorrer da decisão",
   "Declarar estado de emergência"
  ]
 },
 "1996-gun-laws": {
  "place": "Camberra",
  "pov": "Um atirador matou 35 pessoas em um ponto turístico da Tasmânia. Cada estado tem as suas próprias leis sobre armas, e grupos a favor das armas são contra regras mais duras. Você é o primeiro-ministro da Austrália.",
  "short": "Howard",
  "did": "Howard conseguiu que todos os estados e territórios concordassem em proibir as armas automáticas e semiautomáticas. O acordo foi fechado em 10 de maio de 1996, 12 dias depois do massacre.",
  "next": "Na recompra que veio em seguida, mais de 650.000 armas foram entregues. A proibição passou mesmo com os governos estaduais conservadores contra.",
  "stamp": "A proibição de armas na Austrália",
  "choices": [
   "Deixar as leis sobre armas a cargo dos estados",
   "Proibir em todo o país as armas de tiro rápido",
   "Endurecer as licenças, mas sem proibir armas"
  ]
 },
 "1948-costa-rica-army": {
  "place": "San José",
  "pov": "Você liderou uma revolta e venceu uma guerra civil de dois meses. Agora chefia a junta que governa o país e precisa decidir o que fazer com o exército. Você é o líder da Costa Rica.",
  "short": "Figueres",
  "did": "Em 1º de dezembro de 1948, Figueres aboliu o exército. Em uma cerimônia em San José, ele derrubou simbolicamente uma parede com uma marreta.",
  "next": "A proibição foi escrita na Constituição em 1949, o ano em que Figueres passou o poder ao presidente eleito. A Costa Rica continua sem exército permanente.",
  "stamp": "A Costa Rica abole o exército",
  "choices": [
   "Abolir o exército",
   "Manter o exército sob oficiais leais",
   "Reduzir o exército e cortar o orçamento dele"
  ]
 },
 "1991-india-reforms": {
  "place": "Nova Délhi",
  "pov": "O seu país só tem moeda estrangeira para cerca de três semanas de importações e está a poucas semanas de não conseguir pagar as suas dívidas. Você acabou de assumir o cargo. Você é o primeiro-ministro da Índia.",
  "short": "Rao",
  "did": "Rao nomeou Manmohan Singh ministro das Finanças. Em julho de 1991, os dois desvalorizaram a rupia duas vezes em três dias e acabaram com o licenciamento industrial em todos os setores, exceto 18.",
  "next": "Singh apresentou o primeiro orçamento dele em 24 de julho de 1991. A economia da Índia, que era de 266 bilhões de dólares em 1991, já passou de 4 trilhões.",
  "stamp": "A Índia abre a economia",
  "choices": [
   "Cortar muito as importações e manter o controle do Estado",
   "Desvalorizar a rupia e abrir a economia",
   "Suspender o pagamento da dívida externa"
  ]
 },
 "1965-singapore": {
  "place": "Kuala Lumpur",
  "pov": "Uma cidade-ilha entrou na sua federação há dois anos. Desde então, houve conflitos raciais, e o líder dela desafia abertamente o seu partido. Você é o primeiro-ministro da Malásia.",
  "short": "Tunku Abdul Rahman",
  "did": "Tunku Abdul Rahman decidiu que Singapura precisava sair. Em 9 de agosto de 1965, o parlamento votou por 126 a 0 pela separação dela da Malásia.",
  "next": "Singapura se tornou um país independente no mesmo dia. O líder dela, Lee Kuan Yew, enfrentou a imprensa com os olhos cheios de lágrimas.",
  "stamp": "Singapura deixa a Malásia",
  "choices": [
   "Expulsar a ilha da federação",
   "Prender o líder da ilha",
   "Oferecer à ilha uma união mais flexível"
  ]
 },
 "1893-wuchale": {
  "place": "Etiópia",
  "pov": "Uma potência europeia afirma que um tratado assinado por você faz do seu país um protetorado dela. A sua cópia, escrita no seu idioma, não diz nada disso. Você é o imperador da Etiópia.",
  "short": "Menelik",
  "did": "Menelik rejeitou a pretensão italiana e, em 1893, rompeu formalmente com o tratado inteiro. As forças da Itália avançaram sobre a Etiópia, e em 1º de março de 1896 o exército dele as derrotou em Adwa.",
  "next": "Em outubro de 1896, a Itália assinou o Tratado de Adis Abeba e reconheceu a independência da Etiópia. A Etiópia continuou sendo um dos poucos países independentes da África.",
  "stamp": "A Etiópia rejeita o domínio italiano",
  "choices": [
   "Aceitar a proteção e evitar uma guerra",
   "Rejeitar o tratado e se preparar para lutar",
   "Oferecer terras em troca de um novo tratado"
  ]
 },
 "1867-alaska": {
  "place": "São Petersburgo",
  "pov": "Você é dono de uma enorme colônia na América do Norte, pouco povoada. Ela é difícil de defender, e a sua grande rival, a Grã-Bretanha, poderia tomá-la na próxima guerra. Você é o imperador da Rússia.",
  "short": "Alexandre II",
  "did": "Alexandre II decidiu vender. O tratado foi assinado em 30 de março de 1867, e os Estados Unidos pagaram 7,2 milhões de dólares pelo Alasca.",
  "next": "Os críticos americanos chamaram o negócio de Loucura de Seward. Em 1896, descobriu-se ouro no Klondike, e o Alasca virou a porta de entrada para as minas de ouro.",
  "stamp": "A Rússia vende o Alasca",
  "choices": [
   "Ficar com ela e mandar mais tropas",
   "Vendê-la aos Estados Unidos",
   "Oferecê-la à Grã-Bretanha"
  ]
 },
 "1971-gold": {
  "place": "Washington",
  "pov": "Governos estrangeiros têm mais dólares do que o seu país tem de ouro, e podem trocar esses dólares por ouro a um preço fixo. Cada vez mais deles estão pedindo a troca. Você é o presidente dos Estados Unidos.",
  "short": "Nixon",
  "did": "Em 15 de agosto de 1971, Nixon anunciou que os dólares não poderiam mais ser convertidos em ouro. Ele também congelou salários e preços por 90 dias.",
  "next": "Um acordo fechado alguns meses depois tentou manter o câmbio fixo, mas o sistema logo acabou. Em 1973, as principais moedas já flutuavam em relação ao dólar.",
  "stamp": "Nixon desvincula o dólar do ouro",
  "choices": [
   "Aumentar o preço oficial do ouro",
   "Subir os juros para defender o dólar",
   "Parar de trocar dólares por ouro"
  ]
 },
 "1975-dismissal": {
  "place": "Camberra",
  "pov": "O Senado se recusa a aprovar o orçamento, e o governo logo vai ficar sem dinheiro. O primeiro-ministro quer uma eleição só para metade do Senado. Você é o governador-geral da Austrália.",
  "short": "Kerr",
  "did": "Em 11 de novembro de 1975, Kerr demitiu o primeiro-ministro Gough Whitlam. Ele nomeou o líder da oposição, Malcolm Fraser, primeiro-ministro interino até as eleições.",
  "next": "Fraser fez o Senado aprovar o orçamento na mesma hora. O Partido Trabalhista de Whitlam sofreu uma derrota esmagadora na eleição de 13 de dezembro.",
  "stamp": "A demissão de Whitlam",
  "choices": [
   "Demitir o primeiro-ministro",
   "Aceitar a eleição para metade do Senado",
   "Esperar e pressionar os dois lados a negociar"
  ]
 },
 "1992-chewing-gum": {
  "place": "Singapura",
  "pov": "As pessoas grudam chiclete mascado nos botões dos elevadores, em buracos de fechadura e nos sensores das portas dos trens, o que interrompe o serviço. Limpar tudo isso sai caro. Você é o primeiro-ministro de Singapura.",
  "short": "Goh",
  "did": "Em janeiro de 1992, Goh decidiu pela proibição. Vender chiclete passou a ser crime, com multas de até 2.000 dólares de Singapura.",
  "next": "A proibição da venda continua em vigor. Desde 2004, há uma exceção para os chicletes de uso odontológico e de nicotina, vendidos por farmacêuticos.",
  "stamp": "Singapura proíbe o chiclete",
  "choices": [
   "Proibir a venda de chiclete",
   "Multar quem jogar lixo no chão",
   "Fazer uma campanha de conscientização"
  ]
 },
 "1956-suez": {
  "place": "Cairo",
  "pov": "Os Estados Unidos acabaram de retirar o dinheiro prometido para a sua grande represa. Uma companhia britânico-francesa é dona do canal que corta o seu país e o administra. Você é o presidente do Egito.",
  "short": "Nasser",
  "did": "Em 26 de julho de 1956, Nasser anunciou a nacionalização da Companhia do Canal de Suez. Uma semana antes, os Estados Unidos tinham retirado a ajuda para a represa.",
  "next": "Israel, a Grã-Bretanha e a França invadiram o Egito naquele outono, mas recuaram sob forte pressão. O canal continuou egípcio, e a crise fortaleceu a posição de Nasser.",
  "stamp": "Nasser nacionaliza o Canal de Suez",
  "choices": [
   "Pedir o dinheiro à União Soviética",
   "Nacionalizar a companhia do canal",
   "Construir uma represa menor"
  ]
 },
 "1582-calendar": {
  "place": "Roma",
  "pov": "O calendário está dez dias fora de compasso com o Sol, e a data da Páscoa vai se deslocando junto. Os seus especialistas não concordam sobre como eliminar esses dez dias. Você é o papa.",
  "short": "Gregório XIII",
  "did": "Gregório XIII mandou eliminar dez dias de uma vez. Onde o calendário dele foi adotado, a quinta-feira, 4 de outubro de 1582, foi seguida pela sexta-feira, 15 de outubro.",
  "next": "Espanha, Portugal, Itália e Polônia fizeram a troca em 1582. A Grã-Bretanha esperou até 1752, a Rússia até 1918 e a Grécia até 1923.",
  "stamp": "Dez dias somem de outubro",
  "choices": [
   "Deixar o calendário como está",
   "Eliminar os dias bissextos por quarenta anos",
   "Pular dez dias de uma só vez"
  ]
 },
 "1980-olympics": {
  "place": "Washington",
  "pov": "A União Soviética invadiu o Afeganistão e ignora a sua exigência de retirada. Em poucos meses, ela vai sediar as Olimpíadas de Verão em Moscou. Você é o presidente dos Estados Unidos.",
  "short": "Carter",
  "did": "Carter fixou o prazo de 20 de fevereiro de 1980 para a retirada soviética. Quando o prazo terminou, ele anunciou em 21 de março que os Estados Unidos boicotariam os Jogos.",
  "next": "Mais de 60 países aderiram ao boicote, mas a Grã-Bretanha e a França não. A União Soviética e seus aliados, por sua vez, ficaram de fora dos Jogos de 1984, em Los Angeles.",
  "stamp": "O boicote às Olimpíadas de Moscou",
  "choices": [
   "Manter a sua equipe longe dos Jogos",
   "Enviar a equipe e aplicar outras sanções",
   "Deixar os atletas competirem sob a bandeira olímpica"
  ]
 },
 "1990-de-klerk": {
  "place": "Cidade do Cabo",
  "pov": "A violência está crescendo, e o seu país corre o risco de uma guerra civil racial. O principal movimento de libertação está proibido, e o líder dele está preso desde 1963. Você é o presidente da África do Sul.",
  "short": "De Klerk",
  "did": "Em 2 de fevereiro de 1990, De Klerk anunciou ao parlamento que o Congresso Nacional Africano (CNA) e outros partidos proibidos seriam legalizados. Nelson Mandela saiu da prisão uma semana depois.",
  "next": "Os dois receberam juntos o Prêmio Nobel da Paz em 1993. Em 1994, o CNA venceu as primeiras eleições abertas a todos, e Mandela se tornou presidente, com De Klerk como um dos vice-presidentes.",
  "stamp": "De Klerk liberta Mandela",
  "choices": [
   "Manter os dois e reforçar a segurança",
   "Libertar o líder, mas manter a proibição",
   "Libertar o líder e acabar com a proibição"
  ]
 },
 "1905-norway-king": {
  "place": "Copenhague",
  "pov": "A Noruega acabou de sair da união com a Suécia, e o governo do país lhe oferece a coroa. Mas os noruegueses ainda discutem se querem ter um rei. Você é o príncipe dinamarquês que eles escolheram.",
  "short": "Príncipe Carlos",
  "did": "O príncipe Carlos disse que só aceitaria se os noruegueses aprovassem em um referendo. Em novembro de 1905, 79% votaram a favor da monarquia.",
  "next": "O parlamento o elegeu rei em 18 de novembro de 1905, e ele adotou o nome nórdico antigo Haakon. Reinou como Haakon VII até morrer, em 1957.",
  "stamp": "A Noruega vota por um rei",
  "choices": [
   "Aceitar a coroa na hora",
   "Aceitar só se o povo votar a favor",
   "Recusar e ficar na Dinamarca"
  ]
 },
 "1948-berlin-airlift": {
  "place": "Washington",
  "pov": "Forças soviéticas cortaram todas as rotas de estrada, trem e canal para Berlim Ocidental, que fica bem no meio da zona soviética. O povo da cidade depende de você para ter comida e carvão. Você é o presidente dos Estados Unidos.",
  "short": "Truman",
  "did": "O governo de Truman decidiu ficar e abastecer Berlim Ocidental pelo ar. A ponte aérea começou em 26 de junho de 1948.",
  "next": "Quando terminou, os aviões tinham feito 278.228 voos e transportado mais de 2,3 milhões de toneladas. A União Soviética suspendeu o bloqueio em maio de 1949.",
  "stamp": "A ponte aérea de Berlim",
  "choices": [
   "Sair de Berlim",
   "Forçar a passagem de um comboio armado",
   "Abastecer a cidade pelo ar"
  ]
 },
 "1698-beard-tax": {
  "place": "Moscou",
  "pov": "Você acabou de voltar de uma grande missão diplomática no exterior e quer modernizar o seu país. Os seus nobres usam barba, como mandam a tradição e a Igreja. Você é o czar da Rússia.",
  "short": "Pedro",
  "did": "Em 1698, Pedro criou um imposto sobre a barba, e os homens que pagavam tinham de carregar uma ficha como comprovante. Ele também raspou pessoalmente a barba de alguns dos seus convidados.",
  "next": "Comerciantes ricos pagavam até 100 rublos por ano. Muita gente resistiu, e o imposto durou até Catarina, a Grande, revogá-lo, em 1772.",
  "stamp": "Pedro cobra imposto sobre a barba",
  "choices": [
   "Deixar as barbas em paz",
   "Proibir as barbas de vez",
   "Fazer os homens pagarem para manter a barba"
  ]
 },
 "1957-little-rock": {
  "place": "Washington",
  "pov": "O governador do Arkansas usou a Guarda Nacional para impedir que nove estudantes negros entrassem em uma escola de ensino médio só de brancos. Agora, uma turba de 400 pessoas ameaça os estudantes na escola. Você é o presidente dos Estados Unidos.",
  "short": "Eisenhower",
  "did": "Eisenhower colocou a Guarda Nacional do Arkansas sob comando federal e mandou o exército. Em 25 de setembro de 1957, os nove entraram na escola, escoltados pela 101ª Divisão Aerotransportada.",
  "next": "As tropas ficaram o ano inteiro, e em maio de 1958 Ernest Green se tornou o primeiro aluno negro a se formar na escola. Em setembro daquele ano, o governador fechou as escolas de ensino médio de Little Rock para não integrá-las.",
  "stamp": "Tropas para Little Rock",
  "choices": [
   "Enviar tropas federais à escola",
   "Deixar o caso com o estado do Arkansas",
   "Pedir aos estudantes que esperem um ano"
  ]
 },
 "1977-sadat": {
  "place": "Cairo",
  "pov": "Israel ocupa a Península do Sinai, no seu país, desde 1967. Em 1973, você foi à guerra para recuperá-la. Agora você quer a paz e quer a terra de volta. Você é o presidente do Egito.",
  "short": "Sadat",
  "did": "Sadat voou para Israel, sendo o primeiro líder árabe a fazer uma visita oficial. Em 20 de novembro de 1977, ele discursou no Knesset, em Jerusalém, e propôs a paz.",
  "next": "O Egito e Israel assinaram um tratado de paz em 1979, e Sadat e Begin ganharam o Prêmio Nobel da Paz. Em 1981, Sadat foi assassinado durante um desfile no Cairo.",
  "stamp": "Sadat vai a Jerusalém",
  "choices": [
   "Ir a Jerusalém e falar a Israel",
   "Se preparar para outra guerra",
   "Esperar por uma conferência de paz"
  ]
 },
 "1822-brazil": {
  "place": "Rio de Janeiro",
  "pov": "As Cortes de Lisboa, o parlamento de Portugal, querem devolver o Brasil à antiga condição de colônia. Elas tiraram o que restava dos seus poderes e mandaram você voltar para Portugal. Você é o príncipe regente do Brasil.",
  "short": "Dom Pedro",
  "did": "Em 7 de setembro de 1822, às margens do riacho do Ipiranga, Dom Pedro gritou “Independência ou morte!” e proclamou a independência do Brasil em relação a Portugal.",
  "next": "Ele foi aclamado imperador, com o nome de Dom Pedro I, em 12 de outubro de 1822. Depois de combates que duraram até 1824, Portugal reconheceu a independência do Brasil em 1825.",
  "stamp": "O Brasil declara a independência",
  "choices": [
   "Obedecer e voltar de navio para Portugal",
   "Declarar a independência do Brasil",
   "Continuar como regente de Portugal"
  ]
 },
 "1973-carfree": {
  "place": "Haia",
  "pov": "Os países produtores de petróleo estão boicotando o seu país porque ele apoiou Israel na Guerra do Yom Kippur. Você precisa reduzir rápido o uso de petróleo. Você é o primeiro-ministro da Holanda.",
  "short": "Den Uyl",
  "did": "O governo de Den Uyl proibiu dirigir aos domingos e racionou o combustível. Só trabalhadores essenciais, médicos e serviços de emergência podiam dirigir.",
  "next": "Nas rodovias vazias, as pessoas andavam de bicicleta, passeavam a cavalo e até faziam piqueniques. Na televisão, Den Uyl disse que as coisas nunca voltariam a ser como antes.",
  "stamp": "Domingos sem carros",
  "choices": [
   "Proibir dirigir aos domingos",
   "Aumentar muito o preço da gasolina",
   "Esperar o boicote acabar"
  ]
 },
 "1930-salt": {
  "place": "Ahmedabad",
  "pov": "Você planeja uma campanha de desobediência civil contra o domínio britânico e precisa escolher o primeiro alvo. Um colega quer um boicote aos impostos sobre a terra. A lei britânica proíbe os indianos de coletar ou vender sal. Você é o líder do movimento.",
  "short": "Gandhi",
  "did": "Gandhi partiu em 12 de março de 1930 com 78 seguidores e caminhou cerca de 390 km até o mar, em Dandi. Em 6 de abril, ali, ele quebrou a lei do sal.",
  "next": "Milhões de pessoas quebraram as leis do sal, e mais de 60 mil foram presas. Gandhi foi preso em maio, mas em 1931 negociou com o vice-rei.",
  "stamp": "A Marcha do Sal de Gandhi",
  "choices": [
   "Recusar-se a pagar o imposto sobre a terra",
   "Quebrar a lei do sal em público",
   "Conversar primeiro com o vice-rei"
  ]
 },
 "1783-washington": {
  "place": "Annapolis",
  "pov": "Você passou oito anos longe de casa comandando o exército e, na primavera passada, acabou com a conspiração de Newburgh. A guerra terminou. Você é o comandante em chefe do Exército Continental.",
  "short": "Washington",
  "did": "Em 23 de dezembro de 1783, Washington devolveu o seu cargo ao Congresso, em Annapolis. No dia seguinte, estava em casa, em Mount Vernon, para o primeiro Natal em oito anos.",
  "next": "Dizem que o rei Jorge III comentou que, se Washington fizesse isso, seria o maior homem do mundo. Mais tarde, Washington foi eleito por unanimidade o primeiro presidente.",
  "stamp": "Washington volta para casa",
  "choices": [
   "Usar o exército para tomar o poder",
   "Continuar como comandante em tempo de paz",
   "Renunciar e voltar para casa"
  ]
 },
 "1994-ukraine": {
  "place": "Kiev",
  "pov": "O seu novo país tem o terceiro maior arsenal nuclear do mundo, deixado pela União Soviética. Alguns dizem que você deve mantê-lo para se proteger da Rússia. Você é o presidente da Ucrânia.",
  "short": "Kravtchuk",
  "did": "Em janeiro de 1994, a Ucrânia de Kravtchuk concordou em abrir mão de todas as suas armas nucleares, em troca de apoio econômico e de garantias de segurança dos Estados Unidos e da Rússia.",
  "next": "O Memorando de Budapeste, de 5 de dezembro de 1994, confirmou as garantias. A Ucrânia enviou a sua última ogiva nuclear para a Rússia em 1º de junho de 1996.",
  "stamp": "A Ucrânia abre mão da bomba",
  "choices": [
   "Manter as armas para se proteger",
   "Entregá-las em troca de promessas de segurança",
   "Manter algumas e entregar o resto"
  ]
 },
 "1970-october": {
  "place": "Ottawa",
  "pov": "Militantes separatistas sequestraram um diplomata britânico e um ministro de Quebec e exigem a libertação de presos. O premiê de Quebec pede a você poderes de emergência para prender suspeitos. Você é o primeiro-ministro do Canadá.",
  "short": "Trudeau",
  "did": "Em 16 de outubro de 1970, Trudeau invocou a Lei de Medidas de Guerra, que permitia à polícia prender e manter detidas pessoas só por suspeita. No total, 497 pessoas foram presas.",
  "next": "No dia seguinte, os sequestradores anunciaram que tinham matado o ministro, Pierre Laporte. O diplomata, James Cross, foi libertado em 3 de dezembro.",
  "stamp": "A Lei de Medidas de Guerra de Trudeau",
  "choices": [
   "Usar os poderes de emergência de guerra",
   "Negociar com os sequestradores",
   "Deixar com a polícia de Quebec"
  ]
 },
 "1950-schuman": {
  "place": "Paris",
  "pov": "Cinco anos depois da Segunda Guerra Mundial, a França precisa decidir como viver ao lado da Alemanha Ocidental. Carvão e aço são os materiais mais importantes para fazer armas. Você é o ministro das Relações Exteriores da França.",
  "short": "Schuman",
  "did": "Em 9 de maio de 1950, Schuman propôs colocar a produção de carvão e aço da França e da Alemanha Ocidental sob uma única autoridade. Ele tinha preparado o plano com Jean Monnet.",
  "next": "A ideia era que um país sem controle sobre o carvão e o aço não poderia fazer guerra. Em 1951, seis países assinaram o tratado que a colocou em prática.",
  "stamp": "A Europa reúne carvão e aço",
  "choices": [
   "Manter limites rígidos para a indústria alemã",
   "Reunir o carvão e o aço da França e da Alemanha",
   "Buscar uma aliança militar contra a Alemanha"
  ]
 },
 "1986-marcos": {
  "place": "Manila",
  "pov": "Você foi declarado vencedor de uma eleição antecipada marcada por fraude. Dois altos oficiais mudaram de lado, e mais de dois milhões de pessoas protestam em Manila. Você é o presidente das Filipinas.",
  "short": "Marcos",
  "did": "“Minha ordem é não atacar”, disse Marcos. Por volta da meia-noite de 25 de fevereiro de 1986, a família dele deixou o palácio em um helicóptero dos EUA.",
  "next": "Um senador americano tinha aconselhado que ele saísse de uma vez e sem confusão. Marcos chegou ao Havaí em 26 de fevereiro.",
  "stamp": "O poder do povo em Manila",
  "choices": [
   "Mandar as tropas dispersarem a multidão",
   "Não atacar e deixar o país",
   "Não atacar e ficar no palácio"
  ]
 },
 "1961-wall": {
  "place": "Berlim Oriental",
  "pov": "Cerca de 3,5 milhões de pessoas, um quinto da sua população, foram para o Ocidente, e em Berlim a fronteira ainda está aberta. Você é o líder da Alemanha Oriental.",
  "short": "Ulbricht",
  "did": "Em 13 de agosto de 1961, os berlinenses acordaram e viram que, por ordem de Ulbricht, uma cerca de arame farpado tinha sido erguida durante a noite. Ela virou o Muro de Berlim.",
  "next": "Apenas dois meses antes, ele tinha dito que ninguém pretendia construir um muro. O muro ficou de pé até 9 de novembro de 1989.",
  "stamp": "O Muro de Berlim é erguido",
  "choices": [
   "Fechar a fronteira com uma barreira",
   "Aumentar os salários para as pessoas ficarem",
   "Deixar as pessoas saírem livremente"
  ]
 },
 "1861-sumter": {
  "place": "Washington",
  "pov": "A recém-formada Confederação espera que você entregue o Forte Sumter, um forte federal no porto de Charleston. A guarnição dele está ficando sem comida e sem suprimentos. Você é o presidente dos Estados Unidos.",
  "short": "Lincoln",
  "did": "Em 6 de abril de 1861, Lincoln anunciou que mandaria ao forte apenas mantimentos. Nenhum soldado, arma ou munição seria enviado, a menos que a tentativa encontrasse resistência.",
  "next": "Os canhões confederados abriram fogo às 4 h 30 da manhã de 12 de abril, e o forte se rendeu no dia seguinte. Lincoln então convocou 75.000 voluntários.",
  "stamp": "Lincoln abastece o Forte Sumter",
  "choices": [
   "Retirar a guarnição",
   "Enviar navios de guerra e reforços",
   "Enviar comida, mas sem tropas nem armas"
  ]
 },
 "1922-rome": {
  "place": "Roma",
  "pov": "Milhares de fascistas armados estão marchando sobre a sua capital e exigem que o líder deles seja nomeado primeiro-ministro. O seu governo pede que você assine o estado de sítio. Você é o rei da Itália.",
  "short": "Vítor Emanuel",
  "did": "Vítor Emanuel se recusou a assinar a ordem. Em 30 de outubro de 1922, ele nomeou Mussolini primeiro-ministro.",
  "next": "Em um discurso em 3 de janeiro de 1925, Mussolini assumiu a responsabilidade pelo assassinato de um líder socialista. Esse discurso é visto como o início da ditadura dele.",
  "stamp": "Mussolini é nomeado primeiro-ministro",
  "choices": [
   "Assinar e deixar o exército detê-los",
   "Convocar novas eleições na hora",
   "Recusar e nomear o líder deles"
  ]
 },
 "1998-malaysia": {
  "place": "Kuala Lumpur",
  "pov": "Especuladores derrubaram a sua moeda, o dinheiro estrangeiro fugiu e a sua bolsa de valores perdeu mais de três quartos do valor. O FMI tem os próprios conselhos. Você é o primeiro-ministro da Malásia.",
  "short": "Mahathir",
  "did": "Mahathir desafiou o FMI. Em setembro de 1998, ele fixou o ringgit em 3,80 por dólar americano, proibiu a negociação da moeda fora do país e adotou o controle de capitais.",
  "next": "No mesmo mês, ele demitiu o seu ministro das Finanças, Anwar Ibrahim. A Malásia se recuperou da crise mais rápido do que os vizinhos do Sudeste Asiático.",
  "stamp": "O controle de capitais da Malásia",
  "choices": [
   "Seguir o conselho do FMI",
   "Fixar o câmbio e controlar o capital",
   "Deixar a moeda flutuar e esperar"
  ]
 },
 "1956-brasilia": {
  "place": "Rio de Janeiro",
  "pov": "A Constituição de 1891 determinava que a capital do Brasil saísse do Rio de Janeiro e fosse para um lugar perto do centro do país. Isso nunca aconteceu. Você é o novo presidente do Brasil.",
  "short": "Juscelino Kubitschek",
  "did": "Cumprindo uma promessa de campanha, Juscelino começou a construir Brasília assim que tomou posse, em janeiro de 1956. A cidade ficou pronta em 41 meses e foi inaugurada em 21 de abril de 1960.",
  "next": "Lúcio Costa fez o plano da cidade, e Oscar Niemeyer projetou a maior parte dos prédios públicos. Brasília foi declarada Patrimônio da Humanidade em 1987.",
  "stamp": "O Brasil constrói Brasília",
  "choices": [
   "Construir uma nova capital no interior",
   "Manter a capital no Rio",
   "Transferir alguns ministérios para o interior"
  ]
 },
 "1215-magna-carta": {
  "place": "Runnymede",
  "pov": "Um grupo de barões se rebelou contra você. Eles dizem que você governa como bem entende, comete crimes e impõe multas e castigos enormes e injustos, e já apresentaram as suas exigências. Você é o rei da Inglaterra.",
  "short": "João Sem Terra",
  "did": "Em 15 de junho de 1215, João Sem Terra se encontrou com os barões em Runnymede, às margens do rio Tâmisa, e selou o acordo deles. O documento ficou conhecido como Magna Carta.",
  "next": "Ele prometia que nenhum homem livre seria preso sem o julgamento legal de seus pares. Depois que João morreu, em 1216, o filho dele, Henrique III, a publicou de novo.",
  "stamp": "João Sem Terra sela a Magna Carta",
  "choices": [
   "Esmagar os rebeldes à força",
   "Pedir ao papa que condene os rebeldes",
   "Selar um acordo com os barões"
  ]
 },
 "1981-patco": {
  "place": "Washington",
  "pov": "Quase 13.000 controladores de tráfego aéreo entraram em greve por salários maiores e uma semana de trabalho mais curta. A lei proíbe greves de funcionários federais. Você é o presidente dos Estados Unidos.",
  "short": "Reagan",
  "did": "Reagan deu 48 horas para eles voltarem ao trabalho. Em 5 de agosto de 1981, o governo começou a demitir os mais de 11.000 que não tinham voltado, e os proibiu de exercer a função pelo resto da vida.",
  "next": "O sindicato perdeu o reconhecimento oficial em outubro. Depois, grandes empresas privadas seguiram o exemplo dele e contrataram substitutos para os grevistas.",
  "stamp": "Reagan demite os controladores",
  "choices": [
   "Demitir os grevistas que não voltarem",
   "Aumentar o salário deles para acabar com a greve",
   "Deixar a Justiça resolver"
  ]
 },
 "1964-flag": {
  "place": "Ottawa",
  "pov": "O Canadá hasteia a Union Jack ou a Red Ensign, que combina a Union Jack com o escudo do Canadá. O centenário do país será daqui a três anos. Você é o primeiro-ministro do Canadá.",
  "short": "Pearson",
  "did": "Pearson tinha prometido uma bandeira nova. Uma comissão examinou alguns milhares de projetos, e em dezembro de 1964 o Parlamento aprovou a folha de bordo vermelha.",
  "next": "A rainha Elizabeth II a proclamou em janeiro de 1965. Em 15 de fevereiro, ela foi hasteada pela primeira vez na Colina do Parlamento.",
  "stamp": "A bandeira da folha de bordo",
  "choices": [
   "Manter a Red Ensign",
   "Fazer um referendo sobre a bandeira",
   "Adotar uma bandeira nova e própria"
  ]
 },
 "480bc-salamis": {
  "place": "Atenas",
  "year": "480 a.C.",
  "pov": "Um enorme exército persa está marchando sobre a sua cidade. Um oráculo disse a Atenas que confiasse nas suas “muralhas de madeira”, e a cidade tem uma grande frota nova. Você é um general ateniense.",
  "short": "Temístocles",
  "did": "Temístocles mandou evacuar Atenas: as “muralhas de madeira” eram os seus navios. Em 480 a.C., a frota grega derrotou os persas no estreito de Salamina.",
  "next": "Xerxes voltou para a Ásia com parte do seu exército. O resto foi derrotado no ano seguinte, em Plateias.",
  "stamp": "A batalha de Salamina",
  "choices": [
   "Defender a cidade a partir das muralhas",
   "Abandonar a cidade e lutar no mar",
   "Buscar um acordo com o rei persa"
  ]
 },
 "1893-nz-vote": {
  "place": "Wellington",
  "pov": "O Parlamento aprovou um projeto de lei que dá o voto a todas as mulheres, por 20 votos a 18 na câmara alta. Dezoito conselheiros pedem que você negue o seu consentimento. Você é o governador da Nova Zelândia.",
  "short": "Lorde Glasgow",
  "did": "Em 19 de setembro de 1893, Lorde Glasgow deu o seu consentimento. A Lei Eleitoral deu a todas as mulheres da Nova Zelândia com 21 anos ou mais o direito de votar.",
  "next": "A Nova Zelândia se tornou o primeiro país com governo próprio em que as mulheres podiam votar nas eleições parlamentares. Elas votaram pela primeira vez em 28 de novembro de 1893.",
  "stamp": "As mulheres da Nova Zelândia votam",
  "choices": [
   "Assinar e transformar em lei",
   "Negar o consentimento, como pedido",
   "Devolver o projeto ao Parlamento"
  ]
 },
 "1951-iran-oil": {
  "place": "Teerã",
  "pov": "Uma companhia britânica tem o direito exclusivo sobre o petróleo do Irã, e desde 1914 o governo britânico é dono da maior parte dela. Você é um dos principais deputados do parlamento do Irã.",
  "short": "Mossadegh",
  "did": "Em março de 1951, Mossadegh nacionalizou a Companhia de Petróleo Anglo-Iraniana e cancelou a concessão dela. Em abril, o parlamento o nomeou primeiro-ministro.",
  "next": "A Grã-Bretanha bloqueou o petróleo do Irã, e a produção quase parou. Em agosto de 1953, um golpe apoiado pela CIA o derrubou, e ele morreu em prisão domiciliar em 1967.",
  "stamp": "O Irã nacionaliza o petróleo",
  "choices": [
   "Nacionalizar a companhia de petróleo",
   "Exigir uma parte maior dos lucros",
   "Manter o acordo como está"
  ]
 },
 "1999-mandela": {
  "place": "Pretória",
  "pov": "Está chegando ao fim o seu primeiro mandato de cinco anos como primeiro presidente do país eleito democraticamente. A Constituição permite dois mandatos. Você é o presidente da África do Sul.",
  "short": "Mandela",
  "did": "Mandela não tentou a reeleição. Fiel à sua promessa, deixou o cargo em 1999, depois de um único mandato.",
  "next": "Thabo Mbeki assumiu o lugar dele em 16 de junho de 1999. Mandela passou a trabalhar por meio das suas fundações e morreu em Joanesburgo, em 5 de dezembro de 2013.",
  "stamp": "Mandela deixa a presidência",
  "choices": [
   "Concorrer a um segundo mandato",
   "Mudar as regras e continuar no cargo",
   "Deixar o cargo depois de um mandato"
  ]
 },
 "1983-petrov": {
  "place": "Perto de Moscou",
  "pov": "Três semanas depois de os militares do seu país derrubarem um avião de passageiros coreano, a tela pisca “LANÇAMENTO”: os satélites detectam um míssil americano e, em seguida, mais quatro. Você é o oficial de plantão do centro soviético de alerta antecipado.",
  "short": "Petrov",
  "did": "Petrov comunicou que o alerta era um alarme falso. Ele havia aprendido no treinamento que um ataque americano envolveria centenas de mísseis, e o radar em terra não mostrava nada.",
  "next": "Ele tinha razão: a luz do sol refletida em nuvens altas havia enganado os satélites. Petrov não foi recompensado e, em 2013, recebeu o Prêmio da Paz de Dresden.",
  "stamp": "O alarme falso de Petrov",
  "choices": [
   "Comunicar um ataque nuclear",
   "Esperar o radar confirmar",
   "Comunicar que é alarme falso"
  ]
 },
 "1999-east-timor": {
  "place": "Jacarta",
  "pov": "O seu país invadiu o Timor-Leste em 1975 e o anexou no ano seguinte, mas a ONU nunca reconheceu a anexação. Você é o presidente da Indonésia.",
  "short": "Habibie",
  "did": "Em janeiro de 1999, Habibie anunciou que o Timor-Leste poderia votar. Em 30 de agosto de 1999, 78,5% rejeitaram a autonomia dentro da Indonésia.",
  "next": "Depois da votação, houve violência em massa, até que uma força liderada pela Austrália restabeleceu a ordem. O Timor-Leste se tornou independente em 20 de maio de 2002.",
  "stamp": "O Timor-Leste vai às urnas",
  "choices": [
   "Manter o Timor-Leste como está",
   "Deixar o Timor-Leste votar sobre o futuro",
   "Oferecer autonomia, mas sem votação"
  ]
 },
 "1988-chile": {
  "place": "Santiago",
  "pov": "Você governa há 15 anos. Em um plebiscito sobre você continuar no poder por mais oito anos, o Não venceu. Um projeto de decreto lhe daria poderes de emergência. Você é o governante militar do Chile.",
  "short": "Pinochet",
  "did": "Segundo relatos, Pinochet pensou em ficar, mas o comandante da Força Aérea admitiu que o Não tinha vencido e recusou o decreto de imediato. Sem o apoio da junta, Pinochet aceitou o resultado.",
  "next": "Patricio Aylwin venceu a eleição de dezembro de 1989 e tomou posse em 11 de março de 1990. Pinochet continuou no comando do Exército até 1998, quando foi preso em Londres.",
  "stamp": "O Chile vota Não",
  "choices": [
   "Aceitar o resultado",
   "Usar poderes de emergência para ficar",
   "Convocar outra votação no ano que vem"
  ]
 },
 "1914-belgium": {
  "place": "Bruxelas",
  "pov": "A Alemanha exige que os exércitos dela tenham passagem livre pelo seu país neutro, para atacar a França. Se você aceitar, ela promete restituir tudo depois da guerra. Você é o rei dos belgas.",
  "short": "Alberto",
  "did": "Em 3 de agosto de 1914, o governo de Alberto recusou, classificando a ameaça como uma flagrante violação do direito internacional. No dia seguinte, tropas alemãs invadiram o país.",
  "next": "A invasão levou a Grã-Bretanha a entrar na guerra. Em novembro de 1914, a maior parte da Bélgica estava sob ocupação alemã.",
  "stamp": "A Bélgica diz não à Alemanha",
  "choices": [
   "Deixar os exércitos alemães passarem",
   "Recusar e defender a fronteira",
   "Protestar, mas não lutar"
  ]
 },
 "1961-moon": {
  "place": "Washington",
  "pov": "Um cosmonauta soviético se tornou o primeiro ser humano no espaço, o que constrangeu muito o seu país. O seu primeiro astronauta fez só um voo curto, sem orbitar a Terra. Você é o presidente dos Estados Unidos.",
  "short": "Kennedy",
  "did": "Em 25 de maio de 1961, Kennedy pediu ao Congresso que o país se comprometesse a pousar um homem na Lua e trazê-lo de volta são e salvo antes do fim da década.",
  "next": "Ele pediu de 7 a 9 bilhões de dólares a mais ao longo de cinco anos. Em 20 de julho de 1969, Neil Armstrong pisou na Lua.",
  "stamp": "Kennedy escolhe a Lua",
  "choices": [
   "Deixar o espaço para os cientistas",
   "Apostar em satélites mais baratos",
   "Ter como meta um pouso na Lua"
  ]
 },
 "1839-opium": {
  "place": "Pequim",
  "pov": "Milhões de súditos seus estão viciados em ópio vendido por comerciantes britânicos. Alguns funcionários dizem que você deveria taxar esse comércio e lucrar com ele. Você é o imperador da China.",
  "short": "Daoguang",
  "did": "Daoguang decidiu acabar com o comércio e enviou Lin Zexu a Cantão. Lin confiscou cerca de 20 mil caixas dos comerciantes britânicos e, a partir de 3 de junho de 1839, mandou destruí-las.",
  "next": "A Grã-Bretanha usou a atitude de Lin como pretexto para a guerra. A Primeira Guerra do Ópio durou até 1842 e obrigou a China a se abrir ao comércio exterior.",
  "stamp": "A China destrói o ópio",
  "choices": [
   "Legalizar e tributar o comércio de ópio",
   "Pedir que a Grã-Bretanha pare o envio",
   "Acabar com o comércio e punir os traficantes"
  ]
 },
 "1921-treaty": {
  "place": "Londres",
  "pov": "Em Londres, a Grã-Bretanha oferece ao seu país o autogoverno como Estado Livre da Irlanda, com um juramento à Coroa. Assine agora, diz ela, ou enfrente uma “guerra imediata e terrível”. Você é um negociador irlandês.",
  "short": "Collins",
  "did": "Collins assinou o Tratado Anglo-Irlandês às 2 h 20 da madrugada de 6 de dezembro de 1921. Disse que talvez tivesse assinado a própria sentença de morte.",
  "next": "O parlamento irlandês o aprovou por 64 votos a 57. Collins foi morto em agosto de 1922, em uma emboscada de opositores do tratado.",
  "stamp": "O Tratado Anglo-Irlandês",
  "choices": [
   "Assinar o tratado",
   "Recusar e voltar à guerra",
   "Pedir tempo para consultar Dublin"
  ]
 },
 "1970-nigeria": {
  "place": "Lagos",
  "pov": "Depois de dois anos e meio de guerra civil, o Estado separatista de Biafra se rendeu. Mais de um milhão de pessoas morreram, muitas de fome. Você é o chefe do governo militar da Nigéria.",
  "short": "Gowon",
  "did": "Ao aceitar a rendição de Biafra, em janeiro de 1970, Gowon declarou que não haveria vencedores nem vencidos. A maioria dos que haviam aderido à revolta recebeu anistia.",
  "next": "Os anos seguintes foram declarados um tempo de reabilitação, reconstrução e reconciliação. Em julho de 1975, Gowon foi derrubado por um golpe enquanto estava no exterior.",
  "stamp": "Sem vencedores nem vencidos",
  "choices": [
   "Punir os líderes e combatentes de Biafra",
   "Declarar que não há vencedor nem vencido",
   "Manter o leste sob governo militar"
  ]
 },
 "1861-serfs": {
  "place": "São Petersburgo",
  "pov": "A derrota na Guerra da Crimeia mostrou como o seu país é fraco. Mais de 20 milhões de pessoas são servos, que não são livres. Você é o imperador da Rússia.",
  "short": "Alexandre II",
  "did": "Em 3 de março de 1861, Alexandre libertou os servos por manifesto. Era melhor que isso viesse de cima, disse ele, do que esperar que viesse de baixo.",
  "next": "Os camponeses tinham de pagar pela terra ao longo de 49 anos, e em muitos lugares houve revoltas. Em 1881, revolucionários assassinaram Alexandre.",
  "stamp": "A Rússia liberta os servos",
  "choices": [
   "Libertar os servos por decreto",
   "Amenizar a servidão aos poucos",
   "Manter a servidão para acalmar a nobreza"
  ]
 },
 "1938-oil": {
  "place": "Cidade do México",
  "pov": "As empresas estrangeiras de petróleo se recusam a obedecer à Suprema Corte do seu país, que mandou aumentar os salários dos trabalhadores e melhorar as condições de trabalho. Elas dizem que isso as levaria à falência. Você é o presidente do México.",
  "short": "Cárdenas",
  "did": "Em 18 de março de 1938, Cárdenas expropriou quase todas as empresas petrolíferas estrangeiras. Cinco dias depois, 200 mil pessoas fizeram uma manifestação de apoio a ele, segundo a imprensa.",
  "next": "Em junho de 1938, ele criou a empresa estatal de petróleo, a Pemex. Em 1942, o México concordou em pagar cerca de 29 milhões de dólares de indenização a empresas americanas.",
  "stamp": "O México assume o seu petróleo",
  "choices": [
   "Recuar para manter os investidores",
   "Multar as empresas até que paguem",
   "Nacionalizar as empresas de petróleo"
  ]
 },
 "1077-canossa": {
  "place": "Canossa",
  "pov": "Você rompeu com o papa. Ele o excomungou, e os seus príncipes juram não reconhecê-lo se a excomunhão não for suspensa dentro de um ano. Você é o rei da Alemanha.",
  "short": "Henrique",
  "did": "Henrique foi ao castelo de Canossa, onde o papa estava hospedado, e esperou três dias no portão, como penitente. Em 28 de janeiro de 1077, o papa o absolveu.",
  "next": "Pouco depois, Henrique retomou o conflito e foi excomungado de novo. Ele venceu uma guerra civil, invadiu Roma e pôs no lugar do papa um papa escolhido por ele.",
  "stamp": "Henrique IV em Canossa",
  "choices": [
   "Combater os príncipes que o desafiam",
   "Ir até o papa e pedir perdão",
   "Substituir o papa por um papa seu"
  ]
 },
 "1991-semipalatinsk": {
  "place": "Alma-Ata",
  "pov": "De 1949 a 1989, a União Soviética realizou mais de 450 explosões nucleares na sua república, e a poeira radioativa afetou 1,5 milhão de pessoas. O local de testes continua aberto. Você é o presidente do Cazaquistão.",
  "short": "Nazarbayev",
  "did": "Em 29 de agosto de 1991, meses antes de o Cazaquistão se tornar independente, o governo de Nazarbayev fechou o local de testes de Semipalatinsk.",
  "next": "O Cazaquistão acabou abrindo mão de todas as armas nucleares. Mais tarde, a ONU declarou o 29 de agosto o Dia Internacional contra os Testes Nucleares.",
  "stamp": "O Cazaquistão acaba com os testes",
  "choices": [
   "Fechar o local de testes para sempre",
   "Deixar Moscou decidir",
   "Manter o local como moeda de troca"
  ]
 },
 "1848-denmark": {
  "place": "Copenhague",
  "pov": "Você virou rei há dois meses e já enfrenta pedidos de uma constituição. Agora, uma grande assembleia popular na capital exige um novo governo que inclua os liberais. Você é o rei da Dinamarca.",
  "short": "Frederico",
  "did": "No dia seguinte, Frederico aceitou a exigência e, com ela, o fim do poder absoluto. Em 5 de junho de 1849, a Dinamarca ganhou a sua primeira constituição livre.",
  "next": "A constituição criou um parlamento e fez da Dinamarca uma monarquia constitucional. Frederico se tornou um dos reis mais amados do país.",
  "stamp": "A Dinamarca acaba com o absolutismo",
  "choices": [
   "Recusar e manter o poder absoluto",
   "Prometer reformas daqui a alguns anos",
   "Aceitar e acabar com o poder absoluto"
  ]
 },
 "1958-guinea": {
  "place": "Conacri",
  "pov": "A França faz um referendo em toda a União Francesa sobre uma nova constituição francesa. No ano passado, o seu partido ganhou todas as cadeiras da assembleia da Guiné, menos quatro. Você é o líder do maior partido da Guiné.",
  "short": "Sékou Touré",
  "did": "O partido de Sékou Touré fez campanha pelo não. Em 28 de setembro de 1958, mais de 95% dos eleitores da Guiné rejeitaram a constituição e, em 2 de outubro, a Guiné declarou a independência.",
  "next": "A França se retirou por completo e suspendeu toda a ajuda. A Guiné, tendo Touré como primeiro líder, pediu ajuda à União Soviética.",
  "stamp": "A Guiné vota não",
  "choices": [
   "Fazer campanha pelo sim e ficar com a França",
   "Deixar as pessoas votarem sem orientação",
   "Fazer campanha pelo não e pela independência"
  ]
 },
 "1933-banks": {
  "place": "Washington",
  "pov": "Milhares de bancos faliram, e pessoas assustadas correm para sacar as suas economias antes que mais bancos fechem. Você acabou de tomar posse. Você é o presidente dos Estados Unidos.",
  "short": "Roosevelt",
  "did": "Em 6 de março de 1933, Roosevelt mandou todos os bancos suspenderem as atividades. O Congresso aprovou uma lei bancária de emergência em 9 de março, no mesmo dia em que ela foi apresentada.",
  "next": "Em 12 de março, ele explicou a medida na sua primeira conversa ao pé da lareira, pelo rádio. Quando os bancos reabriram, os americanos devolveram 1 bilhão de dólares a eles em uma semana.",
  "stamp": "Roosevelt fecha os bancos",
  "choices": [
   "Fechar todos os bancos por alguns dias",
   "Garantir todos os depósitos de uma vez",
   "Deixar os bancos fracos quebrarem"
  ]
 },
 "49bc-rubicon": {
  "place": "Rubicão",
  "year": "49 a.C.",
  "pov": "A sua guerra na Gália está ganha. O Senado manda você dissolver o exército e voltar a Roma, perdendo a imunidade que o seu cargo lhe dá. Você é o governador da Gália.",
  "short": "César",
  "did": "Em janeiro de 49 a.C., César levou a 13ª Legião através do Rubicão e entrou na Itália. Pela lei da República, isso era um ato de guerra.",
  "next": "Pompeu, os cônsules e boa parte do Senado fugiram de Roma. A guerra civil que se seguiu fez de César ditador perpétuo.",
  "stamp": "César cruza o Rubicão",
  "choices": [
   "Dissolver o exército e ir a Roma",
   "Ficar na Gália e continuar negociando",
   "Entrar na Itália com o seu exército"
  ]
 },
 "1888-golden-law": {
  "place": "Rio de Janeiro",
  "pov": "O seu pai, o imperador, está na Europa para tratamento médico, e você governa no lugar dele. Os filhos de mães escravizadas já nascem livres, mas a escravidão continua. Você é a regente do Brasil.",
  "short": "Princesa Isabel",
  "did": "Em 13 de maio de 1888, Isabel assinou a Lei Áurea, que acabou de vez com a escravidão no Brasil. O Brasil foi o último país do Hemisfério Ocidental a aboli-la.",
  "next": "A monarquia perdeu o apoio dos fazendeiros escravocratas. Em 15 de novembro de 1889, um golpe militar depôs o pai dela, e a família partiu para o exílio na Europa.",
  "stamp": "O Brasil acaba com a escravidão",
  "choices": [
   "Abolir a escravidão imediatamente",
   "Libertar aos poucos, mediante pagamento",
   "Deixar para a volta do imperador"
  ]
 },
 "1956-speech": {
  "place": "Moscou",
  "pov": "Na época de Stálin, já falecido, os expurgos levaram à tortura e à execução de membros inocentes do partido, e mesmo assim ainda existe um culto à personalidade em torno dele. O congresso do seu partido termina hoje. Você é o líder do Partido Comunista soviético.",
  "short": "Khrushchov",
  "did": "Em 25 de fevereiro de 1956, em uma sessão fechada, Khrushchov condenou os expurgos de Stálin e o culto à personalidade em torno dele. O discurso devia permanecer secreto.",
  "next": "Uma cópia chegou ao Ocidente e foi enviada ao New York Times. Naquele ano, houve protestos na Polônia e na Hungria, e na Hungria tropas soviéticas intervieram.",
  "stamp": "Khrushchov denuncia Stálin",
  "choices": [
   "Continuar elogiando Stálin em público",
   "Denunciar os crimes de Stálin ao partido",
   "Libertar presos em silêncio e não dizer nada"
  ]
 },
 "1854-japan": {
  "place": "Edo",
  "pov": "Navios de guerra americanos voltaram para buscar uma resposta: querem portos para se abastecer e proteção para marinheiros náufragos. Os seus senhores feudais estão divididos ao meio. Você é o chefe do conselho do xogum.",
  "short": "Abe",
  "did": "O enviado de Abe assinou a Convenção de Kanagawa em 31 de março de 1854. O Japão abriu dois portos, Shimoda e Hakodate, mas o tratado não dava direito de comerciar.",
  "next": "Abe foi obrigado a renunciar em 1855. Um tratado comercial de verdade com os Estados Unidos veio em 1858, e em 1868 o imperador assumiu formalmente o controle do Japão.",
  "stamp": "O Japão abre dois portos",
  "choices": [
   "Recusar e se preparar para lutar",
   "Abrir o país ao comércio",
   "Abrir dois portos, mas sem comércio"
  ]
 },
 "1973-embargo": {
  "place": "Riad",
  "pov": "O Egito entrou em guerra contra Israel, e os Estados Unidos estão reabastecendo o exército israelense. O petróleo do seu reino é vendido para mercados do mundo inteiro. Você é o rei da Arábia Saudita.",
  "short": "Faisal",
  "did": "Faisal retirou o petróleo saudita do mercado mundial e foi a principal força por trás do embargo petrolífero árabe contra os Estados Unidos.",
  "next": "Quando o embargo acabou, em março de 1974, o preço do petróleo tinha subido de 3 dólares o barril para quase 12. Faisal foi assassinado um ano depois.",
  "stamp": "O embargo petrolífero árabe",
  "choices": [
   "Continuar vendendo petróleo como sempre",
   "Cortar a venda de petróleo para punir os EUA",
   "Enviar tropas para ajudar o Egito"
  ]
 },
 "1812-moscow": {
  "place": "Fili",
  "pov": "Napoleão venceu uma batalha sangrenta em Borodino e marcha sobre Moscou. Os seus generais estão divididos: lutar de novo diante da cidade ou recuar. Você é o comandante do exército russo.",
  "short": "Kutuzov",
  "did": "Em um conselho na aldeia de Fili, em 13 de setembro de 1812, Kutuzov decidiu abandonar Moscou. Com a perda de Moscou, disse ele, a Rússia não estava perdida.",
  "next": "O exército francês entrou em Moscou, mas saiu de lá em 19 de outubro. De uns 600 mil homens, apenas algumas dezenas de milhares escaparam da Rússia até dezembro.",
  "stamp": "Kutuzov abre mão de Moscou",
  "choices": [
   "Travar mais uma batalha antes de Moscou",
   "Abrir mão de Moscou para salvar o exército",
   "Pedir a Napoleão as condições de paz"
  ]
 },
 "1974-pardon": {
  "place": "Washington",
  "pov": "O seu antecessor renunciou há um mês por causa do escândalo de Watergate. Ele pode ser processado criminalmente, e o país está profundamente dividido. Você é o presidente dos Estados Unidos.",
  "short": "Ford",
  "did": "Em 8 de setembro de 1974, Ford concedeu a Richard Nixon um perdão “pleno, livre e absoluto” por quaisquer crimes que ele tivesse cometido no cargo.",
  "next": "A aprovação de Ford caiu de 71% para 50%, e ele perdeu por pouco a eleição de 1976. Em 2001, recebeu o prêmio Profile in Courage pelo perdão.",
  "stamp": "Ford perdoa Nixon",
  "choices": [
   "Perdoá-lo depois de um julgamento",
   "Deixar a Justiça seguir o seu curso",
   "Perdoá-lo por completo"
  ]
 },
 "1946-nhs": {
  "place": "Londres",
  "pov": "Os hospitais da Grã-Bretanha são administrados por instituições de caridade ou por autoridades locais. O seu governo planeja um serviço nacional de saúde, gratuito para todos. Você é o ministro da Saúde.",
  "short": "Bevan",
  "did": "A Lei do Serviço Nacional de Saúde de Bevan, de 1946, passou os hospitais de caridade e os das autoridades locais para a propriedade pública nacional, administrados por conselhos regionais.",
  "next": "O Serviço Nacional de Saúde começou a funcionar em 5 de julho de 1948. A lei dizia que os seus serviços deveriam ser gratuitos.",
  "stamp": "A saúde gratuita da Grã-Bretanha",
  "choices": [
   "Passar todos os hospitais para o poder público",
   "Deixar os hospitais com as autoridades locais",
   "Pagar hospitais de caridade para atender a todos"
  ]
 },
 "1985-nuclear-free": {
  "place": "Wellington",
  "pov": "Você foi eleito com uma política de país livre de armas nucleares. Agora, o seu principal aliado quer enviar um navio de guerra, mas não confirma nem nega que ele tenha capacidade nuclear. Você é o primeiro-ministro da Nova Zelândia.",
  "short": "Lange",
  "did": "Em 4 de fevereiro de 1985, o governo disse não. Lange afirmou que a chegada do navio seria vista como uma rendição, fosse qual fosse a verdade sobre o seu armamento.",
  "next": "Os Estados Unidos encerraram a garantia de segurança que davam à Nova Zelândia. Em 1987, uma lei tornou o território e as águas da Nova Zelândia livres de armas nucleares.",
  "stamp": "A Nova Zelândia sem armas nucleares",
  "choices": [
   "Permitir a visita do navio de guerra",
   "Recusar a entrada do navio",
   "Aceitar o navio, mas pedir garantias"
  ]
 },
 "1793-macartney": {
  "place": "Pequim",
  "pov": "Um enviado britânico pede a você mais portos abertos ao comércio britânico, uma embaixada permanente na sua capital e uma pequena ilha na sua costa para os comerciantes britânicos. Você é o imperador da China.",
  "short": "Qianlong",
  "did": "Qianlong rejeitou todos os pedidos. Em uma carta ao rei Jorge III, escreveu que o seu império possuía todas as coisas e não precisava de produtos manufaturados estrangeiros.",
  "next": "A embaixada voltou a Londres sem uma única concessão. O episódio antecipava a pressão cada vez maior da Grã-Bretanha para que a China se abrisse ao comércio.",
  "stamp": "A China recusa os britânicos",
  "choices": [
   "Atender aos pedidos dos britânicos",
   "Abrir mais um porto, e nada além disso",
   "Recusar todos os pedidos"
  ]
 },
 "1940-visas": {
  "place": "Kaunas",
  "pov": "Refugiados judeus que fogem da perseguição se aglomeram diante do seu consulado, implorando por vistos de trânsito. O seu ministério em Tóquio manda dar visto só a quem tem documentos para um destino final. Você é o vice-cônsul do Japão na Lituânia.",
  "short": "Sugihara",
  "did": "Sugihara escreveu os vistos à mão mesmo assim, durante 18 a 20 horas por dia, segundo relatos. De 18 de julho a 28 de agosto de 1940, ele emitiu mais de 2.100 vistos.",
  "next": "Muitos refugiados atravessaram a União Soviética e foram de navio até Kobe, no Japão. Em 1984, o Yad Vashem declarou Sugihara Justo entre as Nações.",
  "stamp": "Os vistos de Sugihara",
  "choices": [
   "Seguir as regras do ministério",
   "Escrever vistos para todos que pedirem",
   "Perguntar de novo a Tóquio e esperar"
  ]
 },
 "1948-israel": {
  "place": "Tel Aviv",
  "pov": "O mandato britânico na Palestina termina em poucos dias. Estados árabes ameaçam atacar, e os Estados Unidos propõem uma trégua no lugar da independência imediata. Você é o chefe da Agência Judaica.",
  "short": "Ben-Gurion",
  "did": "Em 12 de maio de 1948, a Administração do Povo votou pela independência, com seis dos dez membros presentes a favor. Em 14 de maio, Ben-Gurion proclamou o Estado de Israel em Tel Aviv.",
  "next": "Os Estados Unidos o reconheceram onze minutos depois da meia-noite. Em 15 de maio, forças do Egito, da Transjordânia, do Iraque e da Síria entraram no antigo mandato.",
  "stamp": "Israel declara a independência",
  "choices": [
   "Aceitar a proposta americana de trégua",
   "Pedir, em vez disso, uma tutela da ONU",
   "Declarar a independência com a saída da Grã-Bretanha"
  ]
 },
 "1995-bogota-mimes": {
  "place": "Bogotá",
  "pov": "As ruas da sua cidade são caóticas e mortais, com cerca de 1.300 mortes no trânsito por ano. Os seus 2.000 policiais de trânsito têm fama de aceitar propina. Você é o novo prefeito de Bogotá.",
  "short": "Mockus",
  "did": "Mockus acabou com a polícia de trânsito. Em seu lugar, 20 mímicos passaram a seguir os pedestres que desrespeitavam as regras de travessia, e a ideia fez tanto sucesso que mais 400 foram treinados.",
  "next": "Ele também distribuiu 350 mil cartões com o polegar para cima e para baixo, para os cidadãos julgarem o comportamento uns dos outros. As mortes no trânsito caíram em mais da metade, para cerca de 600 por ano.",
  "stamp": "Os mímicos do trânsito de Bogotá",
  "choices": [
   "Extinguir a polícia de trânsito e chamar mímicos",
   "Treinar de novo os policiais e aumentar o salário",
   "Contratar mais policiais e aumentar as multas"
  ]
 },
 "1970-warsaw": {
  "place": "Varsóvia",
  "pov": "Você veio a Varsóvia para assinar um tratado que aceita a fronteira ocidental da Polônia. Agora, vai depositar uma coroa de flores no memorial da Revolta do Gueto de Varsóvia. Você é o chanceler da Alemanha Ocidental.",
  "short": "Brandt",
  "did": "Depois de depositar a coroa, Brandt se ajoelhou de repente e ficou ali, em silêncio, por cerca de 30 segundos. “Fiz o que os seres humanos fazem quando as palavras lhes faltam”, disse ele mais tarde.",
  "next": "Em uma pesquisa da Der Spiegel, 48% dos alemães ocidentais acharam o gesto exagerado e 41%, apropriado. Em 1971, Brandt recebeu o Prêmio Nobel da Paz.",
  "stamp": "Brandt se ajoelha em Varsóvia",
  "choices": [
   "Depositar a coroa e baixar a cabeça",
   "Ajoelhar-se em silêncio no memorial",
   "Pedir desculpas em voz alta no local"
  ]
 },
 "1895-three-chiefs": {
  "place": "Bechuanalândia",
  "pov": "A Companhia Britânica da África do Sul, de Cecil Rhodes, tenta assumir o controle de Bechuanalândia, um protetorado britânico no sul da África, e com ela as suas terras. Você é um dos chefes tswana.",
  "short": "Khama",
  "did": "Em 1895, Khama foi à Grã-Bretanha com outros dois chefes, Sebele e Bathoen, para defender a causa deles diante do secretário colonial, Joseph Chamberlain. Eles também conseguiram uma audiência com a rainha Vitória.",
  "next": "Em 6 de novembro de 1895, eles aceitaram ceder terras para uma ferrovia e impediram a entrada da companhia. Bechuanalândia se tornou independente, com o nome de Botsuana, em 30 de setembro de 1966.",
  "stamp": "Três chefes vão a Londres",
  "choices": [
   "Aceitar o governo da companhia",
   "Convocar os seus guerreiros para resistir",
   "Ir a Londres defender a sua causa"
  ]
 },
 "1928-alphabet": {
  "place": "Ancara",
  "pov": "O turco é escrito com letras árabes há mais de 1.000 anos, mas elas não distinguem algumas das suas vogais. A sua comissão propõe passar para as letras latinas em cinco anos. Você é o presidente da Turquia.",
  "short": "Atatürk",
  "did": "Atatürk achou que cinco anos era tempo demais e reduziu a transição para três meses. O novo alfabeto virou lei em 1º de novembro de 1928.",
  "next": "A partir de 1º de janeiro de 1929, ele passou a ser obrigatório em toda a comunicação pública. Atatürk percorreu o país explicando o novo alfabeto, e a alfabetização aumentou muito.",
  "stamp": "A Turquia troca de alfabeto",
  "choices": [
   "Fazer a mudança em poucos meses",
   "Levar os cinco anos, como proposto",
   "Manter as letras árabes, afinal"
  ]
 },
 "1951-macarthur": {
  "place": "Washington",
  "pov": "O comandante das suas tropas na Coreia quer bombardear a China, e a briga entre vocês já é pública. Em uma carta lida no Congresso, ele diz que não há substituto para a vitória. Você é o presidente dos Estados Unidos.",
  "short": "Truman",
  "did": "Em 11 de abril de 1951, Truman destituiu MacArthur de seus comandos e os passou ao tenente-general Matthew Ridgway.",
  "next": "MacArthur voltou para casa e foi recebido como herói, e a opinião pública ficou fortemente contra Truman. Mais tarde, uma investigação conjunta concluiu que a destituição estava dentro dos poderes constitucionais do presidente.",
  "stamp": "Truman demite MacArthur",
  "choices": [
   "Repreendê-lo, mas mantê-lo no comando",
   "Destituí-lo do comando",
   "Deixar que ele amplie a guerra para a China"
  ]
 },
 "1534-supremacy": {
  "place": "Londres",
  "pov": "Há anos o papa se recusa a anular o seu casamento com Catarina de Aragão, que não lhe deu nenhum filho homem. Você deseja desesperadamente um herdeiro homem. Você é o rei da Inglaterra.",
  "short": "Henrique",
  "did": "Henrique fez o Parlamento transferir a autoridade religiosa do papa para a Coroa. Em 3 de novembro de 1534, o Parlamento aprovou o Ato de Supremacia, que o tornou chefe supremo da Igreja da Inglaterra.",
  "next": "A Coroa passou a controlar as riquezas e os edifícios da antiga Igreja. A filha católica dele, Maria I, revogou o ato em 1554.",
  "stamp": "Henrique VIII rompe com Roma",
  "choices": [
   "Continuar pressionando o papa pela anulação",
   "Continuar casado e fazer as pazes com Roma",
   "Romper com Roma e chefiar a Igreja"
  ]
 },
 "1990-benin": {
  "place": "Cotonou",
  "pov": "Depois de um ano de greves por salários atrasados, uma conferência nacional se declarou soberana e escolheu um novo primeiro-ministro. Alguns dos seus oficiais se opõem. Você é o presidente do Benim.",
  "short": "Kérékou",
  "did": "Kérékou chamou aquilo de “golpe civil”, mas não agiu contra a conferência. Continuou presidente, mas perdeu a maior parte do poder.",
  "next": "Ele perdeu a eleição multipartidária de março de 1991 para o seu primeiro-ministro, Nicéphore Soglo, e deixou o cargo. Em 1996, voltou à presidência em uma votação livre.",
  "stamp": "A conferência nacional do Benim",
  "choices": [
   "Mandar tropas dissolverem a conferência",
   "Aceitá-la e ficar com pouco poder",
   "Renunciar e deixar o país"
  ]
 },
 "1424-treasure-fleets": {
  "place": "Pequim",
  "pov": "O seu falecido pai mandou grandes frotas do tesouro ao exterior seis vezes desde 1405. Muita gente abandonou suas casas por causa dos impostos pesados e das exigências do Estado. Você é o novo imperador da China.",
  "short": "Hongxi",
  "did": "Em 7 de setembro de 1424, dia em que subiu ao trono, Hongxi encerrou oficialmente as longas viagens lideradas por Zheng He.",
  "next": "Hongxi morreu em maio de 1425. Mais uma viagem partiu sob o filho dele, o imperador Xuande, e em 1433 as viagens terminaram para sempre.",
  "stamp": "As frotas do tesouro param",
  "choices": [
   "Parar com novas viagens",
   "Mandar as frotas ao mar de novo",
   "Mandar frotas menores, com menos frequência"
  ]
 },
 "1938-munich": {
  "place": "Munique",
  "pov": "Hitler exige os Sudetos, uma parte da Tchecoslováquia onde vivem três milhões de pessoas, principalmente de etnia alemã. Ele deu um prazo à Tchecoslováquia: ceder a região ou enfrentar a guerra. Você é o primeiro-ministro britânico.",
  "short": "Chamberlain",
  "did": "Por volta de 1 h 30 da madrugada de 30 de setembro de 1938, Chamberlain assinou o Acordo de Munique com Hitler, Mussolini e Daladier, da França, entregando os Sudetos a Hitler. Nenhum representante tcheco estava presente.",
  "next": "De volta ao país, ele chamou o acordo de “paz para o nosso tempo”. Em março de 1939, tropas alemãs ocuparam o resto da Tchecoslováquia.",
  "stamp": "O Acordo de Munique",
  "choices": [
   "Concordar que Hitler fique com ela",
   "Avisar a Hitler que a Grã-Bretanha lutará",
   "Ficar de fora: a briga não é da Grã-Bretanha"
  ]
 },
 "1519-cortes-ships": {
  "place": "Veracruz",
  "pov": "Você partiu para o México com cerca de 500 homens, contra as ordens do governador de Cuba. Agora alguns dos seus tripulantes tentam tomar um navio e voltar. Você é o comandante da expedição.",
  "short": "Cortés",
  "did": "Em julho de 1519, Cortés mandou afundar de propósito os seus dez navios restantes em Villa Rica de la Vera Cruz, para eliminar qualquer ideia de retirada.",
  "next": "Ele marchou para o interior e, em 8 de novembro de 1519, Montezuma II o recebeu em paz. Em 13 de agosto de 1521, ele já tinha conquistado a capital asteca, Tenochtitlán.",
  "stamp": "Cortés afunda os seus navios",
  "choices": [
   "Deixar os que duvidam voltarem para Cuba",
   "Punir os conspiradores e ficar com os navios",
   "Afundar os navios para ninguém poder sair"
  ]
 },
 "1952-andhra": {
  "place": "Nova Délhi",
  "pov": "Um ativista morreu no 58º dia de uma greve de fome pela criação de um estado para quem fala telugo. Houve distúrbios, e a polícia abriu fogo. Você é o primeiro-ministro da Índia.",
  "short": "Nehru",
  "did": "Em poucos dias, Nehru anunciou que seria formado o estado separado de Andhra. Ele foi criado para os falantes de telugo em 1º de outubro de 1953, com capital em Kurnool.",
  "next": "O caso abriu um precedente para traçar os estados pela língua. Em 1956, o Parlamento aprovou a Lei de Reorganização dos Estados, que previa 14 estados e seis territórios da União.",
  "stamp": "Um estado para quem fala telugo",
  "choices": [
   "Não ceder: nenhum estado traçado por língua",
   "Aceitar um estado separado para o telugo",
   "Pedir antes que uma comissão estude o caso"
  ]
 },
 "1883-health-insurance": {
  "place": "Berlim",
  "pov": "Um movimento socialista cresce entre os trabalhadores do seu país, embora você já tenha proibido organizações, reuniões e jornais socialistas. Você é o chanceler da Alemanha.",
  "short": "Bismarck",
  "did": "Em 1883, o Reichstag aprovou a lei de seguro-doença de Bismarck para os trabalhadores da indústria. Os trabalhadores pagavam dois terços do custo, e os patrões, um terço.",
  "next": "O seguro contra acidentes veio em 1884. Em 1889, a Alemanha foi o primeiro país com seguro para a velhice, a partir dos 70 anos.",
  "stamp": "Bismarck cria seguro para trabalhadores",
  "choices": [
   "Reprimir os socialistas com ainda mais dureza",
   "Deixar o bem-estar dos trabalhadores com os patrões",
   "Criar por lei um seguro-doença para os trabalhadores"
  ]
 },
 "1985-nyerere": {
  "place": "Dar es Salaam",
  "pov": "Você lidera o país há mais de 20 anos. A sua política socialista para a agricultura fracassou, e você briga com o FMI por causa da dívida. Há uma eleição marcada. Você é o presidente da Tanzânia.",
  "short": "Nyerere",
  "did": "Nyerere anunciou que se retiraria depois da eleição de 1985. Em 5 de novembro de 1985, Ali Hassan Mwinyi o sucedeu na presidência.",
  "next": "Mwinyi reverteu muitas das políticas de Nyerere. Nyerere continuou presidente do partido no poder até 1990, apoiando a mudança para o sistema multipartidário.",
  "stamp": "Nyerere deixa o poder",
  "choices": [
   "Deixar o cargo e passar o poder",
   "Concorrer de novo e manter o rumo",
   "Continuar, mas mudar as suas políticas"
  ]
 },
 "1187-jerusalem": {
  "place": "Jerusalém",
  "pov": "O seu exército abriu brecha nas muralhas de Jerusalém. Você jurou tomar a cidade pela força, mas os defensores ameaçam destruir os lugares santos e matar 5.000 prisioneiros muçulmanos. Você é o sultão.",
  "short": "Saladino",
  "did": "Saladino aceitou a rendição da cidade em 2 de outubro de 1187. As pessoas podiam sair pagando um resgate: dez dinares por homem e cinco por mulher.",
  "next": "Uns 15 mil que não puderam pagar foram escravizados, embora Saladino tenha libertado os idosos. Os cristãos latinos responderam com a Terceira Cruzada, em 1189.",
  "stamp": "Saladino toma Jerusalém",
  "choices": [
   "Invadir a cidade, como jurou",
   "Deixar o povo comprar a liberdade",
   "Deixar todos saírem sem pagar"
  ]
 },
 "1972-curitiba": {
  "place": "Curitiba",
  "pov": "Um plano para fechar seis quadras da rua principal da sua cidade aos carros está travado há anos por causa dos lojistas. O seu chefe de obras públicas diz que a obra leva quatro meses. Você é o prefeito de Curitiba.",
  "short": "Lerner",
  "did": "Lerner mandou fazer a obra em 48 horas. Em 20 de maio de 1972, parte da rua foi fechada aos carros, e a pavimentação foi feita naquele fim de semana.",
  "next": "Quando um clube de carros planejou desfilar com carros antigos pela rua, funcionários da prefeitura estenderam rolos de papel no chão e entregaram tintas às crianças que passavam. Em poucos dias, os lojistas já queriam que a área sem carros fosse ampliada.",
  "stamp": "Uma rua de Curitiba para as pessoas",
  "choices": [
   "Esperar os lojistas concordarem",
   "Fechar a rua aos carros em 48 horas",
   "Levar os quatro meses que a obra pede"
  ]
 },
 "1902-coal-strike": {
  "place": "Washington",
  "pov": "Quase 150 mil mineiros de carvão estão em greve desde maio. Os donos das minas se recusam a negociar com o sindicato deles, e as cidades correm o risco de passar o inverno sem carvão. Você é o presidente dos Estados Unidos.",
  "short": "Roosevelt",
  "did": "Roosevelt chamou os dois lados para uma reunião em 3 de outubro de 1902. Quando os donos se recusaram a negociar, ele se preparou para mandar o Exército assumir as minas de carvão.",
  "next": "A greve de 163 dias terminou em 23 de outubro de 1902. Uma comissão de arbitragem deu depois à maioria dos mineiros um aumento de 10% e uma jornada de nove horas.",
  "stamp": "A grande greve do carvão",
  "choices": [
   "Chamar os dois lados à Casa Branca",
   "Ficar de fora de uma disputa privada",
   "Mandar tropas para acabar com a greve"
  ]
 },
 "2005-bhutan": {
  "place": "Timbu",
  "pov": "O seu país é estável e vive em paz. Um decreto real de 1953 lhe dá poder absoluto, e um projeto de constituição traria a democracia parlamentar. Você é o rei do Butão, de 50 anos de idade.",
  "short": "Jigme Singye",
  "did": "Em dezembro de 2005, ele disse a uma multidão de 8.000 pessoas em Trashiyangtse que o príncipe herdeiro assumiria em 2008. “Por que esperar por uma revolução?”, perguntou.",
  "next": "No fim, ele abdicou em favor do filho antes, em 9 de dezembro de 2006. As primeiras eleições democráticas do Butão vieram em 2008.",
  "stamp": "O rei do Butão se afasta",
  "choices": [
   "Manter os seus poderes e engavetar o projeto",
   "Instituir a democracia, mas reinar pelo resto da vida",
   "Instituir a democracia e passar o trono ao filho"
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["your-call"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["your-call"] = days;
  window.LG_PUZZLES["your-call.byId"] = byId;
})();
