(() => {
    const preferenceKeys = {
        contrast: 'saudeMais_contrast',
        caseMode: 'saudeMais_case',
        daltonism: 'saudeMais_daltonism'
    };

    function readPreferences() {
        try {
            return {
                contrast: localStorage.getItem(preferenceKeys.contrast) === 'true',
                caseMode: localStorage.getItem(preferenceKeys.caseMode) || 'normal',
                daltonism: localStorage.getItem(preferenceKeys.daltonism) || 'none'
            };
        } catch (error) {
            console.warn('Não foi possível ler as preferências de acessibilidade.', error);
            return { contrast: false, caseMode: 'normal', daltonism: 'none' };
        }
    }

    function applyPreferences(element, preferences) {
        element.classList.toggle('high-contrast', preferences.contrast);
        element.classList.remove(
            'uppercase-mode',
            'lowercase-mode',
            'daltonism-protanopia',
            'daltonism-deuteranopia'
        );

        if (preferences.caseMode === 'uppercase-mode' || preferences.caseMode === 'lowercase-mode') {
            element.classList.add(preferences.caseMode);
        }

        if (preferences.daltonism === 'protanopia' || preferences.daltonism === 'deuteranopia') {
            element.classList.add(`daltonism-${preferences.daltonism}`);
        }

        if (element === document.body) {
            element.style.backgroundColor = preferences.contrast ? '#000' : '';
            element.style.color = preferences.contrast ? '#ff0' : '';
        }
    }

    applyPreferences(document.documentElement, readPreferences());

    function initializeAccessibilitySettings() {
        const body = document.body;
        const savedPreferences = readPreferences();
        applyPreferences(body, savedPreferences);

        const audioToggle = document.getElementById('toggle-audio');
        const librasToggle = document.getElementById('toggle-libras');
        const contrastToggle = document.getElementById('toggle-contrast');
        const caseSelector = document.getElementById('case-selector');
        const daltonismSelector = document.getElementById('daltonism-selector');
        const librasModal = document.getElementById('libras-modal');
        const saveButton = document.getElementById('save-settings');

        if (contrastToggle) {
            contrastToggle.checked = savedPreferences.contrast;
            contrastToggle.addEventListener('change', () => {
                applyPreferences(body, { ...readPreferences(), contrast: contrastToggle.checked });
            });
        }

        if (caseSelector) {
            caseSelector.value = savedPreferences.caseMode.replace('-mode', '');
            caseSelector.addEventListener('change', () => {
                const caseMode = caseSelector.value === 'normal' ? 'normal' : `${caseSelector.value}-mode`;
                applyPreferences(body, { ...readPreferences(), caseMode });
            });
        }

        if (daltonismSelector) {
            daltonismSelector.value = savedPreferences.daltonism;
            daltonismSelector.addEventListener('change', () => {
                applyPreferences(body, { ...readPreferences(), daltonism: daltonismSelector.value });
            });
        }

        if (audioToggle) {
            audioToggle.addEventListener('change', () => {
                if (!('speechSynthesis' in window)) {
                    audioToggle.checked = false;
                    window.alert('Seu navegador não suporta síntese de voz.');
                    return;
                }

                if (audioToggle.checked) {
                    const utterance = new SpeechSynthesisUtterance(
                        'Bem-vindo às configurações de acessibilidade do SaúdeMais.'
                    );
                    utterance.lang = 'pt-BR';
                    window.speechSynthesis.speak(utterance);
                } else {
                    window.speechSynthesis.cancel();
                }
            });
        }

        function setLibrasVisibility(isVisible) {
            if (!librasModal) return;
            librasModal.style.display = isVisible ? 'block' : 'none';
            librasModal.setAttribute('aria-hidden', String(!isVisible));
            if (librasToggle) librasToggle.checked = isVisible;
        }

        if (librasToggle) {
            librasToggle.addEventListener('change', () => {
                setLibrasVisibility(librasToggle.checked);
            });
        }

        const closeLibrasButton = document.getElementById('close-libras');
        if (closeLibrasButton) {
            closeLibrasButton.addEventListener('click', () => setLibrasVisibility(false));
        }

        if (saveButton) {
            saveButton.addEventListener('click', () => {
                const preferences = {
                    contrast: Boolean(contrastToggle && contrastToggle.checked),
                    caseMode: caseSelector && caseSelector.value !== 'normal'
                        ? `${caseSelector.value}-mode`
                        : 'normal',
                    daltonism: daltonismSelector ? daltonismSelector.value : 'none'
                };

                try {
                    localStorage.setItem(preferenceKeys.contrast, String(preferences.contrast));
                    if (preferences.caseMode === 'normal') {
                        localStorage.removeItem(preferenceKeys.caseMode);
                    } else {
                        localStorage.setItem(preferenceKeys.caseMode, preferences.caseMode);
                    }
                    localStorage.setItem(preferenceKeys.daltonism, preferences.daltonism);
                    applyPreferences(document.documentElement, preferences);
                    applyPreferences(body, preferences);
                    window.alert('Configurações de acessibilidade salvas com sucesso.');
                } catch (error) {
                    console.error('Não foi possível salvar as preferências de acessibilidade.', error);
                    window.alert('Não foi possível salvar as preferências neste navegador.');
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAccessibilitySettings, { once: true });
    } else {
        initializeAccessibilitySettings();
    }
})();