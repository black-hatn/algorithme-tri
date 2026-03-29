/**
 * VISUALISEUR D'ALGORITHMES DE TRI - VERSION 3 ULTIMATE+
 * 13 algorithmes, mode dual, quiz, graphiques Chart.js
 */

const THEMES = {
    dark: { bgPrimary: '#121212', bgCard: '#1e1e1e', bgCanvas: '#0a0a0a', accentBlue: '#3b82f6', accentBlueHover: '#2563eb', textPrimary: '#ffffff', textSecondary: '#9ca3af', colorPivot: '#ef4444', colorCompare: '#eab308', colorSorted: '#22c55e', colorDefault: '#3b82f6', colorSwap: '#a855f7', gradientStart: '#1e40af', gradientEnd: '#3b82f6' },
    light: { bgPrimary: '#f3f4f6', bgCard: '#ffffff', bgCanvas: '#f9fafb', accentBlue: '#2563eb', accentBlueHover: '#1d4ed8', textPrimary: '#111827', textSecondary: '#6b7280', colorPivot: '#dc2626', colorCompare: '#ca8a04', colorSorted: '#16a34a', colorDefault: '#2563eb', colorSwap: '#9333ea', gradientStart: '#1e40af', gradientEnd: '#60a5fa' },
    neon: { bgPrimary: '#0a0a0a', bgCard: '#111111', bgCanvas: '#000000', accentBlue: '#00f0ff', accentBlueHover: '#00c8d6', textPrimary: '#ffffff', textSecondary: '#a0a0a0', colorPivot: '#ff006e', colorCompare: '#ffbe0b', colorSorted: '#00ff88', colorDefault: '#00f0ff', colorSwap: '#fb5607', gradientStart: '#8338ec', gradientEnd: '#00f0ff' }
};

const CONFIG = { MIN_BAR_HEIGHT: 5, PADDING: 2, SHOW_VALUES_THRESHOLD: 60 };

const ALGORITHM_INFO = {
    bubble: { title: 'Bubble Sort', description: 'Compare chaque paire d\'éléments adjacents. Les plus grands "remontent" comme des bulles.', time: 'O(n²)', space: 'O(1)', stable: 'Oui', difficulty: 1 },
    quick: { title: 'Quick Sort', description: 'Divise avec un pivot. Éléments plus petits à gauche, plus grands à droite.', time: 'O(n log n)', space: 'O(log n)', stable: 'Non', difficulty: 3 },
    merge: { title: 'Merge Sort', description: 'Divise en deux moitiés, trie chacune, puis fusionne. Stable et prévisible.', time: 'O(n log n)', space: 'O(n)', stable: 'Oui', difficulty: 3 },
    heap: { title: 'Heap Sort', description: 'Construit un tas max, extrait le max et réorganise. Tri en place.', time: 'O(n log n)', space: 'O(1)', stable: 'Non', difficulty: 4 },
    insertion: { title: 'Insertion Sort', description: 'Construit le tableau trié un élément à la fois. Efficace pour petits tableaux.', time: 'O(n²)', space: 'O(1)', stable: 'Oui', difficulty: 2 },
    selection: { title: 'Selection Sort', description: 'Trouve le minimum et le place à sa position. Simple mais lent.', time: 'O(n²)', space: 'O(1)', stable: 'Non', difficulty: 1 },
    counting: { title: 'Counting Sort', description: 'Compte les occurrences. Très rapide pour entiers limités.', time: 'O(n+k)', space: 'O(k)', stable: 'Oui', difficulty: 2 },
    radix: { title: 'Radix Sort', description: 'Trie chiffre par chiffre. Utilise Counting Sort comme sous-routine.', time: 'O(d×(n+k))', space: 'O(n+k)', stable: 'Oui', difficulty: 4 },
    shell: { title: 'Shell Sort', description: 'Amélioration d\'Insertion Sort avec comparaisons d\'éléments éloignés.', time: 'O(n^1.5)', space: 'O(1)', stable: 'Non', difficulty: 3 },
    cocktail: { title: 'Cocktail Shaker', description: 'Bubble Sort bidirectionnel. Traverse dans les deux sens.', time: 'O(n²)', space: 'O(1)', stable: 'Oui', difficulty: 2 },
    gnome: { title: 'Gnome Sort', description: 'Comparable à Insertion Sort mais avec un seul parcours.', time: 'O(n²)', space: 'O(1)', stable: 'Oui', difficulty: 2 },
    comb: { title: 'Comb Sort', description: 'Élimine les tortues (petits éléments en fin) comme Bubble Sort amélioré.', time: 'O(n²/2^p)', space: 'O(1)', stable: 'Non', difficulty: 2 },
    tim: { title: 'Tim Sort', description: 'Hybride Merge + Insertion. Utilisé par Python et Java. Très optimisé.', time: 'O(n log n)', space: 'O(n)', stable: 'Oui', difficulty: 5 }
};

const ALGORITHM_CODE = {
    bubble: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr[j], arr[j + 1]);
      }
    }
  }
}`,
    quick: `function quickSort(arr, low, high) {
  if (low < high) {
    const pivot = partition(arr, low, high);
    quickSort(arr, low, pivot - 1);
    quickSort(arr, pivot + 1, high);
  }
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr[i], arr[j]);
    }
  }
  swap(arr[i + 1], arr[high]);
  return i + 1;
}`,
    merge: `function mergeSort(arr, left, right) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }
}

function merge(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k++] = leftArr[i++];
    } else {
      arr[k++] = rightArr[j++];
    }
  }
}`,
    heap: `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    swap(arr[0], arr[i]);
    heapify(arr, i, 0);
  }
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    swap(arr[i], arr[largest]);
    heapify(arr, n, largest);
  }
}`,
    insertion: `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
    selection: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      swap(arr[i], arr[minIdx]);
    }
  }
}`,
    counting: `function countingSort(arr) {
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);
  const output = new Array(arr.length);
  
  for (const num of arr) count[num]++;
  for (let i = 1; i <= max; i++) count[i] += count[i - 1];
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  return output;
}`,
    radix: `function radixSort(arr) {
  const max = Math.max(...arr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
}

function countingSortByDigit(arr, exp) {
  const output = new Array(arr.length);
  const count = new Array(10).fill(0);
  
  for (const num of arr) {
    count[Math.floor(num / exp) % 10]++;
  }
  for (let i = 1; i < 10; i++) count[i] += count[i - 1];
  for (let i = arr.length - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  return output;
}`,
    shell: `function shellSort(arr) {
  const n = arr.length;
  let gap = Math.floor(n / 2);
  
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }
}`,
    cocktail: `function cocktailShakerSort(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    for (let i = left; i < right; i++) {
      if (arr[i] > arr[i + 1]) swap(arr[i], arr[i + 1]);
    }
    right--;
    for (let i = right; i > left; i--) {
      if (arr[i - 1] > arr[i]) swap(arr[i - 1], arr[i]);
    }
    left++;
  }
}`,
    gnome: `function gnomeSort(arr) {
  let index = 0;
  while (index < arr.length) {
    if (index === 0 || arr[index] >= arr[index - 1]) {
      index++;
    } else {
      swap(arr[index], arr[index - 1]);
      index--;
    }
  }
}`,
    comb: `function combSort(arr) {
  const n = arr.length;
  let gap = n;
  const shrink = 1.3;
  let sorted = false;
  
  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }
    for (let i = 0; i + gap < n; i++) {
      if (arr[i] > arr[i + gap]) {
        swap(arr[i], arr[i + gap]);
        sorted = false;
      }
    }
  }
}`,
    tim: `function timSort(arr) {
  const MIN_RUN = 32;
  const n = arr.length;
  
  for (let i = 0; i < n; i += MIN_RUN) {
    insertionSort(arr, i, Math.min(i + MIN_RUN - 1, n - 1));
  }
  
  for (let size = MIN_RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) merge(arr, left, mid, right);
    }
  }
}`,
    init: '// Sélectionnez un algorithme pour voir son code source'
};

// ==========================================
// SOUND MANAGER
// ==========================================
class SoundManager {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.volume = 0.2;
    }

    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playTone(freq, duration, type) {
        if (!this.enabled || !this.audioContext) return;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        gain.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + (duration || 0.08));
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        osc.start();
        osc.stop(this.audioContext.currentTime + (duration || 0.08));
    }

    playCompare() { this.playTone(350, 0.05, 'sine'); }
    playSwap() { this.playTone(550, 0.08, 'triangle'); }
    playSorted() { this.playTone(750, 0.12, 'sine'); }
    playPivot() { this.playTone(280, 0.06, 'square'); }
}

const soundManager = new SoundManager();

// ==========================================
// SORTING VISUALIZER CLASS
// ==========================================
class SortingVisualizer {
    constructor(canvasId, isDual = false) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.array = [];
        this.arraySize = 50;
        this.animationSpeed = 50;
        this.isRunning = false;
        this.isPaused = false;
        this.stepMode = false;
        this.stepResolve = null;
        this.abortController = null;
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.currentTheme = 'dark';
        this.showValues = true;
        this.isDual = isDual;
        
        if (!isDual) {
            this.history = JSON.parse(localStorage.getItem('sortHistory') || '[]');
        }
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    setTheme(themeName) {
        if (THEMES[themeName]) {
            this.currentTheme = themeName;
            this.applyTheme();
            this.draw();
        }
    }

    applyTheme() {
        const t = THEMES[this.currentTheme];
        const r = document.documentElement;
        Object.keys(t).forEach(key => r.style.setProperty('--' + key.replace(/([A-Z])/g, '-$1').toLowerCase(), t[key]));
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth - (this.isDual ? 40 : 48);
        this.canvas.height = this.isDual ? 250 : 350;
        this.draw();
    }

    generateArray(size, values = null) {
        this.arraySize = size || this.arraySize;
        if (values) {
            this.array = values.map(v => ({ value: v, state: 'default' }));
        } else {
            this.array = [];
            for (let i = 0; i < this.arraySize; i++) {
                this.array.push({ value: Math.floor(Math.random() * 95) + 5, state: 'default' });
            }
        }
        this.resetStats();
        this.draw();
    }

    getArrayValues() {
        return this.array.map(item => item.value);
    }

    loadCustomArray(values) {
        if (this.isRunning) return false;
        const parsed = values.split(/[,;\s]+/).map(v => parseInt(v.trim())).filter(v => !isNaN(v) && v >= 1 && v <= 100);
        if (parsed.length < 2) { alert('Entrez au moins 2 nombres (1-100)'); return false; }
        if (parsed.length > 100) { alert('Maximum 100 éléments'); return false; }
        this.arraySize = parsed.length;
        this.array = parsed.map(v => ({ value: v, state: 'default' }));
        if (!this.isDual) {
            document.getElementById('sizeSlider').value = this.arraySize;
            document.getElementById('sizeValue').textContent = this.arraySize;
        }
        this.resetStats();
        this.draw();
        return true;
    }

    resetStats() {
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = null;
        this.updateStats();
    }

    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => { if (this.startTime && this.isRunning) this.updateStats(); }, 100);
    }

    stopTimer() {
        if (this.timerInterval) { clearInterval(this.timerInterval); this.timerInterval = null; }
    }

    updateStats() {
        if (this.isDual) return;
        document.getElementById('comparisonCount').textContent = this.comparisons;
        document.getElementById('swapCount').textContent = this.swaps;
        if (this.startTime) document.getElementById('timeElapsed').textContent = ((Date.now() - this.startTime) / 1000).toFixed(1) + 's';
    }

    updateDualStats() {
        if (!this.isDual) return;
        const suffix = this.canvas.id === 'dualCanvas1' ? '1' : '2';
        const compEl = document.getElementById('dualComparisons' + suffix);
        const swapEl = document.getElementById('dualSwaps' + suffix);
        const timeEl = document.getElementById('dualTime' + suffix);
        if (compEl) compEl.textContent = this.comparisons;
        if (swapEl) swapEl.textContent = this.swaps;
        if (timeEl && this.startTime) timeEl.textContent = ((Date.now() - this.startTime) / 1000).toFixed(1) + 's';
    }

    getStateColor(state) {
        const t = THEMES[this.currentTheme];
        return { compare: t.colorCompare, pivot: t.colorPivot, sorted: t.colorSorted, swap: t.colorSwap, default: t.colorDefault }[state] || t.colorDefault;
    }

    lightenColor(c, p) {
        const n = parseInt(c.slice(1), 16);
        const a = Math.round(2.55 * p);
        return '#' + (0x1000000 + Math.min(255, (n >> 16) + a) * 0x10000 + Math.min(255, ((n >> 8) & 0xFF) + a) * 0x100 + Math.min(255, (n & 0xFF) + a)).toString(16).slice(1);
    }

    darkenColor(c, p) {
        const n = parseInt(c.slice(1), 16);
        const a = Math.round(2.55 * p);
        return '#' + (0x1000000 + Math.max(0, (n >> 16) - a) * 0x10000 + Math.max(0, ((n >> 8) & 0xFF) - a) * 0x100 + Math.max(0, (n & 0xFF) - a)).toString(16).slice(1);
    }

    draw() {
        const ctx = this.ctx, w = this.canvas.width, h = this.canvas.height;
        const t = THEMES[this.currentTheme];
        const barW = (w - (this.arraySize + 1) * CONFIG.PADDING) / this.arraySize;
        
        ctx.fillStyle = t.bgCanvas;
        ctx.fillRect(0, 0, w, h);
        
        this.array.forEach((item, i) => {
            const barH = (item.value / 100) * (h - 40);
            const x = i * (barW + CONFIG.PADDING) + CONFIG.PADDING;
            const y = h - barH - 20;
            const c = this.getStateColor(item.state);
            
            const grad = ctx.createLinearGradient(x, y, x, y + barH);
            grad.addColorStop(0, this.lightenColor(c, 30));
            grad.addColorStop(0.5, c);
            grad.addColorStop(1, this.darkenColor(c, 20));
            
            ctx.shadowColor = c;
            ctx.shadowBlur = this.currentTheme === 'neon' ? 15 : 0;
            ctx.fillStyle = grad;
            ctx.fillRect(x, y, barW, barH);
            ctx.shadowBlur = 0;
            
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.fillRect(x, y, barW, 2);
            
            if (this.showValues && this.arraySize <= CONFIG.SHOW_VALUES_THRESHOLD && barW > 12) {
                ctx.fillStyle = t.textPrimary;
                ctx.font = `bold ${Math.min(11, barW * 0.5)}px Inter`;
                ctx.textAlign = 'center';
                ctx.fillText(item.value, x + barW / 2, y - 4);
            }
        });
    }

    async sleep() {
        if (this.abortController?.signal.aborted) throw new Error('aborted');
        if (this.stepMode) return new Promise(r => { this.stepResolve = r; });
        return new Promise(r => setTimeout(r, this.animationSpeed));
    }

    step() { if (this.stepResolve) { this.stepResolve(); this.stepResolve = null; } }

    async setState(i, state, line) {
        if (i >= 0 && i < this.array.length) {
            this.array[i].state = state;
            this.draw();
            if (state === 'compare') soundManager.playCompare();
            else if (state === 'sorted') soundManager.playSorted();
            else if (state === 'pivot') soundManager.playPivot();
            else if (state === 'swap') soundManager.playSwap();
            if (this.isDual) this.updateDualStats();
            else if (line > 0) this.highlightCodeLine(line);
            await this.sleep();
        }
    }

    async swap(i, j, line) {
        await this.setState(i, 'swap', line);
        await this.setState(j, 'swap', line);
        [this.array[i].value, this.array[j].value] = [this.array[j].value, this.array[i].value];
        this.swaps++;
        if (this.isDual) this.updateDualStats();
        else this.updateStats();
        this.draw();
        await this.sleep();
        this.array[i].state = 'default';
        this.array[j].state = 'default';
    }

    async compare(i, j, line) {
        await this.setState(i, 'compare', line);
        await this.setState(j, 'compare', line);
        this.comparisons++;
        if (this.isDual) this.updateDualStats();
        else this.updateStats();
        const r = this.array[i].value > this.array[j].value;
        this.array[i].state = 'default';
        this.array[j].state = 'default';
        this.draw();
        return r;
    }

    async startSort(algo) {
        if (this.isRunning) return;
        this.isRunning = true;
        this.abortController = new AbortController();
        this.resetStats();
        this.startTimer();
        this.array.forEach(item => item.state = 'default');
        
        try {
            switch (algo) {
                case 'bubble': await this.bubbleSort(); break;
                case 'quick': await this.quickSort(0, this.array.length - 1); break;
                case 'merge': await this.mergeSort(0, this.array.length - 1); break;
                case 'heap': await this.heapSort(); break;
                case 'insertion': await this.insertionSort(); break;
                case 'selection': await this.selectionSort(); break;
                case 'counting': await this.countingSort(); break;
                case 'radix': await this.radixSort(); break;
                case 'shell': await this.shellSort(); break;
                case 'cocktail': await this.cocktailShakerSort(); break;
                case 'gnome': await this.gnomeSort(); break;
                case 'comb': await this.combSort(); break;
                case 'tim': await this.timSort(); break;
            }
            await this.markAllSorted();
            if (!this.isDual) this.saveToHistory(algo);
        } catch (e) {
            if (e.message !== 'aborted') console.error(e);
        } finally {
            this.isRunning = false;
            this.isPaused = false;
            this.stepMode = false;
            this.stopTimer();
            this.abortController = null;
            if (this.isDual) this.updateDualStats();
            else {
                this.updateStats();
                this.updateButtons();
                this.clearCodeHighlight();
            }
        }
    }

    stop() {
        if (this.abortController) this.abortController.abort();
        this.isRunning = false;
        this.isPaused = false;
        this.stepMode = false;
        this.stopTimer();
        if (!this.isDual) this.updateButtons();
    }

    pause() { this.isPaused = true; if (!this.isDual) this.updateButtons(); }
    resume() { this.isPaused = false; if (this.stepResolve) { this.stepResolve(); this.stepResolve = null; } if (!this.isDual) this.updateButtons(); }

    updateButtons() {
        if (this.isDual) return;
        document.getElementById('startBtn').classList.toggle('hidden', this.isRunning && !this.isPaused);
        document.getElementById('pauseBtn').classList.toggle('hidden', !this.isRunning || this.isPaused);
    }

    async markAllSorted() {
        for (let i = 0; i < this.array.length; i++) {
            this.array[i].state = 'sorted';
            soundManager.playSorted();
            this.draw();
            await this.sleep();
        }
    }

    saveToHistory(algo) {
        this.history.unshift({ algo, size: this.arraySize, comparisons: this.comparisons, swaps: this.swaps, time: ((Date.now() - this.startTime) / 1000).toFixed(1), date: new Date().toLocaleString() });
        if (this.history.length > 20) this.history.pop();
        localStorage.setItem('sortHistory', JSON.stringify(this.history));
        this.renderHistory();
        updateChart();
    }

    renderHistory() {
        if (this.isDual) return;
        const c = document.getElementById('historyList');
        if (!c) return;
        if (this.history.length === 0) { c.innerHTML = '<p class="text-gray-500 text-sm">Aucun historique</p>'; return; }
        c.innerHTML = this.history.map(e => `
            <div class="flex justify-between items-center py-2 px-3 bg-gray-700/50 rounded-lg text-sm mb-2">
                <div><span class="font-semibold text-blue-400">${ALGORITHM_INFO[e.algo]?.title}</span><span class="text-gray-400 text-xs"> (${e.size})</span></div>
                <div class="text-right"><div class="text-gray-300">${e.time}s</div><div class="text-xs text-gray-500">${e.comparisons}c, ${e.swaps}s</div></div>
            </div>
        `).join('');
    }

    clearHistory() { this.history = []; localStorage.removeItem('sortHistory'); this.renderHistory(); }
    exportToPNG() { const l = document.createElement('a'); l.download = `sort-${Date.now()}.png`; l.href = this.canvas.toDataURL(); l.click(); }
    exportToCSV() { const csv = 'Index,Valeur\n' + this.array.map((item, i) => `${i},${item.value}`).join('\n'); const blob = new Blob([csv], { type: 'text/csv' }); const l = document.createElement('a'); l.download = `array-${Date.now()}.csv`; l.href = URL.createObjectURL(blob); l.click(); }

    // ALGORITHMS
    async bubbleSort() { this.updateCodeDisplay('bubble'); const n = this.array.length; for (let i = 0; i < n - 1; i++) { for (let j = 0; j < n - i - 1; j++) { if (await this.compare(j, j + 1, 4)) await this.swap(j, j + 1, 5); } await this.setState(n - i - 1, 'sorted', 7); } await this.setState(0, 'sorted'); }
    async cocktailShakerSort() { this.updateCodeDisplay('cocktail'); const n = this.array.length; let left = 0, right = n - 1; while (left < right) { for (let i = left; i < right; i++) { if (await this.compare(i, i + 1, 5)) await this.swap(i, i + 1, 6); } await this.setState(right, 'sorted', 8); right--; for (let i = right; i > left; i--) { if (await this.compare(i - 1, i, 10)) await this.swap(i - 1, i, 11); } await this.setState(left, 'sorted', 13); left++; } }
    async gnomeSort() { this.updateCodeDisplay('gnome'); let i = 0; while (i < this.array.length) { if (i === 0 || !(await this.compare(i, i - 1, 4))) { i++; } else { await this.swap(i, i - 1, 6); i--; } } for (let j = 0; j < this.array.length; j++) await this.setState(j, 'sorted'); }
    async combSort() { this.updateCodeDisplay('comb'); const n = this.array.length; let gap = n; const shrink = 1.3; while (gap > 1) { gap = Math.floor(gap / shrink); if (gap < 1) gap = 1; for (let i = 0; i + gap < n; i++) { if (await this.compare(i, i + gap, 10)) await this.swap(i, i + gap, 11); } } for (let i = 0; i < n - 1; i++) { if (await this.compare(i, i + 1, 15)) await this.swap(i, i + 1, 16); } for (let j = 0; j < n; j++) await this.setState(j, 'sorted'); }
    async shellSort() { this.updateCodeDisplay('shell'); const n = this.array.length; let gap = Math.floor(n / 2); while (gap > 0) { for (let i = gap; i < n; i++) { const temp = this.array[i].value; let j = i; while (j >= gap && this.array[j - gap].value > temp) { await this.setState(j, 'compare', 9); await this.setState(j - gap, 'compare', 10); this.array[j].value = this.array[j - gap].value; this.swaps++; this.updateStats(); this.draw(); await this.sleep(); this.array[j].state = 'default'; this.array[j - gap].state = 'default'; j -= gap; } this.array[j].value = temp; this.draw(); await this.sleep(); } gap = Math.floor(gap / 2); } for (let i = 0; i < n; i++) await this.setState(i, 'sorted'); }
    async timSort() { this.updateCodeDisplay('tim'); const MIN_RUN = 32; const n = this.array.length; for (let i = 0; i < n; i += MIN_RUN) { for (let j = i + 1; j < Math.min(i + MIN_RUN, n); j++) { let k = j - 1; const key = this.array[j].value; while (k >= i && this.array[k].value > key) { this.array[k + 1].value = this.array[k].value; k--; this.swaps++; this.updateStats(); } this.array[k + 1].value = key; this.draw(); await this.sleep(); } } for (let size = MIN_RUN; size < n; size *= 2) { for (let left = 0; left < n; left += 2 * size) { const mid = Math.min(left + size - 1, n - 1); const right = Math.min(left + 2 * size - 1, n - 1); if (mid < right) await this.merge(left, mid, right); } } for (let i = 0; i < n; i++) await this.setState(i, 'sorted'); }
    async quickSort(low, high) { this.updateCodeDisplay('quick'); if (low < high) { const pi = await this.partition(low, high); await this.quickSort(low, pi - 1); await this.quickSort(pi + 1, high); } else if (low >= 0 && low === high) await this.setState(low, 'sorted'); }
    async partition(low, high) { const mid = Math.floor((low + high) / 2); await this.swap(mid, high, 3); const pv = this.array[high].value; await this.setState(high, 'pivot', 5); let i = low - 1; for (let j = low; j < high; j++) { await this.setState(j, 'compare', 8); this.comparisons++; if (this.isDual) this.updateDualStats(); else this.updateStats(); if (this.array[j].value < pv) { i++; if (i !== j) await this.swap(i, j, 11); } if (j !== i) this.array[j].state = 'default'; this.draw(); } await this.swap(i + 1, high, 17); await this.setState(i + 1, 'sorted', 18); for (let k = low; k <= high; k++) if (k !== i + 1 && this.array[k].state !== 'sorted') this.array[k].state = 'default'; this.draw(); return i + 1; }
    async mergeSort(l, r) { this.updateCodeDisplay('merge'); if (l < r) { const m = Math.floor((l + r) / 2); await this.mergeSort(l, m); await this.mergeSort(m + 1, r); await this.merge(l, m, r); } }
    async merge(l, m, r) { const left = [], right = []; for (let i = l; i <= m; i++) left.push(this.array[i].value); for (let i = m + 1; i <= r; i++) right.push(this.array[i].value); let i = 0, j = 0, k = l; while (i < left.length && j < right.length) { await this.setState(k, 'compare', 14); this.comparisons++; if (this.isDual) this.updateDualStats(); else this.updateStats(); if (left[i] <= right[j]) { this.array[k].value = left[i]; i++; } else { this.array[k].value = right[j]; j++; } this.swaps++; if (this.isDual) this.updateDualStats(); else this.updateStats(); this.draw(); await this.sleep(); k++; } while (i < left.length) { await this.setState(k, 'compare'); this.array[k].value = left[i]; i++; k++; this.swaps++; if (this.isDual) this.updateDualStats(); else this.updateStats(); this.draw(); await this.sleep(); } while (j < right.length) { await this.setState(k, 'compare'); this.array[k].value = right[j]; j++; k++; this.swaps++; if (this.isDual) this.updateDualStats(); else this.updateStats(); this.draw(); await this.sleep(); } for (let x = l; x <= r; x++) await this.setState(x, 'sorted', 36); }
    async heapSort() { this.updateCodeDisplay('heap'); const n = this.array.length; for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await this.heapify(n, i); for (let i = n - 1; i > 0; i--) { await this.swap(0, i, 6); await this.setState(i, 'sorted', 7); await this.heapify(i, 0); } await this.setState(0, 'sorted'); }
    async heapify(n, i) { let largest = i, l = 2 * i + 1, r = 2 * i + 2; if (l < n) { await this.setState(l, 'compare', 15); await this.setState(largest, 'compare', 16); this.comparisons++; if (this.isDual) this.updateDualStats(); else this.updateStats(); if (this.array[l].value > this.array[largest].value) largest = l; this.array[l].state = 'default'; this.array[largest].state = 'default'; } if (r < n) { await this.setState(r, 'compare', 22); await this.setState(largest, 'compare', 23); this.comparisons++; if (this.isDual) this.updateDualStats(); else this.updateStats(); if (this.array[r].value > this.array[largest].value) largest = r; this.array[r].state = 'default'; this.array[largest].state = 'default'; } if (largest !== i) { await this.swap(i, largest, 29); await this.heapify(n, largest); } }
    async insertionSort() { this.updateCodeDisplay('insertion'); const n = this.array.length; for (let i = 1; i < n; i++) { const key = this.array[i].value; let j = i - 1; await this.setState(i, 'pivot', 5); while (j >= 0 && this.array[j].value > key) { await this.setState(j, 'compare', 7); this.comparisons++; if (this.isDual) this.updateDualStats(); else this.updateStats(); this.array[j + 1].value = this.array[j].value; this.swaps++; if (this.isDual) this.updateDualStats(); else this.updateStats(); this.draw(); await this.sleep(); this.array[j].state = 'default'; j--; } this.array[j + 1].value = key; this.draw(); await this.sleep(); for (let k = 0; k <= i; k++) await this.setState(k, 'sorted', 18); } }
    async selectionSort() { this.updateCodeDisplay('selection'); const n = this.array.length; for (let i = 0; i < n - 1; i++) { let minIdx = i; await this.setState(i, 'pivot', 4); for (let j = i + 1; j < n; j++) { await this.setState(j, 'compare', 6); this.comparisons++; if (this.isDual) this.updateDualStats(); else this.updateStats(); if (this.array[j].value < this.array[minIdx].value) { if (minIdx !== i) this.array[minIdx].state = 'default'; minIdx = j; await this.setState(minIdx, 'pivot', 10); } else this.array[j].state = 'default'; } if (minIdx !== i) await this.swap(i, minIdx, 15); await this.setState(i, 'sorted', 17); } await this.setState(n - 1, 'sorted'); }
    async countingSort() { this.updateCodeDisplay('counting'); const n = this.array.length; const max = Math.max(...this.array.map(x => x.value)); const count = new Array(max + 1).fill(0); const output = new Array(n); for (let i = 0; i < n; i++) { await this.setState(i, 'compare', 7); count[this.array[i].value]++; } for (let i = 1; i <= max; i++) count[i] += count[i - 1]; for (let i = n - 1; i >= 0; i--) { output[count[this.array[i].value] - 1] = this.array[i].value; count[this.array[i].value]--; } for (let i = 0; i < n; i++) { this.array[i].value = output[i]; this.swaps++; if (this.isDual) this.updateDualStats(); else this.updateStats(); await this.setState(i, 'sorted', 18); } }
    async radixSort() { this.updateCodeDisplay('radix'); const n = this.array.length; const max = Math.max(...this.array.map(x => x.value)); for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) await this.countingSortByDigit(n, exp); for (let i = 0; i < n; i++) await this.setState(i, 'sorted'); }
    async countingSortByDigit(n, exp) { const output = new Array(n), count = new Array(10).fill(0); for (let i = 0; i < n; i++) { const d = Math.floor(this.array[i].value / exp) % 10; await this.setState(i, 'compare', 6); count[d]++; } for (let i = 1; i < 10; i++) count[i] += count[i - 1]; for (let i = n - 1; i >= 0; i--) { const d = Math.floor(this.array[i].value / exp) % 10; output[count[d] - 1] = this.array[i].value; count[d]--; } for (let i = 0; i < n; i++) { this.array[i].value = output[i]; this.swaps++; if (this.isDual) this.updateDualStats(); else this.updateStats(); this.draw(); await this.sleep(); } }

    // CODE DISPLAY
    updateCodeDisplay(algo) { if (this.isDual) return; const c = document.getElementById('codeDisplay'); if (!c) return; const code = ALGORITHM_CODE[algo]; if (!code) { c.innerHTML = '<div class="text-gray-500">Sélectionnez un algorithme</div>'; return; } c.innerHTML = `<pre class="font-mono text-sm leading-relaxed"><code>${code.split('\n').map((line, i) => `<div class="code-line px-2 py-0.5 hover:bg-gray-700/30" data-line="${i + 1}"><span class="text-gray-500 w-6 inline-block text-right mr-2">${i + 1}</span><span class="text-gray-300">${this.escapeHtml(line) || ' '}</span></div>`).join('')}</code></pre>`; }
    highlightCodeLine(n) { if (this.isDual) return; document.querySelectorAll('.code-line').forEach(l => l.classList.remove('bg-blue-500/30', 'border-l-2', 'border-blue-400')); const t = document.querySelector(`.code-line[data-line="${n}"]`); if (t) { t.classList.add('bg-blue-500/30', 'border-l-2', 'border-blue-400'); t.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }
    clearCodeHighlight() { if (this.isDual) return; document.querySelectorAll('.code-line').forEach(l => l.classList.remove('bg-blue-500/30', 'border-l-2', 'border-blue-400')); }
    escapeHtml(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
}

// ==========================================
// QUIZ MANAGER
// ==========================================
class QuizManager {
    constructor() {
        this.questions = [];
        this.currentIndex = 0;
        this.score = 0;
        this.isActive = false;
    }

    generateQuestion() {
        const algos = Object.keys(ALGORITHM_INFO);
        const algo = algos[Math.floor(Math.random() * algos.length)];
        const info = ALGORITHM_INFO[algo];
        const types = ['complexity', 'stable', 'description'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        let question, options, correct;
        
        if (type === 'complexity') {
            question = `Quelle est la complexité temporelle de ${info.title} ?`;
            const complexities = ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'];
            options = [...complexities].sort(() => Math.random() - 0.5);
            correct = info.time.includes('n log n') ? 'O(n log n)' : info.time.includes('n²') ? 'O(n²)' : info.time.includes('n+k') ? 'O(n)' : 'O(n log n)';
        } else if (type === 'stable') {
            question = `${info.title} est-il stable ?`;
            options = ['Oui', 'Non', 'Dépend des cas', 'Seulement pour les entiers'];
            correct = info.stable;
        } else {
            question = `Quel algorithme correspond à cette description : "${info.description.substring(0, 60)}..." ?`;
            const otherAlgos = algos.filter(a => a !== algo).slice(0, 3);
            options = [info.title, ...otherAlgos.map(a => ALGORITHM_INFO[a].title)].sort(() => Math.random() - 0.5);
            correct = info.title;
        }
        
        return { question, options, correct };
    }

    start() {
        this.isActive = true;
        this.currentIndex = 0;
        this.score = 0;
        this.questions = Array(5).fill(null).map(() => this.generateQuestion());
        this.showQuestion();
    }

    showQuestion() {
        const container = document.getElementById('quizContainer');
        if (!container || !this.isActive) return;
        
        const q = this.questions[this.currentIndex];
        container.innerHTML = `
            <div class="bg-gray-700/50 rounded-lg p-4">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-sm text-gray-400">Question ${this.currentIndex + 1}/5</span>
                    <span class="text-sm text-blue-400">Score: ${this.score}</span>
                </div>
                <p class="text-white mb-4">${q.question}</p>
                <div class="grid grid-cols-2 gap-2">
                    ${q.options.map(opt => `<button class="quiz-option bg-gray-600 hover:bg-gray-500 text-white py-2 px-3 rounded text-sm transition-colors" data-answer="${opt}">${opt}</button>`).join('')}
                </div>
            </div>
        `;
        
        container.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.checkAnswer(e.target.dataset.answer, q.correct));
        });
    }

    checkAnswer(answer, correct) {
        const isCorrect = answer === correct;
        if (isCorrect) this.score++;
        
        const container = document.getElementById('quizContainer');
        container.querySelectorAll('.quiz-option').forEach(btn => {
            if (btn.dataset.answer === correct) btn.classList.add('bg-green-500');
            else if (btn.dataset.answer === answer) btn.classList.add('bg-red-500');
            btn.disabled = true;
        });
        
        setTimeout(() => {
            this.currentIndex++;
            if (this.currentIndex < this.questions.length) {
                this.showQuestion();
            } else {
                this.end();
            }
        }, 1500);
    }

    end() {
        const container = document.getElementById('quizContainer');
        container.innerHTML = `
            <div class="bg-gray-700/50 rounded-lg p-4 text-center">
                <h3 class="text-xl font-bold text-white mb-2">Quiz Terminé!</h3>
                <p class="text-gray-300 mb-4">Score: ${this.score}/5</p>
                <p class="text-sm text-gray-400 mb-4">${this.score >= 4 ? 'Excellent! 🎉' : this.score >= 3 ? 'Bien joué! 👍' : 'Continue à apprendre! 📚'}</p>
                <button id="restartQuiz" class="btn-primary px-4 py-2 rounded-lg text-sm text-white">Recommencer</button>
            </div>
        `;
        document.getElementById('restartQuiz').addEventListener('click', () => this.start());
    }
}

const quizManager = new QuizManager();

// ==========================================
// CHART MANAGER
// ==========================================
let performanceChart = null;

function initChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Temps (s)',
                data: [],
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }, {
                label: 'Comparisons',
                data: [],
                backgroundColor: 'rgba(234, 179, 8, 0.5)',
                borderColor: 'rgba(234, 179, 8, 1)',
                borderWidth: 1,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, position: 'left' },
                y1: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false } }
            },
            plugins: {
                legend: { labels: { color: '#9ca3af' } }
            }
        }
    });
}

function updateChart() {
    if (!performanceChart) return;
    const history = JSON.parse(localStorage.getItem('sortHistory') || '[]').slice(0, 10);
    performanceChart.data.labels = history.map(h => ALGORITHM_INFO[h.algo]?.title || h.algo);
    performanceChart.data.datasets[0].data = history.map(h => parseFloat(h.time));
    performanceChart.data.datasets[1].data = history.map(h => h.comparisons);
    performanceChart.update();
}

// ==========================================
// INITIALIZATION
// ==========================================
let visualizer, dualVisualizer1, dualVisualizer2;
let currentMode = 'single';

document.addEventListener('DOMContentLoaded', () => {
    visualizer = new SortingVisualizer('sortCanvas');
    visualizer.generateArray(50);
    visualizer.renderHistory();
    
    // Mode selector
    const modeSingle = document.getElementById('modeSingle');
    const modeDual = document.getElementById('modeDual');
    const singleView = document.getElementById('singleView');
    const dualView = document.getElementById('dualView');
    
    modeSingle.addEventListener('click', () => {
        currentMode = 'single';
        singleView.classList.remove('hidden');
        dualView.classList.add('hidden');
        modeSingle.classList.add('bg-blue-600');
        modeSingle.classList.remove('bg-gray-600');
        modeDual.classList.add('bg-gray-600');
        modeDual.classList.remove('bg-blue-600');
    });
    
    modeDual.addEventListener('click', () => {
        currentMode = 'dual';
        singleView.classList.add('hidden');
        dualView.classList.remove('hidden');
        modeDual.classList.add('bg-blue-600');
        modeDual.classList.remove('bg-gray-600');
        modeSingle.classList.add('bg-gray-600');
        modeSingle.classList.remove('bg-blue-600');
        
        if (!dualVisualizer1) {
            dualVisualizer1 = new SortingVisualizer('dualCanvas1', true);
            dualVisualizer1.generateArray(30);
        }
        if (!dualVisualizer2) {
            dualVisualizer2 = new SortingVisualizer('dualCanvas2', true);
            dualVisualizer2.generateArray(30);
        }
    });
    
    // Dual mode controls
    const dualStartBtn = document.getElementById('dualStartBtn');
    const dualStopBtn = document.getElementById('dualStopBtn');
    const dualGenerateBtn = document.getElementById('dualGenerateBtn');
    
    if (dualStartBtn) {
        dualStartBtn.addEventListener('click', async () => {
            soundManager.init();
            const algo1 = document.getElementById('dualAlgo1').value;
            const algo2 = document.getElementById('dualAlgo2').value;
            
            // Sync arrays
            const values = dualVisualizer1.getArrayValues();
            dualVisualizer2.generateArray(values.length, values);
            
            // Start both
            await Promise.all([
                dualVisualizer1.startSort(algo1),
                dualVisualizer2.startSort(algo2)
            ]);
        });
    }
    
    if (dualStopBtn) {
        dualStopBtn.addEventListener('click', () => {
            dualVisualizer1.stop();
            dualVisualizer2.stop();
        });
    }
    
    if (dualGenerateBtn) {
        dualGenerateBtn.addEventListener('click', () => {
            dualVisualizer1.generateArray(30);
            const values = dualVisualizer1.getArrayValues();
            dualVisualizer2.generateArray(30, values);
        });
    }

    // Single mode elements
    const algoSelect = document.getElementById('algorithmSelect');
    const speedSlider = document.getElementById('speedSlider');
    const sizeSlider = document.getElementById('sizeSlider');
    const themeSelect = document.getElementById('themeSelect');
    const generateBtn = document.getElementById('generateBtn');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stepBtn = document.getElementById('stepBtn');
    const stopBtn = document.getElementById('stopBtn');
    const soundBtn = document.getElementById('soundBtn');
    const loadCustomBtn = document.getElementById('loadCustomBtn');
    const customInput = document.getElementById('customArrayInput');
    const exportPngBtn = document.getElementById('exportPngBtn');
    const exportCsvBtn = document.getElementById('exportCsvBtn');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const showValuesCheck = document.getElementById('showValuesCheck');
    const startQuizBtn = document.getElementById('startQuizBtn');

    // Info elements
    const algoTitle = document.getElementById('algoTitle');
    const algoDesc = document.getElementById('algoDescription');
    const algoTime = document.getElementById('algoTime');
    const algoSpace = document.getElementById('algoSpace');
    const algoStable = document.getElementById('algoStable');

    function updateInfo(algo) {
        const info = ALGORITHM_INFO[algo];
        if (info) {
            algoTitle.textContent = info.title;
            algoDesc.textContent = info.description;
            algoTime.textContent = info.time;
            algoSpace.textContent = info.space;
            algoStable.textContent = info.stable;
        }
        visualizer.updateCodeDisplay(algo);
    }

    // Event Listeners
    algoSelect.addEventListener('change', () => updateInfo(algoSelect.value));
    
    speedSlider.addEventListener('input', () => {
        visualizer.animationSpeed = 201 - parseInt(speedSlider.value);
        document.getElementById('speedValue').textContent = visualizer.animationSpeed + 'ms';
    });
    
    sizeSlider.addEventListener('input', () => {
        const s = parseInt(sizeSlider.value);
        document.getElementById('sizeValue').textContent = s;
        if (!visualizer.isRunning) { visualizer.generateArray(s); customInput.value = ''; }
    });
    
    themeSelect.addEventListener('change', () => visualizer.setTheme(themeSelect.value));
    
    generateBtn.addEventListener('click', () => { if (!visualizer.isRunning) { visualizer.generateArray(parseInt(sizeSlider.value)); customInput.value = ''; } });
    
    startBtn.addEventListener('click', () => {
        soundManager.init();
        if (!visualizer.isRunning) visualizer.startSort(algoSelect.value);
        else if (visualizer.isPaused) visualizer.resume();
    });
    
    pauseBtn.addEventListener('click', () => {
        if (visualizer.isRunning && !visualizer.isPaused) { visualizer.pause(); visualizer.stepMode = true; }
        else if (visualizer.isPaused) { visualizer.stepMode = false; visualizer.resume(); }
    });
    
    stepBtn.addEventListener('click', () => {
        if (!visualizer.isRunning) {
            soundManager.init();
            visualizer.stepMode = true;
            visualizer.startSort(algoSelect.value);
        } else if (visualizer.isPaused) {
            visualizer.step();
        }
    });
    
    stopBtn.addEventListener('click', () => visualizer.stop());
    
    soundBtn.addEventListener('click', () => {
        soundManager.enabled = !soundManager.enabled;
        soundBtn.textContent = soundManager.enabled ? '🔊 Son: ON' : '🔇 Son: OFF';
    });
    
    loadCustomBtn.addEventListener('click', () => {
        const val = customInput.value.trim();
        if (val) visualizer.loadCustomArray(val);
    });
    
    customInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') loadCustomBtn.click(); });
    
    exportPngBtn.addEventListener('click', () => visualizer.exportToPNG());
    exportCsvBtn.addEventListener('click', () => visualizer.exportToCSV());
    clearHistoryBtn.addEventListener('click', () => visualizer.clearHistory());
    
    showValuesCheck.addEventListener('change', () => {
        visualizer.showValues = showValuesCheck.checked;
        visualizer.draw();
    });
    
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', () => quizManager.start());
    }

    // Init
    updateInfo('bubble');
    initChart();
});
