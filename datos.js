/* Dicho y Hecho — los 50 refranes */
const DATA = {
 "version": 1,
 "categorias": {
  "criollos": "Criollos de pura cepa",
  "prudencia": "Prudencia y previsión",
  "trabajo": "Trabajo y esfuerzo",
  "vinculos": "Gente y vínculos",
  "plata": "Plata y negocios",
  "palabras": "Palabras y lengua suelta",
  "consuelos": "Consuelos y resignación"
 },
 "refranes": [
  {
   "id": 1,
   "texto": "El que se quema con leche, ve una vaca y llora",
   "mitadA": "El que se quema con leche",
   "mitadB": "ve una vaca y llora",
   "categoria": "criollos",
   "argentino": true,
   "significado": "Quien tuvo una mala experiencia queda desconfiado y se asusta de cualquier cosa que se le parezca.",
   "cuandoSeUsa": "Cuando alguien exagera la desconfianza después de un mal trago.",
   "origen": "Es la versión criolla de una idea muy vieja; en España dicen \"gato escaldado del agua fría huye\".",
   "etiquetas": [
    "desconfianza",
    "miedo",
    "mala experiencia",
    "ex",
    "estafa"
   ],
   "escena": "Un tipo con la lengua quemada y una taza humeante llora a mares frente a una vaca que lo mira sin entender.",
   "hornero": "Tranqui, que la vaca no te hizo nada."
  },
  {
   "id": 2,
   "texto": "Todo bicho que camina va a parar al asador",
   "mitadA": "Todo bicho que camina",
   "mitadB": "va a parar al asador",
   "categoria": "criollos",
   "argentino": true,
   "significado": "Nadie se salva: tarde o temprano a cada uno le llega su turno. En broma, también quiere decir que se come de todo.",
   "cuandoSeUsa": "Cuando cae alguien que se creía intocable, o en un asado donde no se desprecia nada.",
   "origen": "Bien argentino, con olor a campo y a parrilla.",
   "etiquetas": [
    "asado",
    "comida",
    "destino",
    "caer",
    "castigo"
   ],
   "escena": "Una fila de bichos (vaca, chancho, pollo y un bicho bolita) camina tranquila hacia una parrilla humeante.",
   "hornero": "Yo no camino, eh. Yo vuelo. Que conste."
  },
  {
   "id": 3,
   "texto": "Hijo de tigre, overo ha de ser",
   "mitadA": "Hijo de tigre",
   "mitadB": "overo ha de ser",
   "categoria": "criollos",
   "argentino": true,
   "significado": "Los hijos se parecen a sus padres, para bien y para mal.",
   "cuandoSeUsa": "Cuando un hijo repite las mañas, los talentos o los defectos de su padre o su madre.",
   "origen": "Criollo: el \"tigre\" es el yaguareté, y \"overo\" quiere decir manchado.",
   "etiquetas": [
    "familia",
    "hijos",
    "padres",
    "herencia",
    "parecido"
   ],
   "escena": "Un yaguareté grandote y uno chiquito, idénticos, posan con la misma cara de malos.",
   "hornero": "Mi viejo también hacía casas de barro. Se hereda, maestro."
  },
  {
   "id": 4,
   "texto": "El que nace pa' pito nunca llega a corneta",
   "mitadA": "El que nace pa' pito",
   "mitadB": "nunca llega a corneta",
   "categoria": "criollos",
   "argentino": true,
   "significado": "Cada uno tiene sus límites, y hay cosas que no se pueden forzar.",
   "cuandoSeUsa": "Cuando alguien intenta ser lo que no es, o cuando uno se ríe de sus propias limitaciones.",
   "origen": "Rioplatense, de barrio.",
   "etiquetas": [
    "límites",
    "ambición",
    "talento",
    "destino",
    "resignación"
   ],
   "escena": "Un silbato se estira con todas sus fuerzas frente a un espejo que le devuelve la imagen de una corneta.",
   "hornero": "Yo nací pa' hornero y mirá, me va bárbaro."
  },
  {
   "id": 5,
   "texto": "Yerba mala nunca muere",
   "mitadA": "Yerba mala",
   "mitadB": "nunca muere",
   "categoria": "criollos",
   "argentino": true,
   "significado": "La gente jodida parece durar para siempre. En broma, se dice de uno mismo cuando sale entero de algo.",
   "cuandoSeUsa": "Cuando alguien zafa de todas, o como chiste después de salir ileso.",
   "origen": "Se dice en todo el mundo hispano con \"hierba\"; acá la escribimos como la del mate.",
   "etiquetas": [
    "zafar",
    "sobrevivir",
    "suerte",
    "mala persona"
   ],
   "escena": "Un yuyito con cara de pícaro sobrevive a una cortadora de pasto, a un pisotón y a un balde de veneno.",
   "hornero": "Si lo decís por mí, gracias."
  },
  {
   "id": 6,
   "texto": "Chancho limpio nunca engorda",
   "mitadA": "Chancho limpio",
   "mitadB": "nunca engorda",
   "categoria": "criollos",
   "argentino": true,
   "significado": "El que es demasiado delicado o quisquilloso no prospera; a veces hay que meterse en el barro.",
   "cuandoSeUsa": "Cuando alguien es muy remilgado, o para justificar comer algo que se cayó al piso.",
   "origen": "Rural argentino, de chiquero y de campo.",
   "etiquetas": [
    "comida",
    "quisquilloso",
    "delicado",
    "trabajo sucio"
   ],
   "escena": "Un chancho flaquito se baña en una bañadera con patito de goma, mientras otro gordito y feliz se revuelca en el barro.",
   "hornero": "Se cayó al piso, soplale y listo."
  },
  {
   "id": 7,
   "texto": "Los hermanos sean unidos, porque esa es la ley primera",
   "mitadA": "Los hermanos sean unidos",
   "mitadB": "porque esa es la ley primera",
   "categoria": "criollos",
   "argentino": true,
   "significado": "Entre hermanos hay que apoyarse: la unión es lo primero.",
   "cuandoSeUsa": "Cuando hay peleas entre hermanos, o en un grupo que tiene que tirar para el mismo lado.",
   "origen": "Del Martín Fierro de José Hernández (La vuelta, 1879), en los consejos de Fierro a sus hijos.",
   "etiquetas": [
    "hermanos",
    "familia",
    "unión",
    "pelea",
    "equipo"
   ],
   "escena": "Dos horneros hermanos construyen un nido juntos mientras un gato los mira sin poder hacer nada.",
   "hornero": "Y si se pelean, los devoran los de afuera. Lo dijo Fierro, no yo."
  },
  {
   "id": 8,
   "texto": "Hacete amigo del juez",
   "mitadA": "Hacete amigo",
   "mitadB": "del juez",
   "categoria": "criollos",
   "argentino": true,
   "significado": "Consejo pícaro: conviene llevarse bien con quien tiene poder sobre vos.",
   "cuandoSeUsa": "En broma, cuando alguien le hace la pata al jefe o al que decide.",
   "origen": "Del Martín Fierro (La vuelta, 1879): es uno de los consejos del viejo Vizcacha, el personaje más vivo y menos recomendable del poema.",
   "etiquetas": [
    "jefe",
    "poder",
    "acomodo",
    "trabajo",
    "política"
   ],
   "escena": "El hornero le ceba un mate a un juez con peluca y martillo, que sonríe encantado.",
   "hornero": "Consejo del viejo Vizcacha. Úsese con moderación."
  },
  {
   "id": 9,
   "texto": "El diablo sabe por diablo, pero más sabe por viejo",
   "mitadA": "El diablo sabe por diablo",
   "mitadB": "pero más sabe por viejo",
   "categoria": "criollos",
   "argentino": true,
   "significado": "La experiencia enseña más que la astucia.",
   "cuandoSeUsa": "Cuando alguien mayor se las sabe todas, o para defender el valor de la experiencia.",
   "origen": "En todo el mundo hispano se dice \"más sabe el diablo por viejo que por diablo\"; acá circula mucho en esta versión.",
   "etiquetas": [
    "experiencia",
    "edad",
    "sabiduría",
    "abuelos"
   ],
   "escena": "Un diablito anciano, con bastón y anteojos, le gana al truco a un diablito joven.",
   "hornero": "Por eso le hago caso a mi abuela. Al diablo, depende."
  },
  {
   "id": 10,
   "texto": "Más vale pájaro en mano que cien volando",
   "mitadA": "Más vale pájaro en mano",
   "mitadB": "que cien volando",
   "categoria": "prudencia",
   "argentino": false,
   "significado": "Conviene quedarse con algo seguro, aunque sea poco, antes que arriesgarlo por algo más grande que es incierto.",
   "cuandoSeUsa": "Cuando alguien está por largar lo que ya tiene atrás de una promesa.",
   "origen": "Es de todo el mundo hispano y tiene primos en otros idiomas. Acá se usa muchísimo.",
   "etiquetas": [
    "riesgo",
    "oferta",
    "trabajo",
    "plata",
    "decisiones"
   ],
   "escena": "Una mano sostiene al hornero, que dice \"yo me quedo\", mientras cien pájaros pasan volando.",
   "hornero": "Lo seguro es lo seguro, maestro. El resto es humo."
  },
  {
   "id": 11,
   "texto": "Del dicho al hecho hay mucho trecho",
   "mitadA": "Del dicho al hecho",
   "mitadB": "hay mucho trecho",
   "categoria": "prudencia",
   "argentino": false,
   "significado": "Es fácil prometer y difícil cumplir.",
   "cuandoSeUsa": "Cuando alguien promete mucho y todavía no hizo nada.",
   "origen": "Del repertorio de todo el mundo hispano. Y el que le da nombre a esta app.",
   "etiquetas": [
    "promesas",
    "cumplir",
    "excusas",
    "proyectos"
   ],
   "escena": "Un globo de texto enorme en una punta y un ladrillito solitario muy lejos, unidos por un camino larguísimo.",
   "hornero": "Por eso la app se llama así. Acá lo achicamos."
  },
  {
   "id": 12,
   "texto": "Cuando el río suena, piedras trae",
   "mitadA": "Cuando el río suena",
   "mitadB": "piedras trae",
   "categoria": "prudencia",
   "argentino": false,
   "significado": "Si algo se comenta, por algo será: los rumores suelen tener algo de verdad.",
   "cuandoSeUsa": "Cuando corre un rumor y alguien lo niega.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "rumor",
    "chisme",
    "sospecha",
    "noticia"
   ],
   "escena": "Un río ruidoso escupe piedras mientras un tipo se tapa los oídos.",
   "hornero": "Yo no digo nada, pero ese río hace un ruido..."
  },
  {
   "id": 13,
   "texto": "Más vale prevenir que curar",
   "mitadA": "Más vale prevenir",
   "mitadB": "que curar",
   "categoria": "prudencia",
   "argentino": false,
   "significado": "Es mejor tomar precauciones antes que arreglar los problemas después.",
   "cuandoSeUsa": "Cuando alguien duda en cuidarse o en tomar recaudos.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "cuidado",
    "prevención",
    "seguro",
    "salud"
   ],
   "escena": "Un tipo con casco, rodilleras y flotador cruza una calle completamente vacía.",
   "hornero": "Llevá campera, que después refresca."
  },
  {
   "id": 14,
   "texto": "Camarón que se duerme se lo lleva la corriente",
   "mitadA": "Camarón que se duerme",
   "mitadB": "se lo lleva la corriente",
   "categoria": "prudencia",
   "argentino": false,
   "significado": "El que se descuida o no está atento pierde oportunidades.",
   "cuandoSeUsa": "Cuando alguien se colgó y se le pasó el momento.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "atención",
    "oportunidad",
    "colgado",
    "trabajo"
   ],
   "escena": "Un camarón con antifaz de dormir flota en un colchón inflable, río abajo.",
   "hornero": "Despabilate, que te lleva el río."
  },
  {
   "id": 15,
   "texto": "Cuando veas las barbas de tu vecino cortar, poné las tuyas a remojar",
   "mitadA": "Cuando veas las barbas de tu vecino cortar",
   "mitadB": "poné las tuyas a remojar",
   "categoria": "prudencia",
   "argentino": false,
   "significado": "Si le pasa algo a alguien cercano, preparate, porque te puede pasar a vos.",
   "cuandoSeUsa": "Cuando hay despidos, cambios o problemas que le tocan a gente de al lado.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "despidos",
    "trabajo",
    "aviso",
    "prevención"
   ],
   "escena": "Al vecino lo pelan con una tijera gigante mientras un tipo mete la barba en una palangana.",
   "hornero": "Yo por las dudas ya me lavé la cresta."
  },
  {
   "id": 16,
   "texto": "Agua que no has de beber, dejala correr",
   "mitadA": "Agua que no has de beber",
   "mitadB": "dejala correr",
   "categoria": "prudencia",
   "argentino": false,
   "significado": "Lo que no te interesa o no te corresponde, no lo retengas ni te metas.",
   "cuandoSeUsa": "Cuando alguien acapara algo, o a alguien, que no piensa aprovechar.",
   "origen": "Del repertorio de todo el mundo hispano. La escena la pusimos en una acequia, bien mendocina.",
   "etiquetas": [
    "pareja",
    "soltar",
    "dejar ir",
    "celos",
    "no te metas"
   ],
   "escena": "Un tipo sentado al lado de una acequia mira pasar el agua bajo los árboles.",
   "hornero": "Soltá, hermano. Si no la vas a tomar, que riegue la viña."
  },
  {
   "id": 17,
   "texto": "Al mejor cazador se le escapa la liebre",
   "mitadA": "Al mejor cazador",
   "mitadB": "se le escapa la liebre",
   "categoria": "prudencia",
   "argentino": false,
   "significado": "Hasta el más hábil se equivoca alguna vez.",
   "cuandoSeUsa": "Cuando alguien que sabe mucho mete la pata.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "error",
    "equivocarse",
    "experto",
    "falla"
   ],
   "escena": "Un cazador con mira telescópica apunta para un lado mientras la liebre le saca la lengua atrás suyo.",
   "hornero": "Hasta yo erré un nido una vez. Una sola."
  },
  {
   "id": 18,
   "texto": "Tanto va el cántaro a la fuente que al final se rompe",
   "mitadA": "Tanto va el cántaro a la fuente",
   "mitadB": "que al final se rompe",
   "categoria": "prudencia",
   "argentino": false,
   "significado": "Si repetís algo riesgoso muchas veces, tarde o temprano sale mal.",
   "cuandoSeUsa": "Cuando alguien abusa de la suerte o de la paciencia ajena.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "riesgo",
    "abusar",
    "suerte",
    "paciencia"
   ],
   "escena": "Un cántaro lleno de curitas camina una vez más hacia la fuente.",
   "hornero": "El cántaro avisó. Nadie lo escuchó."
  },
  {
   "id": 19,
   "texto": "No vendas la piel del oso antes de cazarlo",
   "mitadA": "No vendas la piel del oso",
   "mitadB": "antes de cazarlo",
   "categoria": "prudencia",
   "argentino": false,
   "significado": "No cuentes con algo que todavía no tenés.",
   "cuandoSeUsa": "Cuando alguien festeja o gasta antes de tiempo.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "plata",
    "apuro",
    "festejar antes",
    "negocio"
   ],
   "escena": "Un tipo cobra por una alfombra de oso mientras el oso, vivito, le toca el hombro.",
   "hornero": "Primero el oso, después la alfombra. Orden, che."
  },
  {
   "id": 20,
   "texto": "Al que madruga Dios lo ayuda",
   "mitadA": "Al que madruga",
   "mitadB": "Dios lo ayuda",
   "categoria": "trabajo",
   "argentino": false,
   "significado": "El que empieza temprano y le pone ganas tiene más chances.",
   "cuandoSeUsa": "Para arrancar el día o convencer a alguien de levantarse.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "madrugar",
    "trabajo",
    "esfuerzo",
    "mañana"
   ],
   "escena": "Un tipo en pijama y con taza de café recibe una lluvia de monedas al amanecer.",
   "hornero": "Yo madrugo. Lo otro todavía lo estoy esperando."
  },
  {
   "id": 21,
   "texto": "No por mucho madrugar amanece más temprano",
   "mitadA": "No por mucho madrugar",
   "mitadB": "amanece más temprano",
   "categoria": "trabajo",
   "argentino": false,
   "significado": "Apurarse no acelera lo que tiene sus tiempos.",
   "cuandoSeUsa": "Cuando alguien anda ansioso por algo que no depende de él.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "paciencia",
    "apuro",
    "ansiedad",
    "esperar"
   ],
   "escena": "Un tipo empuja al sol con una escoba para que salga más rápido.",
   "hornero": "El sol sale cuando sale. Dormí cinco minutos más."
  },
  {
   "id": 22,
   "texto": "Quien mucho abarca poco aprieta",
   "mitadA": "Quien mucho abarca",
   "mitadB": "poco aprieta",
   "categoria": "trabajo",
   "argentino": false,
   "significado": "El que quiere hacer muchas cosas a la vez termina haciéndolas mal.",
   "cuandoSeUsa": "Cuando alguien se carga de tareas de más.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "estrés",
    "muchas tareas",
    "estudio",
    "organización"
   ],
   "escena": "Un tipo intenta abrazar treinta sandías y se le caen todas.",
   "hornero": "Una cosa por vez, maestro. Yo hago una casa por año."
  },
  {
   "id": 23,
   "texto": "Zapatero a tus zapatos",
   "mitadA": "Zapatero",
   "mitadB": "a tus zapatos",
   "categoria": "trabajo",
   "argentino": false,
   "significado": "Que cada uno se dedique a lo que sabe y no opine de lo que no entiende.",
   "cuandoSeUsa": "Cuando alguien se mete a opinar de un tema ajeno.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "opinar",
    "meterse",
    "oficio",
    "experto"
   ],
   "escena": "Un zapatero con estetoscopio intenta revisar a un paciente mientras un médico cose un zapato.",
   "hornero": "Yo de barro sé. De lo demás, ni me preguntes."
  },
  {
   "id": 24,
   "texto": "En casa de herrero, cuchillo de palo",
   "mitadA": "En casa de herrero",
   "mitadB": "cuchillo de palo",
   "categoria": "trabajo",
   "argentino": false,
   "significado": "Justo donde más debería haber algo, falta.",
   "cuandoSeUsa": "Cuando el que sabe de algo no lo aplica en su propia casa.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "ironía",
    "oficio",
    "casa",
    "falta"
   ],
   "escena": "Un herrero musculoso intenta cortar un asado con un cuchillo de madera.",
   "hornero": "En casa de hornero, en cambio, horno sobra."
  },
  {
   "id": 25,
   "texto": "Donde manda capitán no manda marinero",
   "mitadA": "Donde manda capitán",
   "mitadB": "no manda marinero",
   "categoria": "trabajo",
   "argentino": false,
   "significado": "Hay que respetar la jerarquía: decide el que tiene la autoridad.",
   "cuandoSeUsa": "Cuando alguien quiere pasar por encima del que manda.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "jefe",
    "autoridad",
    "orden",
    "trabajo"
   ],
   "escena": "Un marinero intenta girar el timón y el capitán, enorme, lo levanta de una oreja.",
   "hornero": "En mi nido manda mi señora. Así de claro."
  },
  {
   "id": 26,
   "texto": "Arrieros somos y en el camino andamos",
   "mitadA": "Arrieros somos",
   "mitadB": "y en el camino andamos",
   "categoria": "trabajo",
   "argentino": false,
   "significado": "La vida da vueltas y nos vamos a volver a cruzar: lo que hoy hacés, mañana puede volver.",
   "cuandoSeUsa": "Como advertencia amable, o para cobrar un favor más adelante.",
   "origen": "Del repertorio de todo el mundo hispano. La escena va en la cordillera, que los arrieros cruzaban de Mendoza a Chile.",
   "etiquetas": [
    "revancha",
    "vueltas de la vida",
    "favor",
    "advertencia"
   ],
   "escena": "Dos arrieros con sus mulas se cruzan en un sendero de montaña y se miran de reojo.",
   "hornero": "Hoy por vos, mañana por mí. Y pasado, vemos."
  },
  {
   "id": 27,
   "texto": "Más vale tarde que nunca",
   "mitadA": "Más vale tarde",
   "mitadB": "que nunca",
   "categoria": "trabajo",
   "argentino": false,
   "significado": "Es mejor hacer algo con retraso que no hacerlo.",
   "cuandoSeUsa": "Cuando alguien llega tarde, o arranca algo que venía postergando.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "llegar tarde",
    "demora",
    "empezar",
    "disculpas"
   ],
   "escena": "Un caracol llega a su propio cumpleaños cuando ya están barriendo el salón.",
   "hornero": "Llegó el caracol. Aplausos, dale."
  },
  {
   "id": 28,
   "texto": "Decime con quién andás y te diré quién sos",
   "mitadA": "Decime con quién andás",
   "mitadB": "y te diré quién sos",
   "categoria": "vinculos",
   "argentino": false,
   "significado": "Las compañías dicen mucho de una persona.",
   "cuandoSeUsa": "Cuando alguien se junta con gente que no le conviene.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "amigos",
    "juntas",
    "compañía",
    "reputación"
   ],
   "escena": "Un tipo de traje, rodeado de tres piratas, intenta parecer inocente.",
   "hornero": "Yo ando con horneros. Saquen conclusiones."
  },
  {
   "id": 29,
   "texto": "Cría cuervos y te sacarán los ojos",
   "mitadA": "Cría cuervos",
   "mitadB": "y te sacarán los ojos",
   "categoria": "vinculos",
   "argentino": false,
   "significado": "Si ayudás a gente desagradecida, te puede terminar traicionando.",
   "cuandoSeUsa": "Cuando alguien a quien ayudaste te da vuelta la cara.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "traición",
    "desagradecido",
    "ayuda",
    "favor"
   ],
   "escena": "Un tipo le da de comer a unos cuervos que lo miran con cara de sospechosos.",
   "hornero": "Por eso yo crío horneros. Gente de bien."
  },
  {
   "id": 30,
   "texto": "Cuando uno no quiere, dos no pelean",
   "mitadA": "Cuando uno no quiere",
   "mitadB": "dos no pelean",
   "categoria": "vinculos",
   "argentino": false,
   "significado": "Para pelear hacen falta dos; si uno no entra, no hay pelea.",
   "cuandoSeUsa": "Para bajar una discusión o no engancharse.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "pelea",
    "discusión",
    "pareja",
    "calma"
   ],
   "escena": "Un tipo furioso con guantes de box frente a otro que toma mate en una reposera.",
   "hornero": "Yo me pongo en modo reposera y listo."
  },
  {
   "id": 31,
   "texto": "Donde comen dos, comen tres",
   "mitadA": "Donde comen dos",
   "mitadB": "comen tres",
   "categoria": "vinculos",
   "argentino": false,
   "significado": "Siempre se puede hacer lugar para uno más.",
   "cuandoSeUsa": "Cuando cae alguien de sorpresa a comer.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "invitado",
    "familia",
    "hospitalidad",
    "comida"
   ],
   "escena": "Una mesa para dos con un tercer invitado apretado en la punta y una fuente de ñoquis que alcanza para todos.",
   "hornero": "Y si hay asado, comen quince."
  },
  {
   "id": 32,
   "texto": "Las cuentas claras conservan la amistad",
   "mitadA": "Las cuentas claras",
   "mitadB": "conservan la amistad",
   "categoria": "vinculos",
   "argentino": false,
   "significado": "En temas de plata con amigos, mejor que todo quede claro.",
   "cuandoSeUsa": "Cuando hay que dividir gastos o devolver un préstamo.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "plata",
    "amigos",
    "deudas",
    "dividir"
   ],
   "escena": "Dos amigos abrazados dividen la cuenta con una calculadora gigante.",
   "hornero": "Y el chocolate espeso. Pasame tu parte, dale."
  },
  {
   "id": 33,
   "texto": "Cada loco con su tema",
   "mitadA": "Cada loco",
   "mitadB": "con su tema",
   "categoria": "vinculos",
   "argentino": false,
   "significado": "Cada uno tiene sus manías, y está bien respetarlas.",
   "cuandoSeUsa": "Cuando alguien tiene un gusto o una costumbre rara.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "manías",
    "gustos",
    "respetar",
    "diferente"
   ],
   "escena": "En un banco de plaza, uno habla con una planta, otro colecciona tapitas y otro le canta a un zapallo.",
   "hornero": "Yo colecciono barro. No juzgo."
  },
  {
   "id": 34,
   "texto": "Genio y figura hasta la sepultura",
   "mitadA": "Genio y figura",
   "mitadB": "hasta la sepultura",
   "categoria": "vinculos",
   "argentino": false,
   "significado": "La gente no cambia su forma de ser.",
   "cuandoSeUsa": "Cuando alguien repite sus mañas de siempre.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "carácter",
    "no cambia",
    "mañas",
    "personalidad"
   ],
   "escena": "Un abuelito de noventa años con cresta punk, bastón y campera de cuero.",
   "hornero": "Yo voy a tener cresta hasta el final."
  },
  {
   "id": 35,
   "texto": "El que no tiene padrino no se bautiza",
   "mitadA": "El que no tiene padrino",
   "mitadB": "no se bautiza",
   "categoria": "vinculos",
   "argentino": false,
   "significado": "Sin contactos o alguien que te respalde, es difícil conseguir cosas.",
   "cuandoSeUsa": "Cuando alguien consigue algo por acomodo, o cuando a vos te falta ese empujón.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "acomodo",
    "contactos",
    "trámite",
    "trabajo"
   ],
   "escena": "Un tipo solo en una fila larguísima mientras otro entra por la puerta VIP del brazo de su padrino.",
   "hornero": "Si necesitás padrino, avisá. Tengo contactos en el árbol."
  },
  {
   "id": 36,
   "texto": "A caballo regalado no se le miran los dientes",
   "mitadA": "A caballo regalado",
   "mitadB": "no se le miran los dientes",
   "categoria": "plata",
   "argentino": false,
   "significado": "Lo que te regalan se agradece sin buscarle defectos.",
   "cuandoSeUsa": "Cuando alguien se queja de un regalo o de algo que le dieron gratis.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "regalo",
    "agradecer",
    "quejarse",
    "cumpleaños"
   ],
   "escena": "Un tipo le revisa los dientes a un caballo con moño de regalo, que lo mira ofendido.",
   "hornero": "Agradecé y listo. Después lo cambiás."
  },
  {
   "id": 37,
   "texto": "Lo barato sale caro",
   "mitadA": "Lo barato",
   "mitadB": "sale caro",
   "categoria": "plata",
   "argentino": false,
   "significado": "Ahorrar en calidad termina costando más.",
   "cuandoSeUsa": "Cuando algo de oferta se rompe enseguida.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "compras",
    "calidad",
    "ahorro",
    "arreglos"
   ],
   "escena": "Un paraguas de oferta se da vuelta con la primera ráfaga de viento zonda.",
   "hornero": "Tres paraguas llevo este mes."
  },
  {
   "id": 38,
   "texto": "Pan para hoy, hambre para mañana",
   "mitadA": "Pan para hoy",
   "mitadB": "hambre para mañana",
   "categoria": "plata",
   "argentino": false,
   "significado": "Una solución que alivia ahora pero trae problemas después.",
   "cuandoSeUsa": "Cuando alguien tapa un problema con un parche que después sale peor.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "parche",
    "deuda",
    "cuotas",
    "corto plazo"
   ],
   "escena": "Un tipo se come todo el pan de un saque mientras el almanaque de al lado muestra mañana con la panera vacía.",
   "hornero": "Guardá un cacho para mañana, dale."
  },
  {
   "id": 39,
   "texto": "El que parte y reparte se queda con la mejor parte",
   "mitadA": "El que parte y reparte",
   "mitadB": "se queda con la mejor parte",
   "categoria": "plata",
   "argentino": false,
   "significado": "El que reparte algo suele quedarse con lo mejor.",
   "cuandoSeUsa": "Cuando el que divide algo se favorece a sí mismo.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "repartir",
    "injusticia",
    "herencia",
    "poder"
   ],
   "escena": "Un tipo reparte una pizza: tres porciones finitas para los demás y una gigante para él.",
   "hornero": "Por eso la pizza la corto yo."
  },
  {
   "id": 40,
   "texto": "El que no llora no mama",
   "mitadA": "El que no llora",
   "mitadB": "no mama",
   "categoria": "plata",
   "argentino": false,
   "significado": "Hay que pedir y reclamar para conseguir lo que uno necesita.",
   "cuandoSeUsa": "Cuando alguien no se anima a pedir lo que le corresponde.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "reclamar",
    "pedir",
    "aumento",
    "queja"
   ],
   "escena": "Un bebé llora a los gritos con un cartel de reclamo mientras otro, calladito, espera sin nada.",
   "hornero": "Pedí el aumento, dale. Llorá un poquito."
  },
  {
   "id": 41,
   "texto": "Dios le da pan al que no tiene dientes",
   "mitadA": "Dios le da pan",
   "mitadB": "al que no tiene dientes",
   "categoria": "plata",
   "argentino": false,
   "significado": "A veces las oportunidades le tocan a quien no puede o no sabe aprovecharlas.",
   "cuandoSeUsa": "Cuando a alguien le cae una oportunidad que no va a usar.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "suerte",
    "injusticia",
    "oportunidad",
    "envidia"
   ],
   "escena": "Un abuelito sin dientes recibe una panera gigante mientras un tipo con dientes enormes lo mira con hambre.",
   "hornero": "Pasame el pan, abuelo, que yo sí tengo pico."
  },
  {
   "id": 42,
   "texto": "El pez por la boca muere",
   "mitadA": "El pez",
   "mitadB": "por la boca muere",
   "categoria": "palabras",
   "argentino": false,
   "significado": "El que habla de más termina perjudicándose.",
   "cuandoSeUsa": "Cuando alguien se delata o se complica por bocón.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "hablar de más",
    "secreto",
    "chisme",
    "bocón"
   ],
   "escena": "Un pez bocón habla sin parar hasta que se engancha solito en un anzuelo.",
   "hornero": "Yo de ese tema no hablo. Por las dudas."
  },
  {
   "id": 43,
   "texto": "Perro que ladra no muerde",
   "mitadA": "Perro que ladra",
   "mitadB": "no muerde",
   "categoria": "palabras",
   "argentino": false,
   "significado": "El que amenaza mucho suele no hacer nada.",
   "cuandoSeUsa": "Cuando alguien grita o amenaza de más.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "amenaza",
    "gritos",
    "miedo",
    "enojo"
   ],
   "escena": "Un perrito chiquito ladra con un megáfono y, cuando alguien se acerca, sale corriendo a esconderse.",
   "hornero": "Mucho guau y poco mordisco."
  },
  {
   "id": 44,
   "texto": "A buen entendedor, pocas palabras",
   "mitadA": "A buen entendedor",
   "mitadB": "pocas palabras",
   "categoria": "palabras",
   "argentino": false,
   "significado": "Al que entiende rápido no hace falta explicarle mucho.",
   "cuandoSeUsa": "Para cerrar una indirecta o no dar más explicaciones.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "indirecta",
    "entender",
    "insinuar"
   ],
   "escena": "Un tipo le guiña el ojo a otro, que asiente con los ojos como platos.",
   "hornero": "Ya sabés. No digo más."
  },
  {
   "id": 45,
   "texto": "El que avisa no es traidor",
   "mitadA": "El que avisa",
   "mitadB": "no es traidor",
   "categoria": "palabras",
   "argentino": false,
   "significado": "Si advertiste antes, después no te pueden reprochar nada.",
   "cuandoSeUsa": "Cuando se pone un límite o se da una advertencia.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "advertencia",
    "aviso",
    "límite"
   ],
   "escena": "Un tipo pone un cartel de CUIDADO frente a un pozo, y otro se cae adentro igual.",
   "hornero": "Yo te avisé. Quedó grabado."
  },
  {
   "id": 46,
   "texto": "El que tiene boca se equivoca",
   "mitadA": "El que tiene boca",
   "mitadB": "se equivoca",
   "categoria": "palabras",
   "argentino": false,
   "significado": "Todos nos podemos equivocar al hablar.",
   "cuandoSeUsa": "Para pedir disculpas o perdonar un error.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "error",
    "disculpas",
    "equivocarse",
    "perdonar"
   ],
   "escena": "Una boca enorme con una curita y cara de perdón.",
   "hornero": "Yo tengo pico. Me equivoco igual."
  },
  {
   "id": 47,
   "texto": "Al pan, pan y al vino, vino",
   "mitadA": "Al pan, pan",
   "mitadB": "y al vino, vino",
   "categoria": "palabras",
   "argentino": false,
   "significado": "Hay que decir las cosas claras y por su nombre.",
   "cuandoSeUsa": "Cuando alguien anda con vueltas y hace falta hablar derecho.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "sinceridad",
    "hablar claro",
    "franqueza"
   ],
   "escena": "Un tipo pega carteles de PAN y VINO en una mesa en medio de un viñedo.",
   "hornero": "En Mendoza al vino le decimos vino. Y al Malbec, también."
  },
  {
   "id": 48,
   "texto": "No hay mal que por bien no venga",
   "mitadA": "No hay mal",
   "mitadB": "que por bien no venga",
   "categoria": "consuelos",
   "argentino": false,
   "significado": "De algo malo puede salir algo bueno.",
   "cuandoSeUsa": "Para consolar a alguien después de un golpe.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "consuelo",
    "despido",
    "ruptura",
    "optimismo"
   ],
   "escena": "Un tipo pisa un charco y encuentra un billete adentro.",
   "hornero": "Te mojaste, pero cobraste. Negocio."
  },
  {
   "id": 49,
   "texto": "Mal de muchos, consuelo de tontos",
   "mitadA": "Mal de muchos",
   "mitadB": "consuelo de tontos",
   "categoria": "consuelos",
   "argentino": false,
   "significado": "Que a otros también les vaya mal no arregla tu problema.",
   "cuandoSeUsa": "Cuando alguien se conforma porque \"a todos les pasa\".",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "excusa",
    "consuelo",
    "comparar"
   ],
   "escena": "Diez tipos bajo la lluvia sin paraguas, sonriendo porque están todos igual de mojados.",
   "hornero": "Mojados todos, sí. Secos, ninguno."
  },
  {
   "id": 50,
   "texto": "Ojos que no ven, corazón que no siente",
   "mitadA": "Ojos que no ven",
   "mitadB": "corazón que no siente",
   "categoria": "consuelos",
   "argentino": false,
   "significado": "Lo que uno no sabe no lo hace sufrir.",
   "cuandoSeUsa": "Cuando alguien prefiere no enterarse de algo.",
   "origen": "Del repertorio de todo el mundo hispano; acá se usa muchísimo.",
   "etiquetas": [
    "secreto",
    "ignorar",
    "pareja",
    "no saber"
   ],
   "escena": "Un tipo con los ojos vendados sonríe mientras a sus espaldas se incendia la parrilla.",
   "hornero": "Mejor no mires atrás. En serio."
  }
 ]
};
