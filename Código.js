function procesarDatos(datos) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaMenu = ss.getSheetByName("Menú");
  
  hojaMenu.getRange("Z1").clearContent();
  SpreadsheetApp.flush();

  const promptIA = "Actúa como nutricionista. Genera un plan de 7 días para una persona de " + datos.edad + " años, " + datos.peso + "kg, " + datos.altura + "cm y actividad " + datos.actividad + ". Objetivo: Perder grasa y ganar masa muscular. Formato: 7 líneas, una por día. Cada línea separada por barras: Día | Almuerzo | Colación 1 | Colación 2 | Colación 3 | Cena. Al final agrega 'COMPRAS:' y la lista de ingredientes para 3 comensales separados por comas.";

  hojaMenu.getRange("Z1").setFormula('=GEMINI("' + promptIA + '")');
  SpreadsheetApp.flush();

  let intentos = 0;
  let respuestaBruta = "";
  
  while (intentos < 24) {
    Utilities.sleep(5000); 
    respuestaBruta = hojaMenu.getRange("Z1").getValue();
    if (respuestaBruta && respuestaBruta !== "" && !respuestaBruta.toString().includes("#")) {
      break;
    }
    intentos++;
  }

  if (respuestaBruta && !respuestaBruta.toString().includes("#")) {
    ejecutarOrganizacionDirecta(respuestaBruta);
    return "¡Listo! El menú se ha generado y organizado correctamente.";
  } else {
    return "La IA tardó demasiado. Revisa Z1 y organiza manualmente.";
  }
}

function ejecutarOrganizacionDirecta(texto) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaMenu = ss.getSheetByName("Menú");
  const hojaCompras = ss.getSheetByName("Lista de compras");

  const textoLimpio = texto.toString().replace(/[#*`]/g, "").replace(/\| ?:?-+:? \|/g, "");
  const partes = textoLimpio.split(/COMPRAS:?/i);
  const lineasCandidatas = partes[0].split("\n");
  const lineasMenu = lineasCandidatas.filter(l => l.includes("|") && !l.toLowerCase().includes("almuerzo"));

  if (lineasMenu.length > 0) {
    const matrizMenu = lineasMenu.slice(0, 7).map(linea => {
      let c = linea.split("|").map(i => i.trim());
      if (c.length > 6) c = c.slice(0, 6); 
      while(c.length < 6) c.push("");
      return c;
    });
    hojaMenu.getRange(2, 2, matrizMenu.length, 6).setValues(matrizMenu);
    hojaMenu.getRange(2, 1, matrizMenu.length, 1).setValue(1);
  }

  if (partes[1]) {
    const listaLimpia = partes[1].replace(/[A-Za-z]+:/g, "").split(",").map(ing => [ing.trim()]).filter(ing => ing[0] !== "");
    hojaCompras.getRange(2, 1, 100, 2).clearContent();
    if (listaLimpia.length > 0) {
      hojaCompras.getRange(2, 2, listaLimpia.length, 1).setValues(listaLimpia);
      hojaCompras.getRange(2, 1, listaLimpia.length, 1).setValue(1);
    }
  }
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🍎 Planificador')
    .addItem('Generar Nuevo Menú', 'mostrarFormulario')
    .addItem('Organizar Datos Manualmente', 'organizarDatosManual')
    .addToUi();
}

function mostrarFormulario() {
  const html = HtmlService.createHtmlOutputFromFile('Formulario')
    .setWidth(400)
    .setHeight(500)
    .setTitle('Configuración del Perfil');
  SpreadsheetApp.getUi().showModalDialog(html, 'Perfil Nutricional');
}

function organizarDatosManual() {
  const val = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Menú").getRange("Z1").getValue();
  ejecutarOrganizacionDirecta(val);
}
