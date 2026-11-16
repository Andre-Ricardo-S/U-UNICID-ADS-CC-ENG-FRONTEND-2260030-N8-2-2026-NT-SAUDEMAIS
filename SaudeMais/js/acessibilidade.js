(() => {
    const preferenceKeys = {
        contrast: 'saudeMais_contrast',
        caseMode: 'saudeMais_case',
        daltonism: 'saudeMais_daltonism',
        fontScale: 'saudeMais_fontScale'
    };

    const ESCALA_MIN = 0.9;
    const ESCALA_MAX = 1.5;

    function readPreferences() {
        try {
            return {
                contrast: localStorage.getItem(preferenceKeys.contrast) === 'true',
                caseMode: localStorage.getItem(preferenceKeys.caseMode) || 'normal',
                daltonism: localStorage.getItem(preferenceKeys.daltonism) || 'none',
                fontScale: parseFloat(localStorage.getItem(preferenceKeys.fontScale)) || 1
            };
        } catch (error) {
            console.warn('Não foi possível ler as preferências de acessibilidade.', error);
            return { contrast: false, caseMode: 'normal', daltonism: 'none', fontScale: 1 };
        }
    }

    function savePreference(key, value) {
        try {
            localStorage.setItem(preferenceKeys[key], String(value));
        } catch (error) {
            console.warn('Não foi possível salvar a preferência.', error);
        }
    }

    function applyPreferences(element, preferences) {
        if (element === document.documentElement) {
            const escala = Math.min(ESCALA_MAX, Math.max(ESCALA_MIN, preferences.fontScale || 1));
            element.style.fontSize = (112.5 * escala) + '%';
        }
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

        // Barra rápida de acessibilidade (presente em todas as páginas)
        function atualizarEstadoContraste(ativo) {
            document.querySelectorAll('[data-acess="contraste"]').forEach((b) => b.setAttribute('aria-pressed', String(ativo)));
        }
        atualizarEstadoContraste(savedPreferences.contrast);

        function atualizarEstadoOuvir(falando) {
            document.querySelectorAll('[data-acess="ouvir"]').forEach((b) => {
                b.setAttribute('aria-pressed', String(falando));
                b.textContent = falando ? '⏹ Parar leitura' : '🔊 Ouvir página';
            });
        }

        // Tecla Esc interrompe a leitura em voz alta
        document.addEventListener('keydown', (evento) => {
            if (evento.key === 'Escape' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                atualizarEstadoOuvir(false);
            }
        });

        document.querySelectorAll('[data-acess]').forEach((botao) => {
            botao.addEventListener('click', () => {
                const atual = readPreferences();
                const acao = botao.getAttribute('data-acess');
                if (acao === 'mais' || acao === 'menos' || acao === 'normal') {
                    let escala = acao === 'normal' ? 1 : atual.fontScale + (acao === 'mais' ? 0.1 : -0.1);
                    escala = Math.round(Math.min(ESCALA_MAX, Math.max(ESCALA_MIN, escala)) * 10) / 10;
                    savePreference('fontScale', escala);
                    applyPreferences(document.documentElement, { ...atual, fontScale: escala });
                }
                if (acao === 'contraste') {
                    const novo = { ...atual, contrast: !atual.contrast };
                    savePreference('contrast', novo.contrast);
                    applyPreferences(document.documentElement, novo);
                    applyPreferences(body, novo);
                    const toggle = document.getElementById('toggle-contrast');
                    if (toggle) toggle.checked = novo.contrast;
                    atualizarEstadoContraste(novo.contrast);
                }
                if (acao === 'ouvir') {
                    if (!('speechSynthesis' in window)) {
                        window.alert('Seu navegador não suporta leitura em voz alta.');
                        return;
                    }
                    if (window.speechSynthesis.speaking) {
                        window.speechSynthesis.cancel();
                        atualizarEstadoOuvir(false);
                        return;
                    }
                    const principal = document.querySelector('main');
                    const texto = principal ? principal.innerText : document.body.innerText;
                    const fala = new SpeechSynthesisUtterance(texto);
                    fala.lang = 'pt-BR';
                    fala.rate = 0.9;
                    fala.onend = () => atualizarEstadoOuvir(false);
                    window.speechSynthesis.speak(fala);
                    atualizarEstadoOuvir(true);
                }
            });
        });

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
                atualizarEstadoContraste(contrastToggle.checked);
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
            const fechar = document.getElementById('close-libras');
            if (isVisible && fechar) fechar.focus();
            if (!isVisible && librasToggle && librasModal.contains(document.activeElement)) librasToggle.focus();
        }

        if (librasModal) {
            librasModal.addEventListener('keydown', (evento) => {
                if (evento.key === 'Escape') setLibrasVisibility(false);
            });
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

        function avisar(texto) {
            const status = document.getElementById('statusConfig');
            if (status) {
                status.textContent = texto;
            } else {
                window.alert(texto);
            }
        }

        if (saveButton) {
            saveButton.addEventListener('click', () => {
                const preferences = {
                    contrast: Boolean(contrastToggle && contrastToggle.checked),
                    caseMode: caseSelector && caseSelector.value !== 'normal'
                        ? `${caseSelector.value}-mode`
                        : 'normal',
                    daltonism: daltonismSelector ? daltonismSelector.value : 'none',
                    fontScale: readPreferences().fontScale
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
                    avisar('✅ Configurações salvas. Elas valem para todas as páginas.');
                } catch (error) {
                    console.error('Não foi possível salvar as preferências de acessibilidade.', error);
                    avisar('Não foi possível salvar as preferências neste navegador.');
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