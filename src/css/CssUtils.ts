import * as postcss from 'postcss';

/**
 * Utility methods for CSS injection/removal, selector validation.
 */
const STYLE_ELEMENT_ID = 'stylebot-css';

const CSSUtils = {
  injectCSSIntoDocument: (css: string) => {
    const el = document.getElementById(STYLE_ELEMENT_ID);

    if (el) {
      el.innerHTML = css;
      return;
    }

    const style = document.createElement('style');

    style.type = 'text/css';
    style.setAttribute('id', STYLE_ELEMENT_ID);
    style.appendChild(document.createTextNode(css));

    document.documentElement.appendChild(style);
  },

  injectRootIntoDocument: (root: postcss.Root) => {
    const rootWithImportant = root.clone();
    rootWithImportant.walkDecls(decl => (decl.important = true));

    const css = rootWithImportant.toString();
    CSSUtils.injectCSSIntoDocument(css);
  },

  removeCSSFromDocument: () => {
    const el = document.getElementById(STYLE_ELEMENT_ID);

    if (el) {
      el.innerHTML = '';
    }
  },

  validateSelector: (selector: string): boolean => {
    if (!selector) {
      return false;
    }

    try {
      document.querySelector(selector);
      return true;
    } catch (e) {
      return false;
    }
  },
};

export default CSSUtils;
