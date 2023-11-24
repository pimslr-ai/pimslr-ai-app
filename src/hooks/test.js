const course = {
  advanced: [
    {
      english:
        'I am intrigued by postmodernist literary movements and deconstructivist narrative techniques.',
      sentence:
        'Ik ben geïntrigeerd door postmodernistische literaire bewegingen en deconstructivistische narratieve technieken.',
    },
    {
      english: 'He analyzes cinematic virtuosity and subversive film theories.',
      sentence: 'Hij analyseert de cinematografische virtuositeit en subversieve filmtheorieën.',
    },
    {
      english: 'We deconstruct the contextual artistic discourse and reinterpret conceptual art.',
      sentence: 'We deconstrueren het contextueel artistiek discours en herinterpreteren conceptuele kunst.',
    },
    {
      english: 'She investigates phenomenological sound experiments and performative sound installations.',
      sentence: 'Zij onderzoekt fenomenologische klankexperimenten en performatieve geluidsinstallaties.',
    },
    {
      english: 'I am fascinated by postmodern dance techniques and embodiment in performing arts.',
      sentence: 'Ik ben fascinerend door postmoderne danstechnieken en embodiment in bewegingskunst.',
    },
    {
      english: 'He deconstructs metafiction and postcolonial literary representations.',
      sentence: 'Hij deconstrueert de metafictie en postkoloniale literaire representaties.',
    },
    {
      english: 'We analyze semiotic codifications and deconstruct aesthetic symbolism.',
      sentence: 'We analyseren semiotische codificaties en deconstrueren esthetische symboliek.',
    },
    {
      english: 'She refines interactive audiovisual art and deconstructive theatricalization.',
      sentence: 'Zij verfijnt de interactieve audiovisuele kunst en deconstructive theatralisatie.',
    },
    {
      english: 'I investigate post-tonal harmonic structures and microtonal expressivity.',
      sentence: 'Ik onderzoek post-tonale harmonische structuren en microtonale expressiviteit.',
    },
    {
      english: 'He deconstructs diverse narrative paradigms and transgressive narratological strategies.',
      sentence:
        "Hij deconstrueert diverse narratieve paradigma's en transgressieve narratologische strategieën.",
    },
  ],
  beginning: [
    { english: 'I enjoy reading books.', sentence: 'Ik lees graag boeken.' },
    { english: 'He watches movies and series.', sentence: 'Hij kijkt films en series.' },
    { english: 'We play board games together.', sentence: 'We spelen bordspellen samen.' },
    { english: 'She listens to music.', sentence: 'Zij luistert naar muziek.' },
    { english: 'I dance at parties.', sentence: 'Ik dans op feestjes.' },
    { english: 'He reads magazines and newspapers.', sentence: 'Hij leest tijdschriften en kranten.' },
    { english: 'We watch theater performances.', sentence: 'We kijken naar theateroptredens.' },
    { english: 'She paints and draws creatively.', sentence: 'Zij schildert en tekent creatief.' },
    { english: 'I sing in a choir ensemble.', sentence: 'Ik zing in een koorensemble.' },
    { english: 'He writes stories and scripts.', sentence: "Hij schrijft verhalen en scenario's." },
  ],
  currentLevel: 'beginning',
  intermediate: [
    {
      english: 'I enjoy classical literature and modern theater.',
      sentence: 'Ik geniet van klassieke literatuur en modern theater.',
    },
    {
      english: 'He explores various film genres and analyzes director techniques.',
      sentence: 'Hij verkent verschillende filmgenres en analyseert regisseurstechnieken.',
    },
    {
      english: 'We appreciate art films and discuss artistic expression.',
      sentence: 'We waarderen kunstfilms en discussiëren over artistieke expressie.',
    },
    {
      english: 'She studies various music styles and analyzes melodies.',
      sentence: 'Zij bestudeert verschillende muziekstijlen en analyseert melodieën.',
    },
    {
      english: 'I experiment with different dance styles and improvisation.',
      sentence: 'Ik experimenteer met verschillende dansstijlen en improvisatie.',
    },
    {
      english: 'He reads literary critiques and analyzes thematic developments.',
      sentence: 'Hij leest literaire kritieken en analyseert thematische ontwikkelingen.',
    },
    {
      english: 'We explore various art exhibitions and interpret symbolism.',
      sentence: 'We verkennen diverse kunsttentoonstellingen en interpreteren symboliek.',
    },
    {
      english: 'She practices visual art and experiments with mixed media.',
      sentence: 'Zij beoefent beeldende kunst en experimenteert met mixed media.',
    },
    {
      english: 'I explore various music ensembles and analyze harmonies.',
      sentence: 'Ik verken verscheidene muziekensembles en analyseer harmonieën.',
    },
    {
      english: 'He studies literary genres and experiments with narrative structures.',
      sentence: 'Hij bestudeert literaire genres en experimenteert met narratieve structuren.',
    },
  ],
  language: 'nl-NL',
  title: 'Entertainment Options',
}

const level = course.currentLevel.trim()

console.log(course[level])
// console.log(course['intermediate'])
