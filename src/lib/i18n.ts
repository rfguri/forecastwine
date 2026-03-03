export type Locale = "en" | "es";

const dictionaries = {
  en: {
    // Brand
    appName: "Forecast Wine",
    tagline: "Is it a good day to drink wine?",

    // Day types
    fruit: "Fruit",
    flower: "Flower",
    leaf: "Leaf",
    root: "Root",

    // Day type descriptions (old, kept for info modal)
    fruitDesc: "Best day to enjoy wine. Full flavor and aroma",
    flowerDesc: "Aromatic and expressive. Great for wine",
    leafDesc: "Lighter expression. Wine may taste muted",
    rootDesc: "Not ideal. Save your best bottles",

    // Headlines (hero)
    headlineExcellent: "Fantastic day to drink wine",
    headlineGood: "Good day to drink wine",
    headlineBad: "Today is not a day for wine",

    // Hero descriptions (single type)
    descFruit: "Fruit day, round flavors intensify",
    descFruitAllDay: "Fruit day, flavors shine all day",
    descFlower: "Floral day, aromas express fully",
    descFlowerAllDay: "Floral day, aromas shine all day",
    descLeaf: "Leaf day, aromas fade early",
    descRoot: "Root day, aromas fade quickly",

    // Transition descriptions (composable)
    descTransitionShort: "{t1} and {t2} day, short window in the {time}",
    descTransitionTooEarly: "{t1} and {t2} day, the window is too early",
    descTransitionNoWindow: "{t1} and {t2} day, aromas don't express today",

    // Best moment section
    bestMoment: "Best moment",
    noWindow: "No window",
    notRecommended: "not recommended",
    noTimeRestriction: "no time restriction",
    tooEarly: "too early",
    earlyMorning: "early morning",
    morning: "morning",
    morningToMidday: "morning to midday",
    morningToAfternoon: "morning to afternoon",
    midday: "midday",
    afternoon: "afternoon",
    afternoonToEvening: "afternoon to evening",
    evening: "evening",
    mostOfTheDay: "most of the day",
    todayLower: "today",

    // UI
    today: "Today",
    tomorrow: "Tomorrow",

    // Days of week
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    sun: "Sun",


    // Install
    installTitle: "Install Forecast Wine",
    installDesc: "Add to your home screen. No app store needed",
    installDescIos: "Add to your home screen. No App Store needed",
    installDescAndroid: "Add to your home screen. No Play Store needed",
    installAction: "Install",
    installIosSteps: "Tap the share button, then \"Add to Home Screen\"",
    dismiss: "Not now",

    // Info
    infoTitle: "How it works",
    infoP1: "The biodynamic calendar follows the moon's journey through the zodiac. Each constellation is tied to an element that shapes how wine tastes.",
    infoP2Fruit: "Fruit days (Fire signs). Wine is at its best. Great time to open something special.",
    infoP2Flower: "Flower days (Air signs). Aromas really shine. Lovely for enjoying wine.",
    infoP2Leaf: "Leaf days (Water signs). Wine can feel a bit flat or muted.",
    infoP2Root: "Root days (Earth signs). Not the best time for drinking wine.",
    infoP3: "Many winemakers and sommeliers only taste on Fruit and Flower days. The calendar follows the same principles behind biodynamic agriculture.",
    infoDisclaimer: "Based on tradition and observation, not hard science. But many wine pros swear by it. Give it a try!",

    // Transitions & time
    upcoming: "Upcoming days",
    previousDays: "Previous days",
    loadMore: "Load more",
    forecastEndTitle: "Full 30-day forecast",
    forecastEndDesc: "Updates daily with a new day every morning.",
    allDay: "All day",
    from: "from",
    until: "until",

    // Verdicts (hero card one-liners) — kept for compatibility
    verdictFruit: "Perfect day to open your best bottle",
    verdictFlower: "Great day for wine, aromas shine",
    verdictLeaf: "Wine may taste muted today",
    verdictRoot: "Save your special bottles for another day",
    verdictFruitToRoot: "Open your best bottles early, flavors fade later",
    verdictRootToFlower: "Hold off, wine comes alive later today",
    verdictFlowerToLeaf: "Aromatic morning, enjoy wine before it fades",
    verdictLeafToFruit: "Starts quiet but peaks later, save your best bottle",
    verdictMixed: "A day of shifting flavors",

    // Rating
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    poor: "Bad",
    ratingBestEarly: "Best early",
    ratingPeaksLater: "Peaks later",

    // Unfavourable periods
    unfavourable: "Unfavourable",
    unfavourableNode: "Lunar node",
    unfavourablePerigee: "Perigee",
    unfavourableTransition: "Transition",
    unfavourableShort: "Not ideal",
    ideal: "Ideal",
    expressive: "Expressive",
    muted: "Muted",
    yes: "Yes",
    no: "No",
    infoP2Unfavourable: "Unfavourable periods (grey zones). The moon is near a node, perigee, or changing constellation. Wine may not express well.",
  },
  es: {
    appName: "Forecast Wine",
    tagline: "¿Es buen día para beber vino?",

    fruit: "Fruta",
    flower: "Flor",
    leaf: "Hoja",
    root: "Raíz",

    fruitDesc: "El mejor día para disfrutar del vino. Pleno sabor y aroma",
    flowerDesc: "Aromático y expresivo. Buen momento para el vino",
    leafDesc: "El vino puede ser poco expresivo",
    rootDesc: "No es el mejor día. Guarda tus mejores botellas",

    headlineExcellent: "Fantástico día para beber vino",
    headlineGood: "Buen día para beber vino",
    headlineBad: "Hoy no es día para beber vino",

    descFruit: "Día de fruta, los sabores redondos se intensifican",
    descFruitAllDay: "Día de fruta, los sabores redondos brillan todo el día",
    descFlower: "Día floral, los aromas se expresan al máximo",
    descFlowerAllDay: "Día floral, los aromas brillan todo el día",
    descLeaf: "Día de hoja, los aromas se apagan temprano",
    descRoot: "Día de raíz, los aromas se apagan pronto",

    descTransitionShort: "Día de {t1} y {t2}, ventana corta por la {time}",
    descTransitionTooEarly: "Día de {t1} y {t2}, la ventana es demasiado temprana",
    descTransitionNoWindow: "Día de {t1} y {t2}, los aromas no se expresan hoy",

    bestMoment: "Mejor momento",
    noWindow: "Sin ventana",
    notRecommended: "no recomendado",
    noTimeRestriction: "sin restricción de hora",
    tooEarly: "demasiado temprano",
    earlyMorning: "madrugada",
    morning: "mañana",
    morningToMidday: "mañana a mediodía",
    morningToAfternoon: "mañana a tarde",
    midday: "mediodía",
    afternoon: "tarde",
    afternoonToEvening: "tarde a noche",
    evening: "noche",
    mostOfTheDay: "casi todo el día",
    todayLower: "hoy",

    today: "Hoy",
    tomorrow: "Mañana",

    mon: "Lun",
    tue: "Mar",
    wed: "Mié",
    thu: "Jue",
    fri: "Vie",
    sat: "Sáb",
    sun: "Dom",

    installTitle: "Instala Forecast Wine",
    installDesc: "Añádela a tu pantalla de inicio, sin tienda de apps",
    installDescIos: "Añádela a tu pantalla de inicio, sin App Store",
    installDescAndroid: "Añádela a tu pantalla de inicio, sin Play Store",
    installAction: "Instalar",
    installIosSteps: "Pulsa el botón de compartir y luego \"Añadir a pantalla de inicio\"",
    dismiss: "Ahora no",

    infoTitle: "Cómo funciona",
    infoP1: "El calendario biodinámico sigue el recorrido de la luna por las constelaciones del zodíaco. Cada una se asocia a un elemento que influye en cómo sabe el vino.",
    infoP2Fruit: "Días de fruta (signos de fuego). El vino lo da todo. Ideal para abrir algo especial.",
    infoP2Flower: "Días de flor (signos de aire). Los aromas brillan. Muy buen momento para el vino.",
    infoP2Leaf: "Días de hoja (signos de agua). El vino puede parecer algo plano.",
    infoP2Root: "Días de raíz (signos de tierra). No es el mejor momento para beber vino.",
    infoP3: "Muchos enólogos y sumilleres solo catan en días de Fruta y Flor. El calendario sigue los mismos principios de la agricultura biodinámica.",
    infoDisclaimer: "Basado en tradición y observación, no en ciencia exacta. Pero muchos profesionales del vino confían en ello. ¡Pruébalo!",

    upcoming: "Próximos días",
    previousDays: "Días anteriores",
    loadMore: "Ver más",
    forecastEndTitle: "Pronóstico completo de 30 días",
    forecastEndDesc: "Se actualiza a diario con un nuevo día cada mañana.",
    allDay: "Todo el día",
    from: "desde",
    until: "hasta",

    verdictFruit: "Día perfecto para abrir tu mejor botella",
    verdictFlower: "Buen día para el vino, los aromas brillan",
    verdictLeaf: "El vino puede parecer apagado hoy",
    verdictRoot: "Guarda tus botellas especiales para otro día",
    verdictFruitToRoot: "Abre lo bueno temprano, luego se apaga",
    verdictRootToFlower: "Espera un poco, el vino cobra vida más tarde",
    verdictFlowerToLeaf: "Mañana aromática, disfruta antes de que se apague",
    verdictLeafToFruit: "Empieza flojo pero mejora, guarda lo bueno para luego",
    verdictMixed: "Un día con sabores cambiantes",

    excellent: "Excelente",
    good: "Bueno",
    fair: "Regular",
    poor: "Malo",
    ratingBestEarly: "Mejor temprano",
    ratingPeaksLater: "Mejora después",

    unfavourable: "Desfavorable",
    unfavourableNode: "Nodo lunar",
    unfavourablePerigee: "Perigeo",
    unfavourableTransition: "Transición",
    unfavourableShort: "No ideal",
    ideal: "Ideal",
    expressive: "Expresivo",
    muted: "Apagado",
    yes: "Sí",
    no: "No",
    infoP2Unfavourable: "Períodos desfavorables (zonas grises). La luna está cerca de un nodo, perigeo o cambio de constelación. El vino puede no expresarse bien.",
  },
} as const;

export type DictionaryKey = keyof typeof dictionaries.en;
export type Dictionary = Record<DictionaryKey, string>;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}

export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language || "";
  return lang.startsWith("es") ? "es" : "en";
}

export function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/** Full date for hero: "viernes 21 de febrero" / "Friday, February 21" */
export function formatHeroDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/** Compact date for list rows: "Domingo, 23 feb" / "Sunday, Feb 23" */
export function formatCompactDate(date: Date, locale: Locale): string {
  const raw = date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
  // Capitalize first letter
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export function formatDayLabel(date: Date, locale: Locale, dict: Dictionary): string {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (isSameDay(date, today)) return dict.today;
  if (isSameDay(date, tomorrow)) return dict.tomorrow;
  return formatDate(date, locale);
}
