import injectDecorator from './inject-decorator';

function transform(source) {
  const result = injectDecorator(source);

  if (!result.changed) {
    return source;
  }

  const sourceJson = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  const addsMap = JSON.stringify(result.addsMap);

  return `
  var withStorySource = require('@storybook/addon-stories').withStorySource;
  var __STORY__ = ${sourceJson};
  var __ADDS_MAP__ = ${addsMap};
  
  ${result.source}
  `;
}

export default transform;