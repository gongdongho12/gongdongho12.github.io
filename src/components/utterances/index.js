import React, { createRef, useRef, useEffect } from 'react';
import { getValueFromLocalStorage } from '../../utils/localStorage';

const src = 'https://utteranc.es/client.js';
const branch = 'main';

const getTheme = (isDarkMode) => isDarkMode ? 'photon-dark' : 'github-light'

const resetChangeListener = () => {
  const isDarkMode = getValueFromLocalStorage('isDarkMode');
  const message = {
    type: 'set-theme',
    theme: getTheme(isDarkMode)
  };
  const utterances = document.querySelector('iframe')?.contentWindow;
  utterances?.postMessage(message, 'https://utteranc.es');
}

function Utterances({ repo, path }) {
  const rootElm = createRef();
  const isUtterancesLoaded = useRef(false);

  useEffect(() => {
    if (!rootElm.current || isUtterancesLoaded.current) return;
    const isDarkMode = getValueFromLocalStorage('isDarkMode');
    const utterances = document.createElement('script');
    const utterancesConfig = {
      src,
      repo,
      branch,
      theme: getTheme(isDarkMode),
      label: 'comment',
      async: true,
      'issue-term': 'pathname',
      crossorigin: 'anonymous',
    };
    Object.keys(utterancesConfig).forEach((configKey) => {
      utterances.setAttribute(configKey, utterancesConfig[configKey]);
    });
    rootElm.current.appendChild(utterances);
    window.addEventListener('theme', resetChangeListener)
    isUtterancesLoaded.current = true;
  }, [repo, rootElm, path]);

  return <div className="utterances" ref={rootElm} />;
}

export default Utterances;
