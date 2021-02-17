  //https://cthedot.de/icongen
  let manifest =
  {
    "background_color": "#1FA02E", // Define el color de fondo deseado para la aplicación. Este valor repite lo definido en la hoja de estilos de la aplicación, pero puede ser utilizado por los navegadores para pintar el color de fondo de una app si el manifiesto está disponible antes de que la hoja de estilos se haya cargado. Esto suaviza la transición entre lanzar una aplicación y cargar el contenido de la misma.
    "description": "Pwa para ayudar a los cajeros con su productividad.", // Proporciona una descripción general sobre qué hace la aplicación.
    "dir": "ltr", // (auto *, ltr, rtl) Especifica la dirección del texto para name, short_name, y description. Junto con lang, ayuda a representar correctamente los idiomas que se escriben de derecha a izquierda (right-to-left).
    "display": "standalone", // (fullscreen, standalone, minimal-ui, browser) Define el modo de visualización preferido para la aplicación web.
    "icons": [{
      "src": "assets/icon.svg",
      "sizes": "16x16",
      "type": "image/svg"
    }, {
      "src": "assets/icon.svg",
      "sizes": "32x32",
      "type": "image/svg"
    }, {
      "src": "assets/icon.svg",
      "sizes": "64x64",
      "type": "image/svg"
    }, {
      "src": "assets/icon.svg",
      "sizes": "128x128",
      "type": "image/svg"
    }, {
      "src": "assets/icon.svg",
      "sizes": "256x256",
      "type": "image/svg"
    }, {
      "src": "assets/icon.svg",
      "sizes": "512x512",
      "type": "image/svg"
    }],
    "lang": "es-CL", // Especifica el idioma principal para las propiedades name y short_name. El valor es una single language tag.
    "name": "Yumbo", // Provee una forma legible para nombre de la aplicación. Esta propiedad está destinada para la visualización del usuario, por ejemplo, entre una lista de aplicaciones o como una etiqueta para un ícono.
    "orientation": "any", // (any, natural, landscape, portrait) Define la orientación de la PWA.
    "prefer_related_applications": false,// (false *, true) Especifica un valor booleano que sugiere que el agente de usuario le indique al usuario que las aplicaciones específicas relacionadas (ver abajo) están disponibles, y recomendadas sobre la aplicación web. Esto solamente debería ser usado si la aplicación nativa relacionada realmente ofrece algo que la aplicación web no puede hacer.
    "related_applications": [{ // Con esta opción le decimos al usuario que contamos con aplicaciones en la Play Store o iTunes
      "platform": "web"
    }],
    "scope": "/", // Define el ámbito de navegación en el contexto de la aplicación web. Esto basicamente restringe qué paginas se pueden ver cuando se aplica el manifiesto. Si el usuario navega fuera del ámbito de la aplicación, continúa como en una web normal. 
    "short_name": "Yumbo", // Proporciona un nombre corto para la aplicación. Está destinado para su uso cuando hay poco espacio para mostrar el nombre completo de la aplicación.
    "start_url": "./index.html", // Especifica la URL que se carga cuando el usuario lanza la aplicación desde un dispositivo. 
    "theme_color": "#1FA02E" // Define el color por defecto para la aplicación. Esto en ocasiones afecta a como se muestra por el OS (e.g., en el lanzador de aplicaciones de Android, el color envuelve la aplicación).
  }