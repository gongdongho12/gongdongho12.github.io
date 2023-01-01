import React, { createRef, useEffect, useRef } from 'react';
import { getValueFromLocalStorage } from '../../utils/localStorage';

const src = 'https://utteranc.es/client.js';
const branch = 'main';

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
      theme: isDarkMode ? 'photon-dark' : 'github-light',
      label: 'comment',
      async: true,
      'issue-term': 'pathname',
      crossorigin: 'anonymous',
    };

    Object.keys(utterancesConfig).forEach((configKey) => {
      utterances.setAttribute(configKey, utterancesConfig[configKey]);
    });
    rootElm.current.appendChild(utterances);
    isUtterancesLoaded.current = true;
  }, [repo, rootElm, path]);

  return <div className="utterances" ref={rootElm} />;
}

export default Utterances;
