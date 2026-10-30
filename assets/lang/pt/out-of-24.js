/* Logicers: the pt words of out-of-24, one entry per puzzle (by its id), laid under every day number that plays it up to day 1000
   (build_lang.py, from assets/lang/src/puzzles-out-of-24-pt.md). Day d plays puzzles[(d - 1) % stock], as in the game's own script, so a
   puzzle that comes round again keeps its words. Do not edit by hand: change the doc, rebuild. */
window.LG_PUZZLES = window.LG_PUZZLES || {};
(function () {
  var byId = {
 "elephant-wild-sleep": {
  "face": "Elefante-africano",
  "label": "dormindo",
  "fig": "2 h",
  "sentence": "Dois elefantes-africanos selvagens, acompanhados por mais de um mês, dormiam só cerca de duas horas por dia.",
  "note": "Duas matriarcas no Parque Nacional de Chobe, em Botsuana, com um registrador de dados na tromba, durante 35 dias (Gravett e outros, PLOS ONE, 2017).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   },
   {
    "i": "pin",
    "t": "na natureza"
   }
  ]
 },
 "us-75-tv": {
  "face": "EUA",
  "label": "vendo TV",
  "fig": "4 h 35",
  "sentence": "Nos EUA, quem tem 75 anos ou mais vê cerca de 4 horas e 35 minutos de TV por dia.",
  "note": "Departamento de Estatísticas do Trabalho dos EUA, 2024, todos os dias da semana. Quem tem de 20 a 24 anos vê cerca de 1 hora e 42 minutos.",
  "chips": [
   {
    "i": "tv",
    "t": "vendo TV"
   },
   {
    "i": "people",
    "t": "75 anos ou mais"
   }
  ]
 },
 "bat-sleep": {
  "face": "Morcego-marrom-pequeno",
  "label": "dormindo",
  "fig": "19 h 54",
  "sentence": "Um morcego-marrom-pequeno pode dormir cerca de 19,9 horas por dia e fica acordado por pouco mais de quatro horas.",
  "note": "O número vem de um único estudo de laboratório, em uma sala aquecida a 33 °C; a 26 °C os morcegos dormiram 11 horas.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "fr-eating": {
  "face": "França",
  "label": "comendo",
  "fig": "2 h 13",
  "sentence": "Na França, as pessoas passam 2 horas e 13 minutos por dia comendo: cerca do dobro do tempo dos americanos.",
  "note": "Refeições como atividade principal, pessoas a partir de 15 anos (INSEE, 2009-2010). Contando as refeições feitas enquanto se faz outra coisa, o tempo é maior.",
  "chips": [
   {
    "i": "eating",
    "t": "comendo"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "cow-lying": {
  "face": "Vaca leiteira",
  "label": "deitada",
  "fig": "12 a 14 h",
  "sentence": "Uma vaca leiteira passa de 12 a 14 horas por dia deitada, mas dorme só cerca de 4.",
  "note": "Vacas leiteiras em estábulo. Um estudo tcheco achou 12,6 horas em média, deitadas e descansando nas baias.",
  "chips": [
   {
    "i": "lying",
    "t": "deitada"
   },
   {
    "i": "pin",
    "t": "em uma fazenda"
   }
  ]
 },
 "penguin-microsleep": {
  "face": "Pinguim",
  "label": "dormindo",
  "fig": "11 h",
  "sentence": "Pinguins-de-barbicha no ninho tiram mais de 10.000 sonecas por dia, de poucos segundos cada: cerca de 11 horas ao todo.",
  "note": "Pinguins-de-barbicha selvagens na Ilha Rei George, na Antártida, com gravadores de ondas cerebrais e vídeo (Libourel e outros, Science, 2023).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "jp-men-housework": {
  "face": "Japão",
  "label": "tarefas domésticas e cuidados",
  "fig": "51 min",
  "sentence": "Os homens no Japão passam 51 minutos por dia com tarefas domésticas, cuidados e compras; as mulheres, 3 horas e 24 minutos.",
  "note": "Homens a partir de 10 anos, média de toda a semana, 2021 (Departamento de Estatísticas do Japão). São 7 minutos a mais que em 2016.",
  "chips": [
   {
    "i": "care",
    "t": "tarefas domésticas e cuidados"
   },
   {
    "i": "people",
    "t": "homens"
   }
  ]
 },
 "cat-sleep": {
  "face": "Gato",
  "label": "dormindo",
  "fig": "12 h 06 a 14 h 30",
  "sentence": "Um gato dorme cerca de 12 a 14,5 horas por dia: metade da vida ou mais.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "platypus-dreaming": {
  "face": "Ornitorrinco",
  "label": "sonhando",
  "fig": "5 h 48 a 8 h",
  "sentence": "Um ornitorrinco passa de 5,8 a 8 horas por dia no sono REM, o sono dos sonhos: mais que qualquer outro animal medido.",
  "note": "Só o sono REM, e não o sono todo (Siegel e outros, Neuroscience, 1999). A Australian Platypus Conservancy diz que são mais de oito horas.",
  "chips": [
   {
    "i": "dreaming",
    "t": "sonhando"
   }
  ]
 },
 "us-women-housework": {
  "face": "EUA",
  "label": "tarefas domésticas",
  "fig": "2 h 19",
  "sentence": "Nos EUA, as mulheres passam cerca de 2 horas e 19 minutos por dia com tarefas domésticas; os homens, cerca de 1,5 hora.",
  "note": "Limpar, cozinhar, cuidar do jardim e da casa; não entram o cuidado com crianças nem as compras (Pew Research Center; Departamento de Estatísticas do Trabalho dos EUA, 2024).",
  "chips": [
   {
    "i": "housework",
    "t": "tarefas domésticas"
   },
   {
    "i": "people",
    "t": "mulheres"
   }
  ]
 },
 "asian-elephant-sleep": {
  "face": "Elefante-asiático",
  "label": "dormindo",
  "fig": "3 h 54",
  "sentence": "Um elefante-asiático dorme cerca de 3,9 horas por dia e fica 20 horas acordado.",
  "note": "Elefantes-africanos selvagens, acompanhados em Botsuana em 2017, dormiam só cerca de duas horas por dia.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "cow-cud": {
  "face": "Vaca leiteira",
  "label": "ruminando",
  "fig": "7 a 10 h",
  "sentence": "Uma vaca leiteira passa de 7 a 10 horas por dia ruminando: trazendo a comida de volta à boca para mastigar de novo.",
  "note": "Vacas leiteiras em estábulo, em pé ou deitadas. Um estudo tcheco achou 8,2 horas em média.",
  "chips": [
   {
    "i": "cud",
    "t": "ruminando"
   },
   {
    "i": "pin",
    "t": "em uma fazenda"
   }
  ]
 },
 "fr-paid-work": {
  "face": "França",
  "label": "trabalho remunerado",
  "fig": "3 h 24",
  "sentence": "Na média de todos os franceses de 15 a 64 anos, estejam trabalhando ou não, são 3 horas e 24 minutos de trabalho remunerado por dia.",
  "note": "Números da OCDE da pesquisa do INSEE de 2009-2010, nos sete dias da semana, fins de semana incluídos. Um dia de trabalho é bem mais longo.",
  "chips": [
   {
    "i": "work",
    "t": "trabalho remunerado"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "dog-sleep": {
  "face": "Cachorro",
  "label": "dormindo",
  "fig": "10 h 19 a 14 h 24",
  "sentence": "Os cachorros costumam passar de 43 a 60% do dia dormindo: cerca de 10 a 14,5 horas.",
  "note": "A Scientific Reports resume assim os estudos anteriores; a tabela da Universidade de Washington indica 10,6 horas.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "it-women-housework": {
  "face": "Itália",
  "label": "tarefas domésticas e cuidados",
  "fig": "5 h 06",
  "sentence": "As mulheres na Itália passam 5 horas e 6 minutos por dia em trabalho não remunerado, como as tarefas domésticas e o cuidado de outras pessoas.",
  "note": "Números da OCDE da pesquisa do ISTAT de 2013-2014: mulheres de 15 a 64 anos, nos sete dias da semana. Elas também fazem 2 horas e 13 minutos de trabalho remunerado.",
  "chips": [
   {
    "i": "care",
    "t": "tarefas domésticas e cuidados"
   },
   {
    "i": "people",
    "t": "mulheres"
   }
  ]
 },
 "jp-eating": {
  "face": "Japão",
  "label": "comendo",
  "fig": "1 h 39",
  "sentence": "No Japão, as pessoas passam 1 hora e 39 minutos por dia fazendo refeições, segundo a pesquisa nacional de 2021.",
  "note": "Todas as pessoas a partir de 10 anos, média de toda a semana (Departamento de Estatísticas do Japão).",
  "chips": [
   {
    "i": "eating",
    "t": "comendo"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "rabbit-sleep": {
  "face": "Coelho",
  "label": "dormindo",
  "fig": "8 h 24",
  "sentence": "Um coelho dorme cerca de 8,4 horas por dia: mais ou menos um terço da vida.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "koala-sleep": {
  "face": "Coala",
  "label": "dormindo",
  "fig": "18 a 22 h",
  "sentence": "Aninhado na bifurcação de uma árvore, um coala pode dormir de 18 a 22 horas por dia.",
  "note": "Nenhuma fonte cita um estudo nem diz se os coalas eram selvagens ou de zoológico. O Zoológico de Taronga fala em 18 a 20.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "cn-sleep": {
  "face": "China",
  "label": "dormindo ou descansando",
  "fig": "9 h 19",
  "sentence": "As pessoas na China passam 9 horas e 19 minutos por dia dormindo ou descansando, segundo a pesquisa nacional de uso do tempo de 2018.",
  "note": "Pessoas a partir de 15 anos (Departamento Nacional de Estatísticas da China). A pesquisa conta o sono e o descanso juntos.",
  "chips": [
   {
    "i": "rest",
    "t": "dormindo ou descansando"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "pig-sleep": {
  "face": "Porco",
  "label": "dormindo",
  "fig": "7 h 48 a 8 h 24",
  "sentence": "Um porco dorme cerca de 7,8 a 8,4 horas por dia, mais que uma vaca ou um cavalo.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "ant-queen-sleep": {
  "face": "Rainha de formiga-de-fogo",
  "label": "dormindo",
  "fig": "9 h 24",
  "sentence": "Uma rainha de formiga-de-fogo tira cerca de 92 sonecas por dia, de uns seis minutos cada: cerca de 9,4 horas de sono.",
  "note": "Formigas-de-fogo vermelhas (Solenopsis invicta), chamadas de lava-pés no Brasil (Cassill e outros, Journal of Insect Behavior, 2009). As operárias dormem cerca de metade disso.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "us-eating": {
  "face": "EUA",
  "label": "comendo",
  "fig": "1 h 02 a 1 h 13",
  "sentence": "As pessoas nos EUA passam só cerca de uma hora por dia comendo e bebendo: menos que em qualquer outro país comparado.",
  "note": "1 hora e 13 minutos em 2025 (Departamento de Estatísticas do Trabalho dos EUA, a partir de 15 anos); 1 hora e 2 minutos em uma comparação mais antiga da OCDE.",
  "chips": [
   {
    "i": "eating",
    "t": "comendo"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "hedgehog-sleep": {
  "face": "Ouriço",
  "label": "dormindo",
  "fig": "10 h 06 a 10 h 42",
  "sentence": "Um ouriço europeu dorme de 10 a 10,7 horas por dia, quase metade do dia.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "jp-men-paid-work": {
  "face": "Japão",
  "label": "trabalho remunerado ou estudo",
  "fig": "7 h 32",
  "sentence": "Os homens no Japão, de 15 a 64 anos, dedicam 7 horas e 32 minutos por dia ao trabalho remunerado ou ao estudo, contando os fins de semana.",
  "note": "Números da OCDE da pesquisa de 2016 do Japão: todos os homens de 15 a 64 anos, trabalhando ou não, nos sete dias da semana. Homens americanos: 5 horas e 32 minutos.",
  "chips": [
   {
    "i": "workstudy",
    "t": "trabalho remunerado ou estudo"
   },
   {
    "i": "people",
    "t": "homens"
   }
  ]
 },
 "hunter-gatherer-sleep": {
  "face": "Caçadores-coletores",
  "label": "dormindo",
  "fig": "6 h 25",
  "sentence": "Três povos que vivem da caça e da coleta dormiam, em média, cerca de 6 horas e 25 minutos por noite.",
  "note": "Os hadza da Tanzânia, os san da Namíbia e os tsimane da Bolívia, com pulseiras que registram o sono (Yetish e outros, Current Biology, 2015).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "sloth-wild-sleep": {
  "face": "Bicho-preguiça",
  "label": "dormindo",
  "fig": "9 h 38",
  "sentence": "As preguiças-de-três-dedos selvagens dormiam um pouco menos de 10 horas por dia: umas seis horas a menos que as preguiças mantidas em cativeiro.",
  "note": "Preguiças-de-garganta-marrom (também chamadas de preguiças-comuns), uma espécie de preguiça-de-três-dedos, na copa da floresta tropical do Panamá, com minúsculos gravadores de ondas cerebrais (Rattenborg e outros, Biology Letters, 2008).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   },
   {
    "i": "pin",
    "t": "na natureza"
   }
  ]
 },
 "cow-eating": {
  "face": "Vaca leiteira",
  "label": "comendo",
  "fig": "3 a 5 h",
  "sentence": "Uma vaca leiteira come por 3 a 5 horas por dia, em 9 a 14 refeições.",
  "note": "Vacas leiteiras em estábulo, sem pastar. Um estudo tcheco achou de 4 a 5 horas, dentro da faixa de 3 a 6.",
  "chips": [
   {
    "i": "eating",
    "t": "comendo"
   },
   {
    "i": "pin",
    "t": "em uma fazenda"
   }
  ]
 },
 "fr-men-housework": {
  "face": "França",
  "label": "tarefas domésticas e cuidados",
  "fig": "2 h 15",
  "sentence": "Os homens na França passam 2 horas e 15 minutos por dia em trabalho não remunerado, como as tarefas domésticas e o cuidado de outras pessoas; as mulheres, 3 horas e 44 minutos.",
  "note": "Números da OCDE, homens de 15 a 64 anos, nos sete dias da semana, da pesquisa do INSEE de 2009-2010.",
  "chips": [
   {
    "i": "care",
    "t": "tarefas domésticas e cuidados"
   },
   {
    "i": "people",
    "t": "homens"
   }
  ]
 },
 "panda-eating": {
  "face": "Panda-gigante",
  "label": "comendo",
  "fig": "10 a 14 h",
  "sentence": "Um panda-gigante passa de 10 a 14 horas por dia mastigando bambu.",
  "note": "Números de dois zoológicos: 12 a 14 horas do Zoológico Nacional do Smithsonian, 10 a 14 do San Diego Zoo Wildlife Alliance.",
  "chips": [
   {
    "i": "eating",
    "t": "comendo"
   }
  ]
 },
 "orangutan-sleep": {
  "face": "Orangotango",
  "label": "dormindo",
  "fig": "8 a 10 h",
  "sentence": "Como muita gente tenta fazer, os orangotangos dormem cerca de 8 a 10 horas por dia.",
  "note": "Um estudo com orangotangos em cativeiro mediu 9,11 horas por noite em média (Samson e Shumaker, Behaviour, 2013).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   },
   {
    "i": "pin",
    "t": "em cativeiro"
   }
  ]
 },
 "jp-fathers-housework": {
  "face": "Japão",
  "label": "tarefas domésticas e cuidados",
  "fig": "1 h 54",
  "sentence": "No Japão, os homens com filhos menores de 6 anos passam 1 hora e 54 minutos por dia com tarefas domésticas, cuidados e compras.",
  "note": "Casais com um filho menor de 6 anos, média de toda a semana, 2021 (Departamento de Estatísticas do Japão). As esposas deles passam 7 horas e 28 minutos.",
  "chips": [
   {
    "i": "care",
    "t": "tarefas domésticas e cuidados"
   },
   {
    "i": "people",
    "t": "homens com filho menor de 6 anos"
   }
  ]
 },
 "chimp-sleep": {
  "face": "Chimpanzé",
  "label": "dormindo",
  "fig": "9 h 42",
  "sentence": "Um chimpanzé dorme cerca de 9,7 horas por dia, quase tanto quanto um orangotango.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "us-men-housework": {
  "face": "EUA",
  "label": "tarefas domésticas",
  "fig": "1 h 34 a 1 h 40",
  "sentence": "Nos EUA, os homens passam cerca de 1,5 hora por dia com tarefas domésticas; as mulheres, cerca de 2 horas e 20 minutos.",
  "note": "Limpar, cozinhar, cuidar do jardim e da casa; não entram o cuidado com crianças nem as compras (Pew Research Center; Departamento de Estatísticas do Trabalho dos EUA, 2024).",
  "chips": [
   {
    "i": "housework",
    "t": "tarefas domésticas"
   },
   {
    "i": "people",
    "t": "homens"
   }
  ]
 },
 "armadillo-sleep": {
  "face": "Tatu-canastra",
  "label": "dormindo",
  "fig": "18 h 06",
  "sentence": "Um tatu-canastra dorme cerca de 18 horas por dia: três quartos da vida.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "seal-sea-sleep": {
  "face": "Elefante-marinho",
  "label": "dormindo",
  "fig": "2 h",
  "sentence": "No mar por meses a fio, os elefantes-marinhos dormem só cerca de duas horas por dia.",
  "note": "Elefantes-marinhos-do-norte: registros da atividade cerebral de 13 jovens e, depois, os registros de mergulho de 334 adultos (Kendall-Bar e outros, Science, 2023).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   },
   {
    "i": "pin",
    "t": "no mar"
   }
  ]
 },
 "fr-sleep": {
  "face": "França",
  "label": "dormindo",
  "fig": "8 h 30",
  "sentence": "Na França, as pessoas dormem cerca de 8 horas e 30 minutos por dia, segundo a pesquisa nacional de uso do tempo.",
  "note": "Pesquisa do INSEE de 2009-2010, pessoas a partir de 15 anos. O The Local indica 8 h 33 na mesma pesquisa, para quem tem de 15 a 64 anos.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "cow-sleep": {
  "face": "Vaca",
  "label": "dormindo",
  "fig": "3 h 54",
  "sentence": "Uma vaca dorme só cerca de 3,9 horas por dia, embora fique deitada de 12 a 14.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "cn-eating": {
  "face": "China",
  "label": "comendo",
  "fig": "1 h 44",
  "sentence": "As pessoas na China passam 1 hora e 44 minutos por dia comendo e bebendo, um pouco mais nos dias de descanso.",
  "note": "Pessoas a partir de 15 anos, 2018 (Departamento Nacional de Estatísticas da China): 1 hora e 43 minutos nos dias de trabalho, 1 hora e 48 minutos nos dias de descanso.",
  "chips": [
   {
    "i": "eating",
    "t": "comendo"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "horse-sleep": {
  "face": "Cavalo",
  "label": "dormindo",
  "fig": "2 h 54",
  "sentence": "Um cavalo dorme só cerca de 2,9 horas por dia: menos que uma vaca.",
  "note": "Jerome Siegel, da UCLA: cavalos e elefantes dormem de 2 a 4 horas por dia, mais ou menos.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "elephant-eating": {
  "face": "Elefante",
  "label": "comendo",
  "fig": "12 a 16 h",
  "sentence": "Na natureza, um elefante passa de 12 a 16 horas por dia se alimentando.",
  "note": "Estudos de campo viram elefantes selvagens se alimentando de 12 a 14 horas por dia; 16 é o máximo citado.",
  "chips": [
   {
    "i": "eating",
    "t": "comendo"
   },
   {
    "i": "pin",
    "t": "na natureza"
   }
  ]
 },
 "jp-women-housework": {
  "face": "Japão",
  "label": "tarefas domésticas e cuidados",
  "fig": "3 h 24",
  "sentence": "As mulheres no Japão passam 3 horas e 24 minutos por dia com tarefas domésticas, cuidados e compras; os homens, 51 minutos.",
  "note": "Mulheres a partir de 10 anos, média de toda a semana, 2021 (Departamento de Estatísticas do Japão). São 4 minutos a menos que em 2016.",
  "chips": [
   {
    "i": "care",
    "t": "tarefas domésticas e cuidados"
   },
   {
    "i": "people",
    "t": "mulheres"
   }
  ]
 },
 "sloth-captive-sleep": {
  "face": "Bicho-preguiça",
  "label": "dormindo",
  "fig": "16 h",
  "sentence": "Um único estudo com preguiças em cativeiro as encontrou dormindo 16 horas por dia, e foi isso que deu às preguiças a fama de dorminhocas.",
  "note": "As preguiças selvagens da mesma espécie dormem um pouco menos de 10 horas (Rattenborg e outros, 2008). As páginas não citam o estudo feito em cativeiro.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   },
   {
    "i": "pin",
    "t": "em cativeiro"
   }
  ]
 },
 "us-tv": {
  "face": "EUA",
  "label": "vendo TV",
  "fig": "2 h 36",
  "sentence": "Nos EUA, as pessoas veem cerca de 2,6 horas de TV por dia: mais tempo que em qualquer outra atividade de lazer.",
  "note": "Pessoas a partir de 15 anos, todos os dias da semana, 2025 (Departamento de Estatísticas do Trabalho dos EUA). Em 2024 também foram 2,6 horas.",
  "chips": [
   {
    "i": "tv",
    "t": "vendo TV"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "guinea-pig-sleep": {
  "face": "Porquinho-da-índia",
  "label": "dormindo",
  "fig": "8 h 12 a 9 h 24",
  "sentence": "Um porquinho-da-índia dorme cerca de 8 a 9,5 horas por dia, algumas horas menos que um camundongo.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "seal-beach-sleep": {
  "face": "Elefante-marinho",
  "label": "dormindo",
  "fig": "10 a 11 h",
  "sentence": "Em terra, para se reproduzir ou trocar de pelo, os elefantes-marinhos dormem de 10 a 11 horas por dia.",
  "note": "Elefantes-marinhos-do-norte. No mar, em viagens de vários meses, as mesmas focas dormem só cerca de duas horas por dia.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   },
   {
    "i": "pin",
    "t": "em terra"
   }
  ]
 },
 "fr-women-housework": {
  "face": "França",
  "label": "tarefas domésticas e cuidados",
  "fig": "3 h 44",
  "sentence": "As mulheres na França passam 3 horas e 44 minutos por dia em trabalho não remunerado, como as tarefas domésticas e o cuidado de outras pessoas; os homens, 2 horas e 15 minutos.",
  "note": "Números da OCDE, mulheres de 15 a 64 anos, nos sete dias da semana, da pesquisa do INSEE de 2009-2010.",
  "chips": [
   {
    "i": "care",
    "t": "tarefas domésticas e cuidados"
   },
   {
    "i": "people",
    "t": "mulheres"
   }
  ]
 },
 "ant-worker-sleep": {
  "face": "Operária de formiga-de-fogo",
  "label": "dormindo",
  "fig": "4 h 48",
  "sentence": "Uma operária de formiga-de-fogo tira cerca de 253 sonecas por dia, de mais ou menos um minuto cada: cerca de 4,8 horas de sono.",
  "note": "Formigas-de-fogo vermelhas, chamadas de lava-pés no Brasil (Cassill e outros, Journal of Insect Behavior, 2009). A rainha dorme cerca do dobro disso.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "jp-sleep": {
  "face": "Japão",
  "label": "dormindo",
  "fig": "7 h 54",
  "sentence": "As pessoas no Japão dormem em média 7 horas e 54 minutos por dia, segundo a pesquisa nacional de 2021.",
  "note": "Todas as pessoas a partir de 10 anos, média de toda a semana, em outubro de 2021 (Departamento de Estatísticas do Japão).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "mouse-sleep": {
  "face": "Camundongo",
  "label": "dormindo",
  "fig": "12 h 06 a 13 h 12",
  "sentence": "Um camundongo dorme cerca de 12 a 13 horas por dia, quase tanto quanto um gato.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "cn-women-housework": {
  "face": "China",
  "label": "tarefas domésticas e cuidados",
  "fig": "3 h 48",
  "sentence": "As mulheres na China passam 3 horas e 48 minutos por dia em trabalho não remunerado, como as tarefas domésticas e o cuidado de outras pessoas; os homens, 1 hora e 32 minutos.",
  "note": "Pessoas a partir de 15 anos, 2018 (Departamento Nacional de Estatísticas da China). Só as tarefas domésticas: mulheres 2 horas e 6 minutos, homens 45 minutos.",
  "chips": [
   {
    "i": "care",
    "t": "tarefas domésticas e cuidados"
   },
   {
    "i": "people",
    "t": "mulheres"
   }
  ]
 },
 "hippo-eating": {
  "face": "Hipopótamo",
  "label": "comendo",
  "fig": "4 a 6 h",
  "sentence": "Um hipopótamo passa o dia na água e sai à noite para pastar por cerca de 4 a 6 horas.",
  "note": "A biblioteca do San Diego Zoo Wildlife Alliance diz cerca de 5, ou 5 a 6; o Zoológico de Dublin, 4 a 5. Um adulto come de 25 a 40 kg de plantas por dia.",
  "chips": [
   {
    "i": "eating",
    "t": "comendo"
   }
  ]
 },
 "at-women-sleep": {
  "face": "Áustria",
  "label": "dormindo",
  "fig": "8 h 52",
  "sentence": "As mulheres na Áustria dormem em média 8 horas e 52 minutos por dia e os homens, 8 horas e 46 minutos, segundo a pesquisa nacional de 2021-22.",
  "note": "Todas as pessoas a partir de 10 anos, de segunda a domingo (Statistik Austria, publicado em dezembro de 2023).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   },
   {
    "i": "people",
    "t": "mulheres"
   }
  ]
 },
 "polar-bear-rest": {
  "face": "Urso-polar",
  "label": "dormindo ou descansando",
  "fig": "20 h 53 a 21 h 36",
  "sentence": "Preso em terra no verão, sem gelo marinho de onde caçar focas, um urso-polar pode descansar cerca de 21 horas por dia.",
  "note": "Até 90% do tempo, em alguns dos 20 ursos com colares de vídeo na baía de Hudson (Serviço Geológico dos EUA, 2024); até 87% na baía James, segundo o SeaWorld.",
  "chips": [
   {
    "i": "rest",
    "t": "dormindo ou descansando"
   },
   {
    "i": "pin",
    "t": "em terra"
   }
  ]
 },
 "de-tv": {
  "face": "Alemanha",
  "label": "vendo TV",
  "fig": "2 h 07",
  "sentence": "Na Alemanha, as pessoas passam 2 horas e 7 minutos por dia vendo TV ou plataformas de streaming: cerca de um terço do tempo livre.",
  "note": "Todas as pessoas a partir de 10 anos, 2022 (Departamento Federal de Estatísticas da Alemanha, números revisados em junho de 2025). Homens 2 horas e 12 minutos, mulheres 2 horas e 2 minutos.",
  "chips": [
   {
    "i": "tv",
    "t": "vendo TV"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "sea-otter-eating": {
  "face": "Lontra-marinha",
  "label": "comendo",
  "fig": "8 h 54 a 12 h",
  "sentence": "Uma lontra-marinha selvagem passa de 9 a 12 horas por dia mergulhando atrás de comida e comendo.",
  "note": "8,9 horas no sudeste do Alasca, a partir de 14 registradores de mergulho (Journal of Wildlife Management, 2007); de 40 a 50% do dia na Califórnia (Universidade da Califórnia em Santa Cruz).",
  "chips": [
   {
    "i": "eating",
    "t": "comendo"
   },
   {
    "i": "pin",
    "t": "na natureza"
   }
  ]
 },
 "gorilla-sleep": {
  "face": "Gorila",
  "label": "dormindo",
  "fig": "12 a 13 h",
  "sentence": "Um gorila dorme cerca de 12 a 13 horas por noite em um ninho, e muitas vezes descansa por horas durante o dia também.",
  "note": "Duas organizações de proteção aos gorilas: o Dian Fossey Gorilla Fund fala em cerca de 12 horas de descanso por noite e a Gorilla Foundation, em 12 a 13. Nenhuma cita um estudo.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "cn-paid-work": {
  "face": "China",
  "label": "trabalho remunerado",
  "fig": "4 h 24",
  "sentence": "Na média de todas as pessoas na China a partir de 15 anos, trabalhando ou não, são 4 horas e 24 minutos de trabalho remunerado por dia.",
  "note": "2018 (Departamento Nacional de Estatísticas da China): homens 5 horas e 15 minutos, mulheres 3 horas e 35 minutos; 4 horas e 50 minutos nos dias de trabalho, 3 horas e 17 minutos nos dias de descanso.",
  "chips": [
   {
    "i": "work",
    "t": "trabalho remunerado"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "sperm-whale-rest": {
  "face": "Cachalote",
  "label": "dormindo ou descansando",
  "fig": "1 h 42",
  "sentence": "Os cachalotes ficam na vertical perto da superfície para descansar, e provavelmente dormir, só por cerca de 7% do dia.",
  "note": "7,1% do tempo registrado por marcadores com ventosa, em sonecas de 10 a 15 minutos (Miller e outros, Current Biology, 2008). O desenho é de outra baleia.",
  "chips": [
   {
    "i": "rest",
    "t": "dormindo ou descansando"
   },
   {
    "i": "pin",
    "t": "no mar"
   }
  ]
 },
 "kangaroo-eating": {
  "face": "Canguru-vermelho",
  "label": "comendo",
  "fig": "10 h a 10 h 26",
  "sentence": "Um canguru-vermelho passa cerca de 10 horas por dia procurando, cortando e mastigando capim.",
  "note": "De um estudo que comparou cangurus-vermelhos com ovelhas: os dois passavam quase o mesmo tempo se alimentando por dia (Munn e outros, Journal of Zoology, 2010).",
  "chips": [
   {
    "i": "eating",
    "t": "comendo"
   }
  ]
 },
 "at-men-housework": {
  "face": "Áustria",
  "label": "tarefas domésticas e cuidados",
  "fig": "2 h 06",
  "sentence": "Os homens na Áustria passam 2 horas e 6 minutos por dia com as tarefas domésticas e o cuidado com a família; as mulheres, 3 horas e 37 minutos.",
  "note": "Homens a partir de 10 anos, de segunda a domingo, na pesquisa nacional de 2021-22 (Statistik Austria): a \"Sorgearbeit in Haushalt und Familie\".",
  "chips": [
   {
    "i": "care",
    "t": "tarefas domésticas e cuidados"
   },
   {
    "i": "people",
    "t": "homens"
   }
  ]
 },
 "de-sleep": {
  "face": "Alemanha",
  "label": "dormindo",
  "fig": "8 h 36",
  "sentence": "Na Alemanha, as pessoas dormem em média 8 horas e 36 minutos por dia, segundo a pesquisa nacional de uso do tempo de 2022.",
  "note": "Todas as pessoas a partir de 10 anos (Departamento Federal de Estatísticas da Alemanha, números revisados em junho de 2025). Antes da revisão eram 8 horas e 37 minutos.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "frigatebird-flight": {
  "face": "Fragata",
  "label": "dormindo",
  "fig": "42 min",
  "sentence": "Em voos de até dez dias sobre o oceano, as fragatas-grandes dormiam só cerca de 42 minutos por dia.",
  "note": "Registros da atividade cerebral de fragatas-grandes com ninhos nas Ilhas Galápagos (Rattenborg e outros, Nature Communications, 2016). O desenho é de um albatroz, outra ave marinha.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   },
   {
    "i": "pin",
    "t": "no mar"
   }
  ]
 },
 "jp-mothers-housework": {
  "face": "Japão",
  "label": "tarefas domésticas e cuidados",
  "fig": "7 h 28",
  "sentence": "No Japão, as mães de crianças menores de 6 anos passam 7 horas e 28 minutos por dia com tarefas domésticas, cuidados e compras.",
  "note": "Esposas de casais com um filho menor de 6 anos, média de toda a semana, 2021 (Departamento de Estatísticas do Japão). Os maridos delas passam 1 hora e 54 minutos.",
  "chips": [
   {
    "i": "care",
    "t": "tarefas domésticas e cuidados"
   },
   {
    "i": "people",
    "t": "mães, filho menor de 6 anos"
   }
  ]
 },
 "baboon-sleep": {
  "face": "Babuíno",
  "label": "dormindo",
  "fig": "9 h 48 a 10 h 18",
  "sentence": "Um babuíno dorme cerca de 9,8 a 10,3 horas por dia, um pouco mais que um chimpanzé.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976). O desenho é de um macaco-rhesus, um primo próximo.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "cn-men-housework": {
  "face": "China",
  "label": "tarefas domésticas e cuidados",
  "fig": "1 h 32",
  "sentence": "Os homens na China passam 1 hora e 32 minutos por dia em trabalho não remunerado, como as tarefas domésticas e o cuidado de outras pessoas; as mulheres, 3 horas e 48 minutos.",
  "note": "Pessoas a partir de 15 anos, 2018 (Departamento Nacional de Estatísticas da China). Só as tarefas domésticas: homens 45 minutos, mulheres 2 horas e 6 minutos.",
  "chips": [
   {
    "i": "care",
    "t": "tarefas domésticas e cuidados"
   },
   {
    "i": "people",
    "t": "homens"
   }
  ]
 },
 "ferret-sleep": {
  "face": "Furão",
  "label": "dormindo",
  "fig": "14 a 18 h",
  "sentence": "Um furão dorme cerca de 14 a 18 horas por dia e é mais ativo ao amanhecer e ao anoitecer.",
  "note": "A tabela da Universidade de Washington indica 14,5 horas; a Wikipédia, 14 a 18. O desenho é de um arminho, um primo próximo.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "at-women-paid-work": {
  "face": "Áustria",
  "label": "trabalho remunerado",
  "fig": "2 h 13",
  "sentence": "As mulheres na Áustria fazem em média 2 horas e 13 minutos de trabalho remunerado por dia; os homens, 3 horas e 35 minutos, segundo a pesquisa de 2021-22.",
  "note": "Mulheres e meninas a partir de 10 anos, trabalhando ou não, de segunda a domingo (Statistik Austria). Entre as que trabalharam em determinado dia (42%), a média foi de 7 horas e 27 minutos.",
  "chips": [
   {
    "i": "work",
    "t": "trabalho remunerado"
   },
   {
    "i": "people",
    "t": "mulheres"
   }
  ]
 },
 "us-sleep": {
  "face": "EUA",
  "label": "dormindo",
  "fig": "9 h 02",
  "sentence": "Nos EUA, as pessoas dormem cerca de 9 horas por dia em média, contando as sonecas, segundo a pesquisa nacional de uso do tempo de 2025.",
  "note": "Pessoas a partir de 15 anos, nos sete dias da semana (Departamento de Estatísticas do Trabalho dos EUA). Inclui sonecas e períodos de insônia: 9,04 horas em 2024, 9,03 em 2025.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "manatee-eating": {
  "face": "Peixe-boi",
  "label": "comendo",
  "fig": "6 a 8 h",
  "sentence": "Um peixe-boi passa de seis a oito horas por dia pastando capim-marinho e outras plantas aquáticas.",
  "note": "Do Serviço Nacional de Parques dos EUA (peixes-boi-das-Antilhas na Flórida) e do SeaWorld; nenhuma das páginas cita um estudo. O desenho é do peixe-boi-africano.",
  "chips": [
   {
    "i": "eating",
    "t": "comendo"
   }
  ]
 },
 "de-paid-work": {
  "face": "Alemanha",
  "label": "trabalho remunerado",
  "fig": "2 h 38",
  "sentence": "Na média de todas as pessoas na Alemanha a partir de 10 anos, trabalhando ou não, são 2 horas e 38 minutos de trabalho remunerado por dia.",
  "note": "2022 (Departamento Federal de Estatísticas da Alemanha, revisado em junho de 2025), contando o trajeto até o trabalho e a procura por emprego. Entre as que trabalharam em determinado dia (34%), a média foi de 7 horas e 42 minutos.",
  "chips": [
   {
    "i": "work",
    "t": "trabalho remunerado"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "owl-monkey-sleep": {
  "face": "Macaco-da-noite",
  "label": "dormindo",
  "fig": "17 h",
  "sentence": "Um macaco-da-noite dorme cerca de 17 horas por dia, mais que qualquer outro macaco ou símio das duas tabelas clássicas.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976). O desenho é de outro macaco, um macaco-rhesus.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "frigatebird-land": {
  "face": "Fragata",
  "label": "dormindo",
  "fig": "12 h",
  "sentence": "De volta a terra, as fragatas-grandes dormem cerca de 12 horas por dia; em voo sobre o oceano, só cerca de 42 minutos.",
  "note": "Fragatas-grandes com ninhos nas Ilhas Galápagos, com gravadores de ondas cerebrais (Rattenborg e outros, Nature Communications, 2016). O desenho é de um albatroz.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   },
   {
    "i": "pin",
    "t": "em terra"
   }
  ]
 },
 "it-men-housework": {
  "face": "Itália",
  "label": "tarefas domésticas e cuidados",
  "fig": "1 h 50 a 2 h 11",
  "sentence": "Os homens na Itália passam cerca de 2 horas por dia em trabalho não remunerado, como as tarefas domésticas e o cuidado de outras pessoas; as mulheres, mais de 5 horas.",
  "note": "2 horas e 11 minutos para homens de 15 a 64 anos (números da OCDE da pesquisa do ISTAT de 2013-2014); o próprio ISTAT indica 1 hora e 50 minutos para homens de 25 a 64 anos.",
  "chips": [
   {
    "i": "care",
    "t": "tarefas domésticas e cuidados"
   },
   {
    "i": "people",
    "t": "homens"
   }
  ]
 },
 "tree-shrew-sleep": {
  "face": "Tupaia",
  "label": "dormindo",
  "fig": "15 h 48",
  "sentence": "Uma tupaia dorme cerca de 15,8 horas por dia: mais ou menos dois terços da vida.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976). As tupaias não são musaranhos de verdade; o desenho é de um musaranho-comum.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "us-paid-work": {
  "face": "EUA",
  "label": "trabalho remunerado",
  "fig": "3 h 26",
  "sentence": "Na média de todas as pessoas nos EUA a partir de 15 anos, trabalhando ou não, são cerca de 3 horas e 26 minutos de trabalho remunerado por dia.",
  "note": "2024, nos sete dias da semana (Departamento de Estatísticas do Trabalho dos EUA), contando o deslocamento relacionado ao trabalho. Entre as que trabalharam em determinado dia (42,6%), a média foi de 8 horas e 2 minutos.",
  "chips": [
   {
    "i": "work",
    "t": "trabalho remunerado"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "grey-seal-sleep": {
  "face": "Foca-cinzenta",
  "label": "dormindo",
  "fig": "6 h 12",
  "sentence": "Uma foca-cinzenta dorme só cerca de 6,2 horas por dia, menos que as 8 de uma pessoa nas mesmas tabelas.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976). Os elefantes-marinhos dormem cerca de 2 horas por dia no mar e de 10 a 11 em terra.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "at-men-paid-work": {
  "face": "Áustria",
  "label": "trabalho remunerado",
  "fig": "3 h 35",
  "sentence": "Os homens na Áustria fazem em média 3 horas e 35 minutos de trabalho remunerado por dia; as mulheres, 2 horas e 13 minutos, segundo a pesquisa de 2021-22.",
  "note": "Homens e meninos a partir de 10 anos, trabalhando ou não, de segunda a domingo (Statistik Austria). Entre os que trabalharam em determinado dia (55%), a média foi de 8 horas e 51 minutos.",
  "chips": [
   {
    "i": "work",
    "t": "trabalho remunerado"
   },
   {
    "i": "people",
    "t": "homens"
   }
  ]
 },
 "platypus-sleep": {
  "face": "Ornitorrinco",
  "label": "dormindo",
  "fig": "14 h",
  "sentence": "Um ornitorrinco dorme cerca de 14 horas por dia: mais da metade da vida.",
  "note": "A tabela da Universidade de Washington; a Wikipédia diz que o sono \"chega, segundo se diz, a 14 horas\". O sono REM, o sono dos sonhos, ocupa de 5,8 a 8 horas desse total (Siegel e outros, 1999).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "de-eating": {
  "face": "Alemanha",
  "label": "comendo",
  "fig": "1 h 40",
  "sentence": "Na Alemanha, as pessoas passam 1 hora e 40 minutos por dia comendo e bebendo, segundo a pesquisa nacional de uso do tempo de 2022.",
  "note": "Todas as pessoas a partir de 10 anos (Departamento Federal de Estatísticas da Alemanha, números revisados em junho de 2025). Homens 1 hora e 39 minutos, mulheres 1 hora e 40 minutos.",
  "chips": [
   {
    "i": "eating",
    "t": "comendo"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "donkey-sleep": {
  "face": "Jumento",
  "label": "dormindo",
  "fig": "3 h 06",
  "sentence": "Um jumento dorme só cerca de 3,1 horas por dia, quase tão pouco quanto um cavalo.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976). O desenho é de um cavalo, seu primo próximo.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "jp-women-sleep": {
  "face": "Japão",
  "label": "dormindo",
  "fig": "7 h 49",
  "sentence": "As mulheres no Japão dormem 7 horas e 49 minutos por dia, 9 minutos a menos que os homens, segundo a pesquisa nacional de 2021.",
  "note": "Mulheres a partir de 10 anos, média de toda a semana, outubro de 2021 (Departamento de Estatísticas do Japão). Na Áustria, na Alemanha, na França e nos EUA, as mulheres dormem um pouco mais que os homens.",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   },
   {
    "i": "people",
    "t": "mulheres"
   }
  ]
 },
 "cn-tv": {
  "face": "China",
  "label": "vendo TV",
  "fig": "1 h 40",
  "sentence": "As pessoas na China passam 1 hora e 40 minutos por dia vendo TV, segundo a pesquisa nacional de uso do tempo de 2018.",
  "note": "Pessoas a partir de 15 anos (Departamento Nacional de Estatísticas da China). Quem tem de 75 a 84 anos vê mais, 3 horas e 16 minutos; quem tem de 15 a 24, menos, 42 minutos.",
  "chips": [
   {
    "i": "tv",
    "t": "vendo TV"
   },
   {
    "i": "people",
    "t": "todo mundo"
   }
  ]
 },
 "rhesus-sleep": {
  "face": "Macaco-rhesus",
  "label": "dormindo",
  "fig": "9 h 36 a 11 h 48",
  "sentence": "Um macaco-rhesus dorme cerca de 9,6 a 11,8 horas por dia, parecido com um chimpanzé ou um pouco mais.",
  "note": "De duas tabelas clássicas sobre o sono dos animais: a da Universidade de Washington e a de Allison e Cicchetti (Science, 1976).",
  "chips": [
   {
    "i": "asleep",
    "t": "dormindo"
   }
  ]
 },
 "at-women-housework": {
  "face": "Áustria",
  "label": "tarefas domésticas e cuidados",
  "fig": "3 h 37",
  "sentence": "As mulheres na Áustria passam 3 horas e 37 minutos por dia com as tarefas domésticas e o cuidado com a família; os homens, 2 horas e 6 minutos.",
  "note": "Mulheres e meninas a partir de 10 anos, de segunda a domingo, 2021-22 (Statistik Austria): a \"Sorgearbeit in Haushalt und Familie\". Entre as 95,5% que fizeram alguma dessas tarefas, a média foi de 4 horas e 5 minutos.",
  "chips": [
   {
    "i": "care",
    "t": "tarefas domésticas e cuidados"
   },
   {
    "i": "people",
    "t": "mulheres"
   }
  ]
 }
};
  var D = window.TURNSOUT_DATA && window.TURNSOUT_DATA["out-of-24"], list = D && (D.puzzles || D.questions), days = {};
  if (list && list.length) for (var d = 1; d <= 1000; d++) { var t = byId[list[(d - 1) % list.length].id]; if (t) days[d] = t; }
  window.LG_PUZZLES["out-of-24"] = days;
  window.LG_PUZZLES["out-of-24.byId"] = byId;
})();
