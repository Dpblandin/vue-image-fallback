function onError(el, options) {
    const src = el.getAttribute('src');

    if (options.loading && options.loading.length) {
        el.setAttribute('src', options.loading);
    }

    const index = options.images.indexOf(src);

    if (index === -1) {
        const fallbackSrc = options.images[0];
        if (fallbackSrc && src !== fallbackSrc) {
            return el.setAttribute('src', fallbackSrc);
        }
    }

    if (index + 1 < options.images.length) {
        if (! options.images[index + 1]) {
            return;
        }

        return el.setAttribute('src', options.images[index + 1]);
    }

    return options.onError;
}

function parseBindingValue(bindingValue) {
    if (Array.isArray(bindingValue)) {
        return {
            images: bindingValue,
            loading: null,
            onError: null,
        }
    }

    if (typeof bindingValue === 'object') {
        return handleObject(bindingValue);
    }

    return {
        images: [bindingValue],
        loading: null,
        onError : null,
    }
}

function handleObject(value) {
    if (! value.hasOwnProperty('images')) {
        return console.warn('When using object as image fallback options, you need to specify an images property')
    }

    return {
        images: value.images,
        loading: value.loading || null,
        onError: value.onError || null,
    }
}

export default (Vue) => {
    Vue.directive('imageFallback', {
        bind(el, binding) {
            el.addEventListener('error', onError.bind(this, el, parseBindingValue(binding.value)));
        },

        unbind(el) {
            el.removeEventListener('error', onError);
        },
    });
}

