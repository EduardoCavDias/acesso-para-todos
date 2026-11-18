(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');
  const status = document.getElementById('tool-status');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('navegacao');
  const contrastButton = document.querySelector('[data-action="contrast"]');
  const speakButton = document.querySelector('[data-action="speak"]');
  const stopButton = document.querySelector('[data-action="stop-speech"]');
  const storageKey = 'acessoParaTodosPreferencias';
  let fontScale = 1;
  let speechUtterance = null;

  function announce(message) {
    if (status) status.textContent = message;
  }

  function loadPreferences() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
      if (Number.isFinite(saved.fontScale)) {
        fontScale = Math.min(1.4, Math.max(0.9, saved.fontScale));
      }
      root.style.setProperty('--font-scale', String(fontScale));
      if (saved.highContrast === true) {
        root.classList.add('high-contrast');
        if (contrastButton) contrastButton.setAttribute('aria-pressed', 'true');
      }
    } catch (_error) {
      // Preferências são opcionais; o site continua utilizável sem armazenamento.
    }
  }

  function savePreferences() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        fontScale,
        highContrast: root.classList.contains('high-contrast')
      }));
    } catch (_error) {
      // O bloqueio de armazenamento não afeta os controles nesta sessão.
    }
  }

  document.querySelectorAll('[data-action="font-increase"]').forEach((button) => {
    button.addEventListener('click', () => {
      fontScale = Math.min(1.4, Math.round((fontScale + 0.1) * 10) / 10);
      root.style.setProperty('--font-scale', String(fontScale));
      savePreferences();
      announce(`Tamanho do texto ajustado para ${Math.round(fontScale * 100)} por cento.`);
    });
  });

  document.querySelectorAll('[data-action="font-decrease"]').forEach((button) => {
    button.addEventListener('click', () => {
      fontScale = Math.max(0.9, Math.round((fontScale - 0.1) * 10) / 10);
      root.style.setProperty('--font-scale', String(fontScale));
      savePreferences();
      announce(`Tamanho do texto ajustado para ${Math.round(fontScale * 100)} por cento.`);
    });
  });

  if (contrastButton) {
    contrastButton.addEventListener('click', () => {
      const active = root.classList.toggle('high-contrast');
      contrastButton.setAttribute('aria-pressed', String(active));
      savePreferences();
      announce(active ? 'Alto contraste ativado.' : 'Alto contraste desativado.');
    });
  }

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      const label = menuButton.querySelector('.menu-toggle-text');
      if (label) label.textContent = isOpen ? 'Fechar menu' : 'Abrir menu';
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        const label = menuButton.querySelector('.menu-toggle-text');
        if (label) label.textContent = 'Abrir menu';
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.focus();
        const label = menuButton.querySelector('.menu-toggle-text');
        if (label) label.textContent = 'Abrir menu';
      }
    });
  }

  function setSpeechControls(isSpeaking) {
    if (speakButton) speakButton.disabled = isSpeaking;
    if (stopButton) stopButton.disabled = !isSpeaking;
  }

  if (speakButton) {
    speakButton.addEventListener('click', () => {
      if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
        announce('A leitura por voz não está disponível neste navegador. Você ainda pode usar o leitor de tela do sistema.');
        return;
      }
      window.speechSynthesis.cancel();
      const main = document.querySelector('main');
      if (!main) return;
      const textNodes = main.querySelectorAll('h1, h2, h3, p, li');
      const content = Array.from(textNodes)
        .filter((element) => !element.closest('.code-example'))
        .map((element) => element.innerText.trim())
        .filter(Boolean)
        .join('. ');
      if (!content) {
        announce('Não foi encontrado conteúdo para leitura nesta página.');
        return;
      }
      speechUtterance = new SpeechSynthesisUtterance(content);
      speechUtterance.lang = 'pt-BR';
      speechUtterance.rate = 1;
      speechUtterance.onstart = () => {
        setSpeechControls(true);
        announce('Leitura da página iniciada.');
      };
      speechUtterance.onend = () => {
        setSpeechControls(false);
        announce('Leitura da página concluída.');
      };
      speechUtterance.onerror = () => {
        setSpeechControls(false);
        announce('Não foi possível concluir a leitura por voz.');
      };
      window.speechSynthesis.speak(speechUtterance);
    });
  }

  if (stopButton) {
    stopButton.addEventListener('click', () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      speechUtterance = null;
      setSpeechControls(false);
      announce('Leitura interrompida.');
    });
  }

  const checklist = document.getElementById('accessibility-checklist');
  if (checklist) {
    const result = document.getElementById('checklist-result');
    checklist.addEventListener('submit', (event) => {
      event.preventDefault();
      const boxes = Array.from(checklist.querySelectorAll('input[type="checkbox"]'));
      const checked = boxes.filter((box) => box.checked).length;
      result.textContent = `${checked} de ${boxes.length} itens marcados. Esta é uma revisão inicial; confira cada item manualmente e teste com diferentes tecnologias e pessoas.`;
    });
    checklist.addEventListener('reset', () => {
      window.setTimeout(() => {
        if (result) result.textContent = 'Nenhum item foi marcado ainda.';
      }, 0);
    });
  }

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  loadPreferences();
})();
