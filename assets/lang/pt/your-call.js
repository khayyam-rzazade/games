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
 },
 "1968-dissolution": {
  "place": "Paris",
  "pov": "Uma revolta estudantil e greves que se espalham abalaram a França. O referendo que você propôs não acalmou os ânimos, e os sindicatos rejeitaram uma proposta. Você é o presidente da França.",
  "short": "De Gaulle",
  "did": "Em 30 de maio de 1968, De Gaulle adiou o referendo, dissolveu a Assembleia Nacional e convocou eleições. “A França está ameaçada de ditadura”, disse ele.",
  "next": "As greves se transformaram em acordos salariais. Nas eleições de 23 e 30 de junho de 1968, os gaullistas conquistaram a maioria absoluta, algo inédito na história da República Francesa.",
  "stamp": "De Gaulle dissolve o parlamento",
  "choices": [
   "Fazer o referendo, como planejado",
   "Dissolver a Assembleia e convocar eleições",
   "Manter a Assembleia e não ceder"
  ]
 },
 "1564-jizya": {
  "place": "Agra",
  "pov": "Desde o século XI, governantes muçulmanos da Índia cobram dos não muçulmanos a jizia, paga no lugar do serviço militar. Em 1562, você se casou com a filha de um rajá. Você é o imperador mogol.",
  "short": "Akbar",
  "did": "Em 1564, Akbar aboliu a jizia. Também acabou com o imposto sobre os peregrinos e com a conversão forçada de prisioneiros de guerra ao islã.",
  "next": "Em 1679, um imperador posterior, Aurangzeb, restabeleceu a jizia, medida duramente criticada por muitos governantes hindus e funcionários da corte mogol.",
  "stamp": "Akbar acaba com a jizia",
  "choices": [
   "Continuar cobrando a jizia",
   "Abolir a jizia para todos",
   "Reduzir a jizia, mas mantê-la"
  ]
 },
 "1992-czech-split": {
  "place": "Brno",
  "pov": "Nas eleições de junho de 1992, os eslovacos apoiaram um populista que quer uma confederação, com exército, banco nacional e política externa próprios para a Eslováquia. A maioria das pessoas quer um Estado comum. Você é o primeiro-ministro tcheco.",
  "short": "Klaus",
  "did": "Klaus e Mečiar concordaram em dissolver o Estado comum sem referendo. Assinaram o acordo na Vila Tugendhat, em Brno, em 26 de agosto de 1992.",
  "next": "O presidente Václav Havel, que havia lutado contra a divisão, renunciou. A Tchecoslováquia acabou em 1º de janeiro de 1993, quando nasceu a República Tcheca independente.",
  "stamp": "A divisão da Tchecoslováquia",
  "choices": [
   "Aceitar uma confederação mais frouxa",
   "Submeter a questão a um referendo",
   "Concordar em dividir o país em dois"
  ]
 },
 "1953-prisoner-release": {
  "place": "Seul",
  "pov": "O Comando da ONU negocia um armistício com os comunistas, ao qual você se opõe. Milhares de prisioneiros de guerra anticomunistas estão em campos por todo o seu país. Você é o presidente da Coreia do Sul.",
  "short": "Rhee",
  "did": "Em 18 de junho de 1953, Rhee, por conta própria, ordenou que a polícia militar libertasse os prisioneiros anticomunistas.",
  "next": "A libertação chocou os Estados Unidos, a ONU e o lado comunista. Rhee se recusou a assinar o armistício, o que levou a um tratado de defesa mútua com os Estados Unidos.",
  "stamp": "Rhee liberta os prisioneiros",
  "choices": [
   "Deixar o caso com o processo do armistício",
   "Ordenar que a sua polícia militar os liberte",
   "Rejeitar o armistício e lutar sozinho"
  ]
 },
 "1981-martial-law": {
  "place": "Varsóvia",
  "pov": "O sindicato Solidariedade lidera a oposição política ao regime comunista. O Kremlin, insatisfeito, ameaça intervir com armas. Você é o militar que chefia o governo da Polônia.",
  "short": "Jaruzelski",
  "did": "Em 13 de dezembro de 1981, Jaruzelski anunciou a lei marcial em um discurso na televisão. O Solidariedade foi posto na ilegalidade, e a maioria dos seus líderes foi internada.",
  "next": "Mineiros foram mortos na mina de carvão Wujek, e a lei marcial durou até julho de 1983. Jaruzelski acreditava que, sem ela, uma intervenção militar seria inevitável.",
  "stamp": "Lei marcial na Polônia",
  "choices": [
   "Buscar um acordo com o Solidariedade",
   "Decretar a lei marcial",
   "Deixar os soviéticos restaurarem a ordem"
  ]
 },
 "1946-parity": {
  "place": "Manila",
  "pov": "O seu país acaba de conquistar a independência. Os Estados Unidos só pagarão 620 milhões de dólares em indenizações de guerra se os americanos tiverem direitos iguais sobre os recursos naturais do seu país. Você é o presidente das Filipinas.",
  "short": "Roxas",
  "did": "Roxas aceitou. Com seis membros da esquerdista Aliança Democrática impedidos de assumir os seus lugares na Câmara, conseguiu a aprovação da emenda pelo Congresso em 18 de setembro.",
  "next": "Em 1947, um plebiscito a aprovou, embora só 40% do eleitorado tenha participado. Os críticos viram na cláusula de paridade uma rendição imperdoável da soberania nacional.",
  "stamp": "Roxas aceita a paridade",
  "choices": [
   "Aceitar e emendar a constituição",
   "Recusar e ficar sem o dinheiro",
   "Insistir em condições melhores"
  ]
 },
 "1981-juan-carlos": {
  "place": "Madri",
  "pov": "200 guardas civis armados invadiram o parlamento durante uma votação e mantêm os deputados reféns. Um general mandou tanques para as ruas de Valência. Você é o rei da Espanha.",
  "short": "Juan Carlos",
  "did": "Vestindo o uniforme de capitão-general do Exército, Juan Carlos denunciou o golpe na televisão. O pronunciamento foi ao ar à 1h14 da madrugada de 24 de fevereiro de 1981.",
  "next": "Tejero resistiu até o meio-dia e foi preso do lado de fora do Congresso. Tejero, Milans del Bosch e Armada foram depois condenados a 30 anos de prisão.",
  "stamp": "O rei contra o golpe",
  "choices": [
   "Esperar até o desfecho ficar claro",
   "Ir à televisão contra o golpe",
   "Negociar com os golpistas uma saída"
  ]
 },
 "2000-pyongyang": {
  "place": "Pyongyang",
  "pov": "A sua Política do Sol busca a aproximação com a Coreia do Norte. As conversas com o Norte abrem caminho para o primeiro encontro dos dois líderes desde a divisão da Coreia. Você é o presidente da Coreia do Sul.",
  "short": "Kim Dae-jung",
  "did": "Kim Dae-jung foi a Pyongyang para a cúpula de 13 a 15 de junho de 2000 e foi recebido por Kim Jong-il. Os dois concordaram em trabalhar pela reunificação, pelos reencontros de famílias e pela cooperação econômica.",
  "next": "Kim Dae-jung ganhou o Prêmio Nobel da Paz em 13 de outubro de 2000. Três anos depois, soube-se que a Coreia do Sul tinha pago ao Norte, em segredo, para que ele comparecesse à cúpula.",
  "stamp": "A primeira cúpula entre as Coreias",
  "choices": [
   "Exigir que o líder do Norte venha a Seul",
   "Exigir conversas nucleares antes da cúpula",
   "Ir a Pyongyang encontrar Kim Jong-il"
  ]
 },
 "1982-falklands": {
  "place": "Londres",
  "pov": "Em 2 de abril de 1982, forças argentinas ocuparam Port Stanley, a capital das ilhas Malvinas (Falkland), um território britânico a 8.000 milhas de distância, no Atlântico Sul. Você é o primeiro-ministro britânico.",
  "short": "Thatcher",
  "did": "Depois de uma reunião de emergência do gabinete, Thatcher enviou uma força-tarefa naval para retomar as ilhas; em 5 de abril ela já estava a caminho. A força chegou a ter 44 navios de guerra.",
  "next": "A Argentina se rendeu em 14 de junho de 1982, depois de 74 dias. A guerra matou 649 militares argentinos, 255 militares britânicos e 3 moradores das ilhas.",
  "stamp": "A força-tarefa das Malvinas",
  "choices": [
   "Confiar na ONU e na diplomacia",
   "Aceitar um acordo mediado pelos EUA",
   "Enviar uma força-tarefa para retomá-las"
  ]
 },
 "1639-sakoku": {
  "place": "Edo",
  "pov": "Em 1637, camponeses cristãos se revoltaram em Shimabara, e milhares foram mortos. Desde 1636, o comércio português está restrito a Dejima, em Nagasaki. Você é o xogum do Japão.",
  "short": "Iemitsu",
  "did": "Em 1639, o governo de Iemitsu expulsou os portugueses e proibiu os navios deles. Só um pequeno número de comerciantes holandeses pôde ficar, na minúscula ilha de Dejima.",
  "next": "Em 1640, Macau enviou emissários para reabrir o comércio; quatro embaixadores e 57 dos seus acompanhantes e tripulantes foram executados.",
  "stamp": "O Japão proíbe os portugueses",
  "choices": [
   "Continuar comerciando, sob vigilância rigorosa",
   "Proibir os navios portugueses no Japão",
   "Fechar o Japão a todos os europeus"
  ]
 },
 "2003-iraq-vote": {
  "place": "Londres",
  "pov": "Você não conseguiu uma segunda resolução da ONU sobre o Iraque. Muita gente do seu próprio partido é contra a guerra, e uma ministra disse que vai renunciar por causa disso. Você é o primeiro-ministro britânico.",
  "short": "Blair",
  "did": "Blair levou a guerra à votação na Câmara dos Comuns em 18 de março de 2003, dizendo que um voto pela retirada das tropas também o tiraria do cargo. A moção foi aprovada por 412 votos a 149.",
  "next": "Robin Cook renunciou ao governo em protesto. A campanha britânica no Iraque, a Operação Telic, começou um dia depois da votação.",
  "stamp": "Blair leva a Grã-Bretanha à guerra",
  "choices": [
   "Esperar o aval da ONU antes de qualquer guerra",
   "Enviar tropas e deixar os deputados votarem",
   "Oferecer apoio, mas sem tropas de combate"
  ]
 },
 "261bc-kalinga": {
  "place": "Pataliputra",
  "year": "261 a.C.",
  "pov": "O seu exército conquistou Kalinga. Pela sua própria contagem, 100.000 pessoas foram mortas ali, 150.000 foram deportadas e muitas mais morreram. Você é o imperador máuria.",
  "short": "Ashoka",
  "did": "Ashoka ficou com Kalinga, mas sentiu um remorso profundo e prometeu nunca mais fazer uma guerra de conquista. Os seus éditos diziam que a conquista moral era a mais importante de todas.",
  "next": "Ele pôs fim à expansão militar do seu império e passou a buscar a conquista pelo dharma. Morreu em 232 a.C., tendo governado a maior parte do subcontinente indiano.",
  "stamp": "Ashoka renuncia à conquista",
  "choices": [
   "Seguir adiante com novas conquistas",
   "Devolver a liberdade a Kalinga",
   "Ficar com Kalinga, mas nunca mais conquistar"
  ]
 },
 "1985-anti-alcohol": {
  "place": "Moscou",
  "pov": "O consumo excessivo de álcool está ligado a faltas ao trabalho, a acidentes de trabalho e ao aumento da mortalidade entre os homens. Mesmo assim, em 1979 a venda de bebidas rendeu ao Estado cerca de 25,4 bilhões de rublos em impostos. Você é o novo líder soviético.",
  "short": "Gorbachev",
  "did": "Em maio de 1985, Gorbachev lançou uma campanha contra a bebida. O preço da vodca subiu de 20 a 30%, o horário de venda foi reduzido e vinhedos foram destruídos.",
  "next": "A expectativa de vida subiu de 67,7 anos em 1984 para 69,8 em 1987. Mas a bebida destilada em casa explodiu, a receita do Estado caiu e a campanha foi abandonada depois de 1987.",
  "stamp": "Gorbachev contra a bebida",
  "choices": [
   "Reduzir o consumo com uma campanha nacional",
   "Deixar como está: o Estado precisa da receita",
   "Financiar tratamentos, mas não mexer nas vendas"
  ]
 },
 "1945-surrender": {
  "place": "Tóquio",
  "pov": "Bombas atômicas atingiram Hiroshima e Nagasaki, e a União Soviética declarou guerra. O seu conselho de guerra está em um impasse sobre a rendição incondicional. Você é o imperador do Japão.",
  "short": "Hirohito",
  "did": "Na madrugada de 10 de agosto de 1945, Hirohito disse ao conselho de guerra: “Engulo as minhas próprias lágrimas e dou o meu aval à proposta de aceitar a proclamação dos Aliados”.",
  "next": "O discurso dele foi transmitido ao meio-dia de 15 de agosto de 1945, a primeira vez que um imperador se dirigia à nação pelo rádio. Nele, a palavra “rendição” nunca foi usada.",
  "stamp": "O Japão aceita a derrota",
  "choices": [
   "Aceitar os termos dos Aliados e acabar com a guerra",
   "Seguir lutando e recusar os termos dos Aliados",
   "Ficar em silêncio e deixar o governo decidir"
  ]
 },
 "2003-congestion-charge": {
  "place": "Londres",
  "pov": "O trânsito em Londres se arrasta a uma média de 12 milhas por hora, e o transporte da cidade sofre com a falta crônica de dinheiro. Você é o prefeito de Londres.",
  "short": "Livingstone",
  "did": "Livingstone fez os motoristas pagarem 5 libras para dirigir no centro de Londres, das 7h às 18h30, nos dias úteis. A cobrança começou em 17 de fevereiro de 2003.",
  "next": "O trânsito caiu 25% na primeira semana, e os ônibus passaram a chegar adiantados. O prefeito de Paris combinou uma visita a Londres para estudar o sistema.",
  "stamp": "O pedágio urbano de Londres",
  "choices": [
   "Gastar mais com ônibus e trens",
   "Cobrar 5 libras de quem dirigir no centro",
   "Deixar as ruas como estão por enquanto"
  ]
 },
 "1631-taj-mahal": {
  "place": "Agra",
  "pov": "A sua esposa favorita o acompanhou na campanha do Decão, mesmo grávida. Em junho de 1631, ela morreu ao dar à luz o seu 14º filho. Ela está enterrada provisoriamente. Você é o imperador mogol.",
  "short": "Shah Jahan",
  "did": "Shah Jahan mandou construir um mausoléu em memória dela em 1631. As obras começaram em 1632, sob o comando do arquiteto da corte, Ustad Ahmad Lahori.",
  "next": "Mais de 20.000 operários e artesãos construíram o Taj Mahal. Deposto por Aurangzeb em 1658, Shah Jahan foi sepultado ali, ao lado da esposa, em 1666.",
  "stamp": "A construção do Taj Mahal",
  "choices": [
   "Dar a ela um túmulo modesto e seguir em frente",
   "Homenageá-la com uma mesquita e obras de caridade",
   "Construir para ela o túmulo mais belo de todos"
  ]
 },
 "1968-prague": {
  "place": "Moscou",
  "pov": "O governo comunista da Tchecoslováquia acabou com a censura e avança com reformas. As negociações não conseguiram detê-las, e você teme que outros Estados satélites sigam o exemplo. Você é o líder soviético.",
  "short": "Brejnev",
  "did": "Brejnev levou o plano adiante. Na noite de 20 de agosto de 1968, 250.000 soldados do Pacto de Varsóvia e 2.000 tanques entraram na Tchecoslováquia, e Dubček foi levado a Moscou.",
  "next": "A invasão matou 137 tchecos e eslovacos. Em abril de 1969, Dubček foi forçado a deixar o poder, e Moscou passou a reivindicar o direito de intervir onde quer que o regime comunista fosse ameaçado.",
  "stamp": "Os soviéticos invadem a Tchecoslováquia",
  "choices": [
   "Enviar tropas do Pacto de Varsóvia",
   "Manter as negociações e a pressão política",
   "Aceitar as reformas e esperar"
  ]
 },
 "1994-real-plan": {
  "place": "Brasília",
  "pov": "A inflação derrotou uma série de planos para controlá-la; os anteriores se apoiavam no congelamento de preços e salários. Você é o ministro da Fazenda do Brasil.",
  "short": "Cardoso",
  "did": "A equipe de Cardoso criou uma moeda virtual, a URV, que valia cerca de 1 dólar americano. Os preços fixados em URV foram então convertidos em uma nova moeda, o real, em 1º de julho de 1994.",
  "next": "Ao contrário dos planos anteriores, ele não usou nenhum congelamento geral de preços e salários. No fim de 1996, a inflação, por algumas medidas, já caminhava para menos de 20% ao ano.",
  "stamp": "O Plano Real",
  "choices": [
   "Congelar de novo os preços e salários",
   "Criar uma nova moeda em etapas",
   "Adotar o dólar americano como moeda do Brasil"
  ]
 },
 "1593-saint-denis": {
  "place": "Saint-Denis",
  "pov": "Você virou rei quando o seu antecessor foi assassinado, mas é protestante. Soldados espanhóis e um povo fervorosamente católico defendem Paris, e você não consegue romper as muralhas da cidade. Você é o rei da França.",
  "short": "Henrique",
  "did": "Em 25 de julho de 1593, em Saint-Denis, Henrique renunciou formalmente à fé protestante. Em poucas semanas, o apoio à Liga Católica se desfez.",
  "next": "Ele foi coroado em Chartres em 17 de fevereiro de 1594, e Paris se rendeu em 22 de março. Em 1598, o seu Édito de Nantes deu aos protestantes uma tolerância limitada.",
  "stamp": "Henrique IV se torna católico",
  "choices": [
   "Continuar sitiando Paris até ela ceder",
   "Continuar protestante e buscar uma trégua",
   "Renunciar à sua fé protestante"
  ]
 },
 "1952-bolivia-tin": {
  "place": "La Paz",
  "pov": "O seu partido chegou ao poder em uma revolução popular. As maiores minas de estanho pertencem a três barões da mineração. Você é o presidente da Bolívia.",
  "short": "Paz Estenssoro",
  "did": "Em 31 de outubro de 1952, Paz Estenssoro assinou um decreto nacionalizando as minas de Patiño, Hochschild e Aramayo. O decreto reconhecia o princípio da indenização.",
  "next": "A nova empresa estatal de mineração, a COMIBOL, assumiu 163 minas com 29.000 trabalhadores. Por décadas, foi a principal fonte de divisas da Bolívia e a sua maior empregadora.",
  "stamp": "A Bolívia nacionaliza o estanho",
  "choices": [
   "Deixar as minas com os donos",
   "Nacionalizá-las, com indenização",
   "Tomá-las sem pagar aos donos"
  ]
 },
 "1991-yeltsin-tank": {
  "place": "Moscou",
  "pov": "Comunistas da linha dura tentam tomar o poder e mantêm o presidente soviético retido em sua datcha. Tropas estão entrando em Moscou, e você está na lista de prisões da KGB. Você é o presidente da Rússia.",
  "short": "Ieltsin",
  "did": "Ieltsin foi à Casa Branca, subiu em um tanque e leu um apelo ao povo. O texto chamava os fatos de tentativa de golpe e pedia uma greve geral.",
  "next": "Multidões ergueram barricadas em volta da Casa Branca, e três homens morreram. O golpe desmoronou em dois dias; em 25 de dezembro, Gorbachev renunciou.",
  "stamp": "Ieltsin em cima do tanque",
  "choices": [
   "Se esconder na datcha, fora de Moscou",
   "Subir em um tanque e denunciar o golpe",
   "Negociar com os líderes do golpe"
  ]
 },
 "1810-cry-of-dolores": {
  "place": "Dolores",
  "pov": "A conspiração pela independência da qual você faz parte foi denunciada aos espanhóis, e vários membros foram presos. Você foi avisado de que deve fugir. Você é o padre da paróquia de Dolores.",
  "short": "Hidalgo",
  "did": "Hidalgo decidiu agir na hora. Por volta das 2h30 da madrugada de 16 de setembro de 1810, mandou tocar os sinos da igreja e pediu aos fiéis que se revoltassem.",
  "next": "Com o apoio de milhares de indígenas e mestiços, tomou Guanajuato; derrotado em janeiro de 1811, foi capturado e fuzilado. O 16 de setembro é hoje o Dia da Independência do México.",
  "stamp": "O Grito de Dolores",
  "choices": [
   "Fugir enquanto ainda há tempo",
   "Ficar escondido e esperar um momento melhor",
   "Chamar os seus paroquianos à revolta agora"
  ]
 },
 "1955-austria-neutral": {
  "place": "Viena",
  "pov": "Quatro potências ocupam o seu país desde a guerra. Em Moscou, os soviéticos oferecem retirar as suas tropas se o seu país se declarar permanentemente neutro. Você é o chanceler da Áustria.",
  "short": "Raab",
  "did": "Raab aceitou. Em 15 de abril de 1955, ele leu uma declaração de que a Áustria declararia a neutralidade “como a praticada pela Confederação Suíça”.",
  "next": "O Tratado de Estado foi assinado no Palácio Belvedere, em Viena, em 15 de maio de 1955. Em 26 de outubro, o parlamento austríaco reafirmou a neutralidade permanente do país.",
  "stamp": "A Áustria escolhe a neutralidade",
  "choices": [
   "Recusar e esperar uma oferta melhor",
   "Aceitar a neutralidade para acabar com a ocupação",
   "Buscar um lugar na aliança ocidental"
  ]
 },
 "1971-7-march": {
  "place": "Daca",
  "pov": "O seu partido ganhou 167 das 169 cadeiras do Paquistão Oriental, mas o presidente do Paquistão adiou a posse do seu governo. Muita gente pede abertamente que você declare a independência. Você é o líder da Liga Awami.",
  "short": "Mujib",
  "did": "Em 7 de março de 1971, diante de mais de um milhão de pessoas em Daca, Mujib disse que a luta, desta vez, era pela independência. Mas não fez nenhuma declaração direta e impôs condições, como o fim da lei marcial.",
  "next": "Em 25 de março de 1971, o exército do Paquistão lançou a Operação Searchlight e prendeu Mujib; seguiu-se a Guerra de Libertação.",
  "stamp": "O discurso de 7 de março",
  "choices": [
   "Declarar já a independência do Paquistão",
   "Chamar o povo à luta, sem declarar",
   "Suspender os protestos e esperar as negociações"
  ]
 },
 "1860-teano": {
  "place": "Teano",
  "pov": "Os seus voluntários conquistaram a Sicília, onde você é ditador, e Nápoles. Agora você vai se encontrar com o rei da Sardenha em Teano. Você é o general conquistador.",
  "short": "Garibaldi",
  "did": "Em Teano, em 26 de outubro de 1860, Garibaldi saudou Vítor Emanuel II como rei da Itália e apertou a mão dele. Entregou ao rei as suas conquistas no sul da Itália.",
  "next": "Em 9 de novembro, ele partiu de Nápoles para a rochosa ilha de Caprera, recusando qualquer recompensa. O Reino da Itália unificado foi criado em 17 de março de 1861.",
  "stamp": "Garibaldi em Teano",
  "choices": [
   "Seguir para Roma com os seus voluntários",
   "Continuar governando o sul como ditador",
   "Entregar as suas conquistas ao rei"
  ]
 },
 "1997-baht-float": {
  "place": "Bangcoc",
  "pov": "A Tailândia deve cerca de 105 bilhões de dólares ao exterior, mas tem só 25,5 bilhões de dólares em reservas. Especuladores não param de atacar o atrelamento do baht ao dólar. Você é o novo ministro das Finanças da Tailândia.",
  "short": "Thanong",
  "did": "Em 2 de julho de 1997, Thanong e o Banco da Tailândia puseram fim ao atrelamento ao dólar americano, que durava décadas. O baht passou a flutuar de forma administrada, com o valor definido pelas forças do mercado.",
  "next": "O baht despencou de 25 para 56 por dólar antes de se estabilizar em cerca de 40. Thanong aceitou um resgate do FMI em agosto e renunciou em outubro.",
  "stamp": "A Tailândia deixa o baht flutuar",
  "choices": [
   "Continuar defendendo o atrelamento ao dólar",
   "Deixar o baht flutuar e o mercado decidir",
   "Desvalorizar o baht para uma nova taxa fixa"
  ]
 },
 "1940-war-cabinet": {
  "place": "Londres",
  "pov": "A França está perto do colapso, e o seu exército recua para Dunquerque. O seu ministro das Relações Exteriores quer sondar uma paz negociada com Hitler por meio de Mussolini. Você é o primeiro-ministro britânico.",
  "short": "Churchill",
  "did": "Na reunião do gabinete de guerra de 28 de maio de 1940, Churchill rejeitou buscar mediação por meio de Mussolini. O seu gabinete ampliado, de 25 membros, apoiou então por unanimidade continuar lutando.",
  "next": "Halifax aceitou a rejeição da proposta dele. Segundo estimativas, 338.226 militares foram evacuados, mas quase todo o equipamento se perdeu.",
  "stamp": "Churchill luta até o fim",
  "choices": [
   "Pedir a Mussolini que sonde as condições de paz",
   "Recusar qualquer conversa e seguir lutando",
   "Pedir aos Estados Unidos que façam a mediação"
  ]
 },
 "1947-womens-vote": {
  "place": "Buenos Aires",
  "pov": "O seu marido é presidente, e as mulheres do seu país ainda não podem votar; ele prometeu mudar isso na campanha. Você é a primeira-dama da Argentina.",
  "short": "Eva Perón",
  "did": "Eva Perón lançou uma campanha ativa pelo voto feminino. O projeto do governo, impulsionado por ela, foi aprovado pelo Congresso em 9 de setembro de 1947 e se tornou a Lei 13.010 em 23 de setembro.",
  "next": "Em 1951, as mulheres votaram pela primeira vez em uma eleição nacional, e mais de 90% das mulheres inscritas participaram.",
  "stamp": "As argentinas conquistam o voto",
  "choices": [
   "Fazer campanha pública pelo voto, você mesma",
   "Deixar o assunto com o seu marido e o Congresso",
   "Ficar só com a caridade, longe da política"
  ]
 },
 "1912-qing-abdication": {
  "place": "Pequim",
  "pov": "A revolução estourou em outubro de 1911, e 13 das 18 províncias se separaram. O seu próprio primeiro-ministro agora apoia uma república. Você é a imperatriz-viúva, que governa em nome de um imperador de seis anos.",
  "short": "Longyu",
  "did": "Em 12 de fevereiro de 1912, Longyu aceitou as condições e emitiu o édito de abdicação em nome de Puyi, de seis anos. Ele pôde manter o seu título imperial.",
  "next": "Isso pôs fim à dinastia Qing e a mais de 2.000 anos de monarquia. A República prometeu a Puyi quatro milhões de taéis de prata por ano, e ele viveu na Cidade Proibida até 1924.",
  "stamp": "O último imperador abdica",
  "choices": [
   "Continuar lutando, como pedem alguns leais",
   "Abdicar por ele em condições generosas",
   "Insistir em uma monarquia constitucional"
  ]
 },
 "1492-columbus": {
  "place": "Santa Fé",
  "pov": "Granada caiu. Um navegador pede que você apoie uma viagem para o oeste, rumo às Índias. Os seus especialistas acham a ideia pouco plausível; ele quer títulos e um décimo das riquezas. Você é a rainha de Castela.",
  "short": "Isabel",
  "did": "Convencida por Luis de Santángel, escrivão do rei, Isabel mandou um guarda real trazer Cristóvão Colombo de volta. Em 17 de abril de 1492, os monarcas assinaram as Capitulações de Santa Fé.",
  "next": "Colombo partiu de Palos de la Frontera em 3 de agosto de 1492 com três navios. Chegou às Américas em 12 de outubro.",
  "stamp": "Isabel apoia Colombo",
  "choices": [
   "Recusar, como aconselham os seus especialistas",
   "Apoiar a viagem e aceitar as condições dele",
   "Apoiar, mas recusar as exigências dele"
  ]
 },
 "1977-canal-treaties": {
  "place": "Cidade do Panamá",
  "pov": "Depois de anos de negociações, os Estados Unidos se oferecem para entregar o canal ao seu país em 31 de dezembro de 1999, mantendo o direito permanente de defendê-lo. Você é o líder do Panamá.",
  "short": "Torrijos",
  "did": "Em 7 de setembro de 1977, Torrijos e Carter assinaram os dois tratados em Washington, D.C. Os eleitores panamenhos os aprovaram em 23 de outubro de 1977, com 67,4% dos votos.",
  "next": "O Senado dos EUA ratificou os dois tratados por 68 votos a 32 em 1978. Em 31 de dezembro de 1999, o Panamá assumiu o controle total do canal.",
  "stamp": "Os tratados do Canal do Panamá",
  "choices": [
   "Assinar os tratados nesses termos",
   "Insistir em uma entrega mais cedo",
   "Recusar qualquer direito dos EUA de defendê-lo"
  ]
 },
 "221bc-standards": {
  "place": "Xianyang",
  "year": "221 a.C.",
  "pov": "Em 221 a.C., os seus exércitos completaram a conquista dos outros seis grandes estados chineses. Agora você precisa manter unido o novo império. Você é o governante de Qin.",
  "short": "Qin Shi Huang",
  "did": "Com o seu ministro Li Si, Qin Shi Huang fez da escrita de selo de Qin o padrão oficial e trocou as moedas dos estados pela Ban Liang. Pesos e medidas foram padronizados.",
  "next": "Até os eixos das carroças ganharam um comprimento padrão, para caber nos sulcos das estradas. Ele governou até morrer, em 210 a.C.; depois a sua dinastia foi derrubada e substituída pela Han.",
  "stamp": "Uma escrita, uma moeda",
  "choices": [
   "Deixar cada antigo estado manter os seus costumes",
   "Impor uma só escrita, uma só moeda, uma só medida",
   "Unificar as leis, sem mexer nos costumes locais"
  ]
 },
 "1979-shah-leaves": {
  "place": "Teerã",
  "pov": "Você governa o Irã desde 1941. Depois de meses de manifestações violentas e de um motim no exército, o aiatolá Khomeini, no exílio, declarou um conselho para substituir o governo. Você é o xá do Irã.",
  "short": "Mohammad Reza",
  "did": "Em 16 de janeiro de 1979, ele e a imperatriz Farah voaram para Assuã, no Egito. Oficialmente eram férias; na verdade, o seu novo primeiro-ministro tinha pedido que ele saísse.",
  "next": "A partida dele foi recebida com comemorações em massa. Em 1º de abril, Khomeini proclamou uma república islâmica; o xá morreu no exílio, no Egito, em julho de 1980.",
  "stamp": "O xá deixa o Irã",
  "choices": [
   "Deixar o Irã, oficialmente de férias",
   "Mandar o exército esmagar a revolta",
   "Ficar e apoiar o seu novo primeiro-ministro"
  ]
 },
 "1905-october-manifesto": {
  "place": "São Petersburgo",
  "pov": "Uma greve geral paralisou os transportes e os serviços públicos do seu império em meio à revolução. Você precisa escolher: uma ditadura militar ou uma constituição. Você é o czar da Rússia.",
  "short": "Nicolau",
  "did": "Nicolau cedeu e publicou o Manifesto de Outubro em 30 de outubro de 1905. Ele prometia liberdades civis e uma Duma eleita, e nenhuma lei poderia ser aprovada sem o aval dela.",
  "next": "O manifesto dividiu a oposição. A Duma teve apenas um controle limitado sobre o orçamento, e em 1906–07 boa parte da Rússia estava sob lei marcial.",
  "stamp": "O Manifesto de Outubro",
  "choices": [
   "Nomear um ditador militar",
   "Conceder direitos civis e um parlamento",
   "Esperar a greve perder a força"
  ]
 },
 "1980-reconciliation": {
  "place": "Salisbury",
  "pov": "A sua vitória eleitoral chocou a elite branca. Você foi retratado como um radical que nacionalizaria tudo. Agora vai formar o governo. Você é o primeiro-ministro eleito do Zimbábue.",
  "short": "Mugabe",
  "did": "Mugabe pediu união: “Vamos transformar espadas em arados”. Ele nomeou dois brancos ministros, David Smith e Denis Norman, no gabinete empossado em 19 de abril de 1980.",
  "next": "Nomeou também Peter Walls, ex-chefe do exército da Rodésia, embora Walls tenha saído antes do fim do ano. Anos depois, Mugabe tomou fazendas de brancos sem indenização.",
  "stamp": "A reconciliação de Mugabe",
  "choices": [
   "Formar um gabinete só com o seu partido",
   "Tranquilizar os brancos e incluí-los no gabinete",
   "Nacionalizar as fazendas e empresas dos brancos"
  ]
 },
 "1867-maximilian": {
  "place": "San Luis Potosí",
  "pov": "Um tribunal condenou à morte o imperador Maximiliano, que foi capturado. Victor Hugo, Giuseppe Garibaldi e muitas cabeças coroadas da Europa pedem a você que poupe a vida dele. Você é o presidente do México.",
  "short": "Juárez",
  "did": "Juárez negou o perdão. Em 19 de junho de 1867, Maximiliano e os generais Miramón e Mejía foram fuzilados no Cerro de las Campanas, em Querétaro.",
  "next": "Juárez voltou à capital em 15 de julho, aclamado pelo povo e ao som de sinos.",
  "stamp": "Sem clemência para Maximiliano",
  "choices": [
   "Deixar a sentença ser cumprida",
   "Poupá-lo e mandá-lo para o exílio",
   "Trocar a pena por prisão perpétua"
  ]
 },
 "1947-partition": {
  "place": "Nova Délhi",
  "pov": "Você deve passar o poder aos indianos até 30 de junho de 1948 e evitar a partição. Distúrbios entre comunidades religiosas tomam conta de Délhi e Bombaim, e a Liga Muçulmana exige o Paquistão. Você é o vice-rei da Índia.",
  "short": "Mountbatten",
  "did": "Mountbatten concluiu que uma Índia unida não era mais possível. Em 3 de junho de 1947, anunciou que o poder iria para dois governos, Índia e Paquistão, um ano antes do previsto.",
  "next": "A partição entrou em vigor em 15 de agosto de 1947, e as fronteiras foram anunciadas dois dias depois. Acredita-se que mais de 15 milhões de pessoas tenham migrado através delas.",
  "stamp": "A partição antecipada",
  "choices": [
   "Manter junho de 1948 e uma Índia unida",
   "Dividir a Índia e passar o poder antes",
   "Manter o domínio britânico até a ordem voltar"
  ]
 },
 "1862-emancipation": {
  "place": "Washington",
  "pov": "Julho de 1862. Você redigiu uma proclamação que liberta os escravizados dos estados rebeldes. Os exércitos da União acabam de sofrer reveses na Virgínia. Você é o presidente dos Estados Unidos.",
  "short": "Lincoln",
  "did": "Seward sugeriu esperar uma vitória da União, e Lincoln segurou o texto. Depois de Antietam, ele publicou uma proclamação preliminar em 22 de setembro de 1862.",
  "next": "A proclamação final, de 1º de janeiro de 1863, valia apenas para as áreas em rebelião, e não para estados de fronteira como Maryland. A escravidão acabou legalmente com a 13ª Emenda, em dezembro de 1865.",
  "stamp": "A Proclamação de Emancipação",
  "choices": [
   "Publicar a proclamação imediatamente",
   "Esperar uma vitória da União e depois publicá-la",
   "Engavetá-la para manter os estados de fronteira leais"
  ]
 },
 "1963-oau": {
  "place": "Adis Abeba",
  "pov": "Os Estados independentes da África se dividiram em blocos rivais. Um, liderado por Gana, quer uma federação de toda a África; o outro quer que a unidade venha aos poucos. Você é o imperador da Etiópia.",
  "short": "Hailé Selassié",
  "did": "Hailé Selassié convidou os dois grupos a Adis Abeba. Ali, em 25 de maio de 1963, foi assinada a carta da Organização da Unidade Africana, e a cidade se tornou a sede dela.",
  "next": "A OUA trabalhou pelo fim do colonialismo e do domínio da minoria branca, mas a sua política de não interferência a limitava. Mais tarde, foi substituída pela União Africana.",
  "stamp": "Adis Abeba une a África",
  "choices": [
   "Reunir os dois blocos na sua capital",
   "Entrar no bloco que quer a federação já",
   "Ficar fora da briga entre os blocos"
  ]
 },
 "1990-batmonkh": {
  "place": "Ulan Bator",
  "pov": "Grevistas de fome na Praça Sukhbaatar exigem que o seu governo renuncie. Pedem a você que assine um decreto de repressão aos manifestantes. Você é o líder da Mongólia comunista.",
  "short": "Batmönkh",
  "did": "Batmönkh recusou: “Nós, poucos mongóis, ainda não chegamos ao ponto de fazer sangrar o nariz uns dos outros”. Em 9 de março de 1990, o Politburo que ele chefiava renunciou.",
  "next": "Em 10 de maio de 1990, o parlamento declarou que haveria eleições livres e multipartidárias em julho. O antigo partido governante ficou com quase três quartos das cadeiras.",
  "stamp": "Os líderes mongóis deixam o poder",
  "choices": [
   "Assinar o decreto e esvaziar a praça",
   "Negociar com os grevistas e continuar no cargo",
   "Recusar a força; renunciar com o Politburo"
  ]
 },
 "1967-nasser-resigns": {
  "place": "Cairo",
  "pov": "Uma guerra com Israel, que começou há quatro dias, terminou em derrota para as suas forças armadas. Hoje à noite você falará à nação. Você é o presidente do Egito.",
  "short": "Nasser",
  "did": "Em 9 de junho de 1967, Nasser assumiu toda a responsabilidade pela derrota e renunciou à presidência. Multidões tomaram as ruas para apoiá-lo.",
  "next": "O gabinete e a Assembleia Nacional se recusaram a aceitar a renúncia, e Nasser a retirou. Em 19 de junho, ele também se tornou primeiro-ministro.",
  "stamp": "Nasser renuncia e fica",
  "choices": [
   "Assumir a culpa e renunciar",
   "Continuar no cargo e trocar os generais",
   "Continuar no cargo e prometer revidar"
  ]
 },
 "1983-rigueur": {
  "place": "Paris",
  "pov": "A sua política de estímulo logo agravou o déficit do orçamento e o déficit comercial. O franco foi desvalorizado duas vezes, e a esquerda acaba de perder as eleições locais. Você é o presidente da França.",
  "short": "Mitterrand",
  "did": "Em março de 1983, Mitterrand manteve o franco no Sistema Monetário Europeu (SME) e fez o “tournant de la rigueur”, a virada da austeridade. Os impostos subiram, e os salários deixaram de ser atrelados aos preços.",
  "next": "O primeiro-ministro Mauroy e o ministro das Finanças Jacques Delors puseram em prática um drástico plano de austeridade. A esquerda nunca assumiu essa virada politicamente, preferindo chamá-la de “parêntese”.",
  "stamp": "A virada de austeridade de Mitterrand",
  "choices": [
   "Sair do SME e seguir gastando",
   "Proteger a indústria limitando importações",
   "Ficar no SME e adotar a austeridade"
  ]
 },
 "1822-san-martin": {
  "place": "Lima",
  "pov": "Um grande exército realista, bem armado, ainda mantém Cusco. Em Guaiaquil você pediu a Bolívar que enviasse um exército ao Peru; ele ofereceu menos de 2.000 homens. Você é o Protetor do Peru.",
  "short": "San Martín",
  "did": "Em 20 de setembro de 1822, quando se reuniu o primeiro Congresso Constituinte do Peru, San Martín renunciou e depôs a faixa de Protetor. Na madrugada de 21 de setembro, zarpou para Valparaíso.",
  "next": "Mais tarde, deixou a América do Sul de vez e se aposentou na França. Bolívar deu continuidade à guerra de libertação.",
  "stamp": "San Martín se afasta",
  "choices": [
   "Seguir lutando com as forças que tem",
   "Renunciar e deixar o Peru para outros",
   "Servir sob o comando de Bolívar"
  ]
 },
 "1990-one-for-one": {
  "place": "Bonn",
  "pov": "A Alemanha Oriental vai adotar o marco alemão. No mercado negro, cinco a dez marcos orientais compravam um marco alemão, mas os alemães orientais exigem a troca de um por um. Você é o chanceler da Alemanha Ocidental.",
  "short": "Kohl",
  "did": "Contra o conselho dos principais economistas, o governo de Kohl trocou salários, ordenados, aposentadorias e aluguéis de um por um. As poupanças foram trocadas de um por um até um limite de 2.000 a 6.000 marcos, conforme a idade.",
  "next": "O marco alemão chegou à Alemanha Oriental em 1º de julho de 1990. Muitas empresas orientais deixaram de poder competir, e vieram fechamentos e demissões em massa.",
  "stamp": "Um marco alemão por um oriental",
  "choices": [
   "Trocar na razão de dois marcos orientais por um",
   "Trocar salários e poupanças de um por um",
   "Adiar a união monetária por enquanto"
  ]
 },
 "1977-hunting-ban": {
  "place": "Nairóbi",
  "pov": "A fauna do seu país, antes incontável, está diminuindo, e caçadores ilegais matam elefantes e rinocerontes em grande número. Caçadores profissionais licenciados ainda levam clientes pagantes em safáris. Você é o presidente do Quênia.",
  "short": "Kenyatta",
  "did": "Em maio de 1977, o governo de Kenyatta proibiu toda a caça esportiva, sem dar tempo para terminar os safáris. Muitos dos 106 caçadores licenciados do Quênia souberam da medida por guardas da vida selvagem, em campo.",
  "next": "Em dezembro daquele ano, Kenyatta proibiu também a venda de troféus e produtos da caça por lojas de souvenirs. Os caçadores ilegais agiram sem freio, e a população de elefantes do Quênia caiu muito entre 1973 e 2013.",
  "stamp": "O Quênia proíbe a caça",
  "choices": [
   "Proibir já toda a caça esportiva",
   "Manter a caça licenciada, combater a ilegal",
   "Proibir a venda de troféus e produtos da caça"
  ]
 },
 "1840-waitangi": {
  "place": "Waitangi",
  "pov": "Chegam cada vez mais colonos britânicos à Nova Zelândia, alguns deles indisciplinados, e a França parece interessada em anexá-la. Você precisa garantir a soberania britânica. Você é o novo tenente-governador britânico.",
  "short": "Hobson",
  "did": "Hobson mandou redigir um tratado em poucos dias. Em 6 de fevereiro de 1840, em Waitangi, cerca de 40 chefes o assinaram; a cada um ele disse “He iwi tahi tātou”, “Somos um só povo”.",
  "next": "Cerca de 540 chefes assinaram ao todo, e a soberania britânica foi proclamada em 21 de maio de 1840. O texto em maori traduzia “soberania” como “kawanatanga” (governança).",
  "stamp": "O Tratado de Waitangi",
  "choices": [
   "Fazer um tratado com os chefes maoris",
   "Simplesmente proclamar a soberania britânica",
   "Reivindicar apenas pequenos trechos de terra"
  ]
 },
 "1991-gulf-ceasefire": {
  "place": "Washington",
  "pov": "As forças da coalizão entraram na Cidade do Kuwait, e as tropas iraquianas estão em fuga. Uma divisão americana está a menos de 250 km de Bagdá. Você é o presidente dos Estados Unidos.",
  "short": "Bush",
  "did": "Em 28 de fevereiro de 1991, Bush anunciou um cessar-fogo, declarando o Kuwait livre e o exército iraquiano derrotado. Ele nunca tivera a intenção de derrubar Saddam Hussein.",
  "next": "A guerra terrestre durou cerca de 100 horas. A escolha continuou sendo controversa: Saddam só foi removido em 2003, quando o filho de Bush era presidente.",
  "stamp": "Bush interrompe a Guerra do Golfo",
  "choices": [
   "Seguir até Bagdá e derrubar Saddam",
   "Declarar cessar-fogo, com o Kuwait já livre",
   "Lutar até destruir o exército do Iraque"
  ]
 },
 "1987-june-29": {
  "place": "Seul",
  "pov": "Protestos pela democracia se espalham pela Coreia do Sul. Em 10 de junho, o seu partido indicou você para suceder ao presidente, e as Olimpíadas de Seul de 1988 se aproximam. Você é o candidato do partido governista.",
  "short": "Roh",
  "did": "Em 29 de junho de 1987, Roh aceitou a exigência de eleições presidenciais diretas. Prometeu também libertar presos políticos, entre eles o líder da oposição Kim Dae-jung.",
  "next": "Uma nova constituição foi aprovada por 94,4% dos eleitores em outubro. Com o voto da oposição dividido, Roh foi então eleito presidente com 36,6% dos votos.",
  "stamp": "A declaração de 29 de junho",
  "choices": [
   "Manter a eleição presidencial indireta",
   "Aceitar eleições presidenciais diretas",
   "Apoiar uma repressão para acabar com os protestos"
  ]
 },
 "2001-argentina-default": {
  "place": "Buenos Aires",
  "pov": "Tumultos forçaram o presidente a renunciar. O Congresso nomeou você presidente interino até as eleições. O FMI recusou uma ajuda de 1,3 bilhão de dólares; a dívida é de 132 bilhões de dólares. Você é o presidente da Argentina.",
  "short": "Rodríguez Saá",
  "did": "Ao tomar posse, em 23 de dezembro de 2001, Rodríguez Saá anunciou que o Estado suspenderia o pagamento da dívida externa. Disse que manteria o peso atrelado ao dólar na proporção de um para um.",
  "next": "A moratória de 132 bilhões de dólares foi chamada de o maior calote já dado por um país soberano. Sem o apoio do seu partido peronista, ele renunciou depois de uma semana.",
  "stamp": "A Argentina para de pagar",
  "choices": [
   "Parar de pagar a dívida externa",
   "Seguir pagando e buscar novo acordo com o FMI",
   "Acabar com a paridade de um peso por dólar"
  ]
 },
 "1962-slavery": {
  "place": "Riad",
  "pov": "Em junho, o rei proibiu a compra e a venda de pessoas, mas ter escravizados ainda é legal. Os Estados Unidos pressionam por reformas. Você é o primeiro-ministro da Arábia Saudita.",
  "short": "Faisal",
  "did": "Em novembro de 1962, Faisal proibiu a posse de escravizados na Arábia Saudita, como parte do seu programa de reformas em dez pontos.",
  "next": "Os tradicionalistas se opuseram, e a aplicação foi lenta: segundo alguns relatos, o comércio de escravizados continuou por pelo menos vinte anos. Alguns escravizados libertados continuaram trabalhando para os antigos donos.",
  "stamp": "Arábia Saudita acaba com a escravidão",
  "choices": [
   "Proibir de vez a posse de escravizados",
   "Manter a proibição só das vendas",
   "Libertar os escravizados aos poucos, em anos"
  ]
 },
 "1898-philippines": {
  "place": "Washington",
  "pov": "Depois da guerra com a Espanha, começam em Paris as negociações de paz. Os rebeldes filipinos querem a independência; a Alemanha parece pronta a intervir se você sair. Você é o presidente dos Estados Unidos.",
  "short": "McKinley",
  "did": "McKinley telegrafou dizendo que o dever não lhe deixava outra escolha senão exigir o arquipélago inteiro. Pelo Tratado de Paris, de 10 de dezembro de 1898, a Espanha o cedeu por 20 milhões de dólares.",
  "next": "O Senado aprovou o tratado por 57 a 27 em 6 de fevereiro de 1899, dois dias depois de começarem os combates com forças filipinas em Manila. Os EUA venceram essa guerra em 1902.",
  "stamp": "Os EUA ficam com as Filipinas",
  "choices": [
   "Ficar só com Manila, como base naval",
   "Tomar da Espanha todas as ilhas",
   "Conceder independência às Filipinas"
  ]
 },
 "1967-referendum": {
  "place": "Camberra",
  "pov": "A sua Constituição diz que os aborígenes não devem ser contados na população e impede o Parlamento de fazer leis para eles. Ativistas querem mudar isso. Você é o primeiro-ministro da Austrália.",
  "short": "Holt",
  "did": "Em 22 de fevereiro de 1967, o gabinete de Holt decidiu fazer um referendo sobre as duas mudanças. O Parlamento aprovou o projeto por unanimidade, por isso não houve uma campanha oficial pelo “Não”.",
  "next": "Em 27 de maio de 1967, 90,77% dos eleitores disseram sim, com maioria em todos os estados. O Parlamento passou a poder fazer leis para os aborígenes, e eles puderam ser contados na população.",
  "stamp": "O referendo de 1967",
  "choices": [
   "Acabar só com a proibição de contá-los",
   "Deixar a Constituição como está",
   "Levar as duas mudanças a um referendo"
  ]
 },
 "1893-mekong": {
  "place": "Bangcoc",
  "pov": "Canhoneiras francesas forçaram a passagem rio acima até Bangcoc. A França exige todo o território a leste do Mekong e três milhões de francos. A Grã-Bretanha não vai ajudar. Você é o rei do Sião.",
  "short": "Chulalongkorn",
  "did": "O Sião se submeteu por completo às condições francesas. Chulalongkorn cedeu à França todos os territórios laosianos a leste do Mekong, e um tratado foi assinado em 3 de outubro de 1893.",
  "next": "A França ocupou Chanthaburi até 1907. Chulalongkorn continuou fazendo concessões territoriais ao Ocidente, na esperança de que o Sião mantivesse a independência como um todo.",
  "stamp": "O Sião abre mão do Laos",
  "choices": [
   "Continuar lutando e defender Bangcoc",
   "Aceitar integralmente as condições da França",
   "Aceitar só uma parte das exigências"
  ]
 },
 "2000-zedillo-concedes": {
  "place": "Cidade do México",
  "pov": "O seu partido está na presidência há cerca de 70 anos. Na noite da eleição, os resultados preliminares mostram o candidato da oposição vencendo. O candidato do seu partido ainda não reconheceu a derrota. Você é o presidente do México.",
  "short": "Zedillo",
  "did": "Naquela noite, Zedillo falou na TV nacional, citando os resultados preliminares do instituto eleitoral. Reconheceu a vitória de Vicente Fox, disse que tinha acabado de telefonar para ele e o parabenizou.",
  "next": "O PRI perdeu a presidência pela primeira vez em cerca de 70 anos. O fato de o reconhecimento ter vindo dele, e não do candidato do PRI, Francisco Labastida, causou depois tensões entre os dois.",
  "stamp": "A noite da eleição no México",
  "choices": [
   "Esperar a apuração oficial terminar",
   "Ir à TV na hora e reconhecer o vencedor",
   "Deixar o candidato do partido reconhecer antes"
  ]
 },
 "1666-great-fire": {
  "place": "Londres",
  "pov": "Um incêndio destruiu cerca de 13.000 casas na sua capital, além da Catedral de São Paulo. Christopher Wren e outros propõem uma cidade nova, de ruas largas em forma de grade. Você é o rei da Inglaterra.",
  "short": "Carlos II",
  "did": "Carlos tinha incentivado planos radicais, mas pagar aos donos por uma remodelação completa se mostrou irrealista. Boa parte do antigo traçado das ruas foi recriada, com ruas mais largas.",
  "next": "Os novos edifícios tinham de ser de tijolo ou pedra, e não de madeira. A maior parte da reconstrução particular terminou em 1671, e Wren projetou 51 igrejas novas.",
  "stamp": "Londres depois do Grande Incêndio",
  "choices": [
   "Reconstruir as velhas ruas em tijolo e pedra",
   "Construir a nova cidade de ruas largas de Wren",
   "Deixar cada dono reconstruir como quiser"
  ]
 },
 "1970-black-september": {
  "place": "Amã",
  "pov": "Grupos armados palestinos tomaram a cidade de Irbid e pedem abertamente a sua derrubada. Aviões de passageiros sequestrados foram explodidos em seu território. Você é o rei da Jordânia.",
  "short": "Hussein",
  "did": "Hussein formou um governo de lei marcial e, em setembro de 1970, ordenou que o exército atacasse. Ele atingiu a sede dos fedayin em Amã.",
  "next": "Tanques sírios entraram na Jordânia em 18 de setembro; em 22 de setembro, a maré tinha virado. Um cessar-fogo foi assinado no Cairo em 27 de setembro, e em julho de 1971 o rei expulsou os últimos combatentes.",
  "stamp": "Setembro Negro na Jordânia",
  "choices": [
   "Mandar o exército atacá-los",
   "Negociar um novo acordo com eles",
   "Pedir mediação a líderes árabes"
  ]
 },
 "1967-arusha": {
  "place": "Arusha",
  "pov": "Os planos de desenvolvimento do seu país dependem muito da ajuda estrangeira e de apoio de fora. O seu partido governista precisa agora definir o rumo para os próximos anos. Você é o presidente da Tanzânia.",
  "short": "Nyerere",
  "did": "Em 5 de fevereiro de 1967, Nyerere emitiu a Declaração de Arusha: socialismo e autossuficiência. Regras rígidas limitavam até onde os líderes podiam acumular riqueza.",
  "next": "Bancos, recursos naturais e grandes indústrias foram nacionalizados de imediato. A partir de 1973, as pessoas foram transferidas, muitas vezes à força, para aldeias Ujamaa: segundo a contagem de Nyerere, mais de sete milhões até junho de 1975.",
  "stamp": "A Declaração de Arusha",
  "choices": [
   "Buscar mais ajuda e investimento estrangeiros",
   "Construir o socialismo com autossuficiência",
   "Abrir a economia aos negócios privados"
  ]
 },
 "1983-franklin-dam": {
  "place": "Camberra",
  "pov": "O governo da Tasmânia segue em frente com uma represa no rio Franklin, em uma área de Patrimônio Mundial. Manifestantes bloqueiam o local desde dezembro. Você é o novo primeiro-ministro da Austrália.",
  "short": "Hawke",
  "did": "O governo de Hawke aprovou a Lei de Conservação de Bens do Patrimônio Mundial de 1983 para parar as obras da represa e levou a Tasmânia à Alta Corte.",
  "next": "A Alta Corte decidiu por 4 a 3 a favor do governo federal, e a Tasmânia teve de abandonar a represa. Os planos nunca foram retomados.",
  "stamp": "Hawke barra a represa do Franklin",
  "choices": [
   "Deixar com a Tasmânia, assunto do estado",
   "Barrar a represa com uma lei federal",
   "Oferecer dinheiro à Tasmânia para desistir"
  ]
 },
 "1948-eo-9981": {
  "place": "Washington",
  "pov": "Mais de um milhão de americanos negros serviram na Segunda Guerra Mundial, em forças segregadas. Senadores do Sul ameaçam obstruir as suas propostas de direitos civis. Você é o presidente dos Estados Unidos.",
  "short": "Truman",
  "did": "Em 26 de julho de 1948, Truman assinou a Ordem Executiva 9981. Ela declarava “igualdade de tratamento e de oportunidades para todas as pessoas nas forças armadas”.",
  "next": "Os militares resistiram no começo, mas, ao fim da Guerra da Coreia, quase todas as unidades já estavam integradas. A última unidade só de negros foi extinta em setembro de 1954.",
  "stamp": "Forças armadas sem segregação",
  "choices": [
   "Seguir pressionando o Congresso por uma lei",
   "Deixar a decisão com os militares",
   "Proibir a segregação por ordem executiva"
  ]
 },
 "1993-oslo": {
  "place": "Jerusalém",
  "pov": "A Noruega montou um canal secreto em Oslo, onde dois acadêmicos israelenses e a OLP redigiram um acordo. Ele precisa do seu apoio. Você é o primeiro-ministro de Israel.",
  "short": "Rabin",
  "did": "Rabin apoiou o acordo. Em setembro de 1993, assinou a carta de Israel reconhecendo a OLP como representante do povo palestino.",
  "next": "Em 13 de setembro de 1993, a Declaração de Princípios foi assinada na Casa Branca, com um histórico aperto de mão entre Rabin e Arafat. Rabin foi assassinado em novembro de 1995.",
  "stamp": "Os Acordos de Oslo",
  "choices": [
   "Apoiar o acordo e reconhecer a OLP",
   "Renegar as conversas secretas",
   "Continuar conversando, mas não com a OLP"
  ]
 },
 "1978-reform-opening": {
  "place": "Pequim",
  "pov": "Depois de anos de luta de classes em massa, o Partido Comunista precisa escolher a sua tarefa principal. O Comitê Central se reúne em Pequim em dezembro de 1978. Você é o líder em ascensão do partido.",
  "short": "Deng",
  "did": "A reunião plenária de 18 a 22 de dezembro de 1978 disse que a luta de classes em massa havia, em geral, chegado ao fim e fez da modernização socialista o foco do partido.",
  "next": "Isso marcou o início da política de reforma e abertura. É amplamente visto como o momento em que Deng se tornou o líder supremo da China, no lugar de Hua Guofeng.",
  "stamp": "Reforma e abertura",
  "choices": [
   "Manter a luta de classes como tarefa principal",
   "Fazer da modernização da economia a tarefa principal",
   "Impulsionar o crescimento com planos estatais maiores"
  ]
 },
 "1956-personal-status": {
  "place": "Túnis",
  "pov": "A lei de família do seu país, recém-independente, permite que um homem tenha até quatro esposas e se divorcie da mulher só dizendo isso três vezes. Você é o primeiro-ministro da Tunísia.",
  "short": "Bourguiba",
  "did": "Sob Bourguiba, o Código do Estatuto Pessoal foi promulgado em 13 de agosto de 1956. Ele aboliu a poligamia e o repúdio: o divórcio passou a ser possível apenas perante um tribunal.",
  "next": "Imãs que pregaram contra o Código foram presos, e os juízes que assinaram uma fatwa contra ele foram quase todos demitidos ou aposentados. O Código entrou em vigor em 1º de janeiro de 1957.",
  "stamp": "A Tunísia proíbe a poligamia",
  "choices": [
   "Deixar a lei de família como está",
   "Restringir a poligamia, mas sem proibi-la",
   "Proibir a poligamia e o divórcio por repúdio"
  ]
 },
 "1971-copper": {
  "place": "Santiago",
  "pov": "O Congresso votou por unanimidade a nacionalização das grandes minas de cobre de propriedade americana. Cabe a você definir quanto as empresas receberão. Você é o presidente do Chile.",
  "short": "Allende",
  "did": "Em 28 de setembro, Allende anunciou que 774 milhões de dólares de lucros excessivos seriam descontados do que a Anaconda e a Kennecott receberiam.",
  "next": "As empresas não receberam nenhuma indenização pelas minas de Chuquicamata, El Salvador e El Teniente. O Departamento de Estado dos EUA chamou aquilo de grave infração da prática internacional.",
  "stamp": "O Chile nacionaliza o cobre",
  "choices": [
   "Negociar um preço com as empresas",
   "Pagar o valor contábil total das minas",
   "Descontar “lucros excessivos” do pagamento"
  ]
 },
 "2003-rose-revolution": {
  "place": "Tbilisi",
  "pov": "Manifestantes que dizem que a eleição parlamentar foi fraudada invadiram o parlamento com rosas nas mãos. Você decretou estado de emergência, mas unidades de elite do exército se recusam a apoiá-lo. Você é o presidente da Geórgia.",
  "short": "Shevardnadze",
  "did": "Na noite de 23 de novembro de 2003, depois de se reunir com os líderes da oposição Saakashvili e Zhvania, Shevardnadze anunciou a sua renúncia.",
  "next": "A presidente do parlamento, Nino Burjanadze, assumiu a presidência interina. Em 4 de janeiro de 2004, Saakashvili, sem adversários, foi eleito presidente com 96,2% dos votos.",
  "stamp": "A Revolução das Rosas",
  "choices": [
   "Mandar a polícia leal limpar as ruas",
   "Renunciar e passar o poder",
   "Prometer nova eleição, mas ficar"
  ]
 },
 "1988-ceasefire": {
  "place": "Teerã",
  "pov": "Há oito anos o seu país luta contra o Iraque, a um custo enorme. Desde abril, as suas forças vêm perdendo terreno. Uma resolução da ONU pede um cessar-fogo. Você é o líder supremo do Irã.",
  "short": "Khomeini",
  "did": "O Irã aceitou a Resolução 598 da ONU em julho de 1988. Khomeini disse à nação que tomar essa decisão era “mais mortal do que tomar veneno”.",
  "next": "O cessar-fogo entrou em vigor em 20 de agosto de 1988. Observadores da ONU da missão UNIIMOG ficaram na fronteira entre Irã e Iraque até 1991.",
  "stamp": "O Irã aceita o cessar-fogo",
  "choices": [
   "Aceitar o cessar-fogo da ONU",
   "Lutar até o líder do Iraque cair",
   "Insistir antes em condições melhores"
  ]
 },
 "1965-udi": {
  "place": "Salisbury",
  "pov": "A Grã-Bretanha não dará independência ao seu país sem um caminho para o governo da maioria negra. Os brancos, cerca de 5% da população, detêm o poder. Londres oferece uma Comissão Real. Você é o primeiro-ministro da Rodésia.",
  "short": "Smith",
  "did": "Em 11 de novembro de 1965, Smith e o seu gabinete declararam a independência em relação à Grã-Bretanha. A Grã-Bretanha a chamou de ilegal e buscou sanções em vez de usar a força; nenhum país a reconheceu.",
  "next": "A Rodésia se declarou república em 1970, enquanto crescia uma guerra de guerrilha. A declaração foi revogada pelo Acordo de Lancaster House, de 1979, e o Zimbábue se tornou independente em 1980.",
  "stamp": "A Rodésia rompe com a Grã-Bretanha",
  "choices": [
   "Confiar em uma Comissão Real britânica",
   "Declarar a independência unilateralmente",
   "Concordar com um cronograma para o governo da maioria"
  ]
 },
 "1945-hiroshima": {
  "place": "Washington",
  "pov": "Os seus cientistas acabam de testar um novo tipo de bomba. O Japão continua lutando, e uma invasão do Japão está sendo planejada. Você é o presidente dos Estados Unidos.",
  "short": "Truman",
  "did": "Truman deixou o plano seguir: o diário dele diz que a arma seria usada contra o Japão antes de 10 de agosto. Em 6 de agosto de 1945, o Enola Gay a lançou sobre Hiroshima.",
  "next": "Ela matou de 90.000 a 166.000 pessoas em Hiroshima, cerca de metade no primeiro dia. Depois que uma segunda bomba atingiu Nagasaki, em 9 de agosto, o Japão anunciou a rendição.",
  "stamp": "Truman e a bomba atômica",
  "choices": [
   "Usá-la em uma cidade, sem aviso especial",
   "Demonstrá-la antes, onde ninguém mora",
   "Guardá-la e invadir como planejado"
  ]
 },
 "1889-pedro-exile": {
  "place": "Rio de Janeiro",
  "pov": "Conspiradores deram um golpe, prenderam o seu primeiro-ministro e proclamaram a república. Políticos e chefes militares sugerem maneiras de sufocar a rebelião. Você é o imperador do Brasil.",
  "short": "Dom Pedro II",
  "did": "Dom Pedro II descartou todas as sugestões para sufocar a rebelião. Sem querer provocar um conflito civil, aceitou o exílio sem resistência.",
  "next": "Ao meio-dia de 17 de novembro de 1889, ele e a família embarcaram rumo ao exílio na Europa. Morreu em Paris em 5 de dezembro de 1891.",
  "stamp": "O imperador do Brasil parte",
  "choices": [
   "Mandar tropas leais esmagarem a revolta",
   "Aceitar o exílio e partir sem lutar",
   "Abdicar em favor da sua filha"
  ]
 },
 "1984-snap-election": {
  "place": "Wellington",
  "pov": "É ano de eleição, e a sua maioria é pequena. Um dos seus deputados não vai apoiar você no projeto antinuclear da oposição. Você é o primeiro-ministro da Nova Zelândia.",
  "short": "Muldoon",
  "did": "Na noite de 14 de junho de 1984, Muldoon anunciou eleições antecipadas na televisão nacional. Elas foram realizadas um mês depois, em 14 de julho.",
  "next": "Os trabalhistas, liderados por David Lange, ganharam 56 das 95 cadeiras; o Partido Nacional ficou com apenas 37. Muldoon se recusou, a princípio, a desvalorizar o dólar, o que causou uma crise constitucional.",
  "stamp": "A eleição antecipada de Muldoon",
  "choices": [
   "Seguir governando, mesmo perdendo essa votação",
   "Convocar eleições antecipadas para o mês que vem",
   "Transformar a votação em questão de confiança"
  ]
 },
 "1923-ankara": {
  "place": "Ancara",
  "pov": "A guerra de independência foi conduzida a partir de Ancara, uma cidade modesta da Anatólia. Alguns deputados argumentam que Istambul, a antiga cidade imperial, deve continuar sendo a capital. Você é o líder do novo Estado turco.",
  "short": "Atatürk",
  "did": "A liderança do país escolheu Ancara. Uma lei de um único artigo, proposta por İsmet Paxá, foi aprovada pela Assembleia por grande maioria em 13 de outubro de 1923.",
  "next": "A República foi proclamada 16 dias depois, em 29 de outubro de 1923. A modesta cidade da Anatólia se transformou em uma capital moderna.",
  "stamp": "Ancara vira capital",
  "choices": [
   "Fazer de Ancara a capital",
   "Manter Istambul como capital",
   "Manter Ancara só por enquanto"
  ]
 },
 "1989-martial-law-beijing": {
  "place": "Pequim",
  "pov": "Estudantes em greve de fome protestam na Praça Tiananmen. Os cinco membros do Comitê Permanente do partido não chegam a um acordo sobre como responder. Você é o líder que tem a palavra final na China.",
  "short": "Deng",
  "did": "Em 17 de maio de 1989, Deng disse aos cinco membros do Comitê Permanente que era hora de chamar os militares para impor a lei marcial. Li Peng a anunciou na madrugada de 20 de maio.",
  "next": "Os manifestantes barraram muitas unidades com bloqueios nas ruas. Deng mandou começar a usar a força na noite de 3 de junho; centenas de pessoas morreram, se não mais.",
  "stamp": "Lei marcial em Pequim",
  "choices": [
   "Buscar uma saída conciliadora, pelo diálogo",
   "Decretar a lei marcial na capital",
   "Esperar o protesto perder força"
  ]
 },
 "1948-cominform": {
  "place": "Belgrado",
  "pov": "Partidos comunistas da União Soviética e dos seus aliados se reúnem em Bucareste para condenar a “política pouco amistosa” do seu partido em relação à União Soviética. O seu partido foi convidado. Você é o líder da Iugoslávia.",
  "short": "Tito",
  "did": "O partido de Tito se recusou a comparecer. Quando o Birô de Informação condenou os seus líderes, em 28 de junho de 1948, o partido iugoslavo rejeitou as críticas.",
  "next": "A resolução pôs o partido iugoslavo fora das fileiras do Birô. Ela pedia que os “elementos saudáveis” do partido substituíssem os seus líderes.",
  "stamp": "Tito desafia o Cominform",
  "choices": [
   "Não ir e rejeitar as acusações",
   "Ir a Bucareste e responder às acusações",
   "Aceitar as críticas e mudar de rumo"
  ]
 },
 "1983-juntas-trial": {
  "place": "Buenos Aires",
  "pov": "O governo militar que durava desde 1976 acaba de terminar. A junta que saía tinha aprovado uma lei que concedia anistia a ela mesma. Você é o novo presidente da Argentina.",
  "short": "Alfonsín",
  "did": "Em 13 de dezembro de 1983, Alfonsín assinou o Decreto 158, ordenando processos contra os nove oficiais das três primeiras juntas. Em 29 de dezembro, o Congresso anulou a lei de autoanistia.",
  "next": "Quando um tribunal militar se recusou a julgá-los, um tribunal civil o fez, a partir de abril de 1985. Videla e Massera foram condenados à prisão perpétua; Carlos Menem perdoou depois os condenados.",
  "stamp": "O julgamento das juntas",
  "choices": [
   "Respeitar a anistia e olhar para a frente",
   "Anulá-la e processar os chefes da junta",
   "Processar todos os oficiais acusados de crimes"
  ]
 },
 "1871-prefectures": {
  "place": "Tóquio",
  "pov": "Em 1869, os senhores feudais do Japão entregaram as suas terras ao imperador, mas 261 domínios continuam existindo, ainda administrados pelos antigos senhores, como governadores. Você é um dos principais reformistas do novo governo do Japão.",
  "short": "Ōkubo",
  "did": "Em agosto de 1871, Ōkubo, ajudado por Saigō Takamori, fez passar um édito imperial que abolia os domínios. Prefeituras subordinadas ao governo de Tóquio os substituíram.",
  "next": "Os antigos senhores se tornaram uma nobreza pensionada que vivia em Tóquio, e o Estado assumiu as dívidas dos domínios. Em 1874, as pensões deles foram convertidas em títulos do governo.",
  "stamp": "Os domínios viram prefeituras",
  "choices": [
   "Deixar os senhores no cargo, como governadores",
   "Abolir os domínios e criar prefeituras",
   "Eliminar os domínios aos poucos, em muitos anos"
  ]
 },
 "1999-republic-referendum": {
  "place": "Camberra",
  "pov": "Você prometeu um referendo se a sua convenção apoiasse com clareza um modelo republicano. Ela apoiou um presidente escolhido pelo Parlamento, por 73 votos a 57, com 22 abstenções. Você é o primeiro-ministro da Austrália.",
  "short": "Howard",
  "did": "Howard levou o modelo a um referendo em 6 de novembro de 1999, com um presidente nomeado por dois terços do Parlamento. Uma segunda pergunta propunha um novo preâmbulo.",
  "next": "A proposta foi rejeitada: 54,87% votaram Não, e nenhum estado teve maioria pelo Sim. Os pedidos de um novo referendo foram ignorados pelo governo Howard.",
  "stamp": "O referendo da república na Austrália",
  "choices": [
   "Levar esse modelo a um referendo",
   "Desistir: o apoio não foi claro",
   "Buscar um presidente eleito diretamente"
  ]
 },
 "1972-nixon-china": {
  "place": "Washington",
  "pov": "O seu país não tem relações oficiais com a China comunista, mas Mao diz que teria prazer em conversar com você. A guerra do Vietnã está se intensificando. Você é o presidente dos Estados Unidos.",
  "short": "Nixon",
  "did": "Nixon anunciou na televisão, ao vivo, em 15 de julho de 1971, que iria. De 21 a 28 de fevereiro de 1972, visitou a China e se encontrou com Mao, o primeiro presidente americano em exercício a fazer isso.",
  "next": "Nixon chamou a viagem de “a semana que mudou o mundo”. Os EUA disseram que retirariam de Taiwan as tropas que ainda tinham lá, e as relações diplomáticas formais vieram em 1979.",
  "stamp": "Nixon vai à China",
  "choices": [
   "Conversar só em segredo, por meio de enviados",
   "Manter a China isolada, como antes",
   "Ir à China e se encontrar com Mao pessoalmente"
  ]
 },
 "1990-zambia-multiparty": {
  "place": "Lusaca",
  "pov": "O seu é o único partido legal. Depois de três dias de tumultos em Lusaca e de um golpe fracassado, a oposição exige o multipartidarismo. Está previsto um referendo sobre o tema. Você é o presidente da Zâmbia.",
  "short": "Kaunda",
  "did": "Em setembro de 1990, Kaunda cancelou o referendo e apoiou emendas que acabavam com o monopólio do seu partido. Antecipou também as eleições de 1993 para 1991.",
  "next": "Em 31 de outubro de 1991, ele perdeu por larga margem para Frederick Chiluba, cujo partido ganhou 125 das 150 cadeiras. Kaunda aceitou o resultado e se aposentou.",
  "stamp": "A Zâmbia adota o multipartidarismo",
  "choices": [
   "Fazer o referendo, como planejado",
   "Cancelá-lo e legalizar outros partidos",
   "Recusar: manter o Estado de partido único"
  ]
 },
 "1989-hungary-border": {
  "place": "Budapeste",
  "pov": "Milhares de alemães orientais estão no seu país, na esperança de fugir para o Ocidente pela Áustria. Deixá-los ir irritaria a Alemanha Oriental e os linhas-duras de Moscou. Você é o primeiro-ministro da Hungria.",
  "short": "Németh",
  "did": "Németh disse em segredo ao chanceler da Alemanha Ocidental, Helmut Kohl, que a Hungria abriria a fronteira. Ela o fez na noite de 10 para 11 de setembro de 1989, sem pedir nada em troca.",
  "next": "Mais de 10.000 alemães orientais saíram pela Áustria nas primeiras 24 horas. Em 9 de novembro, os portões de Berlim Ocidental foram abertos.",
  "stamp": "A Hungria abre a fronteira",
  "choices": [
   "Mandá-los de volta à Alemanha Oriental",
   "Manter a fronteira fechada por enquanto",
   "Abrir a fronteira e deixá-los partir"
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["your-call"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["your-call"] = days;
  window.LG_PUZZLES["your-call.byId"] = byId;
})();
