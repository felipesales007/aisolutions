/* eslint-disable */
this.primevue = this.primevue || {};
this.primevue.tooltip = (function (utils) {
  function bindEvents(el) {
    const modifiers = el.$_ptooltipModifiers;
    if (modifiers.focus) {
      el.addEventListener('focus', onFocus);
      el.addEventListener('blur', onBlur);
    } else {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
      el.addEventListener('click', onClick);
    }
  }

  function unbindEvents(el) {
    const modifiers = el.$_ptooltipModifiers;
    if (modifiers.focus) {
      el.removeEventListener('focus', onFocus);
      el.removeEventListener('blur', onBlur);
    } else {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('click', onClick);
    }
  }

  function bindScrollListener(el) {
    if (!el.$_ptooltipScrollHandler) {
      el.$_ptooltipScrollHandler = new utils.ConnectedOverlayScrollHandler(el, () => {
        hide(el);
      });
    }

    el.$_ptooltipScrollHandler.bindScrollListener();
  }

  function unbindScrollListener(el) {
    if (el.$_ptooltipScrollHandler) {
      el.$_ptooltipScrollHandler.unbindScrollListener();
    }
  }

  function onMouseEnter(event) {
    show(event.currentTarget);
  }

  function onMouseLeave(event) {
    hide(event.currentTarget);
  }

  function onFocus(event) {
    show(event.currentTarget);
  }

  function onBlur(event) {
    hide(event.currentTarget);
  }

  function onClick(event) {
    hide(event.currentTarget);
  }

  function show(el) {
    if (el.$_ptooltipDisabled) {
      return;
    }

    const tooltipElement = create(el);
    align(el);
    utils.DomHandler.fadeIn(tooltipElement, 250);

    window.addEventListener('resize', function onWindowResize() {
      if (!utils.DomHandler.isAndroid()) {
        hide(el);
      }
      this.removeEventListener('resize', onWindowResize);
    });

    bindScrollListener(el);
    utils.ZIndexUtils.set('tooltip', tooltipElement, el.$_ptooltipZIndex);
  }

  function hide(el) {
    remove(el);
    unbindScrollListener(el);
    utils.ZIndexUtils.clear(el);
  }

  function getTooltipElement(el) {
    return document.getElementById(el.$_ptooltipId);
  }

  function create(el) {
    const id = `${utils.UniqueComponentId()}_tooltip`;
    el.$_ptooltipId = id;

    const container = document.createElement('div');
    container.id = id;

    const tooltipArrow = document.createElement('div');
    tooltipArrow.className = 'p-tooltip-arrow';
    container.appendChild(tooltipArrow);

    const tooltipText = document.createElement('div');
    tooltipText.className = 'p-tooltip-text';
    tooltipText.innerHTML = el.$_ptooltipValue;

    container.appendChild(tooltipText);
    document.body.appendChild(container);

    container.style.display = 'inline-block';

    return container;
  }

  function remove(el) {
    if (el) {
      const tooltipElement = getTooltipElement(el);
      if (tooltipElement && tooltipElement.parentElement) {
        document.body.removeChild(tooltipElement);
      }
      el.$_ptooltipId = null;
    }
  }

  function align(el) {
    const modifiers = el.$_ptooltipModifiers;

    if (modifiers.top) {
      alignTop(el);
      if (isOutOfBounds(el)) {
        alignBottom(el);
      }
    } else if (modifiers.left) {
      alignLeft(el);
      if (isOutOfBounds(el)) {
        alignRight(el);

        if (isOutOfBounds(el)) {
          alignTop(el);

          if (isOutOfBounds(el)) {
            alignBottom(el);
          }
        }
      }
    } else if (modifiers.bottom) {
      alignBottom(el);
      if (isOutOfBounds(el)) {
        alignTop(el);
      }
    } else {
      alignRight(el);
      if (isOutOfBounds(el)) {
        alignLeft(el);

        if (isOutOfBounds(el)) {
          alignTop(el);

          if (isOutOfBounds(el)) {
            alignBottom(el);
          }
        }
      }
    }
  }

  function getHostOffset(el) {
    const offset = el.getBoundingClientRect();
    const targetLeft = offset.left + utils.DomHandler.getWindowScrollLeft();
    const targetTop = offset.top + utils.DomHandler.getWindowScrollTop();

    return { left: targetLeft, top: targetTop };
  }

  function alignRight(el) {
    preAlign(el, 'right');
    const tooltipElement = getTooltipElement(el);
    const hostOffset = getHostOffset(el);
    const left = hostOffset.left + utils.DomHandler.getOuterWidth(el);
    const top =
      hostOffset.top +
      (utils.DomHandler.getOuterHeight(el) - utils.DomHandler.getOuterHeight(tooltipElement)) / 2;
    tooltipElement.style.left = `${left}px`;
    tooltipElement.style.top = `${top}px`;
  }

  function alignLeft(el) {
    preAlign(el, 'left');
    const tooltipElement = getTooltipElement(el);
    const hostOffset = getHostOffset(el);
    const left = hostOffset.left - utils.DomHandler.getOuterWidth(tooltipElement);
    const top =
      hostOffset.top +
      (utils.DomHandler.getOuterHeight(el) - utils.DomHandler.getOuterHeight(tooltipElement)) / 2;
    tooltipElement.style.left = `${left}px`;
    tooltipElement.style.top = `${top}px`;
  }

  function alignTop(el) {
    preAlign(el, 'top');
    const tooltipElement = getTooltipElement(el);
    const hostOffset = getHostOffset(el);
    const left =
      hostOffset.left +
      (utils.DomHandler.getOuterWidth(el) - utils.DomHandler.getOuterWidth(tooltipElement)) / 2;
    const top = hostOffset.top - utils.DomHandler.getOuterHeight(tooltipElement);
    tooltipElement.style.left = `${left}px`;
    tooltipElement.style.top = `${top}px`;
  }

  function alignBottom(el) {
    preAlign(el, 'bottom');
    const tooltipElement = getTooltipElement(el);
    const hostOffset = getHostOffset(el);
    const left =
      hostOffset.left +
      (utils.DomHandler.getOuterWidth(el) - utils.DomHandler.getOuterWidth(tooltipElement)) / 2;
    const top = hostOffset.top + utils.DomHandler.getOuterHeight(el);
    tooltipElement.style.left = `${left}px`;
    tooltipElement.style.top = `${top}px`;
  }

  function preAlign(el, position) {
    const tooltipElement = getTooltipElement(el);
    tooltipElement.style.left = `${-999}px`;
    tooltipElement.style.top = `${-999}px`;
    tooltipElement.className = `p-tooltip p-component p-tooltip-${position} ${
      el.$_ptooltipClass || ''
    }`;
  }

  function isOutOfBounds(el) {
    const tooltipElement = getTooltipElement(el);
    const offset = tooltipElement.getBoundingClientRect();
    const targetTop = offset.top;
    const targetLeft = offset.left;
    const width = utils.DomHandler.getOuterWidth(tooltipElement);
    const height = utils.DomHandler.getOuterHeight(tooltipElement);
    const viewport = utils.DomHandler.getViewport();

    return (
      targetLeft + width > viewport.width ||
      targetLeft < 0 ||
      targetTop < 0 ||
      targetTop + height > viewport.height
    );
  }

  function getTarget(el) {
    return utils.DomHandler.hasClass(el, 'p-inputwrapper')
      ? utils.DomHandler.findSingle(el, 'input')
      : el;
  }

  function getModifiers(options) {
    // modifiers
    if (options.modifiers && Object.keys(options.modifiers).length) {
      return options.modifiers;
    }

    // arg
    if (options.arg && typeof options.arg === 'object') {
      return Object.entries(options.arg).reduce((acc, [key, val]) => {
        if (key === 'event' || key === 'position') acc[val] = true;
        return acc;
      }, {});
    }

    return {};
  }

  const Tooltip = {
    beforeMount(el, options) {
      const target = getTarget(el);
      target.$_ptooltipModifiers = getModifiers(options);

      if (!options.value) return;
      if (typeof options.value === 'string') {
        target.$_ptooltipValue = options.value;
        target.$_ptooltipDisabled = false;
        target.$_ptooltipClass = null;
      } else {
        target.$_ptooltipValue = options.value.value;
        target.$_ptooltipDisabled = options.value.disabled || false;
        target.$_ptooltipClass = options.value.class;
      }

      target.$_ptooltipZIndex =
        options.instance.$primevue &&
        options.instance.$primevue.config &&
        options.instance.$primevue.config.zIndex.tooltip;
      bindEvents(target);
    },
    unmounted(el) {
      const target = getTarget(el);
      remove(target);
      unbindEvents(target);

      if (target.$_ptooltipScrollHandler) {
        target.$_ptooltipScrollHandler.destroy();
        target.$_ptooltipScrollHandler = null;
      }

      utils.ZIndexUtils.clear(el);
    },
    updated(el, options) {
      const target = getTarget(el);
      target.$_ptooltipModifiers = getModifiers(options);

      if (!options.value) return;
      if (typeof options.value === 'string') {
        target.$_ptooltipValue = options.value;
        target.$_ptooltipDisabled = false;
        target.$_ptooltipClass = null;
      } else {
        target.$_ptooltipValue = options.value.value;
        target.$_ptooltipDisabled = options.value.disabled || false;
        target.$_ptooltipClass = options.value.class;
      }
    },
  };

  return Tooltip;
})(primevue.utils);
