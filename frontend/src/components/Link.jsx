import React from 'react';
import { useI18n, getLocalizedPath } from '../i18n/utils';

export default function Link({ to, href, lang: propLang, children, ...props }) {
  const { lang } = useI18n(propLang);
  const target = to || href || '';

  const isExternal = 
    typeof target !== 'string' ||
    target.startsWith('http://') || 
    target.startsWith('https://') || 
    target.startsWith('mailto:') || 
    target.startsWith('tel:') ||
    target.startsWith('javascript:') ||
    target.startsWith('#');

  let finalHref = target;
  if (!isExternal && target.startsWith('/')) {
    const [pathPart, ...hashParts] = target.split('#');
    const hash = hashParts.length > 0 ? `#${hashParts.join('#')}` : '';
    const localized = getLocalizedPath(pathPart || '/', lang);
    finalHref = `${localized}${hash}`;
  }

  return (
    <a href={finalHref} {...props}>
      {children}
    </a>
  );
}

export { Link };
