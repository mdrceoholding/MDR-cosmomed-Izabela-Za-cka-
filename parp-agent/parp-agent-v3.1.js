/**
 * Agent PARP v3.1 — GUI, CSV, wsady, paginacja, stabilniejsze selektory, throttling PDF
 *
 * Jak użyć:
 * 1) Przejdź do: https://uslugirozwojowe.parp.gov.pl/uslugi/search
 * 2) Otwórz konsolę (F12) i wklej cały kod. Naciśnij Enter.
 * 3) W oknie "Agent PARP v3.1" kliknij "Uruchom".
 *
 * Co robi:
 * - Ustawia filtr "Tylko dofinansowane", obsługuje paginację wyników.
 * - Zbiera linki do wszystkich usług i przetwarza je paczkami (batch).
 * - Dla każdej usługi pobiera stronę w tle, wydobywa: tytuł, dostawcę, cenę, godziny, lokalizację, daty.
 * - Inicjuje pobieranie karty PDF (z bezpiecznym throttlingiem) i generuje CSV.
 */

if (typeof window.ParpAgent === 'undefined') {
class ParpAgent {
  constructor() {
    this.CONFIG = {
      searchUrl: 'https://uslugirozwojowe.parp.gov.pl/uslugi/search',
      batchSize: 5,
      delayBetweenBatches: 2500,
      requestDelayMs: 400,          // throttling pojedynczych requestów
      pdfDelayMs: 800,              // throttling pobrań PDF
      paginationMaxPages: 50,       // bezpieczny limit stron
      fetchTimeoutMs: 20000,        // timeout na pobranie
      userAgentHeader: true         // pomocniczo dla niektórych serwerów
    };
    this.state = {
      isRunning: false,
      collectedUrls: [],
      processedData: [],
      successCount: 0,
      errorCount: 0
    };
    this.ui = null;
    this.init();
  }

  init() {
    this.createUI();
    this.log('Agent gotowy. Naciśnij "Uruchom", aby rozpocząć.');
  }

  createUI() {
    if (document.getElementById('parp-agent-ui')) return;
    const uiContainer = document.createElement('div');
    uiContainer.id = 'parp-agent-ui';
    uiContainer.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 2147483647;
      width: 340px; background: #f8f9fa; border: 1px solid #dee2e6;
      border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #212529; overflow: hidden;
    `;
    uiContainer.innerHTML = `
      <div style="padding: 12px 16px; background: #007bff; color: white; font-size: 16px; font-weight: 600;">
        Agent PARP v3.1
      </div>
      <div style="padding: 16px;">
        <div id="agent-status" style="font-size: 14px; margin-bottom: 12px; min-height: 40px;">Czekam na polecenia...</div>
        <div style="margin-bottom: 12px;">
          <div style="width: 100%; background: #e9ecef; border-radius: 4px; overflow: hidden;">
            <div id="agent-progress-bar" style="width:0%; height: 20px; background: #28a745; transition: width 0.3s ease;"></div>
          </div>
          <div id="agent-progress-text" style="text-align: center; font-size: 12px; margin-top: 4px;">0 / 0</div>
        </div>
        <div style="display:flex; gap:8px; margin-bottom:8px;">
          <label style="flex:1; font-size:12px;">Batch size
            <input id="agent-batch-size" type="number" min="1" max="20" value="5" style="width:100%;">
          </label>
          <label style="flex:1; font-size:12px;">Delay (s)
            <input id="agent-delay" type="number" min="1" max="10" value="2.5" step="0.5" style="width:100%;">
          </label>
        </div>
        <button id="agent-start-btn" style="width: 100%; padding: 10px; font-size: 15px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Uruchom</button>
        <button id="agent-download-csv-btn" style="width: 100%; padding: 10px; font-size: 15px; background: #17a2b8; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 8px; display: none;">Pobierz dane (CSV)</button>
      </div>
    `;
    document.body.appendChild(uiContainer);
    this.ui = {
      container: uiContainer,
      status: document.getElementById('agent-status'),
      progressBar: document.getElementById('agent-progress-bar'),
      progressText: document.getElementById('agent-progress-text'),
      startButton: document.getElementById('agent-start-btn'),
      downloadCsvButton: document.getElementById('agent-download-csv-btn'),
      batchSizeInput: document.getElementById('agent-batch-size'),
      delayInput: document.getElementById('agent-delay')
    };
    this.ui.startButton.onclick = () => this.start();
    this.ui.downloadCsvButton.onclick = () => this.downloadCSV();
  }

  log(message) {
    console.log(`[AGENT]: ${message}`);
    if (this.ui) this.ui.status.textContent = message;
  }

  updateProgress(current, total) {
    const percentage = total > 0 ? (current / total) * 100 : 0;
    this.ui.progressBar.style.width = `${percentage}%`;
    this.ui.progressText.textContent = `${current} / ${total}`;
  }

  async start() {
    if (this.state.isRunning) {
      this.log('Agent już pracuje.');
      return;
    }
    if (!window.location.href.startsWith(this.CONFIG.searchUrl)) {
      this.log('Błąd: Przejdź na stronę wyszukiwania i spróbuj ponownie.');
      alert(`Proszę najpierw przejść na stronę:\n${this.CONFIG.searchUrl}`);
      return;
    }
    // Konfiguracja z UI
    const batchSize = parseInt(this.ui.batchSizeInput.value, 10);
    const delaySec = parseFloat(this.ui.delayInput.value);
    if (!Number.isFinite(batchSize) || batchSize <= 0) return this.log('Nieprawidłowy batch size.');
    if (!Number.isFinite(delaySec) || delaySec <= 0) return this.log('Nieprawidłowy delay.');
    this.CONFIG.batchSize = Math.min(Math.max(batchSize, 1), 20);
    this.CONFIG.delayBetweenBatches = Math.round(delaySec * 1000);

    this.state.isRunning = true;
    this.ui.startButton.disabled = true;
    this.ui.startButton.textContent = 'Pracuję...';
    this.ui.downloadCsvButton.style.display = 'none';
    this.resetState();

    try {
      // Krok 1: Ustaw filtr dofinansowanych
      this.log("Krok 1: Ustawiam filtr 'Tylko dofinansowane'...");
      await this.waitForElement('label[for="isCoFinance"]').then(el => el.click());
      await this.delay(400);
      const submitBtn = await this.waitForElement('button.btn.btn-primary[type="submit"]');
      submitBtn.click();

      // Krok 2: Zbierz linki ze wszystkich stron wyników
      this.log('Krok 2: Zbieram linki z wyników (z paginacją)...');
      this.state.collectedUrls = await this.collectAllResultLinksWithPagination();
      if (this.state.collectedUrls.length === 0) {
        this.log('Nie znaleziono usług. Kończę pracę.');
        this.finish();
        return;
      }
      this.log(`Zebrano ${this.state.collectedUrls.length} usług. Rozpoczynam przetwarzanie.`);

      // Krok 3: Przetwarzanie wsadowe
      const totalUrls = this.state.collectedUrls.length;
      for (let i = 0; i < totalUrls; i += this.CONFIG.batchSize) {
        const batch = this.state.collectedUrls.slice(i, i + this.CONFIG.batchSize);
        this.log(`Przetwarzam paczkę ${Math.floor(i / this.CONFIG.batchSize) + 1}...`);
        const promises = batch.map((url, idx) => this.delay(idx * this.CONFIG.requestDelayMs).then(() => this.processService(url)));
        await Promise.allSettled(promises);
        this.updateProgress(Math.min(i + batch.length, totalUrls), totalUrls);
        if (i + this.CONFIG.batchSize < totalUrls) {
          this.log(`Czekam ${this.CONFIG.delayBetweenBatches / 1000}s przed następną paczką...`);
          await this.delay(this.CONFIG.delayBetweenBatches);
        }
      }

      this.finish();
    } catch (error) {
      console.error('Krytyczny błąd w agencie:', error);
      this.log(`Błąd krytyczny: ${error.message}`);
      this.state.isRunning = false;
      this.ui.startButton.disabled = false;
      this.ui.startButton.textContent = 'Uruchom ponownie';
    }
  }

  async collectAllResultLinksWithPagination() {
    const urls = new Set();
    let page = 1;
    // Funkcja pomocnicza zbierania linków z bieżącej strony
    const collectFromCurrent = () => {
      const links = document.querySelectorAll('a.service-card__title-link, a.service-card__title');
      Array.from(links).forEach(a => {
        if (a.href) urls.add(a.href);
      });
    };
    // Czekaj na listę po pierwszym submit
    await this.waitForElement('#service-list');
    await this.delay(1200);
    collectFromCurrent();

    // Próbuj przechodzić po stronie do przodu (np. ".pagination-next" albo numery)
    for (; page < this.CONFIG.paginationMaxPages; page++) {
      const nextBtn = document.querySelector('a.page-link[rel="next"], .pagination .page-item.next a, .pagination a[aria-label="Next"]');
      if (!nextBtn || nextBtn.classList.contains('disabled')) break;
      nextBtn.click();
      await this.waitForListUpdate();
      collectFromCurrent();
    }
    return Array.from(urls);
  }

  async waitForListUpdate() {
    // prosty mechanizm: czekaj na zmianę DOM w obszarze wyników
    const container = document.querySelector('#service-list') || document.body;
    await new Promise((resolve) => {
      const obs = new MutationObserver((mutations) => {
        if (mutations.some(m => m.addedNodes.length > 0 || m.removedNodes.length > 0)) {
          obs.disconnect();
          resolve();
        }
      });
      obs.observe(container, { childList: true, subtree: true });
      setTimeout(() => { obs.disconnect(); resolve(); }, 4000);
    });
    await this.delay(800);
  }

  async processService(url) {
    try {
      const html = await this.safeFetchText(url);
      const doc = new DOMParser().parseFromString(html, 'text/html');

      // Ekstrakcja z większą tolerancją selektorów
      const tytul = this.pickFirstText(doc, [
        'h1.service-title',
        '.service-header h1',
        'h1'
      ]) || 'Nie znaleziono';

      const dostawca = this.pickFirstText(doc, [
        'a[href*="/uslugodawcy/"]',
        '.provider a',
        '.service-provider a',
        '.service-details a[href*="/uslugodawcy/"]'
      ]) || 'Nie znaleziono';

      const cenaRaw = this.pickFirstText(doc, [
        '.price-value',
        '.service-price .value',
        '[data-testid="price"]'
      ]) || '0';

      const cena = (cenaRaw || '0').replace(/\s/g, '').replace(/[^\d,.\-]/g, '');

      // Uogólnione wiersze informacji
      const infoVals = Array.from(doc.querySelectorAll('.info-line-value, .service-info .value, .service-meta .value'))
        .map(el => el.textContent.trim())
        .filter(Boolean);

      const godziny = (infoVals.find(v => /godz|h|czas/i.test(v)) || '').match(/\d+([.,]\d+)?/)?.[0] || '0';

      const lokalizacja = this.pickFirstText(doc, [
        '.location .value',
        '.service-location',
        '.service-meta .location',
        '.info-line-value'
      ], (t) => /[A-Za-zĄąĆćĘęŁłŃńÓóŚśŻżŹź]/.test(t)) || 'Nie znaleziono';

      const dataRozp = this.findDate(infoVals) || this.pickFirstText(doc, [
        '.date .value',
        '.service-dates .value',
        '.info-line-value'
      ], (t) => /\d{2}\.\d{2}\.\d{4}|\d{4}-\d{2}-\d{2}/.test(t)) || 'Nie znaleziono';

      const linkPdf = this.pickFirstHref(doc, [
        'a[href*="/uslugi/pdf/"]',
        'a[href*="pdf"]'
      ]) || 'Brak';

      const data = {
        tytul,
        dostawca,
        cena,
        godziny,
        lokalizacja,
        data_rozpoczecia: dataRozp,
        link_pdf: linkPdf,
        link_uslugi: url,
        status_przetworzenia: 'Sukces'
      };

      this.state.processedData.push(data);
      this.state.successCount++;

      if (data.link_pdf !== 'Brak') {
        await this.delay(this.CONFIG.pdfDelayMs);
        this.downloadFile(data.link_pdf, this.safeFileName(`${tytul}.pdf`));
      }
    } catch (error) {
      console.warn(`Błąd przy przetwarzaniu ${url}:`, error);
      this.state.processedData.push({
        tytul: 'Błąd przetwarzania',
        dostawca: '',
        cena: '',
        godziny: '',
        lokalizacja: '',
        data_rozpoczecia: '',
        link_pdf: '',
        link_uslugi: url,
        status_przetworzenia: `Błąd: ${error.message}`
      });
      this.state.errorCount++;
    }
  }

  finish() {
    this.log(`Zakończono. Sukces: ${this.state.successCount}, Błędy: ${this.state.errorCount}.`);
    this.state.isRunning = false;
    this.ui.startButton.disabled = false;
    this.ui.startButton.textContent = 'Uruchom ponownie';
    if (this.state.processedData.length > 0) {
      this.ui.downloadCsvButton.style.display = 'block';
    }
  }

  resetState() {
    this.state.collectedUrls = [];
    this.state.processedData = [];
    this.state.successCount = 0;
    this.state.errorCount = 0;
    this.updateProgress(0, 0);
  }

  async safeFetchText(url) {
    const controller = new AbortController();
    const to = setTimeout(() => controller.abort(), this.CONFIG.fetchTimeoutMs);
    try {
      const headers = this.CONFIG.userAgentHeader ? { 'Accept': 'text/html,*/*;q=0.9' } : {};
      const resp = await fetch(url, { credentials: 'include', mode: 'cors', headers, signal: controller.signal });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return await resp.text();
    } finally {
      clearTimeout(to);
    }
  }

  getText(doc, selector, index = 0) {
    const elements = doc.querySelectorAll(selector);
    return elements[index]?.textContent.trim() || null;
  }

  pickFirstText(doc, selectors, predicate) {
    for (const sel of selectors) {
      const els = doc.querySelectorAll(sel);
      for (const el of Array.from(els)) {
        const t = el.textContent?.trim();
        if (t && (!predicate || predicate(t))) return t;
      }
    }
    return null;
  }

  pickFirstHref(doc, selectors) {
    for (const sel of selectors) {
      const a = doc.querySelector(sel);
      if (a && a.href) return a.href;
    }
    return null;
  }

  findDate(values) {
    for (const v of values) {
      const m = v.match(/(\d{2}\.\d{2}\.\d{4})|(\d{4}-\d{2}-\d{2})/);
      if (m) return m[0];
    }
    return null;
  }

  downloadCSV() {
    if (this.state.processedData.length === 0) {
      this.log('Brak danych do pobrania.');
      return;
    }
    this.log('Generuję plik CSV...');
    const headers = ['tytul','dostawca','cena','godziny','lokalizacja','data_rozpoczecia','link_pdf','link_uslugi','status_przetworzenia'];
    const rows = this.state.processedData.map(row =>
      headers.map(h => (row[h] ?? '')).map(v => `"${v.toString().replace(/"/g,'""')}"`).join(';')
    );
    const csvContent = [headers.join(';'), ...rows].join('\n');
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const fileName = `parp_dane_${new Date().toISOString().slice(0,10)}.csv`;
    this.downloadFile(URL.createObjectURL(blob), fileName);
  }

  downloadFile(url, fileName) {
    const a = document.createElement('a');
    a.href = url;
    if (fileName) a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  delay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  waitForElement(selector) {
    return new Promise((resolve, reject) => {
      const el = document.querySelector(selector);
      if (el) return resolve(el);
      const observer = new MutationObserver(() => {
        const el2 = document.querySelector(selector);
        if (el2) {
          observer.disconnect();
          resolve(el2);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Nie znaleziono elementu: ${selector}`));
      }, 15000);
    });
  }

  safeFileName(name) {
    return name.replace(/[\\/:*?"<>|]+/g, '_').slice(0, 120);
  }
}

window.ParpAgent = new ParpAgent();
} else {
  console.log('Agent PARP jest już załadowany. Użyj interfejsu graficznego.');
}
