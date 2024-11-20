import tr from "./locales/tr.json";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";

/** *
 *
 * https://vue-i18n.intlify.dev/api/general.html#createi18n
 *
 */
export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    tr,
    en,
    ru,
    de,
    fr
  }
}));
