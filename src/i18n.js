import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: "es",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          main_title: "Menu generator",
          main_welcome_text: "What would you like to do today?",
          nav_title_1: "Create new",
          nav_title_2: "Edit",
          nav_icon_text: "Icons from ",
          section_menu: "Menu",
          section_page: "Weekend specials",
          section_wine: "Wine list",
          language: "Language",
          menu_section_starters: "Starters",
          menu_section_firsts: "First courses",
          menu_section_seconds: "Second courses",
          menu_section_desserts: "Desserts",
          editor_page_name_title: "File name",
          editor_page_name_description:
            "Name under which the document will be saved",
          editor_page_name_placeholder: "E.g.: Menu 1",
          generic_page_title_title: "Page title",
          generic_page_title_placeholder:
            "Text that will appear in the header of the page",
          generic_shown_elements_title: "Elements to show",
          generic_continue: "Continue",
          generic_name: "Name",
          generic_description: "Description",
          generic_daily_menu: "Menu of the day",
          generic_weekend: "Weekend",
          generic_add: "Add",
          generic_sure: "Are you sure?",
          generic_yes: "Yes",
          generic_no: "No",
          generic_accept: "Accept",
          generic_edit: "Edit",
          generic_restore: "Restore",
          generic_dishes: "Dishes",
          generic_dish: "Dish",
          generic_import: "Import",
          generic_import_file: "Import file",
          generic_wines: "Wines",
          generic_wine: "Wine",
          generic_price: "Price",
          generic_allergens: "Allergens",
          generic_add_allergens: "Add allergens",
          generic_edit_allergens: "Edit allergens",
          generic_editing_allergens: "Editing allergens of: ",
          allergen_gluten: "Gluten",
          allergen_nuts: "Nuts",
          allergen_shellfish: "Shellfish",
          allergen_crustaceans: "Crustaceans",
          allergen_eggs: "Eggs",
          allergen_fish: "Fish",
          allergen_soy: "Soy",
          allergen_peanuts: "Peanuts",
          allergen_dairy: "Dairy",
          allergen_sesame: "Sesame",
          allergen_celery: "Celery",
          allergen_mustard: "Mustard",
          allergen_sulphites: "Sulphites",
          allergen_lupines: "Lupines",
          generic_go_back: "Back",
          generic_go_download: "Download",
          generic_save: "Save",
          generic_duplicate: "Duplicate",
          generic_delete: "Delete",
          generic_export: "Export",
          generic_copy: "copy",
          wine_house_wines: "House wines",
          currency_label: "Currency",
          currency_eur: "€",
          currency_eur_kg: "€/kg",
          currency_eur_unit: "€/unit",
          currency_eur_piece: "€/piece",
          currency_eur_person: "€/person",
        },
      },
      es: {
        translation: {
          main_title: "Generador de menús",
          main_welcome_text: "¿Qué quieres hacer hoy?",
          nav_title_1: "Crear nuevo",
          nav_title_2: "Editar",
          nav_icon_text: "Iconos de ",
          section_menu: "Menú",
          section_page: "Carta fin de semana",
          section_wine: "Carta de vinos",
          language: "Idioma",
          menu_section_starters: "Entrantes",
          menu_section_firsts: "Primeros",
          menu_section_seconds: "Segundos",
          menu_section_desserts: "Postres",
          editor_page_name_title: "Nombre del documento",
          editor_page_name_description:
            "Nombre con el que se guardará el documento",
          editor_page_name_placeholder: "Ej: Menú 1",
          generic_page_title_title: "Título de la página",
          generic_page_title_placeholder:
            "Texto que aparecerá en la cabecera de la página",
          generic_shown_elements_title: "Elementos a mostrar",
          generic_continue: "Continuar",
          generic_name: "Nombre",
          generic_description: "Descripción",
          generic_daily_menu: "Menú del día",
          generic_weekend: "Fin de semana",
          generic_add: "Añadir",
          generic_sure: "¿Seguro?",
          generic_yes: "Sí",
          generic_no: "No",
          generic_accept: "Aceptar",
          generic_edit: "Editar",
          generic_restore: "Restablecer",
          generic_dishes: "Platos",
          generic_dish: "Plato",
          generic_import: "Importar",
          generic_import_file: "Importar documento",
          generic_wines: "Vinos",
          generic_wine: "Vino",
          generic_price: "Precio",
          generic_allergens: "Alérgenos",
          generic_add_allergens: "Añadir alérgenos",
          generic_edit_allergens: "Editar alérgenos",
          generic_editing_allergens: "Editando alérgenos de: ",
          allergen_gluten: "Gluten",
          allergen_nuts: "Frutos de cáscara",
          allergen_shellfish: "Moluscos",
          allergen_crustaceans: "Crustáceos",
          allergen_eggs: "Huevo",
          allergen_fish: "Pescado",
          allergen_soy: "Soja",
          allergen_peanuts: "Cacahuetes",
          allergen_dairy: "Lácteos",
          allergen_sesame: "Sésamo",
          allergen_celery: "Apio",
          allergen_mustard: "Mostaza",
          allergen_sulphites: "Sulfitos",
          allergen_lupines: "Altramuces",
          generic_go_back: "Volver",
          generic_go_download: "Descargar",
          generic_save: "Guardar",
          generic_duplicate: "Duplicar",
          generic_delete: "Eliminar",
          generic_export: "Exportar",
          generic_copy: "copia",
          wine_house_wines: "De la casa",
          currency_label: "Moneda",
          currency_eur: "€",
          currency_eur_kg: "€/kg",
          currency_eur_unit: "€/unidad",
          currency_eur_piece: "€/pieza",
          currency_eur_person: "€/persona",
        },
      },
      gl: {
        translation: {
          main_title: "Xerador de menús",
          main_welcome_text: "Que queres facer hoxe?",
          nav_title_1: "Crear novo",
          nav_title_2: "Editar",
          nav_icon_text: "Iconas de ",
          section_menu: "Menú",
          section_page: "Carta fin de semana",
          section_wine: "Carta de viños",
          language: "Idioma",
          menu_section_starters: "Entrantes",
          menu_section_firsts: "Primeiros",
          menu_section_seconds: "Segundos",
          menu_section_desserts: "Sobremesas",
          editor_page_name_title: "Nome do documento",
          editor_page_name_description: "Nome co cal se gardará o documento",
          editor_page_name_placeholder: "Ex: Menú 1",
          generic_page_title_title: "Título da páxina",
          generic_page_title_placeholder:
            "Texto que aparecerá na cabeceira da páxina",
          generic_shown_elements_title: "Elementos a mostrar",
          generic_continue: "Continuar",
          generic_name: "Nome",
          generic_description: "Descripción",
          generic_daily_menu: "Menú do día",
          generic_weekend: "Fin de semana",
          generic_add: "Engadir",
          generic_sure: "Seguro?",
          generic_yes: "Si",
          generic_no: "Non",
          generic_accept: "Aceptar",
          generic_edit: "Editar",
          generic_restore: "Restaurar",
          generic_dishes: "Pratos",
          generic_dish: "Prato",
          generic_import: "Importar",
          generic_import_file: "Importar documento",
          generic_wines: "Viños",
          generic_wine: "Viño",
          generic_price: "Prezo",
          generic_allergens: "Alérxenos",
          generic_add_allergens: "Engadir alérxenos",
          generic_edit_allergens: "Editar alérxenos",
          generic_editing_allergens: "Editando alérxenos de: ",
          allergen_gluten: "Gluten",
          allergen_nuts: "Froitos de casca",
          allergen_shellfish: "Moluscos",
          allergen_crustaceans: "Crustáceos",
          allergen_eggs: "Ovo",
          allergen_fish: "Peixe",
          allergen_soy: "Soia",
          allergen_peanuts: "Cacahuetes",
          allergen_dairy: "Lácteos",
          allergen_sesame: "Sésamo",
          allergen_celery: "Apio",
          allergen_mustard: "Mostaza",
          allergen_sulphites: "Sulfitos",
          allergen_lupines: "Altramuces",
          generic_go_back: "Volver",
          generic_go_download: "Descargar",
          generic_save: "Gardar",
          generic_duplicate: "Duplicar",
          generic_delete: "Eliminar",
          generic_export: "Exportar",
          generic_copy: "copia",
          wine_house_wines: "Da casa",
          currency_label: "Moeda",
          currency_eur: "€",
          currency_eur_kg: "€/kg",
          currency_eur_unit: "€/unidade",
          currency_eur_piece: "€/peza",
          currency_eur_person: "€/persona",
        },
      },
    },
  });

export default i18n;
