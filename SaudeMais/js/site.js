/* ==========================================
   SAÚDEMAIS - FUNÇÕES COMPARTILHADAS
   - Menu recolhível no celular
   - Validação de formulários com mensagens claras
   - Gravação no localStorage (o projeto não tem back-end)
   ========================================== */
(() => {
    /* ---------- Utilidades ---------- */
    function escapar(texto) {
        return String(texto == null ? '' : texto)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function hoje() {
        const d = new Date();
        const mes = String(d.getMonth() + 1).padStart(2, '0');
        const dia = String(d.getDate()).padStart(2, '0');
        return `${d.getFullYear()}-${mes}-${dia}`;
    }

    function formatarData(iso) {
        if (!iso) return '';
        const [ano, mes, dia] = iso.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    function lerLista(chave) {
        try {
            const dados = JSON.parse(localStorage.getItem(chave));
            return Array.isArray(dados) ? dados : [];
        } catch (erro) {
            return [];
        }
    }

    function salvarLista(chave, lista) {
        localStorage.setItem(chave, JSON.stringify(lista));
    }

    function salvarNaLista(chave, item) {
        const lista = lerLista(chave);
        lista.push(item);
        salvarLista(chave, lista);
    }

    function gerarProtocolo(prefixo) {
        const numero = String(Date.now()).slice(-6);
        return `${prefixo}-${numero}`;
    }

    // Textos das opções marcadas (checkbox/radio) de um grupo
    function textosMarcados(form, nome) {
        return Array.from(form.querySelectorAll(`input[name="${nome}"]:checked`))
            .map((input) => input.value);
    }

    function valorMarcado(form, nome) {
        const marcado = form.querySelector(`input[name="${nome}"]:checked`);
        return marcado ? marcado.value : '';
    }

    /* ---------- Validação ---------- */
    function nomeDoCampo(controle) {
        if (controle.dataset.nome) return controle.dataset.nome;
        const label = controle.id ? document.querySelector(`label[for="${controle.id}"]`) : null;
        if (label) {
            const copia = label.cloneNode(true);
            copia.querySelectorAll('.dica, abbr').forEach((el) => el.remove());
            return copia.textContent.replace(/[:*]/g, '').trim();
        }
        return 'este campo';
    }

    function estaOculto(el) {
        return Boolean(el.closest('[hidden]')) || el.disabled;
    }

    function validar(form) {
        const erros = [];

        form.querySelectorAll('input, select, textarea').forEach((controle) => {
            if (estaOculto(controle)) return;
            const tipo = controle.type;

            if (tipo === 'checkbox' && controle.required && !controle.checked) {
                erros.push({ elemento: controle, mensagem: controle.dataset.mensagem || `Marque: ${nomeDoCampo(controle)}.` });
                return;
            }
            if (tipo === 'checkbox' || tipo === 'radio' || tipo === 'submit' || tipo === 'button') return;

            const valor = controle.value.trim();

            if (controle.required && !valor) {
                erros.push({ elemento: controle, mensagem: `Preencha o campo "${nomeDoCampo(controle)}".` });
                return;
            }
            if (!valor) return;

            if (tipo === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                erros.push({ elemento: controle, mensagem: 'Digite um e-mail válido. Exemplo: maria@email.com' });
                return;
            }

            const regra = controle.dataset.valida;
            if (regra === 'telefone') {
                const digitos = valor.replace(/\D/g, '');
                if (digitos.length < 10 || digitos.length > 11) {
                    erros.push({ elemento: controle, mensagem: 'Digite o telefone com DDD. Exemplo: (11) 91234-5678' });
                }
            } else if (regra === 'data-futura' && valor < hoje()) {
                erros.push({ elemento: controle, mensagem: 'Escolha a data de hoje ou uma data no futuro.' });
            } else if (regra === 'nome' && valor.length < 3) {
                erros.push({ elemento: controle, mensagem: `Escreva o ${nomeDoCampo(controle).toLowerCase()} completo.` });
            }
        });

        form.querySelectorAll('fieldset[data-obrigatorio]').forEach((grupo) => {
            if (estaOculto(grupo)) return;
            if (!grupo.querySelector('input:checked')) {
                erros.push({ elemento: grupo, mensagem: grupo.dataset.mensagem || 'Escolha pelo menos uma opção.' });
            }
        });

        // Mantém a ordem em que os campos aparecem na tela
        erros.sort((a, b) => (a.elemento.compareDocumentPosition(b.elemento) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        return erros;
    }

    let contadorIds = 0;
    function garantirId(el) {
        if (!el.id) {
            contadorIds += 1;
            el.id = `campo-auto-${contadorIds}`;
        }
        return el.id;
    }

    function limparErros(form) {
        form.querySelectorAll('.msg-erro').forEach((msg) => msg.remove());
        form.querySelectorAll('.campo-erro').forEach((el) => el.classList.remove('campo-erro'));
        form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
        form.querySelectorAll('[data-descricao-original]').forEach((el) => {
            const original = el.dataset.descricaoOriginal;
            if (original) el.setAttribute('aria-describedby', original);
            else el.removeAttribute('aria-describedby');
            delete el.dataset.descricaoOriginal;
        });
        const resumo = form.querySelector('[data-resumo-erros]');
        if (resumo) resumo.hidden = true;
    }

    function marcarErro(elemento, mensagem) {
        const ehGrupo = elemento.tagName === 'FIELDSET';
        const recipiente = ehGrupo ? elemento : (elemento.closest('.campo') || elemento.parentElement);
        const idMsg = `${garantirId(elemento)}-erro`;

        recipiente.classList.add('campo-erro');
        const msg = document.createElement('p');
        msg.className = 'msg-erro';
        msg.id = idMsg;
        msg.textContent = mensagem;

        if (ehGrupo) {
            const legenda = elemento.querySelector('legend');
            legenda.insertAdjacentElement('afterend', msg);
        } else if (elemento.type === 'checkbox') {
            recipiente.appendChild(msg);
        } else {
            elemento.insertAdjacentElement('afterend', msg);
        }

        const alvo = elemento;
        if (!('descricaoOriginal' in alvo.dataset)) {
            alvo.dataset.descricaoOriginal = alvo.getAttribute('aria-describedby') || '';
        }
        alvo.setAttribute('aria-describedby', `${alvo.dataset.descricaoOriginal} ${idMsg}`.trim());
        if (!ehGrupo) alvo.setAttribute('aria-invalid', 'true');
    }

    function mostrarErros(form, erros) {
        limparErros(form);
        erros.forEach((erro) => marcarErro(erro.elemento, erro.mensagem));

        let resumo = form.querySelector('[data-resumo-erros]');
        if (!resumo) {
            resumo = document.createElement('div');
            resumo.className = 'alerta alerta-erro';
            resumo.setAttribute('data-resumo-erros', '');
            resumo.setAttribute('tabindex', '-1');
            form.prepend(resumo);
        }

        const itens = erros.map((erro) => {
            const destino = erro.elemento.tagName === 'FIELDSET'
                ? erro.elemento.querySelector('input')
                : erro.elemento;
            return `<li><a href="#${garantirId(destino)}">${escapar(erro.mensagem)}</a></li>`;
        }).join('');

        const plural = erros.length > 1;
        resumo.innerHTML = `<h2>Falta${plural ? 'm' : ''} ${erros.length} informaç${plural ? 'ões' : 'ão'}</h2>
            <p>Confira ${plural ? 'os itens abaixo' : 'o item abaixo'} e tente de novo:</p>
            <ul class="lista">${itens}</ul>`;
        resumo.hidden = false;
        resumo.focus();

        // Ao clicar no link do resumo, leva o foco direto ao campo
        resumo.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', (evento) => {
                const alvo = document.getElementById(link.getAttribute('href').slice(1));
                if (alvo) {
                    evento.preventDefault();
                    alvo.focus();
                    alvo.scrollIntoView({ block: 'center' });
                }
            });
        });
    }

    // Remove o erro de um campo assim que a pessoa corrige
    function limparErroAoCorrigir(form) {
        form.addEventListener('input', (evento) => tirarErro(evento.target));
        form.addEventListener('change', (evento) => tirarErro(evento.target));

        function tirarErro(controle) {
            const grupo = controle.closest('fieldset[data-obrigatorio]');
            const recipiente = (grupo && grupo.classList.contains('campo-erro'))
                ? grupo
                : controle.closest('.campo-erro');
            if (!recipiente) return;
            recipiente.classList.remove('campo-erro');
            recipiente.querySelectorAll('.msg-erro').forEach((msg) => msg.remove());
            controle.removeAttribute('aria-invalid');
        }
    }

    /* ---------- Mensagem de confirmação ---------- */
    function mostrarSucesso(caixa, html) {
        caixa.innerHTML = html;
        caixa.hidden = false;
        caixa.focus();
        caixa.scrollIntoView({ block: 'start' });
    }

    /* ---------- Menu do celular ---------- */
    function iniciarMenu() {
        const botao = document.querySelector('.menu-botao');
        const menu = document.getElementById('menu-principal');
        if (!botao || !menu) return;

        function definir(aberto) {
            menu.classList.toggle('aberto', aberto);
            botao.setAttribute('aria-expanded', String(aberto));
            botao.querySelector('[data-rotulo]').textContent = aberto ? 'Fechar menu' : 'Menu';
        }

        botao.addEventListener('click', () => definir(!menu.classList.contains('aberto')));
        document.addEventListener('keydown', (evento) => {
            if (evento.key === 'Escape' && menu.classList.contains('aberto')) {
                definir(false);
                botao.focus();
            }
        });
    }

    /* ---------- Datas mínimas ---------- */
    function iniciarDatas() {
        document.querySelectorAll('input[data-valida="data-futura"]').forEach((input) => {
            input.min = hoje();
        });
    }

    function iniciar() {
        iniciarMenu();
        iniciarDatas();
        document.querySelectorAll('form[data-validar]').forEach(limparErroAoCorrigir);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar, { once: true });
    } else {
        iniciar();
    }

    window.SaudeMais = {
        escapar,
        hoje,
        formatarData,
        lerLista,
        salvarLista,
        salvarNaLista,
        gerarProtocolo,
        textosMarcados,
        valorMarcado,
        validar,
        mostrarErros,
        limparErros,
        mostrarSucesso
    };
})();
