/* ==========================================
   SAÚDEMAIS - PREFERÊNCIAS DE ACESSIBILIDADE
   Carregado no <head> de todas as páginas para aplicar
   as preferências antes de a página aparecer.
   ========================================== */
(() => {
    const preferenceKeys = {
        contrast: 'saudeMais_contrast',
        caseMode: 'saudeMais_case',
        daltonism: 'saudeMais_daltonism',
        fontSize: 'saudeMais_fontSize',
        notices: 'saudeMais_avisos'
    };

    // Tamanhos de fonte disponíveis (em % do tamanho padrão do navegador)
    const FONT_SIZES = [90, 100, 115, 130, 150, 175];
    const DEFAULT_FONT_SIZE = 100;

    // Permite que o CSS saiba que o JavaScript está ativo (menu recolhível no celular)
    document.documentElement.classList.add('js');

    function readPreferences() {
        try {
            const savedSize = Number(localStorage.getItem(preferenceKeys.fontSize));
            return {
                contrast: localStorage.getItem(preferenceKeys.contrast) === 'true',
                caseMode: localStorage.getItem(preferenceKeys.caseMode) || 'normal',
                daltonism: localStorage.getItem(preferenceKeys.daltonism) || 'none',
                fontSize: FONT_SIZES.includes(savedSize) ? savedSize : DEFAULT_FONT_SIZE
            };
<<<<<<< Updated upstream
        } catch {
            return { contrast: false, caseMode: 'normal', daltonism: 'none' };
=======
        } catch (error) {
            console.warn('Não foi possível ler as preferências de acessibilidade.', error);
            return { contrast: false, caseMode: 'normal', daltonism: 'none', fontSize: DEFAULT_FONT_SIZE };
>>>>>>> Stashed changes
        }
    }

    function savePreference(key, value) {
        try {
            localStorage.setItem(key, String(value));
            return true;
        } catch (error) {
            console.warn('Não foi possível salvar a preferência.', error);
            return false;
        }
    }

    function applyFontSize(size) {
        document.documentElement.style.fontSize = size === DEFAULT_FONT_SIZE ? '' : `${size}%`;
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
    }

<<<<<<< Updated upstream
    const savedPreferences = readPreferences();
    applyPreferences(document.documentElement, savedPreferences);
=======
    // Aplica imediatamente (antes do corpo da página ser desenhado)
    const initialPreferences = readPreferences();
    applyPreferences(document.documentElement, initialPreferences);
    applyFontSize(initialPreferences.fontSize);

    /* ---------- Mensagem na tela (substitui o alert) ---------- */
    function showStatus(message, type) {
        const status = document.getElementById('config-status');
        if (!status) return;
        status.className = `alerta ${type === 'erro' ? 'alerta-erro' : 'alerta-sucesso'}`;
        status.textContent = message;
        status.hidden = false;
    }

    /* ---------- Controle de tamanho da fonte (A- / A / A+) ---------- */
    function initializeFontControls() {
        const decrease = document.querySelectorAll('[data-fonte="diminuir"]');
        const reset = document.querySelectorAll('[data-fonte="padrao"]');
        const increase = document.querySelectorAll('[data-fonte="aumentar"]');
        const indicators = document.querySelectorAll('[data-fonte-indicador]');

        function update(size) {
            applyFontSize(size);
            savePreference(preferenceKeys.fontSize, size);
            const index = FONT_SIZES.indexOf(size);
            decrease.forEach((btn) => { btn.disabled = index <= 0; });
            increase.forEach((btn) => { btn.disabled = index >= FONT_SIZES.length - 1; });
            reset.forEach((btn) => btn.setAttribute('aria-pressed', String(size === DEFAULT_FONT_SIZE)));
            indicators.forEach((el) => { el.textContent = `Tamanho da letra: ${size}%`; });
        }

        function step(direction) {
            const current = readPreferences().fontSize;
            const index = FONT_SIZES.indexOf(current);
            const next = FONT_SIZES[Math.min(Math.max(index + direction, 0), FONT_SIZES.length - 1)];
            update(next);
        }

        decrease.forEach((btn) => btn.addEventListener('click', () => step(-1)));
        increase.forEach((btn) => btn.addEventListener('click', () => step(1)));
        reset.forEach((btn) => btn.addEventListener('click', () => update(DEFAULT_FONT_SIZE)));

        // Estado inicial sem anunciar mudança
        const size = readPreferences().fontSize;
        const index = FONT_SIZES.indexOf(size);
        decrease.forEach((btn) => { btn.disabled = index <= 0; });
        increase.forEach((btn) => { btn.disabled = index >= FONT_SIZES.length - 1; });
        reset.forEach((btn) => btn.setAttribute('aria-pressed', String(size === DEFAULT_FONT_SIZE)));
        indicators.forEach((el) => { el.dataset.inicial = `Tamanho da letra: ${size}%`; });
    }

    /* ---------- Botão rápido de alto contraste (barra do topo) ---------- */
    function initializeQuickContrast(body) {
        const buttons = document.querySelectorAll('[data-contraste-rapido]');
        const contrastToggle = document.getElementById('toggle-contrast');

        function sync(isOn) {
            buttons.forEach((btn) => btn.setAttribute('aria-pressed', String(isOn)));
        }

        sync(readPreferences().contrast);

        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const isOn = !readPreferences().contrast;
                savePreference(preferenceKeys.contrast, isOn);
                const preferences = readPreferences();
                applyPreferences(document.documentElement, preferences);
                applyPreferences(body, preferences);
                if (contrastToggle) contrastToggle.checked = isOn;
                sync(isOn);
            });
        });
    }
>>>>>>> Stashed changes

    function initializeAccessibilitySettings() {
        const body = document.body;
        applyPreferences(body, savedPreferences);

        initializeFontControls();
        initializeQuickContrast(body);

        const audioToggle = document.getElementById('toggle-audio');
        const librasToggle = document.getElementById('toggle-libras');
        const contrastToggle = document.getElementById('toggle-contrast');
        const caseSelector = document.getElementById('case-selector');
        const daltonismSelector = document.getElementById('daltonism-selector');
        const librasModal = document.getElementById('libras-modal');
        const saveButton = document.getElementById('save-settings');
        const noticeInputs = document.querySelectorAll('[data-aviso]');

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

        // Preferências de aviso (ligação / SMS) salvas junto com as demais
        if (noticeInputs.length) {
            let savedNotices = {};
            try {
                savedNotices = JSON.parse(localStorage.getItem(preferenceKeys.notices)) || {};
            } catch (error) {
                savedNotices = {};
            }
            noticeInputs.forEach((input) => {
                if (input.dataset.aviso in savedNotices) {
                    input.checked = Boolean(savedNotices[input.dataset.aviso]);
                }
            });
        }

        // Leitor de áudio: lê em voz alta o conteúdo principal da página
        if (audioToggle) {
            audioToggle.addEventListener('change', () => {
                if (!('speechSynthesis' in window)) {
                    audioToggle.checked = false;
                    showStatus('Seu navegador não suporta leitura em voz alta.', 'erro');
                    return;
                }

                if (audioToggle.checked) {
                    const main = document.querySelector('main');
                    const text = main ? main.innerText : 'Bem-vindo às configurações de acessibilidade do SaúdeMais.';
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = 'pt-BR';
                    utterance.rate = 0.9;
                    utterance.onend = () => { audioToggle.checked = false; };
                    window.speechSynthesis.cancel();
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
            closeLibrasButton.addEventListener('click', () => {
                setLibrasVisibility(false);
                if (librasToggle) librasToggle.focus();
            });
        }

        if (saveButton) {
            saveButton.addEventListener('click', () => {
                const preferences = {
                    contrast: Boolean(contrastToggle && contrastToggle.checked),
                    caseMode: caseSelector && caseSelector.value !== 'normal'
                        ? `${caseSelector.value}-mode`
                        : 'normal',
                    daltonism: daltonismSelector ? daltonismSelector.value : 'none',
                    fontSize: readPreferences().fontSize
                };

                try {
                    localStorage.setItem(preferenceKeys.contrast, String(preferences.contrast));
                    if (preferences.caseMode === 'normal') {
                        localStorage.removeItem(preferenceKeys.caseMode);
                    } else {
                        localStorage.setItem(preferenceKeys.caseMode, preferences.caseMode);
                    }
                    localStorage.setItem(preferenceKeys.daltonism, preferences.daltonism);

                    const notices = {};
                    noticeInputs.forEach((input) => { notices[input.dataset.aviso] = input.checked; });
                    localStorage.setItem(preferenceKeys.notices, JSON.stringify(notices));

                    applyPreferences(document.documentElement, preferences);
                    applyPreferences(body, preferences);
<<<<<<< Updated upstream
                    window.alert('Configurações de acessibilidade salvas com sucesso.');
                } catch {
                    window.alert('Não foi possível salvar as preferências neste navegador.');
=======
                    document.querySelectorAll('[data-contraste-rapido]')
                        .forEach((btn) => btn.setAttribute('aria-pressed', String(preferences.contrast)));
                    showStatus('Pronto! Suas configurações de acessibilidade foram salvas e valem para todas as páginas.', 'sucesso');
                } catch (error) {
                    console.error('Não foi possível salvar as preferências de acessibilidade.', error);
                    showStatus('Não foi possível salvar as preferências neste navegador.', 'erro');
>>>>>>> Stashed changes
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
