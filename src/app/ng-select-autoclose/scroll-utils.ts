/*
	Code from stackoverflow with minimal modifications.
*/

function isScrollable(node: Element) {
  if (!(node instanceof HTMLElement)) {
    return false;
  }

  const style = getComputedStyle(node);

  const scrollable = ['overflow', 'overflow-x', 'overflow-y'].some((propertyName) => {
    const value = style.getPropertyValue(propertyName);
    return ['auto', 'scroll'].includes(value);
  });

  return scrollable && node.scrollHeight > node.offsetHeight;
}

export function getScrollParent(node: Element) {
  let currentParent = node.parentElement;

  while (currentParent) {
    if (isScrollable(currentParent)) {
      return currentParent;
    }

    currentParent = currentParent.parentElement;
  }

  return document.scrollingElement || document.documentElement;
}