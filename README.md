# 🍎 AI-Nutrition-Planner: Gemini + Google Apps Script

Este proyecto es un **Planificador Nutricional Automatizado** desarrollado dentro de la infraestructura de Google Workspace. Utiliza la potencia de la IA generativa (**Gemini**) para transformar datos antropométricos en planes de alimentación estructurados y listas de compras inteligentes para 3 comensales.

## 🚀 Características
* **Interfaz Nativa:** Formulario HTML/CSS integrado directamente en Google Sheets.
* **Motor de IA:** Integración con la función nativa `=GEMINI()` de Google Workspace.
* **Procesamiento Inteligente:** Limpieza de datos mediante Google Apps Script para eliminar formatos Markdown y disclaimers de la IA.
* **Automatización de Compras:** Generación automática de lista de ingredientes en una solapa independiente.

## 🛠️ Stack Tecnológico
* **Google Apps Script:** Lógica de backend y manipulación de hojas de cálculo.
* **HTML/CSS:** Interfaz de usuario para la captura de parámetros del perfil.
* **Gemini AI:** Modelo de lenguaje para la generación de contenido nutricional personalizado.

## 📋 Requisitos Previos
* Cuenta de Google Workspace con acceso a las funciones de IA (Google AI en Sheets).
* Google Sheets configurado con dos pestañas: `Menú` y `Lista de compras`.

## ⚙️ Instrucciones de Instalación

1.  En tu Google Sheet, ve a **Extensiones > Apps Script**.
2.  Crea un archivo llamado `Código.gs` y pega el código correspondiente de este repositorio.
3.  Crea un archivo tipo HTML llamado `Formulario.html` y pega el código de la interfaz.
4.  Guarda el proyecto y refresca tu hoja de cálculo.
5.  Aparecerá un menú llamado **🍎 Planificador**. Úsalo para abrir el formulario e ingresar tus datos.
6.  Una vez que la celda `Z1` muestre el texto generado, usa el botón de **Organizar** (puedes crear uno insertando un dibujo y asignándole la función `organizarDatosGenerados`).

---

### 💡 El Desafío Técnico Resuelto
El mayor valor de este proyecto radica en el **procesamiento de datos no estructurados**. Las IAs generativas suelen responder con formatos variables (negritas, tablas Markdown, avisos legales). Este script implementa una lógica de filtrado y limpieza que garantiza que la información se distribuya correctamente en las celdas, convirtiendo una respuesta de texto libre en una herramienta operativa real.

---
*Desarrollado como un ejemplo de integración de IA aplicada a la productividad personal
** NOTA IMPORTANTE: Este desarrollo no reemplaza, sustituye ni desautoriza a tu nutricionista, solo está creado con fines educativos
